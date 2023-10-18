
const Form_Title_Input = document.getElementById("Form_Title_Input");

const Form_Title = document.getElementById("Form_Title");

const Form_detail_Input = document.getElementById('Form_detail_Input')

const Form_for_input = document.getElementById("Form_for_input")

const inputsAdded = document.getElementById("inputsAdded")

const typeOfInput = document.getElementById("typeOfInput")

const AddNewInput = document.getElementById('AddNewInput')

const mainForm =document.getElementById('Form')
Form_Title_Input.addEventListener('keyup',()=>{
    Form_Title.innerHTML =Form_Title_Input.value
})

const obj = {
    text : [],
    textArea : [],
    choice :[]
}

AddNewInput.addEventListener('click',()=>{
    let num = Math.floor((Math.random() * 4000) + 6000);

    if (typeOfInput.value == "text") {
        
        obj.text.push(num)

        inputsAdded.innerHTML += `
        <div class="inputText my-2" id="${num}">
        <input type="text" placeholder="Title Of the Text" class="form_input" id="Title${num}">
        <input type="text" placeholder="Example " class="form_input mt-1" id="Ex${num}">
        <select  id="R${num}" class="form_input mt-2">
            <option value="req" selected>Required</option>
            <option value="Notreq">NotRequired</option>
        </select>
        <div class="btns mt-2">
            <button class="update" id="T${num}" onclick="module.AddToTheMainForm(this.id)"><i class="fa-solid fa-pen"></i></button>
            <button class="deletes" id="D${num}"  onclick="module.removeToTheMainForm(this.id)"><i class="fa-solid fa-trash"></i></button>
         </div>
        </div>
        
        `

        mainForm.innerHTML+= `
        <div class="form-group" id="m${num}">
        <label for="mainFInput${num}"  id="mainFtitle${num}"></label>
        <input type="text" class="form-control"  id="mainFInput${num}" >
        </div>
      `

    }else if (typeOfInput.value == 'textArea') {
        obj.textArea.push(num)

        inputsAdded.innerHTML += `
        <div class="inputText my-2" id="${num}">
        <input type="text" placeholder="Title Of the Text Area" class="form_input" id="Title${num}">
        <input type="text" placeholder="Example " class="form_input mt-1" id="Ex${num}">

        <select  id="R${num}" class="form_input mt-2">
            <option value="req" selected>Required</option>
            <option value="Notreq">NotRequired</option>
        </select>
        <div class="btns mt-2">
            <button class="update" id="A${num}"  onclick="module.AddToTheMainForm(this.id)"><i class="fa-solid fa-pen"></i></button>
            <button class="deletes" id="D${num}"  onclick="module.removeToTheMainForm(this.id)" ><i class="fa-solid fa-trash"></i></button>
         </div>
        </div>
        `
        

        mainForm.innerHTML+= `
        <div class="form-group" id="m${num}">
        <label for="mainFInput${num}" id="mainFtitle${num}"></label>
        <textarea type="text" class="form-control" id="mainFInput${num}" ></textarea>
        </div>
       `
     
    }else if (typeOfInput.value == "Choice") {
        obj.choice.push(num)

        inputsAdded.innerHTML += ` 

        <div class="inputRadio my-2" id="${num}" >
        <input type="text" placeholder="Title Of the Choice" class="form_input" id="T${num}">
        <input type="number" placeholder="How Many Choices" class="form_input mt-2 w-50" id="NR${num}">
        
        <button class="AddNewInput w-25" id="AddRs${num}" onclick="module.addRadios(this.id)" >Add</button>
        <div class="groubRd" id="g${num}">

        </div>

        <select name="" id="Re${num}" class="form_input mt-2">
            <option value="req" selected>Required</option>
            <option value="Notreq">NotRequired</option>
        </select>
        <div class="btns mt-2">
            <button class="update" id="R${num}"  onclick="module.AddToTheMainForm(this.id)" ><i class="fa-solid fa-pen"></i></button>
            <button class="deletes" id="D${num}" onclick="module.removeToTheMainForm(this.id)"><i class="fa-solid fa-trash"></i></button>
        </div>
        </div>
        
        `
  

        mainForm.innerHTML+=

        `
                             
        <fieldset class="form-group" id="m${num}">
        <div class="row">
          <legend class="col-form-label col-sm-2 pt-0  w-25" id="mainFtitle${num}"></legend>
          <div class="col-sm-10" id="Rs${num}">

         
          </div>
        </div>
      </fieldset>
        
        
        `


    }

    typeOfInput.value ="choose"

})
//       <input type="text" placeholder="Choice 1" class="form_input my-1 w-50">

function addRadios(id) {

  console.log(id)
    let newId= id.slice(5)
    console.log(newId)
    document.getElementById(`g${newId}`).innerHTML = ""
    let nOfR = +document.getElementById(`NR${newId}`).value
    for (let i = 1; i <=nOfR; i++) {
      document.getElementById(`g${newId}`).innerHTML +=
      `
      <input type="text" placeholder="Choice${i}" class="form_input my-1 w-50" id="${i}R${newId}">

      `
  
    }


}
module.addRadios=addRadios

function AddToTheMainForm(id) {
    let FristCh = id[0]
    let newId= id.slice(1)
     if (FristCh == "T" ||FristCh == "A"  ) {
        document.getElementById(`mainFtitle${newId}`).innerHTML = document.getElementById(`Title${newId}`).value
        document.getElementById(`mainFtitle${newId}`).setAttribute('name',`${document.getElementById(`Title${newId}`).value}`) 
        document.getElementById(`mainFInput${newId}`).setAttribute('placeholder',`${document.getElementById(`Ex${newId}`).value}`)
        document.getElementById(`R${newId}`).value =="req" ? document.getElementById(`mainFInput${newId}`).setAttribute('required',true) : document.getElementById(`mainFInput${newId}`).removeAttribute('required')

     }else{
      document.getElementById(`Rs${newId}`).innerHTML =''
      document.getElementById(`mainFtitle${newId}`).innerHTML = document.getElementById(`T${newId}`).value
      let nOfR = +document.getElementById(`NR${newId}`).value
      for (let i =1; i <= nOfR; i++) {

        if ( document.getElementById(`Re${newId}`).value=="req") {
          
          document.getElementById(`Rs${newId}`).innerHTML+=
          `
          <div class="form-check">
          <input class="form-check-input" type="radio" name="${newId}Radios${i}" id="${newId}Radios${i}" value="${document.getElementById(`${i}R${newId}`).value}" required>
          <label class="form-check-label" for="${newId}Radios${i}">
           ${document.getElementById(`${i}R${newId}`).value}
          </label>
         </div>
   
          `

        }else{

          document.getElementById(`Rs${newId}`).innerHTML+=
          `
          <div class="form-check">
          <input class="form-check-input" type="radio" name="${newId}Radios${i}" id="${newId}Radios${i}" value="${document.getElementById(`${i}R${newId}`).value}" >
          <label class="form-check-label" for="${newId}Radios${i}">
           ${document.getElementById(`${i}R${newId}`).value}
          </label>
         </div>
   
          `
        }

      }
     }
     

    

}
module.AddToTheMainForm= AddToTheMainForm


function removeToTheMainForm(id) {
  console.log(id)
  let FristCh = id[0]
  let newId= id.slice(1)
  document.getElementById(`m${newId}`).remove()
  document.getElementById(`${newId}`).remove()

}
module.removeToTheMainForm= removeToTheMainForm
