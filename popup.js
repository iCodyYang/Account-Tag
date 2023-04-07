document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('input[type="button"]').addEventListener('click', submitWord);
    chrome.storage.sync.get(['word', 'imageData'], function (result) {
        if (result.word) {
            document.getElementById('word').value = result.word;
        }
        if (result.imageData) {
            chrome.runtime.sendMessage({ action: "update_icon", imageData: result.imageData });
        }
    });
});

function submitWord() {
    var word = document.getElementById('word').value;
    if (word != null) {
        chrome.storage.sync.set({ word: word });
        updateIcon(word);
    }
}

function updateIcon(word) {
    var canvas = document.createElement('canvas');
    canvas.width = 19;
    canvas.height = 19;
    var context = canvas.getContext('2d');
    context.fillStyle = 'rgba(0, 0, 0, 0)';
    context.fillRect(0, 0, 19, 19);
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        context.fillStyle = 'white';
    } else {
        context.fillStyle = 'black';
    }

    context.font = '16px sans-serif';
    var textWidth = context.measureText(word).width;
    context.fillText(word, (19 - textWidth) / 2, 16);
    var imageData = context.getImageData(0, 0, 19, 19);
    var imageDataArray = Array.from(imageData.data);
    chrome.storage.sync.set({ imageData: imageDataArray });
    chrome.runtime.sendMessage({ action: "update_icon", imageData: imageDataArray });
}



