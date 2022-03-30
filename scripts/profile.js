import { db } from "./firebaseAPI_TEAM_BBY_16.js";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  updateDoc,
} from "firebase/firestore";
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

  let userDoc = doc(db, `users/${getID()}`);
  let snap = await getDoc(userDoc);
  let redeemedSports = snap.data().redeemed || [];

  Object.entries(userData.predictions).forEach(([name, country]) => {
    const template = document.getElementById("past-predictions-template");

    const card = template.content.cloneNode(true);

    const correctNode = document.getElementById("correct-prediction-template");
    const incorrectNode = document.getElementById(
      "incorrect-prediction-template"
    );
    const pendingNode = document.getElementById("pending-prediction-template");
    const redeemedNode = document.getElementById(
      "redeemed-prediction-template"
    );

    card.querySelectorAll("h3")[0].innerText = name;
    card.querySelectorAll("p")[0].innerText = country;

    const btn = card.querySelectorAll("#redeem")[0];

    let redeemed = redeemedNode.content.cloneNode(true);
    redeemed.firstElementChild.id = `redeemed-${name}`;

    let correct = correctNode.content.cloneNode(true);
    correct.firstElementChild.id = `correct-${name}`;

    let incorrect = incorrectNode.content.cloneNode(true);
    incorrect.firstElementChild.id = `incorect-${name}`;

    let pending = pendingNode.content.cloneNode(true);
    pending.firstElementChild.id = `pending-${name}`;

    for (let doc of results.docs) {
      const id = doc.id;
      const data = doc.data();

      if (redeemedSports.includes(name)) {
        btn.disabled = true;
        card.appendChild(redeemed);
      } else {
        if (id == name && data.winner == country) {
          btn.disabled = false;
          card.appendChild(correct);
          break;
        } else if (id == name && data.winner !== country) {
          card.appendChild(incorrect);
          break;
        } else {
          card.appendChild(pending);
          break;
        }
      }
    }

    card.appendChild(document.createElement("hr"));

    if (!btn.disabled) {
      btn.addEventListener("click", () => {
        getDoc(userDoc).then((snap) => {
          let initial = snap.data().redeemed || [];
          let points = snap.data().points;

          let final = [...initial, name];

          updateDoc(userDoc, {
            redeemed: final,
            points: (points += 50),
          }).then(() => {
            getDoc(userDoc).then((snap) => {
              document.getElementById("userPointsPlaceHolder").innerHTML =
                snap.data().points;
                alert(`Congratulations! You redeemed ${name} to get 50 points.`)
            });
          });
          let correctElement = document.getElementById(`correct-${name}`);
          correctElement.className = "redeemed-prediction";
          correctElement.innerText = "Already Redeemed";
          btn.disabled = true
        });
      });
    }

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
