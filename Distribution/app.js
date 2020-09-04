import { inbox } from "file-transfer";
import { WEATHER_FILE, loadFile } from "./common";
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
