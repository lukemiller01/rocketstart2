// Listen for messages from the listener content script and run the appropriate script when prompted.
chrome.runtime.onMessage.addListener(function(msg, sender) {
    if (msg.text == "profile") {
        chrome.scripting.executeScript(
        {
          target: {tabId: sender.tab.id},
          files: ['profile.js'],
        });
     }
     else if (msg.text == "network") {
          chrome.scripting.executeScript(
          {
            target: {tabId: sender.tab.id},
            files: ['network.js'],
          });
      }
});