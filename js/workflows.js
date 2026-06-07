/* ══════════════════════════════════════════════════════════════════
   AutoPassport OS — Workflow Engine  (js/workflows.js)
   All interactive workflows · No dead buttons
   Depends on: db.js  app.js (loaded before this file)
   ══════════════════════════════════════════════════════════════════ */
'use strict';

/* ═══════════════════════ UTILITIES ═══════════════════════════════ */
function fmtCurrency(n) {
  var s = DB.getSetting('currency') || 'JOD';
  return s + ' ' + Number(n).toFixed(0);
}
function _now() { var d=new Date(); return d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0'); }
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* Quick modal helper */
function _modal(html, onOpen) {
  var existing = document.getElementById('_qm');
  if (existing) existing.remove();
  var el = document.createElement('div');
  el.id = '_qm';
  el.className = 'modal-overlay open';
  el.style.cssText = 'z-index:2500;';
  el.innerHTML = '<div class="modal-box" style="max-width:480px;width:90vw;">' + html + '</div>';
  el.addEventListener('click', function(e){ if(e.target===el) closeQuickModal(); });
  document.body.appendChild(el);
  document.body.style.overflow = 'hidden';
  if (onOpen) onOpen(el);
}
function closeQuickModal() {
  var m = document.getElementById('_qm');
  if (m) { m.remove(); document.body.style.overflow=''; }
}

/* Confirm modal helper */
function _confirm(msg, onYes, btnLabel) {
  btnLabel = btnLabel || 'Confirm';
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Confirm Action</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<p style="margin:16px 0 24px;color:var(--muted);">' + _esc(msg) + '</p>' +
    '<div style="display:flex;gap:10px;justify-content:flex-end;">' +
    '<button class="btn" onclick="closeQuickModal()">Cancel</button>' +
    '<button class="btn primary" onclick="closeQuickModal();(' + onYes.toString() + ')()">' + btnLabel + '</button>' +
    '</div>'
  );
}

/* ═══════════════════════ NOTIFICATION BADGE ═══════════════════════ */
function refreshNotifBadge() {
  var count = DB.unreadCount();
  document.querySelectorAll('.notif-badge,.notif-dot').forEach(function(el) {
    el.textContent = count > 0 ? count : '';
    el.style.display = count > 0 ? '' : 'none';
  });
  // update the bell badge in topbar
  var bell = document.querySelector('.tb-notif-badge');
  if (bell) { bell.textContent = count; bell.style.display = count > 0 ? '' : 'none'; }
}

function renderNotifPanel() {
  var panel = document.getElementById('notif-panel');
  if (!panel) return;
  var notifs = DB.get('notifications');
  var unread = notifs.filter(function(n){ return !n.read; });
  var html = '<div class="np-head"><span class="np-title">Notifications</span>' +
    (unread.length ? '<button class="np-mark-all" onclick="WF.markAllRead()">Mark all read</button>' : '') +
    '<button class="modal-close" onclick="toggleNotifPanel()" style="margin-inline-start:auto;">✕</button></div>';
  if (!notifs.length) {
    html += '<div class="np-empty">No notifications</div>';
  } else {
    ['action','today','info'].forEach(function(type) {
      var group = notifs.filter(function(n){ return n.type===type; });
      if (!group.length) return;
      var label = type==='action'?'Needs Action':type==='today'?'Today':'Informational';
      html += '<div class="np-group-label">' + label + '</div>';
      group.forEach(function(n) {
        html += '<div class="np-item' + (n.read?'':' unread') + '" onclick="WF.openNotif(\'' + n.id + '\')">' +
          '<span class="np-icon">' + (n.icon||'🔔') + '</span>' +
          '<div class="np-body"><div class="np-t">' + _esc(n.title) + '</div>' +
          '<div class="np-m">' + _esc(n.body) + '</div></div>' +
          '<span class="np-time">' + n.time + '</span>' +
          '</div>';
      });
    });
  }
  panel.innerHTML = html;
  refreshNotifBadge();
}

/* ═══════════════════════ CUSTOMERS & VEHICLES ═══════════════════════ */
function renderCustomerGrid() {
  var container = document.getElementById('vehGrid');
  if (!container) return;
  var vehicles = DB.get('vehicles');
  var customers = DB.get('customers');
  var html = '';
  vehicles.forEach(function(v) {
    var cust = customers.find(function(c){ return c.id === v.owner; }) || { name:'Unknown' };
    var statusClass = { 'in-service':'teal','checked-in':'blue','waiting':'gray',
      'approval-pending':'warn','ready':'good','delivered':'' }[v.status] || '';
    var statusLabel = {
      'in-service':'In Service','checked-in':'Checked In','waiting':'Waiting',
      'approval-pending':'Awaiting Approval','ready':'Ready','delivered':'Delivered'
    }[v.status] || v.status;
    html += '<div class="veh-card" onclick="WF.openVehicleById(\'' + v.id + '\')" style="cursor:pointer;">' +
      '<div class="veh-card-img" style="background:linear-gradient(135deg,rgba(205,215,235,.6),rgba(220,230,250,.4));' +
      'height:110px;border-radius:10px 10px 0 0;display:flex;align-items:center;justify-content:center;' +
      'font-size:28px;color:var(--muted);">🚗</div>' +
      '<div style="padding:12px 14px;">' +
      '<div style="font-weight:700;font-size:14px;">' + _esc(v.make) + ' ' + _esc(v.model) + ' ' + v.year + '</div>' +
      '<div style="color:var(--muted);font-size:12px;margin:2px 0;">' + _esc(cust.name) + ' · ' + v.plate + '</div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px;">' +
      '<span class="pill ' + statusClass + '">' + statusLabel + '</span>' +
      '<span style="font-size:11px;color:var(--muted);">Quality ' + v.quality + '%</span>' +
      '</div>' +
      '<div style="display:flex;gap:6px;margin-top:10px;">' +
      '<button class="btn sm" style="flex:1" onclick="event.stopPropagation();WF.openVehicleById(\'' + v.id + '\')">Open Record</button>' +
      '<button class="btn sm primary" onclick="event.stopPropagation();WF.startBookingForVehicle(\'' + v.id + '\')">Book</button>' +
      '</div></div></div>';
  });
  container.innerHTML = html || '<div class="empty-state"><div class="es-icon">🚗</div><div>No vehicles yet</div></div>';
}

var _currentVehicleId = 'V001';
function openVehicleById(id) {
  _currentVehicleId = id;
  var v = DB.byId('vehicles', id);
  if (!v) return;
  var cust = DB.byId('customers', v.owner) || { name:'Unknown', phone:'', membership:'Standard' };

  /* Update veh-ctx strip */
  document.querySelectorAll('#screen-vehicle .veh-ctx .vname').forEach(function(el){
    el.textContent = v.make + ' ' + v.model + ' ' + v.year;
  });
  /* Update plate in ctx */
  var ctxStrip = document.querySelector('#screen-vehicle .veh-ctx');
  if (ctxStrip) {
    var spans = ctxStrip.querySelectorAll('span:not(.vname):not(.vsep):not(.vpill)');
    if (spans[0]) spans[0].textContent = v.plate;
  }

  /* Update overview tab */
  var ov = document.getElementById('vehOvGrid');
  if (ov) {
    ov.innerHTML =
      '<div class="card"><h3>Vehicle Details</h3>' +
      '<table class="tbl">' +
      '<tr><td>Make</td><td>' + _esc(v.make) + '</td></tr>' +
      '<tr><td>Model</td><td>' + _esc(v.model) + '</td></tr>' +
      '<tr><td>Year</td><td>' + v.year + '</td></tr>' +
      '<tr><td>Colour</td><td>' + _esc(v.color) + '</td></tr>' +
      '<tr><td>Plate</td><td>' + _esc(v.plate) + '</td></tr>' +
      '<tr><td>VIN</td><td style="font-family:monospace;font-size:11px">' + _esc(v.vin) + '</td></tr>' +
      '<tr><td>Mileage</td><td>' + v.mileage.toLocaleString() + ' km</td></tr>' +
      '<tr><td>Status</td><td><span class="pill teal">' + (v.status||'—') + '</span></td></tr>' +
      '</table>' +
      '<div style="display:flex;gap:8px;margin-top:12px;">' +
      '<button class="btn sm" onclick="WF.editVehicle(\'' + v.id + '\')">Edit</button>' +
      '<button class="btn sm primary" onclick="openBookingWizard()">New Booking</button>' +
      '</div></div>' +

      '<div class="card"><h3>Owner</h3>' +
      '<table class="tbl">' +
      '<tr><td>Name</td><td>' + _esc(cust.name) + '</td></tr>' +
      '<tr><td>Phone</td><td>' + _esc(cust.phone) + '</td></tr>' +
      '<tr><td>Membership</td><td><span class="pill blue">' + _esc(cust.membership) + '</span></td></tr>' +
      '<tr><td>Loyalty</td><td>' + (cust.points||0) + ' pts</td></tr>' +
      '</table>' +
      '<div style="margin-top:12px;display:flex;gap:8px;">' +
      '<button class="btn sm" onclick="WF.contactCustomer(\'' + cust.name + '\',\'' + cust.phone + '\')">Contact</button>' +
      '</div></div>';
  }

  /* Update record quality ring number */
  var ringNum = document.querySelector('#screen-vehicle .rq-score, #screen-vehicle .record-quality-num');
  if (ringNum) ringNum.textContent = v.quality;

  go('vehicle');
}

function editVehicle(id) {
  var v = DB.byId('vehicles', id);
  if (!v) return;
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Edit Vehicle</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="display:grid;gap:12px;margin-top:16px;">' +
    '<label class="form-label">Plate<input class="form-input" id="_ev_plate" value="' + _esc(v.plate) + '"/></label>' +
    '<label class="form-label">Mileage (km)<input class="form-input" type="number" id="_ev_mil" value="' + v.mileage + '"/></label>' +
    '<label class="form-label">Colour<input class="form-input" id="_ev_col" value="' + _esc(v.color) + '"/></label>' +
    '</div>' +
    '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;">' +
    '<button class="btn" onclick="closeQuickModal()">Cancel</button>' +
    '<button class="btn primary" onclick="WF._saveVehicleEdit(\'' + id + '\')">Save Changes</button>' +
    '</div>'
  );
}

function _saveVehicleEdit(id) {
  var plate = document.getElementById('_ev_plate');
  var mil   = document.getElementById('_ev_mil');
  var col   = document.getElementById('_ev_col');
  DB.update('vehicles', id, {
    plate: plate ? plate.value.trim() : undefined,
    mileage: mil ? parseInt(mil.value)||0 : undefined,
    color: col ? col.value.trim() : undefined,
  });
  closeQuickModal();
  openVehicleById(id);
  showToast('Vehicle record updated');
}

function startBookingForVehicle(vehicleId) {
  _currentVehicleId = vehicleId;
  openBookingWizard();
}

/* ═══════════════════════ BOOKING WIZARD (enhanced) ═══════════════ */
var WIZ = {
  step: 1,
  customer: null,
  vehicle: null,
  services: [],
  date: '', time: '09:00', bay: null, tech: null, notes: '', pickup: false,
};

function openBookingWizardFull() {
  WIZ = { step:1, customer:null, vehicle:null, services:[], date:'', time:'09:00', bay:null, tech:null, notes:'', pickup:false };
  if (_currentVehicleId) {
    var v = DB.byId('vehicles', _currentVehicleId);
    if (v) {
      WIZ.vehicle = v.id;
      WIZ.customer = v.owner;
      WIZ.step = 3; // skip to service step
    }
  }
  openBookingWizard(); // use existing function which renders wizard
  _renderWizardStep();
}

function _renderWizardStep() {
  var body = document.getElementById('wizBody');
  if (!body) return;
  if (WIZ.step === 1) body.innerHTML = _wizStep1();
  else if (WIZ.step === 2) body.innerHTML = _wizStep2();
  else if (WIZ.step === 3) body.innerHTML = _wizStep3();
  else if (WIZ.step === 4) body.innerHTML = _wizStep4();

  /* Update step indicator */
  document.querySelectorAll('.wiz-step-dot').forEach(function(dot, i) {
    dot.classList.toggle('active', i < WIZ.step);
    dot.classList.toggle('done', i < WIZ.step - 1);
  });
}

function _wizStep1() {
  var customers = DB.get('customers');
  var opts = customers.map(function(c) {
    return '<div class="wiz-cust-option' + (WIZ.customer===c.id?' selected':'') + '" onclick="WF._selectWizCustomer(\'' + c.id + '\')" style="' +
      'padding:10px 12px;border-radius:10px;cursor:pointer;display:flex;align-items:center;gap:10px;' +
      'border:1.5px solid ' + (WIZ.customer===c.id?'var(--accent-2)':'var(--line)') + ';margin-bottom:6px;">' +
      '<div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent-2));' +
      'display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;flex:none;">' +
      c.name.charAt(0) + '</div>' +
      '<div><div style="font-weight:600;font-size:13.5px">' + _esc(c.name) + '</div>' +
      '<div style="font-size:11.5px;color:var(--muted)">' + c.phone + ' · ' + c.membership + '</div></div>' +
      '</div>';
  }).join('');
  return '<h3 style="margin:0 0 14px;font-size:15px">Select Customer</h3>' +
    '<input class="form-input" placeholder="Search by name or phone…" oninput="WF._filterWizCustomers(this.value)" style="margin-bottom:12px"/>' +
    '<div id="_wiz_custs">' + opts + '</div>' +
    '<button class="btn sm" style="margin-top:12px;width:100%;" onclick="WF._addNewCustomer()">+ Add New Customer</button>';
}

