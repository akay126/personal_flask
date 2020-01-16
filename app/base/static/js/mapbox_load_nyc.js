mapboxgl.accessToken = ACCESS_KEY;
// var hoveredStateId = null;
// var myBooks = []
var sortByProperty = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] < y[property]) ? 1 : -1));
    };
};
function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}
function json2table(json, classes, cols) {
    if (cols.length == 0) {
        var cols = Object.keys(json[0]);
    }

    var headerRow = '';
    var bodyRows = '';

    classes = classes || '';

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function checkifNumber(string, colName) {
        switch (colName) {
            case 'document_amt':
                var string = parseInt(string);
                return '$ ' + string.toLocaleString();
                break;
            case 'recorded_datetime':
                return string.substring(0, 10);
                break;
            case 'doc_type':
                var doc_type_dict = { 'AGMT': 'AGREEMENT', 'AMFL': 'AMENDMENT OF FEDERAL LIEN', 'ASPM': 'ASSUMPTION OF MORTGAGE', 'ASST': 'ASSIGNMENT, MORTGAGE', 'ASTU': 'UNIT ASSIGNMENT', 'ASUM': 'UCC3 ASSUMPTION', 'BOND': 'BOND', 'BRUP': 'UCC3 BANKRUPTCY', 'CERR': 'CERTIFICATE OF REDUCTION', 'CNFL': 'CONTINUATION OF FEDERAL LIEN', 'CERT': 'CERTIFICATE', 'CNTR': 'CONTRACT OF SALE', 'CODP': 'CONDEMNATION PROCEEDINGS', 'CONS': 'CONSENT', 'CONT': 'UCC3 CONTINUATION', 'CTOR': 'COURT ORDER', 'DCTO': 'COURT ORDER ADVERSE POSS.', 'DECL': 'DECLARATION', 'DEED': 'DEED', 'DEMM': 'DECLARATION OF MODIFI OF MRT', 'DTL': 'DISCHARGE OF TAX LIEN', 'EASE': 'EASEMENT', 'FL': 'FEDERAL LIEN-IRS', 'FTL': 'FEDERAL LIEN, OTHER', 'IDED': 'IN REM DEED', 'INIC': 'INITIAL COOP UCC1', 'INIT': 'INITIAL UCC1', 'JUDG': 'JUDGMENT', 'LDMK': 'LANDMARK DESIGNATION', 'LEAS': 'LEASE', 'LIC': 'LICENSE', 'LTPA': 'LETTERS  PATENT', 'MAPS': 'MAPS', 'MERG': 'MERGER', 'MISC': 'MISCELLANEOUS', 'MMTG': 'MASTER MORTGAGE', 'MTGE': 'MORTGAGE', 'PAT': 'POWER OF ATTORNEY', 'PRFL': 'PARTIAL RELEASE OF FED LIEN', 'PSAT': 'PARTIAL SATISFACTION', 'PSGN': 'UCC3 PARTIAL ASSIGNMENT', 'REL': 'RELEASE', 'RFL': 'RELEASE OF FEDERAL LIEN', 'RESO': 'RESOLUTION', 'RFTL': 'RELEASE OF FEDERAL TAX LIEN', 'RLSE': 'UCC3 RELEASE/UCC AMENDMENT', 'RPAT': 'REVOCATION OF POWER OF ATTORNE', 'RTXL': 'RELEASE OF ESTATE TAX LIEN', 'SAGE': 'SUNDRY AGREEMENT', 'SAT': 'SATISFACTION OF MORTGAGE', 'SMIS': 'SUNDRY MISCELLANEOUS', 'SMTG': 'SUNDRY MORTGAGE', 'STP': 'STREET PROCEDURE', 'SUBL': 'SUBORDINATION OF LEASE', 'SUBO': 'UCC3 SUBORDINATION', 'TLS': 'TAX LIEN SALE CERTIFICATE', 'TERM': 'UCC3 TERMINATION', 'TERT': 'TERMINATION OF TRUST', 'UCC1': 'UNIFORM COMMERCIAL CODE 1', 'UCC3': 'UNIFORM COMMERCIAL CODE 3', 'VAC': 'VACATE ORDER', 'WILL': 'CERTIFIED COPY OF WILL', 'ASGN': 'UCC3 ASSIGNMENT', 'ASSTO': 'ASSIGNMENT OF LEASE', 'WSAT': 'WITHHELD SATISFACTION', 'RETT': 'NYS REAL ESTATE TRANSFER TAX', 'RPTT': 'NYC REAL PROPERTY TRANSFER TAX', 'CDEC': 'CONDO DECLARATION', 'AL&R': 'ASSIGNMENT OF LEASES AND RENTS', 'DEEDO': 'DEED, OTHER', 'AMTX': 'ADDITIONAL MORTGAGE TAX', 'AMND': 'UCC3 AMENDMENT', 'AMTL': 'AMENDMENT OF TAX LIEN', 'ATL': 'ASSIGNMENT OF TAX LIEN', 'RPTT&RET': 'BOTH RPTT AND RETT', 'CORR': 'CORRECTION DOC-OFFICE USE ONLY', 'CORP': 'UCC 5 CORRECTION STATEMENT', 'ZONE': 'ZONING LOT DESCRIPTION', 'AALR': 'ASGN OERM OF LIEN OF COMMON CHARGES', 'DEVR': 'DEVELOPMENT RIGHTS', 'DECM': 'DECLARATION OF MERGER', 'MLEA': 'MEMORANDUM OF LEASE', 'MCON': 'MEMORANDUM OF CONTRACT', 'M&CON': 'MORTGAGE AND CONSOLIDATION', 'SPRD': 'MORTGAGE SPREADER AGREEMENT', 'TL&R': 'TERMINATION OF ASSIGN OF L&R', 'SUBM': 'SUBORDINATION OF MORTGAGE', 'PREL': 'PARTIAL RELEASE OF MORTGAGE', 'ACON': 'ASSIGN/TERM OF CONTRACT/BID', 'CORRD': 'CORRECTION DEED', 'CORRM': 'CORRECTION MORTGAGE', 'CONDEED': 'CONFIRMATORY DEED', 'REIT': 'REAL ESTATE INV TRUST DEED', 'TERL': 'TERMINATION OF LEASE OR MEMO', 'ESTL': 'ESTOPPEL FOR OFFICE USE ONLY', 'XXXX': 'APPRT BREAKDWN OFFICE USE ONLY', 'CMTG': 'COLLATERAL MORTGAGE', 'WFL': 'WITHDRAWAL OF A FED LIEN', 'ESRM': 'ESTOPPAL REMOVAL OFFICE USE ON', 'NTXL': 'NOTICE OF  ESTATE TAX LIEN', 'NAPP': 'NOTICE OF APPROPRIATION', 'TERA': 'TERMINATION OF AGREEMENT', 'RCRFL': 'REVOCATION OF CERTIF.OF RFL', 'DEED COR': 'CORRECT  INDEX / DEED - OFFICE USE', 'DEED, LE': 'LIFE ESTATE DEED', 'CORR, LE': 'CORRECT LIFE ESTATE OFFICE USE', 'DEED, TS': 'TIMESHARE DEED', 'UCC ADEN': 'UCC COOPERATIVE ADDENDUM', 'TERDECL': 'TERM.OF CONDO DECLARATION', 'NAFTL': 'CERT NONATTCHMENT FED TAX LIEN', 'APPRT': 'APP.ORDER BREAKDWN OFFICE USE', 'AIRRIGHT': 'AIR RIGHTS', 'SI CORR': 'SI BILLING UPDATE OFFICE USE', 'PWFL': 'PARTIAL WITHDRAWL OF FED LIEN', 'PRCFL': 'PARTIAL REVOCATION OF CERT RFL', 'DPFTL': 'DISCHARGE OF PROPERTY FROM FTL', 'DEEDP': 'DEED, PRE RPT TAX', 'TORREN': 'TORREN', 'DEED, RC': 'DEED WITH RESTRICTIVE COVENANT', 'SCDEC': 'DECLARATION OF CONDO IN CONDO' };
                return doc_type_dict[string];
                break;
            case 'job__':
                return `<a href = "http://a810-bisweb.nyc.gov/bisweb/JobsQueryByNumberServlet?passjobnumber=${string}"  target="_blank">${string}</a>`;
                break;
            case 'document_id':
                return `<a href = "https://a836-acris.nyc.gov/DS/DocumentSearch/DocumentImageView?doc_id=${string}" target="_blank">${string}</a>`;
                break;
            default:
                return string;
        };
    }

    cols.map(function (col) {
        headerRow += '<th>' + capitalizeFirstLetter(col) + '</th>';
    });

    json.map(function (row) {
        bodyRows += '<tr>';

        cols.map(function (colName) {
            bodyRows += '<td>' + checkifNumber(row[colName], colName) + '</td>';
        })

        bodyRows += '</tr>';
    });

    return '<table class="' +
        classes +
        '"><thead><tr>' +
        headerRow +
        '</tr></thead><tbody>' +
        bodyRows +
        '</tbody></table>';
};

