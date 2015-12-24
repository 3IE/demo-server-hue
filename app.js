// username:38ce84223cb30371648655e139ce843
/*
var hue = require("node-hue-api");

var displayBridges = function(bridge) {
    console.log("Hue Bridges Found: " + JSON.stringify(bridge));
};

// --------------------------
// Using a promise
hue.nupnpSearch().then(displayBridges).done();

// --------------------------
// Using a callback
hue.nupnpSearch(function(err, result) {
    if (err) throw err;
    displayBridges(result);
});
*/

var HueApi = require("node-hue-api").HueApi;
var  lightState = require("node-hue-api").lightState;
var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var hostname = "192.168.2.217",
    username = "38ce84223cb30371648655e139ce843",
    api,state = lightState.create();

	var displayError = function(err) {
    console.error(err);
};
	
api = new HueApi(hostname, username);

// --------------------------
// Using a promise
api.getFullState().then(displayResult).done();

api.setLightState(1, state.on(). rgb(255, 0, 0) )
    .then(displayResult)
    .fail(displayError)
    .done();

// or alias fullState()
/*api.fullState().then(displayResult).done();

// --------------------------
// Using a callback
api.getFullState(function(err, config) {
    if (err) throw err;
    displayResult(config);
});
// or alias fullState()
api.fullState(function(err, config) {
    if (err) throw err;
    displayResult(config);
});*/