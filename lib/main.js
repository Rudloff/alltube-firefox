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
        text: "Downloading video on " + url,
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

function openAudio(response, url) {
    'use strict';
    var info = response.json;
    if (info) {
        tabs.open('http://alltubedownload.net/api.php?audio=on&url=' + encodeURI(url));
    } else {
        errorMsg(url);
    }
}

function getAudio() {
    'use strict';
    var url = tabs.activeTab.url,
        req = new Request({
            url: "http://alltubedownload.net/json.php?url=" + encodeURI(url),
            onComplete: function (response) {
                openAudio(response, tabs.activeTab.url);
            }
        });
    startDl(url);
    req.get();
}


function openURL(response, url) {
    'use strict';
    var info = response.json;
    if (info) {
        tabs.open(info.url);
    } else {
        errorMsg(url);
    }
}

function getURL() {
    'use strict';
    var url = tabs.activeTab.url,
        req = new Request({
            url: "http://alltubedownload.net/json.php?url=" + encodeURI(url),
            onComplete: function (response) {
                openURL(response, url);
            }
        });
    startDl(url);
    req.get();
}

var widget = require("sdk/widget").Widget({
    label: "AllTube",
    id: "alltube-widget",
    contentURL: self.data.url('favicon.png'),
    onClick: getURL
});

var downloadJS = self.data.url('download.js');
var menu = contextMenu.Menu({
    label: "AllTube Dowload",
    image: self.data.url('favicon.png'),
    items: [
        contextMenu.Item({
            label: "Download video",
            contentScriptFile: downloadJS,
            onMessage: getURL
        }),
        contextMenu.Item({
            label: "Download audio",
            contentScriptFile: downloadJS,
            onMessage: getAudio
        })
    ]
});

var dlHotKey = new Hotkey({
    combo: "accel-shift-d",
    onPress: getURL
});
