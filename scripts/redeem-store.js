import { db } from "./firebaseAPI_TEAM_BBY_16.js";
import { doc, getDoc } from "firebase/firestore";

const token = window.localStorage.getItem("token");

const docRef1 = doc(db, "users", token);
const docSnap = await getDoc(docRef1);
console.log(docSnap);

if (docSnap.exists()) {
  const target = docSnap.data().points;
  console.log(target);
  document.getElementById("PointsPlaceHolder").innerHTML = target;
} else {
  console.log("No such document!");
}

function pointChecker() {
  if (target <= 0) {
    console.log("Not enough points");
  } else {
    console.log("Redeem sucessful");
    target -= 5;
  }
}

const docRef2 = doc(db, "Rewards", "giftCards");
const docSnap2 = await getDoc(docRef2);

// Adds info such as name, point and image.
if (docSnap2.exists()) {
  const target2 = docSnap2.data();
  console.log(target2);
  var i = 1;
  target2.cards.forEach((reward) => {
    let option = document.getElementById(`option${i}`);
    let points = document.getElementById(`point${i}`);
    let img = document.getElementById(`image${i}`);

    img.setAttribute("src", reward.img);

    points.innerHTML = reward.points + " points";
    option.innerHTML = reward.name;

    i++;
  });
}
