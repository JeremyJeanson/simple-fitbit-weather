import { Weather } from "../common";
import { Providers } from "./types";
export declare function fetchWeather(provider: Providers, apiKey: string): Promise<Weather>;
