const navbars = document.querySelectorAll(".navbar");

navbars.forEach((navbar) => {
  const toggle = navbar.querySelector(".navbar__toggle");
  const menu = navbar.querySelector(".navbar__menu");

  if (!toggle || !menu) {
    return;
  }

  const setMenuState = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
    menu.classList.toggle("is-open", isOpen);
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  menu.addEventListener("click", (event) => {
    const clickedLink = event.target.closest("a");

    if (clickedLink) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      setMenuState(false);
    }
  });
});
