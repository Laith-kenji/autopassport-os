/* AutoPassport OS — lazy screen templates */
/* eslint-disable */
'use strict';
var SCREENS = {};

SCREENS["screen-dashboard"] = `<section class="screen" id="screen-dashboard">

      <!-- Welcome header -->
      <div class="dash-welcome">
        <div>
          <div class="dash-greeting">Good morning, Rami</div>
          <div class="dash-sub" id="vertTagline" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            Al-Rawabi Auto Care · Workshop · Thursday, 4 June 2026
            <span class="demo-data-badge">Demo Data</span>
          </div>
        </div>
        <div class="dash-head-actions">
          <button class="btn" onclick="openBookingWizard()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-calendar"/></svg></span> New Booking</button>
          <button class="btn primary" onclick="go('intake')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-camera"/></svg></span> Check In Vehicle</button>
        </div>
      </div>

      <!-- Quick action cards -->
      <div class="quick-actions">
        <div class="qa-card" onclick="openBookingWizard()" role="button" tabindex="0" aria-label="Create new booking">
          <div class="qa-icon"><svg viewBox="0 0 24 24"><use href="#ic-calendar"/></svg></div>
          <div><div class="qa-label">New Booking</div><div class="qa-sub">Schedule a service visit</div></div>
        </div>
        <div class="qa-card" onclick="go('intake')" role="button" tabindex="0" aria-label="Check in a vehicle">
          <div class="qa-icon teal"><svg viewBox="0 0 24 24"><use href="#ic-camera"/></svg></div>
          <div><div class="qa-label">Check In Vehicle</div><div class="qa-sub">Capture photos &amp; condition</div></div>
        </div>
        <div class="qa-card" onclick="openSearchOverlay()" role="button" tabindex="0" aria-label="Find a customer or vehicle">
          <div class="qa-icon amber"><svg viewBox="0 0 24 24"><use href="#ic-search"/></svg></div>
          <div><div class="qa-label">Find Customer</div><div class="qa-sub">Search by name, plate, or VIN</div></div>
        </div>
        <div class="qa-card" onclick="go('workorder')" role="button" tabindex="0" aria-label="Open active job">
          <div class="qa-icon green"><svg viewBox="0 0 24 24"><use href="#ic-tools"/></svg></div>
          <div><div class="qa-label">Open Active Job</div><div class="qa-sub">5 jobs in progress today</div></div>
        </div>
      </div>

      <!-- Live status strip -->
      <div class="ops-status-strip">
        <span class="ops-status-item active"><span class="osdot"></span> 9 checked in today</span>
        <span class="ops-sep"></span>
        <span class="ops-status-item active"><span class="osdot"></span> 5 in service</span>
        <span class="ops-sep"></span>
        <span class="ops-status-item warn"><span class="osdot"></span> 3 awaiting approval</span>
        <span class="ops-sep"></span>
        <span class="ops-status-item active"><span class="osdot"></span> 4 ready for pickup</span>
        <span class="ops-sep"></span>
        <span class="ops-status-item bad"><span class="osdot"></span> 2 delayed</span>
      </div>

      <!-- Glass filter bar -->
      <div class="filter-bar">
        <span class="ic ic-sm" style="color:var(--muted)"><svg viewBox="0 0 24 24"><use href="#ic-filter"/></svg></span>
        <input type="date" style="border:1px solid var(--line);border-radius:8px;padding:5px 9px;font-size:12px;background:var(--card);color:var(--ink);" value="2026-06-04"/>
        <select style="border:1px solid var(--line);background:var(--card);border-radius:8px;padding:5px 9px;font-size:12px;color:var(--ink);font-family:inherit;">
          <option>All Branches</option><option>Al-Rawabi Main</option><option>Al-Rawabi North</option>
        </select>
        <select style="border:1px solid var(--line);background:var(--card);border-radius:8px;padding:5px 9px;font-size:12px;color:var(--ink);font-family:inherit;">
          <option>All Bays</option><option>Bay 1</option><option>Bay 2</option><option>Bay 3</option><option>Bay 4</option>
        </select>
        <select style="border:1px solid var(--line);background:var(--card);border-radius:8px;padding:5px 9px;font-size:12px;color:var(--ink);font-family:inherit;">
          <option>All Technicians</option><option>Samir H.</option><option>Omar F.</option><option>Feras N.</option>
        </select>
        <select style="border:1px solid var(--line);background:var(--card);border-radius:8px;padding:5px 9px;font-size:12px;color:var(--ink);font-family:inherit;">
          <option>All Statuses</option><option>Booked</option><option>Checked In</option><option>In Service</option><option>Approval</option><option>QC</option><option>Ready</option>
        </select>
        <button class="reset-btn" onclick="resetFilters()" style="margin-inline-start:auto;border:none;background:transparent;color:var(--muted);font-size:12px;font-weight:600;cursor:pointer;padding:4px 8px;border-radius:7px;">Reset</button>
      </div>

      <!-- Attention panel -->
      <div class="alerts-panel">
        <div class="ap-head">
          <div class="ap-title"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-alert-triangle"/></svg></span><span data-i18n="alerts_title">Attention Required</span></div>
          <button class="ap-view" onclick="go('reports')" data-i18n="view_all">View All</button>
        </div>
        <div class="alert-row">
          <span class="alert-priority high"></span>
          <span class="ic ic-sm" style="color:var(--warn)"><svg viewBox="0 0 24 24"><use href="#ic-clock"/></svg></span>
          <span style="flex:1">Customer approval waiting <strong>32 minutes</strong> — Land Cruiser EST-558</span>
          <button class="btn sm primary" onclick="go('estimate')">Review Now</button>
        </div>
        <div class="alert-row">
          <span class="alert-priority high"></span>
          <span class="ic ic-sm" style="color:var(--bad)"><svg viewBox="0 0 24 24"><use href="#ic-alert-triangle"/></svg></span>
          <span style="flex:1">Job running late — Lexus RX · promised by 13:00</span>
          <button class="btn sm" onclick="go('workorder')">Open Job</button>
        </div>
        <div class="alert-row">
          <span class="alert-priority med"></span>
          <span class="ic ic-sm" style="color:var(--warn)"><svg viewBox="0 0 24 24"><use href="#ic-camera"/></svg></span>
          <span style="flex:1">Missing check-in photos — Nissan Patrol · 5 of 7 captured</span>
          <button class="btn sm" onclick="go('intake')">Add Photos</button>
        </div>
        <div class="alert-row">
          <span class="alert-priority med"></span>
          <span class="ic ic-sm" style="color:var(--warn)"><svg viewBox="0 0 24 24"><use href="#ic-package"/></svg></span>
          <span style="flex:1">Low stock — Brake pads C200 · only 4 units left</span>
          <button class="btn sm" onclick="go('inventory')">Reorder</button>
        </div>
        <div class="alert-row">
          <span class="alert-priority low"></span>
          <span class="ic ic-sm" style="color:var(--muted)"><svg viewBox="0 0 24 24"><use href="#ic-shield"/></svg></span>
          <span style="flex:1">Warranty expiring soon — Ceramic coating · Aug 2026</span>
          <button class="btn sm" onclick="openVehicle()">View</button>
        </div>
      </div>

      <!-- Summary stats (improved) -->
      <div class="summary-row">
        <div class="stat">
          <div class="stat-top">
            <div><div class="k">New Arrivals</div><div class="v">9</div></div>
            <div class="stat-ic-wrap teal"><svg viewBox="0 0 24 24"><use href="#ic-car"/></svg></div>
          </div>
          <div class="d up">↑ +2 vs daily average</div>
        </div>
        <div class="stat">
          <div class="stat-top">
            <div><div class="k">In Service</div><div class="v">5</div></div>
            <div class="stat-ic-wrap"><svg viewBox="0 0 24 24"><use href="#ic-tools"/></svg></div>
          </div>
          <div class="d">3 of 4 bays active</div>
        </div>
        <div class="stat">
          <div class="stat-top">
            <div><div class="k">Awaiting Approval</div><div class="v" style="color:var(--warn)">3</div></div>
            <div class="stat-ic-wrap amber"><svg viewBox="0 0 24 24"><use href="#ic-clock"/></svg></div>
          </div>
          <div class="d warn">2 waiting over 30 min</div>
        </div>
        <div class="stat">
          <div class="stat-top">
            <div><div class="k">Ready for Pickup</div><div class="v">4</div></div>
            <div class="stat-ic-wrap green"><svg viewBox="0 0 24 24"><use href="#ic-check-circle"/></svg></div>
          </div>
          <div class="d">Notify owners</div>
        </div>
        <div class="stat">
          <div class="stat-top">
            <div><div class="k">Revenue Today</div><div class="v" style="font-size:22px">JOD 1,840</div></div>
            <div class="stat-ic-wrap green"><svg viewBox="0 0 24 24"><use href="#ic-dollar"/></svg></div>
          </div>
          <div class="d up">↑ +18% vs yesterday</div>
        </div>
      </div>
      <!-- More KPIs toggle -->
      <button class="more-kpis-toggle" id="moreKpisBtn" onclick="toggleMoreKpis()">
        <span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-chevron-down"/></svg></span>
        <span>More KPIs</span>
      </button>
      <div class="more-kpis" id="moreKpis">
        <div class="stat">
          <div class="stat-top">
            <div><div class="k">Delayed Jobs</div><div class="v" style="color:var(--bad)">2</div></div>
            <div class="stat-ic-wrap red"><svg viewBox="0 0 24 24"><use href="#ic-alert-triangle"/></svg></div>
          </div>
          <div class="d down">Needs immediate attention</div>
        </div>
        <div class="stat">
          <div class="stat-top">
            <div><div class="k">Bay Utilization</div><div class="v">74%</div></div>
            <div class="stat-ic-wrap"><svg viewBox="0 0 24 24"><use href="#ic-bar-chart"/></svg></div>
          </div>
          <div class="d">3 of 4 bays active</div>
        </div>
        <div class="stat">
          <div class="stat-top">
            <div><div class="k">Photo Compliance</div><div class="v" style="color:var(--warn)">86%</div></div>
            <div class="stat-ic-wrap amber"><svg viewBox="0 0 24 24"><use href="#ic-camera"/></svg></div>
          </div>
          <div class="d warn">2 jobs missing photos</div>
        </div>
      </div>

      <!-- Today Board (kanban) -->
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
          <h3 style="margin:0" id="boardTitle">Today's Jobs <span class="card-sub">· live overview</span></h3>
          <div style="display:flex;gap:6px;">
            <button class="btn sm ghost" onclick="go('calendar')">Expand</button>
          </div>
        </div>
        <div class="kanban">
          <!-- Booked -->
          <div class="kcol"><h4>Booked <span>2</span></h4>
            <div class="kcard" onclick="openVehicle()">
              <div class="car">Toyota Land Cruiser 2023</div>
              <div class="kcard-plate">22-41-988</div>
              <div class="meta">Khalid Mansour · 10:30</div>
              <div class="kcard-action">
                <button class="kcard-primary-btn" onclick="event.stopPropagation();go('intake')">
                  <span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-camera"/></svg></span> Check In
                </button>
                <div class="kcard-menu-wrap"><button class="kcard-menu-btn" onclick="event.stopPropagation();toggleKcardMenu(this)">⋯</button><div class="kcard-menu"><button onclick="openVehicle()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-car"/></svg></span>Vehicle Passport</button><button onclick="WF.assignTech('WO-2041')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-users"/></svg></span>Assign Tech</button><div class="kcard-menu-sep"></div><button onclick="WF.simulateWhatsApp('Customer','+962 79 555 0101')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-message"/></svg></span>Send WhatsApp</button></div></div>
              </div>
            </div>
            <div class="kcard" onclick="go('customers')">
              <div class="car">Kia Sportage 2021</div>
              <div class="kcard-plate">44-21-007</div>
              <div class="meta">Rami Aziz · 11:15</div>
              <div class="kcard-action">
                <button class="kcard-primary-btn" onclick="event.stopPropagation();go('intake')">
                  <span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-camera"/></svg></span> Check In
                </button>
                <div class="kcard-menu-wrap"><button class="kcard-menu-btn" onclick="event.stopPropagation();toggleKcardMenu(this)">⋯</button><div class="kcard-menu"><button onclick="go('customers')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-file-text"/></svg></span>View Details</button><button onclick="WF.simulateWhatsApp('Customer','+962 79 555 0101')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-message"/></svg></span>Send WhatsApp</button></div></div>
              </div>
            </div>
          </div>
          <!-- Checked In -->
          <div class="kcol"><h4>Checked In <span>2</span></h4>
            <div class="kcard" onclick="go('intake')">
              <div class="car">Nissan Patrol 2022</div>
              <div class="kcard-plate">18-90-441</div>
              <div class="meta">Saeed Al-Otaibi</div>
              <div class="kcard-action">
                <button class="kcard-primary-btn warn" onclick="event.stopPropagation();go('intake')" style="background:var(--warn)">
                  <span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-camera"/></svg></span> Add Photos
                </button>
                <div class="kcard-menu-wrap"><button class="kcard-menu-btn" onclick="event.stopPropagation();toggleKcardMenu(this)">⋯</button><div class="kcard-menu"><button onclick="WF.assignTech('WO-2041')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-users"/></svg></span>Assign Tech</button><button onclick="WF.simulateWhatsApp('Customer','+962 79 555 0101')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-message"/></svg></span>Send WhatsApp</button></div></div>
              </div>
            </div>
            <div class="kcard" onclick="go('intake')">
              <div class="car">Hyundai Tucson 2020</div>
              <div class="kcard-plate">55-33-812</div>
              <div class="meta">Hana Darwish · Awaiting bay</div>
              <div class="kcard-action">
                <button class="kcard-primary-btn teal" onclick="event.stopPropagation();go('intake')">
                  Start Intake
                </button>
                <div class="kcard-menu-wrap"><button class="kcard-menu-btn" onclick="event.stopPropagation();toggleKcardMenu(this)">⋯</button><div class="kcard-menu"><button onclick="WF.assignTech('WO-2042')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-tools"/></svg></span>Assign Bay</button></div></div>
              </div>
            </div>
          </div>
          <!-- In Service -->
          <div class="kcol"><h4>In Service <span>2</span></h4>
            <div class="kcard" onclick="go('workorder')">
              <div class="car">Mercedes C200 2019</div>
              <div class="kcard-plate">31-77-204</div>
              <div class="meta">Lara Haddad · Samir H.</div>
              <div class="kcard-action">
                <button class="kcard-primary-btn teal" onclick="event.stopPropagation();go('workorder')">
                  Open Job
                </button>
                <div class="kcard-menu-wrap"><button class="kcard-menu-btn" onclick="event.stopPropagation();toggleKcardMenu(this)">⋯</button><div class="kcard-menu"><button onclick="WF.simulateWhatsApp('Customer','+962 79 555 0101')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-message"/></svg></span>Message Customer</button><button onclick="go('estimate')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-file-text"/></svg></span>Request Approval</button></div></div>
              </div>
            </div>
            <div class="kcard kcard-late" onclick="go('workorder')" style="border-color:var(--bad);">
              <div class="car">Ford Ranger 2023</div>
              <div class="kcard-plate">40-12-665</div>
              <div class="meta">Tariq Nawfal · <span style="color:var(--bad);font-weight:700">Late</span></div>
              <div class="kcard-action">
                <button class="kcard-primary-btn" style="background:var(--bad)" onclick="event.stopPropagation();go('workorder')">
                  Open Job
                </button>
                <div class="kcard-menu-wrap"><button class="kcard-menu-btn" onclick="event.stopPropagation();toggleKcardMenu(this)">⋯</button><div class="kcard-menu"><button onclick="WF.simulateWhatsApp('Customer','+962 79 555 0101')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-message"/></svg></span>Message Customer</button></div></div>
              </div>
            </div>
          </div>
          <!-- Approval -->
          <!-- Approval -->
          <div class="kcol"><h4>Approval Needed <span>1</span></h4>
            <div class="kcard" onclick="go('estimate')" style="border-color:rgba(217,119,6,.35);">
              <div class="car">Toyota Land Cruiser 2023</div>
              <div class="kcard-plate">22-41-988</div>
              <div class="meta">Khalid Mansour · EST-558</div>
              <div class="kcard-action">
                <button class="kcard-primary-btn" style="background:var(--warn)" onclick="event.stopPropagation();go('estimate')">
                  Review Approval
                </button>
                <div class="kcard-menu-wrap"><button class="kcard-menu-btn" onclick="event.stopPropagation();toggleKcardMenu(this)">⋯</button><div class="kcard-menu"><button onclick="WF.simulateWhatsApp('Customer','+962 79 555 0142')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-message"/></svg></span>Send Reminder</button></div></div>
              </div>
            </div>
          </div>
          <!-- QC -->
          <div class="kcol"><h4>Quality Check <span>1</span></h4>
            <div class="kcard" onclick="go('workorder')">
              <div class="car">Lexus RX 2022</div>
              <div class="kcard-plate">33-08-219</div>
              <div class="meta">Dana Ziadeh · Final inspection</div>
              <div class="kcard-action">
                <button class="kcard-primary-btn teal" onclick="event.stopPropagation();go('workorder')">
                  <span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-camera"/></svg></span> Add Photo
                </button>
                <div class="kcard-menu-wrap"><button class="kcard-menu-btn" onclick="event.stopPropagation();toggleKcardMenu(this)">⋯</button><div class="kcard-menu"><button onclick="go('workorder')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-check-circle"/></svg></span>Complete Inspection</button></div></div>
              </div>
            </div>
          </div>
          <!-- Ready -->
          <div class="kcol"><h4>Ready for Pickup <span>1</span></h4>
            <div class="kcard" onclick="go('invoices')">
              <div class="car">Honda Accord 2021</div>
              <div class="kcard-plate">27-55-310</div>
              <div class="meta">Maya Khalil · Paid</div>
              <div class="kcard-action">
                <button class="kcard-primary-btn good" onclick="event.stopPropagation();showToast('WhatsApp pickup notification sent to Maya Khalil')">
                  Notify Customer
                </button>
                <div class="kcard-menu-wrap"><button class="kcard-menu-btn" onclick="event.stopPropagation();toggleKcardMenu(this)">⋯</button><div class="kcard-menu"><button onclick="go('invoices')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-credit-card"/></svg></span>Collect Payment</button><button onclick="openVehicle()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-car"/></svg></span>Open Passport</button></div></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile kanban (stacked) -->
        <div class="kanban-mobile">
          <div class="kmob-group"><button class="kmob-group-hd" onclick="this.parentNode.querySelector('.kmob-group-body').classList.toggle('hidden')" style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border:none;background:transparent;width:100%;font-size:12.5px;font-weight:700;color:var(--ink);cursor:pointer;border-radius:var(--radius-sm)">In Service <span class="count" style="background:var(--bg-2);color:var(--muted);border-radius:20px;padding:1px 8px;font-size:11px;">2</span></button><div class="kmob-group-body" style="border-top:1px solid var(--line);padding:6px"><div class="kmob-card" onclick="go('workorder')"><div><div class="car">Mercedes C200 2019</div><div class="meta" style="color:var(--muted);font-size:11.5px">Samir H. · Brakes · 08:30</div></div><span class="pill teal">In Service</span></div><div class="kmob-card kcard-late" onclick="go('workorder')"><div><div class="car">Ford Ranger 2023</div><div class="meta" style="color:var(--muted);font-size:11.5px">Tariq Nawfal · Tires</div></div><span class="pill bad">Late</span></div></div></div>
          <div class="kmob-group"><button class="kmob-group-hd" onclick="this.parentNode.querySelector('.kmob-group-body').classList.toggle('hidden')" style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border:none;background:transparent;width:100%;font-size:12.5px;font-weight:700;color:var(--ink);cursor:pointer;border-radius:var(--radius-sm)">Checked In <span class="count" style="background:var(--bg-2);color:var(--muted);border-radius:20px;padding:1px 8px;font-size:11px;">2</span></button><div class="kmob-group-body" style="border-top:1px solid var(--line);padding:6px"><div class="kmob-card" onclick="go('intake')"><div><div class="car">Nissan Patrol 2022</div><div class="meta" style="color:var(--muted);font-size:11.5px">Saeed Al-Otaibi · Photos 5/7</div></div><span class="pill warn">Photos</span></div><div class="kmob-card" onclick="go('intake')"><div><div class="car">Hyundai Tucson 2020</div><div class="meta" style="color:var(--muted);font-size:11.5px">Hana Darwish · Awaiting bay</div></div><span class="pill gray">Waiting</span></div></div></div>
          <div class="kmob-group"><button class="kmob-group-hd" onclick="this.parentNode.querySelector('.kmob-group-body').classList.toggle('hidden')" style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border:none;background:transparent;width:100%;font-size:12.5px;font-weight:700;color:var(--ink);cursor:pointer;border-radius:var(--radius-sm)">Awaiting Approval <span class="count" style="background:var(--bg-2);color:var(--muted);border-radius:20px;padding:1px 8px;font-size:11px;">1</span></button><div class="kmob-group-body" style="border-top:1px solid var(--line);padding:6px"><div class="kmob-card" onclick="go('estimate')"><div><div class="car">Land Cruiser 2023</div><div class="meta" style="color:var(--muted);font-size:11.5px">EST-558 · JOD 420 · 32 min pending</div></div><span class="pill warn">Pending</span></div></div></div>
          <div class="kmob-group"><button class="kmob-group-hd" onclick="this.parentNode.querySelector('.kmob-group-body').classList.toggle('hidden')" style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border:none;background:transparent;width:100%;font-size:12.5px;font-weight:700;color:var(--ink);cursor:pointer;border-radius:var(--radius-sm)">Ready <span class="count" style="background:var(--bg-2);color:var(--muted);border-radius:20px;padding:1px 8px;font-size:11px;">1</span></button><div class="kmob-group-body" style="border-top:1px solid var(--line);padding:6px"><div class="kmob-card" onclick="go('invoices')"><div><div class="car">Honda Accord 2021</div><div class="meta" style="color:var(--muted);font-size:11.5px">Maya Khalil · Paid</div></div><span class="pill good">Ready</span></div></div></div>
        </div>
      </div>

      <!-- Events + KPI + Insights -->
      <div class="grid" style="grid-template-columns:1.3fr 1fr;margin-bottom:16px;">
        <div class="card">
          <h3>Recent Passport Events</h3>
          <div class="events">
            <div class="ev"><div class="dot"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-wrench"/></svg></span></div><div class="body"><div class="t">Major service completed <span class="prov verified">VERIFIED</span></div><div class="m">Land Cruiser 2023 · oil, filters, brake fluid</div></div><div class="when">2h ago</div></div>
            <div class="ev"><div class="dot"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-camera"/></svg></span></div><div class="body"><div class="t">Intake evidence captured <span class="prov verified">VERIFIED</span></div><div class="m">Nissan Patrol · 5 of 7 angles</div></div><div class="when">3h ago</div></div>
            <div class="ev"><div class="dot"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-file"/></svg></span></div><div class="body"><div class="t">Insurance report imported <span class="prov imported">IMPORTED</span></div><div class="m">Mercedes C200 · uploaded PDF</div></div><div class="when">Yesterday</div></div>
            <div class="ev"><div class="dot"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-alert-triangle"/></svg></span></div><div class="body"><div class="t">Warranty expiring in 14 days</div><div class="m">Land Cruiser · ceramic coating · Aug 2026</div></div><div class="when">Alert</div></div>
            <div class="ev"><div class="dot"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-message"/></svg></span></div><div class="body"><div class="t">Declined work reminder sent</div><div class="m">Honda Accord · wheel alignment · JOD 60</div></div><div class="when">1h ago</div></div>
          </div>
        </div>
        <div class="card">
          <h3 data-i18n="perf_title">Performance KPIs</h3>
          <div class="kpi-row">
            <div class="kpi"><div class="v">JOD 205</div><div class="k">Avg ticket</div><div class="bar"><i style="width:68%"></i></div></div>
            <div class="kpi"><div class="v">84%</div><div class="k">Approval rate</div><div class="bar"><i style="width:84%"></i></div></div>
            <div class="kpi"><div class="v">91%</div><div class="k">Photo compliance</div><div class="bar"><i style="width:91%"></i></div></div>
            <div class="kpi"><div class="v">62%</div><div class="k">Repeat rate</div><div class="bar"><i style="width:62%"></i></div></div>
          </div>
          <div style="margin-top:14px;display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h3 style="margin:0" data-i18n="insights_title">Insights</h3><span class="beta-label">✦ Simulated Beta Insight</span>
          </div>
          <div class="insight-item"><div class="ii-ic"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-trending-up"/></svg></span></div><div class="ii-body"><div class="ii-t">Upsell opportunity · 3 vehicles</div><div class="ii-m">Tire replacement predicted within 30 days based on mileage trend</div></div></div>
          <div class="insight-item"><div class="ii-ic"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-alert-triangle"/></svg></span></div><div class="ii-body"><div class="ii-t">Returning Issue Risk · Honda Accord</div><div class="ii-m">Same issue reported in two consecutive visits</div></div></div>
          <div class="insight-item"><div class="ii-ic"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-package"/></svg></span></div><div class="ii-body"><div class="ii-t">Low stock forecast · Brake pad set</div><div class="ii-m">Current stock 4 units · predicted to deplete in 3 days</div></div></div>
        </div>
      </div>

      <!-- Sample vehicle cards -->
      <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          <h3 style="margin:0">Vehicles Active Today</h3>
          <button class="btn sm" onclick="go('customers')">View All</button>
        </div>
        <div class="veh-grid" id="vehGridDash" style="margin-top:0;"></div>
      </div>
    </section>`;

