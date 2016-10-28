var markers = [];
var popups = [];
var color1 = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';
var color2 = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

function initMap(){
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 21.3069, lng: -157.8583},
    zoom: 11
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
                address: loc.address,
                city: loc.city,
                state: loc.state,
                zip: loc.zip,
                icon: color1,
                id: loc.id,
              });

              markers.push(marker);

              marker.addListener('mouseover', function() {
                marker.setIcon(color2);
              });

              marker.addListener('click', function(){
                $('.row-highlight').removeClass('row-highlight');
                $('#ref-row-' + loc.id).addClass('row-highlight');
              });

              marker.addListener('mouseout', function() {
                marker.setIcon(color1);
              });

              var largeInfowindow = new google.maps.InfoWindow();
              popups.push(largeInfowindow);
              marker.addListener('click', function(){
               for (var j = 0; j < popups.length; j++){
                  popups[j].close();
                }
                populateInfoWindow(marker, largeInfowindow);
              });

              var rowId = 'ref-row-' + loc.id;
              var centerVal = loc.position;
              var tr = document.getElementById(rowId);
              tr.addEventListener('click', function(){
                $('.row-highlight').removeClass('row-highlight');
                $('#ref-row-' + loc.id).addClass('row-highlight');
                  for (var j = 0; j < markers.length; j++){
                    markers[j].setIcon(color1);
                    popups[j].close();
                  }
                populateInfoWindow(marker, largeInfowindow);
                map.setZoom(12);
                marker.setIcon(color2);
              });

            }
          }
        });
      }
    });
  })
});

  function populateInfoWindow(marker, infowindow) {
      infowindow.setContent('<div class="marker">' + '<span class="info-title">' + 'Referral # ' + marker.title +   '</span>' + '<br>' + marker.address + ' ' + marker.city + ', ' + marker.state + ' ' + marker.zip + '</div>');
      infowindow.open(map, marker);
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
  }
}