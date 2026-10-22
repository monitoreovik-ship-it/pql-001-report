// PQL-001 report: theme toggle, chart tooltips (hover/focus/tap), active-section nav. No network calls.
(function () {
  "use strict";
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem("pql-theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) { /* storage unavailable: follow OS theme */ }

  var btn = document.querySelector(".theme");
  if (btn) btn.addEventListener("click", function () {
    var cur = root.getAttribute("data-theme") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("pql-theme", next); } catch (e) { /* ignore */ }
  });

  var tip = document.getElementById("tip");
  function show(el, x, y) {
    tip.textContent = el.getAttribute("data-tip");
    tip.hidden = false;
    var r = tip.getBoundingClientRect();
    var left = Math.min(Math.max(8, x + 12), innerWidth - r.width - 8);
    var top = y - r.height - 12;
    if (top < 8) top = y + 16;
    tip.style.left = left + "px";
    tip.style.top = top + "px";
  }
  function hide() { tip.hidden = true; }
  document.querySelectorAll("[data-tip]").forEach(function (el) {
    el.addEventListener("pointermove", function (e) { show(el, e.clientX, e.clientY); });
    el.addEventListener("pointerdown", function (e) { show(el, e.clientX, e.clientY); });
    el.addEventListener("pointerleave", hide);
    el.addEventListener("focus", function () {
      var b = el.getBoundingClientRect();
      show(el, b.left + b.width / 2, b.top);
    });
    el.addEventListener("blur", hide);
  });
  addEventListener("scroll", hide, { passive: true });

  var links = {};
  document.querySelectorAll(".nav a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && links[en.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove("on"); });
          links[en.target.id].classList.add("on");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { io.observe(s); });
  }
})();
