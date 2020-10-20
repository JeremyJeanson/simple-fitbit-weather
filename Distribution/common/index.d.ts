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
    /**
     * Temperature as °C
     */
    temperatureC: number;
    /**
     * Temperature as °K
     */
    temperatureF: number;
    /**
     * Location found
     */
    location: string;
    /**
     * Full description of weather sitation
     */
    description: string;
    /**
     * Situation for the full day
     */
    isDay: boolean;
    /**
     * Condition code, refre to ths Conditions const
     */
    conditionCode: number;
    /**
     * Code of the real condition
     */
    realConditionCode: string;
    /**
     * Date of sunrise
     */
    sunrise: number;
    /**
     * Date of sunset
     */
    sunset: number;
    /**
     * Date of curretn data
     */
    timestamp: number;
}
