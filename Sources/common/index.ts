/**
 * Trace (for debug mod)
 * @param message to show in the console
 */
export function trace(message:any){
    // console.warn(JSON.stringify(message));
}

/**
 * File name
 */
export const WEATHER_FILE = "weather.cbor";

/**
 * Message type (used in socket messages)
 */
export const MESSAGE_TYPE = "weather";

/**
 * Message send via socket via sockets
 */
export interface Message {
    type: string;
    weather: Weather
}

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