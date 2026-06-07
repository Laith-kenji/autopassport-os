/* ============================================================
   AUTOPASSPORT OS — app.js · lightweight prototype interactions
   No backend · no real APIs · simulated behaviour only
   ============================================================ */

/* ── i18n ── */
var LANG = 'en';
var I18N = {
  en: {
    /* Nav */
    nav_daily:'Daily Work', nav_mgmt:'Management', nav_platform:'Platform',
    nav_dashboard:'Dashboard', nav_calendar:'Calendar & Queue', nav_customers:'Customers & Vehicles',
    nav_calendar_short:'Calendar', nav_customers_short:'Vehicles', btn_more:'More',
    nav_intake:'Intake & Evidence', nav_workorder:'Work Orders', nav_estimate:'Estimates & Approvals',
    nav_invoices:'Invoices & Payments', nav_aftercare:'Aftercare',
    nav_inventory:'Inventory & Purchasing', nav_team:'Team & Bays',
    nav_pickup:'Pickup & Mobile Jobs', nav_memberships:'Memberships & Loyalty',
    nav_reports:'Reports', nav_compliance:'Compliance Center',
    nav_integrations:'Integrations', nav_settings:'Settings',
    nav_import:'Import & Migration',
    /* Topbar */
    search_ph:'VIN, plate or customer…', btn_tech_app:'Tech App', btn_cust_app:'Customer App',
    lbl_vertical:'Vertical', lbl_role:'Role',
    role_owner:'Owner / GM', role_branch:'Branch Manager', role_reception:'Reception Advisor',
    role_tech:'Technician', role_acct:'Accountant',
    vert_workshop:'Workshop', vert_detailing:'Detailing', vert_wash:'Car Wash',
    vert_tire:'Tire & Battery', vert_mobile:'Mobile Service',
    /* Dashboard */
    dash_title:'Today at Al-Rawabi Auto Care',
    dash_new_booking:'New Booking', dash_start_intake:'Start Intake',
    stat_arrivals:'New Arrivals', stat_inprogress:'In Progress', stat_awaiting:'Awaiting',
    stat_ready:'Ready for Delivery', stat_revenue:'Revenue (today)',
    stat_delayed:'Delayed Jobs', stat_bays:'Bay Utilization', stat_photo:'Photo Compliance',
    more_kpis:'More KPIs', hide_kpis:'Hide KPIs',
    board_title:'Today Board', board_sub:'drag-free concept view',
    col_booked:'Booked', col_checkedin:'Checked In', col_inservice:'In Service',
    col_approval:'Approval', col_qc:'QC', col_ready:'Ready',
    alerts_title:'Attention Required', view_all:'View All',
    alert_approval:'Approval pending 32 min — Land Cruiser EST-558',
    alert_late:'Late completion — Lexus RX · promised 13:00',
    alert_photo:'Missing intake photos — Patrol WO-2043',
    alert_stock:'Low stock — Brake pads C200 (4 units)',
    alert_warranty:'Warranty expiring — Ceramic coating Aug 2026',
    alert_comeback:'Comeback risk — Honda Accord (2 visits)',
    perf_title:'Performance KPIs', insights_title:'Insights',
    /* Filter bar */
    filter_date:'Date', filter_branch:'Branch', filter_bay:'Bay',
    filter_tech:'Technician', filter_status:'Status', filter_vertical:'Vertical',
    filter_reset:'Reset', filter_all:'All',
    /* Calendar */
    cal_header:'Calendar & Bay Schedule',
    cal_booking_detail:'Booking Detail',
    cal_open_job:'Open Job', cal_open_passport:'Open Passport',
    cal_start_intake:'Start Intake', cal_assign_tech:'Assign Technician',
    cal_move_status:'Move Status', cal_call_cust:'Call Customer',
    cal_send_wa:'Send WhatsApp Update',
    cal_reassign:'Quick Reassign (concept)',
    cal_walkin:'Walk-in', cal_delayed:'Delayed', cal_pickup:'Pickup', cal_mobile:'Mobile',
    cal_bays_title:'Bays', cal_queue_waiting:'Waiting', cal_queue_ready:'Ready for Intake',
    /* Quick actions */
    qa_open_job:'Open Job', qa_passport:'Vehicle Passport',
    qa_intake:'Start Intake', qa_assign:'Assign Technician',
    qa_move:'Move Status', qa_call:'Call Customer', qa_wa:'Send WhatsApp',
    /* Stage 4 — Passport */
    trust_tip:'Trust score is a prototype metric based on verified evidence completeness.',
    nav_techworkspace:'My Workspace',
    tw_my_jobs:'My Jobs', tw_current_job:'Current Job', tw_tasks:'Tasks',
    tw_evidence:'Evidence', tw_parts:'Parts Requests', tw_qa:'QA Checklist',
    tw_sync:'Sync Status', tw_notes:'Tech Notes',
    tw_next_action:'Continue Current Job',
    /* WO */
    wo_bay:'Bay', wo_tech:'Technician', wo_promised:'Promised', wo_elapsed:'Elapsed',
    wo_priority:'Priority', wo_sync:'Sync',
    wo_start:'Start', wo_pause:'Pause', wo_qc:'Move to QC',
    wo_approval:'Request Approval', wo_close:'Close Job',
    wo_add_item:'Add Item', wo_add_labor:'Add Labor', wo_add_photo:'Add Photo',
    wo_tech_note:'Add Tech Note', wo_req_part:'Request Part', wo_contact:'Contact Customer',
    /* Table */
    tbl_search:'Search…', tbl_all:'All',
    /* Booking wizard */
    wiz_title:'New Booking', wiz_step1:'Customer', wiz_step2:'Vehicle',
    wiz_step3:'Service', wiz_step4:'Confirm',
    wiz_search_cust:'Search existing customer…',
    wiz_or_new:'or add new customer',
    wiz_name:'Full Name', wiz_phone:'Phone', wiz_email:'Email (optional)',
    wiz_wa_optin:'WhatsApp opt-in', wiz_lang:'Preferred Language',
    wiz_cust_type:'Customer Type', wiz_individual:'Individual', wiz_fleet:'Fleet', wiz_corporate:'Corporate',
    wiz_vin:'VIN', wiz_plate:'Plate Number', wiz_decode:'Simulate VIN Decode',
    wiz_decode_note:'Prototype only · VIN decoding is simulated',
    wiz_mileage:'Current Mileage (km)', wiz_vertical:'Vertical',
    wiz_category:'Service Category', wiz_package:'Package',
    wiz_branch:'Branch', wiz_date:'Date', wiz_time:'Time',
    wiz_bay:'Bay', wiz_tech:'Technician (optional)',
    wiz_pickup_opt:'Add pickup / drop-off',
    wiz_notes:'Notes', wiz_est_duration:'Est. Duration',
    wiz_confirm_title:'Booking Summary',
    wiz_whatsapp_confirm:'Send WhatsApp confirmation',
    wiz_create:'Create Booking',
    wiz_back:'Back', wiz_next:'Next',
    wiz_decoding:'Decoding VIN…',
    wiz_decoded:'VIN Decoded',
    /* Calendar */
    cal_today:'Today', cal_day:'Day', cal_week:'Week',
    cal_filter_branch:'Branch', cal_filter_bay:'Bay', cal_filter_tech:'Technician',
    cal_queue_title:'Live Queue', cal_waiting:'Waiting',
    cal_available:'Available slot — click to book',
    /* Statuses */
    status_booked:'Booked', status_checkedin:'Checked In', status_inservice:'In Service',
    status_approval:'Awaiting Approval', status_qc:'QC', status_ready:'Ready',
    status_completed:'Completed', status_delayed:'Delayed',
    /* General */
    btn_close:'Close', btn_cancel:'Cancel', btn_save:'Save', btn_confirm:'Confirm',
    btn_new_booking:'New Booking', btn_new_invoice:'New Invoice',
    btn_add_vehicle:'Add Vehicle', btn_add_warranty:'Add warranty',
    btn_upload_doc:'Upload document',
    toast_link_copied:'Link copied — paste into WhatsApp',
    toast_booking_created:'Booking created successfully',
    toast_reminder_sent:'WhatsApp reminder sent',
    toast_override:'Manager override logged',
    toast_synced:'Queued changes synchronized',
    proto_banner:'Prototype only — no backend connected · clickable concept · AutoPassport OS v2',
    offline_banner:'Offline Mode · 3 queued updates · local cache active',
    sync_online:'Online · Synced', sync_weak:'Weak · 1 queued', sync_offline:'Offline · 3 queued',
  },
  ar: {
    /* Nav */
    nav_daily:'العمل اليومي', nav_mgmt:'الإدارة', nav_platform:'المنصة',
    nav_dashboard:'لوحة التحكم', nav_calendar:'التقويم والطابور', nav_customers:'العملاء والمركبات',
    nav_calendar_short:'التقويم', nav_customers_short:'المركبات', btn_more:'المزيد',
    nav_intake:'الاستلام والأدلة', nav_workorder:'أوامر العمل', nav_estimate:'العروض والموافقات',
    nav_invoices:'الفواتير والمدفوعات', nav_aftercare:'المتابعة',
    nav_inventory:'المخزون والمشتريات', nav_team:'الفريق وأبواب الخدمة',
    nav_pickup:'التوصيل والخدمة المتنقلة', nav_memberships:'الاشتراكات والولاء',
    nav_reports:'التقارير', nav_compliance:'مركز الامتثال',
    nav_integrations:'التكاملات', nav_settings:'الإعدادات',
    nav_import:'الاستيراد والتهجير',
    /* Topbar */
    search_ph:'رقم الهيكل أو اللوحة أو العميل…',
    btn_tech_app:'تطبيق الفني', btn_cust_app:'تطبيق العميل',
    lbl_vertical:'النشاط', lbl_role:'الدور',
    role_owner:'المالك / المدير العام', role_branch:'مدير الفرع', role_reception:'موظف الاستقبال',
    role_tech:'الفني', role_acct:'المحاسب',
    vert_workshop:'ورشة ميكانيكا', vert_detailing:'تلميع وعناية', vert_wash:'غسيل سيارات',
    vert_tire:'إطارات وبطاريات', vert_mobile:'خدمة متنقلة',
    /* Dashboard */
    dash_title:'اليوم في مركز الرواب للسيارات',
    dash_new_booking:'حجز جديد', dash_start_intake:'بدء الاستلام',
    stat_arrivals:'وصول جديد', stat_inprogress:'قيد التنفيذ', stat_awaiting:'انتظار',
    stat_ready:'جاهزة للتسليم', stat_revenue:'الإيرادات (اليوم)',
    stat_delayed:'وظائف متأخرة', stat_bays:'استخدام الأبواب', stat_photo:'امتثال الصور',
    more_kpis:'مؤشرات إضافية', hide_kpis:'إخفاء المؤشرات',
    board_title:'لوحة اليوم', board_sub:'عرض تصوري',
    col_booked:'محجوز', col_checkedin:'تم التسجيل', col_inservice:'قيد الخدمة',
    col_approval:'انتظار موافقة', col_qc:'فحص جودة', col_ready:'جاهز',
    alerts_title:'تتطلب انتباهاً', view_all:'عرض الكل',
    alert_approval:'موافقة معلقة 32 دقيقة — لاند كروزر EST-558',
    alert_late:'تأخر الإنجاز — لكزس RX · الموعد كان 13:00',
    alert_photo:'صور استلام مفقودة — باترول WO-2043',
    alert_stock:'مخزون منخفض — براكس C200 (4 وحدات)',
    alert_warranty:'ضمان ينتهي — تلميع سيراميك أغسطس 2026',
    alert_comeback:'خطر عودة — هوندا أكورد (زيارتان)',
    perf_title:'مؤشرات الأداء', insights_title:'تحليلات ذكية',
    filter_date:'التاريخ', filter_branch:'الفرع', filter_bay:'الباب',
    filter_tech:'الفني', filter_status:'الحالة', filter_vertical:'النشاط',
    filter_reset:'إعادة تعيين', filter_all:'الكل',
    cal_header:'التقويم وجدولة الأبواب',
    cal_booking_detail:'تفاصيل الحجز',
    cal_open_job:'فتح أمر العمل', cal_open_passport:'جواز المركبة',
    cal_start_intake:'بدء الاستلام', cal_assign_tech:'تعيين الفني',
    cal_move_status:'تغيير الحالة', cal_call_cust:'الاتصال بالعميل',
    cal_send_wa:'إرسال تحديث واتساب',
    cal_reassign:'إعادة التعيين (مثال)',
    cal_walkin:'بدون موعد', cal_delayed:'متأخر', cal_pickup:'توصيل', cal_mobile:'متنقل',
    cal_bays_title:'أبواب الخدمة', cal_queue_waiting:'في الانتظار', cal_queue_ready:'جاهز للاستلام',
    qa_open_job:'فتح أمر العمل', qa_passport:'جواز المركبة',
    qa_intake:'بدء الاستلام', qa_assign:'تعيين الفني',
    qa_move:'تغيير الحالة', qa_call:'الاتصال بالعميل', qa_wa:'إرسال واتساب',
    trust_tip:'نقاط الثقة هي مقياس تجريبي مبني على اكتمال الأدلة الموثقة.',
    nav_techworkspace:'مساحة عملي',
    tw_my_jobs:'وظائفي', tw_current_job:'الوظيفة الحالية', tw_tasks:'المهام',
    tw_evidence:'الأدلة', tw_parts:'طلبات القطع', tw_qa:'قائمة الجودة',
    tw_sync:'حالة المزامنة', tw_notes:'ملاحظات الفني',
    tw_next_action:'متابعة الوظيفة الحالية',
    wo_bay:'الباب', wo_tech:'الفني', wo_promised:'الموعد المتفق', wo_elapsed:'الوقت المنقضي',
    wo_priority:'الأولوية', wo_sync:'المزامنة',
    wo_start:'ابدأ', wo_pause:'إيقاف مؤقت', wo_qc:'للفحص النهائي',
    wo_approval:'طلب موافقة', wo_close:'إغلاق الوظيفة',
    wo_add_item:'إضافة بند', wo_add_labor:'إضافة عمالة', wo_add_photo:'إضافة صورة',
    wo_tech_note:'ملاحظة فنية', wo_req_part:'طلب قطعة', wo_contact:'الاتصال بالعميل',
    tbl_search:'بحث…', tbl_all:'الكل',
    /* Booking wizard */
    wiz_title:'حجز جديد', wiz_step1:'العميل', wiz_step2:'المركبة',
    wiz_step3:'الخدمة', wiz_step4:'التأكيد',
    wiz_search_cust:'ابحث عن عميل موجود…',
    wiz_or_new:'أو إضافة عميل جديد',
    wiz_name:'الاسم الكامل', wiz_phone:'رقم الجوال', wiz_email:'البريد الإلكتروني (اختياري)',
    wiz_wa_optin:'الموافقة على واتساب', wiz_lang:'اللغة المفضلة',
    wiz_cust_type:'نوع العميل', wiz_individual:'فرد', wiz_fleet:'أسطول', wiz_corporate:'شركة',
    wiz_vin:'رقم الهيكل VIN', wiz_plate:'رقم اللوحة', wiz_decode:'محاكاة فك رمز VIN',
    wiz_decode_note:'نموذج أولي فقط · فك رمز VIN محاكى',
    wiz_mileage:'قراءة العداد الحالية (كم)', wiz_vertical:'النشاط',
    wiz_category:'فئة الخدمة', wiz_package:'الباقة',
    wiz_branch:'الفرع', wiz_date:'التاريخ', wiz_time:'الوقت',
    wiz_bay:'باب الخدمة', wiz_tech:'الفني (اختياري)',
    wiz_pickup_opt:'إضافة خدمة توصيل',
    wiz_notes:'ملاحظات', wiz_est_duration:'المدة المتوقعة',
    wiz_confirm_title:'ملخص الحجز',
    wiz_whatsapp_confirm:'إرسال تأكيد عبر واتساب',
    wiz_create:'إنشاء الحجز',
    wiz_back:'رجوع', wiz_next:'التالي',
    wiz_decoding:'جاري فك رمز VIN…',
    wiz_decoded:'تم فك رمز VIN',
    /* Calendar */
    cal_today:'اليوم', cal_day:'يوم', cal_week:'أسبوع',
    cal_filter_branch:'الفرع', cal_filter_bay:'الباب', cal_filter_tech:'الفني',
    cal_queue_title:'الطابور المباشر', cal_waiting:'في الانتظار',
    cal_available:'موعد متاح — انقر للحجز',
    /* Statuses */
    status_booked:'محجوز', status_checkedin:'تم التسجيل', status_inservice:'قيد الخدمة',
    status_approval:'انتظار موافقة', status_qc:'فحص جودة', status_ready:'جاهز',
    status_completed:'مكتمل', status_delayed:'متأخر',
    /* General */
    btn_close:'إغلاق', btn_cancel:'إلغاء', btn_save:'حفظ', btn_confirm:'تأكيد',
    btn_new_booking:'حجز جديد', btn_new_invoice:'فاتورة جديدة',
    btn_add_vehicle:'إضافة مركبة', btn_add_warranty:'إضافة ضمان',
    btn_upload_doc:'رفع مستند',
    toast_link_copied:'تم نسخ الرابط — الصقه في واتساب',
    toast_booking_created:'تم إنشاء الحجز بنجاح',
    toast_reminder_sent:'تم إرسال تذكير واتساب',
    toast_override:'تم تسجيل تجاوز المدير',
    toast_synced:'تمت مزامنة التغييرات المنتظرة',
    proto_banner:'نموذج أولي فقط — لا يوجد خادم متصل · مفهوم قابل للنقر · AutoPassport OS v2',
    offline_banner:'وضع عدم الاتصال · 3 تحديثات في الانتظار · ذاكرة التخزين المؤقت نشطة',
    sync_online:'متصل · متزامن', sync_weak:'اتصال ضعيف · 1 منتظر', sync_offline:'غير متصل · 3 منتظرة',
  }
};