SCREENS["screen-customers"] = `<section class="screen" id="screen-customers">
      <div class="page-head">
        <div>
          <h1>Customers &amp; Vehicles</h1>
          <div class="sub">6 vehicles in the system · click any to open the Vehicle Record</div>
        </div>
        <div class="head-actions">
          <button class="btn" onclick="openSearchOverlay()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-search"/></svg></span> Search</button>
          <button class="btn primary" onclick="WF._addVehicleForCustomer()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-plus"/></svg></span> Add Vehicle</button>
        </div>
      </div>
      <div class="veh-grid" id="vehGrid"></div>
    </section>`;

SCREENS["screen-vehicle"] = `<section class="screen" id="screen-vehicle">
      <!-- Vehicle context strip (improved) -->
      <div class="veh-ctx">
        <span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-car"/></svg></span>
        <span class="vname">Toyota Land Cruiser 2023</span>
        <span class="vsep">|</span>
        <span>22-41-988</span>
        <span class="vsep">|</span>
        <span>68,420 km</span>
        <span class="vsep">|</span>
        <span>Khalid Mansour</span>
        <span class="vpill warn">Approval pending</span>
        <span class="vpill ok">7 verified</span>
        <span class="vpill">1 warranty</span>
        <span class="vpill warn">1 declined</span>
        <div class="vctx-right">
          <span class="vctx-badge shop"><span class="ic ic-sm" style="vertical-align:middle"><svg viewBox="0 0 24 24"><use href="#ic-shield"/></svg></span> Shop Private</span>
          <span class="vctx-badge pub"><span class="ic ic-sm" style="vertical-align:middle"><svg viewBox="0 0 24 24"><use href="#ic-globe"/></svg></span> Passport</span>
        </div>
      </div>

      <div class="page-head" style="margin-top:12px;">
        <div><h1>Toyota Land Cruiser 2023 <span style="font-size:14px;color:var(--muted);font-weight:400">· ID #VH-1042</span></h1></div>
        <div class="head-actions">
          <!-- Primary contextual action -->
          <button class="btn primary" onclick="go('estimate')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-file-text"/></svg></span> View Approval</button>
          <!-- Secondary actions -->
          <div class="wo-sec-wrap">
            <button class="btn" onclick="toggle3dot(this)"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-more"/></svg></span> More</button>
            <div class="wo-sec-menu">
              <button onclick="openBookingWizard()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-calendar"/></svg></span> New Booking</button>
              <button onclick="go('intake')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-camera"/></svg></span> Start Intake</button>
              <button onclick="go('workorder')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-tools"/></svg></span> Open Work Order</button>
              <div class="wo-sec-menu-sep"></div>
              <button onclick="openShareModal()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-share"/></svg></span> Share Passport</button>
              <button onclick="WF.printInvoice('INV-4401')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-download"/></svg></span> Export PDF</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Vehicle Record Quality (formerly Vehicle Record Quality) -->
      <div class="trust-score" style="margin-bottom:14px;">
        <div class="record-quality-ring"><div class="record-quality-ring-inner">86</div></div>
        <div class="trust-meta">
          <div class="score-label">Vehicle Record Quality <span class="trust-tip" data-i18n="trust_tip" data-i18n-target="data-tip" data-tip="Record Quality shows how complete and verified this vehicle's service history is.">?</span></div>
          <div class="score-title">Strong · 7 verified service events on record</div>
          <div class="trust-break">
            <div class="tb-item"><div class="tb-v">7</div><div class="tb-k">Verified Events</div></div>
            <div class="tb-item"><div class="tb-v">2</div><div class="tb-k">Imported Docs</div></div>
            <div class="tb-item"><div class="tb-v">1</div><div class="tb-k">Owner Added</div></div>
            <div class="tb-item"><div class="tb-v">3</div><div class="tb-k">Warranties</div></div>
            <div class="tb-item"><div class="tb-v">74%</div><div class="tb-k">Resale Ready</div></div>
          </div>
        </div>
      </div>

      <!-- Vehicle header card -->
      <div class="card" style="margin-bottom:14px;">
        <div class="veh-header">
          <div class="veh-hero"><svg viewBox="0 0 24 24" style="width:40px;height:40px;stroke:#9aaecc;fill:none;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round"><use href="#ic-car"/></svg></div>
          <div style="flex:1">
            <div class="specs">
              <div class="spec"><div class="k">VIN</div><div class="v" style="font-family:ui-monospace,monospace;font-size:12px">JTMHV05J204871</div></div>
              <div class="spec"><div class="k">Plate</div><div class="v">22-41-988</div></div>
              <div class="spec"><div class="k">Mileage</div><div class="v">68,420 km</div></div>
              <div class="spec"><div class="k">Owner</div><div class="v">Khalid Mansour</div></div>
              <div class="spec"><div class="k">Phone</div><div class="v">+962 79 555 0142</div></div>
              <div class="spec"><div class="k">Last service</div><div class="v">12 Mar 2026</div></div>
              <div class="spec"><div class="k">Next reminder</div><div class="v" style="color:var(--accent-2)">73,000 km · Aug 2026</div></div>
              <div class="spec"><div class="k">Status</div><div class="v"><span class="pill warn">Approval pending</span></div></div>
              <div class="spec"><div class="k">Branch</div><div class="v">Al-Rawabi Main</div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vehicle profile tabs — 3 top-level only -->
      <div class="veh-tabs-wrap">
        <div class="tabs" id="vehTabs" style="border-bottom:none;">
          <div class="tab active" data-tab="ov" onclick="vehTab(this)">Overview</div>
          <div class="tab" data-tab="tl" onclick="vehTab(this)">History &amp; Documents</div>
          <div class="tab" data-tab="adv" onclick="vehTab(this)">Advanced</div>
        </div>
      </div>

      <!-- Overview -->
      <div class="tabpane active" data-pane="ov">
        <div class="grid" style="grid-template-columns:1fr 1fr;">
          <div class="card">
            <h3>Vehicle Summary <span class="record-badge shop" style="margin-inline-start:6px;font-size:9px;">🔒 Shop Private</span></h3>
            <p style="color:var(--muted);font-size:13px;margin:0 0 10px">Owned since 2023 · serviced exclusively at Al-Rawabi · 7 verified events on record.</p>
            <table class="tbl">
              <tr><td>Engine</td><td>3.5L V6 Twin Turbo</td></tr>
              <tr><td>Service plan</td><td>Premium (active)</td></tr>
              <tr><td>Open work orders</td><td>1 (WO-2042)</td></tr>
              <tr><td>Photo compliance</td><td><span class="pill good">93%</span></td></tr>
              <tr><td>Total service visits</td><td>7</td></tr>
              <tr><td>Declined work items</td><td><span class="pill warn">1 open</span></td></tr>
              <tr><td>Active warranties</td><td>3</td></tr>
            </table>
          </div>
          <div class="card">
            <h3>Upcoming &amp; Reminders <span class="record-badge customer" style="margin-inline-start:6px;font-size:9px;">🌐 Customer Visible</span></h3>
            <div class="events">
              <div class="ev"><div class="dot"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-clock"/></svg></span></div><div class="body"><div class="t">Oil change due</div><div class="m">at 73,000 km</div></div><div class="when">~Aug</div></div>
              <div class="ev"><div class="dot"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-tools"/></svg></span></div><div class="body"><div class="t">Tire rotation</div><div class="m">recommended</div></div><div class="when">2 mo</div></div>
              <div class="ev"><div class="dot"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-shield"/></svg></span></div><div class="body"><div class="t">Ceramic warranty expiring</div><div class="m">Aug 2026 · renewal recommended</div></div><div class="when">soon</div></div>
              <div class="ev"><div class="dot"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-file-text"/></svg></span></div><div class="body"><div class="t">Annual inspection</div><div class="m">registration renewal</div></div><div class="when">Oct</div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline tab -->
      <div class="tabpane" data-pane="tl">
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <h3 style="margin:0">Verified Timeline <span class="record-badge customer" style="margin-inline-start:6px;font-size:9px;">🌐 Customer Shareable</span></h3>
          </div>
          <div class="chips" id="tlChips">
            <div class="chip on" onclick="filterChip(this,'all')">All</div>
            <div class="chip" onclick="filterChip(this,'verified')">Verified Partner</div>
            <div class="chip" onclick="filterChip(this,'imported')">Imported Doc</div>
            <div class="chip" onclick="filterChip(this,'owner')">Owner Added</div>
            <div class="chip" onclick="filterChip(this,'service')">Service</div>
            <div class="chip" onclick="filterChip(this,'warranty')">Warranty</div>
            <div class="chip" onclick="filterChip(this,'detailing')">Detailing</div>
          </div>
          <div class="events">
            <div class="ev"><div class="dot"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-wrench"/></svg></span></div><div class="body"><div class="t">Major service · 60k <span class="prov verified">VERIFIED PARTNER</span> <span class="pill gray" style="font-size:9px">Shared</span></div><div class="m">Al-Rawabi Auto Care · oil, filters, brake fluid, inspection · 14 photos · <strong>WO-2042</strong></div><div class="m" style="margin-top:2px">68,100 km · Al-Rawabi Main branch</div></div><div class="when">12 Mar 2026</div></div>
            <div class="ev"><div class="dot"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-file"/></svg></span></div><div class="body"><div class="t">Insurance claim report <span class="prov imported">IMPORTED DOC</span> <span class="pill gray" style="font-size:9px">Private</span></div><div class="m">Front bumper · uploaded PDF from owner · document #INS-2026-0204</div></div><div class="when">2 Feb 2026</div></div>
            <div class="ev"><div class="dot"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-tools"/></svg></span></div><div class="body"><div class="t">Tire rotation <span class="prov owner">OWNER ADDED</span> <span class="pill gray" style="font-size:9px">Owner Only</span></div><div class="m">Self-reported by Khalid · unverified mileage: 65,200 km</div></div><div class="when">18 Jan 2026</div></div>
            <div class="ev"><div class="dot"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-check-circle"/></svg></span></div><div class="body"><div class="t">Battery replaced <span class="prov verified">VERIFIED PARTNER</span> <span class="pill gray" style="font-size:9px">Shared</span></div><div class="m">Al-Rawabi · Bosch S5 · 24-month warranty issued · 3 photos</div></div><div class="when">5 Nov 2025</div></div>
            <div class="ev"><div class="dot"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-star"/></svg></span></div><div class="body"><div class="t">Full detailing + ceramic coating <span class="prov verified">VERIFIED PARTNER</span> <span class="pill gray" style="font-size:9px">Shared</span></div><div class="m">Al-Rawabi Detailing · 12-month ceramic warranty · 12 photos</div></div><div class="when">20 Aug 2025</div></div>
          </div>
        </div>
      </div>

      <!-- Evidence tab -->
      <div class="tabpane" data-pane="ev">
        <!-- Photo Evidence History (formerly Media Chain of Custody) -->
        <div class="card" style="margin-bottom:14px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <h3 style="margin:0">Photo Evidence History <span class="card-sub">· verified &amp; timestamped</span></h3>
            <span class="record-badge shop" style="font-size:9px;">🔒 Shop Private Record</span>
          </div>
          <div class="custody-grid">
            <div class="custody-card ok">
              <span class="ic ic-lg"><svg viewBox="0 0 24 24"><use href="#ic-camera"/></svg></span>
              <div class="cc-title">Intake Complete</div>
              <div class="cc-sub">6/7 angles captured</div>
            </div>
            <div class="custody-card ok">
              <span class="ic ic-lg"><svg viewBox="0 0 24 24"><use href="#ic-wrench"/></svg></span>
              <div class="cc-title">During-Service OK</div>
              <div class="cc-sub">3 photos · parts logged</div>
            </div>
            <div class="custody-card pending">
              <span class="ic ic-lg"><svg viewBox="0 0 24 24"><use href="#ic-clock"/></svg></span>
              <div class="cc-title">Handover Pending</div>
              <div class="cc-sub">Final photos needed</div>
            </div>
            <div class="custody-card ok">
              <span class="ic ic-lg"><svg viewBox="0 0 24 24"><use href="#ic-shield"/></svg></span>
              <div class="cc-title">Integrity Verified</div>
              <div class="cc-sub">Hash-timestamped</div>
            </div>
          </div>
        </div>

        <!-- Before & After Review -->
        <div class="card" style="margin-bottom:14px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <h3 style="margin:0">Before &amp; After Review</h3>
            <span class="beta-label">✦ Simulated · concept only</span>
          </div>
          <div class="delta-compare">
            <div class="delta-slot"><div class="dsl">BEFORE</div>📷 Intake photo placeholder</div>
            <div class="delta-slot"><div class="dsl">AFTER</div>📷 Post-service photo placeholder</div>
          </div>
          <div class="delta-finding"><div class="df-ic">✅</div><div>No new exterior damage detected</div></div>
          <div class="delta-finding"><div class="df-ic">✅</div><div>Existing scratch on rear-left bumper unchanged</div></div>
          <div class="delta-finding"><div class="df-ic">✅</div><div>Tire wear appears consistent with logged mileage</div></div>
          <div class="delta-finding"><div class="df-ic">✅</div><div>Interior condition confirmed · no new marks</div></div>
          <div class="delta-finding"><div class="df-ic">⚠️</div><div><strong>Manual review required</strong> · one image at low resolution</div></div>
          <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;">
            <button class="btn sm good" style="background:var(--good-soft);border-color:#b8e0cc;color:var(--good)" onclick="showToast('Finding confirmed')">✓ Confirm finding</button>
            <button class="btn sm" onclick="showToast('Flagged for manager review')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-warning"/></svg></span> Flag for review</button>
            <button class="btn sm primary" onclick="showToast('Note added to customer passport')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-edit"/></svg></span> Add customer note</button>
          </div>
        </div>

        <!-- Evidence photos -->
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <h3 style="margin:0">Evidence — last visit · WO-2042</h3>
            <span class="record-badge customer" style="font-size:9px;">🌐 Customer Visible</span>
          </div>
          <div class="photo-grid">
            <div class="photo-slot filled" onclick="openEvidenceModal('Front intake','Before','12 Mar 2026 08:41','Rami A. (reception)','hash-verified')"><div class="stage-tag">BEFORE</div><span class="lab">Front</span><span class="badge">🔐</span></div>
            <div class="photo-slot filled" onclick="openEvidenceModal('Rear intake','Before','12 Mar 2026 08:42','Rami A. (reception)','hash-verified')"><div class="stage-tag">BEFORE</div><span class="lab">Rear</span><span class="badge">🔐</span></div>
            <div class="photo-slot filled" onclick="openEvidenceModal('Left side','Before','12 Mar 2026 08:43','Rami A. (reception)','hash-verified')"><div class="stage-tag">BEFORE</div><span class="lab">Left</span><span class="badge">🔐</span></div>
            <div class="photo-slot filled" onclick="openEvidenceModal('Right side','Before','12 Mar 2026 08:44','Rami A. (reception)','hash-verified')"><div class="stage-tag">BEFORE</div><span class="lab">Right</span><span class="badge">🔐</span></div>
            <div class="photo-slot filled" onclick="openEvidenceModal('Old brake pads','During','12 Mar 2026 11:20','Samir H. (tech)','timestamped')"><div class="stage-tag">DURING</div><span class="lab">Old pads</span><span class="badge">⏱</span></div>
            <div class="photo-slot filled" onclick="openEvidenceModal('Rotor condition','During','12 Mar 2026 11:35','Samir H. (tech)','timestamped')"><div class="stage-tag">DURING</div><span class="lab">Rotor</span><span class="badge">⏱</span></div>
            <div class="photo-slot"><span class="lab">After</span>＋ capture</div>
          </div>
        </div>
      </div>

      <!-- Documents tab -->
      <div class="tabpane" data-pane="doc">
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <h3 style="margin:0">Documents</h3>
            <button class="btn sm primary" onclick="showToast('Document upload dialog opened (concept)')">＋ Upload document</button>
          </div>
          <table class="tbl"><thead><tr><th>Document</th><th>Type</th><th>Provenance</th><th>Visibility</th><th>Date</th></tr></thead><tbody>
            <tr><td>📄 Service invoice INV-3081</td><td>Invoice</td><td><span class="prov verified">VERIFIED</span></td><td><span class="pill good">Shared</span></td><td>12 Mar 2026</td></tr>
            <tr><td>📄 Insurance claim report</td><td>PDF</td><td><span class="prov imported">IMPORTED</span></td><td><span class="pill gray">Private</span></td><td>2 Feb 2026</td></tr>
            <tr><td>📄 Battery warranty card</td><td>Warranty</td><td><span class="prov verified">VERIFIED</span></td><td><span class="pill good">Shared</span></td><td>5 Nov 2025</td></tr>
            <tr><td>📄 Ceramic coating warranty</td><td>Warranty</td><td><span class="prov verified">VERIFIED</span></td><td><span class="pill good">Shared</span></td><td>20 Aug 2025</td></tr>
          </tbody></table>
        </div>
      </div>

      <!-- Warranty Wallet tab -->
      <div class="tabpane" data-pane="war">
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <h3 style="margin:0">Warranty Wallet <span class="record-badge customer" style="margin-inline-start:6px;font-size:9px;">🌐 Customer Visible</span></h3>
            <button class="btn sm primary" onclick="showToast('Add warranty dialog opened (concept)')">＋ Add warranty</button>
          </div>
          <table class="tbl"><thead><tr><th>Item</th><th>Provider</th><th>Branch</th><th>Coverage</th><th>Expires</th><th>Days left</th><th>Status</th><th>Action</th></tr></thead><tbody>
            <tr><td>🔋 Battery (Bosch S5)</td><td>Al-Rawabi</td><td>Main</td><td>24 months · replacement</td><td>Nov 2027</td><td>531</td><td><span class="pill good">Active</span></td><td><button class="btn sm" onclick="showToast('Warranty claim filed · ref WRN-' + Math.floor(Math.random()*1000+100))">Claim</button></td></tr>
            <tr><td>✨ Ceramic coating</td><td>Al-Rawabi</td><td>Main</td><td>12 months · re-application</td><td>Aug 2026</td><td>77</td><td><span class="pill warn">Expiring</span></td><td><button class="btn sm" onclick="showToast('Renewal reminder sent')">Renew</button></td></tr>
            <tr><td>🛑 Brake pads · service promise</td><td>Al-Rawabi</td><td>Main</td><td>6 months · re-service</td><td>Sep 2026</td><td>112</td><td><span class="pill good">Active</span></td><td><button class="btn sm" onclick="showToast('Brake pads warranty · active until Sep 2026')">View</button></td></tr>
            <tr><td>🛞 Tire warranty (Michelin)</td><td>Michelin MENA</td><td>—</td><td>5 yr / 80k km</td><td>Jan 2028</td><td>578</td><td><span class="pill good">Active</span></td><td><button class="btn sm" onclick="showToast('Michelin tire warranty · active until Jan 2028')">View</button></td></tr>
          </tbody></table>
        </div>
      </div>

      <!-- Recommended Work tab -->
      <div class="tabpane" data-pane="declined">
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
            <h3 style="margin:0">Recommended Work Not Done</h3>
            <span class="beta-label" style="background:var(--warn-soft);color:#9a6713">Budget planner active</span>
          </div>

          <div class="declined-item">
            <div class="di-head">
              <div><div class="di-name">Wheel Alignment</div><div class="di-meta">Recommended: 12 Mar 2026 · WO-2042 · Tech: Samir H.</div></div>
              <span class="pill warn">Safety · Recommended soon</span>
            </div>
            <div style="display:flex;gap:16px;font-size:12.5px;flex-wrap:wrap;">
              <span>Original estimate: <strong>JOD 60</strong></span>
              <span>Estimated future cost: <strong>JOD 65–75</strong></span>
              <span>Decision: <span class="pill warn">Postponed</span></span>
              <span>Reminder: <strong>15 Jul 2026</strong></span>
            </div>
            <div class="di-meta" style="margin-top:4px">Tech note: Front pulling slightly right. Alignment off by ~2mm. Not critical yet but should be done by next service.</div>
            <div class="di-actions">
              <button class="btn sm primary" onclick="openBookingWizard()">📅 Convert to booking</button>
              <button class="btn sm" onclick="showToast('WhatsApp reminder sent')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-message"/></svg></span> Send reminder</button>
              <button class="btn sm" onclick="showToast('Added to budget plan')">💰 Add to budget plan</button>
            </div>
          </div>

          <div style="background:var(--blue-soft);border:1px solid #b8caff;border-radius:var(--radius-sm);padding:12px;margin-top:6px;">
            <div style="font-weight:700;font-size:13px;color:var(--accent-2);margin-bottom:8px;">💰 Maintenance Budget Plan</div>
            <div class="budget-row" style="padding:6px 0;"><span class="bitem">Wheel alignment</span><span>JOD 60 · suggested within 30 days</span><button class="btn sm primary" style="padding:3px 8px" onclick="showToast('Approved — booking sent')">Approve now</button></div>
            <div class="budget-row" style="padding:6px 0;"><span class="bitem">Cabin air filter</span><span>JOD 25 · optional</span><button class="btn sm" style="padding:3px 8px" onclick="showToast('Saved for later')">Save for later</button></div>
            <div class="budget-row" style="padding:6px 0;border:none"><span class="bitem">Tire replacement (all 4)</span><span>JOD 320 · plan for Sep</span><button class="btn sm" style="padding:3px 8px" onclick="showToast('Reminder set for September')">Set reminder</button></div>
          </div>
        </div>
      </div>

      <!-- Resale Report tab -->
      <div class="tabpane" data-pane="resale">
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <h3 style="margin:0">Resale Report <span class="record-badge customer" style="margin-inline-start:6px;font-size:9px;">🌐 Buyer Shareable</span></h3>
            <span class="pill good" style="padding:6px 12px">📋 74% ready</span>
          </div>

          <div class="grid" style="grid-template-columns:1fr 1fr;margin-bottom:14px;">
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;">Include in resale report</div>
              <div class="field"><div class="check-list">
                <label><input type="checkbox" checked> ✅ Verified service events (7)</label>
                <label><input type="checkbox" checked> ✅ Imported documents (2)</label>
                <label><input type="checkbox" checked> ✅ Warranties (3 active)</label>
                <label><input type="checkbox" checked> ✅ Mileage history</label>
                <label><input type="checkbox"> 📸 Selected photo evidence</label>
                <label><input type="checkbox"> 👤 Ownership history</label>
                <label><input type="checkbox"> Hide owner identity</label>
                <label><input type="checkbox"> Hide payment amounts</label>
              </div></div>
              <button class="btn primary" style="margin-top:8px" onclick="WF.printInvoice('INV-4401')">📄 Generate PDF preview</button>
            </div>
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;">Dossier readiness</div>
              <div class="kpi" style="margin-bottom:10px;"><div class="v" style="font-size:22px">74%</div><div class="k">Service history completeness</div><div class="bar"><i style="width:74%"></i></div></div>
              <div class="kpi" style="margin-bottom:10px;"><div class="v" style="font-size:22px">86</div><div class="k">Vehicle Record Quality</div><div class="bar"><i style="width:86%"></i></div></div>
              <div class="kpi"><div class="v" style="font-size:22px">7</div><div class="k">Verified events</div><div class="bar"><i style="width:70%"></i></div></div>
            </div>
          </div>

          <!-- Ownership transfer flow -->
          <div style="border-top:1px solid var(--line);padding-top:14px;">
            <div style="font-weight:700;font-size:13px;margin-bottom:10px;">Ownership Transfer Flow</div>
            <div class="transfer-steps">
              <div class="ts done"><div class="tc">✓</div><div class="tl">Confirm seller</div></div>
              <div class="ts active"><div class="tc">2</div><div class="tl">Buyer contact</div></div>
              <div class="ts"><div class="tc">3</div><div class="tl">Select history</div></div>
              <div class="ts"><div class="tc">4</div><div class="tl">Send invite</div></div>
              <div class="ts"><div class="tc">5</div><div class="tl">Acceptance</div></div>
              <div class="ts"><div class="tc">6</div><div class="tl">Complete</div></div>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button class="btn teal" onclick="WF.simulateWhatsApp('Buyer','+962 79 000 0000')">📨 Send buyer invitation</button>
              <button class="btn" onclick="openShareModal()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-link"/></svg></span> Generate buyer link</button>
              <button class="btn" onclick="showToast('Ownership transfer · legal document generated (simulation)')">🔄 Transfer ownership</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tires tab -->
      <div class="tabpane" data-pane="tire">
        <div class="card">
          <h3>Tire &amp; Wheel Record</h3>
          <table class="tbl"><thead><tr><th>Position</th><th>Brand</th><th>Size</th><th>Serial / Batch</th><th>Tread (mm)</th><th>Installed</th><th>Last rotation</th><th>Warranty</th></tr></thead><tbody>
            <tr><td>Front Left</td><td>Michelin LTX M/S2</td><td>265/70 R17</td><td>MCH-24A-441</td><td>6.8</td><td>Jan 2024</td><td>Jan 2026</td><td><span class="pill good">Active</span></td></tr>
            <tr><td>Front Right</td><td>Michelin LTX M/S2</td><td>265/70 R17</td><td>MCH-24A-442</td><td>6.6</td><td>Jan 2024</td><td>Jan 2026</td><td><span class="pill good">Active</span></td></tr>
            <tr><td>Rear Left</td><td>Michelin LTX M/S2</td><td>265/70 R17</td><td>MCH-24A-443</td><td>7.1</td><td>Jan 2024</td><td>Jan 2026</td><td><span class="pill good">Active</span></td></tr>
            <tr><td>Rear Right</td><td>Michelin LTX M/S2</td><td>265/70 R17</td><td>MCH-24A-444</td><td>7.0</td><td>Jan 2024</td><td>Jan 2026</td><td><span class="pill good">Active</span></td></tr>
            <tr><td>Spare</td><td>Michelin</td><td>265/70 R17</td><td>MCH-21-001</td><td>9.0</td><td>Factory</td><td>—</td><td>—</td></tr>
          </tbody></table>
        </div>
      </div>

      <!-- Ownership & Access tab -->
      <div class="tabpane" data-pane="acc">
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <h3 style="margin:0">Ownership &amp; Access Control</h3>
            <button class="btn sm teal" onclick="openShareModal()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-share"/></svg></span> Share Passport</button>
          </div>
          <div class="note-box" style="margin-bottom:12px;">Owner has full access. Temporary passport links can be shared with buyers, insurers or other workshops. Customer controls access.</div>
          <table class="tbl"><thead><tr><th>Granted to</th><th>Scope</th><th>Expiry</th><th>Status</th></tr></thead><tbody>
            <tr><td>Khalid Mansour (owner)</td><td>Full</td><td>Permanent</td><td><span class="pill good">Active</span></td></tr>
            <tr><td>Prospective buyer link #1</td><td>Service timeline, warranties</td><td>7 days</td><td><span class="pill good">Active</span></td></tr>
            <tr><td>ACIG Insurance</td><td>Service history, documents</td><td>30 days</td><td><span class="pill warn">Expired</span></td></tr>
          </tbody></table>
        </div>
      </div>

      <!-- Advanced tab (3rd top-level tab) -->
      <div class="tabpane" data-pane="adv">
        <!-- Sub-navigation inside Advanced -->
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
          <button class="btn sm" onclick="showAdvSub('adv-resale',this)">Resale Report</button>
          <button class="btn sm" onclick="showAdvSub('adv-declined',this)">Recommended Work</button>
          <button class="btn sm" onclick="showAdvSub('adv-tires',this)">Tires &amp; Wheels</button>
          <button class="btn sm" onclick="showAdvSub('adv-access',this)">Ownership &amp; Access</button>
          <button class="btn sm" onclick="showAdvSub('adv-audit',this)">Audit History</button>
        </div>
        <!-- Resale Report sub-section (reuse existing content inline) -->
        <div id="adv-resale" class="adv-sub">
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0">Resale Report <span class="record-badge customer" style="margin-inline-start:6px;font-size:9px;">🌐 Buyer Shareable</span></h3>
              <button class="btn sm primary" onclick="WF.printInvoice('INV-4401')">📄 Generate PDF</button>
            </div>
            <div class="kpi-row" style="margin-bottom:16px;">
              <div class="kpi"><div class="v" style="color:var(--accent-2)">74%</div><div class="k">History completeness</div><div class="bar"><i style="width:74%"></i></div></div>
              <div class="kpi"><div class="v">86</div><div class="k">Vehicle Record Quality</div><div class="bar"><i style="width:86%"></i></div></div>
              <div class="kpi"><div class="v">7</div><div class="k">Verified events</div><div class="bar"><i style="width:70%"></i></div></div>
              <div class="kpi"><div class="v" style="color:var(--good)">3</div><div class="k">Active warranties</div><div class="bar"><i style="width:75%"></i></div></div>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button class="btn teal" onclick="WF.simulateWhatsApp('Buyer','+962 79 000 0000')">📨 Send buyer invitation</button>
              <button class="btn" onclick="openShareModal()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-link"/></svg></span> Generate buyer link</button>
              <button class="btn" onclick="showToast('Ownership transfer · legal document generated (simulation)')">🔄 Transfer ownership</button>
            </div>
          </div>
        </div>
        <!-- Recommended Work sub-section -->
        <div id="adv-declined" class="adv-sub" style="display:none">
          <div class="card">
            <h3>Recommended Work Not Completed</h3>
            <div class="declined-item">
              <div class="di-head"><div><div class="di-name">Wheel Alignment</div><div class="di-meta">Recommended: 12 Mar 2026 · WO-2042</div></div><span class="pill warn">Safety · Recommended soon</span></div>
              <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
                <button class="btn sm primary" onclick="openBookingWizard()">📅 Convert to booking</button>
                <button class="btn sm" onclick="WF.simulateWhatsApp('Customer','+962 79 555 0101')">Send reminder</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Tires sub-section -->
        <div id="adv-tires" class="adv-sub" style="display:none">
          <div class="card"><h3>Tire &amp; Wheel Record</h3>
          <table class="tbl"><thead><tr><th>Position</th><th>Brand</th><th>Size</th><th>Tread (mm)</th><th>Installed</th><th>Status</th></tr></thead><tbody>
            <tr><td>Front Left</td><td>Michelin LTX M/S2</td><td>265/70 R17</td><td>6.8</td><td>Jan 2024</td><td><span class="pill good">Active</span></td></tr>
            <tr><td>Front Right</td><td>Michelin LTX M/S2</td><td>265/70 R17</td><td>6.6</td><td>Jan 2024</td><td><span class="pill good">Active</span></td></tr>
            <tr><td>Rear Left</td><td>Michelin LTX M/S2</td><td>265/70 R17</td><td>7.1</td><td>Jan 2024</td><td><span class="pill good">Active</span></td></tr>
            <tr><td>Rear Right</td><td>Michelin LTX M/S2</td><td>265/70 R17</td><td>7.0</td><td>Jan 2024</td><td><span class="pill good">Active</span></td></tr>
          </tbody></table></div>
        </div>
        <!-- Ownership sub-section -->
        <div id="adv-access" class="adv-sub" style="display:none">
          <div class="card"><h3>Ownership &amp; Access Control</h3>
          <table class="tbl"><thead><tr><th>Granted to</th><th>Scope</th><th>Expiry</th><th>Status</th></tr></thead><tbody>
            <tr><td>Khalid Mansour (owner)</td><td>Full</td><td>Permanent</td><td><span class="pill good">Active</span></td></tr>
            <tr><td>Prospective buyer link #1</td><td>Service timeline, warranties</td><td>7 days</td><td><span class="pill good">Active</span></td></tr>
          </tbody></table></div>
        </div>
        <!-- Audit sub-section -->
        <div id="adv-audit" class="adv-sub" style="display:none">
          <div class="card"><h3>Audit History — Vehicle VH-1042</h3>
          <div class="audit-row"><span class="aa">Rami A.</span><span class="am">Generated passport buyer link · Al-Rawabi Main</span><span style="margin-inline-start:auto;font-size:11px;color:var(--muted)">4 Jun 2026 09:14</span></div>
          <div class="audit-row"><span class="aa">Samir H.</span><span class="am">Evidence added · WO-2042 · 3 during-service photos</span><span style="margin-inline-start:auto;font-size:11px;color:var(--muted)">12 Mar 2026 11:35</span></div>
          <div class="audit-row"><span class="aa">Rami A.</span><span class="am">Intake override approved · photo 7 missing · reason logged</span><span style="margin-inline-start:auto;font-size:11px;color:var(--muted)">12 Mar 2026 08:51</span></div>
          <div class="audit-row"><span class="aa">Khalid M. (owner)</span><span class="am">Estimate approved via WhatsApp link · signed digitally</span><span style="margin-inline-start:auto;font-size:11px;color:var(--muted)">12 Mar 2026 09:36</span></div>
          <div class="audit-row"><span class="aa">System</span><span class="am">Warranty claim opened · Ceramic coating · WO-2015</span><span style="margin-inline-start:auto;font-size:11px;color:var(--muted)">20 Aug 2025 14:00</span></div>
        </div></div><!-- /adv-audit -->
      </div><!-- /tabpane adv -->
    </section>`;

