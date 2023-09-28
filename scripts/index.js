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
