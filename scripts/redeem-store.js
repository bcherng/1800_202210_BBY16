
import { db } from "./firebaseAPI_TEAM_BBY_16.js"
import { doc, getDoc } from "firebase/firestore";

const token = window.localStorage.getItem("token");

const docRef1 = doc(db, "users", token);
const docSnap = await getDoc(docRef1);
console.log(docSnap)

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

 const docRef = doc(db, "Rewards", CompanyName);
 const docSnap1 = await getDoc(docRef);
console.log(docSnap1)
 if (docSnap1.exists()) {
     const reward = docSnap1.data();
     let reward1 = document.getElementById("option1");
     reward1.innerHTML = reward.Company;
     
 }