SCREENS["screen-intake"] = `<section class="screen" id="screen-intake">
      <!-- Vehicle context -->
      <div class="veh-ctx">
        <span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-car"/></svg></span><span class="vname">Nissan Patrol 2022</span>
        <span class="vsep">|</span><span>Plate: 18-90-441</span>
        <span class="vsep">|</span><span>52,310 km</span>
        <span class="vsep">|</span><span>Owner: Saeed Al-Otaibi</span>
        <span class="vpill warn">Intake in progress</span>
      </div>
      <div class="page-head">
        <div><h1>Vehicle Check-In</h1><div class="sub">Nissan Patrol 2022 · check-in capture</div></div>
        <div class="head-actions">
          <span class="pill warn" style="padding:7px 12px;font-size:12px" id="offlineBadge">Photo compliance 6/7</span>
          <button class="btn ghost sm" onclick="showToast('Manager override logged (concept). Reason required + audit entry.')">🔓 Manager override</button>
        </div>
      </div>
      <div class="stepper" id="stepper">
        <div class="step done" data-step="1" onclick="goStep(1)"><div class="n">1</div><div class="lbl">Vehicle</div></div>
        <div class="step done" data-step="2" onclick="goStep(2)"><div class="n">2</div><div class="lbl">Odometer + fuel</div></div>
        <div class="step active" data-step="3" onclick="goStep(3)"><div class="n">3</div><div class="lbl">Condition</div></div>
        <div class="step" data-step="4" onclick="goStep(4)"><div class="n">4</div><div class="lbl">Damage map</div></div>
        <div class="step" data-step="5" onclick="goStep(5)"><div class="n">5</div><div class="lbl">Required photos</div></div>
        <div class="step" data-step="6" onclick="goStep(6)"><div class="n">6</div><div class="lbl">Acknowledgement</div></div>
      </div>
      <div class="card" id="stepBody"><div style="text-align:center;padding:32px;color:var(--muted);">Select a vehicle to begin check-in.</div></div>
      <div style="display:flex;gap:8px;margin-top:12px;justify-content:flex-end">
        <button class="btn" onclick="typeof INTAKE_STEP!=='undefined'?WF.intakePrev():stepPrev()">‹ Back</button>
        <button class="btn primary" id="intakeNextBtn" onclick="typeof INTAKE_STEP!=='undefined'?WF.intakeNext():stepNext()">Next ›</button>
        <button class="btn primary good" id="intakeConfirmBtn" style="display:none;" onclick="WF.confirmIntake()">✓ Confirm Check-In</button>
      </div>
    </section>`;

