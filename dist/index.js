"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("@riim/logger");
var queue;
function run() {
    var track = queue;
    queue = null;
    for (var _i = 0, track_1 = track; _i < track_1.length; _i++) {
        var callback = track_1[_i];
        try {
            callback();
        }
        catch (err) {
            logger_1.error(err);
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
