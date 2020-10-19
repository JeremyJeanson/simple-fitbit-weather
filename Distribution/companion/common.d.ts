/**
* Trace (for debug mod)
* @param message to show in the console
*/
export declare function trace(message: unknown): void;
/**
 * Providers
 */
export declare enum Providers {
    openweathermap = "owm",
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
