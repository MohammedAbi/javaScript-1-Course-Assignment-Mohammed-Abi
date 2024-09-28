import { loginUser } from "../script/user.js";
import { renderGenderFilter } from "./filter.js";
import { renderFilteredProducts } from "./productRenderer.js";
import { showLoader, hideLoader } from "./loader.js";

let products = [];
let clickedProduct = null;

async function renderProducts() {
  try {
    showLoader();

    const token = await loginUser(
      "https://v2.api.noroff.dev/auth/login",
      "falcon.master@stud.noroff.no",
      "SkyKnight2024"
    );

    const response = await fetch("https://v2.api.noroff.dev/rainy-days", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        "Failed to fetch products with status: " + response.status
      );
    }

    const { data } = await response.json();
    products = data;
    renderGenderFilter(products);
    renderFilteredProducts(products);

    hideLoader();
  } catch (error) {
    console.error("Error rendering products:", error);
    hideLoader();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});

export { products, renderProducts, clickedProduct };
