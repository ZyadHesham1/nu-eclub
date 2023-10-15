$(function () {

    $(window).on('scroll', function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 20) {
            $(".navbar-area").removeClass("sticky");
        } else {
            $(".navbar-area").addClass("sticky")
        }
    });

});
var wow = new WOW();
wow.init();

document.getElementById("registration").style.display = "none";

function revealContent() {
    var x = document.getElementById("registration");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";

    }
  }

  function changeTitle() {
    var button = document.getElementById("joinButton");
    if (button.textContent === "Wanna Join?") {
      button.textContent = "Fill out your Info below!";
    } else {
      button.textContent = "Wanna Join?";
    }
}

const form = document.querySelector("form");
const nextBtn = form.querySelector(".next-btn");
const backBtn = form.querySelector(".back-btn");
const allInput = form.querySelector(".registration input");

// Hide the second form.
document.querySelector(".form-group2").style.display = "none";

nextBtn.addEventListener("click", () => {
  // Loop through all input fields and check if they are empty.
  allInput.forEach(input => {
    if (input.value === "") {
      // If any input field is empty, prevent the form from submitting.
      form.classList.remove("secActive");
      alert("Please fill in all required fields.");
      return;
    }
  });

  // If all input fields are filled in, display the next section of the form.
  form.classList.add("secActive");

  // Display the second form.
  document.querySelector(".form-group2").style.display = "block";
});

backBtn.addEventListener("click", () => {
  // Display the previous section of the form.
  form.classList.remove("secActive");

  // Hide the second form.
  document.querySelector(".form-group2").style.display = "none";
});

nextBtn.addEventListener("click", () => {
  console.log("Next button clicked!");
});