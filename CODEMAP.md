# AutoPassport OS Code Map

Use this map before opening large files. Search for the screen ID, CSS selector, or JavaScript function needed for the requested change.

## Main files

- `index.html`: interface markup and all prototype screens.
- `css/styles.css`: visual styling, responsive rules, and RTL rules.
- `js/app.js`: mock data and clickable prototype behavior.

## HTML sections (`index.html`)

- Lines 12–14: **PROTOTYPE BANNER**
- Lines 15–17: **OFFLINE BANNER**
- Lines 18–50: **TOP BAR**
- Lines 51–83: **SHELL**
- Lines 84–169: **DASHBOARD**
- Lines 170–178: **CUSTOMERS & VEHICLES**
- Lines 179–540: **VEHICLE PROFILE / PASSPORT**
- Lines 541–572: **INTAKE & EVIDENCE**
- Lines 573–624: **WORK ORDER**
- Lines 625–647: **ESTIMATE & APPROVAL**
- Lines 648–662: **INVOICES**
- Lines 663–775: **PICKUP & MOBILE JOBS**
- Lines 776–845: **AFTERCARE**
- Lines 846–908: **INVENTORY & PURCHASING**
- Lines 909–991: **TEAM & BAYS**
- Lines 992–1001: **MEMBERSHIPS**
- Lines 1002–1085: **REPORTS**
- Lines 1086–1106: **COMPLIANCE CENTER**
- Lines 1107–1161: **INTEGRATIONS**
- Lines 1162–1167: **CALENDAR (placeholder)**
- Lines 1168–1288: **SETTINGS**
- Lines 1289–1326: **SHARE PASSPORT MODAL**
- Lines 1327–1352: **EVIDENCE DETAIL MODAL**
- Lines 1353–1374: **COMEBACK MODAL**
- Lines 1375–1491: **CUSTOMER APP (drawer right)**
- Lines 1492–1580: **TECHNICIAN APP (drawer left)**
- Lines 1581–1587: **TOAST**

## CSS sections (`css/styles.css`)

- Lines 23–26: **Prototype banner**
- Lines 27–31: **Offline banner**
- Lines 32–46: **Top bar**
- Lines 47–52: **sync indicator**
- Lines 53–65: **Layout shell**
- Lines 66–86: **Generic blocks**
- Lines 87–94: **summary / stat cards**
- Lines 95–105: **kanban**
- Lines 106–115: **pills**
- Lines 116–122: **provenance badges**
- Lines 123–130: **table**
- Lines 131–138: **KPI / bars**
- Lines 139–148: **events timeline**
- Lines 149–159: **vehicle cards**
- Lines 160–164: **screens**
- Lines 165–172: **tabs**
- Lines 173–179: **vehicle profile**
- Lines 180–188: **Vehicle context header (vehicle-first strip)**
- Lines 189–197: **passport trust score**
- Lines 198–202: **filter chips**
- Lines 203–211: **stepper**
- Lines 212–220: **photo grid**
- Lines 221–227: **condition check**
- Lines 228–233: **damage map**
- Lines 234–239: **notes**
- Lines 240–243: **approval rows**
- Lines 244–247: **placeholder pages**
- Lines 248–256: **route timeline**
- Lines 257–266: **bay board**
- Lines 267–276: **staff row**
- Lines 277–285: **connector cards**
- Lines 286–293: **compliance country cards**
- Lines 294–305: **AI delta / insights**
- Lines 306–312: **declined work**
- Lines 313–322: **ownership transfer stepper**
- Lines 323–327: **privacy distinction**
- Lines 328–335: **insights card**
- Lines 336–344: **mobile customer app**
- Lines 345–390: **technician app drawer**
- Lines 391–406: **tech app inner**
- Lines 407–422: **modal**
- Lines 423–427: **toast**
- Lines 428–432: **consumables panel**
- Lines 433–436: **eco card**
- Lines 437–442: **audit log**
- Lines 443–456: **migration wizard**
- Lines 457–463: **aftercare**
- Lines 464–483: **responsive**
- Lines 484–488: **RTL fixes**

## JavaScript sections (`js/app.js`)

- Lines 2–108: **NAVIGATION**
- Lines 109–126: **VERTICAL SWITCHER**
- Lines 127–210: **COMPLIANCE CENTER**
- Lines 211–267: **MODALS**
- Lines 268–304: **TOAST**

## Useful editing targets

- Navigation and page switching: search for `function showScreen`, `function nav`, and `function go`.
- Vehicle mock data and cards: search for `VEHICLES` and `buildVehicles`.
- Vehicle passport tabs: search for `vehTab`.
- Intake workflow: search for `STEP`, `stepContent`, and `renderStep`.
- Vertical switching: search for `VERTICALS` and `setVertical`.
- Compliance cards: search for `complianceData` and `showCompliance`.
- Drawers and modals: search for `openApp`, `openTechApp`, and `openShareModal`.
- Offline simulation: search for `syncStates`, `syncMeta`, and `applySyncState`.
- RTL toggle: search for `toggleLang`.
