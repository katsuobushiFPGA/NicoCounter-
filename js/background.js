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

//����ID�������Ƀ��[�J���X�g���[�W�ɕۑ�
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

//����ID�������Ƀ��[�J���X�g���[�W����ǂݍ���
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
//URL���擾���鏈��
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    chrome.tabs.sendMessage(tabs.id, "url", function(response) {
      if(chrome.runtime.lastError) {
        
      }
    });
});
*/
/*
//localStorage�ۑ����鏈��
$("").on('load',function() {
    var hozon = {};
    localStorage.setItem("",JSON.stringify());
});
*/