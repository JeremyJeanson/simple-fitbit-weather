import { me as companion } from "companion";
import { outbox } from "file-transfer";
import * as cbor from "cbor";
import { writeFileSync } from "fs";
import { WEATHER_FILE, loadFile } from "./common";
import * as weatherClient from "./weather";
var MILLISECONDS_PER_MINUTE = 1000 * 60;
var _configuration;
export function initialize(configuration) {
    _configuration = configuration;
    if (companion.permissions.granted("run_background")) {
        if (_configuration.refreshInterval > 0) {
            companion.wakeInterval = MILLISECONDS_PER_MINUTE * _configuration.refreshInterval;
            companion.onwakeinterval = function (e) { return refresh(); };
        }
    }
    else {
        console.warn("We're not allowed to access to run in the background!");
    }
    refresh();
}
export function refresh() {
    var cachedWeather = loadFile();
    if (cachedWeather === undefined
        || cachedWeather.timestamp + _configuration.maximumAge < Date.now()) {
        weatherClient.fetchWeather(_configuration.provider, _configuration.apiKy)
            .then(function (data) { return saveAndSend(data); })
            .catch(function (error) { return console.error(JSON.stringify(error)); });
    }
}
function saveAndSend(data) {
    try {
        writeFileSync(WEATHER_FILE, data, "cbor");
    }
    catch (error) {
        console.error(JSON.stringify(error));
    }
    outbox.enqueue(WEATHER_FILE, cbor.encode(data));
}
