import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const roleCodes = new Set(['hr', 'employee', 'employee_onboarding', 'adaptation_manager']);
const passwordAlphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@$%*-_';

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function temporaryPassword() {
  const random = crypto.getRandomValues(new Uint8Array(20));
  return Array.from(random, byte => passwordAlphabet[byte % passwordAlphabet.length]).join('');
}

Deno.serve(async request => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const serviceRoleKey = Deno.env.get('SERVICE_ROLE_KEY') ?? Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const authorization = request.headers.get('Authorization');
  if (!supabaseUrl || !anonKey || !serviceRoleKey || !authorization) {
    return json({ error: 'Supabase function is not configured.' }, 500);
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: { user }, error: authError } = await userClient.auth.getUser();
  if (authError || !user) return json({ error: 'Authentication required.' }, 401);

  const { data: profile, error: profileError } = await admin
    .from('profiles').select('role').eq('id', user.id).maybeSingle();
  if (profileError) return json({ error: profileError.message }, 500);
  if (profile?.role !== 'hr') return json({ error: 'Only HR users can manage access.' }, 403);

  let body: {
    action?: string;
    employee?: Record<string, unknown>;
    user?: Record<string, unknown>;
  };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400);
  }

  const createAccount = async (emailValue: string, nameValue: string, role: string, employeeId: string | null) => {
    const email = emailValue.trim().toLowerCase();
    const name = nameValue.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !name) {
      throw new Error('Укажите ФИО и корректный корпоративный email.');
    }
    if (!roleCodes.has(role)) throw new Error('Неизвестная роль пользователя.');
    if (role !== 'hr' && !employeeId) throw new Error('Для роли сотрудника нужно связать профиль сотрудника.');
    if (employeeId) {
      const { data: employee, error } = await admin.from('employees').select('id').eq('id', employeeId).maybeSingle();
      if (error) throw error;
      if (!employee) throw new Error('Связанный профиль сотрудника не найден.');
    }

    const password = temporaryPassword();
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: name },
    });
    if (createError || !created.user) throw createError ?? new Error('Не удалось создать пользователя Supabase Auth.');
    const { data: newProfile, error: insertError } = await admin.from('profiles').insert({
      id: created.user.id,
      role,
      employee_id: employeeId,
    }).select('id,role,employee_id').single();
    if (insertError) {
      const { error: cleanupError } = await admin.auth.admin.deleteUser(created.user.id);
      if (cleanupError) console.error('Could not roll back Auth user after profile insertion failed:', cleanupError);
      throw insertError;
    }
    return { user: created.user, profile: newProfile, password };
  };

  try {
    if (body.action === 'create_employee') {
      const employee = body.employee;
      const name = String(employee?.name ?? '').trim();
      const jobTitle = String(employee?.job_title ?? '').trim();
      const department = String(employee?.department ?? '').trim();
      const direction = String(employee?.direction ?? department).trim();
      const email = String(employee?.email ?? '').trim().toLowerCase();
      const startDate = employee?.start_date ? String(employee.start_date) : null;
      const adaptationEnabled = Boolean(employee?.adaptation_enabled);
      if (!name || !jobTitle || !department || !email) {
        return json({ error: 'ФИО, должность, отдел и корпоративный email обязательны.' }, 400);
      }
      const { data: existingRoot, error: rootError } = await admin
        .from('org_units').select('id').eq('name', direction).is('parent_id', null).limit(1).maybeSingle();
      if (rootError) throw rootError;
      let rootId = existingRoot?.id;
      if (!rootId) {
        const { data: root, error } = await admin.from('org_units').insert({
          code: `custom-${crypto.randomUUID()}`,
          name: direction,
        }).select('id').single();
        if (error) throw error;
        rootId = root.id;
      }
      let orgUnitId = rootId;
      if (department !== direction) {
        const { data: existingDepartment, error: departmentError } = await admin
          .from('org_units').select('id').eq('name', department).eq('parent_id', rootId).limit(1).maybeSingle();
        if (departmentError) throw departmentError;
        orgUnitId = existingDepartment?.id;
        if (!orgUnitId) {
          const { data: unit, error } = await admin.from('org_units').insert({
            code: `custom-${crypto.randomUUID()}`,
            name: department,
            parent_id: rootId,
          }).select('id').single();
          if (error) throw error;
          orgUnitId = unit.id;
        }
      }

      const { data: employeeRow, error: employeeError } = await admin.from('employees').insert({
        display_name: name,
        job_title: jobTitle,
        org_unit_id: orgUnitId,
        start_date: startDate,
        status: 'active',
        adaptation_enabled: adaptationEnabled,
      }).select('id,seed_key,display_name,job_title,org_unit_id,start_date,status,adaptation_enabled').single();
      if (employeeError) throw employeeError;

      const { error: contactError } = await admin.from('employee_contacts').insert({
        employee_id: employeeRow.id,
        phone: String(employee.phone ?? '').trim() || null,
        email,
        visible_to_employees: true,
      });
      if (contactError) {
        const { error: cleanupError } = await admin.from('employees').delete().eq('id', employeeRow.id);
        if (cleanupError) console.error('Could not roll back employee after contact insertion failed:', cleanupError);
        throw contactError;
      }

      try {
        const role = adaptationEnabled ? 'employee_onboarding' : 'employee';
        const account = await createAccount(email, name, role, employeeRow.id);
        return json({ employee: employeeRow, user: { id: account.user.id }, profile: account.profile, password: account.password });
      } catch (error) {
        const { error: cleanupError } = await admin.from('employees').delete().eq('id', employeeRow.id);
        if (cleanupError) console.error('Could not roll back employee after account creation failed:', cleanupError);
        throw error;
      }
    }

    if (body.action === 'create_user') {
      const input = body.user ?? {};
      const account = await createAccount(
        String(input.email ?? ''),
        String(input.name ?? ''),
        String(input.role ?? ''),
        input.employee_id ? String(input.employee_id) : null,
      );
      return json({ user: { id: account.user.id }, profile: account.profile, password: account.password });
    }

    if (body.action === 'list_users') {
      const { data: profiles, error: profilesError } = await admin
        .from('profiles').select('id,role,employee_id,employees(id,seed_key,display_name,job_title,org_unit_id,start_date,status,adaptation_enabled)');
      if (profilesError) throw profilesError;
      const { data: authUsers, error: usersError } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (usersError) throw usersError;
      const authById = new Map(authUsers.users.map(authUser => [authUser.id, authUser]));
      return json({
        users: profiles.flatMap(row => {
          const authUser = authById.get(row.id);
          if (!authUser) return [];
          return [{
            id: row.id,
            role: row.role,
            email: authUser.email ?? '',
            name: String(authUser.user_metadata?.full_name ?? row.employees?.display_name ?? authUser.email ?? ''),
            employee: row.employees,
            status: authUser.banned_until && new Date(authUser.banned_until) > new Date() ? 'Заблокирована' : 'Активна',
          }];
        }),
      });
    }

    if (body.action === 'update_access') {
      const input = body.user ?? {};
      const profileId = String(input.profile_id ?? '');
      const role = String(input.role ?? '');
      const email = String(input.email ?? '').trim().toLowerCase();
      const name = String(input.name ?? '').trim();
      const employeeId = input.employee_id ? String(input.employee_id) : null;
      if (!profileId || !name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return json({ error: 'Проверьте пользователя, ФИО и корпоративный email.' }, 400);
      }
      if (!roleCodes.has(role)) return json({ error: 'Неизвестная роль пользователя.' }, 400);
      if (role !== 'hr' && !employeeId) return json({ error: 'Для роли сотрудника нужно связать профиль сотрудника.' }, 400);

      const { data: previous, error: previousError } = await admin
        .from('profiles').select('id,role,employee_id').eq('id', profileId).maybeSingle();
      if (previousError) throw previousError;
      if (!previous) return json({ error: 'Профиль пользователя не найден.' }, 404);
      const { data: authUser, error: authUserError } = await admin.auth.admin.getUserById(profileId);
      if (authUserError || !authUser.user) throw authUserError ?? new Error('Пользователь Auth не найден.');
      const { error: profileUpdateError } = await admin.from('profiles')
        .update({ role, employee_id: employeeId }).eq('id', profileId);
      if (profileUpdateError) throw profileUpdateError;
      const { error: authUpdateError } = await admin.auth.admin.updateUserById(profileId, {
        email,
        email_confirm: true,
        user_metadata: { ...authUser.user.user_metadata, full_name: name },
        ban_duration: input.status === 'Заблокирована' ? '876000h' : 'none',
      });
      if (authUpdateError) {
        const { error: rollbackError } = await admin.from('profiles')
          .update({ role: previous.role, employee_id: previous.employee_id }).eq('id', profileId);
        if (rollbackError) console.error('Could not restore profile after Auth update failed:', rollbackError);
        throw authUpdateError;
      }
      return json({ ok: true });
    }

    return json({ error: 'Unknown action.' }, 400);
  } catch (error) {
    console.error('manage-employee failed:', error);
    return json({ error: error instanceof Error ? error.message : 'Unexpected server error.' }, 400);
  }
});
