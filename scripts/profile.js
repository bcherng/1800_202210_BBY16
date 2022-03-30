import { db } from "./firebaseAPI_TEAM_BBY_16.js";
import { doc, getDoc, getDocs, collection, query } from "firebase/firestore";
import { getID } from "./index/login.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid") || getID();

async function setPastPredictions(userData) {
  const pastPredictionsHolder = document.getElementById(
    "past-predictions-holder"
  );

  let resultsCollection = collection(db, "results");
  const resultsDocs = query(resultsCollection);

  const results = await getDocs(resultsDocs);

  Object.entries(userData.predictions).forEach(([name, country]) => {
    const template = document.getElementById("past-predictions-template");

    const card = template.content.cloneNode(true);

    const correctNode = document.getElementById("correct-prediction-template")
    const incorrectNode = document.getElementById("incorrect-prediction-template")
    const pendingNode = document.getElementById("pending-prediction-template")

    card.querySelectorAll("h3")[0].innerText = name;
    card.querySelectorAll("p")[0].innerText = country;

    const btn = card.querySelectorAll("#redeem")[0];

    for (let doc of results.docs) {
      const id = doc.id;
      const data = doc.data();

      if (id == name && data.winner == country) {
        btn.disabled = false;
        card.appendChild(correctNode.content.cloneNode(true))
        break;
      } else if (id == name && data.winner !== country) {
        card.appendChild(incorrectNode.content.cloneNode(true))
        break;
      } else {
        card.appendChild(pendingNode.content.cloneNode(true))
        break;
      }
    }

    card.appendChild(document.createElement("hr"))

    pastPredictionsHolder.appendChild(card);
  });
}

function setUserData(userData) {
  document.getElementById("userRankPlaceHolder").innerHTML =
    userData.leaderboardPos;
  document.getElementById("userNamePlaceHolder").innerHTML = userData.name;
  document.getElementById("userPointsPlaceHolder").innerHTML = userData.points;
  document.getElementById("userPredictionsMadePlaceHolder").innerHTML =
    userData.predictionsMade;
  document.getElementById("userJoinDatePlaceHolder").innerHTML =
    userData.timestamp.toDate().toDateString();
}

function main() {
  const docRef = doc(db, "users", uid);
  getDoc(docRef).then((snap) => {
    if (snap.exists()) {
      const data = snap.data();

      setUserData(data);
      setPastPredictions(data);
    } else {
      console.log("No such document!");
    }
  });
}

main();
