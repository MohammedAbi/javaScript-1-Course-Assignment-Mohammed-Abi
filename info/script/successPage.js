// Define the support email address
const supportEmail = "support@example.com";
// Define the steps and their corresponding content
const steps = [
  { title: "Cart", content: "" },
  { title: "Delivery", content: "" },
  { title: "Payment", content: "" },
  {
    title: "Receipt",
    content: `
      <h1>Thanks for your order!</h1>
      <p>
        We appreciate your business. An order confirmation has been sent to your email address. 
        Please check your inbox (and your spam folder, just in case) for further details.</a>.
      </p>
      <p>
         If you have any questions or concerns regarding your order, feel free to contact our 
        <a href="mailto:${supportEmail}">customer support team</a>.
      </p>
    `,
  },
];

// Function to generate the cart info section dynamically
function generateCartInfo() {
  try {
    const cartInfoContainer = document.querySelector(".cartInfo");
    if (!cartInfoContainer) {
      console.error("Cart info container not found.");
      return;
    }

    // Create the cart status indicators
    const cartStatus = document.createElement("div");
    cartStatus.classList.add("cartStatus");
    steps.forEach((step, index) => {
      const indicator = document.createElement("div");
      indicator.classList.add("cartstatusIndicator");
      indicator.textContent = step.title;
      cartStatus.appendChild(indicator);
    });

    // Create the payment details section
    const paymentDetails = document.createElement("div");
    paymentDetails.classList.add("paymentDetails");
    steps.forEach((step, index) => {
      paymentDetails.innerHTML += step.content; // Add content for each step
    });

    // Create the delivery section
    const deliverySection = document.createElement("section");
    deliverySection.classList.add("delivery");
    const ctaCart = document.createElement("div");
    ctaCart.classList.add("ctaCart");
    const submitButton = document.createElement("button");
    submitButton.classList.add("submitButton");
    submitButton.id = "submitButton";
    submitButton.textContent = "Continue Shopping";
    submitButton.addEventListener("click", function () {
      window.location.href = `./`;
    });
    ctaCart.appendChild(submitButton);
    deliverySection.appendChild(ctaCart);

    // Append all elements to the cart info container
    cartInfoContainer.appendChild(cartStatus);
    cartInfoContainer.appendChild(paymentDetails);
    cartInfoContainer.appendChild(deliverySection);
  } catch (error) {
    console.error("Error generating cart info:", error);
  }
}

// Call the function to generate the cart info section when the page loads
document.addEventListener("DOMContentLoaded", generateCartInfo);