function CreateTableFromDICT(dict, ls) {
    if (ls.length == 0) {
        table = '<table class = "table">' + '<tbody>'
        for (var key in dict) {
            table += '<tr>';
            table += '<td>' + key + '</td>';
            table += '<td>' + dict[key] + '</td>';
            table += '</tr>';
        }
        table += '</tbody>' + '</table>'
    } else {
        table = '<table class = "table">' + '<tbody>'
        for (var i in ls) {
            table += '<tr>';
            table += '<td>' + ls[i] + '</td>';
            table += '<td>' + dict[ls[i]] + '</td>';
            table += '</tr>';
        }
        table += '</tbody>' + '</table>'
    }
    return table
};

function CreateInfoTabData(dict) {
    switch (dict['BoroCode']) {
        case 1:
            var Boro = 'Manhattan';
            break;
        case 2:
            var Boro = 'Bronx';
            break;
        case 3:
            var Boro = 'Brooklyn';
            break;
        case 4:
            var Boro = 'Queens';
            break;
        case 5:
            var Boro = 'Staten Island';
            break;
    }
    var k = '<h2>' + dict['Address'] + ', ' + dict['ZipCode'] + '</h2>';
    k += '<p>' + Boro + ' (Borough ' + dict['BoroCode'] + ') | Block ' + dict['Block'] + ' | Lot ' + dict['Lot'] + '</p>'
    k += '<p>' + 'BBL: ' + dict['BBL'] + '</p>'
    k += '<h4>Building Information</h4>';
    var list_info = ["OwnerName", "LandUse", "BldgClass", "YearBuilt","ZoneDist1","ZoneDist2"];
    k += CreateTableFromDICT(dict, list_info);
    k += '<h4>Development</h4>';
    var list_info = ["BuiltFAR", "ResidFAR", "CommFAR", "FacilFAR", "LotFront", "LotDepth", "LotArea"];
    k += CreateTableFromDICT(dict, list_info);
    k += '<h4>Other</h4>';
    k += CreateTableFromDICT(dict, []);

    document.getElementById('infoData').innerHTML = k;
};
function CreateTimelineDataDoc(doc_id) {
    // var doc_id = 'FT_1650008680365'
    var request = new XMLHttpRequest();
    request.open('GET', `https://data.cityofnewyork.us/resource/bnx9-e6tj.json?document_id=${doc_id}`, /* async = */ false);
    request.send();
    if (request.readyState == 4 & request.status == 200) {
        var res = request.responseText;
        var json = JSON.parse(res);
    };
    var request = new XMLHttpRequest();
    request.open('GET', `https://data.cityofnewyork.us/resource/636b-3b5g.json?document_id=${doc_id}`, /* async = */ false);
    request.send();
    if (request.readyState == 4 & request.status == 200) {
        var res = request.responseText;
        var party_json = JSON.parse(res);
        var party1_type = [];
        var party2_type = [];
        var party3_type = [];
        for (var i in party_json) {
            if (party_json[i]["party_type"] == 1) {
                json[0]['party1_type'] = party_json[i]["name"];
            } else if (party_json[i]["party_type"] == 2) {
                json[0]['party2_type'] = party_json[i]["name"];
            } else {
                json[0]['party3_type'] = party_json[i]["name"];
            }
        };
    };
    return json[0];
};
function CreateTimelineARCIS(boro, block, lot) {

    var request = new XMLHttpRequest();
    request.open('GET', `https://data.cityofnewyork.us/resource/8h5j-fqxa.json?borough=${boro}&block=${block}&lot=${lot}`, /* async = */ false);

    request.send();
    if (request.readyState == 4 & request.status == 200) {
        var res = request.responseText;
        var json = JSON.parse(res);
        for (var i in json) {
            var doc_id = json[i]["document_id"];
            var doc_data = CreateTimelineDataDoc(doc_id);
            json[i] = Object.assign({}, json[i], doc_data);
        }
        var json = json.sort(sortByProperty('recorded_datetime'));
        var cols = ['document_id', 'recorded_datetime', 'doc_type', 'document_amt', 'party1_type', 'party2_type']
        document.getElementById('TimelineData').innerHTML = json2table(json, 'table', cols);
        // document.getElementById('TimelineData').innerHTML = JSON.stringify(json,null,2);
    }
    return json

};
function CreateTimelineDataDOB(boro, block, lot) {
    // var doc_id = 2019101100297005
    switch (boro) {
        case 1:
            var boro = 'MANHATTAN';
            break;
        case 2:
            var boro = 'BRONX';
            break;
        case 3:
            var boro = 'BROOKLYN';
            break;
        case 4:
            var boro = 'QUEENS';
            break;
        case 5:
            var boro = 'STATEN ISLAND';
            break;
    }
    var block = pad(block, 5)
    var lot = pad(lot, 5)
    var request = new XMLHttpRequest();
    request.open('GET', `https://data.cityofnewyork.us/resource/ic3t-wcy2.json?borough=${boro}&block=${block}&lot=${lot}`, /* async = */ false);

    request.send();
    if (request.readyState == 4 & request.status == 200) {
        var res = request.responseText;
        var json = JSON.parse(res);
        var json = json.sort(sortByProperty('filing_date'));
        var cols = ['job__', 'fully_permitted', 'job_type', 'job_status_descrp', 'other_description', 'initial_cost'];
        document.getElementById('DOBData').innerHTML = json2table(json, 'table', cols);
        // document.getElementById('DOBData').innerHTML = JSON.stringify(json, null, 2);
    }
    return json

};


