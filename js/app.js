// ===== On Boarding в ProSafe — общий код прототипа кабинета HR =====
const KEY = 'prosafe.proto.v1';
function seedData(){
  const employees = [
    {id:101, name:'Анна Михайлова', pos:'Менеджер по адаптации', dept:'HR', dir:'Офис', mgr:'Елена Соловьева', phone:'+7 (495) 111-22-33', email:'a.mikhaylova@prosafe.ru', contacts:true, adapt:true, start:'2026-09-12', status:'Активна', resp:{'HR':'Елена Соловьева','Руководитель адаптации':'Елена Соловьева','Наставник':'Игорь Кузнецов'}},
    {id:102, name:'Игорь Кузнецов', pos:'Старший инженер', dept:'Производство', dir:'Производство', mgr:'Ольга Петрова', phone:'+7 (495) 222-44-55', email:'i.kuznetsov@prosafe.ru', contacts:true, adapt:true, start:'2026-09-22', status:'Активна', resp:{'HR':'Елена Соловьева','Руководитель адаптации':'Ольга Петрова','Наставник':'Анна Михайлова'}},
    {id:103, name:'Ольга Петрова', pos:'Руководитель участка', dept:'Производство', dir:'Производство', mgr:'Елена Соловьева', phone:'+7 (495) 333-66-77', email:'o.petrova@prosafe.ru', contacts:true, adapt:false, start:'', status:'Без адаптации', resp:{'HR':'Елена Соловьева','Руководитель адаптации':'Елена Соловьева','Наставник':'Игорь Кузнецов'}},
    {id:104, name:'Елена Соловьева', pos:'HRBP', dept:'HR', dir:'Офис', mgr:'Генеральный директор', phone:'+7 (495) 444-88-99', email:'e.soloveva@prosafe.ru', contacts:true, adapt:false, start:'', status:'Без адаптации', resp:{'HR':'Елена Соловьева','Руководитель адаптации':'Елена Соловьева','Наставник':'Анна Михайлова'}}
  ];
  const positions = [
    {name:'Менеджер по адаптации', dept:'HR', dir:'Офис', tpl:[{title:'Знакомство с HR-процессами', day:1, from:'10:00', to:'11:00', place:'Переговорная 2', respId:104, resp:'Елена Соловьева'},{title:'Согласовать адаптационный план', day:3, from:'11:30', to:'12:00', place:'Кабинет HR', respId:104, resp:'Елена Соловьева'},{title:'Обучение регламентам', day:7, from:'09:00', to:'10:30', place:'Переговорная 1', respId:104, resp:'Елена Соловьева'}], status:'Активна', updated:'2026-09-10'},
    {name:'Старший инженер', dept:'Производство', dir:'Производство', tpl:[{title:'Ознакомление с оборудованием', day:1, from:'09:00', to:'10:30', place:'Производственный участок', respId:103, resp:'Ольга Петрова'},{title:'Выполнить инструктаж по ТБ', day:2, from:'11:00', to:'12:00', place:'Кабинет охраны труда', respId:103, resp:'Ольга Петрова'},{title:'Подтвердить рабочие процессы', day:10, from:'13:00', to:'14:00', place:'Производственный участок', respId:103, resp:'Ольга Петрова'}], status:'Активна', updated:'2026-09-11'},
    {name:'HRBP', dept:'HR', dir:'Офис', tpl:[], status:'Активна', updated:'2026-09-09'},
    {name:'Руководитель участка', dept:'Производство', dir:'Производство', tpl:[], status:'Активна', updated:'2026-09-09'}
  ];
  const faq = [
    {q:'Кому подать заявку на отпуск?', a:'Заявку оформляет руководитель подразделения через портал HR и согласует с HRBP.'},
    {q:'Как сменить пароль?', a:'После первого входа система предложит сменить пароль. В случае проблем — обратитесь в HR.'},
    {q:'Что делать при проблеме с доступом?', a:'Напишите в чат HR или свяжитесь с коллегой из IT через запрос в поддержку.'}
  ];
  const docs = [
    {title:'Положение об адаптации', cat:'Политика', aud:'Все', ver:'v4.2', updated:'2026-09-14'},
    {title:'Инструкция по технике безопасности', cat:'Локальные регламенты', aud:'Производство', ver:'v1.8', updated:'2026-09-12'}
  ];
  const templates = [
    {title:'План адаптации инженера', cat:'Шаблон', ver:'v2.0', updated:'2026-09-21'},
    {title:'План адаптации менеджера', cat:'Шаблон', ver:'v3.0', updated:'2026-09-20'}
  ];
  const corpDocs = [
    {title:'Кодекс корпоративной этики', cat:'Корпоративные документы', aud:'Все', ver:'v8.1', updated:'2026-09-15'},
    {title:'Политика поддержки труда', cat:'Корпоративные документы', aud:'Склад', ver:'v2.4', updated:'2026-09-02'}
  ];
  const surveys = [
    {title:'Оценка первого месяца', question:'Как вы оцениваете адаптацию?', options:'1;2;3;4;5', aud:'По сотруднику', sent:'12 из 15', status:'Активна'},
    {title:'Новый опрос по корпоративной культуре', question:'Что можно улучшить?', options:'Скорость;Комфорт;Среда;Другое', aud:'Общий', sent:'4 из 28', status:'Черновик'}
  ];
  const evals = [
    {empId:101, emp:'Анна Михайлова', stage:'День 14', sent:'Отправлена', by:'Руководитель адаптации', prev:4, cur:3},
    {empId:102, emp:'Игорь Кузнецов', stage:'День 20', sent:'Проверена', by:'Наставник', prev:5, cur:4}
  ];
  const ideas = [
    {text:'Добавить быстрые обновления на адаптационные встречи', date:'2026-09-18'},
    {text:'Сделать единый шаблон обратной связи по задачам', date:'2026-09-20'}
  ];
  const tasks = {
    101:[{title:'Знакомство с HR-процессами', day:1, from:'10:00', to:'11:00', place:'Переговорная 2', respId:104, resp:'Елена Соловьева', status:'Проверена руководителем'},{title:'Согласовать адаптационный план', day:3, from:'11:30', to:'12:00', place:'Кабинет HR', respId:104, resp:'Елена Соловьева', status:'Выполнена'},{title:'Обучение регламентам', day:7, from:'09:00', to:'10:30', place:'Переговорная 1', respId:104, resp:'Елена Соловьева', status:'Ожидает проверки'}],
    102:[{title:'Ознакомление с оборудованием', day:1, from:'09:00', to:'10:30', place:'Производственный участок', respId:103, resp:'Ольга Петрова', status:'Выполнена'},{title:'Выполнить инструктаж по ТБ', day:2, from:'11:00', to:'12:00', place:'Кабинет охраны труда', respId:103, resp:'Ольга Петрова', status:'Ожидает проверки'},{title:'Подтвердить рабочие процессы', day:10, from:'13:00', to:'14:00', place:'Производственный участок', respId:103, resp:'Ольга Петрова', status:'Назначена'}]
  };
  const users = [
    {name:'Елена Соловьева', login:'e.soloveva', role:'HR', status:'Активна'},
    {name:'Анна Михайлова', login:'a.mikhaylova', role:'Сотрудник с адаптацией', employeeId:101, status:'Активна'},
    {name:'Игорь Кузнецов', login:'i.kuznetsov', role:'Сотрудник с адаптацией', employeeId:102, status:'Активна'},
    {name:'Ольга Петрова', login:'o.petrova', role:'Сотрудник — руководитель адаптации', employeeId:103, managedEmployeeIds:[102], status:'Активна'}
  ];
  return {employees,positions,materials:[],faq,history:'Компания ProSafe работает по модели «первый месяц — приоритет». Для новых сотрудников важно быстро понять регламенты, роли и культуру команды.',docs,templates,corpDocs,surveys,surveyResponses:[],feedbackMessages:[],evals,ideas,tasks,users,accessRoleVersion:1,topicHelpers:{'Отпуск':[104,103],'Пропуск и доступ':[103,104],'IT и учётные записи':[103,104]}};
}
const DEFAULT = seedData();
let DB = load();
function load(){
  try{
    const saved = JSON.parse(localStorage.getItem(KEY)||'{}');
    const oldRoleModel = !saved.accessRoleVersion;
    const data = Object.assign({}, DEFAULT, saved);
    let migrated = false;
    data.surveyResponses = data.surveyResponses || [];
    data.feedbackMessages = data.feedbackMessages || [];
    data.ideas = data.ideas || [];
    const legacyRoles = {'Руководитель':'Сотрудник — руководитель адаптации'};
    (data.users || []).forEach(user => {
      if(oldRoleModel && legacyRoles[user.role]){
        user.role = legacyRoles[user.role];
        migrated = true;
      }
      if(!user.employeeId){
        const linked = data.employees.find(item => item.name === user.name);
        if(linked){ user.employeeId = linked.id; migrated = true; }
      }
      const linkedEmployee = data.employees.find(item => Number(item.id) === Number(user.employeeId));
      if(oldRoleModel && user.role === 'Сотрудник' && linkedEmployee?.adapt){
        user.role = 'Сотрудник с адаптацией';
        migrated = true;
      }
      if('password' in user){
        delete user.password;
        migrated = true;
      }
      if(user.role === 'Сотрудник — руководитель адаптации' && !Array.isArray(user.managedEmployeeIds)){
        user.managedEmployeeIds = data.employees.filter(item => item.name !== user.name && (item.mgr === user.name || item.resp?.['Руководитель адаптации'] === user.name)).map(item => item.id);
        migrated = true;
      }
    });
    if(oldRoleModel){ data.accessRoleVersion = 1; migrated = true; }
    (data.positions || []).forEach(position => {
      const baseline = DEFAULT.positions.find(item => item.name === position.name);
      (position.tpl || []).forEach(task => {
        if(!task.place){
          task.place = baseline?.tpl.find(item => item.title === task.title)?.place || 'Уточните у руководителя';
          migrated = true;
        }
      });
    });
    Object.entries(data.tasks || {}).forEach(([id, tasks]) => {
      const employee = data.employees.find(item => String(item.id) === id);
      const baseline = DEFAULT.positions.find(item => item.name === employee?.pos);
      tasks.forEach(task => {
        if(task.resp){
          const responsible = data.employees.find(item => item.name.toLowerCase() === String(task.resp).trim().toLowerCase());
          if(responsible && Number(task.respId) !== Number(responsible.id)){
            task.respId = responsible.id;
            migrated = true;
          }
        }
        if(!task.place){
          task.place = baseline?.tpl.find(item => item.title === task.title)?.place || 'Уточните у руководителя';
          migrated = true;
        }
      });
    });
    if(migrated) localStorage.setItem(KEY, JSON.stringify(data));
    return data;
  }catch(e){ return Object.assign({}, DEFAULT); }
}
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(DB)); }catch(e){} }

const EMPLOYEE_ROLES = ['Сотрудник','Сотрудник с адаптацией','Сотрудник — руководитель адаптации'];
const isEmployeeRole = role => EMPLOYEE_ROLES.includes(role);
const isAdaptationManager = role => role === 'Сотрудник — руководитель адаптации';
const ROLES = ['HR','Руководитель адаптации','Наставник'];
const DIRS = ['Офис','Склад','Производство'];
const SECTIONS = [['home','Главная'],['people','Люди ProSafe'],['staff','Сотрудники и должности'],['docs','Документы и шаблоны'],['reports','Отчёты и аналитика'],['adapt','Управление адаптацией'],['surveys','Опросы и результаты'],['access','Доступы и настройки']];

const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function set(id, html){ const el = $(id); if(el) el.innerHTML = html; }
const emp = id => DB.employees.find(x => x.id == id);
const pName = (id, fallback) => { const e = emp(id); return e ? nameLink(e) : esc(fallback || '—'); };
function addDays(iso, n){ const d = new Date(iso); d.setDate(d.getDate() + n); return d; }
function taskDateFor(start, day){ if(!start) return '—'; return addDays(start, (Number(day)||1) - 1).toLocaleDateString('ru-RU'); }
function goBack(){
  if(history.length > 1) history.back();
  else goHome();
}
function goHome(){
  const user = currentUser();
  location.href = user && isEmployeeRole(user.role) ? 'employee.html?tab=overview' : 'home.html';
}
function dayOf(e){ if(!e.start) return 0; const d = Math.floor((Date.now() - new Date(e.start)) / 86400000) + 1; return Math.max(0, Math.min(60, d)); }
// Прогресс: задачи 60%, документы 20%, опросы 10%, время 10% (документы и опросы пока не назначаются — 0)
function progress(e){
  const ts = DB.tasks[e.id] || [];
  const done = ts.filter(t => t.status === 'Выполнена' || t.status === 'Проверена руководителем').length;
  const tasksPart = ts.length ? done / ts.length : 0;
  return Math.round((0.6*tasksPart + 0.1*(dayOf(e)/60)) * 100);
}
function today(){ return new Date().toLocaleDateString('ru-RU'); }
const surveyResponseCount = () => (DB.surveyResponses || []).length;

