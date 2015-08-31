
//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    sendResponse({});
  });

chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
  console.log("message 2!");
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: 'getEnabled'}, function(response) {
      console.log("browserClicked!");
      console.log(response);

      if (response && response.enabled) {
        enabled = response.enabled;
        if (!enabled) {
          console.log('linkedon!');
          chrome.browserAction.setIcon({path: 'icons/linkedon.png'});
          chrome.tabs.sendMessage(tabs[0].id, {action: 'setEnabled', enabled: true});
          chrome.tabs.sendMessage(tabs[0].id, {action: 'showIn'});
        }
        else {
          console.log('linkedOff!');
          chrome.browserAction.setIcon({path: 'icons/linkedoff.png'});
          chrome.tabs.sendMessage(tabs[0].id, {action: 'setEnabled', enabled: false});
          chrome.tabs.sendMessage(tabs[0].id, {action: 'hideIn'});
        }
      }
    });
  });
});