import { db } from "./firebaseAPI_TEAM_BBY_16.js";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

import Fuse from "fuse.js";

// Get the search query from the URL.
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchQuery = urlParams.get("name");

async function update() {
  let users = collection(db, "users");

  var allUsers = [];

  // Get all users and push them into an array.
  await getDocs(users).then((snap) => {
    snap.forEach((doc) => {
      allUsers.push({ id: doc.id, ...doc.data() });
    });
  });

  document.getElementById("sub-url").innerText = "/ search";

  // Initialize the fuzzy matcher and match.
  const fuse = new Fuse(allUsers, { keys: ["name"] });
  const result = fuse.search(searchQuery);

  let template = document.getElementById("card-template");
  let cardHolder = document.getElementById("user-cards");

  // Make cards for each result.
  result.forEach((val) => {
    let cardTemp = template.content.cloneNode(true);

    cardTemp.querySelectorAll(".card-title")[0].innerText = val.item.name;
    cardTemp.querySelectorAll(".card-text")[0].innerText = val.item.name;


    cardTemp.querySelectorAll("#view_profile")[0].addEventListener('click', function() {
      window.location.href = `/pages/profile.html?uid=${val.item.id}`
    })

    cardHolder.appendChild(cardTemp);
  });
}

update();
