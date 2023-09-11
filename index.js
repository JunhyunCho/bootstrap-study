var myCarousel = document.querySelector('#myCarousel');
var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 2000,
    wrap: false
});



//google maps setup

let map;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
}

initMap();
