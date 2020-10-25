
# Simple Fitbit Weather
[![npm](https://img.shields.io/npm/dw/simple-fitbit-weather.svg?logo=npm&label=npm%20version)](https://www.npmjs.com/package/simple-fitbit-weather)

## Introduction
The goal of this project is to simplify access to weather data inside Fitbit OS applications.

The code to get weather from API provider is based on [fitbit-weather](https://github.com/gregoiresage/fitbit-weather).

The main differences are :
- This module was made to reduce work on Fitbit devices (client app script size and memory usage).
- Periodic update is made by the companion app.
- The companion app refresh weather data when the user opens the mobile application.
- It is built with TypeScript.
- It includes types definitions and comments to show documentation in Visual Studio Code.
- Weather providers are declared in specific files (you could pull request to add new providers with less impact on the existing code).

## Providers and Data format
Weather providers available at this time :
- [Open Weather](https://openweathermap.org/api).
- [Weather bit](https://www.weatherbit.io/).

Provider list could be extended, the list is not closed. Open an issue if you have ideas of providers that could be added (or pull request if you know TypeScript).

## How does it work?
The companion application is responsible for :
- Fetching data from weather API.
- Periodicity refreshes data.
- Refresh data when the Fitbit mobile app is open.
- Send new data to the Fitbit Device.

The Fitbit app only has to read local data. I receive notification when the UI has to be updated with new data.

Via the companion application, you could set :
- Refresh intervals (for background tasks).
- Data age (to avoid too many call to the API. If the mobile app has fresh data, it will not call the provider).

## Installation
## 1. Install the module
You could use any package manager to install this module. It was tested with npm, pnpm and yarn.

```sh
npm install simple-fitbit-weather --save-dev
```

## 2. Request user's permissions
Your application should have access to :
- `access_internet` : requested to download weather data.
- `access_location` : requested to know the location of the user to download weather data.
- `run_background` : requested to allow task to run in the background on the mobile.

Your `package.json` should be like this (you could request more permissions, it is not a problem) : 
Exemple :
```json
{
    "requestedPermissions": [
      "run_background",
      "access_location",
      "access_internet"]
}
```

If permissions are not well set, you will not have exceptions :
- The user will not have weather data.
- Condition will be `Unknown`.
- Others data will stay empty or `0` for numéric values.

## 3. Initialize the companion app
Inside the `companion` folder the `index.ts` file have to :
- Import the module.
- Initialize the module.

Exemple :
```ts
import * as weather from "simple-fitbit-weather/companion";
// Init weather
weather.initialize({
    provider: weather.Providers.openweathermap, // Use Open Weather
    apiKey: "Add your API key here",
    maximumAge: 50, // If data has less than 50 minutes age, it will not download new data
    refreshInterval: 60 // Refresh each 60 minutes, when data is too old
});
```

## 4. Initialize the device app
Import the module and call the `initialize` method.

Exemple :
```ts
import * as simpleWeather from "simple-fitbit-weather/app";
simpleWeather.initialize(applyWeather);
function applyWeather(weather: simpleWeather.Weather): void {
  // Return if no data
  if (weather === undefined) return;
  // User weather object to refresh your UI
  // ...
}
```
When the Fitbit device boot, the `applyWeather` method will be called if data were previously downloaded.

The TypeScript interface of Weather:
```typescript
/**
 * Weather data
 */
export interface Weather {
    temperatureC: number;
    temperatureF: number;
    location: string;
    description: string;
    isDay: boolean;
    conditionCode: number;
    realConditionCode: string;
    sunrise: number;
    sunset: number;
    timestamp: number;
}
```

## 5. Manual access to the last data
If you have to do periodic calculations, you could request access to last weather out of the `applyWeather` callback.

To make it easier, this module exposes a property `last` of type `Weather`.

It is `undefined` if none data are available.

## Compatibility with weather-bit
Conditions, providers, and weather data an prodiver list are similar to [fitbit-weather](https://github.com/gregoiresage/fitbit-weather) to simplify acces for Javascript developers.

### Data format
Exemple:
```json
/**
 * Weather samples from fitbit-weather
 */
  {
    "temperatureC": 15,
    "temperatureF": 59,
    "location": "Castelnau-D'Estretefonds",
    "description": "Mostly Clear",
    "isDay": false,
    "conditionCode": 0,
    "realConditionCode": "this is the real conditioncode returned by the provider",
    "sunrise": 1507442496594,
    "sunset": 1507483356594,
    "timestamp": 1507496916594
  }
```

### Conditions
Unknown was defined at 9, to reduce messages size.
```typescript
/**
 * Conditions
 */
export const Conditions = {
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
```

# Compilation
This module was built with TypeScript. It uses Typescript to generate JavaScript files that are imported by the Fitbit SDK.
It includes the following npm scripts to:
- build (generate JavaScript files and copy all requested files to the `./distribution` directory)
- clean (remove generated files from the `./distribution` directory).
Those jobs are made by Github Actions to publish the module to [NPMJS](https://www.npmjs.com/package/simple-fitbit-weather).