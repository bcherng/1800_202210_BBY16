import { db } from "./firebaseAPI_TEAM_BBY_16.js";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

import Fuse from "fuse.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchQuery = urlParams.get("name");

async function update() {
  let users = collection(db, "users");

  var allUsers = [];

  await getDocs(users).then((snap) => {
    snap.forEach((doc) => {
      allUsers.push({ id: doc.id, ...doc.data() });
    });
  });

  const fuse = new Fuse(allUsers, { keys: ["name"] });
  const result = fuse.search(searchQuery);

  let template = document.getElementById("card-template");
  let cardHolder = document.getElementById("user-cards");

  result.forEach((val) => {
    console.log(val);
    let cardTemp = template.content.cloneNode(true);

    cardTemp.querySelectorAll(".card-title")[0].innerText = val.item.name;
    cardTemp.querySelectorAll(".card-text")[0].innerText = val.item.name;

    cardHolder.appendChild(cardTemp);
  });
}

update();
