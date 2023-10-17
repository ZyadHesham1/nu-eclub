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
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const dbfirebaseConfig = {
  apiKey: "AIzaSyChX6oD8uA1tWR_hNzcVzOOZMYwXsLW-TA",
  authDomain: "allasharaf.firebaseapp.com",
  databaseURL: "https://allasharaf-default-rtdb.firebaseio.com",
  projectId: "allasharaf",
  storageBucket: "allasharaf.appspot.com",
  messagingSenderId: "638342504235",
  appId: "1:638342504235:web:f3350e5bb8a63e41bc2f6e"
};
const storageConfig = {
  apiKey: "AIzaSyChX6oD8uA1tWR_hNzcVzOOZMYwXsLW-TA",
  authDomain: "allasharaf.firebaseapp.com",
  databaseURL: "https://allasharaf-default-rtdb.firebaseio.com",
  projectId: "allasharaf",
  storageBucket: "allasharaf.appspot.com",
  messagingSenderId: "638342504235",
  appId: "1:638342504235:web:f3350e5bb8a63e41bc2f6e"
};
const storageApp = initializeApp(storageConfig, "storage");
const dbApp= initializeApp(dbfirebaseConfig,"db");
const db = getDatabase(dbApp);
const authConfig = {
  apiKey: "AIzaSyChX6oD8uA1tWR_hNzcVzOOZMYwXsLW-TA",
  authDomain: "allasharaf.firebaseapp.com",
  databaseURL: "https://allasharaf-default-rtdb.firebaseio.com",
  projectId: "allasharaf",
  storageBucket: "allasharaf.appspot.com",
  messagingSenderId: "638342504235",
  appId: "1:638342504235:web:f3350e5bb8a63e41bc2f6e"
};
const authApp = initializeApp(authConfig, "auth");
const auth = getAuth(authApp);
let dbref = ref(db);

let videosName = document.getElementById("videosName")


let addQuizName = document.getElementById("addQuizNameForm");
let nameOfNewQuiz = document.getElementById("nameOfNewQuiz");
let Qcount = document.getElementById("Qcount");
let Grade = document.getElementById("Grade");
let subject = document.getElementById("subject");
let quizNmber = document.getElementById("sel");
let btn = document.getElementById("btnAdd");
let startFillQuizDataBtn = document.getElementById("startFillQuizDataBtn");
let add = document.getElementById("add");
let addForm = document.getElementById("add-form");
let reviews = document.getElementById("show-data-Added");
let collectData = document.getElementById("collectData");
let statusOfQuiz = document.getElementById("quizStatus")


let VideoKEY = ""



// ============= addQuiz Data ============== // 
function onChange1() {   
  GradeSelcted = Grade.value;
  Qcount.removeAttribute("disabled")
  videosName.removeAttribute("disabled")
  btnstartAddQuiz.removeAttribute("disabled")
  var sel = document.getElementById("sel");
  sel.innerHTML = `<option class="shape">اختر اسم الامتحان  </option> `;

  videosName.innerHTML =` <option class="shape">اختر اسم الفيديو الذي سيفتح</option>  `

  const dbRef = ref(db, "BioDiva/" + "Quiezs/" +`${Grade.value}/` );
  onValue(
    dbRef,
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        
    
        sel.innerHTML +=`
        <option value="${childKey}">${childData.QuizName}</option>
        `
      });
    },     
    {
      onlyOnce: true,
    }
  );
  const dbRef2 = ref(db, "BioDiva/" + "videos/" +`${Grade.value}/` );
  onValue(
    dbRef2,
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        if (childData.withExam=="WithOutExamAndHW"||childData.withExam=="WithOutExam" ) {
          true
        }else{
          videosName.innerHTML +=`
          <option value="${childKey}">${childData.Title}</option>
          `
        }
   
      });
    },     
    {
      onlyOnce: true,
    }
  );


}

function onChange2() {   
  VideoKEY=videosName.value;
}
function onChange3() {   
  collectData.removeAttribute("disabled");
}