var bounds = [
    [-74.5000, 42.0000], // Southwest coordinates
    [-73.0000, 40.0000] // Northeast coordinates$
];

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/berncool/cjprqhxat31ki2qo47u6wvl1k', // stylesheet location
    center: [-73.987, 40.72837], // starting position [lng, lat]
    pitch: 0,
    bearing: 0,
    zoom: 15 // starting zoom
    // maxBounds: bounds
});

map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);
map.addControl(new mapboxgl.NavigationControl());
// map.addControl(new mapboxgl.FullscreenControl());
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
    map.addSource('ozone', {
        type: 'vector',
        url: 'mapbox://berncool.6fpvh816'
    });

    map.addLayer({
        'id': 'ozone-borders',
        'type': 'line',
        'source': 'ozone',
        'source-layer': 'OZone-dralst',
        'layout': {},
        'paint': {
            'line-color': "red",
            'line-width': 2,
            "line-dasharray": [3, 4],
            
        },
    });
    map.addLayer({
        'id': 'pluto-fills',
        'type': 'fill',
        'source': 'pluto',
        'source-layer': 'pluto_19-2mq30a',
        'layout': {},
        'paint': {
            'fill-color': [
                "match",
                ["get", "LandUse"],
                ["01", "02", "03"],
                "hsla(65, 82%, 85%, 0.3)",
                ["04"],
                "hsla(29, 85%, 65%, 0.3)",
                ["05"],
                "hsla(360, 70%, 85%, 0.3)",
                ["07", "06", "08"],
                "hsla(239, 82%, 81%, 0.3)",
                ["09", "10"],
                "hsla(118, 100%, 80%, 0.5)",
                ["11"],
                "hsla(180, 100%, 54%, 0.5)",
                "hsla(0, 0%, 95%, 0.3)"
            ]
        },
    });
    map.addLayer({
        'id': 'pluto-borders',
        'type': 'line',
        'source': 'pluto',
        'source-layer': 'pluto_19-2mq30a',
        'layout': {},
        'paint': {
            'line-color': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                '#f15b5b',
                '#cecece'
            ],
            'line-width': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                2,
                0.25
            ]
        },
    });
    var toggleableLayerIds = ['pluto-fills', 'price_zfa', 'ozone-borders'];

    for (var i = 0; i < toggleableLayerIds.length; i++) {
        var id = toggleableLayerIds[i];

        var link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.textContent = id;

        link.onclick = function (e) {
            var clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

            var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            } else {
                this.className = 'active';
                map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
            }
        };

        var layers = document.getElementById('menu');
        layers.appendChild(link);
    }



});

