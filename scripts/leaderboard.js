import { db } from "./firebaseAPI_TEAM_BBY_16.js";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";


async function update() {
  let users = collection(db, "users");

  const orderedUsers = query(users, orderBy("leaderboardPos", "asc"));

  const docs = await getDocs(orderedUsers)

  let template = document.getElementById("card-template");
  let cardHolder = document.getElementById("user-cards");

  docs.forEach((doc) => {
    let data = doc.data();

    let cardTemp = template.content.cloneNode(true);

    cardTemp.querySelectorAll(".card-title")[0].innerText = data.name;
    cardTemp.querySelectorAll(".card-text")[0].innerText = "#" + data.leaderboardPos;

    cardHolder.appendChild(cardTemp);
  })
}

update();