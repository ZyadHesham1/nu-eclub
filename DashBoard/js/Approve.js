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
const dbRef = ref(db);
let AssistantWith;
let subjectSelcted;

const userName = document.getElementById("userName");
let Grade = document.getElementById("Grade");
let tbody = document.getElementById("tbody");
// =================== FOR DESGIN ============= //
const themeToggler = document.querySelector(".theme-toggler");

document.body.classList.toggle("dark-theme-variables");

themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});
// =================== END DESGIN ============= //

// =================== Chart  ============= //

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

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("tbody");
  switching = true;
  /*Make a loop that will continue until
    no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
      first, which contains table headers):*/
    for (i = 1; i < rows.length - 1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
        one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[4];
      y = rows[i + 1].getElementsByTagName("TD")[4];
      //check if the two rows should switch place:
      if (Number(x.innerHTML) < Number(y.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function Settrteb() {
  let tr = tbody.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    let tr1 = tbody.getElementsByTagName("tr")[i];
    tr1.getElementsByTagName("td")[0].innerHTML = i + 1;
  }
}

/////////////// start search ////////////////
let searchBar = document.getElementById("searchBar");
let ts = tbody.getElementsByTagName("tr");

function searchTabel(searchProperty) {
  let filter = searchBar.value;
  console.log("Dad");
  let found;
  for (let i = 0; i < ts.length; i++) {
    let td = ts[i].getElementsByClassName(searchProperty);

    for (let j = 0; j < td.length; j++) {
      if (td[j].innerHTML.indexOf(filter) > -1) {
        found = true;
      }
    }
    if (found) {
      ts[i].style.display = "";
      found = false;
    } else {
      ts[i].style.display = "none";
    }
  }
}


function searchBy() {
  searchBar.onkeyup = () => {
    if (searchBar.value == "") {
      for (let i = 0; i < ts.length; i++) {
        ts[i].style.display = "";
      }
    }
    searchTabel(document.getElementById("searchBy").value);
  };
  searchBar.setAttribute("placeholder",document.getElementById("searchBy").value)
}

document.getElementById("searchBy").onchange = (e=>{
  searchBy()
})
searchBy()

// ===================== GetUserDataByCode====================== //
function GetUserDataByCode(id) {
  let userID = id.slice(1);
  let codetemp;
  let statusOfSubscripeModal = document.getElementById("statusOfSubscripe");
  let ModalUserName = document.getElementById("ModalUserName");
  let ModalEmail = document.getElementById("ModalEmail");
  let ModalUserphone = document.getElementById("ModalUserphone");
  let ModalParentUserphone = document.getElementById("ModalParentUserphone");
  let ModalUserWhatsapp = document.getElementById("ModalUserWhatsapp");
  let ModalUserGov = document.getElementById("ModalUserGov");
  let ModalUserMarkez = document.getElementById("ModalUserMarkez");
  let ModalUserSchool = document.getElementById("ModalUserSchool");
  let PASSWORD =document.getElementById("PASSWORD")
  let place =document.getElementById("place")
  get(child(dbRef, "userData/" + userID)).then((snapshot) => {
    ModalUserName.value = snapshot.val().name;
    ModalEmail.innerHTML = snapshot.val().Email;
    ModalUserphone.value = snapshot.val().phone;
    ModalParentUserphone.value = snapshot.val().parentPhone;
    ModalUserWhatsapp.value = snapshot.val().WhatsApp;
    ModalUserGov.value = snapshot.val().government;
    ModalUserMarkez.value = snapshot.val().Markez;
    ModalUserSchool.value = snapshot.val().scoolName;
    PASSWORD.innerHTML = snapshot.val().password
    codetemp = snapshot.val().code;
    
    if(snapshot.val().place=="online") {
      console.log("done1")
      place.innerHTML = "اونلاين"
    }else if(snapshot.val().place=="center") {
      console.log("done2")

      place.innerHTML = "سنتر"
    }else{

      place.innerHTML = "استضافه"
    }

    if (snapshot.val().subscripeStatus) {
      statusOfSubscripeModal.value = "active";
    } else {
      statusOfSubscripeModal.value = "notactice";
    }
    
  });
  document.getElementById("Save").onclick = () => {
    update(ref(db, "userData/" + userID), {
      name: ModalUserName.value,
      phone: ModalUserphone.value,
      parentPhone: ModalParentUserphone.value,
      WhatsApp: ModalUserWhatsapp.value,
      government: ModalUserGov.value,
      Markez: ModalUserMarkez.value,
      scoolName: ModalUserSchool.value,
    }).then(() => {
      document.getElementById(`N${codetemp}`).innerHTML = ModalUserName.value;
    });
  };

  // ====================== Change STATUS =========== //
  statusOfSubscripeModal.onchange = () => {
    if (statusOfSubscripeModal.value == "active") {
      update(ref(db, "userData/" + userID), {
        subscripeStatus: true,
      }).then(() => {
        get(child(dbRef, "userData/" + userID)).then((snapshot) => {
          document.getElementById(`${snapshot.val().code}`).innerHTML = "مفعل";
          document
            .getElementById(`${snapshot.val().code}`)
            .classList.add("success");
          document
            .getElementById(`${snapshot.val().code}`)
            .classList.remove("danger");
        });
        console.log("data updated");
      });
    } else {
      update(ref(db, "userData/" + userID), {
        subscripeStatus: false,
      }).then(() => {
        get(child(dbRef, "userData/" + userID)).then((snapshot) => {
          document.getElementById(`${snapshot.val().code}`).innerHTML = "متوقف";
          document
            .getElementById(`${snapshot.val().code}`)
            .classList.add("danger");
          document
            .getElementById(`${snapshot.val().code}`)
            .classList.remove("success");
        });
        console.log("data updated");
      });
    }
  };

  // ====================== =========== //

  // plusToBouns.onclick = ()=>{

  // }
  // minusToBouns.onclick = ()=>{
  //     update(
  //         ref(
  //           db, "userData/" + userID
  //         ),
  //         {
  //          totalBonus : bounsTemp - +bounsInput.value
  //         }
  //       ).then(() => {
  //         console.log("data updated");
  //       });
  // }
}
module.GetUserDataByCode = GetUserDataByCode;

function GetUserChartDataByCode(id) {
  let userID = id.slice(1);
  console.log(userID);
  let Grade;
  let SubscripeWith;

  get(child(dbRef, "userData/" + userID)).then((snapshot) => {
    if (snapshot.exists()) {
      Grade = snapshot.val().Grade;
      SubscripeWith = snapshot.val().SubscripeWith;

      let arr2 = [];
      const dbRef3 = ref(
        db,
        "userData/" + userID + `/${Grade}/` + "scores/" + `${subjectSelcted}`
      );
      onValue(
        dbRef3,
        (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();

            console.log(childKey);

            arr2.push(childData.score);
            console.log(arr2);

            myChart.data.datasets[0].data = arr2;
            myChart.update();
          });
        },
        {
          onlyOnce: true,
        }
      );

      // ========= get names of EXMAS ========//
      let arr = [];
      const dbRef2 = ref(
        db,
        `${SubscripeWith}/` +
          `${Grade}/` +
          "QuizesSubject/" +
          `${subjectSelcted}/` +
          "QuizesData"
      );
      onValue(
        dbRef2,
        (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();

            console.log(childData.Time, childKey);

            arr.push(childData.Name);
            console.log(arr);
            myChart.data.labels = arr;
            myChart.update();
            console.log(myChart);
          });
        },
        {
          onlyOnce: true,
        }
      );
      // ========= END ========//
    }
  });
}
module.GetUserChartDataByCode = GetUserChartDataByCode;

