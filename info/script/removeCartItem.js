import { showLoader, hideLoader } from "./loader.js";

// Function to remove a product from the cart
function removeCartItem(index, products) {
  // Get the product at the specified index
  const productToRemove = products[index];

  // If the quantity is greater than 1, decrement it by one
  if (productToRemove.quantity > 1) {
    productToRemove.quantity -= 1;
  } else {
    // Otherwise, remove the product entirely
    products.splice(index, 1);
  }

  // Update local storage
  localStorage.setItem("productsInCart", JSON.stringify(products));
  // Return the updated products array
  return products;
}

// Function to update the cart count based on the items in the cart
function updateCartCount(totalQuantity) {
  // Update the cart count element in the HTML
  const cartCountElement = document.querySelector(".counter");
  if (cartCountElement) {
    cartCountElement.textContent = totalQuantity.toString();
  } else {
    console.error("Cart count element not found.");
  }
}

export { removeCartItem, updateCartCount };
