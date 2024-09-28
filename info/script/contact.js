// Define the function to handle form submission and display the alert
function handleFormSubmission(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the input values
  let firstName = document.getElementById("fname").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;

  // Basic validation (check if required fields are filled)
  if (!firstName || !email || !subject) {
    alert("Please fill out all required fields.");
    return;
  }

  // Email validation
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    // Show the email validation alert
    document.getElementById("emailAlert").style.display = "block";
    return; 
  }

  // Create an object to store the input data
  let contactInfo = {
    firstName: firstName,
    email: email,
    subject: subject,
  };

  // Save the contact info to local storage
  localStorage.setItem("contactInfo", JSON.stringify(contactInfo));

  // Show the custom alert message
  document.getElementById("customAlert").style.display = "block";

  // Add event listener to the OK button in the custom alert
  document.getElementById("okButton").addEventListener("click", function () {
    window.location.href = "/info";
  });
}

// Attach the form submission event listener to the form
document
  .getElementById("contactForm")
  .addEventListener("submit", handleFormSubmission);

// Add event listener to the OK button in the email validation alert
document
  .getElementById("emailAlertOkButton")
  .addEventListener("click", function () {
    // Refresh the page after clicking OK
    location.reload();
  });
