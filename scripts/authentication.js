import { logIn } from "./index/login.js";
import { db } from "./firebaseAPI_TEAM_BBY_16.js";

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: async function (authResult, redirectUrl) {
      logIn(authResult.user.uid);

      if (authResult.additionalUserInfo.isNewUser) {
        var user = authResult.user;

        db.collection("users")
          // define a document for a user with UID as a document ID
          .doc(user.uid)
          .set({
            name: user.displayName,
            email: user.email,
          })
          .then(function () {
            window.location.assign("/home.html");
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        window.location.assign("/home.html");
      }
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "/home.html",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  // Terms of service url.
  tosUrl: "<your-tos-url>",
  // Privacy policy url.
  privacyPolicyUrl: "<your-privacy-policy-url>",
};

ui.start("#firebaseui-auth-container", uiConfig);
