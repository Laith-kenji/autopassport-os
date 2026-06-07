/* ══════════════════════════════════════════════════════════════════
   AutoPassport OS — Mock Backend  (js/db.js)
   Centralised demo data · localStorage persistence · CRUD + events
   ══════════════════════════════════════════════════════════════════ */
'use strict';

var DB = (function () {

  var STORAGE_KEY = 'ap_os_db_v3';

  /* ── Seed data ─────────────────────────────────────────────────── */
  var SEED = {
    meta: { version: 3, branch: 'Al-Rawabi — Amman Main' },

    customers: [
      { id:'C001', name:'Lara Haddad',       phone:'+962 79 555 0101', email:'lara@example.com',
        membership:'Gold',     points:240, vehicles:['V001'],       notes:'Prefers morning slots', created:'2025-01-15' },
      { id:'C002', name:'Saeed Al-Otaibi',   phone:'+962 77 444 0202', email:'saeed@example.com',
        membership:'Standard', points:80,  vehicles:['V002','V003'], notes:'', created:'2025-03-10' },
      { id:'C003', name:'Maya Khalil',        phone:'+962 79 555 0142', email:'maya@example.com',
        membership:'Platinum', points:560, vehicles:['V004'],       notes:'VIP — handle personally', created:'2024-11-01' },
      { id:'C004', name:'Tariq Nawfal',       phone:'+962 78 333 0303', email:'tariq@example.com',
        membership:'Standard', points:30,  vehicles:['V005'],       notes:'', created:'2025-05-20' },
      { id:'C005', name:'Hana Darwish',       phone:'+962 79 666 0404', email:'hana@example.com',
        membership:'Standard', points:110, vehicles:['V006'],       notes:'Arabic preferred', created:'2025-04-02' },
      { id:'C006', name:'Faisal Al-Rashidi', phone:'+962 77 777 0505', email:'faisal@example.com',
        membership:'Gold',     points:320, vehicles:['V007'],       notes:'Fleet manager', created:'2024-08-15' },
    ],

    vehicles: [
      { id:'V001', plate:'31-77-204', vin:'WDDZF4JB1KA012345', make:'Mercedes-Benz', model:'C200',        year:2019, color:'White',  mileage:62400, owner:'C001', status:'in-service',      quality:88 },
      { id:'V002', plate:'22-11-985', vin:'JN1BANT9AP0012345', make:'Nissan',        model:'Patrol',       year:2022, color:'Silver', mileage:38900, owner:'C002', status:'checked-in',     quality:72 },
      { id:'V003', plate:'44-85-312', vin:'HMKGN41GP4U012345', make:'Hyundai',       model:'Tucson',       year:2020, color:'Black',  mileage:55100, owner:'C002', status:'waiting',        quality:65 },
      { id:'V004', plate:'71-90-455', vin:'JTMBD33V685012345', make:'Toyota',        model:'Land Cruiser', year:2023, color:'Grey',   mileage:21500, owner:'C003', status:'approval-pending',quality:91 },
      { id:'V005', plate:'38-60-127', vin:'1FMJK1KT2LEA12345', make:'Ford',          model:'Ranger',       year:2023, color:'Blue',   mileage:29700, owner:'C004', status:'in-service',      quality:78 },
      { id:'V006', plate:'52-44-890', vin:'5NPDH4AE2GH012345', make:'Hyundai',       model:'Sonata',       year:2020, color:'Red',    mileage:71200, owner:'C005', status:'ready',           quality:69 },
      { id:'V007', plate:'19-33-764', vin:'SALGS2RE5KA012345', make:'Land Rover',    model:'Discovery',    year:2022, color:'Black',  mileage:41800, owner:'C006', status:'delivered',       quality:83 },
    ],

    bookings: [
      { id:'B001', customer:'C001', vehicle:'V001', services:['Full Brake Service','20k Oil & Filter'],
        date:'2026-06-07', time:'08:00', bay:'Bay 3', tech:'T001', status:'in-service', price:299, notes:'' },
      { id:'B002', customer:'C002', vehicle:'V002', services:['Intake Photo Completion'],
        date:'2026-06-07', time:'09:00', bay:'Bay 1', tech:'T002', status:'checked-in',  price:0,   notes:'5 of 7 photos done' },
      { id:'B003', customer:'C003', vehicle:'V004', services:['60k Service','Brake & Rotor','Wheel Alignment'],
        date:'2026-06-07', time:'09:30', bay:'Bay 2', tech:'T003', status:'approval-pending', price:420, notes:'Awaiting alignment decision' },
      { id:'B004', customer:'C004', vehicle:'V005', services:['Tyre Rotation','Nitrogen Fill'],
        date:'2026-06-07', time:'07:45', bay:'Bay 4', tech:'T004', status:'in-service', price:85, notes:'Late — flagged' },
      { id:'B005', customer:'C002', vehicle:'V003', services:['Pre-inspection'],
        date:'2026-06-07', time:'10:00', bay:null, tech:null, status:'waiting', price:0, notes:'Awaiting bay assignment' },
      { id:'B006', customer:'C005', vehicle:'V006', services:['QC Check','Delivery'],
        date:'2026-06-07', time:'13:00', bay:'Bay 5', tech:'T001', status:'ready', price:145, notes:'Ready for pickup' },
    ],

    workOrders: [
      { id:'WO-2041', booking:'B001', vehicle:'V001', customer:'C001', tech:'T001', bay:'Bay 3',
        status:'in-service', startTime:'08:15', promisedTime:'12:00', priority:'high',
        items:[
          { id:'LI1', name:'Front brake pads (OEM)', qty:'1 set', unit:85,  total:85,  approved:true  },
          { id:'LI2', name:'Brake rotor machining',  qty:2,       unit:30,  total:60,  approved:true  },
          { id:'LI3', name:'Engine oil 5W-30',       qty:'6 L',   unit:9,   total:54,  approved:true  },
          { id:'LI4', name:'Labor',                  qty:'2.5 h', unit:40,  total:100, approved:true  },
        ],
        photos:['old-pads','rotor-surface'],
        notes:'Front brakes worn below safe limit. Replaced pads and machined rotors. Test-driven — braking smooth.',
        internalNotes:'Customer hesitant on rotor replacement — offered machining. Watch left caliper next visit.',
        total:299, invoiceId:null },
      { id:'WO-2042', booking:'B003', vehicle:'V004', customer:'C003', tech:'T003', bay:'Bay 2',
        status:'approval-pending', startTime:'09:45', promisedTime:'14:00', priority:'normal',
        items:[
          { id:'LI5', name:'Front brake pads + rotors', qty:1, unit:145, total:145, approved:true  },
          { id:'LI6', name:'Major 60k service',         qty:1, unit:190, total:190, approved:true  },
          { id:'LI7', name:'Cabin air filter',          qty:1, unit:25,  total:25,  approved:false },
          { id:'LI8', name:'Wheel alignment',           qty:1, unit:60,  total:60,  approved:null  },
        ],
        photos:['intake-front','intake-rear','intake-interior'],
        notes:'', internalNotes:'Check rear bushings next visit.',
        total:420, invoiceId:null },
    ],

    estimates: [
      { id:'EST-558', workOrder:'WO-2042', vehicle:'V004', customer:'C003',
        status:'partial-approval', sentAt:'09:14', openedAt:'09:31', respondedAt:'09:36',
        items:[
          { name:'Front brake pads + rotors', price:145, status:'approved'  },
          { name:'Major 60k service',         price:190, status:'approved'  },
          { name:'Cabin air filter',          price:25,  status:'declined'  },
          { name:'Wheel alignment',           price:60,  status:'pending'   },
        ] },
    ],

    invoices: [
      { id:'INV-4401', workOrder:'WO-2038', vehicle:'V007', customer:'C006',
        date:'2026-06-06', total:380, status:'paid',    method:'card',
        items:[{name:'Suspension overhaul',total:320},{name:'Labor',total:60}] },
      { id:'INV-4402', workOrder:'WO-2039', vehicle:'V006', customer:'C005',
        date:'2026-06-06', total:145, status:'pending', method:null,
        items:[{name:'Brake service',total:85},{name:'Labor',total:60}] },
      { id:'INV-4403', workOrder:'WO-2040', vehicle:'V003', customer:'C002',
        date:'2026-06-05', total:220, status:'overdue', method:null,
        items:[{name:'60k Service',total:190},{name:'Air filter',total:30}] },
      { id:'INV-4400', workOrder:'WO-2037', vehicle:'V001', customer:'C001',
        date:'2026-06-04', total:299, status:'paid',    method:'mada',
        items:[{name:'Brake service full',total:299}] },
    ],

    inventory: [
      { id:'P001', sku:'BRK-PAD-001', name:'Front Brake Pads (OEM)',    cat:'Brakes',   stock:8,   min:4, price:85,  cost:48, supplier:'AutoParts JO' },
      { id:'P002', sku:'OIL-5W30-4L', name:'Engine Oil 5W-30 (4L)',     cat:'Fluids',   stock:22,  min:10,price:36,  cost:22, supplier:'Shell Lubricants' },
      { id:'P003', sku:'FLT-AIR-001', name:'Cabin Air Filter',          cat:'Filters',  stock:3,   min:5, price:25,  cost:12, supplier:'AutoParts JO' },
      { id:'P004', sku:'BRK-ROT-001', name:'Front Brake Rotor (OEM)',   cat:'Brakes',   stock:2,   min:4, price:95,  cost:60, supplier:'AutoParts JO' },
      { id:'P005', sku:'OIL-5W20-4L', name:'Engine Oil 5W-20 (4L)',     cat:'Fluids',   stock:18,  min:8, price:34,  cost:20, supplier:'Castrol' },
      { id:'P006', sku:'FLT-OIL-001', name:'Oil Filter',                cat:'Filters',  stock:15,  min:6, price:12,  cost:5,  supplier:'AutoParts JO' },
      { id:'P007', sku:'TYR-NIT-001', name:'Nitrogen Fill (per tyre)',  cat:'Tyres',    stock:999, min:0, price:8,   cost:0,  supplier:'In-house' },
      { id:'P008', sku:'WHL-ALN-001', name:'Wheel Alignment',           cat:'Services', stock:999, min:0, price:60,  cost:0,  supplier:'In-house' },
    ],

    technicians: [
      { id:'T001', name:'Samir H.',   role:'Lead Technician', specialty:'Brakes & Suspension',  status:'busy',      bay:'Bay 3', utilization:82 },
      { id:'T002', name:'Yousef M.',  role:'Technician',      specialty:'Engine & Electrical',  status:'busy',      bay:'Bay 1', utilization:65 },
      { id:'T003', name:'Khalid R.',  role:'Technician',      specialty:'General Service',       status:'busy',      bay:'Bay 2', utilization:70 },
      { id:'T004', name:'Ahmad S.',   role:'Technician',      specialty:'Tyres & Wheels',        status:'busy',      bay:'Bay 4', utilization:55 },
      { id:'T005', name:'Nader K.',   role:'Junior Tech',     specialty:'General',               status:'available', bay:null,    utilization:20 },
    ],

    bays: [
      { id:'BAY1', name:'Bay 1', type:'Mechanical', vehicle:'V002', status:'occupied' },
      { id:'BAY2', name:'Bay 2', type:'Mechanical', vehicle:'V004', status:'occupied' },
      { id:'BAY3', name:'Bay 3', type:'Lift',       vehicle:'V001', status:'occupied' },
      { id:'BAY4', name:'Bay 4', type:'Tyres',      vehicle:'V005', status:'occupied' },
      { id:'BAY5', name:'Bay 5', type:'QC',         vehicle:'V006', status:'occupied' },
      { id:'BAY6', name:'Bay 6', type:'Mechanical', vehicle:null,   status:'available' },
    ],

    notifications: [
      { id:'N001', type:'action', icon:'⏳', title:'Approval awaited — EST-558', body:'Toyota Land Cruiser alignment pending 32 min', link:'estimate', read:false, time:'09:36' },
      { id:'N002', type:'action', icon:'📷', title:'Intake incomplete — Nissan Patrol', body:'5 of 7 photos captured · B002', link:'intake', read:false, time:'09:05' },
      { id:'N003', type:'action', icon:'📦', title:'Low stock — Front Brake Rotor', body:'2 units · threshold: 4', link:'inventory', read:false, time:'08:50' },
      { id:'N004', type:'today',  icon:'✅', title:'Hyundai Sonata — Ready for pickup', body:'Hana Darwish notified · Bay 5 complete', link:'invoices', read:false, time:'12:55' },
      { id:'N005', type:'today',  icon:'⚠️', title:'Ford Ranger 2023 — Late 45 min', body:'Tariq Nawfal · Tyre rotation', link:'workorder', read:true, time:'11:00' },
      { id:'N006', type:'info',   icon:'🔧', title:'WO-2041 — Samir started job', body:'Brake overhaul in progress · Bay 3', link:'workorder', read:true, time:'08:15' },
    ],

    services: [
      { id:'S001', cat:'Brakes',     name:'Full Brake Service',       duration:120, price:145 },
      { id:'S002', cat:'Engine',     name:'20k Oil & Filter',         duration:45,  price:89  },
      { id:'S003', cat:'Engine',     name:'60k Full Service',         duration:180, price:190 },
      { id:'S004', cat:'Tyres',      name:'Tyre Rotation',            duration:30,  price:25  },
      { id:'S005', cat:'Tyres',      name:'Nitrogen Fill',            duration:15,  price:20  },
      { id:'S006', cat:'Electrical', name:'Battery Check & Replace',  duration:60,  price:120 },
      { id:'S007', cat:'Bodywork',   name:'Pre-sale Inspection',      duration:90,  price:85  },
      { id:'S008', cat:'AC',         name:'AC Gas Recharge',          duration:60,  price:95  },
      { id:'S009', cat:'Suspension', name:'Wheel Alignment',          duration:60,  price:60  },
      { id:'S010', cat:'General',    name:'Vehicle Health Check',     duration:45,  price:50  },
    ],

    timeline: [
      { id:'TL001', vehicle:'V001', type:'service',  text:'Brake overhaul started',                   by:'Samir H.',   time:'08:15', date:'2026-06-07' },
      { id:'TL002', vehicle:'V004', type:'approval', text:'Estimate EST-558 sent to Maya Khalil',      by:'System',     time:'09:14', date:'2026-06-07' },
      { id:'TL003', vehicle:'V004', type:'approval', text:'Customer approved 2 of 4 items',            by:'Maya Khalil',time:'09:36', date:'2026-06-07' },
      { id:'TL004', vehicle:'V006', type:'status',   text:'Vehicle marked Ready for pickup',           by:'System',     time:'12:55', date:'2026-06-07' },
      { id:'TL005', vehicle:'V001', type:'checkin',  text:'Vehicle checked in · mileage 62,400 km',   by:'Rami A.',    time:'08:05', date:'2026-06-07' },
    ],

    settings: {
      workshopName: 'Al-Rawabi Auto Care',
      branch: 'Amman — Main Branch',
      taxRate: 16,
      currency: 'JOD',
      invoicePrefix: 'INV-',
      legalName: 'Al-Rawabi Auto Services LLC',
      regNumber: 'JO-54321-2019',
      address: 'King Abdullah II St, Amman 11110, Jordan',
      phone: '+962 6 555 0100',
      email: 'ops@alrawabi-auto.jo',
    },
  };

  /* ── State ──────────────────────────────────────────────────────── */
  var _db = null;

  function _load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.meta && parsed.meta.version === SEED.meta.version) {
          _db = parsed; return;
        }
      }
    } catch (e) {}
    _db = JSON.parse(JSON.stringify(SEED));
    _save();
  }

  /* Debounced save — batches rapid mutations (button clicks, field changes)
     into a single localStorage write 400ms after the last call.
     reset() bypasses the debounce and saves synchronously so DB integrity
     is guaranteed even when the tab is about to navigate away. */
  var _saveTimer = null;
  function _save(immediate) {
    if (immediate) {
      if (_saveTimer) { clearTimeout(_saveTimer); _saveTimer = null; }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(_db)); } catch (e) {}
      return;
    }
    if (_saveTimer) clearTimeout(_saveTimer);
    _saveTimer = setTimeout(function() {
      _saveTimer = null;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(_db)); } catch (e) {}
    }, 400);
  }

  function _emit(type, detail) {
    document.dispatchEvent(new CustomEvent('db:' + type, { detail: detail || {} }));
  }

  /* ── Public API ─────────────────────────────────────────────────── */
  function reset() {
    _db = JSON.parse(JSON.stringify(SEED));
    _save(true); // immediate — must be durable before reset event fires
    _emit('reset');
  }

  function get(col) { return _db[col] ? JSON.parse(JSON.stringify(_db[col])) : []; }

  function byId(col, id) {
    var arr = _db[col] || [];
    var r = arr.find(function (x) { return x.id === id; });
    return r ? JSON.parse(JSON.stringify(r)) : null;
  }

  function getSetting(key) { return _db.settings ? _db.settings[key] : undefined; }
  function setSetting(key, val) { if (_db.settings) { _db.settings[key] = val; _save(); } }

  function add(col, record) {
    if (!_db[col]) _db[col] = [];
    _db[col].push(record);
    _save();
    _emit('change', { col: col, id: record.id });
    return record;
  }

  function update(col, id, patch) {
    var arr = _db[col] || [];
    var idx = arr.findIndex(function (x) { return x.id === id; });
    if (idx >= 0) {
      Object.assign(arr[idx], patch);
      _save();
      _emit('change', { col: col, id: id });
      return JSON.parse(JSON.stringify(arr[idx]));
    }
    return null;
  }

  function remove(col, id) {
    if (!_db[col]) return;
    _db[col] = _db[col].filter(function (x) { return x.id !== id; });
    _save();
    _emit('change', { col: col, id: id });
  }

  /* ── ID generators ──────────────────────────────────────────────── */
  function nextId(prefix, col, pad) {
    pad = pad || 4;
    var existing = (_db[col] || []).map(function (r) {
      return parseInt(String(r.id).replace(prefix, '')) || 0;
    });
    return prefix + String((existing.length ? Math.max.apply(null, existing) : 0) + 1).padStart(pad, '0');
  }

  function nextWO() {
    var existing = (_db.workOrders || []).map(function (r) {
      return parseInt(String(r.id).replace('WO-', '')) || 0;
    });
    return 'WO-' + ((existing.length ? Math.max.apply(null, existing) : 2041) + 1);
  }

  function nextINV() {
    var existing = (_db.invoices || []).map(function (r) {
      return parseInt(String(r.id).replace('INV-', '')) || 0;
    });
    return 'INV-' + ((existing.length ? Math.max.apply(null, existing) : 4403) + 1);
  }

  function nextEST() {
    var existing = (_db.estimates || []).map(function (r) {
      return parseInt(String(r.id).replace('EST-', '')) || 0;
    });
    return 'EST-' + ((existing.length ? Math.max.apply(null, existing) : 557) + 1);
  }

  /* ── Timeline helper ────────────────────────────────────────────── */
  function addTimeline(vehicleId, type, text, by) {
    var now = new Date();
    var h = now.getHours().toString().padStart(2,'0');
    var m = now.getMinutes().toString().padStart(2,'0');
    var entry = {
      id: 'TL' + Date.now(),
      vehicle: vehicleId,
      type: type,
      text: text,
      by: by || 'System',
      time: h + ':' + m,
      date: now.toISOString().slice(0, 10),
    };
    add('timeline', entry);
    return entry;
  }

  /* ── Notification helper ─────────────────────────────────────────── */
  function addNotif(type, icon, title, body, link) {
    var now = new Date();
    var h = now.getHours().toString().padStart(2,'0');
    var m = now.getMinutes().toString().padStart(2,'0');
    var n = {
      id: 'N' + Date.now(),
      type: type || 'info',
      icon: icon || '🔔',
      title: title,
      body: body,
      link: link || 'dashboard',
      read: false,
      time: h + ':' + m,
    };
    add('notifications', n);
    _emit('notif', { notif: n });
    return n;
  }

  function unreadCount() {
    return (_db.notifications || []).filter(function (n) { return !n.read; }).length;
  }

  function markRead(id) { update('notifications', id, { read: true }); }
  function markAllRead() {
    (_db.notifications || []).forEach(function (n) { n.read = true; });
    _save();
    _emit('change', { col: 'notifications' });
  }

  _load();

  return {
    get: get, byId: byId, add: add, update: update, remove: remove,
    getSetting: getSetting, setSetting: setSetting,
    reset: reset, save: _save,
    nextId: nextId, nextWO: nextWO, nextINV: nextINV, nextEST: nextEST,
    addTimeline: addTimeline, addNotif: addNotif,
    unreadCount: unreadCount, markRead: markRead, markAllRead: markAllRead,
  };

})();
