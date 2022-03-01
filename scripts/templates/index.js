import { readFileAndSetHtml } from "./readfile.js";
import { logOut } from "../index/login.js";

readFileAndSetHtml("nav-placeholder", "/templates/nav.html").then(() => {
  document.getElementById("log-out").addEventListener("click", (e) => {
    console.log("here2");
    logOut();
    window.location.href = "/";
  });
});

readFileAndSetHtml("footer-placeholder", "/templates/footer.html");