import { db } from "./firebaseAPI_TEAM_BBY_16.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

async function update() {
  let users = collection(db, "users");

  // Query for the users collection where users are ordered by correct
  // predictions and given in a descending order.
  const orderedUsers = query(users, orderBy("correctPredictions", "desc"));

  const docs = await getDocs(orderedUsers);

  let template = document.getElementById("card-template");
  let cardHolder = document.getElementById("user-cards");

  // Make user cards for each user.
  docs.forEach((doc) => {
    let data = doc.data();

    let cardTemp = template.content.cloneNode(true);

    cardTemp.querySelectorAll(".card-title")[0].innerText = data.name;
    cardTemp.querySelectorAll(".card-text")[0].innerText =
      data.correctPredictions + " Win(s)";

    cardTemp
      .querySelectorAll("#view_profile")[0]
      .addEventListener("click", function () {
        window.location.href = `/pages/profile.html?uid=${doc.id}`;
      });

    cardHolder.appendChild(cardTemp);
  });

  document.getElementById("sub-url").innerText = "/ leaderboard";
}

update();
