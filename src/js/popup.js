var link = document.querySelector(".popup--button");
var popup = document.querySelector(".popup");
var blackout = document.querySelector(".blackout--none");
var sizeInput = popup.querySelector(".popup__input");

link.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.add("popup--visibility");
    blackout.classList.add("blackout");
});

blackout.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.remove("popup--visibility");
  blackout.classList.remove("blackout");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popup.classList.contains("popup--visibility")) {
      popup.classList.remove("popup--visibility");
      popup.classList.remove("blackout");
    }
  }
});
