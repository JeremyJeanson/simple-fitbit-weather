var _a;
import { Providers } from "./common";
import { geolocation } from "geolocation";
// Import providers
import * as openWMWeatherMap from "./Providers/open-weather-map";
import * as weatherbit from "./Providers/weatherbit";
/**
 * Functions of supported providers
 */
var fetchFuncs = (_a = {},
    _a[Providers.openweathermap] = openWMWeatherMap.fetchWeather,
    _a[Providers.weatherbit] = weatherbit.fetchWeather,
    _a);
/**
 * Get weather
 * @param provider
 * @param apiKey
 */
export function fetchWeather(provider, apiKey) {
    // Create a promise to return
    return new Promise(function (resolve, reject) {
        // Check the provider to use
        var fetchFunc = fetchFuncs[provider];
        if (fetchFunc === undefined) {
            reject('Unsupported provider');
            return;
        }
        // Set geolocation options
        var positionOptions = {
            enableHighAccuracy: false,
            maximumAge: 1000 * 1800
        };
        // Get the current position
        geolocation.getCurrentPosition(function (position) {
            fetchFunc(apiKey, position.coords.latitude, position.coords.longitude)
                .then(resolve)
                .catch(reject);
        }, reject, positionOptions);
    });
}
