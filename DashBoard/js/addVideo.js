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
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";

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
const dbRef = ref(db);

const userName = document.getElementById("userName");
const statusOfVideo = document.getElementById("statusOfVideo");
const typeOfVideo = document.getElementById("typeOfVideo");
const Grade = document.getElementById("Grade");
const pemstionToshow = document.getElementById("pemstionToshow");
const withExam = document.getElementById("withExam");
let statusOfVideoTemp;
const videoPrice = document.getElementById("videoPrice");
const videoTitle = document.getElementById("videoTitle");

let Teacher;
let AssistantWith;
let subjectSelcted;
let videoCount;

// =================== FOR DESGIN ============= //
const sdieMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");
const modalUserName = document.getElementById("ModalUserName");
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
// ================= onChanegeFunctions ================= //
function onChangeStatusOfVideo() {
  statusOfVideoTemp = statusOfVideo.value;
  if (statusOfVideoTemp == "Pay") {
    videoPrice.removeAttribute("disabled");
  } else {
    videoPrice.value = 0;
    videoPrice.setAttribute("disabled", true);
  }
}
videoPrice.value = 0;
statusOfVideo.onchange = onChangeStatusOfVideo;

// ================= END onChanegeFunctions ================= //

// ================ uploadPhoto ============================ //


let imgUrl;
let videoUrl;

let isConfigUpdate = false;

async function uploadToS3BucketPHOTO(stream, credential, cd) {
    try {
      if (!window.AWS) {
        return;
      }
      if (!isConfigUpdate) {
        window.AWS.config.update({ region: credential.region });
        isConfigUpdate = true;
      }
  
      let s3 = new window.AWS.S3({
        credentials: new window.AWS.Credentials({
          apiVersion: "latest",
          accessKeyId: credential.accressKeyId,
          secretAccessKey: credential.secretAccessKey,
          signatureVersion: credential.signatureVersion,
          region: credential.region,
          Bucket: credential.Bucket,
        }),
      });
  
      const contentType = document.getElementById("selbtnPhoto").files[0];
      const params = {
        Bucket: credential.Bucket,
        Key: contentType.name, // name for the bucket file
        ContentType: contentType.type,
        Body: stream,
      };
      const options = { expiresIn: 0 }; // set expiresIn to 0 to make the URL non-expiring
  
      let uploadItem = await s3.upload(params).on("httpUploadProgress", function (progress) {
        console.log("progress=>", progress);
  
      cd(getUploadingProgressPhoto(progress.loaded, progress.total))
      }).promise();
  
      // generate a public URL for the uploaded file
      const url = await s3.getSignedUrlPromise("getObject", {
        Bucket: credential.Bucket,
        Key: contentType.name, // name for the bucket file
        Expires: 73072000, // set Expires to 0 to make the URL non-expiring
      });
  

      console.log("public URL=>", url);
      imgUrl = url
      
      document.getElementById("BtnPhotoUpload").innerHTML="تم الرفع"
      document.getElementById("BTNvideoUpload").removeAttribute("disabled");
      return uploadItem;
    } catch (error) {
     alert(error);
    }
  }
  





async function uploadPhoto() {
  document.getElementById("BtnPhotoUpload").setAttribute("disabled",true);
      let credentialRequest = {
          accressKeyId: 'AKIATGFSLNDKBRGTP6GY',
          secretAccessKey: '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',
          signatureVersion: 'v4',
          region: 'us-east-1',
          Bucket: 'biodiva'
      };
      let mediaStreamRequest = getFile(document.getElementById("selbtnPhoto").files[0]);
      const [mediaStream] = await Promise.all([mediaStreamRequest]);
      const uploadItem = await uploadToS3BucketPHOTO(mediaStream, credentialRequest, (progress) => {
        console.log(progress);
      });
}







    
function getUploadingProgressPhoto(uploadSize, totalSize) {
        let uploadProgress = (uploadSize / totalSize) * 100;
        document.getElementById("BtnPhotoUpload").innerHTML =uploadProgress.toFixed(2)
        return Number(uploadProgress.toFixed(2));
}




