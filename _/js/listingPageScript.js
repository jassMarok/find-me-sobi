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
function addHubMarkers(thisJson){                                        //Add SoBI hubs markers on map
    var parsedJson=JSON.parse(thisJson);
    for (var i = 0; i < parsedJson.length; i++) {  

        marker = new google.maps.Marker({
        position: new google.maps.LatLng(parsedJson[i]["LATITUDE"],parsedJson[i]["LONGITUDE"]),
        map: map
      });
}
findNearest(parsedJson);
}
