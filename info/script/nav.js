function showSidebar() {
  const sidebar = document.querySelector(".sideBar");
  sidebar.style.display = "flex";
}
function hideSideBar() {
  const sidebar = document.querySelector(".sideBar");
  sidebar.style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.toLowerCase(); // Convert current page to lowercase
  const navbarLinks = document.querySelectorAll(".navbar a, .sideBar a");

  navbarLinks.forEach((link) => {
    let linkPath = link.getAttribute("href").toLowerCase(); // Convert link path to lowercase

    // Remove leading "./" from the link path
    linkPath = linkPath.replace(/^\.\//, "");

    // Normalize paths to have the same base URL
    const normalizedCurrentPage = currentPage.endsWith("/")
      ? currentPage + "index.html"
      : currentPage;
    const normalizedLinkPath = linkPath.endsWith("/")
      ? linkPath + "index.html"
      : linkPath;

    // Check if the link path matches the current page
    if (
      normalizedCurrentPage.endsWith(normalizedLinkPath) ||
      normalizedCurrentPage.endsWith(normalizedLinkPath.replace(/\.html$/, ""))
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active"); // Remove "active" class from non-matching links
    }
  });
});