SCREENS["screen-workorder"] = `<section class="screen" id="screen-workorder">
      <div class="veh-ctx">
        <span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-car"/></svg></span>
        <span class="vname">Mercedes C200 2019</span>
        <span class="vsep">|</span><span>31-77-204</span>
        <span class="vsep">|</span><span>WO-2041</span>
        <span class="vpill ok">In Service</span>
        <div class="vctx-right">
          <span class="vctx-badge shop"><span class="ic ic-sm" style="vertical-align:middle"><svg viewBox="0 0 24 24"><use href="#ic-shield"/></svg></span> Shop Private</span>
        </div>
      </div>
      <div class="page-head" style="margin-top:12px;">
        <div><h1>Work Order · WO-2041</h1><div class="sub">Mercedes C200 2019 · Lara Haddad · <span class="pill teal">In Service</span></div></div>
        <div class="head-actions">
          <!-- Primary actions -->
          <button class="btn" onclick="WF.pauseJob('WO-2041')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><polyline points="6 4 6 20"/><polyline points="18 4 18 20"/></svg></span> Pause</button>
          <button class="btn" onclick="WF.moveToQC('WO-2041')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-check-circle"/></svg></span> Move to QC</button>
          <button class="btn" onclick="WF.requestApproval('WO-2041')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-file-text"/></svg></span> Request Approval</button>
          <button class="btn primary" onclick="WF.closeJob('WO-2041')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-check-circle"/></svg></span> Close Job</button>
          <!-- Secondary actions -->
          <div class="wo-sec-wrap">
            <button class="btn" onclick="toggle3dot(this)"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-more"/></svg></span></button>
            <div class="wo-sec-menu">
              <button onclick="WF.addItemToWO('WO-2041')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-plus"/></svg></span> Add Item</button>
              <button onclick="WF.addItemToWO('WO-2041')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-clock"/></svg></span> Add Labor</button>
              <button onclick="WF._addPhoto('During Service');showToast('Photo added to WO-2041')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-camera"/></svg></span> Add Photo</button>
              <button onclick="WF.addTechNote('WO-2041')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-file-text"/></svg></span> Add Tech Note</button>
              <div class="wo-sec-menu-sep"></div>
              <button onclick="WF.reorderPart('P001')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-package"/></svg></span> Request Part</button>
              <button onclick="WF.contactCustomer('Lara Haddad','+962 79 555 0101')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-phone"/></svg></span> Contact Customer</button>
            </div>
          </div>
        </div>
      </div>

      <!-- WO status bar -->
      <div class="wo-status-bar">
        <div class="wos"><div class="wok">Bay</div><div class="wov">Bay 3</div></div>
        <div class="wos"><div class="wok">Technician</div><div class="wov">Samir H.</div></div>
        <div class="wos"><div class="wok">Promised</div><div class="wov late">12:00 ⚠</div></div>
        <div class="wos"><div class="wok">Elapsed</div><div class="wov">1h 42m</div></div>
        <div class="wos"><div class="wok">Priority</div><div class="wov"><span class="pill warn">High</span></div></div>
        <div class="wos"><div class="wok">Sync</div><div class="wov" style="display:flex;align-items:center;gap:5px;"><span style="width:8px;height:8px;border-radius:50%;background:var(--good);display:inline-block"></span>Online</div></div>
      </div>
      <div class="grid" style="grid-template-columns:1fr 1fr;margin-bottom:14px;">
        <div class="card"><h3>Vehicle Summary</h3>
          <table class="tbl">
            <tr><td>Vehicle</td><td>Mercedes C200 2019</td></tr>
            <tr><td>Plate</td><td>31-77-204</td></tr>
            <tr><td>Service package</td><td id="woPackage">Brake overhaul + 20k service</td></tr>
            <tr><td>Technician</td><td>Samir H. <span class="pill blue">assigned</span></td></tr>
            <tr><td>Bay</td><td>Bay 3</td></tr>
            <tr><td>Status</td><td><span class="pill teal">In Service</span></td></tr>
            <tr><td>Timer</td><td><span class="pill blue">1h 42m active</span></td></tr>
          </table>
        </div>
        <div class="card"><h3>During-service Evidence</h3>
          <div class="photo-grid" style="grid-template-columns:repeat(3,1fr);">
            <div class="photo-slot filled" onclick="openEvidenceModal('Old brake pads','During','Today 11:20','Samir H.','timestamped')"><div class="stage-tag">DURING</div><span class="lab">Old pads</span></div>
            <div class="photo-slot filled" onclick="openEvidenceModal('Rotor surface','During','Today 11:35','Samir H.','timestamped')"><div class="stage-tag">DURING</div><span class="lab">Rotor</span></div>
            <div class="photo-slot" onclick="WF._addPhoto('During Service');showToast('Photo added to WO-2041')">＋ add</div>
          </div>
          <div style="margin-top:10px;font-size:12px;color:var(--muted)">Photo Evidence History: 2 photos timestamped · 1 pending</div>
        </div>
      </div>
      <div class="card" style="margin-bottom:14px;"><h3>Line Items</h3>
        <table class="tbl"><thead><tr><th>Item</th><th>Qty</th><th>Unit (JOD)</th><th>Total</th><th>Approved</th></tr></thead><tbody>
          <tr><td>Front brake pads (OEM)</td><td>1 set</td><td>85</td><td>85</td><td><span class="pill good">✓</span></td></tr>
          <tr><td>Brake rotor machining</td><td>2</td><td>30</td><td>60</td><td><span class="pill good">✓</span></td></tr>
          <tr><td>Engine oil 5W-30</td><td>6 L</td><td>9</td><td>54</td><td><span class="pill good">✓</span></td></tr>
          <tr><td>Labor</td><td>2.5 h</td><td>40</td><td>100</td><td><span class="pill good">✓</span></td></tr>
          <tr><td colspan="3" style="text-align:end;font-weight:700">Total</td><td style="font-weight:800">JOD 299</td><td></td></tr>
        </tbody></table>
      </div>
      <div class="two-col">
        <div class="note-box"><strong>Customer-visible notes</strong><p style="margin:8px 0 0;color:var(--muted)">Front brakes worn below safe limit. Replaced pads and machined rotors. Vehicle test-driven, braking smooth.</p></div>
        <div class="note-box internal"><strong>Internal notes (staff only) <span class="record-badge shop" style="font-size:9px;margin-inline-start:4px;">🔒 Shop Private</span></strong><p style="margin:8px 0 0;color:#9a6713">Customer hesitant on rotor replacement — offered machining. Watch left caliper next visit. Supplier cost: JOD 48 (margin JOD 37).</p></div>
      </div>
    </section>`;

SCREENS["screen-estimate"] = `<section class="screen" id="screen-estimate">
      <div class="page-head">
        <div><h1>Estimate · EST-558</h1><div class="sub">Toyota Land Cruiser 2023 · <span class="pill warn">Awaiting customer</span></div></div>
        <div class="head-actions">
          <button class="btn" onclick="WF.simulateApproval('EST-558')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-check-circle"/></svg></span> Simulate Response</button>
          <button class="btn teal" onclick="copyLink()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-link"/></svg></span> Copy WhatsApp link</button>
          <button class="btn primary" onclick="WF.createInvoiceFromWO('WO-2042')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-file-text"/></svg></span> Create Invoice</button>
        </div>
      </div>
      <div class="card" style="margin-bottom:14px;"><h3>Line-item Approval</h3>
        <div class="appr-row"><div><strong>Front brake pads + rotors</strong><div style="color:var(--muted);font-size:12px">Safety-critical · recommended</div></div><div style="font-weight:700">JOD 145</div><span class="pill good">Approved ✓</span></div>
        <div class="appr-row"><div><strong>Major 60k service</strong><div style="color:var(--muted);font-size:12px">Oil, filters, fluids</div></div><div style="font-weight:700">JOD 190</div><span class="pill good">Approved ✓</span></div>
        <div class="appr-row"><div><strong>Cabin air filter</strong><div style="color:var(--muted);font-size:12px">Optional</div></div><div style="font-weight:700">JOD 25</div><span class="pill bad">Declined ✕</span></div>
        <div class="appr-row"><div><strong>Wheel alignment</strong><div style="color:var(--muted);font-size:12px">Suggested by tech</div></div><div style="font-weight:700">JOD 60</div><span class="pill warn">Pending …</span></div>
        <div class="appr-row" style="border-top:2px solid var(--line)"><div><strong>Approved total</strong></div><div style="font-weight:800;font-size:16px">JOD 335</div><span></span></div>
      </div>
      <div class="card"><h3>Authorization Timeline</h3>
        <div class="events">
          <div class="ev"><div class="dot">📨</div><div class="body"><div class="t">Estimate sent via WhatsApp</div><div class="m">to +962 79 555 0142</div></div><div class="when">09:14</div></div>
          <div class="ev"><div class="dot">👁</div><div class="body"><div class="t">Customer opened link</div><div class="m">secure session · IP verified</div></div><div class="when">09:31</div></div>
          <div class="ev"><div class="dot">✅</div><div class="body"><div class="t">Approved 2 of 4 items <span class="prov verified">SIGNED</span></div><div class="m">digital signature captured</div></div><div class="when">09:36</div></div>
          <div class="ev"><div class="dot">⏳</div><div class="body"><div class="t">Awaiting decision on alignment</div><div class="m">reminder scheduled in 30 min</div></div><div class="when">now</div></div>
        </div>
      </div>
    </section>`;