function toast(msg){
  const t = document.createElement('div'); t.textContent = msg; t.setAttribute('role','status');
  Object.assign(t.style, {position:'fixed',bottom:'20px',left:'50%',transform:'translateX(-50%)',background:'var(--color-olive)',color:'#F1E9DD',padding:'12px 18px',borderRadius:'10px',zIndex:9});
  document.body.appendChild(t); setTimeout(() => t.remove(), 2500);
}
function tbl(head, rows, empty){
  if(!rows.length) return `<div class="card empty">${esc(empty || 'Пока пусто')}</div>`;
  return `<div class="table-scroll"><table><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function pill(s){ const ok = ['Активна','Выполнена','Проверена руководителем','Отправлена']; return `<span class="pill ${ok.includes(s)?'lime':''}">${esc(s)}</span>`; }
function progressCell(p){ return `<div style="display:flex;gap:10px;align-items:center"><div class="bar"><span style="width:${p}%"></span></div><span>${p}%</span></div>`; }
const nameLink = e => `<button class="linkbtn" data-emp="${e.id}" onclick="showCard(${e.id})">${esc(e.name)}</button>`;
function empTable(list, empty){
  return tbl(['ФИО','Должность','Направление','Отдел','Адаптация'],
    list.map(e => [nameLink(e), esc(e.pos), esc(e.dir), esc(e.dept), e.adapt ? '<span class="pill lime">Есть</span>' : '<span class="pill">Нет</span>']),
    empty || 'Сотрудников пока нет');
}

// Клик по строке таблицы открывает карточку; кнопки и ссылки внутри строки работают сами
document.addEventListener('click', ev => {
  if(ev.target.closest('button,a,input,select,textarea,label,dialog')) return;
  const tr = ev.target.closest('tr'); if(!tr) return;
  const n = tr.querySelector('[data-emp]'); if(n) showCard(n.dataset.emp);
});

// ---------- Оболочка: меню и диалоги ----------
function renderAside(){
  const cur = document.body.dataset.page;
  const user = currentUser();
  const selfProfile = user && emp(user.employeeId);
  $('aside').innerHTML = `<a class="brand" href="home.html">On Boarding в ProSafe<small>Кабинет HR</small></a>
    <nav>${SECTIONS.map(([id,l]) => `<a href="${id}.html" ${id===cur?'aria-current="page"':''}>${l}</a>`).join('')}
      ${selfProfile ? `<a href="#" data-my-card>Моя визитка</a>` : ''}</nav>
    <div class="sidebar-footer">
      <div class="support-card">
        <div class="support-title">Нужна помощь?</div>
        <div class="support-copy">Поддержка разработчиков на связи в рабочие часы.</div>
        <button type="button" class="btn btn-primary support-btn" onclick="window.location.href='mailto:support@prosafe.local?subject=Поддержка%20ProSafe'">Написать в поддержку</button>
      </div>
      <button type="button" class="linkbtn sidebar-logout" onclick="logout()">Выйти из кабинета</button>
    </div>`;
  $('aside').querySelector('[data-my-card]')?.addEventListener('click', event => {
    event.preventDefault();
    showCard(selfProfile.id);
  });
}
function injectDialogs(){
  document.body.insertAdjacentHTML('beforeend', '<dialog id="dlg"><form method="dialog" class="dlg" id="dlgForm"></form></dialog><dialog id="dlg2"><form method="dialog" class="dlg" id="dlg2Form"></form></dialog>');
}
function bindTabs(){
  const tabs = [...document.querySelectorAll('.tab[data-tab]')]; if(!tabs.length) return;
  const show = name => {
    tabs.forEach(t => t.setAttribute('aria-selected', t.dataset.tab === name));
    document.querySelectorAll('[data-panel]').forEach(p => p.hidden = p.dataset.panel !== name);
  };
  tabs.forEach(t => t.addEventListener('click', () => show(t.dataset.tab)));
  const q = new URLSearchParams(location.search).get('tab');
  show(tabs.some(t => t.dataset.tab === q) ? q : tabs[0].dataset.tab);
}

// Карточка сотрудника (поверх любой формы)
function showCard(id){
  const e = emp(id); if(!e) return;
  const account = currentUser();
  const canEdit = account && account.role === 'HR';
  $('dlg2Form').innerHTML = `<h2>${esc(e.name)}</h2><div class="hint">${esc(e.pos)} · ${esc(e.dept)} · ${esc(e.dir)}</div>
    <h3 style="margin-top:16px">Контакты</h3><p>Руководитель: ${esc(e.mgr)}</p>
    ${e.contacts ? `<p>Телефон: ${esc(e.phone)}<br>Почта: ${esc(e.email)}</p>` : '<p class="hint">Контакты скрыты.</p>'}
    ${e.adapt ? `<h3 style="margin-top:16px">Адаптация</h3><p>День ${dayOf(e)} из 60 · начало: ${esc(e.start||'—')}</p>` : ''}
    <div class="actions" style="margin-top:20px">${canEdit ? `<button type="button" class="btn btn-primary" onclick="openEmployeeCardEditor(${e.id})">Редактировать карточку</button>` : ''}<button type="button" class="btn" onclick="$('dlg2').close()">Закрыть</button></div>`;
  $('dlg2').showModal();
}
function openEmployeeCardEditor(id){
  const account = currentUser();
  const employee = emp(id);
  if(!account || account.role !== 'HR' || !employee){ toast('Нет доступа к редактированию карточки'); return; }
  $('dlgForm').innerHTML = `<h2>Редактировать личную карточку</h2>
    <label for="card-name">ФИО *</label><input id="card-name" value="${esc(employee.name)}">
    <label for="card-pos">Должность</label><input id="card-pos" value="${esc(employee.pos)}">
    <div class="cols" style="gap:12px"><div><label for="card-dept">Отдел</label><input id="card-dept" value="${esc(employee.dept)}"></div><div><label for="card-dir">Направление</label><select id="card-dir">${DIRS.map(dir => `<option ${dir === employee.dir ? 'selected' : ''}>${esc(dir)}</option>`).join('')}</select></div></div>
    <label for="card-manager">Руководитель</label><input id="card-manager" value="${esc(employee.mgr)}">
    <div class="cols" style="gap:12px"><div><label for="card-phone">Телефон</label><input id="card-phone" value="${esc(employee.phone)}"></div><div><label for="card-email">Рабочая почта</label><input id="card-email" type="email" value="${esc(employee.email)}"></div></div>
    <label class="check"><input id="card-contacts" type="checkbox" ${employee.contacts ? 'checked' : ''}> Показывать контакты сотрудникам</label>
    <div class="actions" style="margin-top:20px"><button class="btn btn-primary" type="button" onclick="saveEmployeeCard(${employee.id})">Сохранить</button><button class="btn" type="button" onclick="$('dlg').close()">Отмена</button></div>`;
  $('dlg2').close();
  $('dlg').showModal();
}
function saveEmployeeCard(id){
  const account = currentUser();
  const employee = emp(id);
  const name = $('card-name').value.trim();
  const email = $('card-email').value.trim();
  if(!account || account.role !== 'HR' || !employee){ toast('Нет доступа к редактированию карточки'); return; }
  if(!name){ alert('Укажите ФИО сотрудника.'); return; }
  if(email && !$('card-email').validity.valid){ alert('Проверьте адрес рабочей почты.'); return; }
  employee.name = name;
  employee.pos = $('card-pos').value.trim() || '—';
  employee.dept = $('card-dept').value.trim() || '—';
  employee.dir = $('card-dir').value;
  employee.mgr = $('card-manager').value.trim() || '—';
  employee.phone = $('card-phone').value.trim() || '—';
  employee.email = email || '—';
  employee.contacts = $('card-contacts').checked;
  DB.users.forEach(user => {
    if(Number(user.employeeId) === Number(employee.id)) user.name = employee.name;
  });
  Object.values(DB.tasks).flat().forEach(task => {
    if(task.respId && emp(task.respId)?.id === employee.id) task.resp = employee.name;
  });
  save();
  $('dlg').close();
  if(document.body.dataset.page === 'employee') renderEmployeePortal();
  else if(window.PAGE_RENDER) window.PAGE_RENDER();
  toast('Карточка сотрудника сохранена');
}

// Простая форма создания (материалы, FAQ, документы, опросы, пользователи)
function simpleDialog(title, fields, onSave){
  $('dlgForm').innerHTML = `<h2>${esc(title)}</h2>${fields.map(f => `<label for="sf_${f.k}">${esc(f.l)}${f.req?' *':''}</label>${
    f.opts ? `<select id="sf_${f.k}">${f.opts.map(o=>`<option>${esc(o)}</option>`).join('')}</select>`
    : f.area ? `<textarea id="sf_${f.k}" rows="4"></textarea>`
    : `<input id="sf_${f.k}" placeholder="${esc(f.ph||'')}">`}`).join('')}
    <div class="actions" style="margin-top:20px"><button type="button" class="btn btn-primary" id="sf_save">Сохранить</button><button type="button" class="btn" onclick="$('dlg').close()">Отмена</button></div>`;
  $('sf_save').onclick = async () => {
    const v = {};
    for(const f of fields){ v[f.k] = ($('sf_'+f.k).value || '').trim(); if(f.req && !v[f.k]){ alert('Заполните: ' + f.l); return; } }
    const button = $('sf_save');
    button.disabled = true;
    try{
      await onSave(v);
      save(); $('dlg').close(); if(window.PAGE_RENDER) PAGE_RENDER(); toast('Сохранено');
    }catch(error){
      toast(`Не удалось сохранить: ${error.message}`);
      button.disabled = false;
    }
  };
  $('dlg').showModal();
}

// ---------- Создание сотрудника ----------
let EMP = null;
function openCreateEmployee(){
  EMP = {start:'',editIdx:null,taskRespId:null,taskResp:'',name:'',phone:'',email:'',posName:'',posSel:null,dir:'Офис',dept:'',adapt:false,plan:[],resp:{'HR':'','Руководитель адаптации':'','Наставник':''}};
  renderEmpForm(); $('dlg').showModal();
}
function renderEmpForm(){
  $('dlgForm').innerHTML = `<h2>Создать сотрудника</h2>
    <label for="e_name">ФИО *</label>
    <input id="e_name" value="${esc(EMP.name)}" oninput="EMP.name=this.value" placeholder="Фамилия Имя Отчество">
    <div class="cols" style="gap:12px">
      <div><label for="e_phone">Телефон</label><input id="e_phone" value="${esc(EMP.phone)}" oninput="EMP.phone=this.value"></div>
    <div><label for="e_email">Корпоративный email для входа *</label><input id="e_email" type="email" required value="${esc(EMP.email)}" oninput="EMP.email=this.value"></div>
    </div>
    <label for="p_in">Должность *</label>
    <div class="combo">
      <input id="p_in" autocomplete="off" placeholder="Поиск по должности или выберите из списка" value="${esc(EMP.posName)}"
        oninput="EMP.posName=this.value;EMP.posSel=null;pickPosRender()" onfocus="pickPosRender()" onkeydown="if(event.key==='Enter')event.preventDefault()">
      <div id="p_list" class="plist"></div>
    </div>
    <div class="cols" style="gap:12px;margin-top:4px">
      <div><label for="e_dir">Направление</label><select id="e_dir" onchange="EMP.dir=this.value">${DIRS.map(o=>`<option ${o===EMP.dir?'selected':''}>${o}</option>`).join('')}</select></div>
      <div><label for="e_dept">Отдел</label><input id="e_dept" value="${esc(EMP.dept)}" oninput="EMP.dept=this.value"></div>
    </div>
    <label class="check"><input type="checkbox" ${EMP.adapt?'checked':''} onchange="EMP.adapt=this.checked;renderEmpForm()"> Назначить адаптацию</label>
    ${EMP.adapt ? adaptBlock() + respSection() : ''}
    <div class="actions" style="margin-top:20px"><button type="button" class="btn btn-primary" onclick="saveEmployee()">Создать сотрудника и доступ</button><button type="button" class="btn" onclick="$('dlg').close()">Отмена</button></div>`;
}
function pickPosRender(){
  const q = $('p_in').value.trim(), s = q.toLowerCase();
  const items = DB.positions.filter(p => p.name.toLowerCase().includes(s)).map(p => ({p}));
  if(q && !DB.positions.some(p => p.name.toLowerCase() === s)) items.push({create:q});
  window._posItems = items;
  $('p_list').innerHTML = items.map((it,i) => it.p
    ? `<button type="button" class="pitem" onclick="pickPos(${i})">${esc(it.p.name)} <span class="hint">${esc(it.p.dept)} · ${esc(it.p.dir)}</span></button>`
    : `<button type="button" class="pitem" onclick="pickPos(${i})">+ Создать должность «${esc(it.create)}»</button>`).join('');
}
function pickPos(i){ const it = window._posItems[i]; if(it.p) selectPos(it.p); else openPositionDialog(it.create, p => selectPos(p)); }
function selectPos(p){ EMP.posSel = p; EMP.posName = p.name; EMP.dir = p.dir; EMP.dept = p.dept === '—' ? '' : p.dept; renderEmpForm(); }
function openPositionDialog(name, onCreated){
  $('dlg2Form').innerHTML = `<h2>Создать должность</h2>
    <label for="np_name">Название *</label><input id="np_name" value="${esc(name||'')}">
    <label for="np_dept">Отдел</label><input id="np_dept">
    <label for="np_dir">Направление</label><select id="np_dir">${DIRS.map(o=>`<option>${o}</option>`).join('')}</select>
    <label for="np_desc">Описание</label><textarea id="np_desc" rows="3"></textarea>
    <div class="actions" style="margin-top:16px"><button type="button" class="btn btn-primary" onclick="savePosition()">Сохранить должность</button><button type="button" class="btn" onclick="$('dlg2').close()">Отмена</button></div>`;
  window._onPosCreated = onCreated || (()=>{});
  $('dlg2').showModal();
}
function savePosition(){
  const name = $('np_name').value.trim();
  if(!name){ alert('Укажите название должности'); return; }
  const p = {name, dept:$('np_dept').value.trim()||'—', dir:$('np_dir').value, tpl:[], status:'Активна', updated:today()};
  DB.positions.push(p); save();
  $('dlg2').close(); window._onPosCreated(p); if(window.PAGE_RENDER) PAGE_RENDER(); toast('Должность создана');
}
function taskDate(day){ return taskDateFor(EMP && EMP.start, day); }
function adaptBlock(){
  const tpl = (EMP.posSel && EMP.posSel.tpl) || [];
  const et = EMP.editIdx != null ? EMP.plan[EMP.editIdx] : null;
  return `<div class="card" style="margin-top:12px">
    <h3>План адаптации</h3>
    <label for="e_start">Первый рабочий день *</label>
    <input id="e_start" type="date" value="${esc(EMP.start)}" onchange="EMP.start=this.value;renderEmpForm()">
    <div class="actions" style="margin:12px 0"><button type="button" class="btn" onclick="addFromTemplate()">Добавить план по шаблону должности</button></div>
    ${!EMP.posSel ? '<p class="hint">Сначала выберите должность — у неё может быть шаблон плана.</p>' : !tpl.length ? '<p class="hint">У должности нет шаблона. Назначьте задачи по одной.</p>' : ''}
    <h3 style="font-size:15px;margin-top:12px">${et?'Редактирование задачи':'Назначить задачу'}</h3>
    <div class="cols" style="gap:12px">
      <div><label for="t_title">Название *</label><input id="t_title" value="${esc(et?et.title:'')}"></div>
      <div><label for="t_day">День адаптации</label><input id="t_day" type="number" min="1" max="60" value="${et?et.day:1}" onchange="$('t_date').textContent=taskDate(this.value)"></div>
      <div><label>Дата</label><div id="t_date" style="min-height:44px;padding:10px 12px;border:1px solid var(--color-border);border-radius:var(--radius-input);background:#FBF8F3">${taskDate(et?et.day:1)}</div></div>
    </div>
    <div class="cols" style="gap:12px">
      <div><label for="t_place">Место</label><input id="t_place" value="${esc(et?et.place||'':'')}"></div>
      <div><label for="t_from">Время с</label><input id="t_from" type="time" value="${et?et.from:'10:00'}"></div>
      <div><label for="t_to">Время по</label><input id="t_to" type="time" value="${et?et.to:'11:00'}"></div>
    </div>
    <label for="tr_in">Ответственный</label>
    <div class="combo">
      <input id="tr_in" autocomplete="off" placeholder="Поиск по ФИО" value="${esc(et?et.resp:(EMP.taskResp||''))}" oninput="taskRespRender(this.value)">
      <div id="tr_list" class="plist"></div>
    </div>
    <div class="actions" style="margin:12px 0">
      <button type="button" class="btn btn-primary" onclick="addTask()">${et?'Сохранить задачу':'Добавить задачу'}</button>
      ${et?'<button type="button" class="btn" onclick="cancelEdit()">Отмена</button>':''}
    </div>
    ${EMP.plan.length ? tbl(['День','Дата','Время','Место','Задача','Ответственный',''],
        EMP.plan.map((t,i)=>[t.day, taskDate(t.day), `${esc(t.from||'—')} – ${esc(t.to||'—')}`, esc(t.place||'—'), esc(t.title), t.respId ? pName(t.respId, t.resp) : esc(t.resp||'—'),
          `<button type="button" class="linkbtn" onclick="editTask(${i})">Изменить</button> · <button type="button" class="linkbtn" onclick="removeTask(${i})">Убрать</button>`]))
      : '<p class="hint">План пока пуст</p>'}
  </div>`;
}
function addFromTemplate(){
  if(!EMP.posSel){ alert('Сначала выберите должность'); return; }
  const tpl = EMP.posSel.tpl || [];
  if(!tpl.length){ alert('У должности нет шаблона плана'); return; }
  EMP.plan = tpl.map(t => ({...t, respId:null})); renderEmpForm();
}
function taskRespRender(q){
  const s = q.trim().toLowerCase(); EMP.taskRespId = null;
  const list = s ? DB.employees.filter(e => e.name.toLowerCase().includes(s)).slice(0,8) : [];
  window._trList = list;
  $('tr_list').innerHTML = list.map((e,j) => `<button type="button" class="pitem" onclick="taskRespPick(${j})">${esc(e.name)} <span class="hint">${esc(e.pos)}</span></button>`).join('') || (s ? '<div class="hint">Не найдено</div>' : '');
}
function taskRespPick(j){ const e = window._trList[j]; EMP.taskRespId = e.id; EMP.taskResp = e.name; $('tr_in').value = e.name; $('tr_list').innerHTML = ''; }
function addTask(){
  const title = $('t_title').value.trim();
  if(!title){ alert('Укажите название задачи'); return; }
  if(!EMP.start){ alert('Сначала укажите первый рабочий день'); return; }
  const task = {title, day:Number($('t_day').value)||1, from:$('t_from').value, to:$('t_to').value, place:$('t_place').value.trim() || '—', respId:EMP.taskRespId||null, resp:$('tr_in').value.trim()||'—'};
  if(EMP.editIdx != null){ EMP.plan[EMP.editIdx] = task; EMP.editIdx = null; } else EMP.plan.push(task);
  EMP.taskRespId = null; EMP.taskResp = ''; renderEmpForm();
}
function editTask(i){ const t = EMP.plan[i]; EMP.editIdx = i; EMP.taskRespId = t.respId||null; EMP.taskResp = t.resp||''; renderEmpForm(); }
function cancelEdit(){ EMP.editIdx = null; EMP.taskRespId = null; EMP.taskResp = ''; renderEmpForm(); }
function removeTask(i){ EMP.plan.splice(i,1); if(EMP.editIdx === i) EMP.editIdx = null; renderEmpForm(); }
function respSection(){
  return `<h3 style="margin-top:20px">Ответственные за адаптацию</h3>` + ROLES.map((r,i) => `<div style="margin-top:10px">
    <label for="r${i}_in">${esc(r)}</label>
    <input id="r${i}_in" autocomplete="off" placeholder="Поиск по ФИО" value="${esc(EMP.resp[r])}" oninput="respRender(${i},this.value)">
    <div id="r${i}_list" class="plist"></div></div>`).join('');
}
function respRender(i, q){
  const s = q.trim().toLowerCase(); EMP.resp[ROLES[i]] = '';
  const list = s ? DB.employees.filter(e => e.name.toLowerCase().includes(s)).slice(0,8) : [];
  window._respList = list; window._respIdx = i;
  $('r'+i+'_list').innerHTML = list.map((e,j) => `<button type="button" class="pitem" onclick="respPick(${j})">${esc(e.name)} <span class="hint">${esc(e.pos)}</span></button>`).join('') || (s ? '<div class="hint">Не найдено</div>' : '');
}
function respPick(j){ const e = window._respList[j], i = window._respIdx; EMP.resp[ROLES[i]] = e.name; $('r'+i+'_in').value = e.name; $('r'+i+'_list').innerHTML = ''; }
async function saveEmployee(){
  if(!EMP.name.trim()){ alert('Укажите ФИО'); return; }
  if(!EMP.posName.trim()){ alert('Укажите должность'); return; }
  if(!EMP.email.trim() || !$('e_email').validity.valid){ alert('Укажите корректный корпоративный email для входа.'); return; }
  if(EMP.adapt && !EMP.start){ alert('Укажите первый рабочий день'); return; }
  const button = $('dlgForm').querySelector('.btn-primary');
  $('employee-save-error')?.remove();
  button.disabled = true;
  const r = EMP.resp;
  const input = {
    name:EMP.name.trim(),
    email:EMP.email.trim().toLowerCase(),
    phone:EMP.phone.trim(),
    job_title:EMP.posName.trim(),
    department:EMP.dept.trim() || EMP.dir,
    direction:EMP.dir,
    start_date:EMP.adapt ? EMP.start : null,
    adaptation_enabled:EMP.adapt
  };
  try{
    const created = await manageSupabaseEmployee({action:'create_employee',employee:input});
    const id = supabaseEmployeeAppId(created.employee);
    const e = {
      id, name:created.employee.display_name, pos:created.employee.job_title,
      dept:input.department, dir:input.direction, mgr:r['Руководитель адаптации']||'—',
      phone:input.phone||'—', email:input.email, contacts:true,
      adapt:input.adaptation_enabled, start:input.start_date||'',
      status:input.adaptation_enabled?'Активна':'Без адаптации', resp:{...r}
    };
    DB.employees.push(e);
    if(EMP.adapt) DB.tasks[id] = EMP.plan.map(t => ({...t, status:'Назначена'}));
    DB.users.push({
      id:created.user.id, name:e.name, login:input.email, role:SUPABASE_ROLE_NAMES[created.profile.role],
      employeeId:id, status:'Активна'
    });
    save();
    showInvite(e, created.password);
  }catch(error){
    const errorBox = document.createElement('p');
    errorBox.id = 'employee-save-error';
    errorBox.className = 'login-error';
    errorBox.setAttribute('role','alert');
    errorBox.textContent = `Не удалось создать сотрудника в Supabase: ${error.message}`;
    button.before(errorBox);
    button.disabled = false;
  }
}
function translit(s){
  const m={а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'e',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'c',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya'};
  return s.toLowerCase().split('').map(c => m[c] !== undefined ? m[c] : (/[a-z0-9]/.test(c) ? c : '')).join('');
}
function showInvite(e,pwd){
  const parts = e.name.split(' ');
  const hrName = e.resp && e.resp['HR'];
  const hr = (hrName && DB.employees.find(x => x.name === hrName)) || {name:'Контакты HR не указаны', phone:'—', email:'—'};
  $('dlgForm').innerHTML = `<h2>Сотрудник создан</h2>
    <div class="card" style="margin:12px 0">
      <h3>Приглашение в портал</h3>
      <p>Здравствуйте, ${esc(parts[1]||parts[0])}! Вам открыт доступ к порталу On Boarding в ProSafe.</p>
      <table><tbody>
        <tr><th style="width:140px">Логин</th><td><b>${esc(e.email)}</b></td></tr>
        <tr><th>Пароль</th><td><b>${esc(pwd)}</b></td></tr>
      </tbody></table>
      <p class="hint" style="margin-top:12px">Пароль показан один раз. Передайте его сотруднику лично и попросите сменить после входа.</p>
    </div>
    <div class="card"><h3>Если возникли трудности со входом</h3>
      <p>${esc(hr.name)}<br>Телефон: ${esc(hr.phone)}<br>Почта: ${esc(hr.email)}</p></div>
    <div class="actions" style="margin-top:16px"><button type="button" class="btn btn-primary" onclick="finishInvite()">Готово</button></div>`;
}
function finishInvite(){ $('dlg').close(); if(window.PAGE_RENDER) PAGE_RENDER(); toast('Сотрудник и доступ созданы в Supabase'); }

// ---------- Списки и разделы ----------
function waitingList(){
  const out = [];
  Object.entries(DB.tasks).forEach(([id, ts]) => ts.forEach(t => {
    const e = emp(id); if(e && t.status === 'Ожидает проверки') out.push({emp:e, task:t});
  }));
  return out;
}
function dropList(){ return DB.evals.filter(x => x.cur !== undefined && x.prev !== undefined && x.cur < x.prev); }

function renderHome(){
  const adapt = DB.employees.filter(e => e.adapt);
  const drops = dropList().length;
  set('k-adapt', adapt.length); set('k-waiting', waitingList().length); set('k-answers', surveyResponseCount());
  set('k-drops', drops); set('k-ideas', DB.ideas.length);
  const dropCard = $('k-drops');
  if(dropCard){
    dropCard.parentElement?.parentElement?.classList.toggle('warning-card', drops > 0);
    dropCard.parentElement?.parentElement?.style.setProperty('--accent', drops > 0 ? '#B96D49' : '#34392A');
  }
  set('home-adapt', tbl(['ФИО','Должность','День','Прогресс','Статус'],
    adapt.map(e => [nameLink(e), esc(e.pos), dayOf(e), progressCell(progress(e)), pill(e.status)]), 'Сотрудников на адаптации пока нет'));
  set('home-today-label', today());
  const todaysTasks = adapt.flatMap(employee => (DB.tasks[employee.id] || [])
    .map((task,index) => ({task,index}))
    .filter(({task}) => taskDateFor(employee.start,task.day) === today())
    .map(({task,index}) => ({employee,task,index}))
    .sort((a,b) => String(a.task.from || '').localeCompare(String(b.task.from || ''))));
  set('home-schedule-list', todaysTasks.length ? `
    <div class="home-schedule-list">${todaysTasks.map(({employee,task,index}) => `
      <article class="home-schedule-item">
        <div class="home-schedule-time">${esc(task.from || 'Время не указано')}<span>${esc(task.to || '—')}</span></div>
        <div class="home-schedule-main"><button type="button" class="linkbtn" onclick="openEmployeeTaskEditor(${employee.id},${index})">${esc(task.title)}</button><span>${nameLink(employee)} · ${esc(employee.pos)}</span><small>${esc(task.place || 'Место не указано')} · Ответственный: ${esc(task.resp || '—')}</small></div>
        ${pill(task.status)}
      </article>
    `).join('')}</div>` : '<div class="home-schedule-empty"><strong>Сегодня задач по плану нет</strong><span>Когда сотрудникам на адаптации назначат задачи на сегодня, они появятся здесь.</span></div>');
}

const TOPICS = ['Отпуск','Пропуск и доступ','Зарплата и табель','Оборудование и ТБ','IT и учётные записи','Командировки'];
function renderHistoryView(){
  const view = $('history-view');
  const editor = $('history-text');
  const wrap = $('history-editor-wrap');
  const editBtn = $('history-edit-btn');
  if(!view) return;
  const text = (DB.history || '').trim();
  const isEditing = !!(wrap && !wrap.hidden);
  if(editor && document.activeElement !== editor && !isEditing){
    editor.value = DB.history || '';
  }
  if(view){
    if(text){
      view.classList.remove('empty');
      view.textContent = text;
    } else {
      view.classList.add('empty');
      view.textContent = 'История компании пока не заполнена.';
    }
  }
  if(wrap){ wrap.hidden = !isEditing; }
  if(editBtn){ editBtn.hidden = isEditing; }
}
function toggleHistoryEditor(show){
  const wrap = $('history-editor-wrap');
  const view = $('history-view');
  const editor = $('history-text');
  const editBtn = $('history-edit-btn');
  if(!wrap || !editor) return;
  if(show){
    editor.value = DB.history || '';
    wrap.hidden = false;
    if(view) view.hidden = true;
    if(editBtn) editBtn.hidden = true;
    setTimeout(() => editor.focus(), 0);
  } else {
    wrap.hidden = true;
    if(view) view.hidden = false;
    if(editBtn) editBtn.hidden = false;
    renderHistoryView();
  }
}
function renderPeople(){
  renderHistoryView();
  set('faq-list', DB.faq.length ? DB.faq.map(q => `<div class="card" style="margin-bottom:12px"><h3>${esc(q.q)}</h3><p>${esc(q.a)}</p></div>`).join('') : '<div class="card empty">Вопросов пока нет</div>');
  DIRS.forEach(d => set('dir-cnt-' + d, DB.employees.filter(e => e.dir === d).length));
  renderOrg();
}
function renderPeopleSearch(q){
  const s = q.trim().toLowerCase();
  if(!s){ set('people-results', ''); return; }
  set('people-results', empTable(DB.employees.filter(e => (e.name+e.pos+e.dept+e.dir).toLowerCase().includes(s)), 'Ничего не найдено'));
}
function showDir(dir){
  set('people-results', `<h3>${esc(dir)}</h3>` + empTable(DB.employees.filter(e => e.dir === dir), 'В направлении «' + dir + '» сотрудников пока нет'));
}
function openTopic(topic){
  DB.topicHelpers = DB.topicHelpers || {};
  const helpers = (DB.topicHelpers[topic] || []).map(id => emp(id)).filter(Boolean);
  $('dlg2Form').innerHTML = `<h2>${esc(topic)}</h2>
    <p>Не знаешь к кому обратиться? Вот кто поможет по этой теме:</p>
    ${helpers.length ? '<ul style="padding-left:18px">' + helpers.map(e => `<li style="margin:6px 0">${nameLink(e)} <span class="hint">${esc(e.pos)}</span></li>`).join('') + '</ul>' : '<p class="hint">Помощники пока не назначены.</p>'}
    ${DB.employees.length ? `<label for="th-emp">Добавить помощника</label>
      <select id="th-emp">${DB.employees.map(e => `<option value="${e.id}">${esc(e.name)}</option>`).join('')}</select>
      <div class="actions" style="margin-top:16px"><button type="button" class="btn btn-primary" onclick="addTopicHelper('${esc(topic)}')">Добавить</button><button type="button" class="btn" onclick="$('dlg2').close()">Закрыть</button></div>`
      : '<div class="actions" style="margin-top:16px"><button type="button" class="btn" onclick="$(\'dlg2\').close()">Закрыть</button></div>'}`;
  $('dlg2').showModal();
}
function addTopicHelper(topic){
  const id = $('th-emp').value; if(!id) return;
  DB.topicHelpers = DB.topicHelpers || {};
  const list = DB.topicHelpers[topic] || [];
  if(!list.includes(Number(id)) && !list.includes(id)) list.push(Number(id));
  DB.topicHelpers[topic] = list; save(); openTopic(topic);
}

// ---------- Оргсхема ----------
function renderOrg(){
  const box = $('org-chart'); if(!box) return;
  box.innerHTML = orgChartMarkup();
  requestAnimationFrame(() => drawOrg(box));
  bindOrgTab();
}
function orgChartMarkup(){
  const dirBranches = DIRS.map(d => {
    const list = DB.employees.filter(e => e.dir === d);
    const depts = [...new Set(list.map(e => e.dept || '—'))];
    const dirId = 'dir:' + d;
    const deptHtml = depts.map(dep => {
      const did = 'dept:' + d + ':' + dep;
      const people = list.filter(e => (e.dept || '—') === dep);
      return `<div class="org-branch"><div class="org-node" data-node="${esc(did)}" data-parent="${esc(dirId)}">${esc(dep)}</div>
        <div class="org-row">${people.map(e => {
          const p = e.name.split(' ');
          const ini = (p[1] ? p[1][0] + '.' : '') + (p[2] ? p[2][0] + '.' : '');
          return `<div class="org-node" data-node="emp:${e.id}" data-parent="${esc(did)}" onclick="showCard(${e.id})"><div>${esc(e.pos)}</div><b>${esc(p[0])} ${esc(ini)}</b></div>`;
        }).join('')}</div></div>`;
    }).join('');
    return `<div class="org-branch"><div class="org-node org-dir" data-node="${esc(dirId)}" data-parent="ceo"><b>${esc(d)}</b></div>
      <div class="org-row">${deptHtml || '<div class="org-empty">Сотрудников пока нет</div>'}</div></div>`;
  }).join('');
  return `<svg></svg><div class="org-branch"><div class="org-ceo" data-node="ceo">Генеральный директор<br><small>ProSafe</small></div><div class="org-row" style="margin-top:14px">${dirBranches}</div></div>`;
}
function drawOrg(target='org-chart'){
  const box = typeof target === 'string' ? $(target) : target; if(!box) return;
  bindOrgChart(box);
  const svg = box.querySelector('svg'); if(!svg) return;
  const r0 = box.getBoundingClientRect(); if(!r0.width) return;   // вкладка скрыта
  svg.setAttribute('width', box.scrollWidth); svg.setAttribute('height', box.scrollHeight);
  svg.innerHTML = '';
  box.querySelectorAll('[data-parent]').forEach(node => {
    const par = box.querySelector(`[data-node="${CSS.escape(node.dataset.parent)}"]`); if(!par) return;
    const a = node.getBoundingClientRect(), b = par.getBoundingClientRect();
    const x1 = a.left - r0.left + box.scrollLeft + a.width/2, y1 = a.top - r0.top + box.scrollTop;
    const x2 = b.left - r0.left + box.scrollLeft + b.width/2, y2 = b.bottom - r0.top + box.scrollTop;
    const my = (y1 + y2) / 2;
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`);
    p.setAttribute('class', 'org-edge');
    p.dataset.child = node.dataset.node;
    svg.appendChild(p);
  });
}
function chainOf(node, box){
  const chain = [];
  let cur = node;
  while(cur){ chain.push(cur.dataset.node); const p = cur.dataset.parent; cur = p ? box.querySelector(`[data-node="${CSS.escape(p)}"]`) : null; }
  return chain;
}
function clearHl(target='org-chart'){
  const box = typeof target === 'string' ? $(target) : target;
  if(box) box.querySelectorAll('.hl').forEach(n => n.classList.remove('hl'));
}
function highlightChain(node, target='org-chart'){
  const box = typeof target === 'string' ? $(target) : target;
  clearHl(box); if(!node || !box) return;
  const chain = chainOf(node, box);
  chain.forEach(id => { const el = box.querySelector(`[data-node="${CSS.escape(id)}"]`); if(el) el.classList.add('hl'); });
  box.querySelectorAll('.org-edge').forEach(p => { if(chain.includes(p.dataset.child)) p.classList.add('hl'); });
}
let orgResizeBound = false;
function bindOrgChart(box){
  if(!box || box.dataset.bound) return;
  box.dataset.bound = '1';
  box.addEventListener('mouseover', ev => {
    const node = ev.target.closest('[data-node]');
    if(node && box.contains(node)) highlightChain(node, box);
  });
  box.addEventListener('focusin', ev => {
    const node = ev.target.closest('[data-node]');
    if(node && box.contains(node)) highlightChain(node, box);
  });
  box.addEventListener('mouseleave', () => clearHl(box));
  box.addEventListener('focusout', ev => {
    if(!box.contains(ev.relatedTarget)) clearHl(box);
  });
  if(!orgResizeBound){
    orgResizeBound = true;
    window.addEventListener('resize', () => {
      document.querySelectorAll('.org-chart').forEach(chart => drawOrg(chart));
    });
  }
}
function bindOrgTab(){
  const box = $('org-chart'); if(!box) return;
  bindOrgChart(box);
  const tab = document.querySelector('[data-tab="org"]');
  if(tab && !tab.dataset.orgBound){
    tab.dataset.orgBound = '1';
    tab.addEventListener('click', () => setTimeout(() => drawOrg(), 0));
  }
}

