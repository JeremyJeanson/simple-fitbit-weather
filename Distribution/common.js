export var WEATHER_FILE = "weather.cbor";
export var Providers;
(function (Providers) {
    Providers["openweathermap"] = "owm";
    Providers["darksky"] = "darksky";
    Providers["weatherbit"] = "weatherbit";
})(Providers || (Providers = {}));
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
    Unknown: 999999999,
};