SCREENS["screen-invoices"] = `<section class="screen" id="screen-invoices">
      <div class="page-head"><div><h1>Invoices &amp; Payments</h1><div class="sub">Issue invoices, take payment, sync to accounting</div></div>
        <div class="head-actions"><button class="btn primary" onclick="WF.createInvoiceFromWO('WO-2041')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-plus"/></svg></span> New Invoice</button></div>
      </div>
      <div class="tbl-card">
        <div class="tbl-toolbar2">
          <div class="ts-wrap"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-search"/></svg></span><input type="text" placeholder="Search invoices…"/></div>
          <select class="tf"><option>All Statuses</option><option>Paid</option><option>Pending</option><option>Overdue</option></select>
          <select class="tf"><option>All Methods</option><option>Card</option><option>Cash</option><option>mada</option></select>
          <div style="margin-inline-start:auto;display:flex;gap:6px;align-items:center;">
            <span class="tbl-count">4 invoices</span>
            <button class="btn sm" onclick="showToast('Exported to accounting (concept)')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-sync"/></svg></span> Sync Xero</button>
          </div>
        </div>
        <div class="tbl-wrap" style="overflow-x:auto;">
          <table class="tbl"><thead><tr><th>Invoice</th><th>Customer</th><th>Vehicle</th><th>Date</th><th>Amount</th><th>Status</th><th>Method</th><th>Actions</th></tr></thead><tbody>
            <tr><td colspan="8" style="text-align:center;padding:24px;color:var(--muted);">Loading invoices…</td></tr>
          </tbody></table>
        </div>
      </div>
    </section>`;

SCREENS["screen-pickup"] = `<section class="screen" id="screen-pickup">
      <div class="page-head">
        <div><h1>Pickup &amp; Mobile Jobs</h1><div class="sub">Thursday 4 Jun 2026 · Al-Rawabi Main · concept route board</div></div>
        <div class="head-actions">
          <button class="btn" onclick="WF.schedulePickup()">📅 Schedule pickup</button>
          <button class="btn primary" onclick="openBookingWizard()">＋ New mobile job</button>
        </div>
      </div>
      <div class="grid" style="grid-template-columns:2fr 1fr;margin-bottom:14px;">
        <!-- Route list -->
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <h3 style="margin:0">Route Board</h3>
            <div style="display:flex;gap:6px;">
              <select class="vert" style="font-size:12px;padding:5px 8px;"><option>All drivers</option><option>Ahmad K.</option><option>Feras N.</option></select>
              <select class="vert" style="font-size:12px;padding:5px 8px;"><option>All types</option><option>Pickup</option><option>Drop-off</option><option>Mobile</option></select>
            </div>
          </div>
          <div class="route-item">
            <div class="route-num">1</div>
            <div class="route-body">
              <div class="rt">🚐 Pickup · Khalid Mansour</div>
              <div class="rm">Toyota Land Cruiser 2023 · Abdoun area · Est. travel: 18 min · Window: 09:00–09:30</div>
              <div class="rm" style="margin-top:3px">Driver: Ahmad K. · Service: Major 60k service</div>
            </div>
            <div>
              <span class="route-status pill good">Completed</span>
              <div style="display:flex;gap:4px;margin-top:5px;">
                <button class="btn sm" onclick="showToast('Calling customer...')">📞</button>
                <button class="btn sm teal" onclick="showToast('WhatsApp update sent')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-message"/></svg></span></button>
              </div>
            </div>
          </div>
          <div class="route-item">
            <div class="route-num" style="background:var(--accent)">2</div>
            <div class="route-body">
              <div class="rt">✨ Mobile detailing · Dana Ziadeh</div>
              <div class="rm">Lexus RX 2022 · Sweifieh · Est. travel: 12 min · Window: 10:30–12:30</div>
              <div class="rm" style="margin-top:3px">Tech: Feras N. · Mobile unit #2 · Premium ceramic package</div>
            </div>
            <div>
              <span class="route-status pill blue">En route</span>
              <div style="display:flex;gap:4px;margin-top:5px;">
                <button class="btn sm" onclick="showToast('Calling customer...')">📞</button>
                <button class="btn sm teal" onclick="showToast('ETA WhatsApp sent')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-message"/></svg></span></button>
              </div>
            </div>
          </div>
          <div class="route-item">
            <div class="route-num" style="background:var(--warn)">3</div>
            <div class="route-body">
              <div class="rt">🚐 Drop-off · Maya Khalil ⚠️ Late</div>
              <div class="rm">Honda Accord 2021 · Mecca St area · Est. travel: 24 min · Window: 13:00–13:30</div>
              <div class="rm" style="margin-top:3px">Driver: Ahmad K. · Vehicle ready · customer notified</div>
            </div>
            <div>
              <span class="route-status pill warn">Delayed</span>
              <div style="display:flex;gap:4px;margin-top:5px;">
                <button class="btn sm" onclick="showToast('Late-arrival WhatsApp sent')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-message"/></svg></span></button>
              </div>
            </div>
          </div>
          <div class="route-item">
            <div class="route-num" style="background:#8b99b3">4</div>
            <div class="route-body">
              <div class="rt">🚐 Pickup · Tariq Nawfal</div>
              <div class="rm">Ford Ranger 2023 · Khalda area · Window: 15:00–15:30</div>
              <div class="rm" style="margin-top:3px">Driver: Ahmad K. · Oil change + tire check</div>
            </div>
            <div>
              <span class="route-status pill gray">Scheduled</span>
            </div>
          </div>
        </div>

        <!-- Route summary panel -->
        <div class="card">
          <h3>Route Summary</h3>
          <table class="tbl">
            <tr><td>Total stops</td><td><strong>4</strong></td></tr>
            <tr><td>Drive time (est.)</td><td><strong>54 min</strong></td></tr>
            <tr><td>Service time (est.)</td><td><strong>4.5 h</strong></td></tr>
            <tr><td>Available capacity</td><td><span class="pill warn">1 slot</span></td></tr>
            <tr><td>Delayed jobs</td><td><span class="pill warn">1</span></td></tr>
            <tr><td>Next stop</td><td>Drop-off · Maya K.</td></tr>
          </table>
          <div style="margin-top:12px;">
            <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;">Capacity</div>
            <div class="bar" style="height:10px;"><i style="width:75%"></i></div>
            <div style="font-size:11px;color:var(--muted);margin-top:4px;">3 of 4 slots used</div>
          </div>

          <!-- Vertical consumables for detailing/wash -->
          <div id="vertConsumables" style="margin-top:14px;display:none;">
            <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;">Consumables per Job</div>
            <div class="cons-row"><span class="ck">Shampoo concentrate</span><span>120 ml</span></div>
            <div class="cons-row"><span class="ck">Ceramic coating</span><span>30 ml</span></div>
            <div class="cons-row"><span class="ck">Interior cleaner</span><span>80 ml</span></div>
            <div class="cons-row"><span class="ck">Microfiber towels</span><span>6 units</span></div>
            <div class="cons-row"><span class="ck">Water estimate</span><span>18 L</span></div>
            <div class="cons-row"><span class="ck">Staff time</span><span>2.5 h</span></div>
            <div class="cons-row"><span class="ck">Cost per job</span><span><strong>JOD 22</strong></span></div>
            <div class="cons-row"><span class="ck">Selling price</span><span><strong>JOD 85</strong></span></div>
            <div class="cons-row"><span class="ck">Gross margin</span><span><strong style="color:var(--good)">74%</strong></span></div>
            <div class="eco-card"><h4>🌿 Eco Efficiency</h4>
              <div style="font-size:12px;color:var(--muted);">Water: 18 L/wash · -12% vs branch avg<br>Chemical cost: JOD 8.40 · within target<br>♻️ Waste reduction: dry wash option available</div>
            </div>
          </div>
        </div>
      </div>
    </section>`;

SCREENS["screen-aftercare"] = `<section class="screen" id="screen-aftercare">
      <div class="page-head">
        <div><h1>Aftercare &amp; Follow-up</h1><div class="sub">Declined work · comeback tracking · warranty expiry</div></div>
        <div class="head-actions">
          <button class="btn" onclick="showToast('Bulk reminder sent to 3 customers')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-message"/></svg></span> Bulk Reminder</button>
          <button class="btn primary" onclick="WF.newFollowUp()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-plus"/></svg></span> New Follow-up</button>
        </div>
      </div>

      <div class="tbl-card">
        <div class="tbl-toolbar2" style="flex-wrap:wrap;row-gap:8px;">
          <div class="ts-wrap">
            <span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-search"/></svg></span>
            <input type="text" data-i18n="tbl_search" data-i18n-target="placeholder" placeholder="Search customer or vehicle…"/>
          </div>
          <div style="display:flex;gap:5px;flex-wrap:wrap;" id="aftercareChips">
            <div class="chip on" onclick="filterChip(this,'all')">All</div>
            <div class="chip" onclick="filterChip(this,'safety')">⚠️ Safety-critical</div>
            <div class="chip" onclick="filterChip(this,'week')">Due this week</div>
            <div class="chip" onclick="filterChip(this,'warranty')">Warranty expiring</div>
            <div class="chip" onclick="filterChip(this,'declined')">Declined work</div>
            <div class="chip" onclick="filterChip(this,'comeback')">Returning Issues</div>
            <div class="chip" onclick="filterChip(this,'highval')">High-value</div>
          </div>
          <span class="tbl-count" style="margin-inline-start:auto;white-space:nowrap;">4 follow-ups</span>
        </div>

        <!-- Aftercare list -->
        <div class="aftercare-row">
          <div class="staff-avatar" style="background:var(--warn-soft);color:var(--warn);">KM</div>
          <div class="ar-main">
            <div class="ar-veh">Khalid Mansour · Toyota Land Cruiser 2023 <span class="pill warn">Declined work</span></div>
            <div class="ar-meta">Last service: 12 Mar 2026 · Declined: Wheel alignment (JOD 60) · Reminder: 15 Jul 2026</div>
            <div class="ar-meta">Warranty expiring: Ceramic coating · Aug 2026 · Next appointment: not booked</div>
          </div>
          <div style="display:flex;gap:5px;flex-wrap:wrap;">
            <button class="btn sm" onclick="showToast('WhatsApp reminder sent')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-message"/></svg></span> Remind</button>
            <button class="btn sm primary" onclick="openBookingWizard()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-calendar"/></svg></span> Book</button>
            <button class="btn sm" onclick="openVehicle()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-car"/></svg></span> Passport</button>
          </div>
        </div>
        <div class="aftercare-row">
          <div class="staff-avatar" style="background:var(--bad-soft);color:var(--bad);">MK</div>
          <div class="ar-main">
            <div class="ar-veh">Maya Khalil · Honda Accord 2021 <span class="pill bad">Returning Issue Risk</span></div>
            <div class="ar-meta">Last service: 28 May 2026 · Same complaint logged in 2 consecutive visits · Returning Issue open</div>
            <div class="ar-meta">Assigned manager: Rami A. · Resolution pending · Original WO-2038</div>
          </div>
          <div style="display:flex;gap:5px;flex-wrap:wrap;">
            <button class="btn sm danger" onclick="openComebackModal()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-alert-triangle"/></svg></span> Returning Issue</button>
            <button class="btn sm" onclick="showToast('Manager notified')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-phone"/></svg></span> Manager</button>
          </div>
        </div>
        <div class="aftercare-row">
          <div class="staff-avatar" style="background:var(--blue-soft);color:var(--accent-2);">SO</div>
          <div class="ar-main">
            <div class="ar-veh">Saeed Al-Otaibi · Nissan Patrol 2022 <span class="pill teal">Intake ongoing</span></div>
            <div class="ar-meta">Intake in progress today · 3 pending follow-up recommendations · No previous declined work</div>
          </div>
          <div style="display:flex;gap:5px;">
            <button class="btn sm" onclick="go('intake')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-camera"/></svg></span> Intake</button>
          </div>
        </div>
        <div class="aftercare-row">
          <div class="staff-avatar" style="background:var(--good-soft);color:var(--good);">DZ</div>
          <div class="ar-main">
            <div class="ar-veh">Dana Ziadeh · Lexus RX 2022 <span class="pill good">All clear</span></div>
            <div class="ar-meta">Last service: 1 Jun 2026 · All approved · Next reminder: 3 months · Satisfaction: 5★</div>
          </div>
          <div style="display:flex;gap:5px;">
            <button class="btn sm" onclick="showToast('Thank-you message sent')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-message"/></svg></span> Thank</button>
          </div>
        </div>
      </div>
    </section>`;

SCREENS["screen-inventory"] = `<section class="screen" id="screen-inventory">
      <div class="page-head"><div><h1>Inventory &amp; Purchasing</h1><div class="sub">Parts, consumables, purchase orders &amp; vendors</div></div>
        <div class="head-actions">
          <button class="btn" onclick="WF.addInventoryItem()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-plus"/></svg></span> Add Item</button>
          <button class="btn primary" onclick="showToast('Auto-PO drafted · 2 low-stock items')">＋ Auto-PO</button>
        </div>
      </div>

      <div class="tabs" id="invTabs">
        <div class="tab active" data-tab="stock" onclick="tabSwitch(this,'invTabs','invPanes')">Stock</div>
        <div class="tab" data-tab="po" onclick="tabSwitch(this,'invTabs','invPanes')">Purchase Orders</div>
        <div class="tab" data-tab="vendors" onclick="tabSwitch(this,'invTabs','invPanes')">Vendors</div>
        <div class="tab" data-tab="waritems" onclick="tabSwitch(this,'invTabs','invPanes')">Warranty Items</div>
        <div class="tab" data-tab="usagejob" onclick="tabSwitch(this,'invTabs','invPanes')">Usage by Job</div>
      </div>

      <div id="invPanes">
        <div class="tabpane active" data-pane="stock">
          <div class="tbl-card">
            <div class="tbl-toolbar2">
              <div class="ts-wrap"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-search"/></svg></span><input type="text" placeholder="Search parts…"/></div>
              <select class="tf"><option>All Categories</option><option>Brakes</option><option>Lubricants</option><option>Electrical</option><option>Detailing</option><option>Tires</option></select>
              <select class="tf"><option>All Statuses</option><option>OK</option><option>Low</option><option>Critical</option></select>
              <span class="tbl-count">6 SKUs</span>
              <button class="btn sm primary" style="margin-inline-start:8px" onclick="WF.reorderPart('P004')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-plus"/></svg></span> Auto-PO</button>
            </div>
            <div class="tbl-wrap2" style="overflow-x:auto">
              <table class="tbl"><thead><tr><th>Item</th><th>SKU</th><th>Category</th><th>Stock</th><th>Min</th><th>Price</th><th>Supplier</th><th>Actions</th></tr></thead><tbody id="invTableBody">
                <tr><td colspan="8" style="text-align:center;padding:24px;color:var(--muted);">Loading inventory…</td></tr>
              </tbody></table>
            </div>
          </div>
        </div>

        <div class="tabpane" data-pane="po">
          <div class="card"><table class="tbl"><thead><tr><th>PO #</th><th>Vendor</th><th>Branch</th><th>Order date</th><th>Expected</th><th>Items</th><th>Total</th><th>Status</th><th>Action</th></tr></thead><tbody>
            <tr><td>PO-441</td><td>Al-Faris Parts</td><td>Main</td><td>2 Jun 2026</td><td>5 Jun 2026</td><td>3 SKUs</td><td>JOD 340</td><td><span class="pill blue">Sent</span></td><td><button class="btn sm" onclick="showToast('Receiving stock (concept)')">Receive</button></td></tr>
            <tr><td>PO-440</td><td>Michelin MENA</td><td>Main</td><td>28 May 2026</td><td>4 Jun 2026</td><td>Tires ×8</td><td>JOD 720</td><td><span class="pill good">Received</span></td><td><button class="btn sm" onclick="showToast('PO-440 · Michelin MENA · Received')">View</button></td></tr>
            <tr><td>PO-439</td><td>Clean Pro</td><td>Main</td><td>25 May 2026</td><td>3 Jun 2026</td><td>Consumables</td><td>JOD 88</td><td><span class="pill warn">Partial</span></td><td><button class="btn sm" onclick="showToast('Partial receive logged')">Receive</button></td></tr>
          </tbody></table></div>
        </div>

        <div class="tabpane" data-pane="vendors">
          <div class="card"><table class="tbl"><thead><tr><th>Supplier</th><th>Contact</th><th>Categories</th><th>Outstanding POs</th><th>Avg lead time</th><th>Last order</th></tr></thead><tbody>
            <tr><td>Al-Faris Parts</td><td>+962 6 555 1001</td><td>Brakes, oil, filters</td><td>1</td><td>3 days</td><td>2 Jun 2026</td></tr>
            <tr><td>Michelin MENA</td><td>+971 4 444 2002</td><td>Tires</td><td>0</td><td>7 days</td><td>28 May 2026</td></tr>
            <tr><td>Clean Pro</td><td>+962 6 555 3003</td><td>Detailing, wash consumables</td><td>1 (partial)</td><td>5 days</td><td>25 May 2026</td></tr>
            <tr><td>Bosch Jordan</td><td>+962 6 555 4004</td><td>Batteries, electrical</td><td>0</td><td>4 days</td><td>15 May 2026</td></tr>
          </tbody></table></div>
        </div>

        <div class="tabpane" data-pane="waritems">
          <div class="card"><table class="tbl"><thead><tr><th>Item</th><th>Vehicle</th><th>Warranty period</th><th>Serial / batch</th><th>Installation</th><th>Expiry</th><th>Status</th></tr></thead><tbody>
            <tr><td>Bosch S5 Battery</td><td>Land Cruiser 2023</td><td>24 months</td><td>BSC-S5-20251105</td><td>5 Nov 2025</td><td>Nov 2027</td><td><span class="pill good">Active</span></td></tr>
            <tr><td>Michelin LTX set</td><td>Land Cruiser 2023</td><td>5yr / 80k km</td><td>MCH-24A-441-444</td><td>Jan 2024</td><td>Jan 2028</td><td><span class="pill good">Active</span></td></tr>
            <tr><td>Ceramic coating</td><td>Land Cruiser 2023</td><td>12 months</td><td>CER-2025-0820</td><td>20 Aug 2025</td><td>Aug 2026</td><td><span class="pill warn">Expiring</span></td></tr>
            <tr><td>Brake pads (OEM)</td><td>Mercedes C200</td><td>6 months</td><td>BP-2026-0312</td><td>12 Mar 2026</td><td>Sep 2026</td><td><span class="pill good">Active</span></td></tr>
          </tbody></table></div>
        </div>

        <div class="tabpane" data-pane="usagejob">
          <div class="card"><table class="tbl"><thead><tr><th>Work order</th><th>Vehicle</th><th>Part / consumable</th><th>Qty used</th><th>Staff</th><th>Cost</th><th>Price</th><th>Margin</th></tr></thead><tbody>
            <tr><td>WO-2041</td><td>Mercedes C200</td><td>Brake pad set</td><td>1 set</td><td>Samir H.</td><td>JOD 48</td><td>JOD 85</td><td><span class="pill good">43%</span></td></tr>
            <tr><td>WO-2041</td><td>Mercedes C200</td><td>Oil 5W-30</td><td>6 L</td><td>Samir H.</td><td>JOD 36</td><td>JOD 54</td><td><span class="pill good">33%</span></td></tr>
            <tr><td>WO-2039</td><td>Ford Ranger</td><td>Oil filter</td><td>1</td><td>Omar F.</td><td>JOD 4</td><td>JOD 10</td><td><span class="pill good">60%</span></td></tr>
            <tr><td>WO-2038</td><td>Honda Accord</td><td>Ceramic coating 30ml</td><td>1 unit</td><td>Feras N.</td><td>JOD 18</td><td>JOD 45</td><td><span class="pill good">60%</span></td></tr>
          </tbody></table></div>
        </div>
      </div>
    </section>`;

