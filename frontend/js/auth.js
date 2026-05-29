const passwordToggles = document.querySelectorAll("[data-password-toggle]");
const registerTabs = document.querySelectorAll("[data-register-tab]");
const registerPanels = document.querySelectorAll("[data-register-panel]");
const authForms = document.querySelectorAll("[data-auth-form]");

passwordToggles.forEach((toggle) => {
  const input = toggle.parentElement?.querySelector("input");

  if (!input) {
    return;
  }

  // Reusable password visibility behavior for every auth form.
  toggle.addEventListener("click", () => {
    const shouldShow = input.type === "password";
    input.type = shouldShow ? "text" : "password";
    toggle.textContent = shouldShow ? "Hide" : "Show";
    toggle.setAttribute("aria-label", shouldShow ? "Hide password" : "Show password");
  });
});

registerTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedType = tab.dataset.registerTab;

    registerTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("auth-tab--active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    registerPanels.forEach((panel) => {
      panel.classList.toggle("is-hidden", panel.dataset.registerPanel !== selectedType);
    });
  });
});

authForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    // Backend authentication will own real submission once APIs exist.
    event.preventDefault();
  });
});
