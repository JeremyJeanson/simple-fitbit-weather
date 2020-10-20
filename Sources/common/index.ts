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