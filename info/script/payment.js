// Define an array of objects representing the payment fields
const paymentFields = [
  { id: "cardNumber", placeholder: "Card Number" },
  { id: "expMonth", placeholder: "Exp. Month" },
  { id: "expDate", placeholder: "Exp. Date" },
  { id: "cvv", placeholder: "CVV" },
  { id: "cardHolder", placeholder: "Card Holder" },
];

// Function to generate payment input fields
function generatePaymentInputs() {
  try {
    const paymentFormContainer = document.getElementById(
      "paymentFormContainer"
    );
    if (!paymentFormContainer) {
      console.error("Payment form container not found.");
      return;
    }

    paymentFields.forEach((field) => {
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.id = field.id;
      inputField.placeholder = field.placeholder;
      inputField.classList.add("formItem");

      paymentFormContainer.appendChild(inputField);
    });
  } catch (error) {
    console.error("Error generating payment inputs:", error);
  }
}

// Function to validate if all payment fields are filled
function validatePaymentForm() {
  let isValid = true;
  let errorMessage = "";

  paymentFields.forEach((field) => {
    const inputField = document.getElementById(field.id);
    if (inputField && !inputField.value.trim()) {
      isValid = false;
      errorMessage += `<span>${field.placeholder} is required.</span>`;
      if (!inputField.classList.contains("error")) {
        inputField.classList.add("error");
      }
    } else {
      // Additional validation for specific fields
      switch (field.id) {
        case "cardNumber":
          if (inputField.value.trim().length < 8) {
            isValid = false;
            errorMessage += "Card Number must have at least 8 characters.\n";
            inputField.classList.add("error");
          }
          break;
        case "expMonth":
        case "expDate":
          if (!/^\d{2}$/.test(inputField.value.trim())) {
            isValid = false;
            errorMessage += `${field.placeholder} must be two digits.\n`;
            inputField.classList.add("error");
          }
          break;
        case "cvv":
          if (!/^\d{3}$/.test(inputField.value.trim())) {
            isValid = false;
            errorMessage += "CVV must be three digits.\n";
            inputField.classList.add("error");
          }
          break;
        case "cardHolder":
          const cardHolder = inputField.value.trim().split(" ");
          if (cardHolder.length !== 2) {
            isValid = false;
            errorMessage +=
              "Card Holder must include both first name and last name.\n";
            inputField.classList.add("error");
          }
          break;
        default:
          break;
      }
    }
  });

  const customAlert = document.getElementById("customAlert");
  const customAlertMessage = document.getElementById("customAlertMessage");
  if (!isValid) {
    // Show the custom alert
    customAlertMessage.innerHTML = errorMessage;
    customAlert.style.display = "block";
  } else {
    // Hide the custom alert if form is valid
    customAlert.style.display = "none";
  }

  return { isValid, errorMessage }; // Return isValid and errorMessage
}

// Function to capture filled payment values and redirect if form is valid
function capturePaymentValues() {
  try {
    const { isValid, errorMessage } = validatePaymentForm(); // Get isValid and errorMessage
    if (!isValid) {
      const customAlert = document.getElementById("customAlert");
      const customAlertMessage = document.getElementById("customAlertMessage");
      customAlertMessage.innerHTML = errorMessage;
      customAlert.style.display = "block";
      return; // Don't proceed if form is invalid
    }

    const filledValues = {};

    paymentFields.forEach((field) => {
      const inputField = document.getElementById(field.id);
      if (inputField) {
        filledValues[field.id] = inputField.value;
      }
    });

    // Retrieve existing data from local storage or initialize as an empty array
    const existingData = JSON.parse(localStorage.getItem("filledValues")) || [];

    // Append the new filled values to the existing data array
    existingData.push(filledValues);

    // Store the updated array back in local storage
    localStorage.setItem("filledValues", JSON.stringify(existingData));

    // Retrieve the products from local storage
    let productsInCart =
      JSON.parse(localStorage.getItem("productsInCart")) || [];

    // Remove items from the cart
    localStorage.removeItem("productsInCart");

    // Redirect the user to the payment confirmation page
    location.href = "./successPage.html";
  } catch (error) {
    console.error("Error capturing filled payment values:", error);
  }
}

// Function to calculate and display the total price of the items in the cart
function displayTotalPriceInPaymentButton() {
  // Retrieve the products from local storage
  const productsInCart =
    JSON.parse(localStorage.getItem("productsInCart")) || [];

  // Calculate the total price
  let totalPrice = 0;
  productsInCart.forEach((product) => {
    const price = parseFloat(product.price.replace("$", ""));
    totalPrice += price * product.quantity;
  });

  // Update the payment button text with the total price
  const paymentSubmitButton = document.getElementById("paymentSubmitButton");
  if (paymentSubmitButton) {
    paymentSubmitButton.textContent = `Total Payment $${totalPrice.toFixed(2)}`;
  } else {
    console.error("Payment submit button not found.");
  }
}

// Call the function to generate payment inputs when the page loads
document.addEventListener("DOMContentLoaded", () => {
  generatePaymentInputs();
  displayTotalPriceInPaymentButton();

  // Add event listener to the OK button in the custom alert to hide it when clicked
  const customAlertOkButton = document.getElementById("customAlertOkButton");
  if (customAlertOkButton) {
    customAlertOkButton.addEventListener("click", () => {
      document.getElementById("customAlert").style.display = "none";
    });
  } else {
    console.error("Custom alert OK button not found.");
  }

  // Add event listener to the submit button to capture filled values when clicked
  const paymentSubmitButton = document.getElementById("paymentSubmitButton");
  if (paymentSubmitButton) {
    paymentSubmitButton.addEventListener("click", capturePaymentValues);
  } else {
    console.error("Payment submit button not found.");
  }
});
