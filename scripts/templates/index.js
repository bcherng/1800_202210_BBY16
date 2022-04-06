import { readFileAndSetHtml } from "./readfile.js";
import { isLoggedIn, logOut } from "../index/login.js";

import navHTML from "../../templates/nav.html.txt"
import footerHTML from "../../templates/footer.html.txt"

// Replace nav placeholder with navbar html
readFileAndSetHtml("nav-placeholder", navHTML).then(() => {
  // Add log-out button is user is logged in
  const logOutButton = document.getElementById("log-out");
  if (!isLoggedIn()) {
    logOutButton.style.display = "none";
  } else {
    logOutButton.addEventListener("click", (e) => {
      logOut();
      window.location.href = "/";
    });
  }

  // Navigate to search page when search button is clicked
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", (e) => {
    e.preventDefault()
    let latest = document.getElementById("search-input");
    window.location.href = `/pages/search.html?name=${latest.value}`;
  });
});

// Replace footer placeholder with footer html
readFileAndSetHtml("footer-placeholder", footerHTML);