async function uploadToS3BucketVideo(stream, credential, cd) {
  try {
    if (!window.AWS) {
      return;
    }
    if (!isConfigUpdate) {
      window.AWS.config.update({ region: credential.region });
      isConfigUpdate = true;
    }

    let s3 = new window.AWS.S3({
      credentials: new window.AWS.Credentials({
        apiVersion: "latest",
        accessKeyId: credential.accressKeyId,
        secretAccessKey: credential.secretAccessKey,
        signatureVersion: credential.signatureVersion,
        region: credential.region,
        Bucket: credential.Bucket,
        httpOptions: {
          timeout: 86400000 // 1 day in milliseconds
        }
      }),
    });

    const contentType = document.getElementById("selbtnVideo").files[0];
    const params = {
      Bucket: credential.Bucket,
      Key: contentType.name, // name for the bucket file
      ContentType: contentType.type,
      Body: stream,
    };
    const options = { expiresIn: 0 }; // set expiresIn to 0 to make the URL non-expiring

    let uploadItem = await s3.upload(params).on("httpUploadProgress", function (progress) {
      console.log("progress=>", progress);

    cd(getUploadingProgressVideo(progress.loaded, progress.total))
    }).promise();

    // generate a public URL for the uploaded file
    const url = await s3.getSignedUrlPromise("getObject", {
      Bucket: credential.Bucket,
      Key: contentType.name, // name for the bucket file
      Expires: 73072000, // set Expires to 0 to make the URL non-expiring
    });


    console.log("public URL=>", url);
    videoUrl = url
    uploadAllDataBtn.removeAttribute("disabled");
    document.getElementById("BTNvideoUpload").innerHTML="تم الرفع"
    return uploadItem;
  } catch (error) {
   alert(error);
  }
}



  async function uploadVideo() {
    let credentialRequest = {
        accressKeyId: 'AKIATGFSLNDKBRGTP6GY',
        secretAccessKey: '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',
        signatureVersion: 'v4',
        region: 'us-east-1',
        Bucket: 'biodiva'
    };
    let mediaStreamRequest = getFile(document.getElementById("selbtnVideo").files[0]);
    const [mediaStream] = await Promise.all([mediaStreamRequest]);
    const uploadItem = await uploadToS3BucketVideo(mediaStream, credentialRequest, (progress) => {
      console.log(progress);
    });
}
  
function getUploadingProgressVideo(uploadSize, totalSize) {
  let uploadProgress = (uploadSize / totalSize) * 100;
  document.getElementById("BTNvideoUpload").innerHTML =uploadProgress.toFixed(2)
  return Number(uploadProgress.toFixed(0));
}

async function getFile(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target.result);
        };
        reader.onerror = (err) => {
            reject(false);
        };
        reader.readAsArrayBuffer(file);
    });
};
module.uploadVideo =uploadVideo

module.uploadPhoto =uploadPhoto






















// const editPhotoBtn = document.getElementById("editPhotoBtn");
// let files = [];
// let reader = new FileReader();

// var SelBtn = document.getElementById("selbtn");
// var UpBtn = document.getElementById("upbtn");

// var input = document.createElement("input");
// input.type = "file";

// input.onchange = (e) => {
//   files = e.target.files;
//   reader.readAsDataURL(files[0]);
// };

// reader.onload = function () {
//   SelBtn.remove();
//   editPhotoBtn.style.display = "inline";
//   document.getElementById("imgUploaded").classList.remove("d-none");
//   document.getElementById("imgUploaded").src = reader.result;
//   uploadphoto();
// };

// SelBtn.onclick = function () {
//   input.click();
// };
// editPhotoBtn.onclick = function () {
//   input.click();
// };

// async function uploadphoto() {
//   var imgToUpload = files[0];

//   const metaData = {
//     contentType: imgToUpload.type,
//   };

//   const storage = getStorage();
//   console.log(imgToUpload);
//   const stroageRef = sRef(
//     storage,
//     "BioDiva/" + "thumnails/" + files[0].name
//   );
//   const UploadTask = uploadBytesResumable(stroageRef, imgToUpload, metaData);
//   UploadTask.on(
//     "state-changed",
//     (snapshot) => {
//       var progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       upprogresstext.innerHTML = progess.toFixed(2) + "%";
//     },
//     (error) => {
//       console.log(error)
      
//     },
//     () => {
//       getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
//         imgUrl = downloadURL;
//       });
//     }
//   );
// }
// // ================ end ============================ //

// // ================ uploadVideo ============================ //


// async function uploadVideo() {

  
//   var SelBtnVideo = document.getElementById("selbtnVideo").files[0];
//   console.log(SelBtnVideo)
//   let upprogresstext = document.getElementById("upprogresstext");
//   // var videoToUpload = fileVideo[0];

//   const metaData = {
//     contentType: SelBtnVideo.type,
//   };

