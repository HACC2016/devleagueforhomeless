var db = require('./models');
var Referals = db.Refferals;

var map;
var markers = [];
function initMap() {
  var originPlaceId = null;
  var destinationPlaceId = null;
  var travMode =  'WALKING';
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 21.3069, lng: -157.8583},
    zoom: 10
  });

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);

  var originInput = document.getElementById('origin-input');
  var destinationInput = document.getElementById('destination-input');
  var modes = document.getElementById('mode-selector');

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(modes);

  var originAutocomplete = new google.maps.places.Autocomplete(originInput);
  originAutocomplete.bindTo('bounds', map);
  var destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);
  destinationAutocomplete.bindTo('bounds', map);

  displayRoute(originPlaceId, destinationPlaceId, travMode, directionsService, directionsDisplay);
  var modeSelect = document.getElementById('mode-selector');
  modeSelect.addEventListener('change', function(){
      displayRoute(originPlaceId, destinationPlaceId, travMode,directionsService, directionsDisplay);
  });

  function expandViewportToFitPlace(map, place){
    if (place.geometry.viewport){
      map.fitBounds(place.geometry.viewport);
    }else{
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
  }

  originAutocomplete.addListener('place_changed', function(){
    var place = originAutocomplete.getPlace();
    console.log('place in function: ', place);
    if (!place.geometry){
      window.alert("Autocomplete's returned place contains no geometry.");
      return;
    }
    expandViewportToFitPlace(map, place);
    console.log('place after return: ', place);

    // If place has geometry, store place ID and route
    originPlaceId = place.place_id;
    displayRoute(originPlaceId, destinationPlaceId, travMode, directionsService, directionsDisplay);
  });

  destinationAutocomplete.addListener('place_changed', function(){
    var place = destinationAutocomplete.getPlace();
    if(!place.geometry){
      window.alert("Autocomplete's returned palce contains no geometry.");
      return;
    }
    expandViewportToFitPlace(map, place);
    destinationPlaceId = place.place_id;
    displayRoute(originPlaceId, destinationPlaceId, travMode,directionsService, directionsDisplay);
  });

  function displayRoute(originPlaceId, destinationPlaceId, travMode, directionsService, directionsDisplay){
    // if (!originPlaceId || !destinationPlaceId){
    //   return;
    // }
    var selectedMode = modes.value;
    directionsService.route({
      origin: {'placeId': originPlaceId},
      destination: {'placeId': destinationPlaceId},
      travelMode: google.maps.TravelMode[selectedMode]
    }, function (response, status){
      if (status === 'OK'){
        directionsDisplay.setDirections(response);
      } else{
        window.alert('Request failed due to ' + status);
      }
    });
  }

// These are the real estate listings that will be shown to the user.
// Normally we'd have these in a database instead.
var locations = [
  { GPS: '21.25951797445499,-157.77718671206867' },
  { GPS: '21.326150735778302,-157.77768004860295' },
  { GPS: '21.31601674261848,-157.7988459161547' },
  { GPS: '21.31556453428468,-157.83384991929407' },
  { GPS: '21.314831604999423,-157.76220814457517' },
  { GPS: '21.323390188197866,-157.82487325882653' },
  { GPS: '21.327762964666004,-157.8471211134467' },
  { GPS: '21.351126263650393,-157.83497572030407' },
  { GPS: '21.271327948826862,-157.78912540459285' },
  { GPS: '21.33298710867148,-157.8139946243236' },
  { GPS: '21.26826780961813,-157.80261702486476' },
  { GPS: '21.300198511383105,-157.8222317843767' },
  { GPS: '21.27682072619319,-157.84411980615462' },
  { GPS: '21.302357790402958,-157.81983377775745' },
  { GPS: '21.338976712901093,-157.83776391373462' },
  { GPS: '21.333638304877468,-157.79358067375586' },
  { GPS: '21.275544489236864,-157.81074368250012' },
  { GPS: '21.342790005979854,-157.85494889442325' },
  { GPS: '21.267131905914145,-157.85603892517662' },
  { GPS: '21.283097434973964,-157.7921064402273' },
  { GPS: '21.327161559111435,-157.76717822136828' },
  { GPS: '21.275893440936187,-157.79546438797067' },
  { GPS: '21.29849546276354,-157.76882937055797' },
  { GPS: '21.259783060374872,-157.78094805613557' },
  { GPS: '21.316866590110035,-157.7844027011475' },
  { GPS: '21.35150396886414,-157.7603033656643' },
  { GPS: '21.312573215950557,-157.79595152985397' },
  { GPS: '21.273456841638865,-157.84116451943183' },
  { GPS: '21.30493635645019,-157.8542052806207' },
  { GPS: '21.29428381411425,-157.7994411776216' },
  { GPS: '21.28081418610611,-157.76040870751683' },
  { GPS: '21.329187317192407,-157.76862963425552' },
  { GPS: '21.2866969125577,-157.79922667156137' },
  { GPS: '21.345898592573988,-157.8336466398353' },
  { GPS: '21.30752986946462,-157.819255970097' },
  { GPS: '21.305564782558427,-157.7923649321288' },
  { GPS: '21.324292734474213,-157.81791721397323' },
  { GPS: '21.35550957368346,-157.8472116151611' },
  { GPS: '21.28110587886793,-157.82733978663703' },
  { GPS: '21.34383189767905,-157.8382475625465' },
  { GPS: '21.344639895334275,-157.77579010815919' },
  { GPS: '21.29522182592935,-157.7925131811675' },
  { GPS: '21.286009517904624,-157.79836289589608' },
  { GPS: '21.28698290754754,-157.80777919463372' },
  { GPS: '21.35144127142374,-157.80527403195796' },
  { GPS: '21.354854628028008,-157.84266602407166' },
  { GPS: '21.342369097284823,-157.762873644948' },
  { GPS: '21.270468167141257,-157.7828976170612' },
  { GPS: '21.28856476648553,-157.83102985633485' },
  { GPS: '21.341340245786352,-157.79738143296416' },
  { GPS: '21.307462736980753,-157.82166719740863' },
  { GPS: '21.352392593765845,-157.83923778958376' },
  { GPS: '21.304028791535934,-157.83647683644634' },
  { GPS: '21.274339013685886,-157.77622181040095' },
  { GPS: '21.358516733510793,-157.78763689062325' },
  { GPS: '21.32725458539856,-157.7705586528125' },
  { GPS: '21.278338734214195,-157.76797324896765' },
  { GPS: '21.265814670233162,-157.76287280872936' },
  { GPS: '21.31215716532875,-157.8350905350594' },
  { GPS: '21.359141022527833,-157.82274616166112' },
  { GPS: '21.292050222148116,-157.77264702156825' },
  { GPS: '21.346582720306074,-157.84549419391004' },
  { GPS: '21.268424492242026,-157.83875665616898' },
  { GPS: '21.27260448016501,-157.8324584534624' },
  { GPS: '21.344113743883373,-157.79531553767205' },
  { GPS: '21.357099402528405,-157.83258347131053' },
  { GPS: '21.33858196546388,-157.82713395252003' },
  { GPS: '21.27334087442195,-157.76783599362764' },
  { GPS: '21.27446874003463,-157.78819933483956' },
  { GPS: '21.265478369861444,-157.80265867507762' },
  { GPS: '21.348651122378968,-157.8130620553096' },
  { GPS: '21.271088455735004,-157.76046905879585' },
  { GPS: '21.282222449378274,-157.82644850999165' },
  { GPS: '21.338543582682945,-157.8569876930281' },
  { GPS: '21.344986602314343,-157.79727098385519' },
  { GPS: '21.29228947146954,-157.78974146443304' },
  { GPS: '21.292358259357883,-157.81389684621155' },
  { GPS: '21.282374693194487,-157.85651658224907' },
  { GPS: '21.261742724130823,-157.82922295371904' },
  { GPS: '21.325865971397405,-157.77441438618536' },
  { GPS: '21.29054588020248,-157.83326090021507' },
  { GPS: '21.32332750679972,-157.8543272330441' },
  { GPS: '21.28480661448535,-157.7922251846691' },
  { GPS: '21.274611964475756,-157.8102909179061' },
  { GPS: '21.326783534278825,-157.76738638976354' },
  { GPS: '21.34764153257862,-157.76059082555327' },
  { GPS: '21.284372629678643,-157.767242692761' },
  { GPS: '21.26057205442676,-157.78342289179696' },
  { GPS: '21.333623329654042,-157.82672799279067' },
  { GPS: '21.318479017017157,-157.787839714986' },
  { GPS: '21.33006618738059,-157.85448580727606' },
  { GPS: '21.327209244985678,-157.83465782677447' },
  { GPS: '21.310228900577776,-157.8060656190627' },
  { GPS: '21.342093317605542,-157.7754630399957' },
  { GPS: '21.291259691392675,-157.7666121399634' },
  { GPS: '21.358318804117065,-157.77152392294698' },
  { GPS: '21.26307234081625,-157.7613937324416' },
  { GPS: '21.27617304663119,-157.7960805917215' },
  { GPS: '21.31792917755896,-157.8532906748741' },
  { GPS: '21.356611199916486,-157.78675106216258' }
];

var largeInfowindow = new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds();



// Uses locations array to create an array of markers on initialize.
// for (var i=0; i < locations.length; i++) {
//   // get the position from the location array.
//   var position = locations[i].location;
//   var title = locations[i].title;
//   //Create a marker per location, and put into markers array.
//   var marker = new google.maps.Marker({
//     map: map,
//     position: position,
//     title: title,
//     animation: google.maps.Animation.DROP,
//     id: i
//   });


markers = locations.map(function(loc){
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

  // Push the marker to our array of markers.
  // markers.push(marker);
  // Extend the boundaries of the map for each marker
  bounds.extend(markers.position);
  // Create an onclick event to open infowindow at each marker
  markers.addListener('click', function () {
    populateInfoWindow(this, largeInfowindow);
  });

map.fitBounds(bounds);

document.getElementById('show-listings').addEventListener('click', showListings);

document.getElementById('hide-listings').addEventListener('click', hideListings);
}



// Function to populate infoWindow when marker is clicked. Populate based on marker's position.
function populateInfoWindow(marker, infowindow){
  // check that infowindow is not already opened on this marker.
  if (infowindow.marker !== marker){
    infowindow.marker = marker;
    infowindow.setContent('<div class="marker">' + marker.title + '</div>');
    infowindow.open(map, marker);
    console.log('open');
    // Make sure marker property is cleared if infowindow is closed.
    infowindow.addListener('closeclick',function(){
      console.log("close");
      infowindow.marker = null;
    });
  }
}

  // Function to loop through markers array and display them all.
function showListings(){
  var bounds = new google.maps.LatLngBounds();
  // Extend boundaries of map for each marker and display marker
  for (var i = 0; i < markers.length; i++){
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}

// Loops through listings and hides them
function hideListings(){
  for (var i = 0; i < markers.length; i++){
    markers[i].setMap(null);
  }
}



// function displayDirections(origin){
//   hideListings();
//   var directionsService = new google.maps.DirectionsService;
//   var destinationAddress = document.getElementById('search-transportation-text').value;
//   directionsService.route({
//     origin: origin,
//     desitnation: destinationAddress,
//     travelMode: google.maps.TravelMode[mode]
//   }, function(response, status){
//     if (status === google.maps.DirectionsStatus.OK){
//       var directionsDisplay = new google.maps.DirectionsRenderer({
//         map: map,
//         directions: response,
//         draggable: true,
//         polylineOptions: {
//           strokeColor: 'red'
//         }
//       });
//     }
//   });
// }
