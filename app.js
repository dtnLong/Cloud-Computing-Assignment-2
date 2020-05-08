const EXPRESS = require("express");
const AWS = require("aws-sdk");

AWS.config.update({
    "region": "ap-southeast-1",
    "endpoint": "https://dynamodb.ap-southeast-1.amazonaws.com",
    "accessKeyId": "AKIAVW3JUAW4HQJ3FNLV",
    "secretAccessKey": "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"
})
const docClient = new AWS.DynamoDB.DocumentClient();
const APP = EXPRESS();

//var vietnam_table = [];

// function scanData(table) {
//     var params = {
//         TableName: table
//     }
//     docClient.scan(params, function(err,data) {
//         if (err) {
//             console.error("Unable to scan database. Error:", JSON.stringify(err, null, 2));
//         } else {
//             console.log("Scan succeeded.");
//             var scan_result = data["Items"];
//             return scan_result;
//         }
//     })
//     return result;
// }
//scanData("vietnam-covid19")

//Routing
APP.get('/', (req, res) => {
    res.sendFile('/front-end/home.html', {root: __dirname});
})

APP.get('/api/vietnam_table', (req, res) => {
    var vietnam_table = [];
    var params = {
        TableName: "vietnam-covid19"
    }
    docClient.scan(params, function(err,data) {
        if (err) {
            console.error("Unable to scan database. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Scan succeeded.");
            vietnam_table = data["Items"];
            res.json(vietnam_table);
        }
    })
});

APP.get('/api/vietnam_summary', (req, res) => {
    var confirmed = 0;
    var active = 0;
    var recovered = 0;
    var death = 0;
    var params = {
        TableName: "vietnam-covid19"
    }
    docClient.scan(params, function(err,data) {
        if (err) {
            console.error("Unable to scan database. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Scan succeeded.");
            data.Items.forEach(function(province) {
                confirmed = confirmed + parseInt(province["Infected case"]);
                active = active + parseInt(province["Active case"]);
                recovered = recovered + parseInt(province["Recovered case"]);
                death = death + parseInt(province["Death case"]);
            })
            var vietnam_summary = {
                confirmed: confirmed,
                active: active,
                recovered: recovered,
                death: death,
            };
            res.json(vietnam_summary);
        }
    })
});

APP.get('/api/world_table', (req, res) => {
    var world_table = [];
    var params = {
        TableName: "world-covid19"
    }
    docClient.scan(params, function(err,data) {
        if (err) {
            console.error("Unable to scan database. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Scan succeeded.");
            world_table = data["Items"];
            res.json(world_table);
        }
    })
})

APP.get('/api/world_summary', (req, res) => {
    var confirmed = 0;
    var active = 0;
    var recovered = 0;
    var death = 0;
    var params = {
        TableName: "world-covid19"
    }
    docClient.scan(params, function(err,data) {
        if (err) {
            console.error("Unable to scan database. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Scan succeeded.");
            data.Items.forEach(function(country) {
                confirmed = confirmed + parseInt(country["Confirmed"]);
                active = active + parseInt(country["Active"]);
                recovered = recovered + parseInt(country["Recovered"]);
                death = death + parseInt(country["Deaths"]);
            })
            var world_summary = {
                confirmed: confirmed,
                active: active,
                recovered: recovered,
                death: death,
            };
            res.json(world_summary);
        }
    })
});

//Set port
var port = process.env.PORT || 5000;

APP.listen(port, function () {
    console.log(`Server started on port ${port}`);
});
module.exports = APP;