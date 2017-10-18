function initMap() {
  var element = document.querySelector(".contacts__map--top");
  var options = {
      zoom: 15,
      center: {lat: 59.936280, lng: 30.321580}
  };
  var myMap = new google.maps.Map(element, options);
  var marker = new google.maps.Marker({
    position: {lat: 59.936280, lng: 30.321580},
    map: myMap,
    icon: "/img/icon-map-pin.svg"
  });

  var InfoWindow = new google.maps.InfoWindow({
    content: "<h1>Hello</h1>"
  });

  marker.addListener("click", function() {
    InfoWindow.open(myMap, marker);
  });
};
