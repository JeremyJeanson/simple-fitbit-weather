import { Weather } from "../common";
import { Providers } from "./common";
import { geolocation, PositionOptions } from "geolocation";

// Import providers
import * as openWMWeatherMap from "./Providers/open-weather-map";
import * as weatherbit from "./Providers/weatherbit";

// Functions of supported providers
const fetchFuncs = {
    [Providers.openweathermap]: openWMWeatherMap.fetchWeather,
    [Providers.weatherbit]: weatherbit.fetchWeather
};

// Get weather
export function fetchWeather(provider: Providers, apiKey: string): Promise<Weather> {
    // Create a promise to return
    return new Promise<Weather>((resolve, reject) => {
        // Check the provider to use
        const fetchFunc = fetchFuncs[provider];
        if (fetchFunc === undefined) {
            reject('Unsupported provider');
            return;
        }

        // Set geolocation options
        const positionOptions: PositionOptions = {
            enableHighAccuracy: false,
            maximumAge: 1000 * 1800
        };

        // Get the current position
        geolocation.getCurrentPosition(
            (position) => {
                fetchFunc(apiKey, position.coords.latitude, position.coords.longitude)
                    .then(resolve)
                    .catch(reject);
            },
            reject,
            positionOptions
        );
    });
}