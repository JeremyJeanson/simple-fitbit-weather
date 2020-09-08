import { Weather } from "../common";
export { Weather } from "../common";
/**
 * Initialize the module
 * @param callback when weater data are available
 */
export declare function initialize(callback: (data: Weather) => void): void;
/**
 * Load file if available
 */
export declare function loadFile(): Weather;
