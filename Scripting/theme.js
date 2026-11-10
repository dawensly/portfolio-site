/* Applies the saved theme (or the visitor's system preference) before the page paints,
   then wires up the toggle button. Load this in <head> on every page. */
(function () {
  var root = document.documentElement;
  var saved = null;

  try { saved = localStorage.getItem("theme"); } catch (e) {}

  var prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  });
})();