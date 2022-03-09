
import { db } from "./firebaseAPI_TEAM_BBY_16.js"
import { doc, getDoc } from "firebase/firestore";

const storage = window.localStorage;
const token = storage.getItem("token");

const docRef = doc(db, "users", token);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
    const target = docSnap.data();
    document.getElementById("userRankPlaceHolder").innerHTML
        = target.leaderboardPos;
    document.getElementById("userNamePlaceHolder").innerHTML
        = target.name;
    document.getElementById("userPointsPlaceHolder").innerHTML
        = target.points;
    document.getElementById("userPredictionsMadePlaceHolder").innerHTML
        = target.predictionsMade;
    document.getElementById("userJoinDatePlaceHolder").innerHTML
        = target.timestamp;
} else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
}