import { inbox } from "file-transfer";
import { WEATHER_FILE } from "./common";
import { existsSync, readFileSync } from "fs";
var _callback;
export function initialize(callback) {
    _callback = callback;
    inbox.onnewfile = function (e) {
        var file = inbox.nextFile(WEATHER_FILE);
        if (file === WEATHER_FILE) {
            loadFileAndNotifyUpdate();
        }
    };
    loadFileAndNotifyUpdate();
}
function loadFileAndNotifyUpdate() {
    var weather = loadFile();
    _callback(weather);
}
export function loadFile() {
    try {
        if (existsSync(WEATHER_FILE)) {
            return readFileSync(WEATHER_FILE, "cbor");
        }
    }
    catch (ex) {
        console.error(JSON.stringify(ex));
    }
    return undefined;
}
