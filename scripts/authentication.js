import { db } from "./firebaseAPI_TEAM_BBY_16.js";
import { getAuth, EmailAuthProvider } from "firebase/auth";

import * as firebaseui from "firebaseui";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { logIn } from "./index/login.js";

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(getAuth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      var user = authResult.user;
      logIn(user.uid);

      if (authResult.additionalUserInfo.isNewUser) {
        setDoc(doc(db, `users/${user.uid}`), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
          points: 0,
          leaderboardPos: 0,
        }).then(() => {
          window.location.assign("/home.html");
        });
      } else {
        window.location.assign("/home.html");
      }

      return false;
    },
    uiShown: function () {
      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "",
  signInOptions: [EmailAuthProvider.PROVIDER_ID],
  // Terms of service url.
  tosUrl: "<your-tos-url>",
  // Privacy policy url.
  privacyPolicyUrl: "<your-privacy-policy-url>",
};

ui.start("#firebaseui-auth-container", uiConfig);
