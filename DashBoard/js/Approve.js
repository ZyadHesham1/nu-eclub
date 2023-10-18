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

  let ID = id.slice(1);
 
  let ModalUserName = document.getElementById("ModalUserName");
  let ModalEmail = document.getElementById("ModalEmail");
  let PhoneNumber = document.getElementById("PhoneNumber");
  let NuID = document.getElementById("NuID");
  let School = document.getElementById("School");
  let Major = document.getElementById("Major");
  let ClassLevel = document.getElementById("ClassLevel");
  let YesOrNO = document.getElementById("YesOrNO");
  let Committee =document.getElementById("Committee")
  let statusOfRequest = document.getElementById("statusOfRequest");
  let Comments = document.getElementById('Comments')
  get(child(dbRef, "UserRequests/"+'General/' +'Form1/'  + ID)).then((snapshot) => {
    ModalUserName.value = snapshot.val().FullName;
    ModalEmail.innerHTML = snapshot.val().NuEmail ;
    PhoneNumber.value = snapshot.val().PhoneNumber;
    NuID.value = snapshot.val().NuID;
    School.value = snapshot.val().School;
    Major.value = snapshot.val().Major;
    ClassLevel.value = snapshot.val().classLevel;
    YesOrNO.value = snapshot.val().yesOrNo ;
    Committee.value = snapshot.val().Committee;
    Comments.value = snapshot.val().Comments
    statusOfRequest.value = snapshot.val().status ? "Checked" : "UnChecked";

    
  });

  document.getElementById("Save").onclick = () => {
    update(ref(db,"UserRequests/"+'General/' +'Form1/'  + ID), {
      FullName: ModalUserName.value ,
      NuEmail: ModalEmail.innerHTML,
      PhoneNumber: PhoneNumber.value,
      NuID: NuID.value,
      School: School.value,
      Major: Major.value,
      yesOrNo : YesOrNO.value,
      classLevel: ClassLevel.value,
      Committee: Committee.value,
      Comments : Comments.value,
      status: statusOfRequest.value== "Checked"?true : false ,
    }).then(() => {



      });
  };

  // ====================== Change STATUS =========== //
  statusOfRequest.onchange = () => {
    if (statusOfRequest.value == "Checked") {
      update(ref(db, "UserRequests/"+'General/' +'Form1/' + ID), {
        status: true,
      }).then(() => {
        get(child(dbRef, "UserRequests/"+'General/' +'Form1/'  + ID)).then((snapshot) => {
          document.getElementById(`${snapshot.val().NuID}`).innerHTML = "Checked";
          document
            .getElementById(`${snapshot.val().NuID}`)
            .classList.add("success");
          document
            .getElementById(`${snapshot.val().NuID}`)
            .classList.remove("danger");
        });
        console.log("data updated");
      });
    } else {
      update(ref(db,"UserRequests/"+'General/' +'Form1/' + ID), {
        status: false,
      }).then(() => {
        get(child(dbRef, "UserRequests/"+'General/' +'Form1/'  + ID)).then((snapshot) => {
          document.getElementById(`${snapshot.val().NuID}`).innerHTML = "Un Checked";
          document
            .getElementById(`${snapshot.val().NuID}`)
            .classList.add("danger");
          document
            .getElementById(`${snapshot.val().NuID}`)
            .classList.remove("success");
        });
        console.log("data updated");
      });
    }

  };


}
module.GetUserDataByCode = GetUserDataByCode;


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
onAuthStateChanged(auth, (user) => {
  if (user) {

      // document.getElementById("preloader").style.display="inline"
      tbody.innerHTML = "";
 
      newTabel.innerHTML = `
      <th style="padding-left: 20px;"> Full Name </th>
      <th style="padding-left: 20px;"> NU Email</th>
      <th style="padding-left: 20px;"> Phone Number   </th>
      <th style="padding-left: 20px;">  NU ID </th>
      <th style="padding-left: 20px;">School </th>
      <th style="padding-left: 20px;"> Class Level</th>
      <th style="padding-left: 20px;">  Committee</th>
      <th style="padding-left: 20px;">  Comments</th>
      `
    
          const dbRef = ref(db,"UserRequests/"+'General/' +'Form1/' );
          onValue(
            dbRef,
            (snapshot) => {
              snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                let stat;
                let clas;
                  if (childData.status) {
                    stat = "checked";
                    clas = "success";
                  } else {
                    stat = "Un Checked";
                    clas = "danger";
                  }

                    tbody.innerHTML += `
                          <tr>
                              <td></td>
                              <td id="N${childData.NuID}" class="name" style="line-height: 20px;"><span ><i class="fa-solid "></i></span>${childData.FullName}</td>
                              <td id="code" class="NuID">${childData.NuID}</td>
                              <td  class="Phone" style = "display:none;">${childData.PhoneNumber}</td>
                              <td><h2 class="${clas}" id="${childData.NuID}">${stat}</h2></td>
                              <td class="enter"><button class="primary"  id="M${childKey}" onclick="module.GetUserDataByCode(this.id)" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Data <i class="fa-solid fa-pen-to-square me-3"></i></button> </td>
                          </tr>
                        `;

                        newTabel.innerHTML += `
                        <tr>
                            <td  style="line-height: 20px;"><span ><i class="fa-solid "></i></span>${childData.FullName}</td>
                            <td class="Code">${childData.NuEmail}</td>
                            <td class="Code">${childData.PhoneNumber}</td>
                            <td class="Code">${childData.NuID}</td>
                            <td class="Code">${childData.School}</td>
                            <td class="Code">${childData.classLevel}</td>
                            <td class="Code">${childData.Markez}</td>
                            <td class="Code">${childData.Committee}</td>
                            <td class="Code">${childData.Comments}</td>
                        </tr>
                      `;

        
    
               
              });
              setTimeout(sortTable, 500);
              setTimeout(Settrteb, 500);
              // document.getElementById("preloader").style.display="none"
            },
            {
              onlyOnce: true,
            }
          );
    
     
  
  } else {
    window.location.href = "../login.html";
  }
});
