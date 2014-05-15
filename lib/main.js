/*global require*/
var self = require("sdk/self");
var tabs = require('sdk/tabs');
var contextMenu = require("sdk/context-menu");
var Request = require("sdk/request").Request;
var notifications = require("sdk/notifications");
var Hotkey = require("sdk/hotkeys").Hotkey;

function startDl(url) {
    'use strict';
    notifications.notify({
        title: "AllTube Download",
        text: "Looking for video on " + url,
        iconURL: self.data.url('favicon.png')
    });
}

function errorMsg(url) {
    'use strict';
    notifications.notify({
        title: "AllTube Download",
        text: "Can't find the video on " + url,
        iconURL: self.data.url('favicon.png')
    });
}

function getJSON(callback) {
    'use strict';
    var url = tabs.activeTab.url,
        req = new Request({
            url: "http://alltubedownload.net/json.php?url=" + encodeURIComponent(url),
            onComplete: function (response) {
                var info = response.json;
                if (!info.error) {
                    callback(info);
                } else {
                    errorMsg(url);
                }
            }
        });
    startDl(url);
    req.get();
}

function openAudio(info) {
    'use strict';
    tabs.open('http://alltubedownload.net/api.php?audio=on&url=' + encodeURIComponent(info.webpage_url));
}

function openInfo(info) {
    'use strict';
    tabs.open('http://alltubedownload.net/api.php?url=' + encodeURIComponent(info.webpage_url));
}

function openURL(info) {
    'use strict';
    tabs.open(info.url);
}

function getAudio() {
    'use strict';
    getJSON(openAudio);
}

function getInfo() {
    'use strict';
    getJSON(openInfo);
}

function getURL() {
    'use strict';
    getJSON(openURL);
}

var widget = require("sdk/widget").Widget({
    label: "AllTube",
    id: "alltube-widget",
    contentURL: self.data.url('favicon.png'),
    onClick: getURL
});

var downloadJS = self.data.url('download.js');
var menu = contextMenu.Menu({
    label: "AllTube Download",
    image: self.data.url('favicon.png'),
    items: [
        contextMenu.Item({
            label: "Download video",
            contentScriptFile: downloadJS,
            onMessage: getURL
        }),
        contextMenu.Item({
            label: "Get info",
            contentScriptFile: downloadJS,
            onMessage: getInfo
        })
    ]
});

var dlHotKey = new Hotkey({
    combo: "accel-shift-d",
    onPress: getURL
});
