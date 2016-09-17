function initMap(){
  var markers = [];
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
        title: loc.id.toString(),
        icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
      });
      markers.push(marker);
      var largeInfowindow = new google.maps.InfoWindow();
      marker.addListener('click', function(){
        populateInfoWindow(marker, largeInfowindow);
      });

      document.getElementById('show-listings').addEventListener('click', showListings);

      document.getElementById('hide-listings').addEventListener('click', hideListings);


    });
  }) //close success function
}); //close ajax

  function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div class="marker">' + 'Ticket ID: ' + marker.title + '</div>');
      infowindow.open(map, marker);
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
    }
  }

      function showListings(){
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++){
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      }

      function hideListings(){
        for (var i = 0; i < markers.length; i++){
          markers[i].setMap(null);
        }
      }

} //close map init