function openMaterial(){ simpleDialog('Новый материал', [{k:'title',l:'Название',req:true},{k:'type',l:'Тип',opts:['Текст','PDF','Файл']}], v => DB.materials.push(v)); }
function openFaq(){
  simpleDialog('Новый вопрос', [{k:'q',l:'Вопрос',req:true},{k:'a',l:'Ответ',req:true,area:true}], async value => {
    const session = JSON.parse(localStorage.getItem(SUPABASE_SESSION_KEY) || 'null');
    const slug = `${translit(value.q).slice(0,48) || 'faq'}-${Date.now()}`;
    await supabaseRequest('/rest/v1/faqs',{
      method:'POST',
      body:{slug,question:value.q,answer:value.a,is_published:true,sort_order:DB.faq.length + 1},
      accessToken:session?.access_token,
      prefer:'return=minimal'
    });
    DB.faq.push({q:value.q,a:value.a});
  });
}
async function saveHistory(){
  const value = ($('history-text') || {}).value || '';
  const text = value.trim();
  const session = JSON.parse(localStorage.getItem(SUPABASE_SESSION_KEY) || 'null');
  try{
    await supabaseRequest('/rest/v1/company_history?on_conflict=slug',{
      method:'POST',
      body:{slug:'company',title:'История компании',body:text,is_published:true},
      accessToken:session?.access_token,
      prefer:'resolution=merge-duplicates,return=minimal'
    });
  }catch(error){
    toast(`Не удалось сохранить историю компании: ${error.message}`);
    return;
  }
  DB.history = text;
  save();
  toggleHistoryEditor(false);
  toast('Сохранено');
}

