import { Weather } from "../../common";
/**
 * Fetch data from Weather bit
 */
export declare function fetchWeather(apiKey: string, latitude: number, longitude: number): Promise<Weather>;