function _filterWizCustomers(q) {
  q = q.toLowerCase();
  var customers = DB.get('customers');
  var filtered = customers.filter(function(c){ return !q || c.name.toLowerCase().includes(q) || c.phone.includes(q); });
  var container = document.getElementById('_wiz_custs');
  if (!container) return;
  container.innerHTML = filtered.map(function(c) {
    return '<div class="wiz-cust-option' + (WIZ.customer===c.id?' selected':'') + '" onclick="WF._selectWizCustomer(\'' + c.id + '\')" style="' +
      'padding:10px 12px;border-radius:10px;cursor:pointer;display:flex;align-items:center;gap:10px;' +
      'border:1.5px solid ' + (WIZ.customer===c.id?'var(--accent-2)':'var(--line)') + ';margin-bottom:6px;">' +
      '<div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent-2));' +
      'display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;flex:none;">' +
      c.name.charAt(0) + '</div>' +
      '<div><div style="font-weight:600;font-size:13.5px">' + _esc(c.name) + '</div>' +
      '<div style="font-size:11.5px;color:var(--muted)">' + c.phone + ' · ' + c.membership + '</div></div>' +
      '</div>';
  }).join('') || '<div style="color:var(--muted);text-align:center;padding:16px">No customers found</div>';
}

function _selectWizCustomer(id) {
  WIZ.customer = id;
  // Pre-fill vehicle from this customer
  var cust = DB.byId('customers', id);
  if (cust && cust.vehicles && cust.vehicles.length === 1) WIZ.vehicle = cust.vehicles[0];
  _renderWizardStep();
}

function _wizStep2() {
  var cust = DB.byId('customers', WIZ.customer);
  var custVehicles = cust ? (cust.vehicles||[]).map(function(vid){ return DB.byId('vehicles',vid); }).filter(Boolean) : [];
  var opts = custVehicles.map(function(v) {
    return '<div onclick="WF._selectWizVehicle(\'' + v.id + '\')" style="' +
      'padding:10px 12px;border-radius:10px;cursor:pointer;' +
      'border:1.5px solid ' + (WIZ.vehicle===v.id?'var(--accent-2)':'var(--line)') + ';margin-bottom:6px;">' +
      '<div style="font-weight:600;">' + _esc(v.make + ' ' + v.model + ' ' + v.year) + '</div>' +
      '<div style="font-size:11.5px;color:var(--muted)">' + v.plate + ' · ' + v.mileage.toLocaleString() + ' km</div>' +
      '</div>';
  }).join('');
  return '<h3 style="margin:0 0 14px;font-size:15px">Select Vehicle</h3>' +
    (cust ? '<div style="margin-bottom:12px;font-size:13px;color:var(--muted)">Customer: <strong style="color:var(--ink)">' + _esc(cust.name) + '</strong></div>' : '') +
    (opts || '<div style="color:var(--muted);margin-bottom:10px">No vehicles on file for this customer.</div>') +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px;">' +
    '<input class="form-input" id="_wiz_vin" placeholder="Enter VIN…"/>' +
    '<button class="btn sm" onclick="WF._vinDecode()">Decode VIN</button>' +
    '</div>' +
    '<div id="_wiz_vin_result"></div>' +
    '<button class="btn sm" style="margin-top:10px;width:100%;" onclick="WF._addVehicleForCustomer()">+ Add New Vehicle</button>';
}

function _selectWizVehicle(id) { WIZ.vehicle = id; _renderWizardStep(); }

function _vinDecode() {
  var vin = document.getElementById('_wiz_vin');
  var res = document.getElementById('_wiz_vin_result');
  if (!vin || !res) return;
  var vinVal = vin.value.trim().toUpperCase();
  if (vinVal.length < 10) { showToast('Enter at least 10 characters'); return; }
  res.innerHTML = '<div style="padding:10px;color:var(--muted);font-size:12px;">Decoding…</div>';
  setTimeout(function() {
    // Simulate decode
    var makes = { 'WDD':'Mercedes-Benz', 'JN1':'Nissan', 'HMK':'Hyundai', 'JTM':'Toyota', '1FM':'Ford', '5NP':'Hyundai', 'SAL':'Land Rover' };
    var prefix = vinVal.slice(0,3);
    var make = makes[prefix] || 'Unknown Make';
    res.innerHTML = '<div style="padding:10px 12px;border-radius:10px;border:1.5px solid var(--accent-2);margin-top:8px;">' +
      '<div style="font-size:12px;color:var(--muted);margin-bottom:6px;">VIN Decode Result (simulated)</div>' +
      '<div style="font-weight:600">' + make + ' · Year 2021</div>' +
      '<div style="font-size:11.5px;color:var(--muted)">' + vinVal + '</div>' +
      '<button class="btn sm primary" style="margin-top:8px;" onclick="WF._useDecodedVehicle(\'' + vinVal + '\',\'' + make + '\')">Use This Vehicle</button>' +
      '</div>';
  }, 900);
}

function _useDecodedVehicle(vin, make) {
  var newV = {
    id: DB.nextId('V', 'vehicles', 3),
    plate: 'NEW-' + Math.floor(Math.random()*900+100),
    vin: vin, make: make, model: 'Model', year: 2021,
    color: 'White', mileage: 0, owner: WIZ.customer, status: 'waiting', quality: 50,
  };
  DB.add('vehicles', newV);
  if (WIZ.customer) {
    var cust = DB.get('customers').find(function(c){ return c.id===WIZ.customer; });
    if (cust) { cust.vehicles.push(newV.id); DB.update('customers', WIZ.customer, { vehicles: cust.vehicles }); }
  }
  WIZ.vehicle = newV.id;
  _renderWizardStep();
  showToast('Vehicle added from VIN decode');
}

function _addVehicleForCustomer() {
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Add Vehicle</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="display:grid;gap:10px;margin-top:16px;">' +
    '<label class="form-label">Make<input class="form-input" id="_av_make" placeholder="e.g. Toyota"/></label>' +
    '<label class="form-label">Model<input class="form-input" id="_av_model" placeholder="e.g. Camry"/></label>' +
    '<label class="form-label">Year<input class="form-input" type="number" id="_av_year" value="2022"/></label>' +
    '<label class="form-label">Plate<input class="form-input" id="_av_plate" placeholder="e.g. 33-22-111"/></label>' +
    '<label class="form-label">VIN<input class="form-input" id="_av_vin"/></label>' +
    '<label class="form-label">Mileage (km)<input class="form-input" type="number" id="_av_mil" value="0"/></label>' +
    '</div>' +
    '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px;">' +
    '<button class="btn" onclick="closeQuickModal()">Cancel</button>' +
    '<button class="btn primary" onclick="WF._saveNewVehicle()">Add Vehicle</button>' +
    '</div>'
  );
}

function _saveNewVehicle() {
  var f = function(id){ var el=document.getElementById(id); return el?el.value.trim():''; };
  var newV = {
    id: DB.nextId('V','vehicles',3),
    plate: f('_av_plate') || 'UNKNOWN',
    vin: f('_av_vin'),
    make: f('_av_make') || 'Unknown',
    model: f('_av_model') || 'Unknown',
    year: parseInt(f('_av_year')) || 2022,
    color: 'White', mileage: parseInt(f('_av_mil'))||0,
    owner: WIZ.customer, status:'waiting', quality:50,
  };
  DB.add('vehicles', newV);
  if (WIZ.customer) {
    var customers = DB.get('customers');
    var cust = customers.find(function(c){ return c.id===WIZ.customer; });
    if (cust) { var vlist = cust.vehicles || []; vlist.push(newV.id); DB.update('customers', WIZ.customer, { vehicles: vlist }); }
  }
  WIZ.vehicle = newV.id;
  closeQuickModal();
  _renderWizardStep();
  showToast('Vehicle added');
}

function _addNewCustomer() {
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Add Customer</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="display:grid;gap:10px;margin-top:16px;">' +
    '<label class="form-label">Full Name<input class="form-input" id="_nc_name" placeholder="e.g. Ahmad Hassan"/></label>' +
    '<label class="form-label">Phone<input class="form-input" id="_nc_phone" placeholder="+962 79 …"/></label>' +
    '<label class="form-label">Email<input class="form-input" type="email" id="_nc_email"/></label>' +
    '<label class="form-label">Notes<input class="form-input" id="_nc_notes" placeholder="Optional"/></label>' +
    '</div>' +
    '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px;">' +
    '<button class="btn" onclick="closeQuickModal()">Cancel</button>' +
    '<button class="btn primary" onclick="WF._saveNewCustomer()">Add Customer</button>' +
    '</div>'
  );
}

function _saveNewCustomer() {
  var f = function(id){ var el=document.getElementById(id); return el?el.value.trim():''; };
  var name = f('_nc_name');
  if (!name) { showToast('Name is required','⚠'); return; }
  var newC = {
    id: DB.nextId('C','customers',3),
    name: name, phone: f('_nc_phone'), email: f('_nc_email'),
    membership:'Standard', points:0, vehicles:[], notes:f('_nc_notes'), created: new Date().toISOString().slice(0,10),
  };
  DB.add('customers', newC);
  WIZ.customer = newC.id;
  closeQuickModal();
  _renderWizardStep();
  showToast('Customer added: ' + name);
}

function _wizStep3() {
  var services = DB.get('services');
  var cats = [...new Set(services.map(function(s){ return s.cat; }))];
  var catsHtml = cats.map(function(cat) {
    var catServices = services.filter(function(s){ return s.cat===cat; });
    return '<div style="margin-bottom:10px;">' +
      '<div style="font-size:11px;font-weight:700;letter-spacing:.06em;color:var(--muted);text-transform:uppercase;margin-bottom:6px;">' + cat + '</div>' +
      catServices.map(function(s) {
        var sel = WIZ.services.indexOf(s.id)>=0;
        return '<div onclick="WF._toggleService(\'' + s.id + '\')" style="' +
          'padding:9px 12px;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;' +
          'border:1.5px solid ' + (sel?'var(--accent-2)':'var(--line)') + ';margin-bottom:5px;' +
          'background:' + (sel?'rgba(37,99,235,.06)':'transparent') + ';">' +
          '<div><div style="font-weight:600;font-size:13px">' + _esc(s.name) + '</div>' +
          '<div style="font-size:11px;color:var(--muted)">' + s.duration + ' min</div></div>' +
          '<div style="text-align:end;">' +
          '<div style="font-weight:700;">' + fmtCurrency(s.price) + '</div>' +
          (sel?'<div style="font-size:11px;color:var(--accent-2)">✓ Selected</div>':'') +
          '</div></div>';
      }).join('') + '</div>';
  }).join('');

  var today = new Date().toISOString().slice(0,10);
  var techs = DB.get('technicians');
  var techOpts = techs.map(function(t){
    return '<option value="' + t.id + '"' + (WIZ.tech===t.id?' selected':'') + '>' + t.name + ' (' + t.specialty + ')' + (t.status==='busy'?' — busy':'') + '</option>';
  }).join('');

  var total = DB.get('services').filter(function(s){ return WIZ.services.indexOf(s.id)>=0; })
    .reduce(function(a,s){ return a+s.price; }, 0);

  return '<h3 style="margin:0 0 14px;font-size:15px">Select Services</h3>' +
    catsHtml +
    '<div style="background:rgba(37,99,235,.06);border:1px solid rgba(37,99,235,.15);border-radius:10px;padding:12px 14px;margin:12px 0;">' +
    '<div style="display:flex;justify-content:space-between;"><span style="font-weight:700">Selected: ' + WIZ.services.length + ' services</span>' +
    '<strong>' + fmtCurrency(total) + '</strong></div></div>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;">' +
    '<label class="form-label">Date<input class="form-input" type="date" id="_wiz_date" value="' + (WIZ.date||today) + '" onchange="WIZ.date=this.value"/></label>' +
    '<label class="form-label">Time<input class="form-input" type="time" id="_wiz_time" value="' + (WIZ.time||'09:00') + '" onchange="WIZ.time=this.value"/></label>' +
    '</div>' +
    '<label class="form-label" style="margin-top:8px;">Technician<select class="form-input" onchange="WIZ.tech=this.value"><option value="">— Assign later —</option>' + techOpts + '</select></label>' +
    '<label class="form-label" style="margin-top:8px;">Customer Notes<textarea class="form-input" rows="2" style="resize:none;" oninput="WIZ.notes=this.value">' + _esc(WIZ.notes) + '</textarea></label>' +
    '<label style="display:flex;align-items:center;gap:8px;margin-top:8px;cursor:pointer;">' +
    '<input type="checkbox" ' + (WIZ.pickup?'checked':'') + ' onchange="WIZ.pickup=this.checked"/> Pickup requested</label>';
}

function _toggleService(id) {
  var idx = WIZ.services.indexOf(id);
  if (idx >= 0) WIZ.services.splice(idx, 1); else WIZ.services.push(id);
  _renderWizardStep();
}