function renderStaff(){
  const q = ($('staff-global-q') && $('staff-global-q').value) || '';
  renderStaffSearch(q);
}
function renderStaffSearch(q){
  const s = String(q || '').trim().toLowerCase();
  const filteredEmployees = !s ? DB.employees : DB.employees.filter(e => (e.name + e.pos + e.dept + e.dir).toLowerCase().includes(s));
  const filteredPositions = !s ? DB.positions : DB.positions.filter(p => (p.name + p.dept + p.dir).toLowerCase().includes(s));

  const globalInput = $('staff-global-q');
  if(globalInput && globalInput.value !== String(q || '')) globalInput.value = q || '';

  set('staff-table', empTable(filteredEmployees, 'Сотрудников не найдено'));
  set('positions-table', tbl(['Должность','Отдел','Направление','Задач в шаблоне','Изменено'],
    filteredPositions.map(p => [esc(p.name), esc(p.dept), esc(p.dir), (p.tpl||[]).length, esc(p.updated)]), 'Должностей не найдено'));
}

function renderDocs(){
  set('docs-table', tbl(['Название','Категория','Доступно','Версия','Обновлён'], DB.docs.map(d => [esc(d.title), esc(d.cat), esc(d.aud), esc(d.ver), esc(d.updated)]), 'Документов пока нет'));
  set('templates-table', tbl(['Название','Должность','Версия','Обновлён'], DB.templates.map(d => [esc(d.title), esc(d.cat), esc(d.ver), esc(d.updated)]), 'Шаблонов пока нет'));
  set('corp-table', tbl(['Название','Категория','Доступно','Версия','Обновлён'], DB.corpDocs.map(d => [esc(d.title), esc(d.cat), esc(d.aud), esc(d.ver), esc(d.updated)]), 'Материалов пока нет'));
  renderDocSearch(($('doc-q') || {}).value || '');
}
function downloadDoc(title, type){
  const safeTitle = String(title || 'document').replace(/[\\/<>:"|?*]+/g, '').trim() || 'document';
  const blob = new Blob([`Документ: ${safeTitle}\nТип: ${type}\nДата: ${today()}\n\nСодержимое загружается из локального прототипа.`], {type: 'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${safeTitle}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast('Файл скачан');
}
function renderDocSearch(q){
  const s = q.trim().toLowerCase();
  const all = [...DB.docs, ...DB.templates, ...DB.corpDocs].filter(d => d.title.toLowerCase().includes(s));
  const popular = {
    docs: [...DB.docs].slice(0, 3),
    templates: [...DB.templates].slice(0, 3),
    corp: [...DB.corpDocs].slice(0, 3)
  };

  const preview = !s ? `
    <div class="docs-search-populars">
      <div class="popular-block">
        <h3>Популярные документы</h3>
        ${popular.docs.length ? popular.docs.map(d => `
          <div class="doc-preview-item">
            <div>
              <strong>${esc(d.title)}</strong>
              <div class="hint">${esc(d.cat)} · ${esc(d.ver)}</div>
            </div>
            <button class="btn btn-primary" type="button" onclick="downloadDoc('${esc(d.title || '')}', 'Документ')">Скачать</button>
          </div>
        `).join('') : '<div class="card empty">Документы пока нет</div>'}
      </div>
      <div class="popular-block">
        <h3>Популярные шаблоны</h3>
        ${popular.templates.length ? popular.templates.map(d => `
          <div class="doc-preview-item">
            <div>
              <strong>${esc(d.title)}</strong>
              <div class="hint">${esc(d.cat)} · ${esc(d.ver)}</div>
            </div>
            <button class="btn btn-primary" type="button" onclick="downloadDoc('${esc(d.title || '')}', 'Шаблон')">Скачать</button>
          </div>
        `).join('') : '<div class="card empty">Шаблонов пока нет</div>'}
      </div>
      <div class="popular-block">
        <h3>Популярные материалы</h3>
        ${popular.corp.length ? popular.corp.map(d => `
          <div class="doc-preview-item">
            <div>
              <strong>${esc(d.title)}</strong>
              <div class="hint">${esc(d.cat)} · ${esc(d.ver)}</div>
            </div>
            <button class="btn btn-primary" type="button" onclick="downloadDoc('${esc(d.title || '')}', 'Корпоративный документ')">Скачать</button>
          </div>
        `).join('') : '<div class="card empty">Материалов пока нет</div>'}
      </div>
    </div>
  ` : '';

  const results = s ? tbl(['Название','Категория','Версия'], all.map(d => [esc(d.title), esc(d.cat), esc(d.ver)]), 'Ничего не найдено') : '';
  set('doc-results', `${preview}${results}`);
}
function openDoc(kind){
  const aud = ['Все'].concat(DIRS);
  simpleDialog('Добавить', [{k:'title',l:'Название',req:true},{k:'cat',l:'Категория'},{k:'aud',l:'Доступно',opts:aud},{k:'ver',l:'Версия',ph:'v1'}], async value => {
    const session = JSON.parse(localStorage.getItem(SUPABASE_SESSION_KEY) || 'null');
    const audienceCode = {'Офис':'office','Склад':'warehouse','Производство':'production'}[value.aud];
    let audienceUnitId = null;
    if(audienceCode){
      const units = await supabaseRequest(`/rest/v1/org_units?select=id&code=eq.${encodeURIComponent(audienceCode)}&parent_id=is.null&limit=1`,{accessToken:session?.access_token});
      audienceUnitId = units[0]?.id || null;
      if(!audienceUnitId) throw new Error(`Не найдено направление «${value.aud}» в org_units.`);
    }
    const dbKind = kind === 'corpDocs' ? 'corporate' : kind === 'templates' ? 'template' : 'document';
    const slug = `${translit(value.title).slice(0,48) || 'material'}-${Date.now()}`;
    await supabaseRequest('/rest/v1/materials',{
      method:'POST',
      body:{slug,kind:dbKind,title:value.title,category:value.cat || '',version:value.ver || 'v1',audience_unit_id:audienceUnitId,is_published:true},
      accessToken:session?.access_token,
      prefer:'return=minimal'
    });
    DB[kind].push({title:value.title,cat:value.cat,aud:value.aud,ver:value.ver || 'v1',updated:today()});
  });
}

function renderReports(){
  const adapt = DB.employees.filter(e => e.adapt);
  const cards = [
    { label: 'Сотрудники на адаптации', value: adapt.length, href: 'reports.html?tab=adapt-count' },
    { label: 'Ждут проверки', value: waitingList().length, href: 'reports.html?tab=waiting' },
    { label: 'Новые ответы на опросы', value: surveyResponseCount(), href: 'reports.html?tab=answers' },
    { label: 'Снижение оценок', value: dropList().length, href: 'reports.html?tab=drops' },
    { label: 'Новые идеи в банке', value: DB.ideas.length, href: 'surveys.html?tab=ideas' }
  ];
  set('rep-dashboard', cards.map(item => `
    <a class="kpi" href="${item.href}">
      <div class="card">
        <div class="num">${item.value}</div>
        <div class="lbl">${item.label}</div>
      </div>
    </a>
  `).join(''));

  const alerts = [
    { title: 'На адаптации', text: adapt.length > 0 ? `${adapt.length} сотрудника требуют текущей проверки и поддержки.` : 'Нет активных сотрудников на адаптации.' },
    { title: 'Ждут проверки', text: waitingList().length > 0 ? `${waitingList().length} задач ждут финального подтверждения.` : 'Все задачи проверены.' },
    { title: 'Опросы', text: DB.surveys.some(survey => survey.status === 'Активна') ? `Активных опросов: ${DB.surveys.filter(survey => survey.status === 'Активна').length}.` : 'Активных опросов нет.' },
    { title: 'Новые идеи', text: DB.ideas.length > 0 ? `${DB.ideas.length} новых идеи в банке изменений.` : 'Идей не найдено.' }
  ];
  set('rep-alerts', alerts.map(item => `
    <div class="report-alert">
      <strong>${esc(item.title)}</strong>
      <span>${esc(item.text)}</span>
    </div>
  `).join(''));

  const reports = [
    { title: 'Отчёт по адаптации', desc: 'Краткая сводка по сотрудникам в адаптационном процессе', file: 'report-adaptation' },
    { title: 'Отчёт по оценкам', desc: 'Сравнение оценок до и после адаптации', file: 'report-evaluations' },
    { title: 'Отчёт по опросам', desc: 'Статус и результаты текущих опросов', file: 'report-surveys' },
    { title: 'Сводный HR-отчёт', desc: 'Итоговый обзор по задачам, инициативам и статусам', file: 'report-summary' }
  ];
  set('rep-downloads', reports.map(item => `
    <div class="report-download-card">
      <div>
        <h3>${esc(item.title)}</h3>
      </div>
      <p>${esc(item.desc)}</p>
      <button class="btn btn-primary" type="button" onclick="downloadReport('${esc(item.file)}', '${esc(item.title)}')">Скачать</button>
    </div>
  `).join(''));
}

function downloadReport(fileName, title){
  const adapt = DB.employees.filter(e => e.adapt);
  const lines = [
    `Отчёт: ${title}`,
    `Дата: ${today()}`,
    '',
    'Сводка:',
    `- Сотрудники на адаптации: ${adapt.length}`,
    `- Ждут проверки: ${waitingList().length}`,
    `- Ответы на опросы: ${surveyResponseCount()}`,
    ...(DB.surveyResponses || []).map(response => `  - ${response.title} — ${emp(response.employeeId)?.name || 'Сотрудник'}: ${response.answer}`),
    `- Снижение оценок: ${dropList().length}`,
    `- Новые идеи: ${DB.ideas.length}`,
    '',
    'Сотрудники на адаптации:',
    ...adapt.map(e => `- ${e.name} (${e.pos}) — прогресс ${progress(e)}%`),
    '',
    'Сгенерировано из локального прототипа ProSafe.'
  ];
  const blob = new Blob([lines.join('\n')], {type: 'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast('Отчёт скачан');
}

function renderAdapt(){
  const list = DB.employees.filter(e => e.adapt);
  set('adapt-table', tbl(['ФИО','Руководитель адаптации','День','Прогресс','Статус'],
    list.map(e => [nameLink(e), esc(e.mgr), dayOf(e), progressCell(progress(e)), pill(e.status)]), 'Сотрудников на адаптации пока нет'));

  const posSel = $('plan-pos');
  if(posSel){
    const curPos = posSel.value || (DB.positions[0] && DB.positions[0].name) || '';
    posSel.innerHTML = DB.positions.length ? DB.positions.map(p => `<option value="${esc(p.name)}">${esc(p.name)}</option>`).join('') : '<option value="">Нет должностей</option>';
    if(DB.positions.some(p => p.name === curPos)) posSel.value = curPos;
    if(!posSel.value && DB.positions[0]) posSel.value = DB.positions[0].name;
    renderPositionPlan();
  }

  const sel = $('plan-emp');
  if(sel){
    const cur = sel.value;
    sel.innerHTML = list.map(e => `<option value="${e.id}">${esc(e.name)}</option>`).join('');
    if(list.some(e => String(e.id) === cur)) sel.value = cur;
    renderPlanTable(sel.value);
  }
}
function renderPositionPlan(){
  const select = $('plan-pos');
  const el = $('plan-template-list');
  if(!select || !el) return;
  const pos = DB.positions.find(p => p.name === select.value) || DB.positions[0];
  if(!pos){
    el.innerHTML = '<div class="card empty">Шаблонов должностей пока нет</div>';
    return;
  }
  const tasks = pos.tpl || [];
  el.innerHTML = tasks.length ? tasks.map((t, idx) => `
    <div class="plan-template-item">
      <div class="head">
        <button type="button" class="linkbtn" onclick="openPlanTaskEditor(${idx})">${esc(t.title)}</button>
        <div class="actions" style="margin:0">
          <button type="button" class="btn" onclick="openPlanTaskEditor(${idx})">Изменить</button>
          <button type="button" class="btn btn-ghost" onclick="removePlanTask(${idx})">Удалить</button>
        </div>
      </div>
      <div class="meta">День ${esc(t.day || 1)} · ${esc(t.from || '—')} – ${esc(t.to || '—')} · Место: ${esc(t.place || '—')} · Ответственный: ${esc(t.resp || 'HR')}</div>
    </div>
  `).join('') : '<div class="card empty">Для этой должности шаблон пока пуст. Добавьте шаги адаптации.</div>';
}
function openPlanTaskEditor(index){
  const select = $('plan-pos');
  const pos = DB.positions.find(p => p.name === select.value) || DB.positions[0];
  if(!pos){ alert('Сначала выберите должность'); return; }
  pos.tpl = pos.tpl || [];
  const task = index !== undefined && index !== null ? (pos.tpl[index] || {}) : { title:'', day:1, from:'', to:'', resp:'HR' };
  $('dlgForm').innerHTML = `
    <h2>${index !== undefined && index !== null ? 'Редактировать задачу шаблона' : 'Добавить задачу шаблона'}</h2>
    <label for="pt_title">Название задачи *</label>
    <input id="pt_title" value="${esc(task.title || '')}">
    <div class="cols" style="gap:12px">
      <div><label for="pt_day">День адаптации</label><input id="pt_day" type="number" min="1" value="${esc(String(task.day || 1))}"></div>
      <div><label for="pt_place">Место</label><input id="pt_place" value="${esc(task.place || '')}"></div>
    </div>
    <div class="cols" style="gap:12px">
      <div><label for="pt_resp">Ответственный</label><input id="pt_resp" value="${esc(task.resp || 'HR')}"></div>
      <div><label for="pt_from">Время с</label><input id="pt_from" type="time" value="${esc(task.from || '')}"></div>
      <div><label for="pt_to">Время до</label><input id="pt_to" type="time" value="${esc(task.to || '')}"></div>
    </div>
    <div class="actions" style="margin-top:20px">
      <button type="button" class="btn btn-primary" id="pt_save">Сохранить</button>
      <button type="button" class="btn" onclick="$('dlg').close()">Отмена</button>
    </div>`;
  $('pt_save').onclick = () => {
    const title = $('pt_title').value.trim();
    const day = Number($('pt_day').value) || 1;
    const taskObj = { title, day, from:$('pt_from').value, to:$('pt_to').value, place:$('pt_place').value.trim() || '—', resp:$('pt_resp').value.trim() || 'HR' };
    if(!title){ alert('Укажите название задачи'); return; }
    if(index !== undefined && index !== null){ pos.tpl[index] = taskObj; } else { pos.tpl.push(taskObj); }
    pos.updated = today();
    save();
    $('dlg').close();
    renderAdapt();
    toast('Шаблон обновлён');
  };
  $('dlg').showModal();
}
function removePlanTask(index){
  const select = $('plan-pos');
  const pos = DB.positions.find(p => p.name === select.value) || DB.positions[0];
  if(!pos) return;
  pos.tpl = pos.tpl || [];
  pos.tpl.splice(index, 1);
  pos.updated = today();
  save();
  renderAdapt();
  toast('Задача удалена');
}
function renderPlanTable(empId){
  const e = emp(empId); const ts = DB.tasks[empId] || [];
  set('plan-table', tbl(['День','Дата','Время','Место','Задача','Ответственный','Статус','Действие'],
    ts.map((t,index) => [t.day, taskDateFor(e && e.start, t.day), `${esc(t.from||'—')} – ${esc(t.to||'—')}`, esc(t.place || '—'), `<button type="button" class="linkbtn" onclick="openEmployeeTaskEditor(${Number(empId)},${index})">${esc(t.title)}</button>`, t.respId ? pName(t.respId, t.resp) : esc(t.resp||'—'), pill(t.status), `<button type="button" class="btn" onclick="openEmployeeTaskEditor(${Number(empId)},${index})">Изменить</button>`]),
    'В плане пока нет задач'));
}
function openEmployeeTaskEditor(employeeId,index){
  const account = currentUser();
  const employee = emp(employeeId);
  const task = DB.tasks[employeeId]?.[index];
  if(!account || account.role !== 'HR' || !employee || !task){ toast('Нет доступа к изменению задачи'); return; }
  $('dlgForm').innerHTML = `<h2>Изменить задачу плана</h2>
    <label for="hr-task-title">Название задачи *</label><input id="hr-task-title" value="${esc(task.title)}">
    <div class="cols" style="gap:12px"><div><label for="hr-task-day">День адаптации</label><input id="hr-task-day" type="number" min="1" max="60" value="${esc(task.day || 1)}"></div><div><label for="hr-task-place">Место</label><input id="hr-task-place" value="${esc(task.place || '')}"></div></div>
    <div class="cols" style="gap:12px"><div><label for="hr-task-from">Время с</label><input id="hr-task-from" type="time" value="${esc(task.from || '')}"></div><div><label for="hr-task-to">Время до</label><input id="hr-task-to" type="time" value="${esc(task.to || '')}"></div></div>
    <label for="hr-task-resp">Ответственный</label><select id="hr-task-resp"><option value="">Не назначен</option>${DB.employees.map(person => `<option value="${person.id}" ${Number(task.respId || DB.employees.find(item => item.name.toLowerCase() === String(task.resp || '').trim().toLowerCase())?.id) === person.id ? 'selected' : ''}>${esc(person.name)} · ${esc(person.pos)}</option>`).join('')}</select>
    <label for="hr-task-status">Статус</label><select id="hr-task-status">${['Назначена','В работе','Выполнена','Ожидает проверки','Проверена руководителем'].map(status => `<option ${status === task.status ? 'selected' : ''}>${esc(status)}</option>`).join('')}</select>
    <div class="actions" style="margin-top:20px"><button type="button" class="btn btn-primary" onclick="saveEmployeeTask(${employeeId},${index})">Сохранить</button><button type="button" class="btn" onclick="$('dlg').close()">Отмена</button></div>`;
  $('dlg').showModal();
}
function saveEmployeeTask(employeeId,index){
  const account = currentUser();
  const employee = emp(employeeId);
  const task = DB.tasks[employeeId]?.[index];
  const title = $('hr-task-title').value.trim();
  if(!account || account.role !== 'HR' || !employee || !task){ toast('Нет доступа к изменению задачи'); return; }
  if(!title){ alert('Укажите название задачи.'); return; }
  const respId = $('hr-task-resp').value ? Number($('hr-task-resp').value) : null;
  task.title = title;
  task.day = Math.max(1,Math.min(60,Number($('hr-task-day').value) || 1));
  task.place = $('hr-task-place').value.trim() || '—';
  task.from = $('hr-task-from').value;
  task.to = $('hr-task-to').value;
  task.respId = respId;
  task.resp = respId ? emp(respId)?.name || '—' : '—';
  task.status = $('hr-task-status').value;
  save();
  $('dlg').close();
  renderAdapt();
  toast('Задача плана обновлена');
}

function renderSurveys(){
  const adapt = DB.employees.filter(e => e.adapt);
  const cards = [
    { label: 'Новые результаты оценки адаптации', value: DB.evals.length, tone: 'olive' },
    { label: 'Новые ответы по опросам', value: surveyResponseCount(), tone: 'terracotta' },
    { label: 'Новых идей в банке', value: DB.ideas.length, tone: 'sand' }
  ];

  set('ev-emp', adapt.map(e => `<option value="${e.id}">${esc(e.name)}</option>`).join('') || '<option value="">Нет сотрудников на адаптации</option>');

  set('survey-overview', `
    <div class="survey-shell">
      <div class="survey-head">
        <div>
          <div class="survey-kicker">HR-оперативка</div>
          <h2>Что важно сейчас</h2>
        </div>
        <button class="btn btn-primary" type="button" onclick="openSurvey()">Создать опрос</button>
      </div>
      <div class="survey-grid">
        ${cards.map(item => `
          <div class="survey-kpi ${item.tone}">
            <div class="survey-kpi-value">${item.value}</div>
            <div class="survey-kpi-label">${esc(item.label)}</div>
          </div>
        `).join('')}
      </div>
      <div class="survey-panels">
        <div class="survey-card survey-card-wide">
          <div class="section-head">
            <h3>Запросить оценку адаптации</h3>
            <span class="chip">Новый</span>
          </div>
          <div class="survey-form">
            <label for="ev-emp-inline">Сотрудник</label>
            <select id="ev-emp-inline">${adapt.map(e => `<option value="${e.id}">${esc(e.name)}</option>`).join('') || '<option value="">Нет сотрудников</option>'}</select>
            <label for="ev-rec-inline">Кому отправить</label>
            <select id="ev-rec-inline"><option>Руководитель адаптации</option><option>Наставник</option><option>Оба</option></select>
            <button class="btn btn-primary" type="button" onclick="sendEvalFromOverview()">Отправить запрос</button>
          </div>
        </div>
        <div class="survey-card">
          <div class="section-head">
            <h3>Активные опросы</h3>
            <span class="chip neutral">${DB.surveys.filter(survey => survey.status === 'Активна').length}</span>
          </div>
          <div class="survey-list">
            ${DB.surveys.some(survey => survey.status === 'Активна') ? DB.surveys.filter(survey => survey.status === 'Активна').map(s => `
              <div class="survey-item">
                <div class="survey-item-head">
                  <strong>${esc(s.title)}</strong>
                  ${pill(s.status)}
                </div>
                <div class="survey-item-meta">${esc(s.aud)} · Ответили: ${esc(s.sent)}</div>
              </div>
            `).join('') : '<div class="empty-soft">Опросов пока нет</div>'}
          </div>
        </div>
      </div>
    </div>
  `);

  set('survey-list', `
    <div class="survey-shell compact-shell">
      <div class="section-head">
        <h2>Список опросов</h2>
        <button class="btn btn-primary" type="button" onclick="openSurvey()">Создать опрос</button>
      </div>
      <div class="survey-list large-list">
        ${DB.surveys.length ? DB.surveys.map(s => `
          <div class="survey-item">
            <div class="survey-item-head">
              <div>
                <strong>${esc(s.title)}</strong>
                <div class="survey-item-meta">${esc(s.aud)} · ответили ${esc(s.sent)}</div>
              </div>
              ${pill(s.status)}
            </div>
            <div class="survey-item-actions">
              <button class="btn btn-ghost" type="button">Просмотр</button>
              <button class="btn" type="button">Экспорт</button>
            </div>
          </div>
        `).join('') : '<div class="empty-soft">Опросов пока нет</div>'}
      </div>
    </div>
  `);

  set('res-evals', `
    <div class="survey-shell compact-shell">
      <div class="section-head"><h2>Результаты оценок</h2></div>
      <div class="survey-list large-list">
        ${DB.evals.length ? DB.evals.map(x => `
          <div class="survey-item result-row">
            <div>
              <strong>${pName(x.empId, x.emp)}</strong>
              <div class="survey-item-meta">Этап: ${esc(x.stage)} · Руководитель: ${esc(x.by || '—')}</div>
            </div>
            <div class="survey-item-status">${pill(x.sent)}</div>
          </div>
        `).join('') : '<div class="empty-soft">Оценок пока нет</div>'}
      </div>
    </div>
  `);

  set('res-surveys', `
    <div class="survey-shell compact-shell">
      <div class="section-head"><h2>Результаты опросов</h2></div>
      <div class="survey-list large-list">
        ${(DB.surveyResponses || []).length ? DB.surveyResponses.map(response => `
          <div class="survey-item result-row">
            <div>
              <strong>${esc(response.title)}</strong>
              <div class="survey-item-meta">${pName(response.employeeId)} · ${esc(response.date)}</div>
              <p>${esc(response.answer)}</p>
            </div>
          </div>
        `).join('') : '<div class="empty-soft">Ответов пока нет</div>'}
      </div>
    </div>
  `);

  set('ideas-list', `
    <div class="survey-shell compact-shell">
      <div class="section-head"><h2>Банк идей</h2></div>
      <div class="survey-list large-list">
        ${DB.ideas.length ? DB.ideas.map(i => `
          <div class="survey-item result-row">
            <div>
              <strong>${esc(i.text)}</strong>
              <div class="survey-item-meta">Дата: ${esc(i.date)}</div>
            </div>
            <div class="survey-item-status"><span class="chip neutral">Идея</span></div>
          </div>
        `).join('') : '<div class="empty-soft">Предложений пока нет</div>'}
      </div>
      <p class="hint" style="margin-top:12px">Дата хранится. Авторство не хранится (принятый риск).</p>
    </div>
  `);

  const feedbackMessages = (DB.feedbackMessages || []).slice().reverse();
  set('feedback-inbox', `
    <div class="survey-shell compact-shell">
      <div class="section-head"><h2>Обращения к HR</h2><span class="chip">${feedbackMessages.length}</span></div>
      <div class="survey-list large-list">
        ${feedbackMessages.length ? feedbackMessages.map(message => `
          <article class="survey-item result-row">
            <div><strong>${esc(message.employeeName || emp(message.employeeId)?.name || 'Сотрудник')}</strong>
              <div class="survey-item-meta">Кому: ${esc(message.toName || 'HR')} · ${esc(message.date || '')}</div>
              <p>${esc(message.text)}</p>
            </div>
            <span class="chip neutral">${esc(message.status || 'Новое')}</span>
          </article>`).join('') : '<div class="empty-soft">Новых обращений пока нет.</div>'}
      </div>
      <div class="section-head" style="margin-top:24px"><h2>Анонимные идеи</h2><span class="chip">${DB.ideas.length}</span></div>
      <div class="survey-list large-list">
        ${DB.ideas.length ? DB.ideas.slice().reverse().map(idea => `
          <article class="survey-item result-row"><div><strong>${esc(idea.text)}</strong><div class="survey-item-meta">Дата: ${esc(idea.date || '')} · Автор анонимен</div></div><span class="chip neutral">Банк идей</span></article>
        `).join('') : '<div class="empty-soft">Идей пока нет.</div>'}
      </div>
    </div>
  `);
}

function sendEvalFromOverview(){
  const e = emp($('ev-emp-inline').value);
  if(!e){ alert('Выберите сотрудника'); return; }
  DB.evals.push({empId:e.id, emp:e.name, stage:'День ' + dayOf(e), sent:'Отправлена', by:$('ev-rec-inline').value});
  save(); renderSurveys(); toast('Запрос на оценку отправлен');
}
function sendEval(){
  const e = emp($('ev-emp').value);
  if(!e){ alert('Выберите сотрудника'); return; }
  DB.evals.push({empId:e.id, emp:e.name, stage:'День ' + dayOf(e), sent:'Отправлена', by:$('ev-rec').value});
  save(); renderSurveys(); toast('Запрос на оценку отправлен');
}
function openSurvey(){
  simpleDialog('Новый опрос', [{k:'title',l:'Название',req:true},{k:'question',l:'Вопрос',req:true},{k:'options',l:'Варианты ответа (через «;»)',ph:'1; 2; 3'},{k:'aud',l:'Назначение',opts:['По должности','По сотруднику','Общий']}], v => {
    DB.surveys.push({title:v.title, question:v.question, options:v.options, aud:v.aud, sent:'0 из 0', status:'Черновик'});
  });
}

function renderAccess(){
  const errors = 3;
  set('acc-total', DB.users.length);
  set('acc-active', DB.users.filter(u => u.status !== 'Заблокирована').length);
  set('acc-blocked', DB.users.filter(u => u.status === 'Заблокирована').length);
  set('acc-errors', errors);
  set('users-table', tbl(['ФИО','Логин','Роль','Сотрудник','Статус','Действие'], DB.users.map((u, index) => [
    esc(u.name), esc(u.login), esc(u.role), esc(emp(u.employeeId)?.name || u.employeeName || '—'), pill(u.status),
    `<button type="button" class="btn" onclick="openUser(${index})">Настроить доступ</button>`
  ]), 'Пользователей пока нет'));
}
let USER_EDIT_INDEX = null;
function openUser(index){
  USER_EDIT_INDEX = Number.isInteger(index) ? index : null;
  const user = USER_EDIT_INDEX === null ? {name:'',login:'',role:'Сотрудник',employeeId:'',managedEmployeeIds:[],status:'Активна'} : DB.users[USER_EDIT_INDEX];
  const roles = ['HR', ...EMPLOYEE_ROLES];
  const supabaseEmployees = DB.employees.filter(employee => SUPABASE_EMPLOYEE_DB_IDS.has(employee.id));
  $('dlgForm').innerHTML = `
    <h2>${USER_EDIT_INDEX === null ? 'Добавить доступ' : 'Настроить доступ'}</h2>
    <label for="u_name">ФИО *</label><input id="u_name" value="${esc(user.name)}" required>
    <label for="u_login">Корпоративный email для входа *</label><input id="u_login" type="email" value="${esc(user.login)}" autocomplete="email" required>
    <label for="u_role">Доступ</label><select id="u_role" onchange="toggleManagedEmployees()">${roles.map(role => `<option ${role === user.role ? 'selected' : ''}>${esc(role)}</option>`).join('')}</select>
    <label for="u_employee">Связанный профиль сотрудника</label>
    <select id="u_employee"><option value="">Не связан</option>${supabaseEmployees.map(employee => `<option value="${employee.id}" ${String(employee.id) === String(user.employeeId) ? 'selected' : ''}>${esc(employee.name)} · ${esc(employee.pos)}</option>`).join('')}</select>
    <div id="u-managed-wrap" class="user-managed-wrap" ${isAdaptationManager(user.role) ? '' : 'hidden'}>
      <label>Сотрудники в зоне адаптации</label>
      <div class="user-managed-list">${supabaseEmployees.filter(employee => employee.id !== Number(user.employeeId)).map(employee => `<label class="check"><input type="checkbox" name="managed-employee" value="${employee.id}" ${(user.managedEmployeeIds || []).includes(employee.id) ? 'checked' : ''}> ${esc(employee.name)} · ${esc(employee.pos)}</label>`).join('')}</div>
    </div>
    <label for="u_status">Статус доступа</label><select id="u_status"><option ${user.status === 'Активна' ? 'selected' : ''}>Активна</option><option ${user.status === 'Заблокирована' ? 'selected' : ''}>Заблокирована</option></select>
    <p class="hint">Для сотрудника выберите связанный профиль. Новому пользователю будет создан реальный вход Supabase и показан одноразовый пароль. Руководитель адаптации увидит только отмеченных здесь сотрудников.</p>
    <div class="actions" style="margin-top:20px"><button type="button" class="btn btn-primary" onclick="saveUser()">Сохранить</button><button type="button" class="btn" onclick="$('dlg').close()">Отмена</button></div>`;
  $('dlg').showModal();
}
function toggleManagedEmployees(){
  const role = $('u_role').value;
  $('u-managed-wrap').hidden = !isAdaptationManager(role);
}
async function saveUser(){
  const id = $('u_login').value.trim().toLowerCase();
  const name = $('u_name').value.trim();
  const role = $('u_role').value;
  const employeeId = $('u_employee').value ? Number($('u_employee').value) : null;
  const duplicate = DB.users.some((user, index) => index !== USER_EDIT_INDEX && String(user.login).toLowerCase() === id);
  if(!name || !id){ alert('Укажите ФИО и логин.'); return; }
  if(!$('u_login').validity.valid){ alert('Укажите корректный корпоративный email.'); return; }
  if(duplicate){ alert('Такой email уже используется.'); return; }
  if(isEmployeeRole(role) && !employeeId){ alert('Для сотрудника выберите связанный профиль.'); return; }
  const managedEmployeeIds = isAdaptationManager(role)
    ? [...document.querySelectorAll('[name="managed-employee"]:checked')].map(input => Number(input.value))
    : [];
  const employeeDbId = employeeId && role !== 'HR' ? SUPABASE_EMPLOYEE_DB_IDS.get(employeeId) : null;
  if(employeeId && role !== 'HR' && !employeeDbId){ alert('Профиль сотрудника не загружен из Supabase. Обновите страницу и повторите попытку.'); return; }
  const button = $('dlgForm').querySelector('.btn-primary');
  $('access-save-error')?.remove();
  button.disabled = true;
  try{
    let result;
    if(USER_EDIT_INDEX === null){
      result = await manageSupabaseEmployee({
        action:'create_user',
        user:{name,email:id,role:SUPABASE_ROLE_CODES[role],employee_id:employeeDbId}
      });
    }else{
      const user = DB.users[USER_EDIT_INDEX];
      result = await manageSupabaseEmployee({
        action:'update_access',
        user:{profile_id:user.id,name,email:id,role:SUPABASE_ROLE_CODES[role],employee_id:employeeDbId,status:$('u_status').value}
      });
    }
    await loadSupabaseAccessUsers();
    save();
    $('dlg').close();
    renderAccess();
    if(result.password){
      $('dlgForm').innerHTML = `<h2>Доступ создан</h2><div class="card"><p>Логин: <b>${esc(id)}</b></p><p>Пароль: <b>${esc(result.password)}</b></p><p class="hint">Скопируйте пароль и передайте сотруднику лично. Повторно он не отображается.</p></div><div class="actions" style="margin-top:16px"><button type="button" class="btn btn-primary" onclick="$('dlg').close()">Готово</button></div>`;
      $('dlg').showModal();
    }else toast('Доступ сохранён в Supabase');
  }catch(error){
    const errorBox = document.createElement('p');
    errorBox.id = 'access-save-error';
    errorBox.className = 'login-error';
    errorBox.setAttribute('role','alert');
    errorBox.textContent = `Не удалось сохранить доступ в Supabase: ${error.message}`;
    button.before(errorBox);
    button.disabled = false;
  }
}

const SUPABASE_URL = 'https://zamkapigzsqgzfbblmjs.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_AakomiPsWGcahryo8go5tQ_0FmCo2s2';
const SUPABASE_SESSION_KEY = 'prosafe.supabase.session.v1';
const SUPABASE_ACCOUNT_KEY = 'prosafe.supabase.account.v1';
const SUPABASE_ROLE_NAMES = {
  hr:'HR',
  employee:'Сотрудник',
  employee_onboarding:'Сотрудник с адаптацией',
  adaptation_manager:'Сотрудник — руководитель адаптации'
};
const SUPABASE_ROLE_CODES = Object.fromEntries(Object.entries(SUPABASE_ROLE_NAMES).map(([code,name]) => [name,code]));
const SUPABASE_EMPLOYEE_IDS = {
  'anna-mikhailova':101,
  'igor-kuznetsov':102,
  'olga-petrova':103,
  'elena-soloveva':104
};
const SUPABASE_EMPLOYEE_APP_IDS = new Map();
const SUPABASE_EMPLOYEE_DB_IDS = new Map();
function supabaseEmployeeAppId(employee){
  if(SUPABASE_EMPLOYEE_IDS[employee.seed_key]){
    SUPABASE_EMPLOYEE_DB_IDS.set(SUPABASE_EMPLOYEE_IDS[employee.seed_key],employee.id);
    return SUPABASE_EMPLOYEE_IDS[employee.seed_key];
  }
  if(SUPABASE_EMPLOYEE_APP_IDS.has(employee.id)){
    const existingId = SUPABASE_EMPLOYEE_APP_IDS.get(employee.id);
    SUPABASE_EMPLOYEE_DB_IDS.set(existingId,employee.id);
    return existingId;
  }
  const id = Math.max(100,...DB.employees.map(person => Number(person.id) || 0)) + 1;
  SUPABASE_EMPLOYEE_APP_IDS.set(employee.id,id);
  SUPABASE_EMPLOYEE_DB_IDS.set(id,employee.id);
  return id;
}
function supabaseHeaders(accessToken){
  return {
    apikey:SUPABASE_PUBLISHABLE_KEY,
    Authorization:`Bearer ${accessToken || SUPABASE_PUBLISHABLE_KEY}`,
    'Content-Type':'application/json'
  };
}
async function supabaseRequest(path,{method='GET',body,accessToken,prefer}={}){
  const response = await fetch(`${SUPABASE_URL}${path}`,{
    method,
    headers:{...supabaseHeaders(accessToken),...(prefer ? {Prefer:prefer} : {})},
    ...(body === undefined ? {} : {body:JSON.stringify(body)})
  });
  const text = await response.text();
  let result = null;
  if(text){
    try{ result = JSON.parse(text); }
    catch{ throw new Error('Supabase вернул ответ в неизвестном формате.'); }
  }
  if(!response.ok){
    const message = result?.msg || result?.message || result?.error_description || result?.error || `HTTP ${response.status}`;
    throw new Error(`Ошибка Supabase: ${message}`);
  }
  return result;
}
async function manageSupabaseEmployee(body){
  const session = JSON.parse(localStorage.getItem(SUPABASE_SESSION_KEY) || 'null');
  if(!session?.access_token) throw new Error('Сессия Supabase завершилась. Войдите в портал ещё раз.');
  return await supabaseRequest('/functions/v1/manage-employee',{
    method:'POST',body,accessToken:session.access_token
  });
}
function saveSupabaseSession(session,account){
  localStorage.setItem(SUPABASE_SESSION_KEY,JSON.stringify({
    access_token:session.access_token,
    refresh_token:session.refresh_token,
    expires_at:session.expires_at || Math.floor(Date.now()/1000) + Number(session.expires_in || 3600)
  }));
  localStorage.setItem(SUPABASE_ACCOUNT_KEY,JSON.stringify(account));
}
function clearSupabaseSession(){
  localStorage.removeItem(SUPABASE_SESSION_KEY);
  localStorage.removeItem(SUPABASE_ACCOUNT_KEY);
}
async function supabaseAccountFor(session){
  const accessToken = session.access_token;
  const authUser = await supabaseRequest('/auth/v1/user',{accessToken});
  const profiles = await supabaseRequest(`/rest/v1/profiles?select=id,role,employee_id&id=eq.${encodeURIComponent(authUser.id)}&limit=1`,{accessToken});
  const profile = profiles?.[0];
  if(!profile || !SUPABASE_ROLE_NAMES[profile.role]){
    throw new Error('Для пользователя не настроена допустимая роль в public.profiles. Попросите HR проверить профиль Supabase.');
  }
  let employee = null;
  if(profile.employee_id){
    const employees = await supabaseRequest(`/rest/v1/employees?select=id,seed_key,display_name,job_title,org_unit_id,start_date,status,adaptation_enabled,org_units(id,code,name,parent_id)&id=eq.${encodeURIComponent(profile.employee_id)}&limit=1`,{accessToken});
    employee = employees?.[0] || null;
    if(!employee) throw new Error('Для учётной записи не найден профиль сотрудника в public.employees.');
    const stableId = supabaseEmployeeAppId(employee);
    const department = employee.org_units?.name || '';
    const localEmployee = emp(stableId) || {
      id:stableId,
      phone:'',
      email:authUser.email || '',
      contacts:false,
      resp:{}
    };
    Object.assign(localEmployee,{
      name:employee.display_name,
      pos:employee.job_title,
      dept:department,
      dir:employee.org_units?.code === 'office' || employee.org_units?.parent_id === null ? department : (employee.org_units?.name || department),
      start:employee.start_date || '',
      status:employee.status === 'active' ? 'Активна' : employee.status,
      adapt:employee.adaptation_enabled
    });
    if(!emp(stableId)) DB.employees.push(localEmployee);
    employee.appId = stableId;
  }
  return {
    id:authUser.id,
    name:employee?.display_name || authUser.email,
    login:authUser.email,
    email:authUser.email,
    role:SUPABASE_ROLE_NAMES[profile.role],
    employeeId:employee?.appId || null,
    managedEmployeeIds:[],
    status:'Активна',
    supabaseProfileId:profile.id
  };
}
async function restoreSupabaseSession(){
  let session;
  try{ session = JSON.parse(localStorage.getItem(SUPABASE_SESSION_KEY) || 'null'); }
  catch{ clearSupabaseSession(); return null; }
  if(!session?.access_token || !session?.refresh_token){ clearSupabaseSession(); return null; }
  try{
    if(Number(session.expires_at) <= Math.floor(Date.now()/1000) + 30){
      session = await supabaseRequest('/auth/v1/token?grant_type=refresh_token',{
        method:'POST',
        body:{refresh_token:session.refresh_token}
      });
    }
    const account = await supabaseAccountFor(session);
    saveSupabaseSession(session,account);
    return account;
  }catch(error){
    if(/HTTP 401|invalid JWT|refresh token/i.test(error.message)){
      clearSupabaseSession();
      return null;
    }
    throw error;
  }
}
async function loadSupabaseEmployeeContent(){
  const session = JSON.parse(localStorage.getItem(SUPABASE_SESSION_KEY) || 'null');
  if(!session?.access_token) throw new Error('Сессия Supabase завершилась. Войдите в портал ещё раз.');
  const token = session.access_token;
  const [historyRows,faqRows,orgUnits,employeeRows,contactRows,materialRows] = await Promise.all([
    supabaseRequest('/rest/v1/company_history?select=title,body,updated_at&is_published=eq.true&order=updated_at.desc&limit=1',{accessToken:token}),
    supabaseRequest('/rest/v1/faqs?select=question,answer,sort_order&is_published=eq.true&order=sort_order.asc',{accessToken:token}),
    supabaseRequest('/rest/v1/org_units?select=id,code,name,parent_id',{accessToken:token}),
    supabaseRequest('/rest/v1/employees?select=id,seed_key,display_name,job_title,org_unit_id,manager_id,start_date,status,adaptation_enabled,directory_visible,org_units(id,code,name,parent_id)',{accessToken:token}),
    supabaseRequest('/rest/v1/employee_contacts?select=employee_id,phone,email,visible_to_employees',{accessToken:token}),
    supabaseRequest('/rest/v1/materials?select=id,kind,title,category,version,storage_path,audience_unit_id,featured,updated_at&is_published=eq.true&order=featured.desc,title.asc',{accessToken:token})
  ]);
  if(historyRows[0]) DB.history = historyRows[0].body;
  DB.faq = faqRows.map(row => ({q:row.question,a:row.answer}));
  const unitById = new Map(orgUnits.map(unit => [unit.id,unit]));
  const unitRoot = unit => {
    let current = unit;
    while(current?.parent_id && unitById.has(current.parent_id)) current = unitById.get(current.parent_id);
    return current;
  };
  const contactsByEmployeeId = new Map(contactRows.map(contact => [contact.employee_id,contact]));
  employeeRows.forEach(row => {
    const unit = row.org_units || unitById.get(row.org_unit_id);
    const root = unitRoot(unit);
    const contact = contactsByEmployeeId.get(row.id);
    const stableId = supabaseEmployeeAppId(row);
    const person = emp(stableId) || {id:stableId,phone:'',email:'',contacts:false,resp:{}};
    Object.assign(person,{
      name:row.display_name,
      pos:row.job_title,
      dept:unit?.name || '',
      dir:root?.name || unit?.name || '',
      start:row.start_date || '',
      status:row.status === 'active' ? 'Активна' : row.status,
      adapt:row.adaptation_enabled,
      phone:contact?.phone || '',
      email:contact?.email || '',
      contacts:Boolean(contact?.visible_to_employees)
    });
    if(!emp(stableId)) DB.employees.push(person);
  });
  const convertMaterial = (row,kind) => {
    const audience = row.audience_unit_id ? unitById.get(row.audience_unit_id) : null;
    return {
      id:row.id,
      title:row.title,
      cat:row.category,
      aud:audience?.name || 'Все',
      ver:row.version,
      updated:row.updated_at ? row.updated_at.slice(0,10) : '',
      storagePath:row.storage_path,
      featured:row.featured
    };
  };
  DB.docs = materialRows.filter(row => row.kind === 'document').map(row => convertMaterial(row,'docs'));
  DB.templates = materialRows.filter(row => row.kind === 'template').map(row => convertMaterial(row,'templates'));
  DB.corpDocs = materialRows.filter(row => row.kind === 'corporate').map(row => convertMaterial(row,'corpDocs'));
  DB.employees.sort((a,b) => a.name.localeCompare(b.name,'ru'));
}
async function loadSupabaseDirectory(){
  const session = JSON.parse(localStorage.getItem(SUPABASE_SESSION_KEY) || 'null');
  if(!session?.access_token) throw new Error('Сессия Supabase завершилась. Войдите в портал ещё раз.');
  const [orgUnits,employeeRows,contactRows] = await Promise.all([
    supabaseRequest('/rest/v1/org_units?select=id,code,name,parent_id',{accessToken:session.access_token}),
    supabaseRequest('/rest/v1/employees?select=id,seed_key,display_name,job_title,org_unit_id,start_date,status,adaptation_enabled,org_units(id,code,name,parent_id)',{accessToken:session.access_token}),
    supabaseRequest('/rest/v1/employee_contacts?select=employee_id,phone,email,visible_to_employees',{accessToken:session.access_token})
  ]);
  const unitById = new Map(orgUnits.map(unit => [unit.id,unit]));
  const contactsByEmployeeId = new Map(contactRows.map(contact => [contact.employee_id,contact]));
  const unitRoot = unit => {
    let current = unit;
    while(current?.parent_id && unitById.has(current.parent_id)) current = unitById.get(current.parent_id);
    return current;
  };
  employeeRows.forEach(row => {
    const unit = row.org_units || unitById.get(row.org_unit_id);
    const root = unitRoot(unit);
    const contact = contactsByEmployeeId.get(row.id);
    const id = supabaseEmployeeAppId(row);
    const person = emp(id) || {id,resp:{}};
    Object.assign(person,{
      name:row.display_name,
      pos:row.job_title,
      dept:unit?.name || '',
      dir:root?.name || unit?.name || '',
      start:row.start_date || '',
      status:row.status === 'active' ? 'Активна' : row.status,
      adapt:row.adaptation_enabled,
      phone:contact?.phone || '',
      email:contact?.email || '',
      contacts:Boolean(contact?.visible_to_employees)
    });
    if(!emp(id)) DB.employees.push(person);
  });
  DB.employees.sort((a,b) => a.name.localeCompare(b.name,'ru'));
}
async function loadSupabaseAccessUsers(){
  const rows = await manageSupabaseEmployee({action:'list_users'});
  const previousUsers = DB.users;
  DB.users = rows.users.map(user => {
    const employeeId = user.employee ? supabaseEmployeeAppId(user.employee) : null;
    const previousUser = previousUsers.find(item =>
      item.id === user.id || String(item.login).toLowerCase() === String(user.email).toLowerCase() || item.name === user.name
    );
    return {
      id:user.id,
      name:user.name || user.email,
      login:user.email,
      role:SUPABASE_ROLE_NAMES[user.role] || user.role,
      employeeId,
      employeeName:user.employee?.display_name || '',
      managedEmployeeIds:previousUser?.managedEmployeeIds || [],
      status:user.status
    };
  });
}
async function uploadOrOpenEmployeeMaterial(item){
  if(!item.storagePath){
    downloadDoc(item.title,'Материал');
    return;
  }
  const session = JSON.parse(localStorage.getItem(SUPABASE_SESSION_KEY) || 'null');
  const result = await supabaseRequest(`/storage/v1/object/sign/prosafe-documents/${item.storagePath.split('/').map(encodeURIComponent).join('/')}`,{
    method:'POST',
    body:{expiresIn:60},
    accessToken:session?.access_token
  });
  if(!result?.signedURL) throw new Error('Supabase не вернул ссылку для скачивания файла.');
  window.open(result.signedURL.startsWith('http') ? result.signedURL : `${SUPABASE_URL}/storage/v1${result.signedURL}`,'_blank','noopener');
}
function currentUser(){
  try{
    const account = JSON.parse(localStorage.getItem(SUPABASE_ACCOUNT_KEY) || 'null');
    return account && SUPABASE_ROLE_NAMES && Object.values(SUPABASE_ROLE_NAMES).includes(account.role) ? account : null;
  }
  catch(e){ return null; }
}
function logout(){
  clearSupabaseSession();
  location.replace('login.html');
}
function renderLogin(){
  const user = currentUser();
  if(user){ location.replace(isEmployeeRole(user.role) ? 'employee.html' : 'home.html'); return; }
  const form = $('login-form');
  if(!form) return;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const email = $('login-name').value.trim().toLowerCase();
    const password = $('login-password').value;
    const error = $('login-error');
    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    error.hidden = true;
    try{
      const session = await supabaseRequest('/auth/v1/token?grant_type=password',{
        method:'POST',
        body:{email,password}
      });
      const account = await supabaseAccountFor(session);
      saveSupabaseSession(session,account);
      location.replace(isEmployeeRole(account.role) ? 'welcome.html' : 'home.html');
    }catch(cause){
      error.textContent = cause.message || 'Не удалось войти. Проверьте email и пароль.';
      error.hidden = false;
      $('login-password').setAttribute('aria-invalid','true');
      submit.disabled = false;
    }
  });
  $('login-password').addEventListener('input', () => {
    $('login-password').removeAttribute('aria-invalid');
    $('login-error').hidden = true;
  });
}
function renderEmployeeAside(employee, account){
  const links = [
    ['overview','Главная'],['profile','Моя визитка'],['people','Люди ProSafe'],
    ['history','История компании'],['org','Оргструктура'],['faq','FAQ'],
    ['surveys','Опросы'],['resources','Документы и шаблоны']
  ];
  if(account.role === 'Сотрудник с адаптацией') links.push(['plan','Моя адаптация']);
  if(isAdaptationManager(account.role)) links.push(['team','Команда и адаптация']);
  $('aside').innerHTML = `<a class="brand" href="employee.html">On Boarding в ProSafe<small>Кабинет сотрудника</small></a>
    <div class="employee-sidebar-user"><span class="employee-avatar">${esc((employee.name || 'С').slice(0,1))}</span><div><strong>${esc(employee.name)}</strong><small>${esc(employee.pos)}</small></div></div>
    <nav>${links.map(([id,label]) => `<a href="#${id}" data-employee-tab="${id}">${label}</a>`).join('')}</nav>
    <div class="sidebar-footer">
      <div class="support-card">
        <div class="support-title">Нужна помощь?</div>
        <div class="support-copy">Поддержка команды на связи в рабочие часы.</div>
        <a class="btn btn-primary support-btn" href="mailto:support@prosafe.local?subject=Поддержка%20ProSafe">Написать в поддержку</a>
      </div>
      <button type="button" class="linkbtn sidebar-logout" onclick="logout()">Выйти из кабинета</button>
    </div>`;
  $('aside').querySelectorAll('[data-employee-tab]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    document.querySelector(`.tab[data-tab="${link.dataset.employeeTab}"]`)?.click();
  }));
}
function employeeProfile(login){
  const account = currentUser();
  if(account && String(account.login).toLowerCase() === login && account.employeeId) return emp(account.employeeId);
  const demoAccount = DB.users.find(user => String(user.login).toLowerCase() === login);
  return demoAccount ? emp(demoAccount.employeeId) : null;
}
function managerEmployees(account){
  if(!account || !isAdaptationManager(account.role)) return [];
  const allowed = new Set((account.managedEmployeeIds || []).map(Number));
  return DB.employees.filter(employee => allowed.has(Number(employee.id)));
}
function isResponsibleTask(task, employee){
  return Number(task.respId) === Number(employee.id)
    || String(task.resp || '').trim().toLowerCase() === String(employee.name || '').trim().toLowerCase();
}
function employeeTodayTasks(employee){
  const agenda = [];
  DB.employees.forEach(owner => (DB.tasks[owner.id] || []).forEach((task,index) => {
    if(taskDateFor(owner.start,task.day) !== today()) return;
    const responsible = isResponsibleTask(task,employee);
    if(owner.id !== employee.id && !responsible) return;
    agenda.push({owner,task,index,responsible});
  }));
  return agenda.sort((a,b) => String(a.task.from || '').localeCompare(String(b.task.from || '')));
}
function employeeResponsibleTasks(employee){
  return DB.employees.flatMap(owner => (DB.tasks[owner.id] || [])
    .map((task,index) => ({owner,task,index}))
    .filter(({task}) => isResponsibleTask(task,employee) && !['Выполнена','Проверена руководителем'].includes(task.status)));
}
function renderEmployeePortal(){
  const account = currentUser();
  const employee = account && employeeProfile(String(account.login).toLowerCase());
  if(!employee){
    set('employee-overview', '<div class="card"><h2>Кабинет пока не настроен</h2><p>Для этой учётной записи не найден профиль сотрудника. Обратитесь в HR.</p></div>');
    return;
  }
  renderEmployeeAside(employee, account);
  const tasks = DB.tasks[employee.id] || [];
  const completed = tasks.filter(task => ['Выполнена','Проверена руководителем'].includes(task.status)).length;
  const nextTasks = tasks.filter(task => !['Выполнена','Проверена руководителем'].includes(task.status)).slice(0,3);
  const day = dayOf(employee);
  const contacts = Object.values(employee.resp || {}).filter((name,index,all) => name && all.indexOf(name) === index);
  const peopleByName = name => DB.employees.find(item => item.name === name);
  const hasAdaptation = account.role === 'Сотрудник с адаптацией';
  const isManager = isAdaptationManager(account.role);
  const visibleTabs = new Set(['overview','profile','people','history','org','faq','surveys','resources']);
  if(hasAdaptation) visibleTabs.add('plan');
  if(isManager) visibleTabs.add('team');
  const titles = {
    overview:'Главная',profile:'Моя визитка',people:'Люди ProSafe',history:'История компании',
    org:'Оргструктура',faq:'FAQ',surveys:'Опросы',
    resources:'Документы и шаблоны',plan:'Моя адаптация',team:'Команда и адаптация'
  };
  document.querySelectorAll('.employee-tabs .tab').forEach(tab => {
    tab.hidden = !visibleTabs.has(tab.dataset.tab);
    if(!tab.dataset.titleBound){
      tab.dataset.titleBound = 'true';
      tab.addEventListener('click', () => {
        set('employee-page-title', titles[tab.dataset.tab]);
        document.querySelectorAll('[data-employee-tab]').forEach(link => link.setAttribute('aria-current', link.dataset.employeeTab === tab.dataset.tab ? 'page' : 'false'));
        if(tab.dataset.tab === 'org') setTimeout(() => drawOrg('employee-org-chart'),0);
      });
    }
  });
  const welcomeTab = new URLSearchParams(location.search).get('tab');
  document.querySelector(`.tab[data-tab="${visibleTabs.has(welcomeTab) ? welcomeTab : 'overview'}"]`)?.click();
  const todayAgenda = employeeTodayTasks(employee);
  const responsibleTasks = employeeResponsibleTasks(employee);

  set('employee-overview', `
    <div class="employee-welcome">
      <div><span class="survey-kicker">WELCOME · PROSAFE</span><h2>Добро пожаловать, ${esc(employee.name.split(' ')[0])}!</h2>
        <p>Рады видеть вас в команде. В личном кабинете собраны контакты коллег, опросы, документы и помощь.</p></div>
      ${hasAdaptation ? `<div class="employee-progress-ring"><strong>${progress(employee)}%</strong><span>адаптация</span></div>` : ''}
    </div>
    ${hasAdaptation ? `<div class="employee-stat-grid">
      <article class="employee-stat"><span class="hint">Ваш этап</span><strong>День ${day} <small>из 60</small></strong></article>
      <article class="employee-stat"><span class="hint">Задачи выполнены</span><strong>${completed} <small>из ${tasks.length}</small></strong></article>
      <article class="employee-stat"><span class="hint">Следующий шаг</span><strong>${nextTasks.length ? `День ${esc(nextTasks[0].day || 1)}` : 'Все готово'}</strong></article>
    </div>` : ''}
    <section class="employee-panel employee-panel-wide employee-today-plan">
      <div class="section-head"><h2>План на сегодня</h2><span class="chip">${today()}</span></div>
      ${todayAgenda.length ? todayAgenda.map(({owner,task,responsible}) => `
        <article class="employee-task-mini">
          <span class="employee-task-day">${esc(task.from || 'Время не указано')}</span>
          <div><strong>${esc(task.title)}</strong><div class="hint">${responsible ? `Вы ответственный · ${esc(owner.name)}` : 'Ваша задача'} · ${esc(task.place || 'Место не указано')}</div></div>
          ${pill(task.status)}
        </article>`).join('') : '<div class="empty-soft">На сегодня задач по плану нет.</div>'}
    </section>
    <div class="employee-content-grid">
      ${hasAdaptation ? `<section class="employee-panel"><div class="section-head"><h2>Ближайшие задачи</h2><button type="button" class="linkbtn" onclick="document.querySelector('.tab[data-tab=plan]').click()">Моя адаптация →</button></div>
        ${nextTasks.length ? nextTasks.map(task => `<article class="employee-task-mini"><span class="employee-task-day">День ${esc(task.day || 1)}</span><div><strong>${esc(task.title)}</strong><div class="hint">${esc(task.from || 'Время уточняется')} · ${esc(task.place || 'Место уточняется')}</div></div>${pill(task.status)}</article>`).join('') : '<div class="empty-soft">На данный момент новых задач нет.</div>'}
      </section>` : `<section class="employee-panel"><h2>Мой следующий шаг</h2><p class="hint">Познакомьтесь с командой и загляните в документы — всё необходимое для работы собрано в меню.</p><button class="btn btn-primary" type="button" onclick="document.querySelector('.tab[data-tab=people]').click()">Открыть справочник сотрудников</button></section>`}
      <section class="employee-panel"><h2>К кому обратиться</h2>
        ${contacts.length ? contacts.map(name => { const person = peopleByName(name); return `<div class="employee-contact"><span class="employee-contact-dot">${esc(name.slice(0,1))}</span><div><strong>${esc(name)}</strong><span>${person ? esc(person.pos) : 'Ваша команда поддержки'}</span>${person?.email ? `<a href="mailto:${esc(person.email)}">${esc(person.email)}</a>` : ''}</div></div>`; }).join('') : '<p class="hint">Контакты поддержки пока не указаны.</p>'}
      </section>
      <section class="employee-panel"><h2>Поручения, где вы ответственный</h2>
        ${responsibleTasks.length ? responsibleTasks.map(({owner,task}) => `<article class="employee-task-mini"><span class="employee-task-day">${esc(taskDateFor(owner.start,task.day))}</span><div><strong>${esc(task.title)}</strong><div class="hint">${esc(owner.name)} · ${esc(task.from || 'Время не указано')} · ${esc(task.place || 'Место не указано')}</div></div>${pill(task.status)}</article>`).join('') : '<div class="empty-soft">Новых поручений для вас нет.</div>'}
      </section>
    </div>`);

  set('employee-profile', `
    <div class="employee-section-intro"><span class="survey-kicker">Моя визитка</span><h2>Личная карточка</h2><p class="hint">Эта информация помогает коллегам найти вас и связаться с вами.</p></div>
    <article class="employee-business-card">
      <div class="employee-business-card-head"><span class="employee-business-avatar">${esc(employee.name.split(' ').map(part => part[0]).slice(0,2).join(''))}</span><div><h2>${esc(employee.name)}</h2><span>${esc(employee.pos)}</span></div></div>
      <div class="employee-business-details"><div><span>Отдел</span><strong>${esc(employee.dept || '—')}</strong></div><div><span>Направление</span><strong>${esc(employee.dir || '—')}</strong></div><div><span>Руководитель</span><strong>${esc(employee.mgr || '—')}</strong></div><div><span>Телефон</span><strong>${esc(employee.phone || 'Не указан')}</strong></div><div><span>Рабочая почта</span><strong>${employee.email ? `<a href="mailto:${esc(employee.email)}">${esc(employee.email)}</a>` : 'Не указана'}</strong></div></div>
    </article>`);

  set('employee-people', `
    <div class="employee-section-intro"><span class="survey-kicker">Команда ProSafe</span><h2>Люди ProSafe</h2><p class="hint">Справочник доступен только для просмотра. Нажмите на строку или имя, чтобы открыть визитку сотрудника.</p></div>
    <label for="employee-people-q">Найти сотрудника</label><input id="employee-people-q" placeholder="ФИО, должность или отдел" oninput="renderEmployeePeople(this.value)">
    <div id="employee-people-list" style="margin-top:14px">${empTable(DB.employees,'Сотрудников пока нет')}</div>`);

  set('employee-history', `
    <div class="history-shell">
      <div class="history-header"><div><div class="history-eyebrow">О компании</div><h2>История компании</h2></div></div>
      <div class="history-meta">Информация доступна только для просмотра.</div>
      <div class="history-view">${esc((DB.history || '').trim() || 'История компании пока не заполнена.')}</div>
    </div>`);
  set('employee-org', `<div class="employee-section-intro"><span class="survey-kicker">Команда ProSafe</span><h2>Оргструктура</h2><p class="hint">Организационная структура доступна только для просмотра.</p></div><div id="employee-org-chart" class="org-chart">${orgChartMarkup()}</div>`);
  set('employee-faq', `
    <div class="employee-section-intro"><span class="survey-kicker">Помощь</span><h2>Частые вопросы</h2><p class="hint">Ответы доступны только для просмотра.</p></div>
    <div class="employee-faq-list">${DB.faq.length ? DB.faq.map(item => `<article class="card"><h3>${esc(item.q)}</h3><p>${esc(item.a)}</p></article>`).join('') : '<div class="card empty">Ответы на вопросы скоро появятся.</div>'}</div>`);

  const responses = DB.surveyResponses || [];
  const availableSurveys = DB.surveys.filter(survey => survey.status === 'Активна' && (!survey.aud || survey.aud === 'Общий' || survey.aud === 'Все' || survey.aud === 'По должности' || survey.aud === 'По сотруднику'));
  set('employee-surveys', `
    <div class="employee-section-intro"><span class="survey-kicker">Ваше мнение важно</span><h2>Опросы</h2><p class="hint">Ответы сохраняются в прототипе этого браузера.</p></div>
    <div class="employee-survey-list">${availableSurveys.length ? availableSurveys.map(survey => {
      const answered = responses.some(response => response.employeeId === employee.id && response.title === survey.title);
      const options = String(survey.options || '').split(';').map(value => value.trim()).filter(Boolean);
      return `<article class="employee-panel employee-survey-card"><div class="employee-survey-title"><div><span class="chip">${esc(survey.aud || 'Опрос')}</span><h3>${esc(survey.title)}</h3></div>${answered ? '<span class="pill lime">Ответ отправлен</span>' : ''}</div>
        <p>${esc(survey.question || 'Поделитесь своим мнением')}</p>
        ${answered ? '<p class="hint">Спасибо за ваш ответ.</p>' : `<div class="employee-survey-answer">${options.length ? options.map((option,index) => `<label class="employee-survey-option"><input type="radio" name="survey-${indexOfSurvey(survey)}" value="${esc(option)}"> ${esc(option)}</label>`).join('') : `<textarea id="survey-answer-${indexOfSurvey(survey)}" rows="3" placeholder="Ваш ответ"></textarea>`}
        <button class="btn btn-primary" type="button" onclick="submitEmployeeSurvey(${indexOfSurvey(survey)})">Отправить ответ</button></div>`}
      </article>`;
    }).join('') : '<div class="card empty">Активных опросов пока нет.</div>'}</div>
    <div id="employee-feedback" class="employee-feedback-wrap"></div>`);
  renderEmployeeFeedback(employee);

  renderEmployeeResources(employee);

  set('employee-plan', hasAdaptation ? `
    <div class="employee-section-intro"><span class="survey-kicker">План адаптации</span><h2>Ваши шаги на ближайшее время</h2><p class="hint">Отмечайте задачу выполненной после того, как завершите её. Ответственный подтвердит результат.</p></div>
    <div class="employee-task-list">${tasks.length ? tasks.map((task,index) => {
      const done = ['Выполнена','Проверена руководителем'].includes(task.status);
      const resp = task.respId ? emp(task.respId)?.name : task.resp;
      return `<article class="employee-task-card ${done ? 'is-done' : ''}">
        <div class="employee-task-card-day">День <strong>${esc(task.day || 1)}</strong></div>
        <div class="employee-task-card-body"><div class="employee-task-card-head"><h3>${esc(task.title)}</h3>${pill(task.status)}</div>
          <div class="employee-task-meta"><span>Дата: ${taskDateFor(employee.start,task.day)}</span><span>Время: ${esc(task.from || '—')} – ${esc(task.to || '—')}</span><span>Место: ${esc(task.place || 'Не указано — уточните у руководителя')}</span><span>Ответственный: ${esc(resp || '—')}</span></div>
          ${['Назначена','В работе'].includes(task.status) ? `<button type="button" class="btn btn-primary" onclick="completeEmployeeTask(${index})">Отметить выполненной</button>` : ''}
        </div>
      </article>`;
    }).join('') : '<div class="card empty">План адаптации пока не назначен. Свяжитесь с HR.</div>'}</div>` : '');

  set('employee-team', isManager ? `
    <div class="employee-section-intro"><span class="survey-kicker">Руководитель адаптации</span><h2>Сотрудники в вашей зоне ответственности</h2><p class="hint">Вы можете просматривать и редактировать планы только сотрудников, назначенных вам HR.</p></div>
    <label for="managed-employee-select">Сотрудник</label>
    <select id="managed-employee-select" onchange="renderManagedPlan(this.value)">${managerEmployees(account).map(member => `<option value="${member.id}">${esc(member.name)} · ${esc(member.pos)}</option>`).join('') || '<option value="">Сотрудники не назначены</option>'}</select>
    <div id="managed-plan-list" style="margin-top:16px">${managerEmployees(account).length ? renderManagedPlanMarkup(managerEmployees(account)[0]) : '<div class="card empty">Попросите HR назначить сотрудников в настройках доступа.</div>'}</div>` : '');
}
function indexOfSurvey(survey){ return DB.surveys.indexOf(survey); }
function renderEmployeePeople(query=''){
  const search = query.trim().toLowerCase();
  const matches = DB.employees.filter(employee => `${employee.name} ${employee.pos} ${employee.dept} ${employee.dir}`.toLowerCase().includes(search));
  set('employee-people-list', empTable(matches,'Сотрудники не найдены'));
}
function employeeDocumentItems(employee,kind){
  const items = DB[kind] || [];
  return kind === 'templates' ? items : items.filter(doc => !doc.aud || doc.aud === 'Все' || doc.aud === employee.dir);
}
function employeeDocContent(employee,category,query=''){
  const groups = [
    {key:'docs',label:'Популярные документы'},
    {key:'templates',label:'Популярные шаблоны'},
    {key:'corpDocs',label:'Популярные материалы'}
  ];
  const visible = kind => employeeDocumentItems(employee,kind).map((item,index) => ({item,index,kind}));
  if(category === 'search'){
    if(query.trim()){
      const results = groups.flatMap(group => visible(group.key))
        .filter(({item}) => `${item.title} ${item.cat || ''}`.toLowerCase().includes(query.trim().toLowerCase()));
      return results.length
        ? results.map(({item,kind,index}) => employeeDocEntry(item,kind,index)).join('')
        : '<div class="empty-soft">Ничего не найдено.</div>';
    }
    return groups.map(group => `<section class="employee-panel employee-panel-wide"><h2>${group.label}</h2>${visible(group.key).slice(0,3).map(({item,index}) => employeeDocEntry(item,group.key,index)).join('') || '<div class="empty-soft">Материалы пока не добавлены.</div>'}</section>`).join('');
  }
  const list = visible(category);
  return list.length ? list.map(({item,index}) => employeeDocEntry(item,category,index)).join('') : '<div class="empty-soft">Материалы пока не добавлены.</div>';
}
function employeeDocEntry(item,kind,index){
  const label = kind === 'templates' ? 'Шаблон' : kind === 'corpDocs' ? 'Материал' : 'Документ';
  return `<article class="employee-resource"><div><strong>${esc(item.title)}</strong><span>${esc(item.cat || label)} · ${esc(item.ver || 'v1')}</span></div><button type="button" class="btn" onclick="downloadEmployeeDoc('${kind}',${index})">Скачать</button></article>`;
}
function renderEmployeeResources(employee,category='search',query=''){
  set('employee-resources', `
    <div class="employee-section-intro"><span class="survey-kicker">Полезное</span><h2>Документы и шаблоны</h2><p class="hint">Ищите и скачивайте доступные материалы. Редактирование доступно только HR.</p></div>
    <div class="employee-doc-tabs" role="tablist" aria-label="Категории материалов">
      ${[['search','Поиск'],['docs','Документы'],['templates','Шаблоны'],['corpDocs','Корпоративные документы']].map(([key,label]) => `<button type="button" class="tab" aria-selected="${category === key}" onclick="selectEmployeeDocCategory('${key}')">${label}</button>`).join('')}
    </div>
    ${category === 'search' ? `<label for="employee-doc-q">Поиск по документам и шаблонам</label><input id="employee-doc-q" placeholder="Название или категория" value="${esc(query)}" oninput="renderEmployeeDocSearch(this.value)">` : ''}
    <div class="employee-doc-results" id="employee-doc-results">${employeeDocContent(employee,category,query)}</div>`);
}
function renderEmployeeDocSearch(query){
  const account = currentUser();
  const employee = account && employeeProfile(String(account.login).toLowerCase());
  if(employee) set('employee-doc-results',employeeDocContent(employee,'search',query));
}
function selectEmployeeDocCategory(category){
  const account = currentUser();
  const employee = account && employeeProfile(String(account.login).toLowerCase());
  if(!employee || !['search','docs','templates','corpDocs'].includes(category)) return;
  renderEmployeeResources(employee,category);
}
function downloadEmployeeDoc(kind,index){
  if(!['docs','templates','corpDocs'].includes(kind) || !Number.isInteger(index)){ toast('Не удалось открыть материал'); return; }
  const account = currentUser();
  const employee = account && employeeProfile(String(account.login).toLowerCase());
  const item = employee && employeeDocumentItems(employee,kind)[index];
  if(!item){ toast('Материал недоступен'); return; }
  uploadOrOpenEmployeeMaterial(item).catch(error => toast(error.message));
}
function renderEmployeeFeedback(employee){
  const recruiters = DB.users.filter(user => user.role === 'HR' && user.status !== 'Заблокирована');
  set('employee-feedback', `
    <div class="employee-content-grid employee-feedback-grid">
      <section class="employee-panel"><div class="survey-kicker">Анонимно</div><h2>Банк идей</h2>
        <p class="hint">Предложите, что можно улучшить. Имя и профиль автора не сохраняются.</p>
        <label for="employee-idea-text">Ваша идея</label><textarea id="employee-idea-text" rows="4" maxlength="1000" placeholder="Напишите предложение"></textarea>
        <button class="btn btn-primary" type="button" onclick="submitAnonymousIdea()">Отправить идею</button>
      </section>
      <section class="employee-panel"><div class="survey-kicker">Личное обращение</div><h2>Написать рекрутеру</h2>
        <p class="hint">Обращение будет видно выбранному HR и в кабинете HR.</p>
        <label for="employee-message-to">Кому</label>
        <select id="employee-message-to">${recruiters.map(user => `<option value="${esc(user.login)}">${esc(user.name)}</option>`).join('') || '<option value="">HR пока не назначен</option>'}</select>
        <label for="employee-message-text">Сообщение</label><textarea id="employee-message-text" rows="4" maxlength="2000" placeholder="Напишите сообщение"></textarea>
        <button class="btn btn-primary" type="button" onclick="sendRecruiterMessage()" ${recruiters.length ? '' : 'disabled'}>Отправить HR</button>
      </section>
    </div>`);
}
function submitAnonymousIdea(){
  const account = currentUser();
  const employee = account && employeeProfile(String(account.login).toLowerCase());
  const text = ($('employee-idea-text')?.value || '').trim();
  if(!employee){ toast('Не удалось определить профиль сотрудника'); return; }
  if(!text){ alert('Напишите идею перед отправкой.'); return; }
  DB.ideas = DB.ideas || [];
  DB.ideas.push({text,date:today(),anonymous:true});
  save();
  renderEmployeeFeedback(employee);
  toast('Идея отправлена анонимно');
}
function sendRecruiterMessage(){
  const account = currentUser();
  const employee = account && employeeProfile(String(account.login).toLowerCase());
  const toLogin = $('employee-message-to')?.value || '';
  const recruiter = DB.users.find(user => user.role === 'HR' && user.status !== 'Заблокирована' && user.login === toLogin);
  const text = ($('employee-message-text')?.value || '').trim();
  if(!employee || !recruiter){ toast('Не удалось определить сотрудника или HR'); return; }
  if(!text){ alert('Напишите сообщение перед отправкой.'); return; }
  DB.feedbackMessages = DB.feedbackMessages || [];
  DB.feedbackMessages.push({employeeId:employee.id,employeeName:employee.name,toLogin:recruiter.login,toName:recruiter.name,text,date:new Date().toLocaleString('ru-RU'),status:'Новое'});
  save();
  renderEmployeeFeedback(employee);
  toast('Сообщение отправлено HR');
}
function submitEmployeeSurvey(index){
  const account = currentUser();
  const employee = account && employeeProfile(String(account.login).toLowerCase());
  const survey = DB.surveys[index];
  if(!employee || !survey || survey.status !== 'Активна') return;
  DB.surveyResponses = DB.surveyResponses || [];
  if(DB.surveyResponses.some(response => response.employeeId === employee.id && response.title === survey.title)){ toast('Вы уже ответили на этот опрос'); return; }
  const options = String(survey.options || '').split(';').map(value => value.trim()).filter(Boolean);
  const answer = options.length
    ? document.querySelector(`input[name="survey-${index}"]:checked`)?.value || ''
    : ($(`survey-answer-${index}`)?.value || '').trim();
  if(!answer){ alert('Выберите вариант или введите ответ.'); return; }
  DB.surveyResponses.push({employeeId:employee.id,title:survey.title,answer,date:today()});
  save();
  renderEmployeePortal();
  document.querySelector('.tab[data-tab="surveys"]')?.click();
  toast('Ответ отправлен');
}
function managedEmployee(account, employeeId){
  return !!account && isAdaptationManager(account.role) && managerEmployees(account).find(member => Number(member.id) === Number(employeeId));
}
function renderManagedPlanMarkup(employee){
  if(!employee) return '<div class="card empty">Выберите сотрудника.</div>';
  const tasks = DB.tasks[employee.id] || [];
  return `<div class="plan-template-item">
    <div class="section-head"><div><h2>${esc(employee.name)}</h2><div class="hint">${esc(employee.pos)} · ${esc(employee.dept)} · День ${dayOf(employee)}</div></div>
      <button type="button" class="btn btn-primary" onclick="openManagedTaskEditor(${employee.id})">Добавить задачу</button>
    </div>
    ${tasks.length ? tasks.map((task,index) => `<article class="employee-managed-task"><div><strong>День ${esc(task.day || 1)} · </strong><button type="button" class="linkbtn" onclick="openManagedTaskEditor(${employee.id},${index})">${esc(task.title)}</button><div class="hint">${esc(task.from || '—')}–${esc(task.to || '—')} · ${esc(task.place || '—')} · ${esc(task.resp || '—')}</div>${pill(task.status)}</div>
      <div class="actions"><button class="btn" type="button" onclick="openManagedTaskEditor(${employee.id},${index})">Изменить</button><button class="btn btn-ghost" type="button" onclick="removeManagedTask(${employee.id},${index})">Удалить</button></div>
    </article>`).join('') : '<div class="empty-soft">В плане пока нет задач.</div>'}
  </div>`;
}
function renderManagedPlan(employeeId){
  const account = currentUser();
  const employee = managedEmployee(account,employeeId);
  if(!employee){ set('managed-plan-list','<div class="card empty">Нет доступа к этому сотруднику.</div>'); return; }
  set('managed-plan-list',renderManagedPlanMarkup(employee));
}
function openManagedTaskEditor(employeeId,index){
  const account = currentUser();
  const employee = managedEmployee(account,employeeId);
  if(!employee){ toast('Нет доступа к этому сотруднику'); return; }
  const tasks = DB.tasks[employee.id] || [];
  const task = index === undefined ? {title:'',day:1,from:'',to:'',place:'',resp:account.name,status:'Назначена'} : tasks[index];
  if(!task){ toast('Задача не найдена'); return; }
  $('dlg2Form').innerHTML = `<h2>${index === undefined ? 'Добавить задачу адаптации' : 'Изменить задачу адаптации'}</h2>
    <label for="mt-title">Название *</label><input id="mt-title" value="${esc(task.title)}">
    <div class="cols" style="gap:12px"><div><label for="mt-day">День</label><input id="mt-day" type="number" min="1" max="60" value="${esc(task.day || 1)}"></div><div><label for="mt-place">Место</label><input id="mt-place" value="${esc(task.place || '')}"></div></div>
    <div class="cols" style="gap:12px"><div><label for="mt-from">Время с</label><input id="mt-from" type="time" value="${esc(task.from || '')}"></div><div><label for="mt-to">Время до</label><input id="mt-to" type="time" value="${esc(task.to || '')}"></div></div>
    <label for="mt-resp">Ответственный</label><input id="mt-resp" value="${esc(task.resp || account.name)}">
    <label for="mt-status">Статус</label><select id="mt-status">${['Назначена','В работе','Выполнена','Ожидает проверки','Проверена руководителем'].map(status => `<option ${status === task.status ? 'selected' : ''}>${status}</option>`).join('')}</select>
    <div class="actions" style="margin-top:18px"><button type="button" class="btn btn-primary" onclick="saveManagedTask(${employee.id},${index === undefined ? 'null' : index})">Сохранить</button><button type="button" class="btn" onclick="$('dlg2').close()">Отмена</button></div>`;
  $('dlg2').showModal();
}
function saveManagedTask(employeeId,index){
  const account = currentUser();
  const employee = managedEmployee(account,employeeId);
  const title = $('mt-title').value.trim();
  if(!employee || !title){ alert(employee ? 'Укажите название задачи.' : 'Нет доступа к этому сотруднику.'); return; }
  DB.tasks[employee.id] = DB.tasks[employee.id] || [];
  const resp = $('mt-resp').value.trim() || account.name;
  const responsible = DB.employees.find(item => item.name.toLowerCase() === resp.toLowerCase());
  const task = {title,day:Math.max(1,Math.min(60,Number($('mt-day').value)||1)),from:$('mt-from').value,to:$('mt-to').value,place:$('mt-place').value.trim()||'—',respId:responsible?.id || null,resp,status:$('mt-status').value};
  if(index === null) DB.tasks[employee.id].push(task);
  else if(DB.tasks[employee.id][index]) DB.tasks[employee.id][index] = {...DB.tasks[employee.id][index],...task};
  else return;
  save();
  $('dlg2').close();
  renderManagedPlan(employee.id);
  toast('План адаптации обновлён');
}
function removeManagedTask(employeeId,index){
  const account = currentUser();
  const employee = managedEmployee(account,employeeId);
  if(!employee || !DB.tasks[employee.id]?.[index]){ toast('Нет доступа к этой задаче'); return; }
  if(!confirm('Удалить задачу из плана адаптации?')) return;
  DB.tasks[employee.id].splice(index,1);
  save();
  renderManagedPlan(employee.id);
  toast('Задача удалена');
}
function completeEmployeeTask(index){
  const account = currentUser();
  const employee = account && employeeProfile(String(account.login).toLowerCase());
  if(!account || account.role !== 'Сотрудник с адаптацией') return;
  const task = employee && DB.tasks[employee.id]?.[index];
  if(!task || !['Назначена','В работе'].includes(task.status)) return;
  task.status = 'Выполнена';
  save();
  renderEmployeePortal();
  document.querySelector('.tab[data-tab="plan"]')?.click();
  toast('Задача отмечена выполненной');
}

const PAGES = {home:renderHome, people:renderPeople, staff:renderStaff, docs:renderDocs, reports:renderReports, adapt:renderAdapt, surveys:renderSurveys, access:renderAccess};
document.addEventListener('DOMContentLoaded', async () => {
  const p = document.body.dataset.page;
  let user;
  try{
    user = await restoreSupabaseSession();
  }catch(error){
    const main = $('view') || document.querySelector('.login-card');
    if(main){
      const alert = document.createElement('div');
      alert.className = 'login-error';
      alert.setAttribute('role','alert');
      alert.textContent = `Не удалось связаться с Supabase: ${error.message}`;
      main.prepend(alert);
    }
    return;
  }
  if(p === 'login'){ renderLogin(); return; }
  if(!user){ location.replace('login.html'); return; }
  if(p === 'welcome'){ location.replace(isEmployeeRole(user.role) ? 'employee.html' : 'home.html'); return; }
  if(p === 'employee' && !isEmployeeRole(user.role)){ location.replace('home.html'); return; }
  if(p === 'employee' || p === 'people' || p === 'docs'){
    try{
      await loadSupabaseEmployeeContent();
    }catch(error){
      const main = $('view');
      if(main){
        const alert = document.createElement('div');
        alert.className = 'card';
        alert.setAttribute('role','alert');
        alert.textContent = `Не удалось загрузить данные из Supabase: ${error.message}`;
        main.appendChild(alert);
      }
      return;
    }
  }
  if(p === 'access'){
    try{
      await loadSupabaseDirectory();
      await loadSupabaseAccessUsers();
    }catch(error){
      const main = $('view');
      if(main){
        const alert = document.createElement('div');
        alert.className = 'card';
        alert.setAttribute('role','alert');
        alert.textContent = `Не удалось загрузить доступы из Supabase: ${error.message}`;
        main.appendChild(alert);
      }
      return;
    }
  }
  if(p === 'staff'){
    try{
      await loadSupabaseDirectory();
    }catch(error){
      const main = $('view');
      if(main){
        const alert = document.createElement('div');
        alert.className = 'card';
        alert.setAttribute('role','alert');
        alert.textContent = `Не удалось загрузить сотрудников из Supabase: ${error.message}`;
        main.appendChild(alert);
      }
      return;
    }
  }
  if(p === 'employee'){
    injectDialogs();
    bindTabs();
    renderEmployeePortal();
    return;
  }
  if(isEmployeeRole(user.role)){ location.replace('employee.html'); return; }
  injectDialogs(); renderAside(); bindTabs();
  window.PAGE_RENDER = PAGES[p] || null;
  if(window.PAGE_RENDER) PAGE_RENDER();
});
