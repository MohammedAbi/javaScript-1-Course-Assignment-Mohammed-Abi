// Define an array of objects representing the delivery fields
const deliveryFields = [
  { label: "First Name:", id: "firstName", placeholder: "First Name" },
  { label: "Last Name:", id: "lastName", placeholder: "Last Name" },
  { label: "Address:", id: "address", placeholder: "Address", span: 2 },
  { label: "Zip Code:", id: "zipCode", placeholder: "Zip code" },
  { label: "City:", id: "city", placeholder: "City" },
  { label: "Country:", id: "country", placeholder: "Country" },
];

// Function to dynamically generate delivery input fields
function generateDeliveryInputs() {
  try {
    const deliveryGridContainer = document.getElementById(
      "deliveryGridContainer"
    );
    if (!deliveryGridContainer) {
      console.error("Delivery grid container not found.");
      return;
    }

    deliveryFields.forEach((field) => {
      const gridItem = document.createElement("div");
      gridItem.classList.add("gridItem");
      if (field.span) {
        gridItem.style.gridColumn = `span ${field.span}`;
      }

      const label = document.createElement("label");
      label.textContent = field.label;
      label.htmlFor = field.id;

      const input = document.createElement("input");
      input.type = "text";
      input.id = field.id;
      input.name = field.id;
      input.placeholder = field.placeholder;

      gridItem.appendChild(label);
      gridItem.appendChild(input);
      deliveryGridContainer.appendChild(gridItem);
    });
  } catch (error) {
    console.error("Error generating delivery inputs:", error);
  }
}

// Function to validate if all fields are filled
function validateForm() {
  let isValid = true;
  let errorMessage = "";

  deliveryFields.forEach((field) => {
    const inputField = document.getElementById(field.id);
    if (inputField && !inputField.value.trim()) {
      isValid = false;
      errorMessage += `<span>${field.label} is required.</span>`;
      if (!inputField.classList.contains("error")) {
        inputField.classList.add("error");
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

  return isValid;
}

// Function to capture filled values and save if form is valid
function captureFilledValues() {
  try {
    const isValidForm = validateForm();
    if (!isValidForm) {
      return; // Don't proceed if form is invalid
    }

    const filledValues = {};

    deliveryFields.forEach((field) => {
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

    // Redirect the user to the payment page
    location.href = "./payment.html";
  } catch (error) {
    console.error("Error capturing filled values:", error);
  }
}

// Call the function to generate delivery inputs when the page loads
document.addEventListener("DOMContentLoaded", () => {
  generateDeliveryInputs();

  // Add event listener to the submit button to capture filled values when clicked
  const submitButton = document.getElementById("submitButton");
  if (submitButton) {
    submitButton.addEventListener("click", captureFilledValues);
  } else {
    console.error("Submit button not found.");
  }
  // Add event listener to the OK button in the custom alert to hide it when clicked
  const customAlertOkButton = document.getElementById("customAlertOkButton");
  if (customAlertOkButton) {
    customAlertOkButton.addEventListener("click", () => {
      document.getElementById("customAlert").style.display = "none";
    });
  }
});