function _wizStep4() {
  var cust  = DB.byId('customers', WIZ.customer) || { name:'—', phone:'—' };
  var veh   = DB.byId('vehicles', WIZ.vehicle)   || { make:'—', model:'—', year:'', plate:'—' };
  var techs = DB.get('technicians');
  var tech  = techs.find(function(t){ return t.id===WIZ.tech; }) || { name:'TBD' };
  var allServices = DB.get('services');
  var selSvcs = allServices.filter(function(s){ return WIZ.services.indexOf(s.id)>=0; });
  var total = selSvcs.reduce(function(a,s){ return a+s.price; }, 0);
  var svcList = selSvcs.map(function(s){
    return '<tr><td>' + _esc(s.name) + '</td><td>' + s.duration + ' min</td><td>' + fmtCurrency(s.price) + '</td></tr>';
  }).join('') || '<tr><td colspan="3" style="color:var(--muted)">No services selected</td></tr>';

  return '<h3 style="margin:0 0 14px;font-size:15px">Confirm Booking</h3>' +
    '<div class="card" style="margin-bottom:12px;">' +
    '<table class="tbl">' +
    '<tr><td>Customer</td><td>' + _esc(cust.name) + '</td></tr>' +
    '<tr><td>Phone</td><td>' + _esc(cust.phone) + '</td></tr>' +
    '<tr><td>Vehicle</td><td>' + _esc(veh.make + ' ' + veh.model + ' ' + veh.year) + '</td></tr>' +
    '<tr><td>Plate</td><td>' + _esc(veh.plate) + '</td></tr>' +
    '<tr><td>Date</td><td>' + (WIZ.date||'—') + '</td></tr>' +
    '<tr><td>Time</td><td>' + (WIZ.time||'—') + '</td></tr>' +
    '<tr><td>Technician</td><td>' + _esc(tech.name) + '</td></tr>' +
    '<tr><td>Pickup</td><td>' + (WIZ.pickup?'Requested':'No') + '</td></tr>' +
    '</table></div>' +
    '<table class="tbl" style="margin-bottom:12px;"><thead><tr><th>Service</th><th>Duration</th><th>Price</th></tr></thead><tbody>' +
    svcList + '<tr style="border-top:2px solid var(--line);"><td colspan="2" style="font-weight:700;text-align:end">Total</td><td style="font-weight:800">' + fmtCurrency(total) + '</td></tr>' +
    '</tbody></table>' +
    (WIZ.notes ? '<div style="background:rgba(37,99,235,.06);border-radius:8px;padding:10px;font-size:12.5px;color:var(--muted);margin-bottom:10px;"><strong>Notes:</strong> ' + _esc(WIZ.notes) + '</div>' : '');
}

function wizNextStep() {
  if (WIZ.step === 1 && !WIZ.customer) { showToast('Select a customer first','⚠'); return; }
  if (WIZ.step === 2 && !WIZ.vehicle)  { showToast('Select a vehicle first','⚠'); return; }
  if (WIZ.step === 3) {
    var dateEl = document.getElementById('_wiz_date');
    if (dateEl) WIZ.date = dateEl.value;
    var timeEl = document.getElementById('_wiz_time');
    if (timeEl) WIZ.time = timeEl.value;
  }
  if (WIZ.step < 4) { WIZ.step++; _renderWizardStep(); }
}
function wizPrevStep() { if (WIZ.step > 1) { WIZ.step--; _renderWizardStep(); } }

function confirmBookingFull() {
  if (!WIZ.customer || !WIZ.vehicle) { showToast('Incomplete booking details','⚠'); return; }
  var allServices = DB.get('services');
  var selSvcs = allServices.filter(function(s){ return WIZ.services.indexOf(s.id)>=0; });
  var total = selSvcs.reduce(function(a,s){ return a+s.price; }, 0);
  var id = DB.nextId('B','bookings',3);
  DB.add('bookings', {
    id: id, customer: WIZ.customer, vehicle: WIZ.vehicle,
    services: selSvcs.map(function(s){ return s.name; }),
    date: WIZ.date, time: WIZ.time, bay: null, tech: WIZ.tech||null,
    status:'booked', price: total, notes: WIZ.notes,
  });
  DB.update('vehicles', WIZ.vehicle, { status:'booked' });
  DB.addTimeline(WIZ.vehicle, 'booking', 'Booking ' + id + ' confirmed · ' + WIZ.date, 'Reception');
  DB.addNotif('today','📅','New booking confirmed','Booking ' + id + ' · ' + WIZ.date + ' ' + WIZ.time,'calendar');
  closeBookingWizard();
  showToast('Booking ' + id + ' confirmed');
  renderCustomerGrid();
}

/* ═══════════════════════ WORK ORDER ACTIONS ═══════════════════════ */
function startJob(woId) {
  DB.update('workOrders', woId, { status:'in-service', startTime: _now() });
  var wo = DB.byId('workOrders', woId);
  if (wo) { DB.update('vehicles', wo.vehicle, { status:'in-service' }); DB.addTimeline(wo.vehicle,'service','Job started · ' + woId,'Tech'); }
  DB.addNotif('info','🔧','Job started — ' + woId,'Work order is now active','workorder');
  refreshDashboard();
  showToast('Job started — ' + woId);
}

function pauseJob(woId) {
  DB.update('workOrders', woId, { status:'paused' });
  var wo = DB.byId('workOrders', woId);
  if (wo) DB.addTimeline(wo.vehicle,'service','Job paused · ' + woId,'Tech');
  showToast('Job paused');
}

function moveToQC(woId) {
  DB.update('workOrders', woId, { status:'quality-check' });
  var wo = DB.byId('workOrders', woId);
  if (wo) {
    DB.update('vehicles', wo.vehicle, { status:'quality-check' });
    DB.addTimeline(wo.vehicle,'qc','Moved to Quality Check · ' + woId,'System');
    DB.addNotif('action','✅','QC required — ' + woId,'Vehicle ready for quality check','workorder');
  }
  refreshDashboard();
  showToast('Moved to Quality Check');
}

function markVehicleReady(woId) {
  DB.update('workOrders', woId, { status:'ready' });
  var wo = DB.byId('workOrders', woId);
  if (wo) {
    DB.update('vehicles', wo.vehicle, { status:'ready' });
    DB.addTimeline(wo.vehicle,'status','Vehicle marked ready for pickup','System');
    DB.addNotif('today','✅','Vehicle ready — notify customer','QC passed · ready for pickup','invoices');
  }
  refreshDashboard();
  showToast('Vehicle marked ready');
}

function closeJob(woId) {
  DB.update('workOrders', woId, { status:'complete' });
  var wo = DB.byId('workOrders', woId);
  if (wo) {
    DB.update('vehicles', wo.vehicle, { status:'delivered' });
    DB.update('vehicles', wo.vehicle, { quality: Math.min(100, (DB.byId('vehicles',wo.vehicle)||{quality:70}).quality + 5) });
    DB.addTimeline(wo.vehicle,'complete','Job closed · Vehicle record updated','System');
    // Create invoice if not exists
    if (!wo.invoiceId) {
      var invId = DB.nextINV();
      var inv = { id:invId, workOrder:woId, vehicle:wo.vehicle, customer:wo.customer,
        date:new Date().toISOString().slice(0,10), total:wo.total, status:'pending', method:null,
        items: wo.items.map(function(li){ return { name:li.name, total:li.total }; }) };
      DB.add('invoices', inv);
      DB.update('workOrders', woId, { invoiceId: invId });
      DB.addNotif('today','🧾','Invoice created — ' + invId,fmtCurrency(wo.total) + ' · ready to collect','invoices');
      showToast('Job closed · Invoice ' + invId + ' created');
    } else {
      showToast('Job closed · Vehicle record updated');
    }
  }
  renderInvoiceList();
  refreshDashboard();
}

function requestApproval(woId) {
  var wo = DB.byId('workOrders', woId);
  if (!wo) return;
  var estId = DB.nextEST();
  DB.add('estimates', {
    id: estId, workOrder: woId, vehicle: wo.vehicle, customer: wo.customer,
    status: 'pending', sentAt: _now(), openedAt: null, respondedAt: null,
    items: wo.items.map(function(li){ return { name:li.name, price:li.total, status:'pending' }; }),
  });
  DB.update('workOrders', woId, { status:'approval-pending' });
  DB.update('vehicles', wo.vehicle, { status:'approval-pending' });
  DB.addTimeline(wo.vehicle,'approval','Estimate ' + estId + ' sent to customer','System');
  DB.addNotif('action','📨','Approval sent — ' + estId,'Awaiting customer response','estimate');
  showToast('Approval request ' + estId + ' sent via WhatsApp');
}

function addItemToWO(woId) {
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Add Line Item</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="display:grid;gap:10px;margin-top:16px;">' +
    '<label class="form-label">Item Name<input class="form-input" id="_ai_name" placeholder="e.g. Spark plugs"/></label>' +
    '<label class="form-label">Quantity<input class="form-input" type="number" id="_ai_qty" value="1"/></label>' +
    '<label class="form-label">Unit Price (JOD)<input class="form-input" type="number" id="_ai_price" value="0" step="0.5"/></label>' +
    '</div>' +
    '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px;">' +
    '<button class="btn" onclick="closeQuickModal()">Cancel</button>' +
    '<button class="btn primary" onclick="WF._saveLineItem(\'' + woId + '\')">Add Item</button>' +
    '</div>'
  );
}

function _saveLineItem(woId) {
  var name  = document.getElementById('_ai_name');
  var qty   = document.getElementById('_ai_qty');
  var price = document.getElementById('_ai_price');
  if (!name || !name.value.trim()) { showToast('Name required','⚠'); return; }
  var unit  = parseFloat((price||{}).value)||0;
  var q     = parseFloat((qty||{}).value)||1;
  var wo = DB.byId('workOrders', woId);
  if (!wo) return;
  var items = wo.items || [];
  var newItem = { id:'LI'+Date.now(), name:name.value.trim(), qty:q, unit:unit, total:q*unit, approved:null };
  items.push(newItem);
  DB.update('workOrders', woId, { items:items, total:(wo.total||0)+newItem.total });
  // Reduce inventory if known SKU
  closeQuickModal();
  renderWODetail(woId);
  showToast('Line item added');
}

function assignTech(woId) {
  var techs = DB.get('technicians');
  var opts = techs.map(function(t){
    return '<option value="' + t.id + '">' + t.name + ' — ' + t.specialty + (t.status==='available'?' ✓':'') + '</option>';
  }).join('');
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Assign Technician</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<label class="form-label" style="margin-top:16px;">Technician<select class="form-input" id="_at_sel">' + opts + '</select></label>' +
    '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px;">' +
    '<button class="btn" onclick="closeQuickModal()">Cancel</button>' +
    '<button class="btn primary" onclick="WF._saveTechAssign(\'' + woId + '\')">Assign</button>' +
    '</div>'
  );
}

function _saveTechAssign(woId) {
  var sel = document.getElementById('_at_sel');
  if (!sel) return;
  var techId = sel.value;
  var tech = DB.byId('technicians', techId);
  if (!tech) return;
  DB.update('workOrders', woId, { tech: techId });
  var wo = DB.byId('workOrders', woId);
  if (wo) DB.addTimeline(wo.vehicle, 'assign', tech.name + ' assigned to ' + woId, 'Reception');
  closeQuickModal();
  showToast(tech.name + ' assigned to ' + woId);
}

function addNote(woId) {
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Add Note</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<label class="form-label" style="margin-top:16px;">Note Type<select class="form-input" id="_an_type">' +
    '<option value="customer">Customer-visible</option><option value="internal">Internal only</option></select></label>' +
    '<label class="form-label" style="margin-top:10px;">Note<textarea class="form-input" id="_an_text" rows="4" style="resize:none;"></textarea></label>' +
    '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px;">' +
    '<button class="btn" onclick="closeQuickModal()">Cancel</button>' +
    '<button class="btn primary" onclick="WF._saveNote(\'' + woId + '\')">Save Note</button>' +
    '</div>'
  );
}

function _saveNote(woId) {
  var text = document.getElementById('_an_text');
  var type = document.getElementById('_an_type');
  if (!text || !text.value.trim()) return;
  var wo = DB.byId('workOrders', woId);
  if (!wo) return;
  var field = (type && type.value==='internal') ? 'internalNotes' : 'notes';
  var existing = wo[field] || '';
  DB.update('workOrders', woId, { [field]: existing + (existing ? '\n' : '') + text.value.trim() });
  var veh = DB.byId('workOrders', woId);
  if (veh) DB.addTimeline(veh.vehicle,'note','Note added to ' + woId,'Rami A.');
  closeQuickModal();
  showToast('Note saved');
}

function addTechNote(woId) { addNote(woId); }

function renderWODetail(woId) {
  /* Re-render the line items table in the work order screen */
  var wo = DB.byId('workOrders', woId);
  if (!wo) return;
  var tbody = document.querySelector('#screen-workorder .tbl tbody');
  if (!tbody) return;
  var rows = wo.items.map(function(li) {
    var approvedLabel = li.approved===true?'<span class="pill good">✓</span>':li.approved===false?'<span class="pill bad">✕</span>':'<span class="pill warn">…</span>';
    return '<tr><td>' + _esc(li.name) + '</td><td>' + li.qty + '</td><td>' + li.unit + '</td><td>' + li.total + '</td><td>' + approvedLabel + '</td></tr>';
  });
  rows.push('<tr><td colspan="3" style="text-align:end;font-weight:700">Total</td><td style="font-weight:800">' + fmtCurrency(wo.total) + '</td><td></td></tr>');
  tbody.innerHTML = rows.join('');
}

