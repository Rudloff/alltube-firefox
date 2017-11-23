/*jslint browser: true*/
/*global window, localStorage*/
var urlField;

function saveOptions() {
    'use strict';
    localStorage.setItem('alltube-url', urlField.value);
}

function init() {
    'use strict';
    urlField = document.getElementById('alltube-url');
    var url = localStorage.getItem('alltube-url');
    if (url) {
        urlField.value = url;
    }
    document.getElementById('save-options').addEventListener('click', saveOptions, false);
}

if (typeof window === 'object') {
    window.addEventListener('load', init, false);
} else {
    throw "It seems we are not in a browser.";
}
