import { Weather } from "../common";
export { Weather } from "../common";
/**
 * Last weather data,
 * This property is 'undefined' when the weather has never been sent.
 */
export declare let last: Weather | undefined;
/**
* Trace (for debug mod)
* @param message to show in the console
*/
export declare function trace(message: unknown): void;
/**
 * Initialize the module
 * @param callback when weater data are available
 */
export declare function initialize(callback: (data: Weather) => void): void;
/**
 * Load file if available
 */
export declare function loadFile(): Weather;
