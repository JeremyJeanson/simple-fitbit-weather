import { Conditions, Weather } from "../../common";

const mapping_codes = {
    'clear-day': Conditions.ClearSky,
    'clear-night': Conditions.ClearSky,
    'partly-cloudy-day': Conditions.FewClouds,
    'partly-cloudy-night': Conditions.FewClouds,
    'cloudy': Conditions.BrokenClouds,
    'rain': Conditions.Rain,
    'thunderstorm': Conditions.Thunderstorm,
    'snow': Conditions.Snow,
    'sleet': Conditions.Snow,
    'fog': Conditions.Mist
};

export function fetchWeather(apiKey: string, latitude: number, longitude: number): Promise<Weather> {
    return new Promise<Weather>((resolve, reject) => {
        const url = 'https://api.darksky.net/forecast/' + apiKey + '/' + latitude + ',' + longitude + '?exclude=minutely,hourly,alerts,flags&units=si';

        console.log(url);

        fetch(encodeURI(url))
            .then(response => response.json())
            .then(data => {

                if (data.currently === undefined) {
                    reject(data);
                    return;
                }

                let conditionCode = mapping_codes[data.currently.icon];
                if (conditionCode === undefined) conditionCode = Conditions.Unknown;

                const temp = data.currently.temperature;

                const weather: Weather = {
                    temperatureC: temp,
                    temperatureF: (temp * 9 / 5 + 32),
                    location: "",
                    description: data.currently.summary,
                    isDay: data.currently.time > data.daily.data[0].sunriseTime && data.currently.time < data.daily.data[0].sunsetTime,
                    conditionCode: conditionCode,
                    realConditionCode: data.currently.icon,
                    sunrise: data.daily.data[0].sunriseTime * 1000,
                    sunset: data.daily.data[0].sunsetTime * 1000,
                    timestamp: Date.now()
                };

                // retreiving location name from Open Street Map
                const url = 'https://nominatim.openstreetmap.org/reverse?lat=' + latitude + '&lon=' + longitude + '&format=json&accept-language=en-US';

                fetch(url)
                    .then(response => response.json())
                    .then(data => {

                        if (data.address.hamlet != undefined) weather.location = data.address.hamlet;
                        else if (data.address.village != undefined) weather.location = data.address.village;
                        else if (data.address.town != undefined) weather.location = data.address.town;
                        else if (data.address.city != undefined) weather.location = data.address.city;

                        // Send the weather data to the device
                        resolve(weather);
                    })
                    .catch(() => {
                        resolve(weather); // if location name not found - sending weather without location
                    });
            })
            .catch(e => reject(e.message));
    });
}