var _a;
import { Providers } from "./common";
import { geolocation } from "geolocation";
import * as openWMWeatherMap from "./Providers/open-weather-map";
import * as darkskyWeather from "./Providers/dark-sky";
import * as weatherbit from "./Providers/weatherbit";
var fetchFuncs = (_a = {},
    _a[Providers.openweathermap] = openWMWeatherMap.fetchWeather,
    _a[Providers.darksky] = darkskyWeather.fetchWeather,
    _a[Providers.weatherbit] = weatherbit.fetchWeather,
    _a);
export function fetchWeather(provider, apiKey) {
    return new Promise(function (resolve, reject) {
        var fetchFunc = fetchFuncs[provider];
        if (fetchFunc === undefined) {
            reject('Unsupported provider');
            return;
        }
        var positionOptions = {
            enableHighAccuracy: false,
            maximumAge: 1000 * 1800
        };
        geolocation.getCurrentPosition(function (position) {
            fetchFunc(apiKey, position.coords.latitude, position.coords.longitude)
                .then(resolve)
                .catch(reject);
        }, reject, positionOptions);
    });
}