/* ═══════════════════════ APPROVAL WORKFLOW ═══════════════════════ */
function simulateApproval(estId) {
  var est = DB.byId('estimates', estId);
  if (!est) return;
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Simulate Customer Response</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<p style="margin:12px 0 16px;color:var(--muted);font-size:13px;">Simulate what the customer does on their approval link.</p>' +
    '<div style="display:grid;gap:8px;">' +
    '<button class="btn primary" style="justify-content:center" onclick="WF._approveAll(\'' + estId + '\')">✓ Approve All Items</button>' +
    '<button class="btn" style="justify-content:center;border-color:var(--good);color:var(--good)" onclick="WF._approvePartial(\'' + estId + '\')">Approve Recommended Items Only</button>' +
    '<button class="btn" style="justify-content:center;border-color:var(--bad);color:var(--bad)" onclick="WF._declineAll(\'' + estId + '\')">✕ Decline All</button>' +
    '</div>'
  );
}

function _approveAll(estId) {
  var est = DB.byId('estimates', estId);
  if (!est) return;
  var items = est.items.map(function(i){ return Object.assign({},i,{status:'approved'}); });
  DB.update('estimates', estId, { items:items, status:'approved', respondedAt:_now() });
  DB.update('workOrders', est.workOrder, { status:'in-service' });
  DB.update('vehicles', est.vehicle, { status:'in-service' });
  DB.addTimeline(est.vehicle, 'approval', 'Customer approved all items — ' + estId, 'Customer');
  DB.addNotif('today','✅','All items approved — ' + estId,'Work can continue','workorder');
  closeQuickModal();
  _refreshEstimateScreen(estId);
  showToast('All items approved · Work order resumed');
  refreshDashboard();
}

function _approvePartial(estId) {
  var est = DB.byId('estimates', estId);
  if (!est) return;
  var items = est.items.map(function(i,idx){ return Object.assign({},i,{status:idx<2?'approved':'declined'}); });
  DB.update('estimates', estId, { items:items, status:'partial-approval', respondedAt:_now() });
  DB.update('workOrders', est.workOrder, { status:'partial-approval' });
  DB.addTimeline(est.vehicle, 'approval', 'Customer partially approved — ' + estId, 'Customer');
  DB.addNotif('today','⚠️','Partial approval — ' + estId,'Some items declined','workorder');
  closeQuickModal();
  _refreshEstimateScreen(estId);
  showToast('Partial approval recorded');
  refreshDashboard();
}

function _declineAll(estId) {
  var est = DB.byId('estimates', estId);
  if (!est) return;
  var items = est.items.map(function(i){ return Object.assign({},i,{status:'declined'}); });
  DB.update('estimates', estId, { items:items, status:'declined', respondedAt:_now() });
  DB.update('workOrders', est.workOrder, { status:'approval-declined' });
  DB.addTimeline(est.vehicle,'approval','Customer declined estimate — ' + estId,'Customer');
  DB.addNotif('action','❌','Estimate declined — ' + estId,'Contact customer','estimate');
  closeQuickModal();
  _refreshEstimateScreen(estId);
  showToast('Estimate declined by customer');
  refreshDashboard();
}

function _refreshEstimateScreen(estId) {
  var est = DB.byId('estimates', estId);
  if (!est) return;
  var list = document.querySelector('#screen-estimate .card .appr-row');
  if (!list) return;
  var parent = list.parentNode;
  // re-render approval rows
  var rows = est.items.map(function(item) {
    var pillClass = item.status==='approved'?'good':item.status==='declined'?'bad':'warn';
    var pillText  = item.status==='approved'?'Approved ✓':item.status==='declined'?'Declined ✕':'Pending …';
    return '<div class="appr-row"><div><strong>' + _esc(item.name) + '</strong></div>' +
      '<div style="font-weight:700;">' + fmtCurrency(item.price) + '</div>' +
      '<span class="pill ' + pillClass + '">' + pillText + '</span></div>';
  });
  var approved = est.items.filter(function(i){ return i.status==='approved'; }).reduce(function(a,i){ return a+i.price; },0);
  rows.push('<div class="appr-row" style="border-top:2px solid var(--line)"><div><strong>Approved total</strong></div>' +
    '<div style="font-weight:800;font-size:16px;">' + fmtCurrency(approved) + '</div><span></span></div>');
  // Clear and rebuild
  while (parent.querySelector('.appr-row')) parent.querySelector('.appr-row').remove();
  var titleEl = parent.querySelector('h3');
  rows.forEach(function(r) { parent.insertAdjacentHTML('beforeend', r); });

  // Add timeline event to the authorization timeline
  var evContainer = document.querySelector('#screen-estimate .events');
  if (evContainer && est.respondedAt) {
    var ev = document.createElement('div');
    ev.className = 'ev';
    ev.innerHTML = '<div class="dot">' + (est.status==='approved'?'✅':'⚠️') + '</div>' +
      '<div class="body"><div class="t">Customer responded · ' + est.status + '</div><div class="m">Digital response recorded</div></div>' +
      '<div class="when">' + est.respondedAt + '</div>';
    evContainer.appendChild(ev);
  }
}

/* ═══════════════════════ INVOICE & PAYMENT ═══════════════════════ */
function renderInvoiceList() {
  var table = document.querySelector('#screen-invoices .tbl');
  if (!table) return;
  var invoices = DB.get('invoices');
  var tbody = table.querySelector('tbody');
  if (!tbody) return;
  tbody.innerHTML = invoices.map(function(inv) {
    var cust = DB.byId('customers', inv.customer) || { name:'Unknown' };
    var veh  = DB.byId('vehicles', inv.vehicle)   || { make:'', model:'', plate:'—' };
    var stCls = inv.status==='paid'?'good':inv.status==='overdue'?'bad':'warn';
    return '<tr onclick="WF.openInvoice(\'' + inv.id + '\')" style="cursor:pointer;">' +
      '<td>' + inv.id + '</td>' +
      '<td>' + _esc(cust.name) + '</td>' +
      '<td>' + _esc(veh.make + ' ' + veh.model) + ' · ' + veh.plate + '</td>' +
      '<td>' + inv.date + '</td>' +
      '<td style="font-weight:700">' + fmtCurrency(inv.total) + '</td>' +
      '<td><span class="pill ' + stCls + '">' + inv.status + '</span></td>' +
      '<td>' + (inv.method||'—') + '</td>' +
      '<td>' +
      (inv.status!=='paid'?'<button class="btn sm primary" onclick="event.stopPropagation();WF.recordPayment(\'' + inv.id + '\')">Pay</button> ':'') +
      '<button class="btn sm" onclick="event.stopPropagation();WF.printInvoice(\'' + inv.id + '\')">Print</button>' +
      '</td></tr>';
  }).join('') || '<tr><td colspan="8" style="text-align:center;color:var(--muted);padding:24px;">No invoices</td></tr>';

  // Update count
  var countEl = document.querySelector('#screen-invoices .tbl-count');
  if (countEl) countEl.textContent = invoices.length + ' invoices';
}

function openInvoice(id) {
  var inv = DB.byId('invoices', id);
  if (!inv) return;
  var cust = DB.byId('customers', inv.customer) || { name:'—', phone:'—' };
  var veh  = DB.byId('vehicles',  inv.vehicle)  || { make:'—', model:'—', plate:'—' };
  var rows = (inv.items||[]).map(function(li){
    return '<tr><td>' + _esc(li.name) + '</td><td style="text-align:end;font-weight:600">' + fmtCurrency(li.total) + '</td></tr>';
  }).join('');
  var taxRate = DB.getSetting('taxRate') || 16;
  var tax  = inv.total * taxRate / 100;
  var paid = inv.status === 'paid';
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Invoice · ' + inv.id + '</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="display:flex;justify-content:space-between;margin:16px 0 12px;">' +
    '<div><div style="font-size:12px;color:var(--muted)">Customer</div><div style="font-weight:600">' + _esc(cust.name) + '</div><div style="font-size:12px;color:var(--muted)">' + _esc(cust.phone) + '</div></div>' +
    '<div style="text-align:end"><div style="font-size:12px;color:var(--muted)">Vehicle</div><div style="font-weight:600">' + _esc(veh.make + ' ' + veh.model) + '</div><div style="font-size:12px;color:var(--muted)">' + veh.plate + '</div></div>' +
    '</div>' +
    '<table style="width:100%;border-collapse:collapse;margin-bottom:12px;">' +
    '<thead><tr><th style="text-align:start;font-size:11px;padding:6px 0;border-bottom:1px solid var(--line)">Item</th>' +
    '<th style="text-align:end;font-size:11px;padding:6px 0;border-bottom:1px solid var(--line)">Amount</th></tr></thead>' +
    '<tbody>' + rows + '</tbody>' +
    '<tfoot><tr><td style="padding:8px 0;font-size:12px;color:var(--muted)">Tax (' + taxRate + '%)</td><td style="text-align:end;font-size:12px;color:var(--muted)">' + fmtCurrency(tax) + '</td></tr>' +
    '<tr style="border-top:2px solid var(--line)"><td style="padding:8px 0;font-weight:800;font-size:16px;">Total</td><td style="text-align:end;font-weight:800;font-size:16px;">' + fmtCurrency(inv.total) + '</td></tr>' +
    '</tfoot></table>' +
    '<div style="display:flex;gap:8px;justify-content:flex-end;">' +
    (paid ? '<span class="pill good" style="font-size:13px;">Paid ✓ · ' + (inv.method||'') + '</span>' :
      '<button class="btn primary" onclick="closeQuickModal();WF.recordPayment(\'' + id + '\')">Record Payment</button>') +
    '<button class="btn" onclick="WF.printInvoice(\'' + id + '\')">Print</button>' +
    '</div>'
  );
}

function recordPayment(invId) {
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Record Payment · ' + invId + '</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="display:grid;gap:10px;margin-top:16px;">' +
    '<label class="form-label">Payment Method<select class="form-input" id="_pm_method">' +
    '<option value="cash">Cash</option><option value="card">Card</option>' +
    '<option value="mada">mada</option><option value="bank">Bank Transfer</option>' +
    '</select></label>' +
    '<label class="form-label">Amount Collected (JOD)<input class="form-input" type="number" id="_pm_amount" step="0.5"/></label>' +
    '</div>' +
    '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px;">' +
    '<button class="btn" onclick="closeQuickModal()">Cancel</button>' +
    '<button class="btn primary" onclick="WF._savePayment(\'' + invId + '\')">Confirm Payment</button>' +
    '</div>'
  );
  // Pre-fill amount
  var inv = DB.byId('invoices', invId);
  setTimeout(function() {
    var amt = document.getElementById('_pm_amount');
    if (amt && inv) amt.value = inv.total;
  }, 50);
}

function _savePayment(invId) {
  var method = document.getElementById('_pm_method');
  DB.update('invoices', invId, { status:'paid', method:(method?method.value:'cash') });
  var inv = DB.byId('invoices', invId);
  if (inv) {
    DB.addTimeline(inv.vehicle,'payment','Payment recorded · ' + invId + ' · ' + (method?method.value:''),'Reception');
    DB.addNotif('info','💳','Payment received — ' + invId,fmtCurrency(inv.total),'invoices');
  }
  closeQuickModal();
  renderInvoiceList();
  showToast('Payment recorded · ' + invId);
}

function printInvoice(invId) {
  showToast('Opening print view for ' + invId + ' (concept)');
}

function createInvoiceFromWO(woId) {
  var wo = DB.byId('workOrders', woId);
  if (!wo) return;
  if (wo.invoiceId) { showToast('Invoice ' + wo.invoiceId + ' already exists'); renderInvoiceList(); go('invoices'); return; }
  var invId = DB.nextINV();
  DB.add('invoices', {
    id:invId, workOrder:woId, vehicle:wo.vehicle, customer:wo.customer,
    date:new Date().toISOString().slice(0,10), total:wo.total, status:'pending', method:null,
    items:wo.items.map(function(li){ return {name:li.name,total:li.total}; }),
  });
  DB.update('workOrders', woId, { invoiceId:invId });
  DB.addTimeline(wo.vehicle,'invoice','Invoice ' + invId + ' created · ' + fmtCurrency(wo.total),'System');
  renderInvoiceList();
  go('invoices');
  showToast('Invoice ' + invId + ' created');
}

/* ═══════════════════════ NOTIFY CUSTOMER ═══════════════════════ */
function notifyCustomer(vehicleId, context) {
  var veh  = DB.byId('vehicles', vehicleId);
  var cust = veh ? DB.byId('customers', veh.owner) : null;
  if (!cust) { showToast('No customer on file','⚠'); return; }
  context = context || 'Your vehicle is ready for pickup.';
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Notify Customer</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="margin:14px 0;"><div style="font-weight:600">' + _esc(cust.name) + '</div>' +
    '<div style="font-size:12px;color:var(--muted)">' + cust.phone + '</div></div>' +
    '<div style="background:rgba(37,99,235,.06);border-radius:10px;padding:12px;margin-bottom:12px;">' +
    '<div style="font-size:11px;color:var(--muted);margin-bottom:4px;">WhatsApp Message Preview</div>' +
    '<div style="font-size:13px;">' + _esc(context) + '</div></div>' +
    '<div style="display:flex;gap:8px;justify-content:flex-end;">' +
    '<button class="btn" onclick="closeQuickModal()">Cancel</button>' +
    '<button class="btn primary" onclick="WF._sendNotification(\'' + vehicleId + '\',\'' + cust.id + '\')">Send via WhatsApp</button>' +
    '</div>'
  );
}

