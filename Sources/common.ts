import { existsSync, readFileSync } from "fs";

// File name
export const WEATHER_FILE = "weather.cbor";

// Providers
export enum Providers {
    openweathermap = "owm",
    darksky = "darksky",
    weatherbit = "weatherbit"
}

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
    Unknown: 999999999,
};

// Companion configuration
export interface Configuration {
    provider: Providers;
    apiKy: string;
    refreshInterval: number;
    maximumAge: number;
}

// Weather data
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

// Load file if available
export function loadFile(): Weather {
    try {
        // Test if file exists
        if (existsSync(WEATHER_FILE)) {
            return readFileSync(WEATHER_FILE, "cbor");
        }
    }
    catch (ex) {
        // Log error
        console.error(JSON.stringify(ex));
    }
    return undefined;
}