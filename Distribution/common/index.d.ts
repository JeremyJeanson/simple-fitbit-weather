/**
 * File name
 */
export declare const WEATHER_FILE = "weather.cbor";
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
