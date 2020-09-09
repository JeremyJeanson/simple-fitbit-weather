/**
 * Providers
 */
export declare enum Providers {
    openweathermap = "owm",
    darksky = "darksky",
    weatherbit = "weatherbit"
}
/**
 * Companion configuration
 */
export interface Configuration {
    provider: Providers;
    apiKey: string;
    refreshInterval: number;
    maximumAge: number;
}
