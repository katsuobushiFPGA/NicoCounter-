//URL
var currentURL = "";
chrome.runtime.onMessage.addListener(
	function(request,sender,sendResponse){
                if(request['key'] == "urlget") {
  	              console.log(request);
                      currentURL = sender.url;
		      console.log(currentURL);
		      chrome.tabs.sendMessage(sender.tab.id,{key:"urlgetComplete",url:currentURL}, function(response) {console.log("urlgetComplete")} );
		}
});