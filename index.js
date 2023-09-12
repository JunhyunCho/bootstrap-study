let map;
let tourStops;


var myCarousel = document.querySelector('#myCarousel');
var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 1000,
    wrap: false
});
//add eventListener to carousel
myCarousel.addEventListener('slide.bs.carousel', function (event) {
    //get the index of the slide
    var index = event.to;
    //get the slide itself
    //console.log(event.relatedTarget.id);
    map.panTo(tourStops[index].position);
    
});



const DEMO_MAP_ID = "bf275fc383452ffe"
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// Initialize and add the map
async function initMap() {
    // Request needed libraries.
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
      "marker",
    );
    map = new Map(document.getElementById("map"), {
      zoom: 12,
      center: { lat: 34.84555, lng: -111.8035 },
      mapId: "bf275fc383452ffe",
    });
    // Set LatLng and title text for the markers. The first marker (Boynton Pass)
    // receives the initial focus when tab is pressed. Use arrow keys to
    // move between markers; press tab again to cycle through the map controls.
    tourStops = [
      {
        position: { lat: 34.8791806, lng: -111.8265049 },
        title: "Boynton Pass",
      },
      {
        position: { lat: 34.8559195, lng: -111.7988186 },
        title: "Airport Mesa",
      },
      {
        position: { lat: 34.832149, lng: -111.7695277 },
        title: "Chapel of the Holy Cross",
      },
      {
        position: { lat: 34.823736, lng: -111.8001857 },
        title: "Red Rock Crossing",
      },
      {
        position: { lat: 34.800326, lng: -111.7665047 },
        title: "Bell Rock",
      },
    ];
    // Create an info window to share between markers.
    const infoWindow = new InfoWindow();
  
    // Create the markers.
    tourStops.forEach(({ position, title }, i) => {
      const pin = new PinElement({
        glyph: `${i + 1}`,
      });
      const marker = new AdvancedMarkerElement({
        position,
        map,
        title: `${i + 1}. ${title}`,
        content: pin.element,
      });
  
      // Add a click listener for each marker, and set up the info window.
      marker.addListener("click", ({ domEvent, latLng }) => {
        const { target } = domEvent;
  
        infoWindow.close();
        infoWindow.setContent(marker.title);
        infoWindow.open(marker.map, marker);
        //console.log("Marker clicked", target, latLng.toJSON());
        //move center of the map to latLng
        map.panTo(latLng);
        //slide carousel card to the right index
        carousel.to(i);
        console.log("carousel index", i);
      });
    });
  }
  
  initMap();




