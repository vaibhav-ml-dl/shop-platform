import React from "react";

export function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      type="button"
      onClick={onToggle}
      aria-label="Toggle color mode"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
