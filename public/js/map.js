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
  {title: 'UH Manoa', location: {lat: 21.3000, lng: -157.8190}},
  {title: 'Honolulu', location: {lat: 21.3069, lng: -157.8583}}
  // {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
  // {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
  // {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
  // {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
  // {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
];

var largeInfowindow = new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds();

// Uses locations array to create an array of markers on initialize.
for (var i=0; i < locations.length; i++) {
  // get the position from the location array.
  var position = locations[i].location;
  var title = locations[i].title;
  //Create a marker per location, and put into markers array.
  var marker = new google.maps.Marker({
    map: map,
    position: position,
    title: title,
    animation: google.maps.Animation.DROP,
    id: i
  });
  // Push the marker to our array of markers.
  markers.push(marker);
  // Extend the boundaries of the map for each marker
  bounds.extend(marker.position);
  // Create an onclick event to open infowindow at each marker
  marker.addListener('click', function () {
    populateInfoWindow(this, largeInfowindow);
  });
}
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
//   var directionsService = new google.maps.DirectionsService();
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
