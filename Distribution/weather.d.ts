import { Weather, Providers } from "./common";
export declare function fetchWeather(provider: Providers, apiKey: string): Promise<Weather>;
