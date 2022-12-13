profileScript = false
networkScript = false

let lastUrl = location.href;

// If the tab starts on a profile or my network, the listener doesn't have the chance to catch that the script runs,
// Because the URL never "changed". Check for the URLS at tab start.
if (lastUrl.includes("https://www.linkedin.com/in/")) {
  profileScript = true;
}

// Listens for changes in the URL.
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange(url);
  }
}).observe(document, {subtree: true, childList: true});

// After a URL changes, if a script hasn't been activated yet and the user navigates to a target URL, run the script.
function onUrlChange(url) {
  if (url.includes("https://www.linkedin.com/in/") && !profileScript) {
    chrome.runtime.sendMessage({text: "profile"});
    profileScript = true;
  }
}