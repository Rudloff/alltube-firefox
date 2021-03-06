/*jslint browser, es6*/
/*global browser, localStorage*/

if (typeof browser !== 'object') {
    throw "Can't find browser object.";
}

function getAlltubeUrl() {
    'use strict';
    let url = localStorage.getItem('alltube-url');
    if (!url) {
        url = 'https://alltubedownload.net/';
    }
    return url;
}

function openAudioReal(tabs) {
    'use strict';
    browser.tabs.create({
        "url": getAlltubeUrl() + '/info?audio=on&url=' + encodeURIComponent(tabs[0].url)
    }).then();
}

function openInfoReal(tabs) {
    'use strict';
    browser.tabs.create({
        "url": getAlltubeUrl() + '/info?url=' + encodeURIComponent(tabs[0].url)
    }).then();
}

function openURLReal(tabs) {
    'use strict';
    browser.tabs.create({
        "url": getAlltubeUrl() + '/download?url=' + encodeURIComponent(tabs[0].url)
    }).then();
}

function getCurrentTab(callback) {
    'use strict';
    browser.tabs.query({active: true}).then(callback);
}

function openAudio() {
    'use strict';
    getCurrentTab(openAudioReal);
}

function openInfo() {
    'use strict';
    getCurrentTab(openInfoReal);
}

function openURL() {
    'use strict';
    getCurrentTab(openURLReal);
}

function getHotKey(command) {
    'use strict';
    if (command === 'download') {
        openURL();
    }
}

browser.browserAction.onClicked.addListener(openURL);
browser.commands.onCommand.addListener(getHotKey);

browser.contextMenus.create(
    {
        id: 'alltube',
        title: 'AllTube Download'
    }
);
browser.contextMenus.create(
    {
        id: 'download-video',
        parentId: 'alltube',
        title: 'Download video',
        onclick: openURL
    }
);
browser.contextMenus.create(
    {
        id: 'download-audio',
        parentId: 'alltube',
        title: 'Download audio',
        onclick: openAudio
    }
);
browser.contextMenus.create(
    {
        id: 'getinfo',
        parentId: 'alltube',
        title: 'Get info',
        onclick: openInfo
    }
);