Grade.onchange = onChange1
videosName.onchange = onChange2
sel.onchange = onChange3
// ===== start add quiz ===== //
const addQuizForm  = document.getElementById("add-quiz-form")
const addoneQuestionBtn = document.getElementById("add")
const btnstartAddQuiz = document.getElementById("btnstartAddQuiz")
const questionimg = document.getElementById("questionimg")
const showDataAdded = document.getElementById("show-data-Added")
const uploadQuestionPhotoBtn = document.getElementById("upload-questionPhoto-btn")
let URLQuestionPhoto =""; 
let questionscount = 0;
let selQuestionPhotoBtn = document.getElementById("sel-questionPhoto-btn")
let obj = new Object() 
let ObjAnswers =  new Object() ;
let tempcount = 0;
let timeOfQuiz = 0;

btnstartAddQuiz.addEventListener('click',()=>{
  questionscount = + document.getElementById('Qcount').value;
  tempcount = questionscount
  timeOfQuiz = document.getElementById("timeofquiz").value;
  selQuestionPhotoBtn.removeAttribute("disabled")
  addoneQuestionBtn.removeAttribute('disabled')
  Qcount.setAttribute("disabled",true)
  videosName.setAttribute("disabled",true)
  Grade.setAttribute("disabled",true)
  nameOfNewQuiz.setAttribute("disabled",true)
  document.getElementById("timeofquiz").setAttribute("disabled",true)
  btnstartAddQuiz.setAttribute("disabled",true)
  uploadAllDataBtn.removeAttribute("disabled")
})  

selQuestionPhotoBtn.onchange = (e)=>{
let reader = new FileReader();
let files = e.target.files;
 reader.readAsDataURL(files[0]);
 reader.onload =  ()=> {
  questionimg.src = reader.result
}
uploadQuestionPhotoBtn.removeAttribute("disabled")
}

async function uploadquestionPhoto() {
  let selQuestionPhotoBtn = document.getElementById("sel-questionPhoto-btn").files[0];

  const metaData = {
    contentType: selQuestionPhotoBtn.type,
  };
  const storage = getStorage(storageApp);
  const stroageRef = sRef(
    storage,
    "BioDiva/" + "shortQuiez/" + selQuestionPhotoBtn.name
  );
  const UploadTask = uploadBytesResumable(stroageRef, selQuestionPhotoBtn, metaData);
  UploadTask.on(
    "state-changed",
    (snapshot) => {
      var progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploadQuestionPhotoBtn.innerHTML = progess.toFixed(2) + "%";
    },
    (error) => {
      alert("error");
    },
    () => {
      getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
        URLQuestionPhoto = downloadURL;
        uploadQuestionPhotoBtn.innerHTML="تم الرفع"
      });
    }
  );
}
module.uploadquestionPhoto = uploadquestionPhoto;
uploadQuestionPhotoBtn.addEventListener('click',uploadquestionPhoto)

