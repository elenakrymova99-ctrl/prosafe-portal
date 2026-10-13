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
    {name:'Менеджер по адаптации', dept:'HR', dir:'Офис', tpl:[{title:'Знакомство с HR-процессами', day:1, from:'10:00', to:'11:00', respId:104, resp:'Елена Соловьева'},{title:'Согласовать адаптационный план', day:3, from:'11:30', to:'12:00', respId:104, resp:'Елена Соловьева'},{title:'Обучение регламентам', day:7, from:'09:00', to:'10:30', respId:104, resp:'Елена Соловьева'}], status:'Активна', updated:'2026-09-10'},
    {name:'Старший инженер', dept:'Производство', dir:'Производство', tpl:[{title:'Ознакомление с оборудованием', day:1, from:'09:00', to:'10:30', respId:103, resp:'Ольга Петрова'},{title:'Выполнить инструктаж по ТБ', day:2, from:'11:00', to:'12:00', respId:103, resp:'Ольга Петрова'},{title:'Подтвердить рабочие процессы', day:10, from:'13:00', to:'14:00', respId:103, resp:'Ольга Петрова'}], status:'Активна', updated:'2026-09-11'},
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
    101:[{title:'Знакомство с HR-процессами', day:1, from:'10:00', to:'11:00', respId:104, resp:'Елена Соловьева', status:'Проверена руководителем'},{title:'Согласовать адаптационный план', day:3, from:'11:30', to:'12:00', respId:104, resp:'Елена Соловьева', status:'Выполнена'},{title:'Обучение регламентам', day:7, from:'09:00', to:'10:30', respId:104, resp:'Елена Соловьева', status:'Ожидает проверки'}],
    102:[{title:'Ознакомление с оборудованием', day:1, from:'09:00', to:'10:30', respId:103, resp:'Ольга Петрова', status:'Выполнена'},{title:'Выполнить инструктаж по ТБ', day:2, from:'11:00', to:'12:00', respId:103, resp:'Ольга Петрова', status:'Ожидает проверки'},{title:'Подтвердить рабочие процессы', day:10, from:'13:00', to:'14:00', respId:103, resp:'Ольга Петрова', status:'Назначена'}]
  };
  const users = [
    {name:'Елена Соловьева', login:'e.soloveva', role:'HR', status:'Активна'},
    {name:'Анна Михайлова', login:'a.mikhaylova', role:'Руководитель', status:'Активна'},
    {name:'Игорь Кузнецов', login:'i.kuznetsov', role:'Сотрудник', status:'Активна'},
    {name:'Ольга Петрова', login:'o.petrova', role:'Руководитель', status:'Активна'}
  ];
  return {employees,positions,materials:[],faq,history:'Компания ProSafe работает по модели «первый месяц — приоритет». Для новых сотрудников важно быстро понять регламенты, роли и культуру команды.',docs,templates,corpDocs,surveys,evals,ideas,tasks,users,topicHelpers:{'Отпуск':[104,103],'Пропуск и доступ':[103,104],'IT и учётные записи':[104,101]}};
}
const DEFAULT = seedData();
let DB = load();
function load(){ try{ const saved = JSON.parse(localStorage.getItem(KEY)||'{}'); return Object.assign({}, DEFAULT, saved); }catch(e){ return Object.assign({}, DEFAULT); } }
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(DB)); }catch(e){} }

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
function dayOf(e){ if(!e.start) return 0; const d = Math.floor((Date.now() - new Date(e.start)) / 86400000) + 1; return Math.max(0, Math.min(60, d)); }
// Прогресс: задачи 60%, документы 20%, опросы 10%, время 10% (документы и опросы пока не назначаются — 0)
function progress(e){
  const ts = DB.tasks[e.id] || [];
  const done = ts.filter(t => t.status === 'Выполнена' || t.status === 'Проверена руководителем').length;
  const tasksPart = ts.length ? done / ts.length : 0;
  return Math.round((0.6*tasksPart + 0.1*(dayOf(e)/60)) * 100);
}
function today(){ return new Date().toLocaleDateString('ru-RU'); }

