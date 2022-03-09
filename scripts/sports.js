const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const sportName = urlParams.get('sport');
// const sportName = "biathlon";
// console.log(sportName);
// document.getElementById("sportsNamePlaceHolder").innerHTML
    // = sportName;
import { db } from "./firebaseAPI_TEAM_BBY_16.js"
import { doc, getDoc } from "firebase/firestore";

    const docRef = doc(db, "SportsData", sportName);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
        const target = docSnap.data();
        document.getElementById("sportsNamePlaceHolder").innerHTML
         = target.DisplayName;
        document.getElementById("sportsDescriptionPlaceHolder").innerHTML
        = target.Description;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }