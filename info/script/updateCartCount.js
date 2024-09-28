// Function to update the cart count based on the items in the cart
function updateCartCount() {
  const productsInCart =
    JSON.parse(localStorage.getItem("productsInCart")) || [];

  const totalQuantity = productsInCart.reduce(
    (total, product) => total + parseInt(product.quantity),
    0
  );

  const cartCountElement = document.querySelector(".counter");
  if (cartCountElement) {
    cartCountElement.textContent = totalQuantity.toString();
  } else {
    console.error("Cart count element not found.");
  }
}

export { updateCartCount };
