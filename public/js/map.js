var map;
var markers = [];
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 40.7413549, lng: -73.9980244},
  zoom: 13
});

// These are the real estate listings that will be shown to the user.
// Normally we'd have these in a database instead.
var locations = [
  {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
  {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
  {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
  {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
  {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
  {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
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
    console.log(this);
    populateInfoWindow(this, largeInfowindow);
    console.log(largeInfowindow);
  });
}
// map.fitBounds(bounds);

document.getElementById('show-listings').addEventListener('click', showListings);
document.getElementById('hide-listings').addEventListener('click', hideListings);
}

// Function to populate infoWindow when marker is clicked. Populate based on marker's position.
function populateInfoWindow(marker, infowindow){
  console.log('marker in populateInfoWindow: ', marker);
  // check that infowindow is not already opened on this marker.
  if (infowindow.marker !== marker){
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure marker property is cleared if infowindow is closed.
    infowindow.addListener('closeclick', function(){
      infowindow.setMarker(null);
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
