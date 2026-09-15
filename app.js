/* McKay Used Books — prototype behavior
   - hash routing between the 7 destinations
   - mobile nav drawer
   - live "Open now" against real store hours (shop 9–20, trade 9–19, daily), store time
   No dependencies. */
(function () {
  "use strict";

  /* ---------- Live "Open now" --------------------------------------------- */
  var SHOP_OPEN = 9 * 60, SHOP_CLOSE = 20 * 60;   // 9:00 – 20:00
  var TRADE_OPEN = 9 * 60, TRADE_CLOSE = 19 * 60;  // 9:00 – 19:00

  function storeNow() {
    // weekday + minutes-since-midnight in America/New_York, regardless of viewer TZ
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York", weekday: "long",
      hour: "numeric", minute: "numeric", hour12: false
    }).formatToParts(new Date());
    var m = {};
    parts.forEach(function (p) { m[p.type] = p.value; });
    var hr = parseInt(m.hour, 10); if (hr === 24) hr = 0;
    var min = parseInt(m.minute, 10) || 0;
    return { weekday: m.weekday, mins: hr * 60 + min };
  }

  function applyStatus() {
    var s;
    try {
      var now = storeNow();
      s = {
        ok: true, weekday: now.weekday,
        shopOpen: now.mins >= SHOP_OPEN && now.mins < SHOP_CLOSE,
        tradeOpen: now.mins >= TRADE_OPEN && now.mins < TRADE_CLOSE,
        mins: now.mins
      };
    } catch (e) { s = { ok: false }; }

    document.querySelectorAll("[data-openpill]").forEach(function (pill) {
      var label = pill.querySelector("[data-openlabel]");
      pill.classList.remove("is-open", "is-shut", "is-plain");
      if (!s.ok) { pill.classList.add("is-plain"); if (label) label.textContent = "9 AM – 8 PM daily"; return; }
      if (s.shopOpen) {
        pill.classList.add("is-open");
        if (label) label.textContent = s.tradeOpen ? "Open now — shopping & trade" : "Open for shopping · trade closed at 7";
      } else {
        pill.classList.add("is-shut");
        if (label) label.textContent = s.mins < SHOP_OPEN ? "Closed now — opens 9 AM" : "Closed now — opens 9 AM tomorrow";
      }
    });

    document.querySelectorAll("[data-today]").forEach(function (el) {
      el.textContent = s.ok ? s.weekday : "every day";
    });

    if (s.ok) {
      document.querySelectorAll("[data-day]").forEach(function (row) {
        row.classList.toggle("today", row.getAttribute("data-day") === s.weekday);
      });
    }
  }
  applyStatus();
  setInterval(applyStatus, 60 * 1000);

  /* ---------- Routing ------------------------------------------------------ */
  var pages = Array.prototype.slice.call(document.querySelectorAll(".page"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var TITLES = {
    home: "McKay Used Books",
    visit: "Visit · McKay Used Books",
    "sell-trade": "Sell & Trade · McKay Used Books",
    "what-we-sell": "What We Sell · McKay Used Books",
    events: "Events · McKay Used Books",
    about: "About · McKay Used Books",
    faq: "Help & FAQ · McKay Used Books"
  };

  function currentId() {
    var id = (location.hash || "#home").replace(/^#/, "");
    var el = document.getElementById(id);
    return el && el.classList.contains("page") ? id : "home";
  }

  function show(id, opts) {
    pages.forEach(function (p) { p.hidden = p.id !== id; });
    navLinks.forEach(function (a) {
      if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    document.title = TITLES[id] || "McKay Used Books";
    closeNav();
    if (!opts || !opts.initial) {
      window.scrollTo({ top: 0, behavior: "auto" });
      var heading = document.getElementById(id).querySelector("h1, h2");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        try { heading.focus({ preventScroll: true }); } catch (e) { heading.focus(); }
      }
    }
  }

  window.addEventListener("hashchange", function () { show(currentId()); });
  show(currentId(), { initial: true });

  /* ---------- Mobile nav --------------------------------------------------- */
  var nav = document.getElementById("primary-nav");
  var burger = document.getElementById("nav-toggle");
  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) closeNav(); });
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });

  /* ---------- Prototype form guard (Formspree) ---------------------------- */
  // Forms POST to Formspree once a real form ID is filled in. Until then, the
  // placeholder is intercepted so the demo confirms instead of erroring.
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      var action = form.getAttribute("action") || "";
      if (action.indexOf("YOUR_FORM_ID") !== -1) {
        e.preventDefault();
        var note = form.querySelector("[data-formnote]") ||
          (form.parentNode && form.parentNode.querySelector("[data-formnote]"));
        if (note) note.textContent = "Thanks — noted. (Prototype: add a Formspree form ID to receive real submissions.)";
        form.reset();
      }
    });
  });
})();