function toast(msg){
  const t = document.createElement('div'); t.textContent = msg; t.setAttribute('role','status');
  Object.assign(t.style, {position:'fixed',bottom:'20px',left:'50%',transform:'translateX(-50%)',background:'var(--color-olive)',color:'#F1E9DD',padding:'12px 18px',borderRadius:'10px',zIndex:9});
  document.body.appendChild(t); setTimeout(() => t.remove(), 2500);
}
function tbl(head, rows, empty){
  if(!rows.length) return `<div class="card empty">${esc(empty || 'Пока пусто')}</div>`;
  return `<table><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
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
  $('aside').innerHTML = `<a class="brand" href="welcome.html">On Boarding в ProSafe<small>Кабинет HR</small></a>
    <nav>${SECTIONS.map(([id,l]) => `<a href="${id}.html" ${id===cur?'aria-current="page"':''}>${l}</a>`).join('')}</nav>
    <div class="sidebar-footer">
      <div class="support-card">
        <div class="support-title">Нужна помощь?</div>
        <div class="support-copy">Поддержка разработчиков на связи в рабочие часы.</div>
        <button type="button" class="btn btn-primary support-btn" onclick="window.location.href='mailto:support@prosafe.local?subject=Поддержка%20ProSafe'">Написать в поддержку</button>
      </div>
    </div>`;
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
  $('dlg2Form').innerHTML = `<h2>${esc(e.name)}</h2><div class="hint">${esc(e.pos)} · ${esc(e.dept)} · ${esc(e.dir)}</div>
    <h3 style="margin-top:16px">Контакты</h3><p>Руководитель: ${esc(e.mgr)}</p>
    ${e.contacts ? `<p>Телефон: ${esc(e.phone)}<br>Почта: ${esc(e.email)}</p>` : '<p class="hint">Контакты скрыты.</p>'}
    ${e.adapt ? `<h3 style="margin-top:16px">Адаптация</h3><p>День ${dayOf(e)} из 60 · начало: ${esc(e.start||'—')}</p>` : ''}
    <div class="actions" style="margin-top:20px"><button type="button" class="btn btn-primary" onclick="$('dlg2').close()">Закрыть</button></div>`;
  $('dlg2').showModal();
}

// Простая форма создания (материалы, FAQ, документы, опросы, пользователи)
function simpleDialog(title, fields, onSave){
  $('dlgForm').innerHTML = `<h2>${esc(title)}</h2>${fields.map(f => `<label for="sf_${f.k}">${esc(f.l)}${f.req?' *':''}</label>${
    f.opts ? `<select id="sf_${f.k}">${f.opts.map(o=>`<option>${esc(o)}</option>`).join('')}</select>`
    : f.area ? `<textarea id="sf_${f.k}" rows="4"></textarea>`
    : `<input id="sf_${f.k}" placeholder="${esc(f.ph||'')}">`}`).join('')}
    <div class="actions" style="margin-top:20px"><button type="button" class="btn btn-primary" id="sf_save">Сохранить</button><button type="button" class="btn" onclick="$('dlg').close()">Отмена</button></div>`;
  $('sf_save').onclick = () => {
    const v = {};
    for(const f of fields){ v[f.k] = ($('sf_'+f.k).value || '').trim(); if(f.req && !v[f.k]){ alert('Заполните: ' + f.l); return; } }
    onSave(v); save(); $('dlg').close(); if(window.PAGE_RENDER) PAGE_RENDER(); toast('Сохранено');
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
      <div><label for="e_email">Почта</label><input id="e_email" value="${esc(EMP.email)}" oninput="EMP.email=this.value"></div>
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
    <div class="actions" style="margin-top:20px"><button type="button" class="btn btn-primary" onclick="saveEmployee()">Сохранить</button><button type="button" class="btn" onclick="$('dlg').close()">Отмена</button></div>`;
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
function saveEmployee(){
  if(!EMP.name.trim()){ alert('Укажите ФИО'); return; }
  if(!EMP.posName.trim()){ alert('Укажите должность'); return; }
  if(EMP.adapt && !EMP.start){ alert('Укажите первый рабочий день'); return; }
  const id = Date.now(), r = EMP.resp;
  const e = {id, name:EMP.name.trim(), pos:EMP.posName.trim(), dept:EMP.dept||'—', dir:EMP.dir, mgr:r['Руководитель адаптации']||'—',
    phone:EMP.phone||'—', email:EMP.email||'—', contacts:true, adapt:EMP.adapt, start:EMP.adapt?EMP.start:'', status:EMP.adapt?'Активна':'Без адаптации', resp:{...r}};
  DB.employees.push(e);
  if(EMP.adapt) DB.tasks[id] = EMP.plan.map(t => ({...t, status:'Назначена'}));
  save();
  showInvite(e);
}
function translit(s){
  const m={а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'e',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'c',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya'};
  return s.toLowerCase().split('').map(c => m[c] !== undefined ? m[c] : (/[a-z0-9]/.test(c) ? c : '')).join('');
}
function showInvite(e){
  const parts = e.name.split(' ');
  const login = translit(parts[0]||'user') + '.' + translit((parts[1]||'x')[0]);
  const pwd = Math.random().toString(36).slice(2,6) + '-' + Math.random().toString(36).slice(2,6).toUpperCase();
  const hrName = e.resp && e.resp['HR'];
  const hr = (hrName && DB.employees.find(x => x.name === hrName)) || {name:'Контакты HR не указаны', phone:'—', email:'—'};
  $('dlgForm').innerHTML = `<h2>Сотрудник создан</h2>
    <div class="card" style="margin:12px 0">
      <h3>Приглашение в портал</h3>
      <p>Здравствуйте, ${esc(parts[1]||parts[0])}! Вам открыт доступ к порталу On Boarding в ProSafe.</p>
      <table><tbody>
        <tr><th style="width:140px">Логин</th><td><b>${esc(login)}</b></td></tr>
        <tr><th>Пароль</th><td><b>${esc(pwd)}</b></td></tr>
      </tbody></table>
      <p class="hint" style="margin-top:12px">Уведомление: при первом входе система попросит сменить пароль. Пароль показан один раз, передайте его сотруднику лично.</p>
    </div>
    <div class="card"><h3>Если возникли трудности со входом</h3>
      <p>${esc(hr.name)}<br>Телефон: ${esc(hr.phone)}<br>Почта: ${esc(hr.email)}</p></div>
    <div class="actions" style="margin-top:16px"><button type="button" class="btn btn-primary" onclick="finishInvite()">Готово</button></div>`;
}
function finishInvite(){ $('dlg').close(); if(window.PAGE_RENDER) PAGE_RENDER(); toast('Сотрудник создан'); }

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
  set('k-adapt', adapt.length); set('k-waiting', waitingList().length); set('k-answers', DB.surveys.length);
  set('k-drops', drops); set('k-ideas', DB.ideas.length);
  const dropCard = $('k-drops');
  if(dropCard){
    dropCard.parentElement?.parentElement?.classList.toggle('warning-card', drops > 0);
    dropCard.parentElement?.parentElement?.style.setProperty('--accent', drops > 0 ? '#B96D49' : '#34392A');
  }
  set('home-adapt', tbl(['ФИО','Должность','День','Прогресс','Статус'],
    adapt.map(e => [nameLink(e), esc(e.pos), dayOf(e), progressCell(progress(e)), pill(e.status)]), 'Сотрудников на адаптации пока нет'));
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
  box.innerHTML = `<svg></svg><div class="org-branch"><div class="org-ceo" data-node="ceo">Генеральный директор<br><small>ProSafe</small></div><div class="org-row" style="margin-top:14px">${dirBranches}</div></div>`;
  requestAnimationFrame(drawOrg);
  bindOrgTab();
}
function drawOrg(){
  const box = $('org-chart'); if(!box) return;
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
function chainOf(node){
  const box = $('org-chart'), chain = [];
  let cur = node;
  while(cur){ chain.push(cur.dataset.node); const p = cur.dataset.parent; cur = p ? box.querySelector(`[data-node="${CSS.escape(p)}"]`) : null; }
  return chain;
}
function clearHl(){ const box = $('org-chart'); if(box) box.querySelectorAll('.hl').forEach(n => n.classList.remove('hl')); }
function highlightChain(node){
  clearHl(); if(!node) return;
  const box = $('org-chart'), chain = chainOf(node);
  chain.forEach(id => { const el = box.querySelector(`[data-node="${CSS.escape(id)}"]`); if(el) el.classList.add('hl'); });
  box.querySelectorAll('.org-edge').forEach(p => { if(chain.includes(p.dataset.child)) p.classList.add('hl'); });
}
function bindOrgTab(){
  const box = $('org-chart'); if(!box || box.dataset.bound) return;
  box.dataset.bound = '1';
  box.addEventListener('mouseover', ev => { const n = ev.target.closest('[data-node]'); if(n) highlightChain(n); });
  box.addEventListener('mouseleave', clearHl);
  const tab = document.querySelector('[data-tab="org"]');
  if(tab) tab.addEventListener('click', () => setTimeout(drawOrg, 0));
  window.addEventListener('resize', drawOrg);
}

function openMaterial(){ simpleDialog('Новый материал', [{k:'title',l:'Название',req:true},{k:'type',l:'Тип',opts:['Текст','PDF','Файл']}], v => DB.materials.push(v)); }
function openFaq(){ simpleDialog('Новый вопрос', [{k:'q',l:'Вопрос',req:true},{k:'a',l:'Ответ',req:true,area:true}], v => DB.faq.push(v)); }
function saveHistory(){
  const value = ($('history-text') || {}).value || '';
  DB.history = value.trim();
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
  const snapshotDocs = [...DB.docs].slice(0, 3);
  const snapshotTemplates = [...DB.templates].slice(0, 3);
  const snapshotCorp = [...DB.corpDocs].slice(0, 3);

  set('docs-table', tbl(['Название','Категория','Доступно','Версия','Обновлён'], DB.docs.map(d => [esc(d.title), esc(d.cat), esc(d.aud), esc(d.ver), esc(d.updated)]), 'Документов пока нет'));
  set('templates-table', tbl(['Название','Должность','Версия','Обновлён'], DB.templates.map(d => [esc(d.title), esc(d.cat), esc(d.ver), esc(d.updated)]), 'Шаблонов пока нет'));
  set('corp-table', tbl(['Название','Категория','Доступно','Версия','Обновлён'], DB.corpDocs.map(d => [esc(d.title), esc(d.cat), esc(d.aud), esc(d.ver), esc(d.updated)]), 'Материалов пока нет'));

  const makeCards = (items, typeLabel) => items.length ? items.map(it => `
    <div class="card" style="margin-bottom:12px">
      <h3>${esc(it.title || it.name || 'Документ')}</h3>
      <p class="hint">${esc(it.cat || it.category || typeLabel)} · ${esc(it.ver || 'v1')} · ${esc(it.updated || today())}</p>
      <div class="actions" style="margin-top:12px">
        <button class="btn btn-primary" onclick="downloadDoc('${esc(it.title || it.name || '')}', '${esc(typeLabel)}')">Скачать</button>
      </div>
    </div>
  `).join('') : `<div class="card empty">${esc(typeLabel)} пока нет</div>`;

  set('docs-preview', makeCards(snapshotDocs, 'Документ'));
  set('templates-preview', makeCards(snapshotTemplates, 'Шаблон'));
  set('corp-preview', makeCards(snapshotCorp, 'Корпоративный документ'));
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

  set('doc-results', `${preview}${tbl(['Название','Категория','Версия'], all.map(d => [esc(d.title), esc(d.cat), esc(d.ver)]), 'Ничего не найдено')}`);
}
function openDoc(kind){
  const aud = ['Все'].concat(DIRS);
  simpleDialog('Добавить', [{k:'title',l:'Название',req:true},{k:'cat',l:'Категория'},{k:'aud',l:'Доступно',opts:aud},{k:'ver',l:'Версия',ph:'v1'}], v => {
    v.ver = v.ver || 'v1'; v.updated = today(); DB[kind].push(v);
  });
}

function renderReports(){
  const adapt = DB.employees.filter(e => e.adapt);
  const cards = [
    { label: 'Сотрудники на адаптации', value: adapt.length, href: 'reports.html?tab=adapt-count' },
    { label: 'Ждут проверки', value: waitingList().length, href: 'reports.html?tab=waiting' },
    { label: 'Новые ответы на опросы', value: DB.surveys.length, href: 'reports.html?tab=answers' },
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
    { title: 'Опросы', text: DB.surveys.length > 0 ? `Есть ${DB.surveys.length} активных опроса.` : 'Активных опросов нет.' },
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
    `- Новые ответы на опросы: ${DB.surveys.length}`,
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
        <strong>${esc(t.title)}</strong>
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
  set('plan-table', tbl(['День','Дата','Время','Место','Задача','Ответственный','Статус'],
    ts.map(t => [t.day, taskDateFor(e && e.start, t.day), `${esc(t.from||'—')} – ${esc(t.to||'—')}`, esc(t.place || '—'), esc(t.title), t.respId ? pName(t.respId, t.resp) : esc(t.resp||'—'), pill(t.status)]),
    'В плане пока нет задач'));
}

function renderSurveys(){
  const adapt = DB.employees.filter(e => e.adapt);
  const cards = [
    { label: 'Новые результаты оценки адаптации', value: DB.evals.length, tone: 'olive' },
    { label: 'Новые ответы по опросам', value: DB.surveys.length, tone: 'terracotta' },
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
            <span class="chip neutral">${DB.surveys.length}</span>
          </div>
          <div class="survey-list">
            ${DB.surveys.length ? DB.surveys.map(s => `
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
        ${DB.surveys.length ? DB.surveys.map(s => `
          <div class="survey-item result-row">
            <div>
              <strong>${esc(s.title)}</strong>
              <div class="survey-item-meta">Ответили: ${esc(s.sent)} · Доступ: только HR</div>
            </div>
            <div class="survey-item-status"><span class="pill lime">Готово</span></div>
          </div>
        `).join('') : '<div class="empty-soft">Опросов пока нет</div>'}
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
  set('users-table', tbl(['ФИО','Логин','Роль','Статус'], DB.users.map(u => [esc(u.name), esc(u.login), esc(u.role), pill(u.status)]), 'Пользователей пока нет'));
}
function openUser(){
  simpleDialog('Новый пользователь', [{k:'name',l:'ФИО',req:true},{k:'login',l:'Логин',req:true},{k:'role',l:'Роль',opts:['HR','Руководитель','Сотрудник','Администратор']}], v => {
    v.status = 'Активна'; DB.users.push(v);
  });
}

const PAGES = {home:renderHome, people:renderPeople, staff:renderStaff, docs:renderDocs, reports:renderReports, adapt:renderAdapt, surveys:renderSurveys, access:renderAccess};
document.addEventListener('DOMContentLoaded', () => {
  injectDialogs(); renderAside(); bindTabs();
  const p = document.body.dataset.page;
  window.PAGE_RENDER = PAGES[p] || null;
  if(window.PAGE_RENDER) PAGE_RENDER();
});
