/**
* Trace (for debug mod)
* @param message to show in the console
*/
export function trace(message: unknown): void {
    console.warn(JSON.stringify(message));
}

/**
 * Providers
 */
export enum Providers {
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