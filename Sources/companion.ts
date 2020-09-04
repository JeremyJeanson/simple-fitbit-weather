import { me as companion } from "companion";
import { outbox } from "file-transfer";
import * as cbor from "cbor";
import { localStorage } from "local-storage";
import { WEATHER_FILE, Configuration, Weather } from "./common";
import * as weatherClient from "./weather";

const MILLISECONDS_PER_MINUTE = 1000 * 60;
const STORAGE_KEY = "weather";

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
    const cachedWeather = loadCache();

    // Update if data are too old or undfined
    if (cachedWeather === undefined
        || cachedWeather.timestamp + _configuration.maximumAge < Date.now()) {
        // Call the api 
        weatherClient.fetchWeather(_configuration.provider, _configuration.apiKy)
            .then(data => cacheAndSend(data))
            .catch(error => console.error(JSON.stringify(error)));
    }
}

// Load weather from cache
function loadCache(): Weather {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    }
    catch (error) {
        console.warn("Load weather file error : " + JSON.stringify(error));
        return undefined;
    }
}

// Send data to this device app
function cacheAndSend(data: Weather) {
    // Write the file to have a local cache
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    catch (error) {
        console.error("Set weather cache error :" +JSON.stringify(error));
    }
    // Encode data as cbor and send it as file
    outbox.enqueue(WEATHER_FILE, cbor.encode(data));
}