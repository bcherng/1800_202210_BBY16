import { readFileAndSetHtml } from "./readfile.js";
import { isLoggedIn, logOut } from "../index/login.js";

readFileAndSetHtml("nav-placeholder", "/templates/nav.html").then(() => {
  const logOutButton = document.getElementById("log-out");
  if (!isLoggedIn()) {
    logOutButton.style.display = "none";
  } else {
    logOutButton.addEventListener("click", (e) => {
      logOut();
      window.location.href = "/";
    });
  }
});

readFileAndSetHtml("footer-placeholder", "/templates/footer.html");