function _sendNotification(vehicleId, custId) {
  DB.addTimeline(vehicleId, 'notify', 'Customer notified via WhatsApp', 'System');
  DB.addNotif('info','📱','WhatsApp sent','Customer notification delivered','customers');
  closeQuickModal();
  showToast('WhatsApp message sent');
}

function contactCustomer(name, phone) {
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Contact ' + _esc(name) + '</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="display:grid;gap:10px;margin:16px 0;">' +
    '<div style="font-size:12px;color:var(--muted)">Phone: ' + _esc(phone) + '</div>' +
    '<button class="btn" onclick="closeQuickModal();WF.simulateWhatsApp(\'' + name + '\',\'' + phone + '\')"><span style="margin-inline-end:6px;">💬</span> WhatsApp</button>' +
    '<button class="btn" onclick="closeQuickModal();showToast(\'Calling ' + _esc(name) + ' (concept)\')"><span style="margin-inline-end:6px;">📞</span> Call</button>' +
    '<button class="btn" onclick="closeQuickModal();showToast(\'Email sent to ' + _esc(name) + ' (concept)\')"><span style="margin-inline-end:6px;">📧</span> Email</button>' +
    '</div>' +
    '<button class="btn" onclick="closeQuickModal()">Close</button>'
  );
}

function simulateWhatsApp(name, phone) {
  DB.addNotif('info','📱','WhatsApp sent to ' + name,'Message delivered','customers');
  showToast('WhatsApp sent to ' + name);
}

/* ═══════════════════════ INVENTORY ═══════════════════════════════ */
function renderInventory() {
  var table = document.querySelector('#screen-inventory .tbl');
  if (!table) return;
  var items = DB.get('inventory');
  var tbody = table.querySelector('tbody') || table;
  var rows = items.map(function(item) {
    var low  = item.stock <= item.min;
    var stCls = low ? 'bad' : item.stock <= item.min * 2 ? 'warn' : 'good';
    return '<tr>' +
      '<td style="font-weight:600">' + _esc(item.name) + '</td>' +
      '<td>' + item.sku + '</td>' +
      '<td>' + item.cat + '</td>' +
      '<td><span class="pill ' + stCls + '">' + item.stock + '</span></td>' +
      '<td>' + item.min + '</td>' +
      '<td>' + fmtCurrency(item.price) + '</td>' +
      '<td>' + _esc(item.supplier) + '</td>' +
      '<td>' +
      '<button class="btn sm" onclick="WF.adjustStock(\'' + item.id + '\')">Adjust</button> ' +
      (low ? '<button class="btn sm primary" onclick="WF.reorderPart(\'' + item.id + '\')">Reorder</button>' : '') +
      '</td></tr>';
  }).join('') || '<tr><td colspan="8" style="text-align:center;color:var(--muted);padding:24px;">No inventory items</td></tr>';
  if (tbody.tagName === 'TBODY') tbody.innerHTML = rows;
}

function adjustStock(partId) {
  var part = DB.byId('inventory', partId);
  if (!part) return;
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Adjust Stock · ' + _esc(part.name) + '</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="margin:16px 0;">' +
    '<div style="font-size:13px;color:var(--muted);margin-bottom:12px;">Current stock: <strong>' + part.stock + '</strong> units</div>' +
    '<label class="form-label">Adjustment (use - to reduce)<input class="form-input" type="number" id="_as_qty" value="0"/></label>' +
    '<label class="form-label" style="margin-top:10px;">Reason<select class="form-input" id="_as_reason">' +
    '<option>Purchase received</option><option>Used in work order</option><option>Damaged / write-off</option><option>Count correction</option>' +
    '</select></label>' +
    '</div>' +
    '<div style="display:flex;gap:10px;justify-content:flex-end;">' +
    '<button class="btn" onclick="closeQuickModal()">Cancel</button>' +
    '<button class="btn primary" onclick="WF._saveStockAdj(\'' + partId + '\')">Save Adjustment</button>' +
    '</div>'
  );
}

function _saveStockAdj(partId) {
  var adj = parseInt((document.getElementById('_as_qty')||{}).value) || 0;
  var part = DB.byId('inventory', partId);
  if (!part) return;
  var newStock = Math.max(0, part.stock + adj);
  DB.update('inventory', partId, { stock: newStock });
  closeQuickModal();
  renderInventory();
  showToast((adj>=0?'+':'') + adj + ' · new stock: ' + newStock);
  if (newStock <= part.min) {
    DB.addNotif('action','📦','Low stock — ' + part.name, newStock + ' units remaining · reorder threshold ' + part.min,'inventory');
    refreshNotifBadge();
  }
}

function reorderPart(partId) {
  var part = DB.byId('inventory', partId);
  if (!part) return;
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Reorder Request</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="margin:16px 0;">' +
    '<div style="font-size:13px;font-weight:600;margin-bottom:4px;">' + _esc(part.name) + '</div>' +
    '<div style="font-size:12px;color:var(--muted);margin-bottom:12px;">Supplier: ' + _esc(part.supplier) + '</div>' +
    '<label class="form-label">Quantity to Order<input class="form-input" type="number" id="_ro_qty" value="10"/></label>' +
    '</div>' +
    '<div style="display:flex;gap:10px;justify-content:flex-end;">' +
    '<button class="btn" onclick="closeQuickModal()">Cancel</button>' +
    '<button class="btn primary" onclick="WF._saveReorder(\'' + partId + '\')">Send Reorder Request</button>' +
    '</div>'
  );
}

function _saveReorder(partId) {
  var qty = parseInt((document.getElementById('_ro_qty')||{}).value)||10;
  var part = DB.byId('inventory', partId);
  if (!part) return;
  closeQuickModal();
  DB.addNotif('info','📦','Reorder sent — ' + part.name, qty + ' units ordered from ' + part.supplier,'inventory');
  renderInventory();
  showToast('Reorder sent: ' + qty + ' × ' + part.name + ' from ' + part.supplier);
}

function addInventoryItem() {
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Add Inventory Item</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="display:grid;gap:10px;margin-top:16px;">' +
    '<label class="form-label">SKU<input class="form-input" id="_ni_sku"/></label>' +
    '<label class="form-label">Name<input class="form-input" id="_ni_name"/></label>' +
    '<label class="form-label">Category<select class="form-input" id="_ni_cat"><option>Brakes</option><option>Fluids</option><option>Filters</option><option>Tyres</option><option>Electrical</option><option>Services</option></select></label>' +
    '<label class="form-label">Stock<input class="form-input" type="number" id="_ni_stock" value="0"/></label>' +
    '<label class="form-label">Min Threshold<input class="form-input" type="number" id="_ni_min" value="2"/></label>' +
    '<label class="form-label">Price (JOD)<input class="form-input" type="number" id="_ni_price" step="0.5" value="0"/></label>' +
    '<label class="form-label">Supplier<input class="form-input" id="_ni_sup"/></label>' +
    '</div>' +
    '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px;">' +
    '<button class="btn" onclick="closeQuickModal()">Cancel</button>' +
    '<button class="btn primary" onclick="WF._saveNewPart()">Add Item</button>' +
    '</div>'
  );
}

function _saveNewPart() {
  var f = function(id){ var el=document.getElementById(id); return el?el.value.trim():''; };
  if (!f('_ni_name')) { showToast('Name required','⚠'); return; }
  DB.add('inventory', {
    id: DB.nextId('P','inventory',3),
    sku: f('_ni_sku') || 'PART-' + Date.now(),
    name: f('_ni_name'), cat: f('_ni_cat') || 'General',
    stock: parseInt(f('_ni_stock'))||0, min: parseInt(f('_ni_min'))||2,
    price: parseFloat(f('_ni_price'))||0, cost:0, supplier: f('_ni_sup'),
  });
  closeQuickModal();
  renderInventory();
  showToast('Inventory item added');
}

/* ═══════════════════════ TEAM & BAYS ═══════════════════════════ */
function renderTeam() {
  var container = document.querySelector('#screen-team');
  if (!container) return;
  var techs = DB.get('technicians');
  var bays  = DB.get('bays');
  // Update tech cards
  var grid = container.querySelector('.team-grid');
  if (grid) {
    grid.innerHTML = techs.map(function(t) {
      var stCls = t.status==='available'?'good':'warn';
      return '<div class="card" style="cursor:default;">' +
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">' +
        '<div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent-2));' +
        'display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;flex:none;">' + t.name.charAt(0) + '</div>' +
        '<div><div style="font-weight:700">' + _esc(t.name) + '</div><div style="font-size:12px;color:var(--muted)">' + _esc(t.role) + '</div></div>' +
        '<span class="pill ' + stCls + '" style="margin-inline-start:auto;">' + t.status + '</span>' +
        '</div>' +
        '<div style="font-size:12px;color:var(--muted);margin-bottom:8px;">' + _esc(t.specialty) + (t.bay?' · '+t.bay:'') + '</div>' +
        '<div class="bar"><i style="width:' + t.utilization + '%;background:var(--accent)"></i></div>' +
        '<div style="font-size:11px;color:var(--muted);margin-top:4px;">Utilization: ' + t.utilization + '%</div>' +
        '</div>';
    }).join('');
  }
  // Update bay list
  var bayList = container.querySelector('.bay-list');
  if (bayList) {
    bayList.innerHTML = bays.map(function(b) {
      var veh = b.vehicle ? DB.byId('vehicles', b.vehicle) : null;
      var stCls = b.status==='available'?'good':'warn';
      return '<div class="card" style="display:flex;align-items:center;gap:14px;margin-bottom:8px;">' +
        '<div style="font-size:22px;">' + (b.type==='Lift'?'🔧':b.type==='Tyres'?'🔄':b.type==='QC'?'✅':'🔩') + '</div>' +
        '<div><div style="font-weight:700">' + _esc(b.name) + '</div>' +
        '<div style="font-size:12px;color:var(--muted)">' + b.type + (veh?' · '+veh.make+' '+veh.model:'') + '</div></div>' +
        '<span class="pill ' + stCls + '" style="margin-inline-start:auto;">' + b.status + '</span>' +
        '</div>';
    }).join('');
  }
}

/* ═══════════════════════ INTAKE WORKFLOW ═══════════════════════ */
var INTAKE_STEP = 1;
var INTAKE_VEH  = null;
var INTAKE_DATA = { mileage:'', fuel:50, condition:{}, photos:{}, notes:'' };

function startIntakeForVehicle(vehicleId) {
  INTAKE_VEH  = vehicleId;
  INTAKE_STEP = 1;
  INTAKE_DATA = { mileage:'', fuel:50, condition:{}, photos:{}, notes:'' };
  var v = DB.byId('vehicles', vehicleId);
  if (v) INTAKE_DATA.mileage = v.mileage;
  go('intake');
  renderIntakeStep();
}

function renderIntakeStep() {
  var body = document.getElementById('stepBody');
  if (!body) return;
  var steps = ['Confirm Vehicle','Mileage & Fuel','Condition','Photos','Notes','Confirm'];
  // Update step indicator
  var stepInds = document.querySelectorAll('.step-dot, .step-ind-dot');
  stepInds.forEach(function(dot, i) {
    dot.classList.toggle('active', i === INTAKE_STEP - 1);
    dot.classList.toggle('done',   i < INTAKE_STEP - 1);
  });
  var stepTitle = document.querySelector('.step-title, #stepTitle');
  if (stepTitle) stepTitle.textContent = steps[INTAKE_STEP - 1] || '';

  if (INTAKE_STEP === 1) _intakeStep1(body);
  else if (INTAKE_STEP === 2) _intakeStep2(body);
  else if (INTAKE_STEP === 3) _intakeStep3(body);
  else if (INTAKE_STEP === 4) _intakeStep4(body);
  else if (INTAKE_STEP === 5) _intakeStep5(body);
  else if (INTAKE_STEP === 6) _intakeStep6(body);
}

function _intakeStep1(body) {
  var vehicles = DB.get('vehicles').filter(function(v){ return v.status !== 'delivered'; });
  var opts = vehicles.map(function(v) {
    var cust = DB.byId('customers', v.owner) || { name:'—' };
    return '<div onclick="WF._selectIntakeVehicle(\'' + v.id + '\')" style="' +
      'padding:10px 12px;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;' +
      'border:1.5px solid ' + (INTAKE_VEH===v.id?'var(--accent-2)':'var(--line)') + ';margin-bottom:6px;">' +
      '<div><div style="font-weight:600">' + _esc(v.make + ' ' + v.model + ' ' + v.year) + '</div>' +
      '<div style="font-size:11.5px;color:var(--muted)">' + _esc(cust.name) + ' · ' + v.plate + '</div></div>' +
      '<span class="pill">' + v.status + '</span></div>';
  }).join('');
  body.innerHTML = '<h3 style="margin:0 0 14px;font-size:15px;">Select Vehicle to Check In</h3>' +
    '<input class="form-input" placeholder="Search vehicle or customer…" oninput="WF._filterIntakeVehicles(this.value)" style="margin-bottom:12px;"/>' +
    '<div id="_intake_vehs">' + opts + '</div>';
}

