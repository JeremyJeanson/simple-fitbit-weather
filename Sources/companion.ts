import { me as companion } from "companion";
import { outbox } from "file-transfer";
import * as cbor from "cbor";
import { writeFileSync } from "fs";
import { WEATHER_FILE, Providers, Configuration, Weather, loadFile } from "./common";
import * as weatherClient from "./weather";

const MILLISECONDS_PER_MINUTE = 1000 * 60;

// Current configuration
let _configuration: Configuration;

// Initialize the module
export function initialize(configuration: Configuration) {
    // Save the configuration
    _configuration = configuration;

    // Chek persissions
    if (companion.permissions.granted("run_background")) {
        // Check interval
        if (_configuration.refreshInterval > 0) {
            // Set periodic refresh (interfval as minutes)
            companion.wakeInterval = MILLISECONDS_PER_MINUTE * _configuration.refreshInterval;
            companion.onwakeinterval = (e) => refresh();
        }
    } else {
        console.warn("We're not allowed to access to run in the background!");
    }

    // Call the first refresh
    refresh();
}

// Refresh weather data
export function refresh() {
    // load the weather from file
    const cachedWeather = loadFile();

    // Update if data are too old or undfined
    if (cachedWeather === undefined
        || cachedWeather.timestamp + _configuration.maximumAge < Date.now()) {
        // Call the api 
        weatherClient.fetchWeather(_configuration.provider, _configuration.apiKy)
            .then(data => saveAndSend(data))
            .catch(error => console.error(JSON.stringify(error)));
    }
}

// Send data to this device app
function saveAndSend(data: Weather) {
    // Write the file to have a local cache
    try {
        writeFileSync(WEATHER_FILE, data, "cbor");
    }
    catch (error) {
        console.error(JSON.stringify(error));
    }
    // Encode data as cbor and send it as file
    outbox.enqueue(WEATHER_FILE, cbor.encode(data));
}