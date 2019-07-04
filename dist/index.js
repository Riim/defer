"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
var config_1 = require("./config");
exports.configure = config_1.configure;
let queue;
function run() {
    let track = queue;
    queue = null;
    for (let callback of track) {
        try {
            callback();
        }
        catch (err) {
            utils_1.logError(err);
        }
    }
}
function defer(callback) {
    if (queue) {
        queue.push(callback);
    }
    else {
        queue = [callback];
        setTimeout(run, 1);
    }
}
exports.defer = defer;