function _filterIntakeVehicles(q) {
  q = q.toLowerCase();
  var vehicles = DB.get('vehicles').filter(function(v){ return v.status !== 'delivered'; });
  var filtered = vehicles.filter(function(v) {
    var cust = DB.byId('customers', v.owner) || { name:'' };
    return !q || v.make.toLowerCase().includes(q) || v.model.toLowerCase().includes(q) ||
      v.plate.toLowerCase().includes(q) || cust.name.toLowerCase().includes(q);
  });
  var container = document.getElementById('_intake_vehs');
  if (!container) return;
  container.innerHTML = filtered.map(function(v) {
    var cust = DB.byId('customers', v.owner) || { name:'—' };
    return '<div onclick="WF._selectIntakeVehicle(\'' + v.id + '\')" style="' +
      'padding:10px 12px;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;' +
      'border:1.5px solid ' + (INTAKE_VEH===v.id?'var(--accent-2)':'var(--line)') + ';margin-bottom:6px;">' +
      '<div><div style="font-weight:600">' + _esc(v.make + ' ' + v.model + ' ' + v.year) + '</div>' +
      '<div style="font-size:11.5px;color:var(--muted)">' + _esc(cust.name) + ' · ' + v.plate + '</div></div>' +
      '<span class="pill">' + v.status + '</span></div>';
  }).join('');
}

function _selectIntakeVehicle(id) { INTAKE_VEH = id; _intakeStep1(document.getElementById('stepBody')); }

function _intakeStep2(body) {
  body.innerHTML = '<h3 style="margin:0 0 16px;font-size:15px;">Mileage & Fuel Level</h3>' +
    '<label class="form-label">Mileage at Check-In (km)<input class="form-input" type="number" id="_i2_mil" value="' + (INTAKE_DATA.mileage||'') + '" oninput="INTAKE_DATA.mileage=this.value"/></label>' +
    '<label class="form-label" style="margin-top:14px;">Fuel Level<div style="display:flex;align-items:center;gap:12px;margin-top:6px;">' +
    '<span style="font-size:20px;">⛽</span>' +
    '<input type="range" min="0" max="100" value="' + INTAKE_DATA.fuel + '" style="flex:1;" oninput="INTAKE_DATA.fuel=parseInt(this.value);document.getElementById(\'_i2_fuel_v\').textContent=this.value+\'%\'"/>' +
    '<span id="_i2_fuel_v" style="font-weight:700;min-width:40px;">' + INTAKE_DATA.fuel + '%</span>' +
    '</div></label>';
}

function _intakeStep3(body) {
  var conditions = [
    'Front bumper scratch', 'Rear bumper dent', 'Left door ding',
    'Right door scratch', 'Hood dent', 'Windscreen chip', 'Interior worn',
  ];
  var opts = conditions.map(function(c) {
    var checked = INTAKE_DATA.condition[c];
    return '<label style="display:flex;align-items:center;gap:8px;padding:8px 0;cursor:pointer;">' +
      '<input type="checkbox" ' + (checked?'checked':'') + ' onchange="INTAKE_DATA.condition[\'' + c.replace(/'/g,"\\'") + '\']=this.checked" style="accent-color:var(--accent-2)"/>' +
      _esc(c) + '</label>';
  }).join('');
  body.innerHTML = '<h3 style="margin:0 0 12px;font-size:15px;">Record Visible Condition</h3>' +
    '<p style="font-size:12.5px;color:var(--muted);margin-bottom:12px;">Check any pre-existing damage observed during check-in.</p>' + opts;
}

function _intakeStep4(body) {
  var required = ['Front','Rear','Left Side','Right Side','Interior','Dashboard','Mileage'];
  var items = required.map(function(cat) {
    var has = INTAKE_DATA.photos[cat];
    return '<div style="border:1.5px ' + (has?'solid var(--good)':'dashed rgba(37,99,235,.25)') + ';border-radius:10px;' +
      'padding:16px;text-align:center;cursor:pointer;transition:all .15s;" onclick="WF._addPhoto(\'' + cat + '\')">' +
      '<div style="font-size:22px;margin-bottom:4px;">' + (has?'✅':'📷') + '</div>' +
      '<div style="font-size:12px;font-weight:600;">' + cat + '</div>' +
      '<div style="font-size:11px;color:var(--muted);">' + (has?'Captured':'Tap to add') + '</div>' +
      '</div>';
  }).join('');
  var done = required.filter(function(c){ return INTAKE_DATA.photos[c]; }).length;
  body.innerHTML = '<h3 style="margin:0 0 4px;font-size:15px;">Capture Required Photos</h3>' +
    '<div style="font-size:12px;color:var(--muted);margin-bottom:14px;">' + done + ' of ' + required.length + ' captured</div>' +
    '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px;">' + items + '</div>' +
    (done < required.length ? '<div style="margin-top:12px;font-size:12px;color:var(--warn);"><strong>⚠ Missing required photos. You can continue but completion is required before service.</strong></div>' : '');
}

function _addPhoto(cat) {
  INTAKE_DATA.photos[cat] = true;
  _intakeStep4(document.getElementById('stepBody'));
  showToast(cat + ' photo added');
}

function _intakeStep5(body) {
  body.innerHTML = '<h3 style="margin:0 0 12px;font-size:15px;">Customer Notes</h3>' +
    '<textarea class="form-input" rows="5" placeholder="Customer concerns, special instructions, items left in vehicle…" style="resize:none;width:100%;" oninput="INTAKE_DATA.notes=this.value">' + _esc(INTAKE_DATA.notes) + '</textarea>' +
    '<label style="display:flex;align-items:center;gap:8px;margin-top:12px;cursor:pointer;">' +
    '<input type="checkbox" style="accent-color:var(--accent-2)"/> Customer authorises inspection</label>';
}

function _intakeStep6(body) {
  var veh  = INTAKE_VEH  ? DB.byId('vehicles',  INTAKE_VEH)  : null;
  var cust = veh ? DB.byId('customers', veh.owner) : null;
  var condList = Object.keys(INTAKE_DATA.condition).filter(function(k){ return INTAKE_DATA.condition[k]; });
  var photoList = Object.keys(INTAKE_DATA.photos).filter(function(k){ return INTAKE_DATA.photos[k]; });
  body.innerHTML = '<h3 style="margin:0 0 14px;font-size:15px;">Confirm Check-In</h3>' +
    '<div class="card" style="margin-bottom:12px;">' +
    '<table class="tbl">' +
    '<tr><td>Vehicle</td><td>' + (veh?_esc(veh.make+' '+veh.model+' '+veh.year):'—') + '</td></tr>' +
    '<tr><td>Plate</td><td>' + (veh?veh.plate:'—') + '</td></tr>' +
    '<tr><td>Customer</td><td>' + (cust?_esc(cust.name):'—') + '</td></tr>' +
    '<tr><td>Mileage</td><td>' + (INTAKE_DATA.mileage||'—') + ' km</td></tr>' +
    '<tr><td>Fuel</td><td>' + INTAKE_DATA.fuel + '%</td></tr>' +
    '<tr><td>Pre-existing damage</td><td>' + (condList.length ? condList.join(', ') : 'None noted') + '</td></tr>' +
    '<tr><td>Photos captured</td><td>' + photoList.length + ' of 7</td></tr>' +
    '</table></div>' +
    (INTAKE_DATA.notes ? '<div style="background:rgba(37,99,235,.06);border-radius:8px;padding:10px;font-size:12.5px;margin-bottom:12px;"><strong>Notes:</strong> ' + _esc(INTAKE_DATA.notes) + '</div>' : '') +
    '<div style="color:var(--muted);font-size:12px;">By confirming, you record this check-in to the Vehicle Record.</div>';
}

function intakeNext() {
  if (INTAKE_STEP === 1 && !INTAKE_VEH) { showToast('Select a vehicle first','⚠'); return; }
  if (INTAKE_STEP < 6) { INTAKE_STEP++; renderIntakeStep(); }
}

function intakePrev() { if (INTAKE_STEP > 1) { INTAKE_STEP--; renderIntakeStep(); } }

function confirmIntake() {
  if (!INTAKE_VEH) { showToast('No vehicle selected','⚠'); return; }
  var veh = DB.byId('vehicles', INTAKE_VEH);
  if (!veh) return;
  DB.update('vehicles', INTAKE_VEH, { status:'checked-in', mileage:parseInt(INTAKE_DATA.mileage)||veh.mileage });
  DB.addTimeline(INTAKE_VEH, 'checkin', 'Vehicle checked in · ' + parseInt(INTAKE_DATA.mileage||veh.mileage).toLocaleString() + ' km · ' + Object.keys(INTAKE_DATA.photos).filter(function(k){ return INTAKE_DATA.photos[k]; }).length + ' photos', 'Reception');
  DB.addNotif('today','✅','Check-in complete — ' + veh.plate,'Vehicle is in the system','workorder');

  // Create work order if not exists
  var existing = DB.get('workOrders').find(function(wo){ return wo.vehicle===INTAKE_VEH && wo.status!=='complete'; });
  if (!existing) {
    var woId = DB.nextWO();
    DB.add('workOrders', {
      id:woId, vehicle:INTAKE_VEH, customer:veh.owner, tech:null, bay:null,
      status:'checked-in', startTime:null, promisedTime:null, priority:'normal',
      items:[], photos:Object.keys(INTAKE_DATA.photos), notes:INTAKE_DATA.notes,
      internalNotes:'', total:0, invoiceId:null,
    });
    showToast('Check-in complete · Work order ' + woId + ' created');
  } else {
    showToast('Check-in saved');
  }
  refreshDashboard();
  renderCustomerGrid();
  go('dashboard');
}

/* ═══════════════════════ DASHBOARD REFRESH ═══════════════════════ */
function refreshDashboard() {
  /* Update notification badge */
  refreshNotifBadge();
  /* Update stat cards if visible */
  var totInv = DB.get('invoices').filter(function(i){ return i.status==='paid'; }).reduce(function(a,i){ return a+i.total; },0);
  var el = document.querySelector('[data-stat="revenue"]');
  if (el) el.textContent = fmtCurrency(totInv);
}

/* ═══════════════════════ SEARCH ENHANCEMENT ═══════════════════════ */
function buildSearchIndex() {
  var results = [];
  DB.get('customers').forEach(function(c) {
    results.push({ type:'Customer', label:c.name, sub:c.phone, action:'WF.openCustomerProfile("'+c.id+'")' });
  });
  DB.get('vehicles').forEach(function(v) {
    var cust = DB.byId('customers', v.owner) || { name:'' };
    results.push({ type:'Vehicle', label:v.make + ' ' + v.model + ' ' + v.year, sub:v.plate + ' · ' + cust.name, action:'WF.openVehicleById("'+v.id+'")' });
  });
  DB.get('workOrders').forEach(function(wo) {
    results.push({ type:'Work Order', label:wo.id, sub:(DB.byId('vehicles',wo.vehicle)||{make:'',model:''}).make + ' ' + (DB.byId('vehicles',wo.vehicle)||{model:''}).model + ' · ' + wo.status, action:'go("workorder")' });
  });
  DB.get('invoices').forEach(function(inv) {
    results.push({ type:'Invoice', label:inv.id, sub:fmtCurrency(inv.total) + ' · ' + inv.status, action:'WF.openInvoice("'+inv.id+'")' });
  });
  return results;
}

function openCustomerProfile(custId) {
  var cust = DB.byId('customers', custId);
  if (!cust) return;
  var vehs = (cust.vehicles||[]).map(function(vid){ return DB.byId('vehicles',vid); }).filter(Boolean);
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">' + _esc(cust.name) + '</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:16px 0;">' +
    '<div style="font-size:12.5px;color:var(--muted);">Phone<br><strong style="color:var(--ink);">' + _esc(cust.phone) + '</strong></div>' +
    '<div style="font-size:12.5px;color:var(--muted);">Email<br><strong style="color:var(--ink);">' + _esc(cust.email||'—') + '</strong></div>' +
    '<div style="font-size:12.5px;color:var(--muted);">Membership<br><span class="pill blue">' + _esc(cust.membership) + '</span></div>' +
    '<div style="font-size:12.5px;color:var(--muted);">Loyalty<br><strong style="color:var(--ink);">' + (cust.points||0) + ' pts</strong></div>' +
    '</div>' +
    '<div style="font-size:12px;font-weight:700;letter-spacing:.04em;color:var(--muted);text-transform:uppercase;margin-bottom:8px;">Vehicles (' + vehs.length + ')</div>' +
    vehs.map(function(v){
      return '<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--line);">' +
        '<span>🚗</span><div><div style="font-weight:600;font-size:13px">' + _esc(v.make+' '+v.model+' '+v.year) + '</div>' +
        '<div style="font-size:11.5px;color:var(--muted)">' + v.plate + '</div></div>' +
        '<button class="btn sm" style="margin-inline-start:auto;" onclick="closeQuickModal();WF.openVehicleById(\'' + v.id + '\')">Open</button></div>';
    }).join('') +
    '<div style="display:flex;gap:8px;margin-top:16px;">' +
    '<button class="btn" onclick="WF.contactCustomer(\'' + _esc(cust.name) + '\',\'' + _esc(cust.phone) + '\')">Contact</button>' +
    '<button class="btn primary" onclick="closeQuickModal();WF.startBookingForVehicle(null)">New Booking</button>' +
    '</div>'
  );
}

