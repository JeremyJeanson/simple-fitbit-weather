/**
 * Trace (for debug mod)
 * @param message to show in the console
 */
export function trace(message) {
    // console.warn(JSON.stringify(message));
}
/**
 * File name
 */
export var WEATHER_FILE = "weather.cbor";
/**
 * Providers
 */
export var Providers;
(function (Providers) {
    Providers["openweathermap"] = "owm";
    Providers["darksky"] = "darksky";
    Providers["weatherbit"] = "weatherbit";
})(Providers || (Providers = {}));
/**
 * Conditions
 */
export var Conditions = {
    ClearSky: 0,
    FewClouds: 1,
    ScatteredClouds: 2,
    BrokenClouds: 3,
    ShowerRain: 4,
    Rain: 5,
    Thunderstorm: 6,
    Snow: 7,
    Mist: 8,
    Unknown: 9,
};
/**
 * Message type (used in socket messages)
 */
export var MESSAGE_TYPE = "weather";
