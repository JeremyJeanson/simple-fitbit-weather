import { Configuration } from "../common";
export { Configuration, Providers } from "../common";
/**
 * Initialize the module
 * @param configuration to use with the weather API
 */
export declare function initialize(configuration: Configuration): void;
/**
 * Refresh weather data
 */
export declare function refresh(): void;