addoneQuestionBtn.addEventListener('click',()=>{
  if(questionscount==0){
    alert("لقد تخطيت عدد الاسئله المختاره")
    return ; 
  }
  addoneQuestionBtn.setAttribute("disabled",true)
  setTimeout(()=>{
    addoneQuestionBtn.removeAttribute("disabled")
  }, 3000);
  obj[`question${(tempcount-questionscount)+1}`]={
    ImgUrl:URLQuestionPhoto,
    title: addQuizForm["Qtitle"].value,
    answer1: addQuizForm["answer1"].value,
    answer2: addQuizForm["answer2"].value,
    answer3: addQuizForm["answer3"].value,
    answer4: addQuizForm["answer4"].value,
    ranswer: +addQuizForm["ranswer"].value,
    Explain:addQuizForm["Explain"].value
  }
    addQuizForm["Qtitle"].value=""
    addQuizForm["answer1"].value=""
    addQuizForm["answer2"].value=""
    addQuizForm["answer3"].value=""
    addQuizForm["answer4"].value=""
    addQuizForm["ranswer"].value=""
    addQuizForm["Explain"].value=""
    questionimg.src=" "
    URLQuestionPhoto =""
    uploadQuestionPhotoBtn.innerHTML = "رفع صورة السؤال"
    ObjAnswers[`qAnswer${(tempcount-questionscount)+1}`]={
      answer : 0
    }
    console.log((tempcount-questionscount)+1)
    review((tempcount-questionscount)+1)
    questionscount--;

}) 
let qForm 
let updateID 
function GetIDToUpdate(QuestionNumber){
  qForm = document.getElementById(`Q${QuestionNumber}`)
  updateID = QuestionNumber
  qForm["Qtitle"].removeAttribute("disabled");
  qForm["answer1"].removeAttribute("disabled");
  qForm["answer2"].removeAttribute("disabled");
  qForm["answer3"].removeAttribute("disabled");
  qForm["answer4"].removeAttribute("disabled");
  qForm["Explain"].removeAttribute("disabled");
  qForm["rightanswer"].removeAttribute("disabled");
  document.getElementById(`saveUpdates${QuestionNumber}`).removeAttribute("disabled")
}
module.GetIDToUpdate = GetIDToUpdate;
function saveUpdateValues(){
  obj[`question${updateID}`] ={
    ImgUrl : qForm["questionImg"].src,
    title : qForm["Qtitle"].value,
    answer1:qForm["answer1"].value,
    answer2:qForm["answer2"].value,
    answer3:qForm["answer3"].value,
    answer4:qForm["answer4"].value,
    ranswer: +qForm["rightanswer"].value,
    Explain:qForm["Explain"].value
  }
  document
  .getElementById(`saveUpdates${updateID}`)
  .setAttribute("disabled", true);
  qForm["Qtitle"].setAttribute("disabled", true);
  qForm["answer1"].setAttribute("disabled", true);
  qForm["answer2"].setAttribute("disabled", true);
  qForm["answer3"].setAttribute("disabled", true);
  qForm["answer4"].setAttribute("disabled", true);
  qForm["Explain"].setAttribute("disabled", true);
  qForm["rightanswer"].setAttribute("disabled", true);
}
module.saveUpdateValues = saveUpdateValues;
function saveUpdateValues2(){
  obj[`question${updateID}`] ={
    ImgUrl : "",
    title : qForm["Qtitle"].value,
    answer1:qForm["answer1"].value,
    answer2:qForm["answer2"].value,
    answer3:qForm["answer3"].value,
    answer4:qForm["answer4"].value,
    ranswer: +qForm["rightanswer"].value,
    Explain:qForm["Explain"].value
  }
  document
  .getElementById(`saveUpdates${updateID}`)
  .setAttribute("disabled", true);
  qForm["Qtitle"].setAttribute("disabled", true);
  qForm["answer1"].setAttribute("disabled", true);
  qForm["answer2"].setAttribute("disabled", true);
  qForm["answer3"].setAttribute("disabled", true);
  qForm["answer4"].setAttribute("disabled", true);
  qForm["Explain"].setAttribute("disabled", true);
  qForm["rightanswer"].setAttribute("disabled", true);
}
module.saveUpdateValues2 = saveUpdateValues2;

