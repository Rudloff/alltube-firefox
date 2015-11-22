/*global require*/
var self = require("sdk/self");
var tabs = require('sdk/tabs');
var contextMenu = require("sdk/context-menu");
var Request = require("sdk/request").Request;
var notifications = require("sdk/notifications");
var Hotkey = require("sdk/hotkeys").Hotkey;
var ui = require("sdk/ui");
var prefs = require('sdk/simple-prefs');

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

function openAudio() {
    'use strict';
    tabs.open(prefs.prefs['alltube-url'] + '/video?audio=on&url=' + encodeURIComponent(tabs.activeTab.url));
}

function openInfo() {
    'use strict';
    tabs.open(prefs.prefs['alltube-url'] + '/video?url=' + encodeURIComponent(tabs.activeTab.url));
}

function openURL() {
    'use strict';
    tabs.open(prefs.prefs['alltube-url'] + '/redirect?url=' + encodeURIComponent(tabs.activeTab.url));
}

var widget = ui.ActionButton({
    label: "AllTube",
    id: "alltube-widget",
    icon: './favicon.png',
    onClick: openURL
});

var downloadJS = self.data.url('download.js');
var menu = contextMenu.Menu({
    label: "AllTube Download",
    image: self.data.url('favicon.png'),
    items: [
        contextMenu.Item({
            label: "Download video",
            contentScriptFile: downloadJS,
            onMessage: openURL
        }),
        contextMenu.Item({
            label: "Download audio",
            contentScriptFile: downloadJS,
            onMessage: openAudio
        }),
        contextMenu.Item({
            label: "Get info",
            contentScriptFile: downloadJS,
            onMessage: openInfo
        })
    ]
});

var dlHotKey = new Hotkey({
    combo: "accel-shift-d",
    onPress: openURL
});
