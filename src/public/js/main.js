var map = L.map('map-template').setView([-28.0500000, -56.0333300], 15);

const tileURL = 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png' 
const tileURL2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

const tile = L.tileLayer(tileURL2);

map.doubleClickZoom.disable();

// Socket Io
const socket = io.connect();



// Geolocation
map.locate({enableHighAccuracy: true})
map.on('locationfound', (e) => {
  const coords = [e.latlng.lat, e.latlng.lng];
  const newMarker = L.marker(coords);
  newMarker.bindPopup('Mi ubicación API');
  map.addLayer(newMarker);
  socket.emit('userCoordinates', e.latlng);
});


//user marker
map.on('dblclick', e=>{
  let userMarker = null;
  let latlng = map.mouseEventToLatLng(e.originalEvent);
  console.log(latlng);
  userMarker = L.marker([latlng.lat, latlng.lng]).bindPopup('Mi ubicación SELECTED');;
  if(userMarker){
    map.removeLayer(userMarker);
  }
  map.addLayer(userMarker);
})


// socket new User connected
socket.on('newUserCoordinates', (coords) => {
  console.log(coords);
  const userIcon = L.icon({
    iconUrl: '/img/icon2.png',
    iconSize: [38, 42],
  })
  const newUserMarker = L.marker([coords.lat, coords.lng], {
    icon: userIcon 
  });
  newUserMarker.bindPopup('New User!');
  map.addLayer(newUserMarker);
}); 

map.addLayer(tile);

