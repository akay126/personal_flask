mapboxgl.accessToken = ACCESS_KEY;
// var hoveredStateId = null;

var bounds = [
    [-73.669196, 40.854757], // Southwest coordinates
    [-73.9989090, 40.876141] // Northeast coordinates
];

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/berncool/cjprqhxat31ki2qo47u6wvl1k', // stylesheet location
    center: [-73.987, 40.72837], // starting position [lng, lat]
    pitch: 0,
    bearing: 0,
    zoom: 12 // starting zoom
    // maxBounds: bounds
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
map.on("load", function () {
    map.addSource('price_zfa', {
        type: 'vector',
        url: 'mapbox://berncool.2x2z0vuo'
    });
    map.addLayer({
        'id': 'price_zfa',
        'type': 'fill',
        'source': 'price_zfa',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-color': [
                "interpolate",
                ["linear"],
                ["get", "PRICE_ZFA"],
                0,
                "hsla(108, 0%, 100%, 0)",
                1500,
                "hsla(30, 100%, 60%,0.5)",
                3000,
                "hsla(16, 100%, 30%,0.5)"
            ]
        },
        'source-layer': 'hex_grid1-7se6m9'
    });


});

map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point);

    // Limit the number of properties we're displaying for
    // legibility and performance
    var displayProperties = [
        'type',
        'properties',
        'id',
        'layer',
        'source',
        'sourceLayer',
    ];

    var displayFeatures = features.map(function (feat) {
        var displayFeat = {};
        displayProperties.forEach(function (prop) {
            displayFeat[prop] = feat[prop];
        });
        return displayFeat;
    });

    document.getElementById('features').innerHTML = JSON.stringify(
        displayFeatures,
        null,
        2
    );
});