function review(newQuestionNumber){
  if (obj[`question${newQuestionNumber}`].ImgUrl==="") {
    showDataAdded.innerHTML += `
      <form class="form-question-added" id="Q${newQuestionNumber}">
  
      <textarea class="form-control answer" disabled name="Qtitle" id="Qtitle" cols="30" rows="2">${obj[`question${newQuestionNumber}`].title}</textarea>
      <textarea class="form-control answer" disabled name="answer1" cols="30" rows="2">${obj[`question${newQuestionNumber}`].answer1}</textarea>
      <textarea class="form-control answer" disabled name="answer2" cols="30" rows="2">${obj[`question${newQuestionNumber}`].answer2}</textarea>
      <textarea class="form-control answer" disabled name="answer3" cols="30" rows="2">${obj[`question${newQuestionNumber}`].answer3}</textarea>
      <textarea class="form-control answer" disabled name="answer4" cols="30" rows="2">${obj[`question${newQuestionNumber}`].answer4}</textarea>
      <input type="number" name="rightanswer" disabled value="${obj[`question${newQuestionNumber}`].ranswer}" class="rightanswer">
      <textarea class="form-control answer"  style="display: none;" disabled name="Explain" id="Explain" cols="30" rows="2">${obj[`question${newQuestionNumber}`].Explain}</textarea>
      <div class="form-buttons">
      <button type="button" class="update" id="${newQuestionNumber}" onclick="module.GetIDToUpdate(this.id)"><i class="fa-solid fa-pen"></i></button>
      <button type="button" class="save" disabled id="saveUpdates${newQuestionNumber}" onclick="module.saveUpdateValues2()" >save</button>
      </div>
      </form>
      `;
  }else{
    showDataAdded.innerHTML += `
    <form class="form-question-added" id="Q${newQuestionNumber}">
    <div class="box box1"> 
    <img id="questionImg${newQuestionNumber}" name="questionImg" src="${obj[`question${newQuestionNumber}`].ImgUrl}">  
    </div>
    <textarea class="form-control answer" disabled name="Qtitle" id="Qtitle" cols="30" rows="2">${obj[`question${newQuestionNumber}`].title}</textarea>
    <textarea class="form-control answer" disabled name="answer1" cols="30" rows="2">${obj[`question${newQuestionNumber}`].answer1}</textarea>
    <textarea class="form-control answer" disabled name="answer2" cols="30" rows="2">${obj[`question${newQuestionNumber}`].answer2}</textarea>
    <textarea class="form-control answer" disabled name="answer3" cols="30" rows="2">${obj[`question${newQuestionNumber}`].answer3}</textarea>
    <textarea class="form-control answer" disabled name="answer4" cols="30" rows="2">${obj[`question${newQuestionNumber}`].answer4}</textarea>
    <input type="number" name="rightanswer" disabled value="${obj[`question${newQuestionNumber}`].ranswer}" class="rightanswer">
    <textarea class="form-control answer"  style="display: none;" disabled name="Explain" id="Explain" cols="30" rows="2">${obj[`question${newQuestionNumber}`].Explain}</textarea>
    <div class="form-buttons">
    <button type="button" class="update" id="${newQuestionNumber}" onclick="module.GetIDToUpdate(this.id)"><i class="fa-solid fa-pen"></i></button>
    <button type="button" class="save" disabled id="saveUpdates${newQuestionNumber}" onclick="module.saveUpdateValues()" >save</button>
    </div>
    </form>
    `;
  }
}

// ===== end add quiz ===== //

// ==== Collect Quiz Data =====//

let saveNewUpdates  = document.getElementById("saveNewUpdates")
collectData.addEventListener('click',()=>{
  collectData.setAttribute("disabled",true)
  sel.setAttribute("disabled",true)
  statusOfQuiz.removeAttribute("disabled")
  saveNewUpdates.removeAttribute("disabled")
  saveNewUpdates.removeAttribute("disabled")
  get(child(dbref, "BioDiva/" + "Quiezs/"+`${Grade.value}/` +`${sel.value}/`)).then((snapshot) => {
    if (snapshot.exists()) {
      obj = snapshot.val().Questions
    }
  }).then(()=>{
    for (let i = 1; i <= Object.keys(obj).length; i++) {
      if (obj[`question${i}`].ImgUrl==="") {
        showDataAdded.innerHTML += `
          <form class="form-question-added" id="Q${i}">
       
          <textarea class="form-control answer" disabled name="Qtitle" id="Qtitle" cols="30" rows="2">${obj[`question${i}`].title}</textarea>
          <textarea class="form-control answer" disabled name="answer1" cols="30" rows="2">${obj[`question${i}`].answer1}</textarea>
          <textarea class="form-control answer" disabled name="answer2" cols="30" rows="2">${obj[`question${i}`].answer2}</textarea>
          <textarea class="form-control answer" disabled name="answer3" cols="30" rows="2">${obj[`question${i}`].answer3}</textarea>
          <textarea class="form-control answer" disabled name="answer4" cols="30" rows="2">${obj[`question${i}`].answer4}</textarea>
          <input type="number" name="rightanswer" disabled value="${obj[`question${i}`].ranswer}" class="rightanswer">
          <textarea class="form-control answer"  style="display: none;" disabled name="Explain" id="Explain" cols="30" rows="2">${obj[`question${i}`].Explain}</textarea>
          <div class="form-buttons">
          <button type="button" class="update" id="${i}" onclick="module.GetIDToUpdate(this.id)"><i class="fa-solid fa-pen"></i></button>
          <button type="button" class="save" disabled id="saveUpdates${i}" onclick="module.saveUpdateValues2()" >save</button>
          </div>
          </form>
          `;
      }else{
        showDataAdded.innerHTML += `
        <form class="form-question-added" id="Q${i}">
        <div class="box box1"> 
        <img id="questionImg${i}" name="questionImg" src="${obj[`question${i}`].ImgUrl}">  
        </div>
        <textarea class="form-control answer" disabled name="Qtitle" id="Qtitle" cols="30" rows="2">${obj[`question${i}`].title}</textarea>
        <textarea class="form-control answer" disabled name="answer1" cols="30" rows="2">${obj[`question${i}`].answer1}</textarea>
        <textarea class="form-control answer" disabled name="answer2" cols="30" rows="2">${obj[`question${i}`].answer2}</textarea>
        <textarea class="form-control answer" disabled name="answer3" cols="30" rows="2">${obj[`question${i}`].answer3}</textarea>
        <textarea class="form-control answer" disabled name="answer4" cols="30" rows="2">${obj[`question${i}`].answer4}</textarea>
        <input type="number" name="rightanswer" disabled value="${obj[`question${i}`].ranswer}" class="rightanswer">
        <textarea class="form-control answer"  style="display: none;" disabled name="Explain" id="Explain" cols="30" rows="2">${obj[`question${i}`].Explain}</textarea>
        <div class="form-buttons">
        <button type="button" class="update" id="${i}" onclick="module.GetIDToUpdate(this.id)"><i class="fa-solid fa-pen"></i></button>
        <button type="button" class="save" disabled id="saveUpdates${i}" onclick="module.saveUpdateValues()" >save</button>
        </div>
        </form>
        `;
      }
      
    }
  })
  
})

