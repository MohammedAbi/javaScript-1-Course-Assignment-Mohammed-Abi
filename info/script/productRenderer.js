function renderFilteredProducts(filteredProducts) {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";

  filteredProducts.forEach((product) => {
    // Render product as before
    const { id, title, description, image, sizes, price, gender } = product;

    const box = document.createElement("div");
    box.classList.add("box");

    box.dataset.productId = id;

    const productLink = document.createElement("a");
    productLink.href = `./productSpecificPage.html?id=${id}`;

    const productImage = document.createElement("img");
    productImage.src = image.url;
    productImage.alt = image.alt || "Product Image";

    const productName = document.createElement("h4");
    productName.textContent = title;

    const productDescription = document.createElement("p");
    productDescription.textContent = description;

    const productPrice = document.createElement("h5");
    productPrice.textContent = `$${price}`;

    const productGender = document.createElement("p");
    productGender.textContent = gender;

    const productSizes = document.createElement("p");
    productSizes.textContent = "Sizes: " + sizes.join(", ");

    const cartIcon = document.createElement("div");
    cartIcon.classList.add("cart");
    const shoppingBagIcon = document.createElement("i");
    shoppingBagIcon.classList.add("bx", "bx-shopping-bag");
    cartIcon.appendChild(shoppingBagIcon);

    productLink.appendChild(productImage);
    box.appendChild(productLink);
    box.appendChild(productName);
    box.appendChild(productDescription);
    box.appendChild(productPrice);
    box.appendChild(productGender);
    box.appendChild(productSizes);
    box.appendChild(cartIcon);

    productContainer.appendChild(box);
  });
}

export { renderFilteredProducts };
