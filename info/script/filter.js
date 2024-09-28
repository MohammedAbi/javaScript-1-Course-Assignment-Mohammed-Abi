// productRenderer.js
import { renderFilteredProducts } from "./productRenderer.js";

function createFilterElement(label, value, products) {
  const radioInput = document.createElement("input");
  radioInput.type = "radio";
  radioInput.name = "gender";
  radioInput.value = value.toLowerCase();
  radioInput.id = `${value.toLowerCase()}Radio`;
  radioInput.addEventListener("change", (event) =>
    filterProducts(products, event)
  );

  const radioLabel = document.createElement("label");
  radioLabel.textContent = label;
  radioLabel.htmlFor = `${value.toLowerCase()}Radio`;

  return [radioInput, radioLabel];
}

function renderGenderFilter(products) {
  try {
    const productContainer = document.getElementById("productContainer");
    if (!productContainer) {
      throw new Error("Product container not found in HTML.");
    }

    const filterContainer = document.getElementById("filterContainer");
    if (filterContainer) {
      filterContainer.remove();
    }

    const newFilterContainer = document.createElement("div");
    newFilterContainer.id = "filterContainer";

    const genderHeading = document.createElement("h4");
    genderHeading.textContent = "Select gender";
    newFilterContainer.appendChild(genderHeading);

    const genderLabels = ["All", "Female", "Male"];

    genderLabels.forEach((label, index) => {
      const [radioInput, radioLabel] = createFilterElement(
        label,
        label,
        products
      );

      if (index === 0) {
        radioInput.checked = true;
      }

      newFilterContainer.appendChild(radioInput);
      newFilterContainer.appendChild(radioLabel);
    });

    productContainer.parentNode.insertBefore(
      newFilterContainer,
      productContainer
    );
  } catch (error) {
    console.error("Error rendering gender filter:", error);
  }
}

function filterProducts(products, event) {
  const selectedGender = event.target.value;
  const filteredProducts =
    selectedGender === "all"
      ? products
      : products.filter(
          (product) => product.gender.toLowerCase() === selectedGender
        );
  renderFilteredProducts(filteredProducts);
}

export { renderGenderFilter, filterProducts };
