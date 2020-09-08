import { existsSync, readFileSync, writeFileSync } from "fs";
import { inbox } from "file-transfer";
import * as messaging from "messaging";
import { trace, WEATHER_FILE, Weather, Message, MESSAGE_TYPE } from "../common";

// Export to allow device app to use common types
export { Weather } from "../common";

// Callback to send data to the application
let _callback: (data: Weather) => void;

/**
 * Initialize the module
 * @param callback when weater data are available
 */
export function initialize(callback: (data: Weather) => void): void {
    // Save callback
    _callback = callback;

    // Load last file 
    // & Notify the application
    load();
}

/**
 * Add listener to wait for new file 
 */
inbox.addEventListener("newfile", () => {
    // Check the file name (in cas of error)
    if (inbox.nextFile() === WEATHER_FILE) load();
});

/**
 * Add listener to wait for message
 */
messaging.peerSocket.addEventListener("message", (e) => {
    // Get message data
    const message = e.data as Message;
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
export function loadFile(): Weather {
    try {
        // Test if file exists
        if (existsSync(WEATHER_FILE)) {
            const data = readFileSync(WEATHER_FILE, "cbor") as Weather;
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