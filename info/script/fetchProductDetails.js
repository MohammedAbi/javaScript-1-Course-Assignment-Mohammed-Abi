import { handleAddToCart } from "./handleAddToCart.js";
import { updateCartCount } from "./updateCartCount.js";
import { showLoader, hideLoader } from "./loader.js";

// Call updateCartCount function when the page loads
document.addEventListener("DOMContentLoaded", updateCartCount);

// Function to fetch product details from the server using the product ID
async function fetchProductDetails(productId) {
  try {
    showLoader();
    const response = await fetch(
      `https://v2.api.noroff.dev/rainy-days/${productId}`
    );

    if (response.ok) {
      const product = await response.json();
      displayProductDetails(product);
      hideLoader();
    } else {
      throw new Error(
        "Failed to fetch product details with status: " + response.status
      );
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    hideLoader();
  }
}

// Display product details on the page
function displayProductDetails(product) {
  const productContainer = document.querySelector(".collectionItems");
  productContainer.innerHTML = "";

  const productBox = document.createElement("div");
  productBox.classList.add("box");

  if (
    product.data &&
    product.data.image &&
    product.data.image.url &&
    product.data.title &&
    product.data.price &&
    product.data.description &&
    product.data.sizes &&
    product.data.baseColor
  ) {
    productBox.innerHTML = `
        <img src="${product.data.image.url}" alt="${product.data.title}" />
        <h4>${product.data.title}</h4>
        <h5>$${product.data.price}</h5>
        <div class="productDescription">
          <p>${product.data.description}</p>
        </div>
        <div class="container">
          <div class="dropdownContainer">
            <h3>Make Your Selection:</h3>
            <form id="productForm">
              <label for="size">Size</label>
              <select name="size" id="size">
                <option value="">Size</option>
                ${product.data.sizes
                  .map((size) => `<option value="${size}">${size}</option>`)
                  .join("")}
              </select>
              <label for="color">Color</label>
              <select name="color" id="color">
                <option value="">Color</option>
                <option value="${product.data.baseColor}">${product.data.baseColor}</option>
              </select>
              <label for="qnty">Qnty</label>
              <select name="qnty" id="qnty">
                <option value="">Qnty</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="7">7</option>
              </select>
            </form>
          </div>
        </div>
        <button class="addToCart" id="addToCartButton">Add to Cart <i class="bx bx-shopping-bag"></i></button>
      `;
  } else {
    console.error("Product details are incomplete or undefined:", product);
  }

  productContainer.appendChild(productBox);

  const addToCartButton = document.getElementById("addToCartButton");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", handleAddToCart);
  } else {
    console.error("No 'Add to Cart' button found.");
  }
}

export { fetchProductDetails };
