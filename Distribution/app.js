import { existsSync, readFileSync, writeFileSync } from "fs";
import { inbox } from "file-transfer";
import * as messaging from "messaging";
import { WEATHER_FILE, MESSAGE_TYPE } from "./common";
var _callback;
export function initialize(callback) {
    _callback = callback;
    loadFileAndNotifyUpdate();
}
inbox.addEventListener("newfile", function () {
    var file = inbox.nextFile();
    if (file === WEATHER_FILE) {
        loadFileAndNotifyUpdate();
    }
});
messaging.peerSocket.addEventListener("message", function (e) {
    var message = e.data;
    message.weather.description = "S";
    if (message.type === MESSAGE_TYPE) {
        try {
            writeFileSync(WEATHER_FILE, message.weather, "cbor");
        }
        catch (error) {
        }
        _callback(message.weather);
    }
});
function loadFileAndNotifyUpdate() {
    var weather = loadFile();
    _callback(weather);
}
export function loadFile() {
    try {
        if (existsSync(WEATHER_FILE)) {
            var data = readFileSync(WEATHER_FILE, "cbor");
            data.description = "F";
            return data;
        }
    }
    catch (ex) {
        console.error(JSON.stringify(ex));
    }
    return undefined;
}
