import { Weather } from "../common";
import { Providers } from "./common";
/**
 * Get weather
 * @param provider
 * @param apiKey
 */
export declare function fetchWeather(provider: Providers, apiKey: string): Promise<Weather>;
