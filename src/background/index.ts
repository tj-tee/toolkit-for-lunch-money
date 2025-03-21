chrome.runtime.onInstalled.addListener(() => {
  console.log("Lunch Money Toolkit installed!");
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "OPEN_OPTIONS") {
    chrome.runtime.openOptionsPage();
  }
  return true;
});