function t(key){ return (I18N[LANG] && I18N[LANG][key]) || (I18N['en'][key]) || key; }

function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var key = el.getAttribute('data-i18n');
    var target = el.getAttribute('data-i18n-target') || 'text';
    var val = t(key);
    if(target === 'placeholder') el.setAttribute('placeholder', val);
    else if(target === 'title') el.setAttribute('title', val);
    else if(target === 'data-tip') el.setAttribute('data-tip', val);
    else el.textContent = val;
  });
}

/* ── Navigation ── */
function _injectScreen(id){
  var ws = document.getElementById('workspace');
  if (!ws || document.getElementById('screen-'+id)) return;
  var tmpl = typeof SCREENS !== 'undefined' && SCREENS['screen-'+id];
  if (!tmpl) return;
  var tmp = document.createElement('div');
  tmp.innerHTML = tmpl;
  var sec = tmp.firstElementChild;
  if (sec) {
    ws.appendChild(sec);
    if (LANG !== 'en') applyI18n();
  }
}
function showScreen(id){
  _injectScreen(id);
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  var el = document.getElementById('screen-'+id);
  if(el) el.classList.add('active');
  document.getElementById('workspace').scrollTop = 0;
  /* Notify workflows.js via event (avoids nav() wrapper stacking) */
  document.dispatchEvent(new CustomEvent('ap:screenchange', {detail:{id:id}}));
}
function nav(item){
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.querySelectorAll('.mnav-item').forEach(n=>n.classList.remove('active'));
  var screen = item.dataset.screen;
  document.querySelectorAll('[data-screen="'+screen+'"]').forEach(n=>n.classList.add('active'));
  showScreen(screen);
  closeMobileNav();
  updateBottomNav(screen);
}
function go(id){
  showScreen(id);
  document.querySelectorAll('.nav-item,.mnav-item').forEach(n=>n.classList.toggle('active',n.dataset.screen===id));
  updateBottomNav(id);
}
function openVehicle(){ go('vehicle'); }

function updateBottomNav(id){
  var map = {dashboard:'bnav-dash',calendar:'bnav-cal',customers:'bnav-cust'};
  document.querySelectorAll('.bnav-item').forEach(b=>b.classList.remove('active'));
  if(map[id]){
    var el = document.getElementById(map[id]);
    if(el) el.classList.add('active');
  }
}

