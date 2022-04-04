import { readFileAndSetHtml } from "./readfile.js";
import { isLoggedIn, logOut } from "../index/login.js";

import navHTML from "../../templates/nav.html.txt"
import footerHTML from "../../templates/footer.html.txt"

readFileAndSetHtml("nav-placeholder", navHTML).then(() => {
  const logOutButton = document.getElementById("log-out");
  if (!isLoggedIn()) {
    logOutButton.style.display = "none";
  } else {
    logOutButton.addEventListener("click", (e) => {
      logOut();
      window.location.href = "/";
    });
  }

  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", (e) => {
    e.preventDefault()
    let latest = document.getElementById("search-input");
    window.location.href = `/search.html?name=${latest.value}`;
  });
});

readFileAndSetHtml("footer-placeholder", footerHTML);
