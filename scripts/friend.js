import { readFileAndSetHtml } from "./templates/readfile";

let doc = document.getElementById("addFriends");
doc.addEventListener("click", () => {
  readFileAndSetHtml("friendSearchBar", "/templates/searchbar.html.txt");
});
