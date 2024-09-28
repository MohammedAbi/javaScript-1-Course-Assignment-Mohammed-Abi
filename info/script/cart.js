import { displayProductsInCart } from "./displayProductsInCart.js";
import { updateCartCount } from "./removeCartItem.js";

document.addEventListener("DOMContentLoaded", function () {
  let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];

  displayProductsInCart(productsInCart);
  const totalQuantity = getTotalQuantity(productsInCart);
  updateCartCount(totalQuantity);

  const submitButton = document.getElementById("submitButton");
  function updateSubmitButtonState(button, cart) {
    if (cart.length > 0) {
      button.removeAttribute("disabled");
      button.addEventListener("click", function () {
        // Redirect the user to the specified location
        window.location.href = "./delivery.html";
      });
    } else {
      button.setAttribute("disabled", "disabled");
      button.removeEventListener("click", function () {
        window.location.href = "./delivery.html";
      });
    }
  }

  // Function to periodically check the cart status and update the submit button
  setInterval(function () {
    const updatedCart =
      JSON.parse(localStorage.getItem("productsInCart")) || [];
    updateSubmitButtonState(submitButton, updatedCart);
  }, 1000); // Adjust the interval as needed
});

function getTotalQuantity(products) {
  return products.reduce(
    (total, product) => total + parseInt(product.quantity),
    0
  );
}

function updateSubmitButtonState(button, cart) {
  if (cart.length > 0) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "disabled");
  }
}
