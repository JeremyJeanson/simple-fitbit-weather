import { Weather } from "../../common";
/**
 * Fetch data from Open Weather Map
 */
export declare function fetchWeather(apiKey: string, latitude: number, longitude: number): Promise<Weather>;
