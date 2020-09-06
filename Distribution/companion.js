import { me as companion } from "companion";
import { outbox } from "file-transfer";
import * as cbor from "cbor";
import * as messaging from "messaging";
import { localStorage } from "local-storage";
import { WEATHER_FILE, MESSAGE_TYPE } from "./common";
import * as weatherClient from "./weather";
export { Providers } from "./common";
var MILLISECONDS_PER_MINUTE = 1000 * 60;
var STORAGE_KEY = "weather";
var _configuration;
export function initialize(configuration) {
    _configuration = configuration;
    if (companion.permissions.granted("run_background")) {
        if (_configuration.refreshInterval >= 5) {
            companion.wakeInterval = MILLISECONDS_PER_MINUTE * _configuration.refreshInterval;
            companion.addEventListener("wakeinterval", function (e) { return refresh(); });
        }
    }
    else {
        console.warn("We're not allowed to access to run in the background!");
    }
    console.log("Weather initialized!");
    refresh();
}
export function refresh() {
    var cachedWeather = loadCache();
    if (cachedWeather === undefined
        || cachedWeather.timestamp + (_configuration.maximumAge * 60 * 1000) <= Date.now()) {
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
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        var message = {
            type: MESSAGE_TYPE,
            weather: data
        };
        messaging.peerSocket.send(message);
    }
    else {
        outbox.enqueue(WEATHER_FILE, cbor.encode(data));
    }
}
