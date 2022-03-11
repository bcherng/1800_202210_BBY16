
import { db } from "./firebaseAPI_TEAM_BBY_16.js"
import { doc, getDoc } from "firebase/firestore";

const token = window.localStorage.getItem("token");

const docRef = doc(db, "users", token);
const docSnap = await getDoc(docRef);


if (docSnap.exists()) {
    const target = docSnap.data().points;
    console.log(target);
    document.getElementById("PointsPlaceHolder").innerHTML
        = target;
} else {
    
    console.log("No such document!");
}



function pointChecker() {
    if(target <= 0) {
        console.log("Not enough points");
    } else {
        console.log("Redeem sucessful");
        target -= 5;
    }
 }