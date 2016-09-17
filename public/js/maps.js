var map;
function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 21.3069, lng: -157.8583},
    zoom: 10
  });

  $.ajax({url: '/homeless', success: (function (result){
    var referrals = result;
    markers = referrals.map(function(loc){
      var coordinates = loc.GPS.split(',');
      return new google.maps.Marker({
        map: map,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
        animation: google.maps.Animation.DROP
      });
    });
  })
});

}