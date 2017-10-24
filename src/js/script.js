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

function initMap() {
  var element = document.querySelector(".contacts__map--top");
  var options = {
      zoom: 15,
      center: {lat: 59.936280, lng: 30.321580}
  };

  var image = {
    url: "/img/icon-map-pin.svg",
    scaledSize: new google.maps.Size(66, 100)
  };
  var myMap = new google.maps.Map(element, options);
  var marker = new google.maps.Marker({
    position: {lat: 59.936280, lng: 30.321580},
    map: myMap,
    optimized: false,
    icon: image
  });

  var InfoWindow = new google.maps.InfoWindow({
    content: "<h1>Hello</h1>"
  });

  marker.addListener("click", function() {
    InfoWindow.open(myMap, marker);
  });
};
