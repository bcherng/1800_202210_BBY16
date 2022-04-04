import { db } from "./firebaseAPI_TEAM_BBY_16.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getID } from "./index/login.js";

let userPoints = 0;

setUserPoints().then(() => {
  setCards();
});

async function setUserPoints() {
  const token = window.localStorage.getItem("token");

  const docRef1 = doc(db, "users", token);
  const docSnap = await getDoc(docRef1);

  if (docSnap.exists()) {
    const target = docSnap.data().points;
    userPoints = parseInt(target);
    document.getElementById("PointsPlaceHolder").innerHTML = target;
  } else {
    console.log("No such document!");
  }
}

async function setCards() {
  const docRef2 = doc(db, "Rewards", "giftCards");
  const docSnap2 = await getDoc(docRef2);

  // Adds info such as name, point and image.
  if (docSnap2.exists()) {
    const target2 = docSnap2.data();

    var i = 1;

    target2.cards.forEach((reward) => {
      let option = document.getElementById(`option${i}`);
      let points = document.getElementById(`point${i}`);
      let img = document.getElementById(`image${i}`);

      let btn = document.getElementById(`btn${i}`);

      if (userPoints < reward.points) {
        btn.disabled = true;
      } else {
        btn.addEventListener("click", () => {
          alert("Redeemed Code: 84W2yNB6");
          btn.disabled = true;

          let userDoc = doc(db, `users/${getID()}`);

          getDoc(userDoc).then((snap) => {
            let newPoints = snap.data().points - parseInt(reward.points);
            updateDoc(userDoc, {
              points: newPoints,
            }).then(() => {
              setUserPoints().then(() => {
                setCards();
              });
            });
          });
        });
      }

      img.setAttribute("src", reward.img);

      points.innerHTML = reward.points + " points";
      option.innerHTML = reward.name;

      i++;
    });
  }

  document.getElementById("sub-url").innerText = "/ store";
}
