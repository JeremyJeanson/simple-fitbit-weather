import { Weather } from "../../common";
export declare function fetchWeather(apiKey: string, latitude: number, longitude: number): Promise<Weather>;