SCREENS["screen-team"] = `<section class="screen" id="screen-team">
      <div class="page-head"><div><h1>Team &amp; Bays</h1><div class="sub">Staff utilization, shift management &amp; bay status</div></div>
        <div class="head-actions">
          <select class="vert" style="font-size:12px;"><option>All roles</option><option>Technician</option><option>Reception</option><option>Driver</option></select>
          <button class="btn primary" onclick="showToast('Shift schedule opened (concept)')">＋ Manage shifts</button>
        </div>
      </div>

      <div class="grid" style="grid-template-columns:3fr 2fr;margin-bottom:14px;">
        <!-- Staff -->
        <div class="card">
          <h3>Staff Utilization</h3>
          <div class="staff-row">
            <div class="staff-avatar">SH</div>
            <div class="staff-info">
              <div class="sn">Samir H. <span class="pill blue">Technician</span> <span class="pill good">On shift</span></div>
              <div class="sm">Bay 3 · WO-2041 · Brakes · 1h 42m active · Skills: mechanical, diagnostic</div>
              <div class="sm">Utilization:</div>
              <div class="util-bar"><i style="width:82%"></i></div>
            </div>
            <div style="text-align:end;font-size:12px;"><strong>82%</strong><div style="color:var(--muted)">3 jobs done</div><div style="color:var(--muted)">Est. commission: JOD 24</div></div>
          </div>
          <div class="staff-row">
            <div class="staff-avatar">OF</div>
            <div class="staff-info">
              <div class="sn">Omar F. <span class="pill blue">Technician</span> <span class="pill good">On shift</span></div>
              <div class="sm">Bay 5 · WO-2039 · Ford Ranger · Skills: mechanical, tire</div>
              <div class="sm">Utilization:</div>
              <div class="util-bar"><i style="width:68%"></i></div>
            </div>
            <div style="text-align:end;font-size:12px;"><strong>68%</strong><div style="color:var(--muted)">2 jobs done</div></div>
          </div>
          <div class="staff-row">
            <div class="staff-avatar">FN</div>
            <div class="staff-info">
              <div class="sn">Feras N. <span class="pill teal">Mobile Tech</span> <span class="pill blue">En route</span></div>
              <div class="sm">Mobile unit #2 · Dana Z. job · Skills: detailing, ceramic</div>
              <div class="sm">Utilization:</div>
              <div class="util-bar"><i style="width:90%"></i></div>
            </div>
            <div style="text-align:end;font-size:12px;"><strong>90%</strong><div style="color:var(--muted)">1 mobile job</div></div>
          </div>
          <div class="staff-row">
            <div class="staff-avatar">RA</div>
            <div class="staff-info">
              <div class="sn">Rami A. <span class="pill gray">Reception</span> <span class="pill good">On shift</span></div>
              <div class="sm">Front desk · 4 intakes processed · WhatsApp approvals managed</div>
              <div class="sm">Utilization:</div>
              <div class="util-bar"><i style="width:55%"></i></div>
            </div>
            <div style="text-align:end;font-size:12px;"><strong>55%</strong></div>
          </div>
          <div class="staff-row">
            <div class="staff-avatar">AK</div>
            <div class="staff-info">
              <div class="sn">Ahmad K. <span class="pill gray">Driver</span> <span class="pill warn">Delayed stop</span></div>
              <div class="sm">Route: 4 stops · 2 completed · 1 delayed drop-off</div>
            </div>
            <div style="display:flex;gap:5px;">
              <button class="btn sm" onclick="showToast('Ahmad K. assigned new stop')">Assign</button>
            </div>
          </div>
        </div>

        <!-- Bay status -->
        <div class="card">
          <h3>Bay Status Board</h3>
          <div class="bay-grid" style="margin-bottom:10px;">
            <div class="bay-card occupied"><div class="bay-name">Bay 1</div><div class="bay-status" style="color:var(--accent-2)">🔵 Occupied</div><div style="font-size:10px;color:var(--muted);margin-top:3px">Nissan Patrol · intake</div></div>
            <div class="bay-card available"><div class="bay-name">Bay 2</div><div class="bay-status" style="color:var(--good)">🟢 Available</div><div style="font-size:10px;color:var(--muted);margin-top:3px">Ready</div></div>
            <div class="bay-card occupied"><div class="bay-name">Bay 3</div><div class="bay-status" style="color:var(--accent-2)">🔵 Occupied</div><div style="font-size:10px;color:var(--muted);margin-top:3px">Mercedes · brakes</div></div>
            <div class="bay-card delayed"><div class="bay-name">Bay 4</div><div class="bay-status" style="color:var(--warn)">🟡 Delayed</div><div style="font-size:10px;color:var(--muted);margin-top:3px">Hyundai Tucson</div></div>
            <div class="bay-card occupied"><div class="bay-name">Bay 5</div><div class="bay-status" style="color:var(--accent-2)">🔵 Occupied</div><div style="font-size:10px;color:var(--muted);margin-top:3px">Ford Ranger</div></div>
            <div class="bay-card cleaning"><div class="bay-name">Bay 6</div><div class="bay-status" style="color:var(--muted)">🔘 Cleaning</div><div style="font-size:10px;color:var(--muted);margin-top:3px">Est. free: 15 min</div></div>
            <div class="bay-card available"><div class="bay-name">Bay 7</div><div class="bay-status" style="color:var(--good)">🟢 Available</div></div>
            <div class="bay-card" style="border-color:var(--bad);background:var(--bad-soft);"><div class="bay-name">Bay 8</div><div class="bay-status" style="color:var(--bad)">🔴 Out of service</div><div style="font-size:10px;color:var(--muted);margin-top:3px">Lift maintenance</div></div>
          </div>
          <div style="font-size:12px;color:var(--muted)">5 of 8 bays active · 1 delayed · 1 unavailable</div>
        </div>
      </div>
    </section>`;

SCREENS["screen-techworkspace"] = `<section class="screen" id="screen-techworkspace">
      <div class="page-head">
        <div><h1 data-i18n="nav_techworkspace">My Workspace</h1><div class="sub">Samir H. · Technician · Bay 3 · <span class="pill good">On Shift</span></div></div>
        <div class="head-actions">
          <span style="display:flex;align-items:center;gap:5px;font-size:12px;color:var(--good);font-weight:600"><span style="width:8px;height:8px;border-radius:50%;background:var(--good)"></span>Online · Synced</span>
        </div>
      </div>

      <!-- Primary CTA -->
      <button class="tw-cta" onclick="go('workorder')">
        <span class="ic"><svg viewBox="0 0 24 24"><use href="#ic-tools"/></svg></span>
        Continue: Mercedes C200 · WO-2041 · Brake Overhaul
      </button>

      <div class="grid" style="grid-template-columns:1fr 1fr;gap:14px;">

        <!-- My Jobs -->
        <div class="tw-card">
          <div class="tw-card-head">
            <h3 data-i18n="tw_my_jobs">My Jobs</h3>
            <span class="pill blue">3 active</span>
          </div>
          <div class="tw-job-row current" onclick="go('workorder')">
            <div class="tw-job-num">1</div>
            <div style="flex:1;min-width:0">
              <div class="tw-job-veh">Mercedes C200 2019</div>
              <div class="tw-job-meta">WO-2041 · Brake Overhaul · Bay 3</div>
            </div>
            <div class="tw-job-time">1h 42m</div>
          </div>
          <div class="tw-job-row" onclick="showToast('WO-2039 opened')">
            <div class="tw-job-num">2</div>
            <div style="flex:1;min-width:0">
              <div class="tw-job-veh">Ford Ranger 2023</div>
              <div class="tw-job-meta">WO-2039 · Tire Change ×4 · Bay 5</div>
            </div>
            <div class="tw-job-time">Queued</div>
          </div>
          <div class="tw-job-row" onclick="showToast('WO-2043 opened')">
            <div class="tw-job-num">3</div>
            <div style="flex:1;min-width:0">
              <div class="tw-job-veh">Nissan Patrol 2022</div>
              <div class="tw-job-meta">WO-2043 · Oil Change · Intake pending</div>
            </div>
            <div class="tw-job-time">Scheduled</div>
          </div>
        </div>

        <!-- Tasks -->
        <div class="tw-card">
          <div class="tw-card-head">
            <h3 data-i18n="tw_tasks">Tasks · WO-2041</h3>
            <span class="pill warn">2 remaining</span>
          </div>
          <div class="tw-task-row tdone"><input type="checkbox" checked onchange="twTask(this)"/><span class="ttl">Drain old brake fluid</span></div>
          <div class="tw-task-row tdone"><input type="checkbox" checked onchange="twTask(this)"/><span class="ttl">Remove front caliper</span></div>
          <div class="tw-task-row tdone"><input type="checkbox" checked onchange="twTask(this)"/><span class="ttl">Replace brake pads (OEM set)</span></div>
          <div class="tw-task-row"><input type="checkbox" onchange="twTask(this)"/><span class="ttl">Machine brake rotors</span></div>
          <div class="tw-task-row"><input type="checkbox" onchange="twTask(this)"/><span class="ttl">Bleed and refill brake fluid</span></div>
          <div class="tw-task-row"><input type="checkbox" onchange="twTask(this)"/><span class="ttl">Test drive and verify braking</span></div>
        </div>

        <!-- Evidence capture -->
        <div class="tw-card">
          <div class="tw-card-head">
            <h3 data-i18n="tw_evidence">Evidence · WO-2041</h3>
            <span class="pill warn">1 missing</span>
          </div>
          <div style="padding:6px 14px 4px;font-size:11px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.04em">During Service</div>
          <div class="tw-photo-grid">
            <div class="tw-p twdone" onclick="openEvidenceModal('Old brake pads','During','Today 11:20','Samir H.','timestamped')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-check-circle"/></svg></span><span style="font-size:10px">Old pads</span></div>
            <div class="tw-p twdone" onclick="openEvidenceModal('Rotor surface','During','Today 11:35','Samir H.','timestamped')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-check-circle"/></svg></span><span style="font-size:10px">Rotor</span></div>
            <div class="tw-p" onclick="WF._addPhoto('Service');showToast('Photo added')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-camera"/></svg></span><span style="font-size:10px">After</span></div>
            <div class="tw-p" onclick="WF._addPhoto('Service');showToast('Photo added')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-plus"/></svg></span><span style="font-size:10px">Add</span></div>
          </div>
          <div style="padding:4px 14px 10px;font-size:11.5px;color:var(--muted)">Photo Evidence History: 2 timestamped · 1 pending</div>
        </div>

        <!-- Parts & QA -->
        <div class="tw-card">
          <div class="tw-card-head">
            <h3 data-i18n="tw_parts">Parts Used</h3>
            <button class="btn sm" onclick="WF.reorderPart('P001')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-plus"/></svg></span> Request</button>
          </div>
          <div class="tw-part-row"><div style="flex:1"><div style="font-weight:600">Brake pad set (OEM)</div><div style="font-size:11.5px;color:var(--muted)">BP-C200-F · 1 set</div></div><span class="pill good">Issued</span></div>
          <div class="tw-part-row"><div style="flex:1"><div style="font-weight:600">Engine oil 5W-30</div><div style="font-size:11.5px;color:var(--muted)">OIL-5W30 · 6 L</div></div><span class="pill good">Issued</span></div>
          <div class="tw-card-head" style="border-top:1px solid var(--line);margin-top:8px;">
            <h3 data-i18n="tw_qa">QA Checklist</h3>
          </div>
          <div class="tw-qa-row"><span class="qai">Brake pedal firm and responsive?</span><div style="display:flex;gap:5px"><button class="qabtn pass" onclick="twQa(this,'pass')">Pass</button><button class="qabtn" onclick="twQa(this,'fail')">Fail</button></div></div>
          <div class="tw-qa-row"><span class="qai">No fluid leaks observed?</span><div style="display:flex;gap:5px"><button class="qabtn" onclick="twQa(this,'pass')">Pass</button><button class="qabtn" onclick="twQa(this,'fail')">Fail</button></div></div>
          <div class="tw-qa-row"><span class="qai">After photos captured?</span><div style="display:flex;gap:5px"><button class="qabtn" onclick="twQa(this,'pass')">Pass</button><button class="qabtn" onclick="twQa(this,'fail')">Fail</button></div></div>
        </div>

      </div><!-- /grid -->

      <!-- Sync status -->
      <div class="tw-card" style="margin-top:4px">
        <div class="tw-card-head"><h3 data-i18n="tw_sync">Sync Status</h3></div>
        <div class="tw-sync-row"><span class="tw-sdot"></span><span>WO-2041 changes synced · 2 min ago</span></div>
        <div class="tw-sync-row"><span class="tw-sdot"></span><span>2 photos uploaded to Photo Evidence History</span></div>
        <div class="tw-sync-row" style="color:var(--muted)"><span class="tw-sdot warn"></span><span>1 photo pending upload · will sync when online</span></div>
      </div>

      <!-- Tech Notes -->
      <div class="tw-card">
        <div class="tw-card-head">
          <h3 data-i18n="tw_notes">Tech Notes</h3>
          <button class="btn sm" onclick="WF.addTechNote('WO-2041')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-plus"/></svg></span> Add</button>
        </div>
        <div style="padding:10px 14px;">
          <textarea class="tw-note-input" placeholder="Add a note for this job…" rows="2"></textarea>
        </div>
        <div class="tw-note-row">
          <div class="tw-note-meta">Samir H. · Today 11:20</div>
          <div>Left caliper slightly worn — monitor at next visit.</div>
        </div>
        <div class="tw-note-row">
          <div class="tw-note-meta">Samir H. · Today 10:45</div>
          <div>Customer declined alignment — already in declined-work wallet.</div>
        </div>
      </div>
    </section>`;

