import { Configuration } from "./types";
export { Configuration, Providers } from "./types";
/**
 * Initialize the module
 * @param configuration to use with the weather API
 */
export declare function initialize(configuration: Configuration): void;
/**
 * Refresh weather data
 */
export declare function refresh(): void;