saveNewUpdates.addEventListener('click',()=>{
  update(ref(db, "BioDiva/" + "Quiezs/"+`${Grade.value}/` +`${sel.value}/`), {
    Questions : obj,
    statusOfQuiz : statusOfQuiz.value
  }).then(() => {
    saveNewUpdates.innerHTML= " تم الحفط"
    showDataAdded.innerHTML=""
    collectData.setAttribute("disabeld",true)
    statusOfQuiz.setAttribute("disabled",true)
  }) 
})

// ==== END Quiz Data =====//
const uploadAllDataBtn = document.getElementById("uploadAllDataBtn");
uploadAllDataBtn.onclick = () => {
  uploadAllDataBtn.setAttribute("disabled",true);
  push(ref(db, "BioDiva/" + "Quiezs/" +`${Grade.value}/` ), {
      Questions :obj,
      QuizName:nameOfNewQuiz.value,
      QuestionsCount:tempcount,
      TimeofQuiz : +timeOfQuiz,
      KeyOfVideo : VideoKEY,
      statusOfQuiz : "Active",

  }).then((e) => {
    const dbRef = ref(db, "userData/" );
    onValue(
      dbRef,
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          if (childData.Grade == Grade.value) {
            update(ref(db, "userData/" + `${childKey}/`  +"QuiezsEnterdInfo/"+`/${e.key}/`), {
            quizEnter : false,
            quizInProgress: false,
            score:0,
            quizName : nameOfNewQuiz.value,
          }).then(() => {
  
          }) 
         
          }    
        });
        uploadAllDataBtn.innerHTML= " تم الرفع"
      },     
      {
        onlyOnce: true,
      }
    );

    
  });

};
console.log("-NP3SG_f3T4XF-ITF6k6")



// ======================================== FOR DESIGN =====================================//

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

// ======================================== LOGOUT =====================================//





const beforeUnloadListener = (event) => {
  event.preventDefault();
  return (event.returnValue = "Are you sure you want to exit?");
};


onAuthStateChanged(auth, (user) => {
  if (user) {
    const dbRef = ref(db);
    get(child(dbRef, "userData/" + user.uid))
    .then((snapshot) => {
      if (snapshot.exists()) {
        document.getElementById("userName").innerHTML = snapshot.val().name;

        let stat =  snapshot.val().status
          if(stat!="Teacher" || stat == undefined ) {
            window.location.href="../login.html"
          }
      }

      })

      // setTimeout(getAverage,3000)
 } else {
  window.location.href="../login.html"
 }
});

