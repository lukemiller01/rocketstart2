// Update the relevant fields with the new data.
const setInfo = info => {
    document.getElementById('words').textContent = info.words;
  };

// Listen for messages from the content script:

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if ((msg.from === 'contentScript') && (msg.subject === 'updateUI')) {
      var updatedInfo = {
        words: msg.words
      };
  
      // Directly respond to the sender (popup), 
      // through the specified callback.
      setInfo(updatedInfo);
    }
  });