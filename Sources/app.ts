import { inbox } from "file-transfer"
import { WEATHER_FILE, Weather } from "./common";
import { existsSync, readFileSync } from "fs";

// Export to allow device app to use common types
export { Weather } from "./common";

// Callback to send data to the application
let _callback: (data: Weather) => void;

// initialize the module
export function initialize(callback: (data: Weather) => void): void {
    // Save callback
    _callback = callback;

    // Add listener to wait for new file
    inbox.onnewfile = (e) => {
        const file = inbox.nextFile(WEATHER_FILE);
        // Check the file name (in cas of error)
        if (file === WEATHER_FILE) {
            loadFileAndNotifyUpdate();
        }
    };

    // Load last file
    // Notify the application
    loadFileAndNotifyUpdate();
}

// Load the weather file and notifu the application of new weather data
function loadFileAndNotifyUpdate() {
    // load the weather from file
    const weather = loadFile();
    // notify the application
    _callback(weather);
}

// Load file if available
export function loadFile(): Weather {
    try {
        // Test if file exists
        if (existsSync(WEATHER_FILE)) {
            return readFileSync(WEATHER_FILE, "cbor");
        }
    }
    catch (ex) {
        // Log error
        console.error(JSON.stringify(ex));
    }
    return undefined;
}