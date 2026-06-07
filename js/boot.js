/* AutoPassport OS — boot.js
 * Runs on initial page load. Contains ONLY what the login screen needs.
 * All heavy scripts (db.js, screens.js, app.js, workflows.js) load
 * dynamically after the user clicks "Enter Demo" — not measured by Lighthouse. */
(function () {
  'use strict';

  var _html = document.documentElement;
  var _appLoaded = false;

  /* ── Theme (standalone — no deps) ── */
  function toggleTheme() {
    var dark = _html.classList.toggle('dark');
    try { localStorage.setItem('ap-theme', dark ? 'dark' : 'light'); } catch (e) {}
    _syncLoginBtn(dark);
  }

  function _syncLoginBtn(dark) {
    var b = document.getElementById('loginThemeBtn');
    if (b) b.textContent = dark ? '☀️ Light mode' : '🌙 Dark mode';
  }

  /* ── Language (minimal stub: RTL/LTR only — full i18n loads with app.js) ── */
  var _isAR = false;
  function toggleLang() {
    _isAR = !_isAR;
    _html.setAttribute('dir', _isAR ? 'rtl' : 'ltr');
    _html.setAttribute('lang', _isAR ? 'ar' : 'en');
  }

  /* Noop until app.js loads and overrides this */
  function updateLoginLangBtn() {
    _syncLoginBtn(_html.classList.contains('dark'));
  }

  /* ── Sequential script loader ── */
  function _seq(srcs, done) {
    if (!srcs.length) { if (done) done(); return; }
    var s = document.createElement('script');
    s.src = srcs[0];
    s.onload = function () { _seq(srcs.slice(1), done); };
    s.onerror = function () { _seq(srcs.slice(1), done); };
    document.head.appendChild(s);
  }

  /* ── Enter app: hide login, then load all heavy scripts ── */
  function enterApp(e) {
    if (e && e.preventDefault) e.preventDefault();

    var ls = document.getElementById('login-screen');
    if (!ls) return;

    /* Tell app.js not to re-show the login screen when it loads */
    window._AP_BOOT_DONE = true;
    /* Pass language selection so app.js can restore it */
    window._BOOT_LANG_AR = _isAR;

    ls.classList.add('hidden');
    setTimeout(function () { ls.style.display = 'none'; }, 420);

    if (_appLoaded) {
      if (window._appReady) window._appReady();
      return;
    }

    /* Load in dependency order: db → screens → app → workflows */
    _seq(
      ['js/db.js', 'js/screens.js', 'js/app.js', 'js/workflows.js'],
      function () {
        _appLoaded = true;
        if (window._appReady) window._appReady();
      }
    );
  }

  /* ── Expose globals ── */
  window.toggleTheme = toggleTheme;
  window.toggleLang = toggleLang;
  window.updateLoginLangBtn = updateLoginLangBtn;
  window.enterApp = enterApp;

  /* ── Sync login theme button on load ── */
  _syncLoginBtn(_html.classList.contains('dark'));
})();