//   const storage = getStorage();
//   const stroageRef = sRef(
//     storage,
//     "BioDiva/" + "Video/" + SelBtnVideo.name
//   );
//   const UploadTask = uploadBytesResumable(stroageRef, SelBtnVideo, metaData);
//   UploadTask.on(
//     "state-changed",
//     (snapshot) => {
//       var progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       upprogresstext.innerHTML = progess.toFixed(2) + "%";
//       // proglab.value = progess.toFixed(2)
//     },
//     (error) => {
//       alert("error");
//     },
//     () => {
//       getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
//         videoUrl = downloadURL;
//         uploadAllDataBtn.removeAttribute("disabled");
//       });
//     }
//   );
// }
// module.uploadVideo = uploadVideo;

const beforeUnloadListener = (event) => {
  event.preventDefault();

  return (event.returnValue = "هل تود مغادره الامتحان");
};
addEventListener("beforeunload", beforeUnloadListener, { capture: true });

document.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    e.preventDefault();
  }
});

// ================ end ============================ //

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
    
  
  


// ============= addshortQuiz Data ============== // 

document.getElementById("addShortQuizBtn").addEventListener('click',()=>{
  document.getElementById("addShortQuizSection").style.display="inline"
  document.getElementById("addShortQuizSection").scrollIntoView({ behavior: 'smooth' })
})


// ===== start add quiz ===== //
const addShorQuizForm  = document.getElementById("add-shor-quiz-form")
const addoneQuestionBtn = document.getElementById("add")
const btnstartAddQuiz = document.getElementById("btnstartAddQuiz")
const questionimg = document.getElementById("questionimg")
const showDataAdded = document.getElementById("show-data-Added")
const uploadQuestionPhotoBtn = document.getElementById("upload-questionPhoto-btn")
let URLQuestionPhoto =""; 
let questionscount = 0;
let selQuestionPhotoBtn = document.getElementById("sel-questionPhoto-btn")
let obj = new Object() 
let tempcount = 0;
let timeOfQuiz = 0;
btnstartAddQuiz.addEventListener('click',()=>{
  questionscount = + document.getElementById('Qcount').value;
  tempcount = questionscount
  timeOfQuiz = document.getElementById("timeofquiz").value;
  selQuestionPhotoBtn.removeAttribute("disabled")
  addoneQuestionBtn.removeAttribute('disabled')
})  

document.getElementById("sel-questionPhoto-btn").onchange = (e)=>{
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
  const storage = getStorage();
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
    title: addShorQuizForm["Qtitle"].value,
    answer1: addShorQuizForm["answer1"].value,
    answer2: addShorQuizForm["answer2"].value,
    answer3: addShorQuizForm["answer3"].value,
    answer4: addShorQuizForm["answer4"].value,
    ranswer: +addShorQuizForm["ranswer"].value,
    Explain:addShorQuizForm["Explain"].value
  }
    addShorQuizForm["Qtitle"].value=""
    addShorQuizForm["answer1"].value=""
    addShorQuizForm["answer2"].value=""
    addShorQuizForm["answer3"].value=""
    addShorQuizForm["answer4"].value=""
    addShorQuizForm["ranswer"].value=""
    addShorQuizForm["Explain"].value=""
    questionimg.src=" "
    URLQuestionPhoto =""
    uploadQuestionPhotoBtn.innerHTML = "رفع صورة السؤال"
    review((tempcount-questionscount)+1)
    console.log(obj)
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
    ImgUrl:qForm[`questionImg${updateID}`].src,
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
      <button type="button" class="save" disabled id="saveUpdates${newQuestionNumber}" onclick="module.saveUpdateValues()" >save</button>
      </div>
      </form>
      `;
  }else{
    showDataAdded.innerHTML += `
    <form class="form-question-added" id="Q${newQuestionNumber}">
    <div class="box box1"> 
    <img id="questionImg${newQuestionNumber}" src="${obj[`question${newQuestionNumber}`].ImgUrl}">  
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




  

// ============= END addshortQuiz Data ============== // 

// ============= start Update Data  of video============== // 

let videosNames = document.getElementById("videos")
let OpenAfter = document.getElementById("OpenAfter")
let pemstionToshowInUpdate=document.getElementById("pemstionToshowInUpdate")
let UpdateDate = document.getElementById("updateData")
Grade.onchange =()=>{
  videosNames.removeAttribute("disabled")

  videosNames.innerHTML =` <option selected value="" >اختر اسم الفيديو</option>   `
  const dbRef = ref(db, "BioDiva/" +"videos/" +`${Grade.value}/` );
  onValue(
    dbRef,
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        videosNames.innerHTML+=`
        <option value="${childKey}" > ${childData.Title} </option>
        `
      });
    },     
    {
      onlyOnce: true,
    }
  );

  OpenAfter.innerHTML =`<option selected value="" > يفتح بعد </option> `
  onValue(
    dbRef,
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        OpenAfter.innerHTML+=`
        <option value="${childKey}" > ${childData.Title} </option>
        `
      });
    },     
    {
      onlyOnce: true,
    }
  );
}
videosNames.onchange = ()=>{
  pemstionToshowInUpdate.removeAttribute("disabled")
  UpdateDate.removeAttribute("disabled")
}

