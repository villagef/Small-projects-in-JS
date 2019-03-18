let myMap;
function initMap() {
    //stworzenie mapy
    myMap = new google.maps.Map(document.getElementById('myMap'), {
        //lokalizacja startowa
        center: {lat: 52.2297, lng: 21.0122},
        zoom: 10,
        mapTypeId: 'satellite'
    });

    if(navigator.geolocation){
        //reakcja na podanie lokalizacji
        navigator.geolocation.getCurrentPosition(function(position) {
            let currentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            setMapMarker(currentPosition);
        },
        //reakcja na zablokowanie lokalizacji
        function(){
            setMapMarker({lat:myMap.getCenter().lat(),lng:myMap.getCenter().lng()});
        });
    //reakcja na brak wsparcia dla lokalizacji    
    }else{
        setMapMarker({lat:myMap.getCenter().lat(),lng:myMap.getCenter().lng()});
    }
}

let marker;
//ustawienie markera/mapy w pozycji i uruchomienie interwalu odpowiedzialnego za ruszanie nimi
function setMapMarker(position){
    marker = new google.maps.Marker({position: position, map: myMap, icon: "icons/pin.png"});
    myMap.panTo(marker.position);
    setInterval(move,30);
}

let atop = false, abot = false, aright = false, aleft = false;
//wcisniecie strzalek
window.addEventListener("keydown",function(e){
    switch(e.keyCode){
        case 37:
        aleft = true;
        break;
        case 39:
        aright = true;
        break;
        case 38:
        atop = true;
        break;
        case 40:
        abot = true;
        break;
    }
})
//puszczenie strzalek
window.addEventListener("keyup",function(e){
    switch(e.keyCode){
        case 37:
        aleft = false;
        break;
        case 39:
        aright = false;
        break;
        case 38:
        atop = false;
        break;
        case 40:
        abot = false;
        break;
    }
})

//ruszanie markerem/mapa
function move(){
    let position = {
        lat: marker.position.lat(),
        lng: marker.position.lng()
    };
    if(atop){
        position.lat += 0.01;
    }
    if(abot){
        position.lat -= 0.01;
    }
    if(aright){
        position.lng += 0.01;
    }
    if(aleft){
        position.lng -= 0.01;
    }
    marker.setPosition(position);
    myMap.panTo(marker.position);
}