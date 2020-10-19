/**
* Trace (for debug mod)
* @param message to show in the console
*/
export function trace(message) {
    console.warn(JSON.stringify(message));
}
/**
 * Providers
 */
export var Providers;
(function (Providers) {
    Providers["openweathermap"] = "owm";
    Providers["weatherbit"] = "weatherbit";
})(Providers || (Providers = {}));
