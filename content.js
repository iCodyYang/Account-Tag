chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == "open_dialog_box") {
        var word = prompt("Please enter a word:");
        if (word != null) {
            chrome.runtime.sendMessage({ action: "update_icon", icon: word + ".png" });
        }
    }
});