var hoveredStateId = null;
map.on('click', 'pluto-fills', function (e) {
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
    var Objdict = displayFeatures[0]['properties'];
    var boro = Objdict['BoroCode'];
    var block = Objdict['Block'];
    var lot = Objdict['Lot'];
    // CreateTablefromListDict(CreateTimelineDataBBL(boro,block,lot));
    CreateInfoTabData(Objdict);
    CreateTimelineARCIS(boro, block, lot);
    CreateTimelineDataDOB(boro, block, lot);


    // CreateTableFromDICT(displayFeatures[0]['properties']);
    // document.getElementById('features').innerHTML = JSON.stringify(
    //     displayFeatures,
    //     null,
    //     2
    // );
});

map.on('mousemove','pluto-fills', function (e) {
    if (e.features.length > 0) {
        if (hoveredStateId) {
            map.setFeatureState(
                { source: 'pluto', id: hoveredStateId, sourceLayer: 'pluto_19-2mq30a'},
                { hover: false }
            );
        }
        hoveredStateId = e.features[0].id;
        map.setFeatureState(
            { source: 'pluto', id: hoveredStateId, sourceLayer: 'pluto_19-2mq30a' },
            { hover: true }
        );
    }
});

map.on('mouseleave', 'pluto-fills',function () {
    if (hoveredStateId) {
        map.setFeatureState(
            { source: 'pluto', id: hoveredStateId, sourceLayer: 'pluto_19-2mq30a' },
            { hover: false }
        );
    }
    hoveredStateId = null;
});


