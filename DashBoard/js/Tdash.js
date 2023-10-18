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
  query,orderByChild
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
let AssistantWith;
let subjectSelcted;

const userName = document.getElementById("userName");
let Grade = document.getElementById("Grade");
const numberOfExams = document.getElementById("numberOfExams");
const subscripeTrue = document.getElementById("subscripeTrue");
const subscripeFalse = document.getElementById("subscripeFalse");
const first = document.getElementById("first");
const second = document.getElementById("second");
const third = document.getElementById("third");
// =================== FOR DESGIN ============= //
const sdieMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

menuBtn.addEventListener("click", () => {
  sdieMenu.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sdieMenu.style.display = "none";
});
document.body.classList.toggle("dark-theme-variables");

themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});
// =================== END DESGIN ============= //
// =================== Chart  ============= //

const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "الاول",
      "الثاني ",
      "الامتحان الخامس عشر",
      "الامتحان السادس",
      "انهو الاول",
      "ص ١٠ لي ص ٢٠",
      "ص٢٠لي٢٠",
      "dfafaf",
      "afafafaf",
      "faafaf",
    ],
    datasets: [
      {
        label: "  المتوسط ",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
// =================== END Chart  ============= //

// ======================================== LOGOUT =====================================//
function logOut() {
  signOut(auth)
    .then(() => {
      window.location.href = "../login.html";
    })
    .catch((error) => {
      // An error happened.
    });
}

module.logOut = logOut;





// ======================================== On Auth =====================================//

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     let c =0
//     const dbRef23 = ref(db, "userData/" );
//     onValue(
//           dbRef23,
//             (snapshot) => {
//               snapshot.forEach((childSnapshot) => {
//                 const childKey = childSnapshot.key;
//                 const childData = childSnapshot.val();
   
//                 if (childData["Videospurchased"]) {
//                   c++
//                 }  

//                });
//                console.log(c)
//             },
//             {
//               onlyOnce: true,
//             }
//     );

//     const dbRef = ref(db);
//     get(child(dbRef, "userData/" + user.uid)).then((snapshot) => {
//       if (snapshot.exists()) {
//         userName.innerHTML = snapshot.val().name;
//         const status = snapshot.val().status;
//         AssistantWith = snapshot.val().AssistantWith;

//         if (status !== "Teacher") {
//           window.location.href = "../login.html";
//         }
//       }
//       subjectSelcted = "Bio";
     
//       function onChange() {
//         let trues = 0;
//         let falses = 0;
//         let ALlQuizes = 0
//         get(
//           child(
//             dbRef,
//             `${AssistantWith}/` +
//               `${Grade.value}/` +
//               "QuizesSubject/" +
//               `${subjectSelcted}/`
//           )
//         ).then((snapshot) => {
//           if (snapshot.exists()) {
//             numberOfExams.innerHTML = snapshot.val().NumOFQuizesAdded;
//             ALlQuizes = snapshot.val().NumOFQuizesAdded
//             for (let i = 1; i <= ALlQuizes; i++) {
//                 let tot = [ ]
//                 const dbrfs = ref(db, "userData/");
//             onValue(
//                 dbrfs,
//                 (snapshot) => {
//                   snapshot.forEach((childSnapshot) => {
//                     const childKey = childSnapshot.key;
//                     const childData = childSnapshot.val();         
//                     if (childData[`${Grade.value}`]!=undefined){
//                       if (childData.SubscripeWith==AssistantWith) {
//                         if ( childData[`${Grade.value}`]["scores"]!==undefined) {
//                           ex = ex + childData[`${Grade.value}`]["scores"][`${subjectSelcted}`][`score${i}`]["score"]
//                           // console.log(ex)
//                           tot.push(ex)  
//                          }
//                         }   
//                     }else{
//                     } 
//                     ex=0     
//                     let SUM=  tot.reduce((a, b) => a + b, 0)
//                     let AVE = (SUM/tot.length)
//                     arrayScoreAve[i-1] = AVE
//                   //   console.log(arrayScoreAve)
//                     myChart.data.datasets[0].data = arrayScoreAve;
//                     myChart.update();
//                   });
//               },
//               {
//                 onlyOnce: true,
//               }
//             );
                
//             }

            
//           } else {
//             numberOfExams.innerHTML = "0";
//           }
//         });

//         // ===================== GET NUMBER OF SUBSCRIPE STUDENT ===================== //
//         const dbRef2 = ref(db, "userData/");
//         onValue(
//           dbRef2,
//           (snapshot) => {
//             snapshot.forEach((childSnapshot) => {
//               const childKey = childSnapshot.key;
//               const childData = childSnapshot.val();
//               if (childData.Grade == Grade.value) {
//                 if (AssistantWith == childData.SubscripeWith) {
//                   if (childData.subscripeStatus) {
//                     trues++;
//                     subscripeTrue.innerHTML = trues;
//                   } else {
//                     falses++;
//                     subscripeFalse.innerHTML = falses;
//                   }
//                 }
//               }
//             });
//           },
//           {
//             onlyOnce: true,
//           }
//         );

//         // ===================== GET AVERAGE  ===================== //
              
//         let arr = [];
//         let temp 
//         let tot = [ ]
//         let ex=0 
//         let arrayScoreAve = []
//         const dbRefaverage = ref(
//           db,
//           `${AssistantWith}/` +
//             `${Grade.value}/` +
//             "QuizesSubject/" +
//             `${subjectSelcted}/` +
//             "QuizesData"
//         );
//         onValue(
//           dbRefaverage,
//           (snapshot) => {
//             snapshot.forEach((childSnapshot) => {
//               const childKey = childSnapshot.key;
//               const childData = childSnapshot.val();
//               console.log(childData.Time, childKey);
//               arr.push(childData.Name);
//               temp =childData.quizID;
//               myChart.data.labels = arr;
//               myChart.update();
//             });
//           },
//           {
//             onlyOnce: true,
//           }
//         );
        
//          console.log(Grade)
     
       
//          let ARR = []
//          const dbRef3 = query( ref(db,"userData"),orderByChild(`${Grade.value}`+`/totalScore`) );
//          onValue(
//            dbRef3,
//            (snapshot) => {
//              snapshot.forEach((childSnapshot) => {
//                const childKey = childSnapshot.key;
//                const childData = childSnapshot.val();
//                if (Grade.value==childData.Grade) {
//                if (childData.SubscripeWith==AssistantWith) {
//                  ARR.push(childData.profile_picture)
//                  let newARR =ARR.reverse()
//                  first.src = newARR.at(0)
//                  second.src = newARR.at(1)
//                  third.src = newARR.at(2)      
//                }
//              }
//              });
//            },
//            {
//              onlyOnce: true,
//            }
//          );
//          console.log(Grade,ARR)

//       }
//       Grade.onchange = onChange;
//       onChange();
      
//     });

//     get(child(dbRef, "userData/" + user.uid)).then((snapshot) => {
//       if (snapshot.exists()) {
//         let stat = snapshot.val().status;
//         userName.innerHTML = snapshot.val().name;
        
//         if (stat != "Teacher" || stat == undefined) {
//           window.location.href = "../login.html";
//         }

//       }
//     });
//   } else {
//     window.location.href = "../login.html";
//   }
// });
