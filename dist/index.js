"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_logger_1 = require("@riim/error-logger");
var queue;
function run() {
    var track = queue;
    queue = null;
    for (var _i = 0, track_1 = track; _i < track_1.length; _i++) {
        var item = track_1[_i];
        try {
            item.callback.call(item.context);
        }
        catch (err) {
            error_logger_1.logError(err);
        }
    }
}
function defer(callback, context) {
    if (queue) {
        queue.push({ callback: callback, context: context });
    }
    else {
        queue = [{ callback: callback, context: context }];
        setTimeout(run, 1);
    }
}
exports.defer = defer;
