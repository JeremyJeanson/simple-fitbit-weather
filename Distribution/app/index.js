import { existsSync, readFileSync, writeFileSync } from "fs";
import { inbox } from "file-transfer";
import * as messaging from "messaging";
import { trace, WEATHER_FILE, MESSAGE_TYPE } from "../common";
// Callback to send data to the application
var _callback;
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
        _callback(message.weather);
    }
});
/**
 * Load the weather file and notifu the application of new weather data
 */
function load() {
    // load the weather from file
    // && Notify the application
    _callback(loadFile());
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
