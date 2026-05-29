const homeSearch = document.querySelector("[data-home-search]");
const searchInput = homeSearch?.querySelector("input[type='search']");
const searchClearButton = homeSearch?.querySelector("[data-search-clear]");
const bottomNavItems = document.querySelectorAll("[data-bottom-nav]");

if (homeSearch && searchInput && searchClearButton) {
  const syncSearchState = () => {
    homeSearch.classList.toggle("has-value", searchInput.value.trim().length > 0);
  };

  // The clear button is progressive behavior; search still works without JavaScript.
  searchInput.addEventListener("input", syncSearchState);
  searchClearButton.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    syncSearchState();
  });
}

bottomNavItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    if (item.getAttribute("href") === "#") {
      event.preventDefault();
    }

    // Keep the bottom navigation state local until real routes are connected.
    bottomNavItems.forEach((navItem) => {
      navItem.classList.remove("bottom-nav__item--active");
      navItem.removeAttribute("aria-current");
    });

    item.classList.add("bottom-nav__item--active");
    item.setAttribute("aria-current", "page");
  });
});