/* ═══════════════════════ DEMO CONTROLS ═══════════════════════════ */
function resetDemoData() {
  _confirm('Reset all demo data to factory defaults? This will undo all changes made in this session.', function() {
    DB.reset();
    renderCustomerGrid();
    renderInvoiceList();
    renderInventory();
    refreshNotifBadge();
    showToast('Demo data reset to defaults');
  }, 'Reset Demo Data');
}

function loadSampleDay() {
  DB.addNotif('action','📅','New incoming booking','Ahmed Mansour · Toyota Camry · 10:30','calendar');
  DB.addNotif('today','⏰','Bay 2 available in 20 min','Khalid completing alignment','team');
  showToast('Sample workshop day loaded · 2 new events added');
  refreshNotifBadge();
}

function simulateIncomingBooking() {
  DB.addNotif('action','📅','New online booking','Sara Ibrahim · Honda Civic 2021 · 14:00','calendar');
  refreshNotifBadge();
  showToast('New booking arrived · Sara Ibrahim · 14:00');
}

function simulateApprovalResponse() {
  var ests = DB.get('estimates').filter(function(e){ return e.status==='pending'||e.status==='partial-approval'; });
  if (!ests.length) { showToast('No pending estimates','⚠'); return; }
  _approvePartial(ests[0].id);
}

function simulateLowStock() {
  var parts = DB.get('inventory');
  if (!parts.length) return;
  var part = parts[0];
  DB.update('inventory', part.id, { stock: 1 });
  DB.addNotif('action','📦','Critical low stock — ' + part.name,'1 unit remaining · reorder now','inventory');
  refreshNotifBadge();
  showToast('Low stock alert triggered for ' + part.name);
}

function simulateVehicleReady() {
  DB.addNotif('today','✅','Vehicle ready — Nissan Patrol','Saeed Al-Otaibi · Bay 1 complete','invoices');
  refreshNotifBadge();
  showToast('Vehicle ready notification generated');
}

function simulateOffline() {
  if (typeof setSync === 'function') setSync('offline');
  showToast('Simulating offline mode');
}

function restoreOnline() {
  if (typeof setSync === 'function') setSync('online');
  showToast('Online mode restored');
}

/* ═══════════════════════ SETTINGS SCREEN ═══════════════════════ */
function renderSettings() {
  var s = DB.getSetting;
  document.querySelectorAll('[data-setting]').forEach(function(el) {
    var key = el.getAttribute('data-setting');
    var val = DB.getSetting(key);
    if (val !== undefined) el.value = val;
  });
}

function saveSettings() {
  document.querySelectorAll('[data-setting]').forEach(function(el) {
    var key = el.getAttribute('data-setting');
    if (key) DB.setSetting(key, el.value);
  });
  showToast('Settings saved');
}

/* ═══════════════════════ REPORTS ════════════════════════════════ */
function renderReports() {
  var invoices = DB.get('invoices');
  var paid = invoices.filter(function(i){ return i.status==='paid'; });
  var revenue = paid.reduce(function(a,i){ return a+i.total; }, 0);
  var bookings = DB.get('bookings');
  var wos = DB.get('workOrders');
  var complete = wos.filter(function(w){ return w.status==='complete'; });

  var statEls = {
    'rep-revenue': fmtCurrency(revenue),
    'rep-bookings': bookings.length,
    'rep-complete': complete.length,
    'rep-invoices': invoices.length,
  };
  Object.keys(statEls).forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.textContent = statEls[id];
  });
}

/* ═══════════════════════ NOTIFICATION PANEL ACTIONS ════════════ */
function openNotif(id) {
  DB.markRead(id);
  var notif = DB.byId('notifications', id);
  if (notif && notif.link) {
    toggleNotifPanel();
    go(notif.link);
  }
  refreshNotifBadge();
  renderNotifPanel();
}

function markAllRead() {
  DB.markAllRead();
  refreshNotifBadge();
  renderNotifPanel();
}

/* ═══════════════════════ INIT ══════════════════════════════════ */
/* _wfInit is called by boot.js/_appReady after dynamic loading.
   DOMContentLoaded already fired by then, so we expose this directly. */
window._wfInit = function () {
  _initNotifBadge();
  refreshNotifBadge();
  renderNotifPanel();
  /* Only render screens that are already in the DOM */
  if (document.getElementById('screen-customers')) renderCustomerGrid();
  if (document.getElementById('screen-invoices')) renderInvoiceList();
  if (document.getElementById('screen-inventory')) renderInventory();
  if (document.getElementById('screen-settings')) renderSettings();
  refreshDashboard();

  document.addEventListener('db:change', function(e) {
    if (!e.detail) return;
    var col = e.detail.col;
    if (col === 'notifications') { refreshNotifBadge(); renderNotifPanel(); }
    if (col === 'vehicles' && document.getElementById('screen-customers')) renderCustomerGrid();
    if (col === 'invoices' && document.getElementById('screen-invoices')) renderInvoiceList();
    if (col === 'inventory' && document.getElementById('screen-inventory')) renderInventory();
  });

  document.addEventListener('db:reset', function() {
    refreshNotifBadge();
    if (document.getElementById('screen-customers')) renderCustomerGrid();
    if (document.getElementById('screen-invoices')) renderInvoiceList();
    if (document.getElementById('screen-inventory')) renderInventory();
    if (document.getElementById('screen-settings')) renderSettings();
    renderNotifPanel();
    refreshDashboard();
  });

  document.addEventListener('db:notif', function() {
    refreshNotifBadge();
    renderNotifPanel();
  });

  /* Re-render screen data when it is first navigated to */
  document.addEventListener('ap:screenchange', function(e) {
    if (!e.detail) return;
    var id = e.detail.id;
    if (id === 'customers' && document.getElementById('screen-customers')) renderCustomerGrid();
    if (id === 'invoices' && document.getElementById('screen-invoices')) renderInvoiceList();
    if (id === 'inventory' && document.getElementById('screen-inventory')) renderInventory();
    if (id === 'settings' && document.getElementById('screen-settings')) renderSettings();
    if (id === 'dashboard') refreshDashboard();
  });
};

/* ═══════════════════════ PUBLIC NAMESPACE ══════════════════════ */
var WF = {
  openVehicleById: openVehicleById,
  editVehicle: editVehicle,
  _saveVehicleEdit: _saveVehicleEdit,
  startBookingForVehicle: startBookingForVehicle,
  wizNextStep: wizNextStep,
  wizPrevStep: wizPrevStep,
  _renderWizardStep: _renderWizardStep,
  _selectWizCustomer: _selectWizCustomer,
  _filterWizCustomers: _filterWizCustomers,
  _selectWizVehicle: _selectWizVehicle,
  _vinDecode: _vinDecode,
  _useDecodedVehicle: _useDecodedVehicle,
  _addVehicleForCustomer: _addVehicleForCustomer,
  _saveNewVehicle: _saveNewVehicle,
  _addNewCustomer: _addNewCustomer,
  _saveNewCustomer: _saveNewCustomer,
  _toggleService: _toggleService,
  confirmBookingFull: confirmBookingFull,
  startJob: startJob,
  pauseJob: pauseJob,
  moveToQC: moveToQC,
  markVehicleReady: markVehicleReady,
  closeJob: closeJob,
  requestApproval: requestApproval,
  addItemToWO: addItemToWO,
  _saveLineItem: _saveLineItem,
  assignTech: assignTech,
  _saveTechAssign: _saveTechAssign,
  addNote: addNote,
  _saveNote: _saveNote,
  addTechNote: addTechNote,
  renderWODetail: renderWODetail,
  simulateApproval: simulateApproval,
  _approveAll: _approveAll,
  _approvePartial: _approvePartial,
  _declineAll: _declineAll,
  openInvoice: openInvoice,
  recordPayment: recordPayment,
  _savePayment: _savePayment,
  printInvoice: printInvoice,
  createInvoiceFromWO: createInvoiceFromWO,
  notifyCustomer: notifyCustomer,
  _sendNotification: _sendNotification,
  contactCustomer: contactCustomer,
  simulateWhatsApp: simulateWhatsApp,
  renderInventory: renderInventory,
  adjustStock: adjustStock,
  _saveStockAdj: _saveStockAdj,
  reorderPart: reorderPart,
  _saveReorder: _saveReorder,
  addInventoryItem: addInventoryItem,
  _saveNewPart: _saveNewPart,
  renderTeam: renderTeam,
  startIntakeForVehicle: startIntakeForVehicle,
  renderIntakeStep: renderIntakeStep,
  _selectIntakeVehicle: _selectIntakeVehicle,
  _filterIntakeVehicles: _filterIntakeVehicles,
  _addPhoto: _addPhoto,
  intakeNext: intakeNext,
  intakePrev: intakePrev,
  confirmIntake: confirmIntake,
  refreshDashboard: refreshDashboard,
  buildSearchIndex: buildSearchIndex,
  openCustomerProfile: openCustomerProfile,
  resetDemoData: resetDemoData,
  loadSampleDay: loadSampleDay,
  simulateIncomingBooking: simulateIncomingBooking,
  simulateApprovalResponse: simulateApprovalResponse,
  simulateLowStock: simulateLowStock,
  simulateVehicleReady: simulateVehicleReady,
  simulateOffline: simulateOffline,
  restoreOnline: restoreOnline,
  renderReports: renderReports,
  renderSettings: renderSettings,
  saveSettings: saveSettings,
  openNotif: openNotif,
  markAllRead: markAllRead,
  renderNotifPanel: renderNotifPanel,
  refreshNotifBadge: refreshNotifBadge,
};

/* ── Additional helpers ─────────────────────────────────────────── */

/* renderInventory targets the new #invTableBody */
function _renderInventoryDynamic() {
  var tbody = document.getElementById('invTableBody');
  if (!tbody) return;
  var items = DB.get('inventory');
  tbody.innerHTML = items.map(function(item) {
    var low  = item.stock <= item.min;
    var stCls = low ? 'bad' : item.stock <= item.min * 2 ? 'warn' : 'good';
    return '<tr>' +
      '<td style="font-weight:600">' + _esc(item.name) + '</td>' +
      '<td style="font-family:monospace;font-size:11px">' + item.sku + '</td>' +
      '<td>' + item.cat + '</td>' +
      '<td><span class="pill ' + stCls + '">' + item.stock + '</span></td>' +
      '<td>' + item.min + '</td>' +
      '<td>' + fmtCurrency(item.price) + '</td>' +
      '<td>' + _esc(item.supplier) + '</td>' +
      '<td style="white-space:nowrap;">' +
      '<button class="btn sm" onclick="WF.adjustStock(\'' + item.id + '\')">Adjust</button> ' +
      (low ? '<button class="btn sm primary" onclick="WF.reorderPart(\'' + item.id + '\')">Reorder</button>' : '') +
      '</td></tr>';
  }).join('') || '<tr><td colspan="8" style="text-align:center;color:var(--muted);padding:24px;">No items</td></tr>';
}

/* Override renderInventory to target correct table */
var _origRenderInventory = renderInventory;
renderInventory = function() {
  _origRenderInventory();
  _renderInventoryDynamic();
};

/* switchBranch */
function switchBranch() {
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Switch Branch</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="display:grid;gap:8px;margin-top:16px;">' +
    ['Al-Rawabi — Amman Main','Al-Rawabi — South Amman','Al-Rawabi — Irbid'].map(function(b) {
      return '<div onclick="WF._selectBranch(\'' + b + '\')" style="padding:10px 12px;border-radius:10px;cursor:pointer;border:1.5px solid var(--line);font-weight:600;font-size:13.5px;">' + b + '</div>';
    }).join('') + '</div>' +
    '<button class="btn" style="width:100%;margin-top:12px;" onclick="closeQuickModal()">Cancel</button>'
  );
}

function _selectBranch(name) {
  var btn = document.querySelector('.tb-branch span:nth-child(2)');
  if (btn) btn.textContent = name.split('—')[1]||name;
  closeQuickModal();
  showToast('Branch switched to ' + name);
}

/* openUserProfile */
function openUserProfile() {
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">My Profile</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="display:flex;align-items:center;gap:14px;margin:16px 0;">' +
    '<div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:20px;flex:none;">R</div>' +
    '<div><div style="font-weight:700;font-size:15px;">Rami Al-Ahmad</div><div style="font-size:12px;color:var(--muted);">Reception Advisor · Al-Rawabi Main</div></div></div>' +
    '<table class="tbl" style="margin-bottom:14px;">' +
    '<tr><td>Email</td><td>rami@alrawabi.jo</td></tr>' +
    '<tr><td>Phone</td><td>+962 79 100 2020</td></tr>' +
    '<tr><td>Role</td><td>Reception Advisor</td></tr>' +
    '<tr><td>Session</td><td>Active · Today 08:00</td></tr>' +
    '</table>' +
    '<div style="display:flex;gap:8px;">' +
    '<button class="btn" onclick="closeQuickModal()">Close</button>' +
    '<button class="btn" onclick="closeQuickModal();go(\'settings\')">Settings</button>' +
    '<button class="btn" style="border-color:var(--bad);color:var(--bad);" onclick="closeQuickModal();showToast(\'Signed out · Returning to login\');setTimeout(function(){var ls=document.getElementById(\'login-screen\');if(ls){ls.style.display=\'\';ls.classList.remove(\'hidden\');}},600)">Sign Out</button>' +
    '</div>'
  );
}

