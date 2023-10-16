// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  get,
  update,
  remove,
  push,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,

} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const dbfirebaseConfig = {
    apiKey: "AIzaSyC5WeGIodvlJQae25nOP_NI9Ep_mFJ0q0c",
    authDomain: "e-club-550da.firebaseapp.com",
    projectId: "e-club-550da",
    storageBucket: "e-club-550da.appspot.com",
    messagingSenderId: "950187934193",
    appId: "1:950187934193:web:cf897fd51613079c598450"
};

const dbApp= initializeApp(dbfirebaseConfig,"db");
const db = getDatabase(dbApp);
const authConfig = {
    apiKey: "AIzaSyC5WeGIodvlJQae25nOP_NI9Ep_mFJ0q0c",
    authDomain: "e-club-550da.firebaseapp.com",
    projectId: "e-club-550da",
    storageBucket: "e-club-550da.appspot.com",
    messagingSenderId: "950187934193",
    appId: "1:950187934193:web:cf897fd51613079c598450"
};
const authApp = initializeApp(authConfig, "auth");
const auth = getAuth(authApp);
const dbref = ref(db)



const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  const name = loginForm["name"].value;
  const errorMessage = document.getElementById("error");
  document.getElementById("loginbtn").innerHTML="Loading... "
  errorMessage.innerHTML = "";
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log(cred.user)
        document.getElementById("loginbtn").innerHTML="SignIn"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessages = error.message;
      if (errorCode == "auth/wrong-password") {
        errorMessage.innerHTML = "Wrong Email Or Password";
        errorMessage.style.display = "inline";
      } else if (errorCode == "auth/internal-error") {
        errorMessage.innerHTML = "Wrong Email Or Password";
        errorMessage.style.display = "inline";
      } else {
        errorMessage.innerHTML = "Wrong Email Or Password";
        errorMessage.style.display = "inline";
      }
      document.getElementById("loginbtn").innerHTML="SignIn"

    });
    console.log(e)
    loginForm.reset()
});



// const signUpForm = document.querySelector("#signUp-Form");

// signUpForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const email = signUpForm["signUp-Email"].value;
//   const password = signUpForm["signUp-Password"].value;
//   const name = signUpForm["Name"].value;
//   const errorMessage = document.getElementById("error2");

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((cred) => {
//       console.log(cred);
//     })
//     .then(() => {
//       signUpForm.reset();
//       console.log("done");
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessages = error.message;
//       console.log(errorCode);
//       if (errorCode == "auth/wrong-password") {
//         errorMessage.innerHTML = "يرجي كتابه كلمه مرور اقوي";
//         errorMessage.style.display = "inline";
//       } else if (errorCode == "auth/weak-password") {
//         errorMessage.innerHTML = "يرجي كتابه كلمه مرور اقوي";
//         errorMessage.style.display = "inline";
//       } else if (errorCode == "auth/invalid-email") {
//         errorMessage.innerHTML = "البريد الالكتروني غير صالح او غير صحيح";
//         errorMessage.style.display = "inline";
//       }
//     });
// });



// document.addEventListener("keydown", function(e) {
//   if (e.ctrlKey && e.shiftKey && e.key === "I") {
//     e.preventDefault();
//   }
// });
// document.addEventListener('contextmenu', event => event.preventDefault());

    