import { me as companion } from "companion";
import { outbox } from "file-transfer";
import * as cbor from "cbor";
import * as messaging from "messaging";
import { localStorage } from "local-storage";
import { trace, WEATHER_FILE, MESSAGE_TYPE } from "../common";
import * as weatherClient from "./weather";
// Export to allow companion app to use common types
export { Providers } from "./common";
var MILLISECONDS_PER_MINUTE = 1000 * 60;
var STORAGE_KEY = "weather";
// Current configuration
var _configuration;
/**
 * Initialize the module
 * @param configuration to use with the weather API
 */
export function initialize(configuration) {
    // Save the configuration
    _configuration = configuration;
    // Chek persissions
    // if (companion.permissions.granted("run_background")) {
    //     // Check interval
    //     if (_configuration.refreshInterval >= 5) {
    //         // We are not allow to have an interval bellow 5
    //         // Set periodic refresh (interfval as minutes)
    //         companion.wakeInterval = MILLISECONDS_PER_MINUTE * _configuration.refreshInterval;
    //         companion.addEventListener("wakeinterval", (e) => refresh());
    //     }
    // } else {
    //     console.warn("We're not allowed to access to run in the background!");
    // }
    try {
        companion.wakeInterval = MILLISECONDS_PER_MINUTE * _configuration.refreshInterval;
        companion.addEventListener("wakeinterval", function (e) { return refresh(); });
    }
    catch (ex) {
        trace(ex);
    }
    // Call the refresh
    refresh();
}
/**
 * Refresh weather data
 */
export function refresh() {
    // load the weather from file
    var cachedWeather = loadCache();
    // Update if data are too old or undfined
    if (cachedWeather === undefined
        || cachedWeather.timestamp + (_configuration.maximumAge * 60 * 1000) <= Date.now()) {
        // Call the api 
        weatherClient.fetchWeather(_configuration.provider, _configuration.apiKey)
            .then(function (data) { return cacheAndSend(data); })
            .catch(function (ex) { return trace(ex); });
    }
}
/**
 * Load weather from cache
 */
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
    catch (ex) {
        trace("Load weather file error : " + ex);
        return undefined;
    }
}
/**
 * Send data to this device app
 * @param data to save and send to the app
 */
function cacheAndSend(data) {
    // Write the file to have a local cache
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    catch (ex) {
        trace("Set weather cache error :" + JSON.stringify(ex));
    }
    // Test if socket is open
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        // Send via socket
        var message = {
            type: MESSAGE_TYPE,
            weather: data
        };
        messaging.peerSocket.send(message);
    }
    else {
        // Encode data as cbor and send it as file
        outbox.enqueue(WEATHER_FILE, cbor.encode(data));
    }
}