/* openHelp */
function openHelp() {
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Help & Shortcuts</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="margin-top:14px;">' +
    '<div style="font-size:12px;font-weight:700;letter-spacing:.04em;color:var(--muted);text-transform:uppercase;margin-bottom:8px;">Keyboard Shortcuts</div>' +
    '<table class="tbl" style="margin-bottom:14px;">' +
    '<tr><td><kbd style="background:var(--bg-2);padding:2px 6px;border-radius:4px;font-family:monospace">⌘K / Ctrl+K</kbd></td><td>Open universal search</td></tr>' +
    '<tr><td><kbd style="background:var(--bg-2);padding:2px 6px;border-radius:4px;font-family:monospace">Esc</kbd></td><td>Close overlay / modal</td></tr>' +
    '<tr><td><kbd style="background:var(--bg-2);padding:2px 6px;border-radius:4px;font-family:monospace">Tab</kbd></td><td>Navigate UI elements</td></tr>' +
    '</table>' +
    '<div style="font-size:12px;font-weight:700;letter-spacing:.04em;color:var(--muted);text-transform:uppercase;margin-bottom:8px;">Quick Guide</div>' +
    '<ul style="font-size:13px;color:var(--muted);line-height:1.8;padding-inline-start:20px;margin:0;">' +
    '<li>Use Demo Controls (top-right) to switch roles and simulate events</li>' +
    '<li>All bookings, check-ins and payments persist across page refreshes</li>' +
    '<li>Vehicle Record Quality updates after completed service</li>' +
    '<li>Dark mode and language toggles are in the top bar</li>' +
    '</ul></div>' +
    '<button class="btn" style="width:100%;margin-top:16px;" onclick="closeQuickModal()">Close</button>'
  );
}

/* ── Aftercare follow-up ─────────────────────────────────────────── */
function newFollowUp() {
  var custs = DB.get('customers');
  var custOpts = custs.map(function(c) {
    return '<option value="' + c.id + '">' + _esc(c.name) + '</option>';
  }).join('');
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">New Follow-up</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="display:grid;gap:10px;margin-top:16px;">' +
    '<label class="form-label">Customer<select class="form-input" id="_fu_cust">' + custOpts + '</select></label>' +
    '<label class="form-label">Follow-up Type<select class="form-input" id="_fu_type">' +
    '<option value="declined">Declined work reminder</option>' +
    '<option value="warranty">Warranty expiry</option>' +
    '<option value="service">Service due</option>' +
    '<option value="comeback">Returning issue check-in</option>' +
    '</select></label>' +
    '<label class="form-label">Note<textarea class="form-input" id="_fu_note" rows="3" style="resize:none;" placeholder="Add context or notes…"></textarea></label>' +
    '<label class="form-label">Scheduled Date<input class="form-input" type="date" id="_fu_date"/></label>' +
    '</div>' +
    '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px;">' +
    '<button class="btn" onclick="closeQuickModal()">Cancel</button>' +
    '<button class="btn primary" onclick="WF._saveFollowUp()">Create Follow-up</button>' +
    '</div>'
  );
  var today = new Date(); today.setDate(today.getDate() + 7);
  setTimeout(function() {
    var d = document.getElementById('_fu_date');
    if (d) d.value = today.toISOString().slice(0,10);
  }, 50);
}

function _saveFollowUp() {
  var cust = (document.getElementById('_fu_cust') || {}).value;
  var type = (document.getElementById('_fu_type') || {}).value || 'service';
  var note = ((document.getElementById('_fu_note') || {}).value || '').trim();
  var date = (document.getElementById('_fu_date') || {}).value;
  var custObj = DB.byId('customers', cust) || { name: 'Customer' };
  DB.addNotif('info', '📋', 'Follow-up created · ' + _esc(custObj.name),
    (note || type) + (date ? ' · Due ' + date : ''), 'aftercare');
  closeQuickModal();
  refreshNotifBadge();
  showToast('Follow-up created · ' + _esc(custObj.name));
}

/* ── Pickup / mobile scheduling ─────────────────────────────────── */
function schedulePickup() {
  var custs = DB.get('customers');
  var custOpts = custs.map(function(c) {
    return '<option value="' + c.id + '">' + _esc(c.name) + '</option>';
  }).join('');
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Schedule Pickup</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="display:grid;gap:10px;margin-top:16px;">' +
    '<label class="form-label">Customer<select class="form-input" id="_pk_cust">' + custOpts + '</select></label>' +
    '<label class="form-label">Pickup Type<select class="form-input" id="_pk_type">' +
    '<option value="pickup">Vehicle pickup</option>' +
    '<option value="dropoff">Vehicle drop-off</option>' +
    '<option value="mobile">Mobile service at location</option>' +
    '</select></label>' +
    '<label class="form-label">Address / Location<input class="form-input" id="_pk_addr" placeholder="e.g. Abdoun, Amman"/></label>' +
    '<label class="form-label">Date &amp; Time<input class="form-input" type="datetime-local" id="_pk_dt"/></label>' +
    '<label class="form-label">Driver / Tech<select class="form-input" id="_pk_driver">' +
    '<option>Ahmad K. (Driver)</option><option>Feras N. (Mobile Tech)</option><option>— Assign later —</option>' +
    '</select></label>' +
    '</div>' +
    '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px;">' +
    '<button class="btn" onclick="closeQuickModal()">Cancel</button>' +
    '<button class="btn primary" onclick="WF._savePickup()">Schedule</button>' +
    '</div>'
  );
  var dt = new Date(); dt.setHours(dt.getHours() + 2);
  setTimeout(function() {
    var el = document.getElementById('_pk_dt');
    if (el) el.value = dt.toISOString().slice(0,16);
  }, 50);
}

function _savePickup() {
  var cust = DB.byId('customers', (document.getElementById('_pk_cust') || {}).value) || { name: 'Customer' };
  var type = (document.getElementById('_pk_type') || {}).value || 'pickup';
  var addr = ((document.getElementById('_pk_addr') || {}).value || 'location').trim();
  DB.addNotif('info', '🚐', type + ' scheduled · ' + _esc(cust.name), addr, 'calendar');
  closeQuickModal();
  refreshNotifBadge();
  showToast(type.charAt(0).toUpperCase() + type.slice(1) + ' scheduled · ' + _esc(cust.name));
}

/* ── Reports export ──────────────────────────────────────────────── */
function exportReport() {
  var invoices = DB.get('invoices');
  var paid = invoices.filter(function(i) { return i.status === 'paid'; });
  var revenue = paid.reduce(function(a, i) { return a + i.total; }, 0);
  var wos = DB.get('workOrders');
  var complete = wos.filter(function(w) { return w.status === 'complete'; }).length;
  var bookings = DB.get('bookings').length;
  _modal(
    '<div class="modal-head"><h2 style="margin:0;font-size:16px;">Export Report</h2>' +
    '<button class="modal-close" onclick="closeQuickModal()">✕</button></div>' +
    '<div style="margin:16px 0;">' +
    '<div style="font-size:12px;color:var(--muted);margin-bottom:12px;">Preview of current period data</div>' +
    '<table class="tbl" style="margin-bottom:14px;">' +
    '<tr><td>Total Revenue</td><td style="font-weight:700">' + fmtCurrency(revenue) + '</td></tr>' +
    '<tr><td>Bookings</td><td style="font-weight:700">' + bookings + '</td></tr>' +
    '<tr><td>Jobs Completed</td><td style="font-weight:700">' + complete + '</td></tr>' +
    '<tr><td>Invoices Issued</td><td style="font-weight:700">' + invoices.length + '</td></tr>' +
    '</table>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
    '<button class="btn primary" onclick="closeQuickModal();showToast(\'Report exported as CSV\')">Export CSV</button>' +
    '<button class="btn" onclick="closeQuickModal();showToast(\'Report exported as PDF\')">Export PDF</button>' +
    '<button class="btn" onclick="closeQuickModal();showToast(\'Report synced to Xero\')">Sync to Xero</button>' +
    '</div></div>'
  );
}

/* Expose new functions on WF */
WF.switchBranch = switchBranch;
WF._selectBranch = _selectBranch;
WF.openUserProfile = openUserProfile;
WF.openHelp = openHelp;
WF.newFollowUp = newFollowUp;
WF._saveFollowUp = _saveFollowUp;
WF.schedulePickup = schedulePickup;
WF._savePickup = _savePickup;
WF.exportReport = exportReport;

/* ── Screen-specific renders: triggered directly, no nav() wrapping ──
   Avoids stacking wrappers across app.js / Phase 3 / workflows.js.
   app.js's go() calls showScreen() which fires a custom event we listen to. */
document.addEventListener('ap:screenchange', function(e) {
  var id = e.detail && e.detail.id;
  if (!id) return;
  if (id === 'customers') renderCustomerGrid();
  else if (id === 'inventory') { renderInventory(); _renderInventoryDynamic(); }
  else if (id === 'team') renderTeam();
  else if (id === 'reports') renderReports();
  else if (id === 'intake') renderIntakeStep();
  else if (id === 'invoices') renderInvoiceList();
  else if (id === 'settings') renderSettings();
});

/* Show confirm button on last intake step */
var _origIntakeNext = intakeNext;
intakeNext = function() {
  _origIntakeNext();
  var nextBtn = document.getElementById('intakeNextBtn');
  var confBtn = document.getElementById('intakeConfirmBtn');
  if (INTAKE_STEP === 6) {
    if (nextBtn) nextBtn.style.display = 'none';
    if (confBtn) confBtn.style.display = '';
  } else {
    if (nextBtn) nextBtn.style.display = '';
    if (confBtn) confBtn.style.display = 'none';
  }
};

/* ── Enhance existing filterSearchResults with DB data (debounced 150ms) ── */
(function() {
  var _origFilter = typeof filterSearchResults === 'function' ? filterSearchResults : null;
  var _cachedIndex = null;   // lazily built once then reused until DB changes
  var _debounceTimer = null;

  /* Rebuild the index only when the DB actually changes */
  document.addEventListener('db:change', function() { _cachedIndex = null; }, {passive: true});
  document.addEventListener('db:reset',  function() { _cachedIndex = null; }, {passive: true});

  function _runFilter(q) {
    if (_origFilter) _origFilter(q);
    if (!q || q.length < 2) return;
    var list = document.querySelector('.search-results-list, #searchResultsList');
    if (!list) return;
    if (!_cachedIndex) _cachedIndex = buildSearchIndex();
    var lower = q.toLowerCase();
    var matches = _cachedIndex.filter(function(r) {
      return r.label.toLowerCase().includes(lower) || (r.sub && r.sub.toLowerCase().includes(lower));
    }).slice(0, 8);
    if (!matches.length) return;
    var extra = matches.map(function(r) {
      return '<div class="sr-item" onclick="closeSearchOverlay();' + r.action + '" style="cursor:pointer;">' +
        '<span class="sr-badge">' + r.type + '</span> ' +
        '<span class="sr-label">' + _esc(r.label) + '</span>' +
        '<span class="sr-sub"> · ' + _esc(r.sub||'') + '</span>' +
        '</div>';
    }).join('');
    list.insertAdjacentHTML('afterbegin', extra);
  }

  filterSearchResults = function(q) {
    if (_debounceTimer) clearTimeout(_debounceTimer);
    _debounceTimer = setTimeout(function() { _runFilter(q); }, 150);
  };
})();

/* ── Team screen: add containers when team screen is first opened ── */
document.addEventListener('ap:screenchange', function(e) {
  if (!e.detail || e.detail.id !== 'team') return;
  var teamScreen = document.getElementById('screen-team');
  if (teamScreen && !teamScreen.querySelector('.team-grid')) {
    var ph = teamScreen.querySelector('.page-head');
    if (ph) {
      var gridDiv = document.createElement('div');
      gridDiv.className = 'team-grid';
      var bayLabel = document.createElement('h3');
      bayLabel.textContent = 'Service Bays';
      bayLabel.style.cssText = 'margin:18px 0 10px;font-size:13.5px;';
      var bayDiv = document.createElement('div');
      bayDiv.className = 'bay-list';
      ph.insertAdjacentElement('afterend', gridDiv);
      gridDiv.insertAdjacentElement('afterend', bayLabel);
      bayLabel.insertAdjacentElement('afterend', bayDiv);
      renderTeam();
    }
  }
});

/* ── Notif badge init — called from _wfInit ── */
function _initNotifBadge() {
  var notifBtn = document.getElementById('notifBtn');
  if (notifBtn && !notifBtn.querySelector('.tb-notif-badge')) {
    var badge = document.createElement('span');
    badge.className = 'tb-notif-badge';
    badge.style.display = 'none';
    notifBtn.appendChild(badge);
    refreshNotifBadge();
  }
}
