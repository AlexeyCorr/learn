var navMain = document.querySelector(".menu");
var navToggle = document.querySelector(".menu__toggle");

navMain.classList.remove("menu--nojs");

navToggle.addEventListener("click", function(evt) {
  if (navMain.classList.contains("menu--closed")) {
    evt.preventDefault();
    navMain.classList.remove("menu--closed");
    navMain.classList.add("menu--opened");
  } else {
    evt.preventDefault();
    navMain.classList.remove("menu--opened");
    navMain.classList.add("menu--closed");
  }
});
