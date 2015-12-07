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
                else if(request['key'] == "saveStorage") {
                      console.log("saveStorage");
                      saveStorage(request['movId']);
		}
});

//動画IDを引数にローカルストレージに保存
function saveStorage(movId) {
  var viewCount=undefined;
  chrome.storage.local.get(movId, function (value) {
    viewCount = value.key;
  });
  console.log(viewCount);
  if(viewCount == undefined) {
    console.log("undefiedn if");
    viewCount = 1;
  }else {  
    ++viewCount;
  }
  chrome.storage.local.set({movId: viewCount}, function () {
  });
}

//動画IDを引数にローカルストレージから読み込み
function readStorage(movId) {
  console.log(movId);
  var viewCount=undefined;
  chrome.storage.local.get(movId, function (value) {
    console.log(value.key);
    viewCount = value.key;
  });
  return viewCount;
}
/*
//URLを取得する処理
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    chrome.tabs.sendMessage(tabs.id, "url", function(response) {
      if(chrome.runtime.lastError) {
        
      }
    });
});
*/
/*
//localStorage保存する処理
$("").on('load',function() {
    var hozon = {};
    localStorage.setItem("",JSON.stringify());
});
*/