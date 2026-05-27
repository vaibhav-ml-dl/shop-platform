const shopCards = document.querySelectorAll("[data-shop-card]");

shopCards.forEach((card) => {
  const shopName = card.dataset.shopName || "this shop";
  const detailsButton = card.querySelector("[data-shop-details]");

  if (!detailsButton) {
    return;
  }

  // Keep repeated card actions accessible as cards are generated from API data later.
  detailsButton.setAttribute("aria-label", `View details for ${shopName}`);

  detailsButton.addEventListener("click", (event) => {
    if (detailsButton.getAttribute("href") === "#") {
      event.preventDefault();
    }
  });
});
