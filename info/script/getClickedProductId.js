// Function to retrieve the clicked product ID from the URL parameters
function getClickedProductId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("id");
}

export { getClickedProductId };
