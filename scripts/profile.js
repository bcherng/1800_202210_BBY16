import { db } from "./firebaseAPI_TEAM_BBY_16.js";
import { doc, getDoc } from "firebase/firestore";
import { getID } from "./index/login.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid") || getID();

function main() {
  const docRef = doc(db, "users", uid);
  getDoc(docRef).then((snap) => {
    if (snap.exists()) {
      const data = snap.data();
      document.getElementById("userRankPlaceHolder").innerHTML =
        data.leaderboardPos;
      document.getElementById("userNamePlaceHolder").innerHTML = data.name;
      document.getElementById("userPointsPlaceHolder").innerHTML = data.points;
      document.getElementById("userPredictionsMadePlaceHolder").innerHTML =
        data.predictionsMade;
      document.getElementById("userJoinDatePlaceHolder").innerHTML =
        data.timestamp.toDate().toDateString();

      const pastPredictionsHolder = document.getElementById(
        "past-predictions-holder"
      );

      console.log(Object.entries(data.predictions))

      Object.entries(data.predictions).forEach(([name, country]) => {
        const template = document.getElementById("past-predictions-template");

        const card = template.content.cloneNode(true);

        card.querySelectorAll("h3")[0].innerText = name;
        card.querySelectorAll("p")[0].innerText = country;

        pastPredictionsHolder.appendChild(card);
      });
    } else {
      console.log("No such document!");
    }
  });
}

main();
