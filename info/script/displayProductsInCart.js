// Import the shared functions
import { removeCartItem, updateCartCount } from "./removeCartItem.js";
import { showLoader, hideLoader } from "./loader.js";

// Function to display products in the cart
function displayProductsInCart(products) {
  // Select the table body element to append cart items
  const tbody = document.querySelector(".tbody");

  // Clear previous content
  tbody.innerHTML = "";

  let totalPrice = 0; // Initialize total price
  let totalQuantity = 0; // Initialize total quantity of items in the cart

  // Check if there are products in the cart
  if (products.length === 0) {
    // Display message when cart is empty
    tbody.innerHTML =
      "<tr><td colspan='7'><h4>Your cart is empty!!</h4></td></tr>";

    // Update the cart count element to 0 when the cart is empty
    updateCartCount(0);

    // Update the total price element to $0.00 when the cart is empty
    updateTotalPrice(0);

    // Hide loader when the cart is empty
    hideLoader();

    return; // Return early if cart is empty
  }

  // Show loader when there are products to display
  showLoader();

  // Loop through each product and create HTML elements to display them
  products.forEach((product, index) => {
    // Remove the dollar sign and parse the price as a float
    const price = parseFloat(product.price.replace("$", ""));

    // Check if the parsed price is a valid number
    if (isNaN(price)) {
      console.error(`Invalid price for product at index ${index}`);
      return; // Skip this product if price is invalid
    }

    // Parse the quantity as an integer
    const quantity = parseInt(product.quantity); // Parse quantity as integer

    // Ensure quantity is a number
    if (isNaN(quantity)) {
      console.error(`Invalid quantity for product at index ${index}`);
      return; // Skip this product if quantity is invalid
    }

    // Display unit price for each item
    const unitPrice = price.toFixed(2);

    // Calculate the total price for the current item considering its quantity
    const itemTotalPrice = quantity * price;
    totalPrice += itemTotalPrice; // Add to the total price

    // Update total quantity
    totalQuantity += quantity;

    // Create table row
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div class="productImage">
          <img src="${product.imageUrl}" alt="${product.title}" />
        </div>
      </td>
      <td>
        <h3>${product.title}</h3>
        <p>${product.description}</p>
      </td>
      <td class="productSize">${product.size}</td>
      <td class="productColor">${product.color}</td>
      <td>
        <input type="number" value="${quantity}" id="qnty${
      index + 1
    }" aria-label="Quantity" />
      </td>
      <td class="productPrice">${unitPrice}</td> 
      <td>
        <div class="deleteItem">Delete</div>
      </td>
    `;

    // Get the delete button from the table row
    const deleteButton = tr.querySelector(".deleteItem");

    // Add click event listener to the delete button
    deleteButton.addEventListener("click", function () {
      const updatedProducts = removeCartItem(index, products);
      displayProductsInCart(updatedProducts);
    });

    // Append table row to table body
    tbody.appendChild(tr);
  });

  // Update the total price element in the HTML
  updateTotalPrice(totalPrice);

  // Update the cart count element in the HTML
  updateCartCount(totalQuantity);
  // Hide loader after a slight delay
  setTimeout(() => {
    hideLoader();
  }, 2000);
}

// Function to update the total price element in the HTML
function updateTotalPrice(totalPrice) {
  const totalPriceElement = document.querySelector(".totalPrice p");
  if (totalPriceElement) {
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  } else {
    console.error("Total price element not found.");
  }
}

export { displayProductsInCart }; // Exporting the function properly
