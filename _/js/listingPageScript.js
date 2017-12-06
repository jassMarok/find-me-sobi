function getJson(){
    
    $.ajax({                                                            //Ajax request 
        url:"read-data-json.php",
         success: function (response) {
             console.log(response);
            addHubMarkers(response);             
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('error');
        } 
        
    });

}
function addHubMarkers(tempJson){                                        //Add SoBI hubs markers on map
    var thisJson=JSON.parse(tempJson);
    for (var i = 0; i < thisJson.length; i++) {  

        marker = new google.maps.Marker({
        position: new google.maps.LatLng(thisJson[i]["LATITUDE"],thisJson[i]["LONGITUDE"]),
        map: map
      });
}
findNearest(thisJson);
}
/* Use this library to load geometry
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry">
</script> */
function findNearest(tempJson){                                        //Find nearest point on map
    var thisJson=tempJson;
    

}
