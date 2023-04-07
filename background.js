chrome.alarms.create('updateIcon', { when: Date.now() + 1000 });

chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === 'updateIcon') {
        chrome.storage.sync.get(['imageData'], function (result) {
            if (result.imageData) {
                var canvas = new OffscreenCanvas(19, 19);
                var context = canvas.getContext('2d');
                var imageData = context.createImageData(19, 19);
                imageData.data.set(result.imageData);
                chrome.action.setIcon({ imageData: imageData });
            }
        });
    }
});

chrome.action.onClicked.addListener(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "open_dialog_box" }, function (response) { });
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == "update_icon") {
        var canvas = new OffscreenCanvas(19, 19);
        var context = canvas.getContext('2d');
        var imageData = context.createImageData(19, 19);
        imageData.data.set(request.imageData);
        chrome.action.setIcon({ imageData: imageData });
    }
});
chrome.runtime.onStartup.addListener(function() {
    chrome.storage.local.get('lastImage', function(result) {
      var lastImage = result.lastImage;
      // 在这里加载上一次的图像
    });
  });