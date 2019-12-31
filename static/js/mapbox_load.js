mapboxgl.accessToken = ACCESS_KEY;
// var hoveredStateId = null;
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/berncool/cjndkardf1ikx2rnw9n8i7inj', // stylesheet location
    center: [114.17502, 22.3049], // starting position [lng, lat]
    pitch: 60,
    bearing: -37,
    zoom: 14 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());
// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);
map.on("load",function(){
    map.addSource('age', {
        type: 'vector',
        url: 'mapbox://berncool.0a9h402c'
        });
    map.addLayer({
    'id': 'age',
    'type': 'fill-extrusion',
    'source': 'age',
    'layout': {
    'visibility': 'visible'
    },
    'paint': {
        'fill-extrusion-color' :[
            "interpolate",
            ["linear"],
            ["get", "AGE"],
            10,
            "hsl(220, 93%, 88%)",
            20,
            "hsl(220, 100%, 59%)",
            30,
            "hsl(37, 100%, 57%)",
            40,
            "hsl(0, 68%, 45%)",
            50,
            "hsl(0, 91%, 17%)"
            ],
        'fill-extrusion-height' : [
            "interpolate",
            ["linear"],
            ["get", "BLDG_HEIGH"],
            0,
            0,
            442.5,
            442.5
            ]
    },
    'source-layer': 'centa_data-ds37c7'
    });
    
});