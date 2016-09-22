var markers = [];
var color1 = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';
var color2 = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

function initMap(){
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 21.3069, lng: -157.8583},
    zoom: 10
  });

  var geocoder = new google.maps.Geocoder();

  $.ajax({url: '/homeless', success: (function (result){
    var referrals = result;
    referrals.map(function(loc){
      var address = loc.address + ' ' + loc.city + ', ' + loc.state + ' ' + loc.zip;
      var coordinatesLat = loc.latitude;
      var coordinatesLng = loc.longitude;

      if (geocoder) {
        geocoder.geocode({
          'address': address
        }, function (results, status){
          if (status === google.maps.GeocoderStatus.OK){
            if (status !== google.maps.GeocoderStatus.ZERO_RESULTS){
              map.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                map: map,
                position: coordinatesLat && coordinatesLng ?
                  {
                    lat: parseFloat(coordinatesLat),
                    lng: parseFloat(coordinatesLng),
                  } : results[0].geometry.location,
                animation: google.maps.Animation.DROP,
                title: loc.id.toString(),
                icon: color1,
              });

              markers.push(marker);

              marker.addListener('mouseover', function() {
                marker.setIcon(color2);
              });
              marker.addListener('mouseout', function() {
                marker.setIcon(color1);
              });

              var largeInfowindow = new google.maps.InfoWindow();
              marker.addListener('click', function(){
                populateInfoWindow(marker, largeInfowindow);
              });

              var rowId = 'ref-row-' + loc.id;
              var tr = document.getElementById(rowId);
              tr.addEventListener('click', function(){
                for (var j = 0; j < markers.length; j++){
                  markers[j].setIcon(color1);
                }
                marker.setIcon(color2);
              });

            }
          }
        }); // close geocoder callback
      } // close geocoder if statement
    }); //closes referrals.map function
      document.getElementById('show-listings').addEventListener('click', showListings);

      document.getElementById('hide-listings').addEventListener('click', hideListings);

  }) //close success function
}); //close ajax

  function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div class="marker">' + 'Referral #: ' + marker.title + '</div>');
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
