/*
Process:Geolocating user
Calls:addMap,markUserLocation,markSobiPoints if succesfull or geoLocation error
*/
function geoLocating() {
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
               var posTemp = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                addMap(posTemp);
                markUserLocation(posTemp);
                markSobiPoints(appData);
                findNearest(appData,posTemp);

            }, geoLocationError);
        }
        else {
            //This means browser does not support Geolocation     
        }
    
       
}
/*
Function to run when no permission
Do Something to prompt user to enable location services
*/
function geoLocationError() {
        alert("Geolocation Error!");
}
/*
Process:Adds a google map to page
*/
function addMap(position){
    var location=position;
    var locatePageMapOptions = {
        center: { lat:location["lat"], lng:location["lng"] },
        zoom:13,
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
        disableDefaultUI: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: true,
    }
    map = new google.maps.Map(document.getElementById('map'), locatePageMapOptions);
}

/*
Process:Add User Location marker on map.
*/
function markUserLocation(location){
   
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(location["lat"],location["lng"]),
        map: map,
        title:'My Location',
        animation: google.maps.Animation.DROP
    });
}
/*
Parm:appData Json
Process:Adds sobi points to the map
Return:VOID
*/
function markSobiPoints(data){
    
    for (var i = 0; i < data.length; i++) {
        
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(data[i]["LATITUDE"], data[i]["LONGITUDE"]),
            map: map,
            animation: google.maps.Animation.DROP
        });
    }
}
/*
Parm:LatLng Object for destinations
Process:Compute distance from distance to origin
Returns:VOID
*/
function findNearest(data,location) {  
    var latlngdata=buildArray(appData);          
    var userLocation=new google.maps.LatLng(location["lat"],location["lng"]);
     var distanceArray=Array();                                   
     for(var i=0;i<latlngdata.length-1;i++){
               var tempDistance=
         google.maps.geometry.spherical
         .computeDistanceBetween(latlngdata[i],userLocation);
         distanceArray.push(tempDistance);
         appData[i].Distance=tempDistance;    
     }
     sortData(appData);    
}
/*
Parm:appData with Distance
Process:Sorts the object based on distance
Returns:VOID
*/
function sortData(data){
    function compare(a,b){
        if(a.Distance<b.Distance)
           return -1;
       if(a.Distance>b.Distance)
           return 1;
       return 0;
    }
    appData.sort(compare);
    console.log(appData);
    populateCards(3,appData);
}
/*
Parm: AppData Json
Process:Extracts lat lng and push into an array.
Returns:Array with LatLng google object
*/
function buildArray(data) {
    var tempArray = new Array();
    var objLength=data.length;
    for (var temp = 0; temp < data.length-1; temp++) {
        var tempLat=parseFloat(data[temp]["LATITUDE"]);
        var tempLng=parseFloat(data[temp]["LONGITUDE"]);
        var tempLatLng = new google.maps.LatLng(tempLat,tempLng);
         tempArray[temp] =tempLatLng;
    }
    return tempArray;
}
/*
*/
function resizeBootstrapMap() {
    var mapParentWidth = $('#mapContainer').width();
    $('#map').width(mapParentWidth);
    $('#map').height(3 * mapParentWidth / 4);
    google.maps.event.trigger($('#map'),resize);
    console.log(mapParentWidth);
};
function populateCards(noofcards,data){
    for(var i=0;i<noofcards;i++){
        if(i==0){
            $('#card'+i+' h4').html(data[i]['NAME']+'<span class="badge badge-success"> Nearest</span>');
        }
        else{
            $('#card'+i+' h4').html(data[i]['NAME']);
        }
        $('#card'+i+' h6').html(data[i]['ADDRESS']);

    }
}

