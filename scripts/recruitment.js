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

const dbref = ref(db)



const mainForm = document.getElementById('mainForm')
const modelbtn = document.getElementById("modelbtn");

mainForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    push(ref(db, "UserRequests/"+"General/" + "Form1/" ), {
        FullName :mainForm['FullName'].value,
        NuEmail : mainForm['NuEmail'].value,
        NuID : mainForm['NuID'].value,
        Major : mainForm['Major'].value,
        PhoneNumber : mainForm['PhoneNumber'].value,
        School : mainForm['School'].value,
        classLevel: mainForm['classLevel'].value,
        yesOrNo : mainForm['yesOrNo'].value,
        Committee : mainForm['Committee'].value,
        Comments : mainForm['Comments'].value,
        status: false,


     }).then(()=>{
        mainForm.reset();
      
        modelbtn.click();
     })
})