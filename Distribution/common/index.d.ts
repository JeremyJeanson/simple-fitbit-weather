/**
 * Trace (for debug mod)
 * @param message to show in the console
 */
export declare function trace(message: any): void;
/**
 * File name
 */
export declare const WEATHER_FILE = "weather.cbor";
/**
 * Providers
 */
export declare enum Providers {
    openweathermap = "owm",
    darksky = "darksky",
    weatherbit = "weatherbit"
}
/**
 * Conditions
 */
export declare const Conditions: {
    ClearSky: number;
    FewClouds: number;
    ScatteredClouds: number;
    BrokenClouds: number;
    ShowerRain: number;
    Rain: number;
    Thunderstorm: number;
    Snow: number;
    Mist: number;
    Unknown: number;
};
/**
 * Companion configuration
 */
export interface Configuration {
    provider: Providers;
    apiKey: string;
    refreshInterval: number;
    maximumAge: number;
}
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
/**
 * Message type (used in socket messages)
 */
export declare const MESSAGE_TYPE = "weather";
/**
 * Message send via socket via sockets
 */
export interface Message {
    type: string;
    weather: Weather;
}
