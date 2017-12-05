/* Intializing the map */
var map, infoWindow;
var getData;
var nlr=0;
var des = [];
function initMap() {
  var hamilton = { lat: 43.255203, lng: -79.843826 };
  var indexOptions = {
    center: { lat: hamilton["lat"], lng: hamilton["lng"] },
    zoom: 11,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#0080ff"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "saturation": 65
          },
          {
            "lightness": 100
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ],
    disableDefaultUI: true,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: false,




  };
  map = new google.maps.Map(document.getElementById('map'), indexOptions);
  Obtaining User Address 
 infoWindow = new google.maps.InfoWindow;
 // Try HTML5 geolocation.
 if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function(position) {
     var pos = {
       lat: position.coords.latitude,
       lng: position.coords.longitude
     };
 
     infoWindow.setPosition(pos);
     infoWindow.setContent('Location found.');
     infoWindow.open(map);
     map.setCenter(pos);
   }, function() {
     handleLocationError(true, infoWindow, map.getCenter());
   });
 } else {
   // Browser doesn't support Geolocation
   handleLocationError(false, infoWindow, map.getCenter());
 }
 
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
 infoWindow.setPosition(pos);
 infoWindow.setContent(browserHasGeolocation ?
                       'Error: The Geolocation service failed.' :
                       'Error: Your browser doesn\'t support geolocation.');
 infoWindow.open(map);
}
 
 
} /*Obtaining User Location and displaying a info window */

  $.ajax({
    url: "components/php/read-data-json.php", success: function (result) {
      getData = JSON.parse(result);
      var dataLength=getData.length;
      var nlr = dataLength/10;
      var dataLengthMod = dataLength%10;
      if (dataLengthMod!=0)
          nlr+=1;
      for(var bigloop=0;bigloop<nlr;bigloop++)
      {
        if(bigloop=0)
        {
        
          var startvalue=0;
          var endloop=10
        }
        else
        {
          var startvalue=bigloop*10+1;
          var endloop = bigloop*20;
        }
             // Working destination object created 
      var points = [];
      var ori = [];

      for ( var i=startvalue ; i < endloop; i++) {
        var latlng;

        var latTemp = getData[i]["LATITUDE"];

        var lngTemp = getData[i]["LONGITUDE"];

        var latlng = new google.maps.LatLng(latTemp, lngTemp);
        var orill = new google.maps.LatLng(43.2387, -79.8881);
        ori.push(orill);
        points.push(latlng);
      }

    });

      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: ori,
          destinations: points,
          travelMode: 'WALKING',
        }, callback);
      }


  function callback(response, status) {
    if (status == 'OK') {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;

      for (var i =startvalue ; i < endloop; i++) {
        var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          var distance = element.distance.text;
          var from = origins[i];
          var to = destinations[j];
          console.log("Distance from "+origin+"to "+destinations+"is "+distance );
        }
      }
    }
  }
}  
}
   
 
  /* Adding Markers on Map 
for (var i = 0; i < getData.length; i++) {  
  marker = new google.maps.Marker({
  position: new google.maps.LatLng(getData[i]["LATITUDE"],getData[i]["LONGITUDE"]),
  map: map
}); */
  //Working Commented Out Set async to false if any problem


