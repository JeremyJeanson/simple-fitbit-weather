import { Conditions, Weather } from "../common";

const mapping_codes = {
    200: Conditions.Thunderstorm,
    201: Conditions.Thunderstorm,
    202: Conditions.Thunderstorm,
    210: Conditions.Thunderstorm,
    211: Conditions.Thunderstorm,
    212: Conditions.Thunderstorm,
    221: Conditions.Thunderstorm,
    230: Conditions.Thunderstorm,
    231: Conditions.Thunderstorm,
    232: Conditions.Thunderstorm,

    300: Conditions.Snow,
    301: Conditions.Snow,
    302: Conditions.Snow,
    310: Conditions.Snow,
    311: Conditions.Snow,
    312: Conditions.Snow,
    313: Conditions.Snow,
    314: Conditions.Snow,
    321: Conditions.Snow,

    500: Conditions.Rain,
    501: Conditions.Rain,
    502: Conditions.Rain,
    503: Conditions.Rain,
    504: Conditions.Rain,
    511: Conditions.Rain,
    520: Conditions.ShowerRain,
    521: Conditions.ShowerRain,
    522: Conditions.ShowerRain,
    531: Conditions.ShowerRain,

    600: Conditions.Snow,
    601: Conditions.Snow,
    602: Conditions.Snow,
    611: Conditions.Snow,
    612: Conditions.Snow,
    615: Conditions.Snow,
    616: Conditions.Snow,
    620: Conditions.Snow,
    621: Conditions.Snow,
    622: Conditions.Snow,

    701: Conditions.Mist,
    711: Conditions.Mist,
    721: Conditions.Mist,
    731: Conditions.Mist,
    741: Conditions.Mist,
    // 751: ,
    // 761: ,
    // 762: ,
    // 771: ,
    // 781: ,

    800: Conditions.ClearSky,

    801: Conditions.FewClouds,
    802: Conditions.ScatteredClouds,
    803: Conditions.BrokenClouds,
    804: Conditions.BrokenClouds
};

export function fetchWeather(apiKey: string, latitude: number, longitude: number): Promise<Weather> {
    return new Promise<Weather>((resolve, reject) => {
        const url = 'https://api.openweathermap.org/data/2.5/weather?appid=' + apiKey + '&lat=' + latitude + '&lon=' + longitude

        fetch(encodeURI(url))
            .then(response => response.json())
            .then(data => {

                if (data.weather === undefined) {
                    reject(data.message)
                    return
                }

                const condition = mapping_codes[data.weather[0].id];

                const weather: Weather = {
                    temperatureC: data.main.temp - 273.15,
                    temperatureF: (data.main.temp - 273.15) * 9 / 5 + 32,
                    location: data.name,
                    description: data.weather[0].description,
                    isDay: (data.dt > data.sys.sunrise && data.dt < data.sys.sunset),
                    conditionCode: condition !== undefined ? condition : Conditions.Unknown,
                    realConditionCode: data.weather[0].id,
                    sunrise: data.sys.sunrise * 1000,
                    sunset: data.sys.sunset * 1000,
                    timestamp: Date.now()
                }

                // Send the weather data to the device
                resolve(weather)
            })
            .catch(e => reject(e.message))
    });
}