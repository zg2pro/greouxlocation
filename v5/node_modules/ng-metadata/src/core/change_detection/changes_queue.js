"use strict";
// @TODO this needs to be in a singleton
var lang_1 = require("../../facade/lang");
var TTL = 10;
var onChangesTtl = TTL;
var ChangesQueue = (function () {
    function ChangesQueue() {
    }
    ChangesQueue.prototype.buildFlushOnChanges = function ($rootScope) {
        var _context = this;
        buildFlushOnChangesCb($rootScope);
        function buildFlushOnChangesCb($rootScope) {
            if (lang_1.isFunction(_context.flushOnChangesQueue)) {
                return _context.flushOnChangesQueue;
            }
            _context.flushOnChangesQueue = getFlushOnChangesQueueCb($rootScope);
            return _context.flushOnChangesQueue;
        }
        function getFlushOnChangesQueueCb($rootScope) {
            // This function is called in a $$postDigest to trigger all the onChanges hooks in a single digest
            return function _flushOnChangesQueue() {
                try {
                    if (!(--onChangesTtl)) {
                        // We have hit the TTL limit so reset everything
                        _context.onChangesQueue = undefined;
                        throw new Error("infchng, " + TTL + " ngOnChanges() iterations reached. Aborting!\n");
                    }
                    // We must run this hook in an apply since the $$postDigest runs outside apply
                    $rootScope.$apply(function () {
                        for (var i = 0, ii = _context.onChangesQueue.length; i < ii; ++i) {
                            _context.onChangesQueue[i]();
                        }
                        // Reset the queue to trigger a new schedule next time there is a change
                        _context.onChangesQueue = undefined;
                    });
                }
                finally {
                    onChangesTtl++;
                }
            };
        }
    };
    return ChangesQueue;
}());
exports.ChangesQueue = ChangesQueue;
exports.changesQueueService = new ChangesQueue();
//# sourceMappingURL=changes_queue.js.map