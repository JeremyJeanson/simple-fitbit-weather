import { Weather } from "../common";
import { Providers } from "./common";
export declare function fetchWeather(provider: Providers, apiKey: string): Promise<Weather>;
