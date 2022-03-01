import { isLoggedIn } from "./login.js";

if (isLoggedIn()) {
    window.location.href = "/landing.html";
}