/* ── Mobile nav ── */
function openMobileNav(){
  var ov = document.getElementById('mnav-overlay');
  var dr = document.getElementById('mnav-drawer');
  if(ov) ov.classList.add('open');
  if(dr) dr.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav(){
  var ov = document.getElementById('mnav-overlay');
  var dr = document.getElementById('mnav-drawer');
  if(ov) ov.classList.remove('open');
  if(dr) dr.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Compact sidebar ── */
function toggleCompactSidebar(){
  document.getElementById('sidebar').classList.toggle('compact');
}

/* ── Sidebar nav groups ── */
function toggleNavGroup(btn){
  var group = btn.closest('.nav-group');
  var isOpen = group.classList.contains('open');
  group.classList.toggle('open', !isOpen);
  btn.setAttribute('aria-expanded', String(!isOpen));
}

/* ── Vehicles mock data ── */
var VEHICLES = [
  {name:'Toyota Land Cruiser 2023',vin:'JTMHV05J…204871',owner:'Khalid Mansour',plate:'22-41-988',tag:'VIP',tagc:'teal',icon:'car'},
  {name:'Mercedes C200 2019',vin:'WDD2050…118233',owner:'Lara Haddad',plate:'31-77-204',tag:'In service',tagc:'blue',icon:'car'},
  {name:'Nissan Patrol 2022',vin:'JN8AY2N…556012',owner:'Saeed Al-Otaibi',plate:'18-90-441',tag:'Intake',tagc:'warn',icon:'car'},
  {name:'Honda Accord 2021',vin:'1HGCV1F…778120',owner:'Maya Khalil',plate:'27-55-310',tag:'Ready',tagc:'good',icon:'car'},
  {name:'Ford Ranger 2023',vin:'MNAUMF…903441',owner:'Tariq Nawfal',plate:'40-12-665',tag:'In service',tagc:'blue',icon:'car'},
  {name:'Lexus RX 2022',vin:'2T2BZMC…660984',owner:'Dana Ziadeh',plate:'33-08-219',tag:'QC',tagc:'blue',icon:'car'}
];
function buildVehicles(containerId){
  var g = document.getElementById(containerId); if(!g) return; g.innerHTML = '';
  VEHICLES.forEach(function(v){
    var c = document.createElement('div'); c.className='veh-card'; c.onclick=openVehicle;
    c.innerHTML =
      '<div class="veh-photo"><div class="veh-icon"><svg viewBox="0 0 24 24"><path d="M5 17H3a2 2 0 01-2-2v-4l2.69-6.73A2 2 0 015.54 3h12.92a2 2 0 011.85 1.27L23 11v4a2 2 0 01-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/></svg></div><span class="plate">'+v.plate+'</span></div>'+
      '<div class="veh-body"><div class="name">'+v.name+'</div><div class="vin">'+v.vin+'</div>'+
      '<div class="row"><span>'+v.owner+'</span><span class="pill '+v.tagc+'">'+v.tag+'</span></div></div>';
    g.appendChild(c);
  });
}
buildVehicles('vehGrid');
buildVehicles('vehGridDash');

/* ── Vehicle tabs ── */
function vehTab(t){
  document.querySelectorAll('#vehTabs .tab').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-selected','false');});
  t.classList.add('active'); t.setAttribute('aria-selected','true');
  document.querySelectorAll('#screen-vehicle [data-pane]').forEach(p=>p.classList.toggle('active',p.dataset.pane===t.dataset.tab));
}

/* ── Generic tab switcher ── */
function tabSwitch(t,tabsId,panesId){
  document.querySelectorAll('#'+tabsId+' .tab').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-selected','false');});
  t.classList.add('active'); t.setAttribute('aria-selected','true');
  var paneEl = document.getElementById(panesId);
  if(paneEl) paneEl.querySelectorAll('[data-pane]').forEach(p=>p.classList.toggle('active',p.dataset.pane===t.dataset.tab));
}

/* ── Filter chips ── */
function filterChip(el){
  el.parentNode.querySelectorAll('.chip').forEach(c=>c.classList.remove('on'));
  el.classList.add('on');
}

/* ── Intake stepper ── */
var STEP = 3;
var stepContent = {
  1:'<h3>1 · Vehicle</h3><table class="tbl"><tr><td>VIN</td><td style="font-family:monospace">JN8AY2N556012</td></tr><tr><td>Vehicle</td><td>Nissan Patrol 2022</td></tr><tr><td>Owner</td><td>Saeed Al-Otaibi · +962 79 222 8841</td></tr><tr><td>Mileage</td><td>52,310 km</td></tr></table>',
  2:'<h3>2 · Odometer + fuel</h3><div class="specs" style="grid-template-columns:repeat(3,1fr)"><div class="spec"><div class="k">Odometer</div><div class="v">52,310 km</div></div><div class="spec"><div class="k">Fuel level</div><div class="v">¾ tank</div></div><div class="spec"><div class="k">Warning lights</div><div class="v">None</div></div></div>',
  3:'<h3>3 · Condition</h3>'+condRow('Body panels','Good')+condRow('Glass / mirrors','Good')+condRow('Lights','Minor issue')+condRow('Interior','Good')+condRow('Tires','Good'),
  4:'<h3>4 · Damage map</h3><p style="color:var(--muted);font-size:13px">Tap the outline to drop a marker.</p><div class="damage-map">Vehicle top-down view<div class="pin" style="top:30%;inset-inline-start:22%">1</div></div>',
  5:'<h3>5 · Required photos <span class="card-sub">— 6 of 7 captured</span></h3>'+photoGrid(),
  6:'<h3>6 · Acknowledgement</h3><div class="note-box">Customer confirms vehicle condition and authorizes inspection.</div><div class="damage-map" style="height:70px;margin-top:10px;background:#fff;border-style:dashed">Signature captured</div><label style="display:flex;gap:8px;margin-top:10px;font-size:13px"><input type="checkbox" checked> Owner agreed to terms &amp; photo evidence</label>'
};
function condRow(l,v){
  var states = ['Good','Minor issue','Damaged'];
  var seg = states.map(function(s){return '<button class="'+(s===v?'on':'')+'" onclick="this.parentNode.querySelectorAll(\'button\').forEach(function(b){b.classList.remove(\'on\')});this.classList.add(\'on\')">'+s+'</button>';}).join('');
  return '<div class="check-row"><span>'+l+'</span><span class="seg">'+seg+'</span></div>';
}
function photoGrid(){
  var angles = [['Front',1],['Rear',1],['Left',1],['Right',1],['Interior',1],['Wheels',1],['Issue close-up',0]];
  var html = '<div class="photo-grid">';
  angles.forEach(function(a){ html += a[1]?'<div class="photo-slot filled"><div class="stage-tag">BEFORE</div><span class="lab">'+a[0]+'</span></div>':'<div class="photo-slot"><span class="lab">'+a[0]+'</span>+ capture</div>'; });
  return html+'</div><div style="margin-top:10px"><span class="pill warn">Photo compliance 6/7</span> <button class="btn ghost sm" onclick="showToast(t(\'toast_override\'))">Override</button></div>';
}
function renderStep(){
  document.getElementById('stepBody').innerHTML = stepContent[STEP];
  document.querySelectorAll('.step').forEach(function(s){
    var n = +s.dataset.step;
    s.classList.toggle('active',n===STEP);
    s.classList.toggle('done',n<STEP);
  });
}
function goStep(n){ STEP=n; renderStep(); }
function stepNext(){ if(STEP<6){STEP++;renderStep();} }
function stepPrev(){ if(STEP>1){STEP--;renderStep();} }
renderStep();

/* ── Vertical switcher ── */
var VERTICALS = {
  workshop:{tag:'Workshop',pkg:'Brake overhaul + 20k service',board:'Today Board',consVisible:false},
  detailing:{tag:'Detailing',pkg:'Premium ceramic coating + interior',board:'Detailing Board',consVisible:true},
  wash:{tag:'Car Wash',pkg:'Express wash + wax',board:'Wash Queue',consVisible:true},
  tire:{tag:'Tire & Battery',pkg:'4× tire change + balancing',board:'Bay Board',consVisible:false},
  mobile:{tag:'Mobile Service',pkg:'Mobile detailing + pickup',board:'Mobile Jobs Board',consVisible:true}
};
function setVertical(v){
  var c = VERTICALS[v]; if(!c) return;
  var vt = document.getElementById('vertTagline');
  if(vt) vt.textContent = (LANG==='ar' ? t('vert_'+v) : c.tag) + ' · Thursday, 4 June 2026';
  var wp = document.getElementById('woPackage'); if(wp) wp.textContent = c.pkg;
  var bt = document.getElementById('boardTitle'); if(bt) bt.firstChild.textContent = (LANG==='ar'?t('board_title'):c.board)+' ';
  var vc = document.getElementById('vertConsumables'); if(vc) vc.style.display = c.consVisible?'block':'none';
  /* sync all vertical selects */
  document.querySelectorAll('.vert-select-sync').forEach(function(s){ s.value = v; });
}

/* ── Role switcher ── */
var ROLE_NAV = {
  owner:    ['dashboard','customers','reports','compliance','integrations','settings'],
  branch:   ['dashboard','calendar','customers','workorder','team','aftercare','inventory'],
  reception:['dashboard','calendar','customers','intake','estimate','invoices','aftercare'],
  tech:     ['dashboard','techworkspace','workorder','intake'],
  acct:     ['invoices','reports','compliance','settings']
};
function setRole(role){
  var allowed = ROLE_NAV[role];
  if(!allowed) return;
  document.querySelectorAll('.nav-group-body .nav-item, .mnav-item').forEach(function(item){
    var screen = item.dataset.screen;
    var hidden = !allowed.includes(screen);
    item.style.display = hidden ? 'none' : '';
  });
  /* sync role selects */
  document.querySelectorAll('.role-select-sync').forEach(function(s){ if(s.value!==role) s.value=role; });
  showToast(t('role_'+role) + (LANG==='ar' ? ' — تم تفعيل العرض' : ' — view activated'));
  /* update sidebar role badge */
  if(typeof updateSidebarRoleBadge === 'function') updateSidebarRoleBadge(role);
}

/* ── Generic 3-dot row menu ── */
function toggle3dot(btn){
  var menu = btn.nextElementSibling;
  var isOpen = menu.classList.contains('open');
  document.querySelectorAll('.row3-menu.open,.wo-sec-menu.open,.tabs-more-dd.open').forEach(function(m){m.classList.remove('open');});
  if(!isOpen) menu.classList.add('open');
}
document.addEventListener('click',function(e){
  if(!e.target.closest('.row3-wrap') && !e.target.closest('.wo-sec-wrap') && !e.target.closest('.tabs-more-wrap'))
    document.querySelectorAll('.row3-menu.open,.wo-sec-menu.open,.tabs-more-dd.open').forEach(function(m){m.classList.remove('open');});
});

/* ── Passport "More" tab dropdown ── */
function toggleMoreTabs(btn){
  var dd = btn.nextElementSibling;
  var isOpen = dd.classList.contains('open');
  document.querySelectorAll('.tabs-more-dd.open').forEach(function(m){m.classList.remove('open');});
  if(!isOpen) dd.classList.add('open');
}
function selectMoreTab(item,tabKey){
  document.querySelectorAll('.tabs-more-dd.open').forEach(function(m){m.classList.remove('open');});
  document.querySelectorAll('#vehTabs .tab,.tabs-more-btn').forEach(function(t){t.classList.remove('active');});
  item.closest('.tabs-more-btn') && item.closest('.tabs-more-btn').classList.add('active-group');
  /* activate pane */
  document.querySelectorAll('#screen-vehicle [data-pane]').forEach(function(p){p.classList.toggle('active',p.dataset.pane===tabKey);});
}

/* ── Tech workspace QA toggle ── */
function twQa(btn, result){
  var row = btn.closest('.tw-qa-row');
  row.querySelectorAll('.qabtn').forEach(function(b){b.classList.remove('pass','fail');});
  btn.classList.add(result);
  showToast(result==='pass'?'QA item passed':'QA item flagged');
}

/* ── Tech workspace task toggle ── */
function twTask(cb){
  cb.closest('.tw-task-row').classList.toggle('tdone',cb.checked);
}

/* ── Kanban quick-action menu ── */
function toggleKcardMenu(btn){
  var menu = btn.nextElementSibling;
  var isOpen = menu.classList.contains('open');
  document.querySelectorAll('.kcard-menu.open').forEach(function(m){m.classList.remove('open');});
  if(!isOpen) menu.classList.add('open');
  btn.closest('.kcard').addEventListener('mouseleave',function(){ menu.classList.remove('open'); },{once:true});
}
document.addEventListener('click',function(e){
  if(!e.target.closest('.kcard-menu-wrap')) document.querySelectorAll('.kcard-menu.open').forEach(function(m){m.classList.remove('open');});
});

/* ── Dashboard filter reset ── */
function resetFilters(){
  document.querySelectorAll('.filter-bar select').forEach(function(s){s.selectedIndex=0;});
  document.querySelectorAll('.filter-bar input[type="date"]').forEach(function(i){i.value='';});
  showToast('Filters reset');
}

/* ── More KPIs toggle ── */
function toggleMoreKpis(){
  var panel = document.getElementById('moreKpis');
  var btn = document.getElementById('moreKpisBtn');
  if(!panel||!btn) return;
  var open = panel.classList.toggle('open');
  btn.textContent = open ? t('hide_kpis') : t('more_kpis');
}

/* ── Compliance center ── */
var complianceData = {
  uae:{flag:'🇦🇪',name:'UAE',vat:'5%',items:[{k:'VAT rate',v:'5%',s:'good'},{k:'VAT-ready invoice fields',v:'Configured',s:'good'},{k:'Tax accounting sync',v:'Xero connected',s:'good'},{k:'e-Invoicing connector',v:'Readiness check passed',s:'good'},{k:'Status',v:'Configuration ready',s:'good'}]},
  ksa:{flag:'🇸🇦',name:'Saudi Arabia',vat:'15%',items:[{k:'VAT rate',v:'15%',s:'good'},{k:'FATOORA connector',v:'Configured',s:'good'},{k:'Arabic invoice template',v:'Active',s:'good'},{k:'UUID readiness',v:'Enabled',s:'good'},{k:'QR code on invoice',v:'Enabled',s:'good'},{k:'Phase 2 structured e-invoice',v:'Ready',s:'warn'},{k:'Status',v:'Connector configured',s:'good'}]},
  eg:{flag:'🇪🇬',name:'Egypt',vat:'14%',items:[{k:'VAT rate',v:'14%',s:'good'},{k:'ETA eInvoicing connector',v:'Not configured',s:'bad'},{k:'ETA eReceipt connector',v:'Not configured',s:'bad'},{k:'POS submission readiness',v:'Pending setup',s:'warn'},{k:'Tax code configuration',v:'Partial',s:'warn'},{k:'Status',v:'Setup required',s:'bad'}]},
  jo:{flag:'🇯🇴',name:'Jordan',vat:'GST 16%',items:[{k:'General Sales Tax',v:'16%',s:'good'},{k:'National e-invoicing path',v:'Pilot configuration',s:'warn'},{k:'Arabic document template',v:'Active',s:'good'},{k:'Electronic invoice format',v:'In progress',s:'warn'},{k:'Status',v:'Pilot configuration',s:'warn'}]},
  qa:{flag:'🇶🇦',name:'Qatar',vat:'No VAT',items:[{k:'Default tax profile',v:'No VAT',s:'good'},{k:'Configurable future tax engine',v:'Ready',s:'good'},{k:'QPAY readiness',v:'Configurable',s:'warn'},{k:'Status',v:'Configurable',s:'good'}]}
};
function showCompliance(el,key){
  document.querySelectorAll('.country-card').forEach(c=>c.classList.remove('on'));
  el.classList.add('on');
  var d = complianceData[key];
  var rows = d.items.map(function(i){
    return '<tr><td>'+i.k+'</td><td><span class="pill '+i.s+'">'+i.v+'</span></td></tr>';
  }).join('');
  document.getElementById('complianceContent').innerHTML =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;"><span style="font-size:28px">'+d.flag+'</span><div><div style="font-weight:800;font-size:16px">'+d.name+'</div><div style="color:var(--muted);font-size:12px">Tax profile: '+d.vat+'</div></div></div>'+
    '<div class="tbl-wrap"><table class="tbl">'+rows+'</table></div>'+
    '<div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap;">'+
    '<button class="btn sm" onclick="showToast(\'Invoice template preview\')">Preview invoice</button>'+
    '<button class="btn sm" onclick="showToast(\'Connector test run\')">Test connector</button>'+
    '<button class="btn sm" onclick="showToast(\'Audit log opened\')">Audit log</button>'+
    '<button class="btn sm primary" onclick="showToast(\'Validation run\')">Run validation</button></div>';
}
showCompliance(document.querySelector('.country-card.on'),'uae');

/* ── Customer App — aside injected once on first open ── */
function _injectCustomerApp() {
  if (document.getElementById('phone-drawer')) return;
  var el = document.createElement('aside');
  el.id = 'phone-drawer';
  el.innerHTML = '<div class="drawer-head"><span>📱 Customer App preview</span><button onclick="closeApp()">✕</button></div>'
    +'<div class="phone"><div class="phone-notch"></div><div class="phone-screen">'
    +'<div class="app-top"><div class="hi">Welcome back,</div><div class="title">Khalid 👋</div></div>'
    +'<div class="app-tabs">'
    +'<div class="app-tab active" data-atab="garage" onclick="appTab(this)">Garage</div>'
    +'<div class="app-tab" data-atab="passport" onclick="appTab(this)">Passport</div>'
    +'<div class="app-tab" data-atab="live" onclick="appTab(this)">Live Job</div>'
    +'<div class="app-tab" data-atab="book" onclick="appTab(this)">Book</div>'
    +'<div class="app-tab" data-atab="maint" onclick="appTab(this)">Maint.</div>'
    +'<div class="app-tab" data-atab="budget" onclick="appTab(this)">Budget</div>'
    +'<div class="app-tab" data-atab="warranties" onclick="appTab(this)">Warr.</div>'
    +'<div class="app-tab" data-atab="invoices" onclick="appTab(this)">Invoices</div>'
    +'<div class="app-tab" data-atab="share" onclick="appTab(this)">Share</div>'
    +'</div><div class="app-body">'
    +'<div class="app-pane active" data-apane="garage">'
    +'<div class="app-veh"><div class="ph">🚙</div><div class="info"><div class="n">Toyota Land Cruiser 2023</div><div class="s">68,420 km · 7 verified events · Trust: 86</div></div></div>'
    +'<div class="app-veh"><div class="ph">🚗</div><div class="info"><div class="n">Honda Accord 2021</div><div class="s">41,200 km · 3 events</div></div></div></div>'
    +'<div class="app-pane" data-apane="passport">'
    +'<div class="app-veh"><div class="ph">🚙</div><div class="info"><div class="n">Land Cruiser 2023 · Trust 86</div><div class="s">VIN …204871 · Owner verified</div></div></div>'
    +'<strong style="font-size:11px">Verified timeline</strong>'
    +'<div class="mini-ev"><div class="md">🛠</div><div>Major service · <span class="prov verified">VERIFIED</span><br><span style="color:var(--muted)">12 Mar 2026</span></div></div>'
    +'<div class="mini-ev"><div class="md">🔋</div><div>Battery + warranty · <span class="prov verified">VERIFIED</span><br><span style="color:var(--muted)">5 Nov 2025</span></div></div>'
    +'<div class="mini-ev"><div class="md">✨</div><div>Ceramic coating · <span class="prov verified">VERIFIED</span><br><span style="color:var(--muted)">20 Aug 2025</span></div></div>'
    +'<button class="app-btn" onclick="openShareModal()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-share"/></svg></span> Share Access (temporary)</button></div>'
    +'<div class="app-pane" data-apane="live">'
    +'<div class="app-progress"><strong style="font-size:12px">Land Cruiser · WO-2042</strong>'
    +'<div style="font-size:10.5px;color:var(--muted);margin-bottom:6px">Al-Rawabi Main · Advisor: Rami A. · ETA: 14:30</div>'
    +'<div class="step-line"><span class="c c-done"></span> Checked in · photos captured</div>'
    +'<div class="step-line"><span class="c c-done"></span> Estimate approved (2/4)</div>'
    +'<div class="step-line"><span class="c c-now"></span> <strong>In service · brakes</strong></div>'
    +'<div class="step-line"><span class="c c-next"></span> Quality check</div>'
    +'<div class="step-line"><span class="c c-next"></span> Ready for pickup</div></div>'
    +'<div style="margin:6px 0;font-size:11px;color:var(--muted)">Before photos (2) · During (2) · After (pending)</div>'
    +'<button class="app-btn" style="background:var(--accent);margin-bottom:5px" onclick="showToast(\'Opening chat with Al-Rawabi Auto Care…\')">💬 Message the shop</button>'
    +'<button class="app-btn" style="background:var(--good)" onclick="showToast(\'WhatsApp update requested\')">📱 WhatsApp update</button></div>'
    +'<div class="app-pane" data-apane="book">'
    +'<div style="font-weight:700;font-size:13px;margin-bottom:8px">Book a service</div>'
    +'<div class="app-progress" style="cursor:pointer" onclick="openBookingWizard()">'
    +'<div style="font-weight:700;font-size:12px">Oil change · 73,000 km</div>'
    +'<div style="color:var(--muted);font-size:11px">Recommended: Aug 2026 · Est: JOD 45</div>'
    +'<button class="app-btn" style="margin-top:8px" onclick="closeApp();openBookingWizard()">Book now</button></div>'
    +'<div class="app-progress" style="cursor:pointer;margin-top:6px" onclick="showToast(\'Pickup booking opened\')">'
    +'<div style="font-weight:700;font-size:12px">🚐 Request pickup</div>'
    +'<div style="color:var(--muted);font-size:11px">Free for Premium members · Abdoun area</div></div></div>'
    +'<div class="app-pane" data-apane="maint">'
    +'<div class="app-progress" style="margin-bottom:8px"><strong style="font-size:12px">⏰ Oil change due</strong><div style="color:var(--muted);font-size:11px;margin-top:3px">at 73,000 km (~Aug 2026)</div></div>'
    +'<div class="app-progress" style="margin-bottom:8px"><strong style="font-size:12px">🛞 Tire rotation</strong><div style="color:var(--muted);font-size:11px;margin-top:3px">recommended in 2 months</div></div>'
    +'<div class="app-progress" style="margin-bottom:8px"><strong style="font-size:12px">⚠️ Ceramic warranty expiring</strong><div style="color:var(--warn);font-size:11px;margin-top:3px">Aug 2026 · consider renewal</div></div>'
    +'<button class="app-btn" onclick="openBookingWizard()">Book maintenance</button></div>'
    +'<div class="app-pane" data-apane="budget">'
    +'<div style="font-weight:700;font-size:13px;margin-bottom:8px">Maintenance Budget Plan</div>'
    +'<div class="app-progress"><div class="budget-row"><span class="bitem">Wheel alignment</span><span style="color:var(--warn)">JOD 60 · 30 days</span></div>'
    +'<div class="budget-row"><span class="bitem">Cabin air filter</span><span>JOD 25 · optional</span></div>'
    +'<div class="budget-row" style="border:none"><span class="bitem">Tire replacement</span><span>JOD 320 · Sep plan</span></div></div>'
    +'<button class="app-btn" style="background:var(--good);margin-top:8px" onclick="showToast(\'Wheel alignment approved — booking created\')">✅ Approve wheel alignment</button>'
    +'<button class="app-btn" style="background:var(--muted);margin-top:5px" onclick="showToast(\'Tire reminder set for September\')">🔔 Remind me in Sep</button></div>'
    +'<div class="app-pane" data-apane="warranties">'
    +'<div style="font-weight:700;font-size:13px;margin-bottom:8px">My Warranties</div>'
    +'<div class="warranty-row"><div class="wn">🔋 Battery (Bosch S5)</div><div style="color:var(--muted)">Al-Rawabi · Expires Nov 2027</div><div style="color:var(--muted)">24-month replacement</div></div>'
    +'<div class="warranty-row"><div class="wn">✨ Ceramic coating <span class="pill warn">Expiring</span></div><div style="color:var(--muted)">Al-Rawabi · Expires Aug 2026</div></div>'
    +'<div class="warranty-row"><div class="wn">🛑 Brake pads · service promise</div><div style="color:var(--muted)">Al-Rawabi · Expires Sep 2026</div></div>'
    +'<div class="warranty-row" style="border:none"><div class="wn">🛞 Tire warranty (Michelin)</div><div style="color:var(--muted)">Michelin MENA · Expires Jan 2028</div></div>'
    +'<button class="app-btn" style="background:var(--warn);margin-top:6px" onclick="showToast(\'Ceramic coating renewal options sent\')">Renew ceramic coating</button></div>'
    +'<div class="app-pane" data-apane="invoices">'
    +'<div style="font-weight:700;font-size:13px;margin-bottom:8px">My Invoices</div>'
    +'<div class="warranty-row"><div class="wn">INV-3081 · JOD 335 <span class="pill good">Paid</span></div><div style="color:var(--muted)">12 Mar 2026 · Land Cruiser</div></div>'
    +'<div class="warranty-row"><div class="wn">INV-3065 · JOD 180 <span class="pill good">Paid</span></div><div style="color:var(--muted)">10 Jan 2026 · Land Cruiser</div></div>'
    +'<div class="warranty-row" style="border:none"><div class="wn">INV-3048 · JOD 92 <span class="pill good">Paid</span></div><div style="color:var(--muted)">5 Nov 2025 · Battery</div></div></div>'
    +'<div class="app-pane" data-apane="share">'
    +'<div style="font-weight:700;font-size:13px;margin-bottom:8px">Share Passport</div>'
    +'<div class="app-progress" style="margin-bottom:8px"><div style="font-size:11.5px;font-weight:700">🔗 Buyer link</div><div style="font-size:10.5px;color:var(--muted)">Read-only · Service timeline + warranties · 7 days · Active</div></div>'
    +'<div class="app-progress" style="margin-bottom:8px"><div style="font-size:11.5px;font-weight:700">🏦 ACIG Insurance</div><div style="font-size:10.5px;color:var(--muted)">Documents + history · 30 days · Expired</div></div>'
    +'<div style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:11.5px;"><input type="checkbox" checked> <span>Hide my identity</span></div>'
    +'<button class="app-btn" onclick="copyLink()">＋ Generate temporary link</button></div>'
    +'</div></div></div></div>';
  document.body.appendChild(el);
}
function openApp(tab){
  _injectCustomerApp();
  document.getElementById('app-overlay').classList.add('open');
  document.getElementById('phone-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
  if(tab){ var tt = document.querySelector('.app-tab[data-atab="'+tab+'"]'); if(tt) appTab(tt); }
}
function closeApp(){
  document.getElementById('app-overlay').classList.remove('open');
  document.getElementById('phone-drawer').classList.remove('open');
  document.body.style.overflow = '';
}
function appTab(t){
  document.querySelectorAll('#phone-drawer .app-tab').forEach(x=>x.classList.remove('active'));
  t.classList.add('active');
  document.querySelectorAll('[data-apane]').forEach(p=>p.classList.toggle('active',p.dataset.apane===t.dataset.atab));
}

/* ── Technician App — aside injected once on first open ── */
function _injectTechApp() {
  if (document.getElementById('tech-drawer')) return;
  var el = document.createElement('aside');
  el.id = 'tech-drawer';
  el.innerHTML = '<div class="drawer-head"><span>🔧 Technician App preview</span><button onclick="closeTechApp()">✕</button></div>'
    +'<div class="phone" style="border-color:#2a3a50;"><div class="phone-notch" style="background:#2a3a50;"></div><div class="phone-screen">'
    +'<div class="tech-top"><div class="hi">Technician portal —</div><div class="title">Samir H. 🔧</div></div>'
    +'<div class="tech-tabs">'
    +'<div class="tech-tab active" data-ttab="myjobs" onclick="techTab(this)">My Jobs</div>'
    +'<div class="tech-tab" data-ttab="tasks" onclick="techTab(this)">Tasks</div>'
    +'<div class="tech-tab" data-ttab="evidence" onclick="techTab(this)">Evidence</div>'
    +'<div class="tech-tab" data-ttab="parts" onclick="techTab(this)">Parts</div>'
    +'<div class="tech-tab" data-ttab="qa" onclick="techTab(this)">QA</div>'
    +'<div class="tech-tab" data-ttab="sync" onclick="techTab(this)">Sync</div>'
    +'</div>'
    +'<div class="tech-pane active" data-tpane="myjobs">'
    +'<div class="tech-job"><div class="tj">Mercedes C200 2019 · Bay 3 <span class="pill teal" style="font-size:9px">Active</span></div>'
    +'<div class="tm">WO-2041 · Brake overhaul · promised: 13:00 · 1h 42m</div>'
    +'<button class="app-btn" style="font-size:11px;padding:7px;margin-top:6px;background:var(--warn)" onclick="showToast(\'Job paused\')">⏸ Pause timer</button></div>'
    +'<div class="tech-job" style="opacity:.7"><div class="tj">Ford Ranger 2023 · Bay 5</div>'
    +'<div class="tm">WO-2039 · Oil + filter · queued</div>'
    +'<button class="app-btn" style="font-size:11px;padding:7px;margin-top:6px" onclick="showToast(\'Job started\')">▶ Start</button></div></div>'
    +'<div class="tech-pane" data-tpane="tasks">'
    +'<div style="padding:10px;font-weight:700;font-size:12px;border-bottom:1px solid var(--line)">WO-2041 · Brake overhaul</div>'
    +'<div class="task-check"><input type="checkbox" checked> <span style="text-decoration:line-through;color:var(--muted)">Remove front wheels</span></div>'
    +'<div class="task-check"><input type="checkbox" checked> <span style="text-decoration:line-through;color:var(--muted)">Inspect brake pads &amp; rotors</span></div>'
    +'<div class="task-check"><input type="checkbox" checked> <span style="text-decoration:line-through;color:var(--muted)">Photo old pads before replacement</span></div>'
    +'<div class="task-check"><input type="checkbox"> <span>Install new pads</span></div>'
    +'<div class="task-check"><input type="checkbox"> <span>Machine rotors</span></div>'
    +'<div class="task-check"><input type="checkbox"> <span>Torque wheels to spec</span></div>'
    +'<div class="task-check"><input type="checkbox"> <span>Test-drive &amp; confirm</span></div>'
    +'<div style="padding:8px;"><button class="app-btn" style="font-size:11px;padding:7px" onclick="showToast(\'Issue flagged for manager review\')">🚩 Flag issue</button></div></div>'
    +'<div class="tech-pane" data-tpane="evidence">'
    +'<div style="padding:8px 10px;font-weight:700;font-size:11.5px;border-bottom:1px solid var(--line)">WO-2041 Evidence</div>'
    +'<div style="padding:10px;display:grid;grid-template-columns:1fr 1fr;gap:6px;">'
    +'<div class="photo-slot filled" style="aspect-ratio:1;font-size:10px;"><div class="stage-tag" style="font-size:8px">BEFORE</div><span class="lab" style="font-size:9px">Front</span><span class="badge">✅</span></div>'
    +'<div class="photo-slot filled" style="aspect-ratio:1;font-size:10px;"><div class="stage-tag" style="font-size:8px">DURING</div><span class="lab" style="font-size:9px">Old pads</span><span class="badge">⏱</span></div>'
    +'<div class="photo-slot" style="aspect-ratio:1;font-size:10px;">＋ After photo</div>'
    +'<div class="photo-slot" style="aspect-ratio:1;font-size:10px;border-color:var(--warn)">📶 Offline queue</div></div></div>'
    +'<div class="tech-pane" data-tpane="parts">'
    +'<div style="padding:8px 10px;font-weight:700;font-size:11.5px;border-bottom:1px solid var(--line)">Parts Request</div>'
    +'<div style="padding:10px;">'
    +'<div class="task-check" style="flex-direction:column;align-items:flex-start;gap:2px;padding:8px 0;"><span style="font-weight:700;font-size:12px">Brake pad set (BP-C200-F)</span><span style="font-size:10.5px;color:var(--muted)">Stock: 4 · Qty: 1 · Status: <span class="pill good">In stock</span></span></div>'
    +'<div class="task-check" style="flex-direction:column;align-items:flex-start;gap:2px;padding:8px 0;"><span style="font-weight:700;font-size:12px">Oil filter (OF-MB-204)</span><span style="font-size:10.5px;color:var(--muted)">Stock: 11 · Qty: 1 · <span class="pill good">In stock</span></span></div>'
    +'<button class="app-btn" style="font-size:11px;padding:7px" onclick="showToast(\'Parts confirmed from inventory\')">✅ Confirm parts used</button></div></div>'
    +'<div class="tech-pane" data-tpane="qa">'
    +'<div style="padding:8px 10px;font-weight:700;font-size:11.5px;border-bottom:1px solid var(--line)">QA Checklist · WO-2041</div>'
    +'<div class="task-check" style="padding:8px 10px;"><input type="checkbox"> <span>Brake response confirmed</span></div>'
    +'<div class="task-check" style="padding:8px 10px;"><input type="checkbox"> <span>No warning lights</span></div>'
    +'<div class="task-check" style="padding:8px 10px;"><input type="checkbox"> <span>After photos captured</span></div>'
    +'<div class="task-check" style="padding:8px 10px;"><input type="checkbox"> <span>Interior clean</span></div>'
    +'<div style="padding:8px 10px;">'
    +'<button class="app-btn" style="font-size:11px;padding:7px;margin-bottom:5px" onclick="showToast(\'QA handover note saved\')">📝 Add handover note</button>'
    +'<button class="app-btn" style="font-size:11px;padding:7px;background:var(--good)" onclick="showToast(\'Vehicle marked ready for delivery — customer notified\')">✅ Mark ready for delivery</button></div></div>'
    +'<div class="tech-pane" data-tpane="sync"><div style="padding:12px;">'
    +'<div style="font-weight:700;font-size:13px;margin-bottom:10px">Sync Status</div>'
    +'<div class="import-stat"><span class="isk">Connection</span><span class="isv" id="techSyncState">🟢 Online</span></div>'
    +'<div class="import-stat"><span class="isk">Queued updates</span><span class="isv" id="techQueued">0</span></div>'
    +'<div class="import-stat"><span class="isk">Last synced</span><span class="isv">Just now</span></div>'
    +'<div class="import-stat"><span class="isk">Offline photos</span><span class="isv">0 pending</span></div>'
    +'<button class="app-btn" style="font-size:11px;padding:7px;margin-top:8px" onclick="showToast(\'Sync triggered (concept)\')">🔄 Sync now</button></div></div>'
    +'</div></div></div>';
  document.body.appendChild(el);
}
function openTechApp(){
  _injectTechApp();
  document.getElementById('tech-overlay').classList.add('open');
  document.getElementById('tech-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeTechApp(){
  document.getElementById('tech-overlay').classList.remove('open');
  document.getElementById('tech-drawer').classList.remove('open');
  document.body.style.overflow = '';
}
function techTab(t){
  document.querySelectorAll('#tech-drawer .tech-tab').forEach(x=>x.classList.remove('active'));
  t.classList.add('active');
  document.querySelectorAll('[data-tpane]').forEach(p=>p.classList.toggle('active',p.dataset.tpane===t.dataset.ttab));
}

/* ── Modals ── */
function openShareModal(){ document.getElementById('shareModal').classList.add('open'); document.body.style.overflow='hidden'; }
function closeShareModal(){ document.getElementById('shareModal').classList.remove('open'); document.body.style.overflow=''; }
function doShare(){ closeShareModal(); copyLink(); }

function openEvidenceModal(label,stage,time,by,hash){
  document.getElementById('evLabel').textContent = label;
  document.getElementById('evStage').textContent = stage;
  document.getElementById('evTime').textContent = time;
  document.getElementById('evBy').textContent = by;
  document.getElementById('evRef').textContent = 'EV-'+Math.floor(Math.random()*9000+1000);
  var hmap = {timestamped:'Timestamped · original preserved','hash-verified':'Timestamped · Hash verified · Original preserved'};
  document.getElementById('evHash').textContent = hmap[hash]||hash;
  document.getElementById('evidenceModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeEvidenceModal(){ document.getElementById('evidenceModal').classList.remove('open'); document.body.style.overflow=''; }

function openComebackModal(){ document.getElementById('comebackModal').classList.add('open'); document.body.style.overflow='hidden'; }
function closeComebackModal(){ document.getElementById('comebackModal').classList.remove('open'); document.body.style.overflow=''; }

/* ── New Booking Wizard ── */
var WIZ_STEP = 1;
var WIZ_VIN_DECODED = false;

function openBookingWizard(){
  WIZ_STEP = 1; WIZ_VIN_DECODED = false;
  renderWizStep();
  document.getElementById('bookingWizard').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeBookingWizard(){
  document.getElementById('bookingWizard').classList.remove('open');
  document.body.style.overflow = '';
}
function renderWizStep(){
  for(var i=1;i<=4;i++){
    var pane = document.getElementById('wiz-pane-'+i);
    if(pane) pane.classList.toggle('active', i===WIZ_STEP);
    var step = document.getElementById('wiz-step-'+i);
    if(step){
      step.classList.toggle('active', i===WIZ_STEP);
      step.classList.toggle('done', i<WIZ_STEP);
    }
  }
  var back = document.getElementById('wizBack');
  if(back) back.style.display = WIZ_STEP>1?'':'none';
  var next = document.getElementById('wizNext');
  if(next) next.textContent = WIZ_STEP<4 ? t('wiz_next') : t('wiz_create');
}
function wizNext(){
  if(WIZ_STEP===4){ confirmBooking(); return; }
  WIZ_STEP++; renderWizStep();
}
function wizBack(){ if(WIZ_STEP>1){ WIZ_STEP--; renderWizStep(); } }
function simulateVinDecode(){
  var btn = document.getElementById('vinDecodeBtn');
  var status = document.getElementById('vinStatus');
  var filled = document.getElementById('vinFilled');
  if(!btn) return;
  btn.disabled = true;
  btn.textContent = t('wiz_decoding');
  status.style.display = 'block';
  status.textContent = t('wiz_decoding');
  setTimeout(function(){
    btn.textContent = t('wiz_decoded')+' ✓';
    status.textContent = '';
    status.style.display = 'none';
    WIZ_VIN_DECODED = true;
    if(filled) filled.style.display = 'block';
  }, 1400);
}
function confirmBooking(){
  closeBookingWizard();
  showToast(t('toast_booking_created'));
}
/* Search results simulation */
function showCustResults(val){
  var box = document.getElementById('custResults');
  if(!box) return;
  box.style.display = val.length>1 ? 'block' : 'none';
}

/* ── Sync / offline ── */
var syncStates = ['online','weak','offline'];
var syncIdx = 0;
var syncMeta = {
  online:{cls:'',ban:false,q:'0',last:'Just now',techState:'Online',techQ:'0'},
  weak:  {cls:'warn',ban:false,q:'1',last:'8 minutes ago',techState:'Weak',techQ:'1'},
  offline:{cls:'off',ban:true,q:'3',last:'22 minutes ago',techState:'Offline',techQ:'3'}
};
function applySyncState(key){
  var m = syncMeta[key];
  var si = document.getElementById('syncIndicator'); if(si){ si.className=m.cls; }
  var sl = document.getElementById('syncLabel');
  if(sl) sl.setAttribute('data-i18n','sync_'+key);
  if(sl) sl.textContent = t('sync_'+key);
  document.getElementById('offline-banner').classList.toggle('show',m.ban);
  var mob = document.querySelectorAll('.mob-sync-dot');
  mob.forEach(function(d){ d.className='mob-sync-dot '+(m.cls||''); });
  var ssl = document.getElementById('syncStateLabel'); if(ssl) ssl.textContent = key.charAt(0).toUpperCase()+key.slice(1);
  var ql = document.getElementById('queuedLabel'); if(ql) ql.textContent = m.q;
  var lsl = document.getElementById('lastSyncLabel'); if(lsl) lsl.textContent = m.last;
  var ts = document.getElementById('techSyncState'); if(ts) ts.textContent = m.techState;
  var tq = document.getElementById('techQueued'); if(tq) tq.textContent = m.techQ;
  if(key==='online') showToast(t('toast_synced'));
}
function cycleSyncState(){ syncIdx=(syncIdx+1)%syncStates.length; applySyncState(syncStates[syncIdx]); }
function setSync(key){ syncIdx=syncStates.indexOf(key); applySyncState(key); }

/* ── Toast ── */
var _toastTimer = null;
function showToast(msg){
  var el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  if(_toastTimer) clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function(){ el.classList.remove('show'); }, 3000);
}

/* ── Link copy ── */
function copyLink(){
  var link = 'https://pass.autopassport.io/v/VH-1042?token=demo7d';
  if(navigator.clipboard) navigator.clipboard.writeText(link).catch(function(){});
  showToast(t('toast_link_copied'));
}

/* ── Theme (light / dark) ── */
function toggleTheme(){
  var isDark = document.documentElement.classList.toggle('dark');
  try{ localStorage.setItem('ap-theme', isDark ? 'dark' : 'light'); }catch(e){}
  _syncThemeIcons(isDark);
}
function _syncThemeIcons(isDark){
  var iconUse = isDark
    ? '<svg viewBox="0 0 24 24"><use href="#ic-sun"/></svg>'
    : '<svg viewBox="0 0 24 24"><use href="#ic-moon"/></svg>';
  var label = isDark ? (LANG==='ar'?'فاتح':'Light') : (LANG==='ar'?'داكن':'Dark');
  var ariaLabel = isDark
    ? (LANG==='ar' ? 'التبديل إلى الوضع الفاتح' : 'Switch to light mode')
    : (LANG==='ar' ? 'التبديل إلى الوضع الداكن' : 'Switch to dark mode');
  document.querySelectorAll('.theme-icon-slot').forEach(function(s){ s.innerHTML = iconUse; });
  document.querySelectorAll('.theme-label-slot').forEach(function(s){ s.textContent = label; });
  var btn = document.getElementById('themeBtn');
  if(btn) btn.setAttribute('aria-label', ariaLabel);
}
/* Sync icons after page load */
document.addEventListener('DOMContentLoaded',function(){
  _syncThemeIcons(document.documentElement.classList.contains('dark'));
  initAccessibility();
});

/* ── Language / RTL ── */
var isAR = false;
function toggleLang(){
  isAR = !isAR;
  LANG = isAR ? 'ar' : 'en';
  var html = document.documentElement;
  html.setAttribute('dir', isAR?'rtl':'ltr');
  html.setAttribute('lang', isAR?'ar':'en');
  document.querySelectorAll('.lang-btn').forEach(function(b){ b.classList.toggle('active', isAR); });
  applyI18n();
  /* Re-run vertical to update tagline in correct language */
  var vsel = document.getElementById('vertSelect'); if(vsel) setVertical(vsel.value);
  /* Update calendar date label in correct locale */
  updateCalDate();
  /* Re-sync theme icon labels in new language */
  _syncThemeIcons(document.documentElement.classList.contains('dark'));
}

/* ── Calendar (simulated) ── */
var CAL_VIEW = 'day';
var CAL_DATE_OFFSET = 0;

var CAL_BOOKINGS = [
  {bay:0,hour:9,dur:1.5,name:'Khalid Mansour',vehicle:'Land Cruiser 2023',plate:'22-41-988',service:'Major 60k Service',tech:'Samir H.',type:'workshop',status:'inservice'},
  {bay:1,hour:10,dur:2,name:'Lara Haddad',vehicle:'Mercedes C200 2019',plate:'31-77-204',service:'Brake Overhaul',tech:'Samir H.',type:'workshop',status:'inservice'},
  {bay:2,hour:11,dur:1,name:'Saeed Al-Otaibi',vehicle:'Nissan Patrol 2022',plate:'18-90-441',service:'AC Check',tech:'Omar F.',type:'workshop',status:'checkedin'},
  {bay:0,hour:13,dur:3,name:'Dana Ziadeh',vehicle:'Lexus RX 2022',plate:'33-08-219',service:'Ceramic Coating',tech:'Feras N.',type:'detailing',status:'qc'},
  {bay:3,hour:10,dur:1,name:'Maya Khalil',vehicle:'Honda Accord 2021',plate:'27-55-310',service:'Oil Change',tech:'Omar F.',type:'workshop',status:'ready',delayed:true},
  {bay:1,hour:14,dur:1.5,name:'Tariq Nawfal',vehicle:'Ford Ranger 2023',plate:'40-12-665',service:'Tire Change ×4',tech:'—',type:'tire',status:'booked'}
];
var BAY_NAMES = ['Bay 1','Bay 2','Bay 3','Bay 4','Bay 5'];
var CAL_HOURS = [8,9,10,11,12,13,14,15,16,17,18,19];

var CAL_QUEUE = [
  {wait:18,veh:'Lexus RX 2022',plate:'33-08-219',customer:'Dana Ziadeh',type:'walkin',note:'Walk-in · AC noise'},
  {wait:34,veh:'Honda Accord 2021',plate:'27-55-310',customer:'Maya Khalil',type:'late',note:'Late · promised 13:00'},
  {wait:5, veh:'Kia Sportage 2021',plate:'44-21-007',customer:'Rami Aziz',type:'booked',note:'Booked 11:15'}
];

function statusPill(s){
  var map={inservice:'teal',ready:'good',booked:'blue',checkedin:'gray',qc:'blue',delayed:'warn'};
  return '<span class="pill '+(map[s]||'gray')+'">'+s+'</span>';
}

function renderCalendar(){
  var wrap = document.getElementById('calGridWrap'); if(!wrap) return;
  var bays = BAY_NAMES.slice(0,4);

  var headHtml = '<div class="cal-grid-head" style="grid-template-columns:64px repeat('+bays.length+',1fr)">';
  headHtml += '<div class="cal-time-col"></div>';
  bays.forEach(function(b,i){
    var busy = CAL_BOOKINGS.filter(function(bk){return bk.bay===i;}).length;
    headHtml += '<div class="cal-bay-head">'+b+'<div class="bay-status">'+(busy?busy+' job'+(busy>1?'s':''):'Free')+'</div></div>';
  });
  headHtml += '</div>';

  var rowsHtml = '';
  CAL_HOURS.forEach(function(h){
    rowsHtml += '<div class="cal-row" style="grid-template-columns:64px repeat('+bays.length+',1fr)">';
    rowsHtml += '<div class="cal-time">'+h+':00</div>';
    bays.forEach(function(b,bi){
      var bk = CAL_BOOKINGS.find(function(x){return x.bay===bi && x.hour===h;});
      rowsHtml += '<div class="cal-cell" onclick="'+(bk?'openCalBookingDetail('+bi+','+h+')':'openBookingWizard()')+'">';
      if(bk){
        var badges = '';
        if(bk.walkin) badges += '<span class="bb-badge bb-badge-walkin">'+t('cal_walkin')+'</span>';
        if(bk.delayed) badges += '<span class="bb-badge bb-badge-delayed">'+t('cal_delayed')+'</span>';
        if(bk.pickup) badges += '<span class="bb-badge bb-badge-pickup">'+t('cal_pickup')+'</span>';
        if(bk.mobile) badges += '<span class="bb-badge bb-badge-mobile">'+t('cal_mobile')+'</span>';
        rowsHtml += '<div class="booking-block bb-'+bk.type+(bk.delayed?' status-delayed':'')+'" style="height:100%">'+
          '<div class="bb-name">'+bk.vehicle+'</div>'+
          '<div class="bb-customer">'+bk.name+'</div>'+
          '<div class="bb-plate">'+bk.plate+'</div>'+
          '<div class="bb-meta">'+bk.service+'</div>'+
          '<div class="bb-meta">'+bk.tech+' · '+statusPill(bk.status)+'</div>'+
          (badges?'<div class="bb-badges">'+badges+'</div>':'')+
          '</div>';
      } else {
        rowsHtml += '<div class="slot-available">'+t('cal_available')+'</div>';
      }
      rowsHtml += '</div>';
    });
    rowsHtml += '</div>';
  });

  wrap.innerHTML = headHtml + rowsHtml;
  renderCalQueue();
}

function renderCalQueue(){
  var qb = document.getElementById('calQueueBody'); if(!qb) return;
  var html = '';
  CAL_QUEUE.forEach(function(q){
    html += '<div class="q-item" onclick="showToast(\''+q.veh+' · '+q.note+'\')">';
    html += '<div class="q-main"><div class="q-veh">'+q.veh+'</div>';
    html += '<div class="q-meta">'+q.plate+' · '+q.customer+'</div>';
    if(q.wait) html += '<div class="q-wait">'+q.wait+' min wait</div>';
    html += '</div>';
    html += '<button class="btn sm primary" onclick="event.stopPropagation();go(\'intake\')" style="white-space:nowrap">Intake</button>';
    html += '</div>';
  });
  var baysHtml = '';
  BAY_NAMES.slice(0,4).forEach(function(b,i){
    var busy = CAL_BOOKINGS.find(function(bk){return bk.bay===i && (bk.status==='inservice'||bk.status==='checkedin');});
    baysHtml += '<div class="q-bay-row"><span class="qbn">'+b+'</span><span class="'+(busy?'q-bay-busy':'q-bay-avail')+'">'+(busy?busy.vehicle:'Available')+'</span></div>';
  });
  qb.innerHTML = html;
  var qbays = document.getElementById('calBayBody'); if(qbays) qbays.innerHTML = baysHtml;
}

function openCalBookingDetail(bay,hour){
  var bk = CAL_BOOKINGS.find(function(b){return b.bay===bay && b.hour===hour;}); if(!bk) return;
  var msg = bk.vehicle+' · '+bk.plate+'\n'+bk.customer+' · '+bk.service+'\nTech: '+bk.tech+' · Status: '+bk.status;
  showToast(bk.vehicle+' — '+bk.service+' · '+bk.status+(bk.delayed?' ⚠ Late':''));
}

/* Legacy alias */
function openCalBooking(bay,hour){ openCalBookingDetail(bay,hour); }

function openCalBooking(bay,hour){
  var booking = CAL_BOOKINGS.find(function(b){ return b.bay===bay && b.hour===hour; });
  if(!booking) return;
  showToast(booking.vehicle+' · '+booking.service+' · '+booking.status);
}

function calPrev(){ CAL_DATE_OFFSET--; updateCalDate(); }
function calNext(){ CAL_DATE_OFFSET++; updateCalDate(); }
function calToday(){ CAL_DATE_OFFSET=0; updateCalDate(); }
function updateCalDate(){
  var base = new Date(2026,5,4);
  base.setDate(base.getDate()+CAL_DATE_OFFSET);
  var optsLong = {weekday:'long',year:'numeric',month:'long',day:'numeric'};
  var optsShort = {weekday:'short',day:'numeric',month:'short',year:'numeric'};
  var locale = LANG==='ar'?'ar-JO':'en-GB';
  var el = document.getElementById('calDateLabel');
  if(el) el.textContent = base.toLocaleDateString(locale,optsLong);
  var tb = document.getElementById('calDateLabelTb');
  if(tb) tb.textContent = base.toLocaleDateString(locale,optsShort);
}
function queueTab(btn,panel){
  document.querySelectorAll('.queue-tab').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  document.querySelectorAll('.queue-body').forEach(function(p){
    p.style.display = p.dataset.panel===panel ? '' : 'none';
  });
}
function setCalView(view){
  CAL_VIEW = view;
  document.querySelectorAll('.cal-view-toggle button').forEach(function(b){
    b.classList.toggle('active', b.dataset.view===view);
  });
  showToast(view==='week'?'Week view (concept)':'Day view');
}

/* ── Escape key ── */
document.addEventListener('keydown',function(e){
  if(e.key!=='Escape') return;
  closeMobileNav();
  closeApp(); closeTechApp();
  closeShareModal(); closeEvidenceModal(); closeComebackModal(); closeBookingWizard();
});

/* ── Overlay clicks ── */
var _mnavOl = document.getElementById('mnav-overlay');
if(_mnavOl) _mnavOl.addEventListener('click', closeMobileNav);

/* ── Init ── */
setVertical('workshop');
updateCalDate();
renderCalendar();
applyI18n();
updateBottomNav('dashboard');

/* Sync aria-expanded with open class on page load */
document.querySelectorAll('.nav-group').forEach(function(g){
  var hd = g.querySelector('.nav-group-hd');
  if(hd) hd.setAttribute('aria-expanded', g.classList.contains('open') ? 'true' : 'false');
});

/* ── Stage 5: Accessibility init ── */
function initAccessibility(){
  /* Keyboard support for nav-item and mnav-item divs */
  function _handleNavKey(e){
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      nav(this);
    }
  }
  document.querySelectorAll('.nav-item,.mnav-item').forEach(function(el){
    el.addEventListener('keydown', _handleNavKey);
  });

  /* Tab role management — apply role=tab and aria-selected to all .tab divs */
  document.querySelectorAll('.tabs').forEach(function(tabbar){
    tabbar.setAttribute('role','tablist');
    tabbar.querySelectorAll('.tab').forEach(function(tab){
      tab.setAttribute('role','tab');
      tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
      /* Keyboard: arrow keys navigate tabs */
      tab.addEventListener('keydown', function(e){
        var tabs = Array.from(tabbar.querySelectorAll('.tab'));
        var idx = tabs.indexOf(this);
        var next = null;
        if(e.key === 'ArrowRight' || e.key === 'ArrowDown'){
          next = tabs[(idx + 1) % tabs.length];
        } else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){
          next = tabs[(idx - 1 + tabs.length) % tabs.length];
        } else if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault(); this.click();
        }
        if(next){ e.preventDefault(); next.focus(); next.click(); }
      });
    });
  });

  /* Wizard overlay click-to-close */
  var wizOl = document.getElementById('bookingWizard');
  if(wizOl) wizOl.addEventListener('click', function(e){
    if(e.target === this) closeBookingWizard();
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   AUTOPASSPORT OS — Premium UX Overhaul: JS additions
   Phase 6: Search overlay, demo drawer, notifications, role-based nav, shortcuts
   ══════════════════════════════════════════════════════════════════════════ */

/* ── Role badge labels (keys must match ROLE_NAV above) ── */
var ROLE_LABELS = {
  owner:'Owner / GM',
  branch:'Branch Manager',
  reception:'Reception Advisor',
  tech:'Technician',
  acct:'Accountant'
};

function updateSidebarRoleBadge(role){
  var el = document.getElementById('sbRoleName');
  if(el) el.textContent = ROLE_LABELS[role] || role;
  /* Sync all demo-drawer role selects */
  document.querySelectorAll('.role-select-sync').forEach(function(sel){
    if(sel.value !== role) sel.value = role;
  });
}

/* ── Search overlay ── */
function openSearchOverlay(){
  var overlay = document.getElementById('search-overlay');
  var input = document.getElementById('searchModalInput');
  if(!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  if(input) setTimeout(function(){ input.focus(); }, 60);
}

function closeSearchOverlay(){
  var overlay = document.getElementById('search-overlay');
  if(!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  var input = document.getElementById('searchModalInput');
  if(input) input.value = '';
  var live = document.getElementById('searchLiveResults');
  var def = document.getElementById('searchDefaultState');
  if(live) live.style.display = 'none';
  if(def) def.style.display = '';
}

function fillSearch(val){
  var input = document.getElementById('searchModalInput');
  if(input){ input.value = val; filterSearchResults(val); input.focus(); }
}

/* Simple live search against sample data */
var SEARCH_DATA = [
  {type:'customer',icon:'ic-users',title:'Khalid Mansour',sub:'VIP · Land Cruiser 2023 · +962 79 555 0142',badge:'VIP',badgeC:'blue',action:function(){openVehicle();}},
  {type:'customer',icon:'ic-users',title:'Lara Haddad',sub:'Mercedes C200 2019 · +962 79 412 8833',badge:'In Service',badgeC:'teal',action:function(){go('workorder');}},
  {type:'customer',icon:'ic-users',title:'Maya Khalil',sub:'Honda Accord 2021 · +962 77 822 1100',badge:'Ready',badgeC:'good',action:function(){go('invoices');}},
  {type:'vehicle',icon:'ic-car',title:'Toyota Land Cruiser 2023',sub:'22-41-988 · Khalid Mansour · VIN: JTMHV05J…204871',badge:'Approval',badgeC:'warn',action:function(){openVehicle();}},
  {type:'vehicle',icon:'ic-car',title:'Mercedes C200 2019',sub:'31-77-204 · Lara Haddad · WO-2041',badge:'In Service',badgeC:'teal',action:function(){go('workorder');}},
  {type:'vehicle',icon:'ic-car',title:'Nissan Patrol 2022',sub:'18-90-441 · Saeed Al-Otaibi · Photos 5/7',badge:'Check-In',badgeC:'warn',action:function(){go('intake');}},
  {type:'job',icon:'ic-tools',title:'WO-2041 · Mercedes C200',sub:'Brake overhaul · Samir H. · In Service',badge:'Active',badgeC:'teal',action:function(){go('workorder');}},
  {type:'job',icon:'ic-tools',title:'WO-2043 · Nissan Patrol',sub:'AC Check · Omar F. · Checked In',badge:'Pending',badgeC:'warn',action:function(){go('intake');}},
  {type:'invoice',icon:'ic-credit-card',title:'INV-3082 · Mercedes C200',sub:'JOD 299 · Lara Haddad · Payment pending',badge:'Pending',badgeC:'warn',action:function(){go('invoices');}},
  {type:'invoice',icon:'ic-credit-card',title:'INV-3081 · Land Cruiser',sub:'JOD 335 · Khalid Mansour · Paid',badge:'Paid',badgeC:'good',action:function(){go('invoices');}},
];

function filterSearchResults(q){
  var live = document.getElementById('searchLiveResults');
  var def = document.getElementById('searchDefaultState');
  if(!q || q.trim().length < 1){
    if(live) live.style.display = 'none';
    if(def) def.style.display = '';
    return;
  }
  if(live) live.style.display = '';
  if(def) def.style.display = 'none';
  var ql = q.toLowerCase();
  var matches = SEARCH_DATA.filter(function(d){
    return d.title.toLowerCase().indexOf(ql)!==-1 || d.sub.toLowerCase().indexOf(ql)!==-1;
  });
  if(!matches.length){
    live.innerHTML = '<div class="search-empty"><div class="se-icon">🔍</div><p>No results for "<strong>'+q+'</strong>"</p><p>Try a customer name, plate number, VIN, or invoice number</p></div>';
    return;
  }
  var groups = {customer:[],vehicle:[],job:[],invoice:[]};
  matches.forEach(function(m){ if(groups[m.type]) groups[m.type].push(m); });
  var labels = {customer:'Customers',vehicle:'Vehicles',job:'Active Jobs',invoice:'Invoices'};
  var html = '';
  Object.keys(groups).forEach(function(type){
    if(!groups[type].length) return;
    html += '<div class="search-group"><div class="search-group-label">'+labels[type]+'</div>';
    groups[type].forEach(function(item){
      html += '<div class="search-result" onclick="(function(){'+item.action.toString().replace(/\n/g,' ')+'})();closeSearchOverlay()">';
      html += '<div class="sr-icon"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:var(--accent);fill:none;stroke-width:1.7;stroke-linecap:round"><use href="#'+item.icon+'"/></svg></div>';
      html += '<div class="sr-main"><div class="sr-title">'+item.title+'</div><div class="sr-sub">'+item.sub+'</div></div>';
      html += '<span class="sr-badge pill '+item.badgeC+'">'+item.badge+'</span>';
      html += '</div>';
    });
    html += '</div>';
  });
  live.innerHTML = html;
}

/* ── Demo drawer ── */
function openDemoDrawer(){
  var ov = document.getElementById('demo-drawer-overlay');
  var dr = document.getElementById('demo-drawer');
  if(ov) ov.classList.add('open');
  if(dr) dr.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDemoDrawer(){
  var ov = document.getElementById('demo-drawer-overlay');
  var dr = document.getElementById('demo-drawer');
  if(ov) ov.classList.remove('open');
  if(dr) dr.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Notifications panel ── */
function toggleNotifPanel(){
  var panel = document.getElementById('notif-panel');
  if(!panel) return;
  panel.classList.toggle('open');
}
/* Close notif panel on outside click */
document.addEventListener('click',function(e){
  var panel = document.getElementById('notif-panel');
  var btn = document.getElementById('notifBtn');
  if(!panel || !btn) return;
  if(panel.classList.contains('open') && !panel.contains(e.target) && !btn.contains(e.target)){
    panel.classList.remove('open');
  }
});

/* ── Keyboard shortcuts ── */
document.addEventListener('keydown',function(e){
  /* ⌘K or Ctrl+K → open search */
  if((e.metaKey || e.ctrlKey) && e.key === 'k'){
    e.preventDefault();
    var overlay = document.getElementById('search-overlay');
    if(overlay && overlay.classList.contains('open')){
      closeSearchOverlay();
    } else {
      openSearchOverlay();
    }
    return;
  }
  /* / key → open search (when not in input) */
  if(e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'SELECT'){
    e.preventDefault();
    openSearchOverlay();
    return;
  }
  /* Escape → close search, demo drawer */
  if(e.key === 'Escape'){
    closeSearchOverlay();
    closeDemoDrawer();
  }
});

/* ── Search input in topbar → open overlay instead ── */
var topbarSearch = document.querySelector('#topbar .search');
if(topbarSearch){
  topbarSearch.addEventListener('focus', function(e){
    e.preventDefault();
    this.blur();
    openSearchOverlay();
  });
  topbarSearch.addEventListener('click', function(e){
    e.preventDefault();
    openSearchOverlay();
  });
}

/* ── Quick action cards — keyboard support ── */
document.querySelectorAll('.qa-card').forEach(function(card){
  card.addEventListener('keydown',function(e){
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); this.click(); }
  });
});

/* ── Apply role nav + badge on init ── */
if(typeof updateSidebarRoleBadge === 'function') updateSidebarRoleBadge('reception');


/* ══════════════════════════════════════════════════════════════════════════
   AUTOPASSPORT OS — Phase 2: Premium interactions
   Cursor reactive background · Card tilt · Stats counter · Advanced sub-tabs
   ══════════════════════════════════════════════════════════════════════════ */

/* ── Tab-visibility: pause orb animations & cursor tracking when hidden ── */
(function() {
  var html = document.documentElement;
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      html.classList.add('ap-tab-hidden');
    } else {
      html.classList.remove('ap-tab-hidden');
    }
  }, {passive: true});
})();

/* ── Cursor-reactive spotlight: throttled to 100ms, skipped on touch and
   when the user prefers reduced motion ── */
(function() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var bgLayer = document.getElementById('bg-layer');
  if (!bgLayer) return;
  var lastX = 0, lastY = 0, ticking = false;
  document.addEventListener('mousemove', function(e) {
    if (document.hidden) return; // skip invisible tab
    lastX = e.clientX; lastY = e.clientY;
    if (ticking) return;
    ticking = true;
    setTimeout(function() {
      bgLayer.style.setProperty('--cx', lastX + 'px');
      bgLayer.style.setProperty('--cy', lastY + 'px');
      ticking = false;
    }, 100);
  }, {passive: true});
})();

/* ── Card glow: CSS-only hover, no mousemove listeners ── */
/* (3D tilt and per-card mousemove removed — was firing on every mouse pixel) */

/* ── Animated KPI counter on dashboard ── */
function animateStatCounters() {
  document.querySelectorAll('.stat .v').forEach(function(el) {
    var txt = el.textContent.trim();
    var num = parseFloat(txt.replace(/[^0-9.]/g, ''));
    if (isNaN(num) || num === 0) return;
    var prefix = txt.match(/^[^0-9]*/)[0];
    var suffix = txt.replace(/^[^0-9]*[0-9,.]+/, '');
    var start = 0;
    var duration = 600;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * num);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

/* Run counter animation when dashboard becomes active */
var _origNav = typeof nav === 'function' ? nav : null;
nav = function(el) {
  if (_origNav) _origNav(el);
  if (el && el.dataset && el.dataset.screen === 'dashboard') {
    setTimeout(animateStatCounters, 80);
  }
};

/* Run on initial load if dashboard is active */
if (document.querySelector('#screen-dashboard.active')) {
  setTimeout(animateStatCounters, 200);
}

/* ── Advanced sub-tab switcher (vehicle record) ── */
function showAdvSub(id, btn) {
  /* Hide all sub-sections */
  document.querySelectorAll('.adv-sub').forEach(function(el) { el.style.display = 'none'; });
  /* Remove active state from all sub-buttons */
  if (btn && btn.closest) {
    var wrap = btn.closest('[data-pane="adv"]');
    if (wrap) wrap.querySelectorAll('button').forEach(function(b) {
      b.classList.remove('primary');
    });
  }
  /* Show target */
  var target = document.getElementById(id);
  if (target) target.style.display = 'block';
  if (btn) btn.classList.add('primary');
}

/* ── Returning Issue modal title update ── */
if (typeof openComebackModal === 'function') {
  var _origComebackModal = openComebackModal;
  openComebackModal = function() {
    _origComebackModal();
    var t = document.getElementById('comebackModalTitle');
    if (t) t.textContent = 'Returning Issue';
  };
}

/* ── Smooth screen transitions ── */
var _origGo = typeof go === 'function' ? go : null;
go = function(id) {
  if (_origGo) _origGo(id);
  /* Trigger counter animation for dashboard */
  if (id === 'dashboard') setTimeout(animateStatCounters, 100);
};

/* ── Skeleton loader utility ── */
function showSkeleton(container, rows) {
  var html = '';
  for (var i = 0; i < (rows || 3); i++) {
    html += '<div style="padding:10px 0;border-bottom:1px solid var(--line-2);">';
    html += '<div class="skeleton" style="height:12px;width:' + (60 + Math.random()*30) + '%;margin-bottom:6px;"></div>';
    html += '<div class="skeleton" style="height:10px;width:' + (30 + Math.random()*30) + '%;"></div>';
    html += '</div>';
  }
  container.innerHTML = html;
}

/* ── Filter bar selects glass styling (ensure inline styles get overridden) ── */
document.querySelectorAll('.filter-bar select, .filter-bar input[type="date"]').forEach(function(el) {
  el.style.removeProperty('border');
  el.style.removeProperty('background');
  el.style.removeProperty('border-radius');
});


/* ══════════════════════════════════════════════════════════════════════════
   AUTOPASSPORT OS — Phase 3: Login screen + final interaction polish
   ══════════════════════════════════════════════════════════════════════════ */

/* ── Login screen ── */
function enterApp(e){
  if(e) e.preventDefault();
  var ls = document.getElementById('login-screen');
  if(!ls) return;
  ls.classList.add('hidden');
  setTimeout(function(){ ls.style.display = 'none'; }, 420);
  /* Lazy-inject dashboard then trigger entrance */
  _injectScreen('dashboard');
  var dash = document.getElementById('screen-dashboard');
  if(dash){
    dash.classList.remove('active');
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        dash.classList.add('active');
        setTimeout(animateStatCounters, 180);
      });
    });
  }
}

/* Show login screen on load (unless previously dismissed in this session) */
(function(){
  var ls = document.getElementById('login-screen');
  if(!ls) return;
  /* Always show on fresh load */
  ls.style.display = 'flex';
  ls.style.opacity = '1';
  ls.style.transform = '';
})();

/* Login theme button label sync */
function updateLoginLangBtn(){
  var btn = document.getElementById('loginThemeBtn');
  if(btn) btn.textContent = document.documentElement.classList.contains('dark') ? '☀️ Light mode' : '🌙 Dark mode';
}

/* Override toggleTheme to keep login theme button synced */
var _origToggleTheme = typeof toggleTheme === 'function' ? toggleTheme : null;
toggleTheme = function(){
  if(_origToggleTheme) _origToggleTheme();
  updateLoginLangBtn();
};
updateLoginLangBtn();

/* ── Improved toast (centered bottom, no inline-start) ── */
var _origShowToast = typeof showToast === 'function' ? showToast : null;
showToast = function(msg, icon){
  var t = document.getElementById('toast');
  if(!t){
    if(_origShowToast) _origShowToast(msg);
    return;
  }
  t.innerHTML = (icon ? icon + ' ' : '✓ ') + msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(function(){ t.classList.remove('show'); }, 3200);
};

/* ── Animate KPI bars on screen entry ── */
function animateBars(){
  document.querySelectorAll('.bar > i').forEach(function(bar){
    var w = bar.style.width;
    bar.style.width = '0';
    requestAnimationFrame(function(){
      setTimeout(function(){ bar.style.width = w; }, 50);
    });
  });
}

/* Trigger bar animation on screen transitions */
var _origNavFn = typeof nav === 'function' ? nav : null;
nav = function(el){
  if(_origNavFn) _origNavFn(el);
  setTimeout(animateBars, 60);
};

/* Run bars on initial load */
setTimeout(animateBars, 400);

/* ── Button loading state helper ── */
function setButtonLoading(btn, loading){
  if(loading){
    btn.classList.add('loading');
    btn.disabled = true;
  } else {
    btn.classList.remove('loading');
    btn.disabled = false;
  }
}

/* ── Auto-hide login if on dark mode, update button ── */
document.addEventListener('DOMContentLoaded', function(){
  updateLoginLangBtn();
});

/* ── Keyboard: Enter on login screen ── */
document.addEventListener('keydown', function(e){
  var ls = document.getElementById('login-screen');
  if(!ls || ls.style.display === 'none') return;
  if(e.key === 'Enter'){
    var focusedInput = document.activeElement;
    if(focusedInput && focusedInput.closest('#login-screen')){
      enterApp(e);
    }
  }
  if(e.key === 'Escape' && ls && ls.style.display !== 'none'){
    enterApp(e);
  }
}, {capture: true});


/* ══════════════════════════════════════════════════════════════════
   Phase 4: Luxury final refinements
   Dynamic greeting · Champagne hover effects · Background enhancement
   ══════════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  /* Dynamic time-aware greeting */
  function updateGreeting() {
    var greetEl = document.querySelector('.dash-greeting');
    if (!greetEl) return;
    var hr = new Date().getHours();
    var prefix = hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
    greetEl.textContent = prefix + ', Rami';
  }
  updateGreeting();

  /* Update date in sub line */
  function updateDateLine() {
    var subEl = document.getElementById('vertTagline');
    if (!subEl) return;
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var d = new Date();
    var dayName = days[d.getDay()];
    var dateStr = dayName + ', ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
    var firstText = subEl.childNodes[0];
    if (firstText && firstText.nodeType === 3) {
      firstText.textContent = 'Al-Rawabi Auto Care · Workshop · ' + dateStr + ' ';
    }
  }
  updateDateLine();

  /* Parallax removed — scroll listener caused jank */

  /* Stat hover: CSS handles this now via .stat:hover rule */

  /* Premium number ticker for stat values when dashboard becomes visible */
  function tickerForStats() {
    document.querySelectorAll('.stat .v[data-target]').forEach(function(el) {
      var target = parseFloat(el.getAttribute('data-target'));
      if (isNaN(target)) return;
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var dec    = parseInt(el.getAttribute('data-dec') || '0');
      var start  = 0;
      var duration = 900;
      var startTime = null;
      function step(ts) {
        if (!startTime) startTime = ts;
        var prog = Math.min((ts - startTime) / duration, 1);
        var ease = 1 - Math.pow(1 - prog, 3);
        var val  = start + (target - start) * ease;
        el.textContent = prefix + val.toFixed(dec) + suffix;
        if (prog < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* Tickers run on screenchange event, no nav() wrapping needed */
  document.addEventListener('ap:screenchange', function(e) {
    if (e.detail && e.detail.id === 'dashboard') setTimeout(tickerForStats, 80);
  });

})();