UpdateDate.addEventListener('click',()=>{
  update(ref(db, "BioDiva/" + "videos/" +`${Grade.value}/` +`${videosNames.value}/`), {
    pemstionToshow : pemstionToshowInUpdate.value,
  }).then(() => {
    UpdateDate.innerHTML="تم التعديل"
  })
})


// ============= END Update Data  of video============== // 
// ================ start Open يفتح بعد =========== //    

withExam.onchange = ()=>{
  if (withExam.value=="WithHw") {
    OpenAfter.removeAttribute("disabled")
  }else if(withExam.value=="WithExamaAndHw"){
    OpenAfter.removeAttribute("disabled")
  }else{
    OpenAfter.setAttribute("disabled",true)

  }
}




// ================ END Open يفتح بعد =========== //    
// ================ set data in firebase ========== //
const uploadAllDataBtn = document.getElementById("uploadAllDataBtn");
uploadAllDataBtn.onclick = () => {
  uploadAllDataBtn.setAttribute("disabled", true);
  push(ref(db, "BioDiva/" + "videos/" +`${Grade.value}/`), {
    Title: videoTitle.value,
    VideoUrl: "",
    imgUrl: "",
    Grade: Grade.value,
    withExam : withExam.value,
    openAfter : OpenAfter.value,
    pemstionToshow:pemstionToshow.value,
    statusOfVideo: statusOfVideo.value,
    typeOfVideo: typeOfVideo.value,
    Teacher: Teacher,
    priceOfVideo: videoPrice.value,
    VideoQuizData: {
      Questions :obj,
      QuestionsCount:tempcount,
      TimeofQuiz : +timeOfQuiz
    },
  }).then((e) => {
    const dbRef = ref(db, "userData/" );
    onValue(
      dbRef,
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          if (childData.Grade ==Grade.value) {
            if (withExam.value=="WithExam") {
              update(ref(db, "userData/" + `${childKey}/`  +"/VideoEnterdInfo"+`/${e.key}`), {
                isUserCanEnter : false,             
                ApproveUploadedHomeWork:false ,
                Attemps : 100,
                IsUserUploadPerviousHomeWork:true,
                HomeWorkIsUploaded : false,
            }) 
            }else if(withExam.value=="WithHw"){
              update(ref(db, "userData/" + `${childKey}/`  +"/VideoEnterdInfo"+`/${e.key}`), {
                isUserCanEnter : true,             
                ApproveUploadedHomeWork:false ,
                Attemps : 100,
                IsUserUploadPerviousHomeWork:false,
                HomeWorkIsUploaded : false,
            }) 
            update(ref(db, "userData/" + `${childKey}/`  +"/VideoEnterdInfo" +`/${OpenAfter.value}/`),{
              OpenVideoKey : e.key
            })
            } else if (withExam.value=="WithOutExamAndHW") {
              update(ref(db, "userData/" + `${childKey}/`  +"/VideoEnterdInfo"+`/${e.key}`), {
                isUserCanEnter : true,             
                ApproveUploadedHomeWork:false ,
                Attemps : 100,
                IsUserUploadPerviousHomeWork:true,
                HomeWorkIsUploaded : false,
            }) 
            }else if(withExam.value=="WithExamaAndHw"){
              update(ref(db, "userData/" + `${childKey}/`  +"/VideoEnterdInfo"+`/${e.key}`), {
                isUserCanEnter : false,             
                ApproveUploadedHomeWork:false ,
                Attemps : 100,
                IsUserUploadPerviousHomeWork:false,
                HomeWorkIsUploaded : false,
            }) 
            update(ref(db, "userData/" + `${childKey}/`  +"/VideoEnterdInfo" +`/${OpenAfter.value}/`),{
              OpenVideoKey : e.key
            })
            }
       
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

// ================ END========== //

onAuthStateChanged(auth, (user) => {
  if (user) {
    get(child(dbRef, "userData/" + user.uid)).then((snapshot) => {
      if (snapshot.exists()) {
        let stat = snapshot.val().status;
        userName.innerHTML = snapshot.val().name;
        AssistantWith = snapshot.val().AssistantWith;

        if (stat != "Teacher" || stat == undefined) {
          window.location.href = "../login.html";
        }
          Teacher = " دكتور / مارينا سامح ";
          subjectSelcted = "Bio";
       
      }
    });
  } else {
    window.location.href = "../login.html";
  }
});
