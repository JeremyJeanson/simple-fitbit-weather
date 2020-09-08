import { Conditions } from "../../common";
var mapping_codes = {
    "200": Conditions.Thunderstorm,
    "201": Conditions.Thunderstorm,
    "202": Conditions.Thunderstorm,
    "230": Conditions.Thunderstorm,
    "231": Conditions.Thunderstorm,
    "232": Conditions.Thunderstorm,
    "233": Conditions.Thunderstorm,
    "300": Conditions.Snow,
    "301": Conditions.Snow,
    "302": Conditions.Snow,
    "500": Conditions.Rain,
    "501": Conditions.Rain,
    "502": Conditions.Rain,
    "511": Conditions.Rain,
    "520": Conditions.ShowerRain,
    "521": Conditions.ShowerRain,
    "522": Conditions.ShowerRain,
    "600": Conditions.Snow,
    "601": Conditions.Snow,
    "602": Conditions.Snow,
    "603": Conditions.Snow,
    "610": Conditions.Snow,
    "611": Conditions.Snow,
    "612": Conditions.Snow,
    "621": Conditions.Snow,
    "622": Conditions.Snow,
    "623": Conditions.Snow,
    "700": Conditions.Mist,
    "711": Conditions.Mist,
    "721": Conditions.Mist,
    "731": Conditions.Mist,
    "741": Conditions.Mist,
    "751": Conditions.Mist,
    "800": Conditions.ClearSky,
    "801": Conditions.FewClouds,
    "802": Conditions.ScatteredClouds,
    "803": Conditions.BrokenClouds,
    "804": Conditions.BrokenClouds,
    "900": Conditions.Unknown
};
export function fetchWeather(apiKey, latitude, longitude) {
    return new Promise(function (resolve, reject) {
        var url = 'https://api.weatherbit.io/v2.0/current?key=' + apiKey + '&lat=' + latitude + '&lon=' + longitude;
        fetch(encodeURI(url))
            .then(function (response) { return response.json(); })
            .then(function (data) {
            if (data.data === undefined || data.count !== 1) {
                reject(data.error);
                return;
            }
            var condition = mapping_codes[data.data[0].weather.code];
            var temp = data.data[0].temp;
            var weather = {
                temperatureC: temp,
                temperatureF: (temp * 9 / 5 + 32),
                location: data.data[0].city_name,
                description: data.data[0].weather.description,
                isDay: data.data[0].weather.icon.endsWith("d"),
                conditionCode: condition !== undefined ? condition : Conditions.Unknown,
                realConditionCode: data.data[0].weather.code,
                sunrise: data.data[0].sunrise,
                sunset: data.data[0].sunset,
                timestamp: Date.now()
            };
            // Send the weather data to the device
            resolve(weather);
        })
            .catch(function (e) { return reject(e.message); });
    });
}