SCREENS["screen-memberships"] = `<section class="screen" id="screen-memberships">
      <div class="page-head"><div><h1>Memberships &amp; Loyalty</h1><div class="sub">Recurring care plans · active subscriptions</div></div></div>
      <div class="grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:16px;">
        <div class="card"><h3>Basic</h3><div class="v" style="font-size:22px;font-weight:800">JOD 19/mo</div><p style="color:var(--muted);font-size:12px">2 washes · digital passport · reminders</p><div class="pill good">142 active</div></div>
        <div class="card" style="border-color:var(--accent)"><h3>Premium <span class="pill teal">Popular</span></h3><div class="v" style="font-size:22px;font-weight:800">JOD 49/mo</div><p style="color:var(--muted);font-size:12px">Service discounts · priority bay · warranty tracking · declined work alerts</p><div class="pill good">89 active</div></div>
        <div class="card"><h3>Fleet</h3><div class="v" style="font-size:22px;font-weight:800">Custom</div><p style="color:var(--muted);font-size:12px">Multi-vehicle dashboard · monthly reports · dedicated manager</p><div class="pill blue">12 accounts</div></div>
      </div>

      <!-- Active Subscribers -->
      <div class="tbl-card">
        <div class="tbl-toolbar2">
          <div class="ts-wrap">
            <span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-search"/></svg></span>
            <input type="text" placeholder="Search member or vehicle…"/>
          </div>
          <select class="tf">
            <option>All Plans</option>
            <option>Basic</option>
            <option>Premium</option>
            <option>Fleet</option>
          </select>
          <select class="tf">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Expiring soon</option>
            <option>Cancelled</option>
          </select>
          <div style="margin-inline-start:auto;display:flex;align-items:center;gap:8px;">
            <span class="tbl-count">243 members</span>
            <button class="btn sm primary" onclick="showToast('Membership module · add member via Customer profile')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-plus"/></svg></span> Add Member</button>
          </div>
        </div>
        <div style="overflow-x:auto;">
          <table class="tbl2">
            <thead>
              <tr>
                <th>Member</th>
                <th>Vehicle</th>
                <th>Plan</th>
                <th>Since</th>
                <th>Next Renewal</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Khalid Mansour</strong><div style="font-size:11px;color:var(--muted)">+962 77 123 4567</div></td>
                <td>Toyota Land Cruiser 2023</td>
                <td><span class="pill teal">Premium</span></td>
                <td>Jan 2025</td>
                <td>1 Jul 2026</td>
                <td><span class="pill good">Active</span></td>
                <td><button class="btn sm" onclick="openVehicle()">Passport</button></td>
              </tr>
              <tr>
                <td><strong>Maya Khalil</strong><div style="font-size:11px;color:var(--muted)">+962 79 987 6543</div></td>
                <td>Honda Accord 2021</td>
                <td><span class="pill">Basic</span></td>
                <td>Mar 2025</td>
                <td>15 Jun 2026</td>
                <td><span class="pill warn">Expiring</span></td>
                <td><button class="btn sm primary" onclick="showToast('Renewal reminder sent')">Renew</button></td>
              </tr>
              <tr>
                <td><strong>Saeed Al-Otaibi</strong><div style="font-size:11px;color:var(--muted)">+966 50 111 2222</div></td>
                <td>Nissan Patrol 2022</td>
                <td><span class="pill teal">Premium</span></td>
                <td>Feb 2024</td>
                <td>1 Aug 2026</td>
                <td><span class="pill good">Active</span></td>
                <td><button class="btn sm" onclick="showToast('Member profile opened')">View</button></td>
              </tr>
              <tr>
                <td><strong>Dana Ziadeh</strong><div style="font-size:11px;color:var(--muted)">+962 78 555 3344</div></td>
                <td>Lexus RX 2022</td>
                <td><span class="pill">Basic</span></td>
                <td>Jun 2025</td>
                <td>1 Jul 2026</td>
                <td><span class="pill good">Active</span></td>
                <td><button class="btn sm" onclick="showToast('Member profile opened')">View</button></td>
              </tr>
              <tr>
                <td><strong>Al-Rawabi Fleet</strong><div style="font-size:11px;color:var(--muted)">Fleet account · 8 vehicles</div></td>
                <td>Multiple vehicles</td>
                <td><span class="pill blue">Fleet</span></td>
                <td>Nov 2024</td>
                <td>1 Nov 2026</td>
                <td><span class="pill good">Active</span></td>
                <td><button class="btn sm" onclick="showToast('Fleet account opened')">Manage</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>`;

SCREENS["screen-reports"] = `<section class="screen" id="screen-reports">
      <div class="page-head"><div><h1>Reports &amp; Analytics</h1><div class="sub">Operational, financial &amp; network KPIs</div></div>
        <div class="head-actions">
        <select class="vert" id="reportPeriodSelect" onchange="WF.renderReports()"><option value="month">This month</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option></select>
        <button class="btn sm" onclick="WF.exportReport()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-download"/></svg></span> Export</button>
      </div>
      </div>

      <!-- Top stats -->
      <div class="summary-row" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px;">
        <div class="stat"><div class="k">MTD Revenue</div><div class="v" style="font-size:20px" id="rep-revenue">JOD 41k</div><div class="d">+12% vs last month</div></div>
        <div class="stat"><div class="k">Bookings</div><div class="v" id="rep-bookings">312</div><div class="d">+8 this week</div></div>
        <div class="stat"><div class="k">Jobs complete</div><div class="v" id="rep-complete">22 min</div><div class="d">↓ 4 min improvement</div></div>
        <div class="stat"><div class="k">Invoices</div><div class="v" id="rep-invoices">89%</div><div class="d">incl. unpaid</div></div>
      </div>

      <div class="grid" style="grid-template-columns:1fr 1fr;margin-bottom:16px;">
        <!-- Operational KPIs -->
        <div class="card">
          <h3>Operational KPIs</h3>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;"><span>New bookings</span><strong>187</strong></div><div class="bar"><i style="width:74%"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;"><span>Booking-to-show rate</span><strong>82%</strong></div><div class="bar"><i style="width:82%"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;"><span>Estimate approval rate</span><strong>84%</strong></div><div class="bar"><i style="width:84%"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;"><span>Bay utilization</span><strong>71%</strong></div><div class="bar"><i style="width:71%"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;"><span>Technician utilization</span><strong>76%</strong></div><div class="bar"><i style="width:76%"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;"><span>Avg repair order value</span><strong>JOD 205</strong></div><div class="bar"><i style="width:68%"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;"><span>Declined-work recovery rate</span><strong>31%</strong></div><div class="bar"><i style="width:31%"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;"><span>Inventory gross-margin leakage</span><strong>3.2%</strong></div><div class="bar"><i style="width:22%"></i></div></div>
          </div>
        </div>

        <!-- Network & passport KPIs -->
        <div class="card">
          <h3>Network &amp; Passport KPIs</h3>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;"><span>Repeat visit rate (90 days)</span><strong>62%</strong></div><div class="bar"><i style="width:62%"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;"><span>Repeat visit rate (180 days)</span><strong>78%</strong></div><div class="bar"><i style="width:78%"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;"><span>Customer-app active vehicles</span><strong>234</strong></div><div class="bar"><i style="width:58%"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;"><span>Passport share rate</span><strong>44%</strong></div><div class="bar"><i style="width:44%"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;"><span>Warranty claims MTD</span><strong>7</strong></div><div class="bar"><i style="width:14%"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;"><span>Returning Issues MTD</span><strong>3</strong></div><div class="bar"><i style="width:10%"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;"><span>Consumables cost variance</span><strong>+1.8%</strong></div><div class="bar" style="background:var(--warn-soft);"><i style="width:18%;background:var(--warn)"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;"><span>Compliance error rate</span><strong>0.4%</strong></div><div class="bar"><i style="width:4%"></i></div></div>
          </div>
        </div>
      </div>

      <!-- Revenue by vertical -->
      <div class="card" style="margin-bottom:14px;">
        <h3>Revenue by Vertical &amp; Branch</h3>
        <div style="display:flex;gap:16px;flex-wrap:wrap;">
          <div style="flex:1;min-width:200px;">
            <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:8px;">By service type</div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:2px;"><span>🔧 Workshop / Mechanical</span><strong>JOD 24,200</strong></div><div class="bar"><i style="width:72%"></i></div></div>
              <div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:2px;"><span>✨ Detailing</span><strong>JOD 9,800</strong></div><div class="bar"><i style="width:29%"></i></div></div>
              <div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:2px;"><span>💧 Car Wash</span><strong>JOD 4,100</strong></div><div class="bar"><i style="width:12%"></i></div></div>
              <div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:2px;"><span>🛞 Tire &amp; Battery</span><strong>JOD 2,900</strong></div><div class="bar"><i style="width:9%"></i></div></div>
            </div>
          </div>
          <div style="flex:1;min-width:200px;">
            <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:8px;">By branch</div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:2px;"><span>Al-Rawabi Main</span><strong>JOD 28,400</strong></div><div class="bar"><i style="width:84%"></i></div></div>
              <div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:2px;"><span>Al-Rawabi North</span><strong>JOD 12,600</strong></div><div class="bar"><i style="width:37%"></i></div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Intelligence insights -->
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3 style="margin:0">Insights · Beta</h3>
          <span class="beta-label">✦ Simulated Beta Insight · mock data only</span>
        </div>
        <div class="insight-item"><div class="ii-ic"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-trending-up"/></svg></span></div><div class="ii-body"><div class="ii-t">Suggested service upsell · 12 vehicles due for major service</div><div class="ii-m">Predicted by mileage trend · est. revenue opportunity: JOD 2,400</div></div><button class="btn sm" onclick="showToast('Campaign drafted · 12 customers queued for follow-up')">Create campaign</button></div>
        <div class="insight-item"><div class="ii-ic"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-alert-triangle"/></svg></span></div><div class="ii-body"><div class="ii-t">Returning Issue Risk alert · 3 vehicles</div><div class="ii-m">Two consecutive visits with same complaint · manager review recommended</div></div><button class="btn sm" onclick="go('aftercare')">Review</button></div>
        <div class="insight-item"><div class="ii-ic"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-package"/></svg></span></div><div class="ii-body"><div class="ii-t">Low-stock forecast · Brake pad set C200 · 3 days</div><div class="ii-m">Current: 4 units · 3 active WOs requiring this SKU this week</div></div><button class="btn sm primary" onclick="WF.reorderPart('P001')">Auto-PO</button></div>
        <div class="insight-item"><div class="ii-ic"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-bar-chart"/></svg></span></div><div class="ii-body"><div class="ii-t">Bay 4 underutilized vs branch average</div><div class="ii-m">58% utilization this week · Branch avg: 71% · Consider reassignment</div></div></div>
        <div class="insight-item"><div class="ii-ic"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-users"/></svg></span></div><div class="ii-body"><div class="ii-t">Technician workload imbalance · Feras N. at 90%</div><div class="ii-m">Samir H. at 82%, Omar at 68% · rebalance recommended for PM shift</div></div></div>
        <div class="insight-item"><div class="ii-ic"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-sync"/></svg></span></div><div class="ii-body"><div class="ii-t">Declined-work recovery opportunity · JOD 880 total</div><div class="ii-m">5 customers with postponed work overdue for follow-up</div></div><button class="btn sm" onclick="go('aftercare')">Follow up</button></div>
      </div>
    </section>`;

SCREENS["screen-compliance"] = `<section class="screen" id="screen-compliance">
      <div class="page-head"><div><h1>Tax &amp; Legal Settings</h1><div class="sub">Country-specific tax, e-invoicing &amp; regulatory configuration · prototype examples only</div></div></div>

      <div class="card" style="margin-bottom:4px;background:var(--warn-soft);border-color:#f3dcc4;">
        <strong>⚠️ Prototype only</strong> — These are configuration examples. All country-specific legal, tax and accounting rules require validation with licensed advisors in each jurisdiction before production use.
      </div>

      <div class="country-grid" style="margin-top:14px;" id="complianceCountries">
        <div class="country-card on" onclick="showCompliance(this,'uae')"><div class="cf">🇦🇪</div><div class="cn">UAE</div><div class="cs">VAT 5% · e-Invoicing</div></div>
        <div class="country-card" onclick="showCompliance(this,'ksa')"><div class="cf">🇸🇦</div><div class="cn">Saudi Arabia</div><div class="cs">VAT 15% · FATOORA</div></div>
        <div class="country-card" onclick="showCompliance(this,'eg')"><div class="cf">🇪🇬</div><div class="cn">Egypt</div><div class="cs">VAT 14% · ETA</div></div>
        <div class="country-card" onclick="showCompliance(this,'jo')"><div class="cf">🇯🇴</div><div class="cn">Jordan</div><div class="cs">GST 16%</div></div>
        <div class="country-card" onclick="showCompliance(this,'qa')"><div class="cf">🇶🇦</div><div class="cn">Qatar</div><div class="cs">No VAT · QPAY</div></div>
      </div>

      <div class="card" id="complianceDetail">
        <div id="complianceContent"></div>
      </div>
    </section>`;

SCREENS["screen-integrations"] = `<section class="screen" id="screen-integrations">
      <div class="page-head"><div><h1>Integrations</h1><div class="sub">Payment gateways, accounting sync, VIN data &amp; messaging — prototype connector cards</div></div></div>

      <div class="tabs" id="intTabs">
        <div class="tab active" data-tab="payments" onclick="tabSwitch(this,'intTabs','intPanes')">Payments</div>
        <div class="tab" data-tab="accounting" onclick="tabSwitch(this,'intTabs','intPanes')">Accounting</div>
        <div class="tab" data-tab="vin" onclick="tabSwitch(this,'intTabs','intPanes')">VIN &amp; Vehicle Data</div>
        <div class="tab" data-tab="messaging" onclick="tabSwitch(this,'intTabs','intPanes')">Messaging</div>
      </div>

      <div id="intPanes">
        <div class="tabpane active" data-pane="payments">
          <div class="conn-grid">
            <div class="conn-card connected"><div class="conn-icon"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-credit-card"/></svg></span></div><div class="conn-info"><div class="cn">Checkout.com <span class="pill good">Connected</span></div><div class="cm">Cards · Apple Pay · UAE/KSA/JO</div></div><button class="btn sm" onclick="showToast('Checkout.com settings opened')">Configure</button></div>
            <div class="conn-card"><div class="conn-icon"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-credit-card"/></svg></span></div><div class="conn-info"><div class="cn">HyperPay</div><div class="cm">Cards · MENA region</div></div><button class="btn sm primary" onclick="showToast('HyperPay integration opened')">Connect</button></div>
            <div class="conn-card"><div class="conn-icon"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-credit-card"/></svg></span></div><div class="conn-info"><div class="cn">Network International</div><div class="cm">UAE · Oman · Cards</div></div><button class="btn sm" onclick="showToast('NI config opened')">Configure</button></div>
            <div class="conn-card"><div class="conn-icon"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-phone"/></svg></span></div><div class="conn-info"><div class="cn">Paymob</div><div class="cm">Egypt · Jordan</div></div><button class="btn sm primary" onclick="showToast('Paymob connect opened')">Connect</button></div>
            <div class="conn-card connected"><div class="conn-icon"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-credit-card"/></svg></span></div><div class="conn-info"><div class="cn">mada <span class="pill good">Connected</span></div><div class="cm">Saudi Arabia · domestic cards</div></div><button class="btn sm" onclick="showToast('mada configuration opened')">Configure</button></div>
            <div class="conn-card"><div class="conn-icon"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-phone"/></svg></span></div><div class="conn-info"><div class="cn">stc pay</div><div class="cm">Saudi Arabia · wallet</div></div><button class="btn sm primary" onclick="showToast('stc pay connect opened')">Connect</button></div>
            <div class="conn-card connected"><div class="conn-icon"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-phone"/></svg></span></div><div class="conn-info"><div class="cn">Apple Pay <span class="pill good">Enabled</span></div><div class="cm">via Checkout.com</div></div><button class="btn sm" onclick="showToast('Apple Pay settings opened')">Settings</button></div>
            <div class="conn-card"><div class="conn-icon"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-credit-card"/></svg></span></div><div class="conn-info"><div class="cn">QPAY</div><div class="cm">Qatar · national switch</div></div><button class="btn sm primary" onclick="showToast('QPAY config opened')">Connect</button></div>
            <div class="conn-card connected"><div class="conn-icon"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-settings"/></svg></span></div><div class="conn-info"><div class="cn">Card terminal <span class="pill good">Connected</span></div><div class="cm">Countertop · Bay terminals</div></div><button class="btn sm" onclick="showToast('Terminal settings opened')">Settings</button></div>
          </div>
        </div>

        <div class="tabpane" data-pane="accounting">
          <div class="conn-grid">
            <div class="conn-card connected"><div class="conn-icon"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-sync"/></svg></span></div><div class="conn-info"><div class="cn">Xero <span class="pill good">Synced</span></div><div class="cm">Last sync: 5 min ago · Invoices ✓ Payments ✓ Customers ✓</div></div><button class="btn sm" onclick="showToast('Xero sync triggered')">Sync now</button></div>
            <div class="conn-card"><div class="conn-icon"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-file-text"/></svg></span></div><div class="conn-info"><div class="cn">QuickBooks Online</div><div class="cm">Not connected</div></div><button class="btn sm primary" onclick="showToast('QuickBooks connect opened')">Connect</button></div>
            <div class="conn-card"><div class="conn-icon"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-file-text"/></svg></span></div><div class="conn-info"><div class="cn">Zoho Books</div><div class="cm">Not connected</div></div><button class="btn sm primary" onclick="showToast('Zoho connect opened')">Connect</button></div>
            <div class="conn-card"><div class="conn-icon"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-plug"/></svg></span></div><div class="conn-info"><div class="cn">Odoo</div><div class="cm">Self-hosted ERP sync</div></div><button class="btn sm primary" onclick="showToast('Odoo config opened')">Connect</button></div>
          </div>
        </div>

        <div class="tabpane" data-pane="vin">
          <div class="card">
            <h3>VIN &amp; Vehicle Data</h3>
            <table class="tbl"><thead><tr><th>Provider</th><th>Tier</th><th>Status</th><th>Coverage</th><th>Action</th></tr></thead><tbody>
              <tr><td>Baseline VIN Decode</td><td>Included</td><td><span class="pill good">Active</span></td><td>Make, model, year, fuel</td><td>—</td></tr>
              <tr><td>Premium trim &amp; options enrichment</td><td>Add-on</td><td><span class="pill warn">Not enabled</span></td><td>Trim level, color, options, market</td><td><button class="btn sm primary" onclick="showToast('Upgrade to Pro plan to enable · contact support')">Upgrade</button></td></tr>
            </tbody></table>
          </div>
        </div>

        <div class="tabpane" data-pane="messaging">
          <div class="conn-grid">
            <div class="conn-card connected"><div class="conn-icon"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-message"/></svg></span></div><div class="conn-info"><div class="cn">WhatsApp Business <span class="pill good">Active</span></div><div class="cm">Templates: approval, reminder, receipt · 340 messages this month</div></div><button class="btn sm" onclick="showToast('WhatsApp template editor opened')">Templates</button></div>
            <div class="conn-card connected"><div class="conn-icon"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-message"/></svg></span></div><div class="conn-info"><div class="cn">SMS fallback <span class="pill good">Active</span></div><div class="cm">Arabic + English · fallback when WhatsApp unavailable</div></div><button class="btn sm" onclick="showToast('SMS settings opened')">Settings</button></div>
            <div class="conn-card connected"><div class="conn-icon"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-download"/></svg></span></div><div class="conn-info"><div class="cn">Email receipts <span class="pill good">Active</span></div><div class="cm">Invoice, estimate &amp; passport share links</div></div><button class="btn sm" onclick="showToast('Email template editor opened')">Templates</button></div>
          </div>
        </div>
      </div>
    </section>`;

