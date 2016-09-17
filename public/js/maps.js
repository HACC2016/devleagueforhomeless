function initMap(){
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 21.3069, lng: -157.8583},
    zoom: 10
  });

  $.ajax({url: '/homeless', success: (function (result){
    var referrals = result;
    referrals.map(function(loc){
      var coordinatesLat = loc.latitude;
      var coordinatesLng = loc.longitude;
      var marker = new google.maps.Marker({
        map: map,
        position: {
          lat: parseFloat(coordinatesLat),
          lng: parseFloat(coordinatesLng),
        },
        animation: google.maps.Animation.DROP,
        title: loc.id.toString()
      });
      var largeInfowindow = new google.maps.InfoWindow();
      marker.addListener('click', function(){
        populateInfoWindow(marker, largeInfowindow);
      });
    });
  }) //close success function
}); //close ajax

  function populateInfoWindow(marker, infowindow) {
    console.log(infowindow);
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div class="marker">' + 'Ticket ID: ' + marker.title + '</div>');
      infowindow.open(map, marker);
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
    }
  }

} //close map init