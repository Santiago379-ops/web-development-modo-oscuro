/*!
* Start Bootstrap - Small Business v5.0.6 (https://startbootstrap.com/template/small-business)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-small-business/blob/master/LICENSE)
*/

/* =========================================================
   DARK / LIGHT MODE TOGGLE
   =========================================================
   Goal: let the user switch between a light and a dark theme,
   remember that choice using localStorage (persists even after
   closing the browser) and keep a small counter in sessionStorage
   (reset every time the tab/browser session ends) just to show
   the difference between the two storages.
   ========================================================= */

// Keys used to read/write data in the browser storages
const THEME_STORAGE_KEY = "theme";           // localStorage  -> "light" | "dark"
const SESSION_COUNT_KEY = "themeToggleCount"; // sessionStorage -> number of toggles this session

// Grab the elements we need once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");

  if (!toggleBtn) return; // safety check in case the button isn't on the page

  // 1) On load, read the saved preference from localStorage.
  //    If the user has never chosen a theme, default to "light".
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "light";
  applyTheme(savedTheme);

  // 2) When the button is clicked, flip the theme, save it, and
  //    bump the session counter (sessionStorage).
  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");
    const newTheme = isDark ? "light" : "dark";

    applyTheme(newTheme);

    // Persist the choice so it survives page reloads / new visits
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);

    // sessionStorage only lives for the current tab/session, so this
    // counter resets back to 0 the next time the browser is opened
    const currentCount = parseInt(sessionStorage.getItem(SESSION_COUNT_KEY) || "0", 10);
    const updatedCount = currentCount + 1;
    sessionStorage.setItem(SESSION_COUNT_KEY, updatedCount);

    console.log(`Theme switched to "${newTheme}". Times toggled this session: ${updatedCount}`);
  });
});

/**
 * Applies the given theme ("light" or "dark") to the page:
 * - toggles the "dark-mode" class on <body>
 * - updates the toggle button's icon, label and aria state
 */
function applyTheme(theme) {
  const toggleBtn = document.getElementById("theme-toggle");
  const isDark = theme === "dark";

  document.body.classList.toggle("dark-mode", isDark);

  if (toggleBtn) {
    toggleBtn.textContent = isDark ? "☀️ Light mode" : "🌙 Dark mode";
    toggleBtn.setAttribute("aria-pressed", String(isDark));
  }
}