SCREENS["screen-calendar"] = `<section class="screen" id="screen-calendar">
      <div class="page-head" style="margin-bottom:12px;">
        <div>
          <h1 data-i18n="cal_header">Calendar &amp; Bay Schedule</h1>
          <div class="sub" id="calDateLabel">Thursday, 4 June 2026</div>
        </div>
        <div class="head-actions">
          <button class="btn primary" onclick="openBookingWizard()"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-plus"/></svg></span><span data-i18n="dash_new_booking"> New Booking</span></button>
        </div>
      </div>

      <!-- Calendar toolbar (glass) -->
      <div class="cal-toolbar">
        <div class="cal-nav">
          <button class="cal-nav-btn" onclick="calPrev()" title="Previous day"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg></span></button>
          <button class="cal-nav-btn" onclick="calToday()" data-i18n="cal_today" style="width:auto;padding:0 10px;font-size:12px;font-weight:600;">Today</button>
          <button class="cal-nav-btn" onclick="calNext()" title="Next day"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></span></button>
        </div>
        <div class="cal-date-label" id="calDateLabelTb" style="font-size:13px;font-weight:700;min-width:auto;padding:0 8px;">Thu 4 Jun 2026</div>
        <div class="cal-view-toggle">
          <button data-view="day" class="active" onclick="setCalView('day')" data-i18n="cal_day">Day</button>
          <button data-view="week" onclick="setCalView('week')" data-i18n="cal_week">Week</button>
        </div>
        <div class="cal-filter-sep"></div>
        <select class="cal-filter"><option data-i18n="filter_all">All Branches</option><option>Al-Rawabi Main</option></select>
        <select class="cal-filter"><option data-i18n="filter_all">All Bays</option><option>Bay 1</option><option>Bay 2</option><option>Bay 3</option><option>Bay 4</option></select>
        <select class="cal-filter"><option data-i18n="filter_all">All Technicians</option><option>Samir H.</option><option>Omar F.</option><option>Feras N.</option></select>
        <select class="cal-filter"><option data-i18n="filter_all">All Statuses</option><option>Booked</option><option>In Service</option><option>QC</option><option>Ready</option></select>
        <div style="margin-inline-start:auto;display:flex;gap:6px;align-items:center;font-size:11px;flex-wrap:wrap;">
          <span style="display:flex;align-items:center;gap:3px"><span style="width:10px;height:10px;border-radius:2px;background:#dbeafe;display:inline-block;border-inline-start:3px solid #2563eb"></span>Workshop</span>
          <span style="display:flex;align-items:center;gap:3px"><span style="width:10px;height:10px;border-radius:2px;background:#f3e8ff;display:inline-block;border-inline-start:3px solid #9333ea"></span>Detailing</span>
          <span style="display:flex;align-items:center;gap:3px"><span style="width:10px;height:10px;border-radius:2px;background:#fef3c7;display:inline-block;border-inline-start:3px solid #d97706"></span>Tire</span>
        </div>
      </div>

      <!-- Calendar body + queue sidebar -->
      <div class="cal-body-wrap">
        <!-- Bay grid -->
        <div class="cal-grid-wrap" id="calGridWrap"></div>

        <!-- Live queue sidebar -->
        <div class="queue-wrap">
          <div class="queue-hd">
            <span><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-users"/></svg></span> <span data-i18n="cal_queue_title">Live Queue</span></span>
            <span class="pill warn">3 waiting</span>
          </div>
          <div class="queue-tabs">
            <button class="queue-tab active" onclick="queueTab(this,'queue-body-waiting')">Waiting</button>
            <button class="queue-tab" onclick="queueTab(this,'queue-body-bays')">Bays</button>
          </div>
          <div class="queue-body" id="calQueueBody" data-panel="queue-body-waiting"></div>
          <div class="queue-body" id="calBayBody" data-panel="queue-body-bays" style="display:none;"></div>
        </div>
      </div>
    </section>`;

SCREENS["screen-settings"] = `<section class="screen" id="screen-settings">
      <div class="page-head"><div><h1>Settings</h1><div class="sub">Studio profile, team, compliance &amp; platform configuration</div></div></div>

      <div class="tabs" id="setTabs">
        <div class="tab active" data-tab="general" onclick="tabSwitch(this,'setTabs','setPanes')">General</div>
        <div class="tab" data-tab="roles" onclick="tabSwitch(this,'setTabs','setPanes')">Roles &amp; Permissions</div>
        <div class="tab" data-tab="consent" onclick="tabSwitch(this,'setTabs','setPanes')">Consent</div>
        <div class="tab" data-tab="auditlog" onclick="tabSwitch(this,'setTabs','setPanes')">Audit Log</div>
        <div class="tab" data-tab="sharing" onclick="tabSwitch(this,'setTabs','setPanes')">Sharing Rules</div>
        <div class="tab" data-tab="migration" onclick="tabSwitch(this,'setTabs','setPanes')">Import &amp; Migration</div>
        <div class="tab" data-tab="offline" onclick="tabSwitch(this,'setTabs','setPanes')">Offline &amp; Sync</div>
      </div>

      <div id="setPanes">
        <div class="tabpane active" data-pane="general">
          <div class="grid" style="grid-template-columns:1fr 1fr;gap:14px;">
            <div class="card">
              <h3 style="margin:0 0 14px">Business Profile</h3>
              <div style="display:grid;gap:10px;">
                <label class="form-label">Workshop Name
                  <input class="form-input" data-setting="workshopName" placeholder="e.g. Al-Rawabi Auto Care"/>
                </label>
                <label class="form-label">Legal / Registered Name
                  <input class="form-input" data-setting="legalName" placeholder="e.g. Al-Rawabi Auto Services LLC"/>
                </label>
                <label class="form-label">Registration Number
                  <input class="form-input" data-setting="regNumber" placeholder="e.g. JO-54321-2019"/>
                </label>
                <label class="form-label">Branch
                  <input class="form-input" data-setting="branch" placeholder="e.g. Amman — Main Branch"/>
                </label>
                <label class="form-label">Address
                  <input class="form-input" data-setting="address" placeholder="Street, City, Country"/>
                </label>
              </div>
            </div>
            <div class="card">
              <h3 style="margin:0 0 14px">Contact &amp; Billing</h3>
              <div style="display:grid;gap:10px;">
                <label class="form-label">Phone
                  <input class="form-input" type="tel" data-setting="phone" placeholder="+962 6 555 0100"/>
                </label>
                <label class="form-label">Email
                  <input class="form-input" type="email" data-setting="email" placeholder="ops@example.com"/>
                </label>
                <label class="form-label">Currency
                  <select class="form-input" data-setting="currency">
                    <option value="JOD">JOD — Jordanian Dinar</option>
                    <option value="SAR">SAR — Saudi Riyal</option>
                    <option value="AED">AED — UAE Dirham</option>
                    <option value="EGP">EGP — Egyptian Pound</option>
                    <option value="QAR">QAR — Qatari Riyal</option>
                    <option value="USD">USD — US Dollar</option>
                  </select>
                </label>
                <label class="form-label">Tax Rate (%)
                  <input class="form-input" type="number" data-setting="taxRate" min="0" max="30" step="0.5" placeholder="16"/>
                </label>
                <label class="form-label">Invoice Number Prefix
                  <input class="form-input" data-setting="invoicePrefix" placeholder="INV-"/>
                </label>
              </div>
            </div>
          </div>
          <div style="display:flex;justify-content:flex-end;margin-top:12px;gap:8px;">
            <button class="btn" onclick="WF.renderSettings()">Reset</button>
            <button class="btn primary" onclick="WF.saveSettings()">Save Settings</button>
          </div>
        </div>

        <div class="tabpane" data-pane="roles">
          <div class="card">
            <h3>Roles &amp; Permissions</h3>
            <table class="tbl"><thead><tr><th>Permission</th><th>Owner</th><th>Branch Mgr</th><th>Reception</th><th>Technician</th><th>Accountant</th><th>Fleet Mgr</th></tr></thead><tbody>
              <tr><td>View customer PII</td><td>✅</td><td>✅</td><td>✅</td><td>—</td><td>—</td><td>✅</td></tr>
              <tr><td>View internal notes</td><td>✅</td><td>✅</td><td>—</td><td>✅</td><td>—</td><td>—</td></tr>
              <tr><td>Edit work orders</td><td>✅</td><td>✅</td><td>—</td><td>✅</td><td>—</td><td>—</td></tr>
              <tr><td>Approve overrides</td><td>✅</td><td>✅</td><td>—</td><td>—</td><td>—</td><td>—</td></tr>
              <tr><td>View supplier cost</td><td>✅</td><td>✅</td><td>—</td><td>—</td><td>✅</td><td>—</td></tr>
              <tr><td>Issue refund</td><td>✅</td><td>✅</td><td>—</td><td>—</td><td>✅</td><td>—</td></tr>
              <tr><td>Export passport</td><td>✅</td><td>✅</td><td>✅</td><td>—</td><td>—</td><td>✅</td></tr>
              <tr><td>Access reports</td><td>✅</td><td>✅</td><td>—</td><td>—</td><td>✅</td><td>✅</td></tr>
            </tbody></table>
          </div>
        </div>

        <div class="tabpane" data-pane="consent">
          <div class="card">
            <h3>Customer Consent Management</h3>
            <table class="tbl"><thead><tr><th>Consent type</th><th>Default</th><th>Pending</th><th>Granted</th><th>Declined</th></tr></thead><tbody>
              <tr><td>Customer app access</td><td>Opt-in</td><td>8</td><td>234</td><td>12</td></tr>
              <tr><td>WhatsApp communications</td><td>Opt-in</td><td>4</td><td>281</td><td>19</td></tr>
              <tr><td>Marketing messages</td><td>Opt-in</td><td>22</td><td>178</td><td>122</td></tr>
              <tr><td>Passport sharing (customer)</td><td>Opt-in</td><td>6</td><td>196</td><td>38</td></tr>
              <tr><td>Buyer-link sharing</td><td>Explicit</td><td>2</td><td>44</td><td>156</td></tr>
              <tr><td>Data retention (5 years)</td><td>Automatic</td><td>—</td><td>All</td><td>—</td></tr>
            </tbody></table>
          </div>
        </div>

        <div class="tabpane" data-pane="auditlog">
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0">Platform Audit Log</h3>
              <button class="btn sm" onclick="showToast('Audit report exported (concept)')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-download"/></svg></span> Export</button>
            </div>
            <div class="audit-row"><span class="aa">Rami A.</span><span class="am">Passport link generated · VH-1042 · buyer scope · 7 days</span><span style="margin-inline-start:auto;font-size:11px;color:var(--muted)">4 Jun 2026 09:14</span></div>
            <div class="audit-row"><span class="aa">Rami A.</span><span class="am">Intake override approved · VH-1045 · missing photo 7 · reason: vehicle too dirty</span><span style="margin-inline-start:auto;font-size:11px;color:var(--muted)">4 Jun 2026 08:51</span></div>
            <div class="audit-row"><span class="aa">Samir H.</span><span class="am">Work order WO-2041 created · Mercedes C200 2019</span><span style="margin-inline-start:auto;font-size:11px;color:var(--muted)">4 Jun 2026 08:10</span></div>
            <div class="audit-row"><span class="aa">Khalid M. (customer)</span><span class="am">Estimate EST-558 approved via WhatsApp link · digital signature</span><span style="margin-inline-start:auto;font-size:11px;color:var(--muted)">4 Jun 2026 09:36</span></div>
            <div class="audit-row"><span class="aa">Rami A.</span><span class="am">Evidence visibility changed · WO-2041 photo 2 → Shared</span><span style="margin-inline-start:auto;font-size:11px;color:var(--muted)">3 Jun 2026 17:20</span></div>
            <div class="audit-row"><span class="aa">System</span><span class="am">Invoice INV-3081 issued · Land Cruiser 2023 · JOD 335</span><span style="margin-inline-start:auto;font-size:11px;color:var(--muted)">12 Mar 2026 15:00</span></div>
          </div>
        </div>

        <div class="tabpane" data-pane="sharing">
          <div class="card placeholder"><div><div class="big">🔗</div><p>Configure default sharing rules, link expiry policies<br>and passport visibility permissions per role.</p></div></div>
        </div>

        <div class="tabpane" data-pane="migration">
          <div class="card" style="margin-bottom:12px;background:var(--warn-soft);border-color:#f3dcc4;">
            <strong>⚠️ Prototype only</strong> — No files are actually imported. This is a simulated migration wizard for demonstration.
          </div>
          <div class="card">
            <h3>Import &amp; Migration Wizard</h3>
            <div class="wizard-steps">
              <div class="wz done"><div class="wc">✓</div><div class="wl">Upload CSV</div></div>
              <div class="wz done"><div class="wc">✓</div><div class="wl">Map fields</div></div>
              <div class="wz active"><div class="wc">3</div><div class="wl">Validate</div></div>
              <div class="wz"><div class="wc">4</div><div class="wl">Preview</div></div>
            </div>
            <div style="margin-bottom:14px;">
              <select class="vert" style="width:100%;margin-bottom:10px;"><option>Customers &amp; vehicles</option><option>Inventory</option><option>Services catalog</option><option>Open work orders</option><option>Future appointments</option><option>Outstanding balances</option></select>
            </div>
            <div style="background:#fafbfd;border:1px solid var(--line);border-radius:var(--radius-sm);padding:12px;margin-bottom:14px;">
              <div class="import-stat"><span class="isk">Records detected</span><span class="isv">842</span></div>
              <div class="import-stat"><span class="isk">Valid records</span><span class="isv" style="color:var(--good)">801</span></div>
              <div class="import-stat"><span class="isk">Warnings</span><span class="isv" style="color:var(--warn)">28</span></div>
              <div class="import-stat"><span class="isk">Duplicates detected</span><span class="isv" style="color:var(--warn)">11</span></div>
              <div class="import-stat"><span class="isk">Missing VIN</span><span class="isv" style="color:var(--bad)">2</span></div>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button class="btn" onclick="showToast('Warning report downloading… (simulated)')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-download"/></svg></span> Download warning report</button>
              <button class="btn" onclick="showToast('Test import run (concept)')">🔄 Run test import</button>
              <button class="btn primary" onclick="showToast('Import confirmed (concept) — no actual files imported')"><span class="ic ic-sm"><svg viewBox="0 0 24 24"><use href="#ic-check-circle"/></svg></span> Confirm import</button>
            </div>
          </div>
        </div>

        <div class="tabpane" data-pane="offline">
          <div class="card">
            <h3>Offline &amp; Sync Simulation</h3>
            <p style="color:var(--muted);font-size:13px">Demo control — simulate connection states to see how the platform behaves.</p>
            <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;">
              <button class="btn good" id="btnOnline" onclick="setSync('online')" style="background:var(--good-soft);border-color:#b8e0cc;color:var(--good)">🟢 Online</button>
              <button class="btn" id="btnWeak" onclick="setSync('weak')">🟡 Weak connection</button>
              <button class="btn" id="btnOffline" onclick="setSync('offline')">🔴 Offline</button>
            </div>
            <div style="background:#fafbfd;border:1px solid var(--line);border-radius:var(--radius-sm);padding:12px;">
              <div class="import-stat"><span class="isk">Current state</span><span class="isv" id="syncStateLabel">Online · Synced</span></div>
              <div class="import-stat"><span class="isk">Queued updates</span><span class="isv" id="queuedLabel">0</span></div>
              <div class="import-stat"><span class="isk">Last synced</span><span class="isv" id="lastSyncLabel">Just now</span></div>
              <div class="import-stat"><span class="isk">Offline capabilities</span><span class="isv">Photo capture · Signature · Task updates · Cached schedule</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>`;

