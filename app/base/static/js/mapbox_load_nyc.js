mapboxgl.accessToken = ACCESS_KEY;
// var hoveredStateId = null;
// var myBooks = []
function CreateTableFromJSON(myBooks) {

    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < myBooks.length; i++) {
        for (var key in myBooks[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < myBooks.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myBooks[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}
// function CreateTableFromDICT(odj){
//     var tbody = document.getElementById('tbody');
    
//     for (var i = 0; i < obj.length; i++) {
//         var tr = "<tr>";
    
//         /* Verification to add the last decimal 0 */
//         if (obj[i].value.toString().substring(obj[i].value.toString().indexOf('.'), obj[i].value.toString().length) < 2) 
//             obj[i].value += "0";
    
//         /* Must not forget the $ sign */
//         tr += "<td>" + obj[i].key + "</td>" + "<td>$" + obj[i].value.toString() + "</td></tr>";
    
//         /* We add the table row to the table body */
//         tbody.innerHTML += tr;
//     }

// }


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
    map.addSource('pluto', {
        type: 'vector',
        url: 'mapbox://berncool.8v2yi6o3'
    });
    map.addLayer({
        'id': 'pluto',
        'type': 'fill',
        'source': 'pluto',
        'source-layer': 'pluto_19-2mq30a',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-color': "hsla(0, 0%, 95%, 0.3)"
        },
        
    });


});
function CreateTableFromDICT(dict){
    var k = ''
    for(var key in dict){
        k+= '<tr>';
        k+= '<td>' + key + ":"+ dict[key] + '</td>';
        k+= '</tr>';
    }
    document.getElementById('tableData').innerHTML = k;
}
map.on('click', function (e) {
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
    var Objdict = displayFeatures[0]['properties']
    CreateTableFromDICT(Objdict);
    // CreateTableFromDICT(displayFeatures[0]['properties']);
    document.getElementById('features').innerHTML = JSON.stringify(
        displayFeatures,
        null,
        2
    );
});



// var dict = {'BoroName': 'Queens', 
// 'DOC_AMOUNT': 641875,
// 'NTAName': 'Hunters Point-Sunnyside-West Maspeth', 
// 'PRICE_ZFA': 287,
// 'id': 161038, 
// 'years': 2019.1584699453551};
