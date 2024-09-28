// Importing functions from separate files
import { getClickedProductId } from "./getClickedProductId.js";
// import { getClickedProductId } from "./info/script/getClickedProductId.js";
import { updateCartCount } from "./updateCartCount.js";
import { fetchProductDetails } from "./fetchProductDetails.js";

// Call updateCartCount function when the page loads
document.addEventListener("DOMContentLoaded", updateCartCount);

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const clickedProductId = getClickedProductId();

  if (clickedProductId) {
    fetchProductDetails(clickedProductId);
  } else {
    console.error("No product ID found in URL parameters.");
  }
});
