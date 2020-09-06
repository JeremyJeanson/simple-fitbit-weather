import { existsSync, readFileSync, writeFileSync } from "fs";
import { inbox } from "file-transfer";
import * as messaging from "messaging";
import { trace, WEATHER_FILE, MESSAGE_TYPE } from "./common";
var _callback;
export function initialize(callback) {
    _callback = callback;
    load();
}
inbox.addEventListener("newfile", function () {
    if (inbox.nextFile() === WEATHER_FILE)
        load();
});
messaging.peerSocket.addEventListener("message", function (e) {
    var message = e.data;
    if (message.type === MESSAGE_TYPE) {
        try {
            writeFileSync(WEATHER_FILE, message.weather, "cbor");
        }
        catch (ex) {
            trace(ex);
        }
        _callback(message.weather);
    }
});
function load() {
    _callback(loadFile());
}
export function loadFile() {
    try {
        if (existsSync(WEATHER_FILE)) {
            var data = readFileSync(WEATHER_FILE, "cbor");
            return data;
        }
    }
    catch (ex) {
        trace(ex);
    }
    return undefined;
}