// =====================END GetUserDataByCode ====================== //

// ================= Start Convert TabelToSheet ================= //
let grade 
let newTabel =document.getElementById("convetToexcel")

function ExportToExcel(type, fn,Grade) {


  let elt = document.getElementById('convetToexcel');
  let wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
  return XLSX.writeFile(wb, `Mystudent${grade}.xlsx`);


}
module.convertTabelToExcelSheet=ExportToExcel

document.getElementById("toExcel").addEventListener('click',async()=>{
  ExportToExcel('xlsx',"بينات الطلاب",grade)
})
// ================= END Convert TabelToSheet ================= //




// ====================== Change STATUS =========== //

// ====================== =========== //
const place = document.getElementById("Splace");
onAuthStateChanged(auth, (user) => {
  if (user) {
    function onchange1() {
      document.getElementById("preloader").style.display="inline"

      tbody.innerHTML = "";
      place.innerHTML =`
      <option >اختر المكان</option>
      <option value="online">اونلاين</option>
      <option value="center">سنتر</option>
      <option value="hosting">استضافه</option>
      `
      newTabel.innerHTML = `
      <th style="padding-left: 20px;">اسم الطالب</th>
      <th style="padding-left: 20px;">كود الطالب</th>
      <th style="padding-left: 20px;"> رقم هاتف الطالب</th>
      <th style="padding-left: 20px;">رقم هاتف ولي الامر</th>
      <th style="padding-left: 20px;"> whatsApp</th>
      <th style="padding-left: 20px;">المحافظه </th>
      <th style="padding-left: 20px;"> المركز</th>
      <th style="padding-left: 20px;"> اسم المدرسه</th>
    
      `
      grade = Grade.value;
      let stat;  
      let teacherName = document.getElementById("Tname");
      get(child(dbRef, "userData/" + user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          AssistantWith = "Marina";
          subjectSelcted = "Bio";
          stat = snapshot.val().status   
          teacherName.innerHTML = snapshot.val().name;
          if (stat != "Teacher" || stat == undefined) {
            window.location.href = "../login.html";
          }
          const dbRef = ref(db, "userData/");
          onValue(
            dbRef,
            (snapshot) => {
              snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                let stat;
                let clas;
                if (grade == childData.Grade) {
                  if (childData.subscripeStatus) {
                    stat = "مفعل";
                    clas = "success";
                  } else {
                    stat = "غير مفعل";
                    clas = "danger";
                  }
                  if (childData.SubscripeWith == AssistantWith) {
                    tbody.innerHTML += `
                          <tr>
                              <td></td>
                              <td id="N${childData.code}" style="line-height: 20px;"><span ><i class="fa-solid "></i></span>${childData.name}</td>
                              <td id="code" class="Code">${childData.code}</td>
                              <td  class="phone" style  = "display:none;">${childData.phone}</td>
                              <td  class="name" style  = "display:none;">${childData.name}</td>
                              <td  class="whatsapp" style  = "display:none;">${childData.WhatsApp}</td>
                              <td  class="parentPhone" style  = "display:none;">${childData.parentPhone}</td>
                              <td><h2 class="${clas}" id="${childData.code}">${stat}</h2></td>
                              <td class="enter"><button class="primary"  id="M${childKey}" onclick="module.GetUserDataByCode(this.id)" data-bs-toggle="modal" data-bs-target="#exampleModal">عرض البيانات<i class="fa-solid fa-pen-to-square me-3"></i></button> </td>
                          </tr>
                        `;

                        newTabel.innerHTML += `
                        <tr>
                            <td  style="line-height: 20px;"><span ><i class="fa-solid "></i></span>${childData.name}</td>
                            <td class="Code">${childData.code}</td>
                            <td class="Code">${childData.phone}</td>
                            <td class="Code">${childData.parentPhone}</td>
                            <td class="Code">${childData.WhatsApp}</td>
                            <td class="Code">${childData.government}</td>
                            <td class="Code">${childData.Markez}</td>
                            <td class="Code">${childData.scoolName}</td>
                        </tr>
                      `;
                  }
                }
                setTimeout(sortTable, 700);
                setTimeout(Settrteb, 1500);
              });
              document.getElementById("preloader").style.display="none"
            },
            {
              onlyOnce: true,
            }
          );
        }
      });
    }
    function onchange2(){
      document.getElementById("preloader").style.display="inline"

      tbody.innerHTML = "";
      newTabel.innerHTML = `
      <th style="padding-left: 20px;">اسم الطالب</th>
      <th style="padding-left: 20px;">كود الطالب</th>
      <th style="padding-left: 20px;"> رقم هاتف الطالب</th>
      <th style="padding-left: 20px;">رقم هاتف ولي الامر</th>
      <th style="padding-left: 20px;"> whatsApp</th>
      <th style="padding-left: 20px;">المحافظه </th>
      <th style="padding-left: 20px;"> المركز</th>
      <th style="padding-left: 20px;"> اسم المدرسه</th>
    
      `
      grade = Grade.value;
      let stat;  
      let teacherName = document.getElementById("Tname");
      get(child(dbRef, "userData/" + user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          AssistantWith = "Marina";
          subjectSelcted = "Bio";
          stat = snapshot.val().status   
          teacherName.innerHTML = snapshot.val().name;
          if (stat != "Teacher" || stat == undefined) {
            window.location.href = "../login.html";
          }
          const dbRef = ref(db, "userData/");
          onValue(
            dbRef,
            (snapshot) => {
              snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                let stat;
                let clas;
                if (grade == childData.Grade &&place.value==childData.place) {
                  if (childData.subscripeStatus) {
                    stat = "مفعل";
                    clas = "success";
                  } else {
                    stat = "غير مفعل";
                    clas = "danger";
                  }
                  if (childData.SubscripeWith == AssistantWith) {
                    tbody.innerHTML += `
                          <tr>
                              <td></td>
                              <td id="N${childData.code}" style="line-height: 20px;"><span ><i class="fa-solid "></i></span>${childData.name}</td>
                              <td id="code" class="Code">${childData.code}</td>
                              <td  class="phone" style  = "display:none;">${childData.phone}</td>
                              <td  class="name" style  = "display:none;">${childData.name}</td>
                              <td  class="whatsapp" style  = "display:none;">${childData.WhatsApp}</td>
                              <td  class="parentPhone" style  = "display:none;">${childData.parentPhone}</td>
                              <td><h2 class="${clas}" id="${childData.code}">${stat}</h2></td>
                              <td class="enter"><button class="primary"  id="M${childKey}" onclick="module.GetUserDataByCode(this.id)" data-bs-toggle="modal" data-bs-target="#exampleModal">عرض البيانات<i class="fa-solid fa-pen-to-square me-3"></i></button> </td>
                          </tr>
                        `;


                        newTabel.innerHTML += `
                        <tr>
                            <td  style="line-height: 20px;"><span ><i class="fa-solid "></i></span>${childData.name}</td>
                            <td class="Code">${childData.code}</td>
                            <td class="Code">${childData.phone}</td>
                            <td class="Code">${childData.parentPhone}</td>
                            <td class="Code">${childData.WhatsApp}</td>
                            <td class="Code">${childData.government}</td>
                            <td class="Code">${childData.Markez}</td>
                            <td class="Code">${childData.scoolName}</td>
                        </tr>
                      `;

                  }
                }
                setTimeout(sortTable, 700);
                setTimeout(Settrteb, 1500);
              });
              document.getElementById("preloader").style.display="none"
            },
            {
              onlyOnce: true,
            }
          );
        }
      });
    }
    Grade.onchange = onchange1;
    place.onchange = onchange2;
    onchange1();
  } else {
    window.location.href = "../login.html";
  }
});
