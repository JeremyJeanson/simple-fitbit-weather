import { existsSync, readFileSync, writeFileSync } from "fs";
import { inbox } from "file-transfer";
import * as messaging from "messaging";
import { WEATHER_FILE, MESSAGE_TYPE } from "../common";
// Callback to send data to the application
var _callback;
/**
 * Last weather data,
 * This property is 'undefined' when the weather has never been sent.
 */
export var last;
/**
* Trace (for debug mod)
* @param message to show in the console
*/
export function trace(message) {
    console.warn(JSON.stringify(message));
}
/**
 * Initialize the module
 * @param callback when weater data are available
 */
export function initialize(callback) {
    // Save callback
    _callback = callback;
    // Load last file 
    // & Notify the application
    load();
}
/**
 * Add listener to wait for new file
 */
inbox.addEventListener("newfile", function () {
    // Check the file name (in cas of error)
    if (inbox.nextFile() === WEATHER_FILE)
        load();
});
/**
 * Add listener to wait for message
 */
messaging.peerSocket.addEventListener("message", function (e) {
    // Get message data
    var message = e.data;
    // message.weather.description = "S";
    // Check message type
    if (message.type === MESSAGE_TYPE) {
        try {
            writeFileSync(WEATHER_FILE, message.weather, "cbor");
        }
        catch (ex) {
            trace(ex);
        }
        setWeather(message.weather);
    }
});
/**
 * Load the weather file and notifu the application of new weather data
 */
function load() {
    // load the weather from file
    // && Notify the application
    setWeather(loadFile());
}
/**
 * Load file if available
 */
export function loadFile() {
    try {
        // Test if file exists
        if (existsSync(WEATHER_FILE)) {
            var data = readFileSync(WEATHER_FILE, "cbor");
            // data.description = "F";
            return data;
        }
    }
    catch (ex) {
        // Log error
        trace(ex);
    }
    return undefined;
}
/**
 * Set the last weather and use the callback
 * @param data
 */
function setWeather(data) {
    last = data;
    _callback(data);
}
