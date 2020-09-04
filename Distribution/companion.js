import { me as companion } from "companion";
import { outbox } from "file-transfer";
import * as cbor from "cbor";
import { localStorage } from "local-storage";
import { WEATHER_FILE } from "./common";
import * as weatherClient from "./weather";
export { Providers } from "./common";
var MILLISECONDS_PER_MINUTE = 1000 * 60;
var STORAGE_KEY = "weather";
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
    var cachedWeather = loadCache();
    if (cachedWeather === undefined
        || cachedWeather.timestamp + _configuration.maximumAge < Date.now()) {
        weatherClient.fetchWeather(_configuration.provider, _configuration.apiKey)
            .then(function (data) { return cacheAndSend(data); })
            .catch(function (error) { return console.error(JSON.stringify(error)); });
    }
}
function loadCache() {
    try {
        var str = localStorage.getItem(STORAGE_KEY);
        if (str === null)
            return undefined;
        var weatcher = JSON.parse(str);
        if (str === null)
            return undefined;
        return weatcher;
    }
    catch (error) {
        console.warn("Load weather file error : " + JSON.stringify(error));
        return undefined;
    }
}
function cacheAndSend(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    catch (error) {
        console.error("Set weather cache error :" + JSON.stringify(error));
    }
    outbox.enqueue(WEATHER_FILE, cbor.encode(data));
}
