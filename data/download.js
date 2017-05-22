/*global self*/
if (typeof self === 'object') {
    self.on("click", function () {
        'use strict';
        self.postMessage();
    });
}
