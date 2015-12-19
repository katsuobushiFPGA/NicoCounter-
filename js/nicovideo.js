//ランキング、検索結果を表示した時の処理
//動画のコンテンツの前にタグを挿入

/*----- Global Data -----*/
//視聴回数
var viewCount = 0;
var currentURL = "";

//a title="" href="watch/*"
$(function() {
  chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse){
    if(request['key'] == "urlgetComplete") {
        currentURL = request['url'];

      //動画ページなら:動画IDを送信して、インクリメントさせる。
      //ランキングページなら、検索結果ページならで分ける:キャッシュを読み込んで視聴回数取得
	
        //動画ページの場合
	if(currentURL.match("watch")) {
              var reg = new RegExp("[(sm)|(nm)|(so)|(0-9)]+[0-9]+");
              var nicoAPI="http://ext.nicovideo.jp/api/getthumbinfo/";
              var movId = currentURL.match(reg);
              var movieId=""
		$(function(){
		    $.ajax({
                        async:false,
		        url:nicoAPI+movId[0],
		        type:'GET',
		        dataType:'xml',
		        timeout:1000,
		        error:function() {
		            console.log("load fail.");
		        },
		        success:function(xml){
		            $(xml).find("video_id").each(function() {
		                movieId=$(this).text();
		            });
		        }
		    });
		});
              saveStorage(movieId);
	}
	//ランキング、検索結果ページの場合
	else if(currentURL.match("ranking") || currentURL.match("search") || currentURL.match("tag")) {
	  console.log("ranking or search page");
	//キャッシュ読み込み
	  var array=JSON.parse(localStorage.getItem("NICO_COUNTER+"));
	  $(".videoList01Wrap").each(function(){
	    var movId = $(this).find(".itemThumb").attr('data-id');
	    if(array==null) {
              //何もしない
              viewCount = 0;
            }
            else {
	      viewCount = array[movId];//キャッシュから視聴回数取得
              if(viewCount == undefined) {
 	             viewCount = 0;
	      }
	    }
	    $(this).parent().prepend("<div align=\"center\"><p>視聴回数:<font color =\"red\">"  + viewCount + "</font>回 </p></div>");
	  });
        }
        //何も該当しない場合
        else {
		/* エラーログ */
        }
    }
  });
});
$(function(){
   //URL情報をもらう
   chrome.runtime.sendMessage({key:"urlget"}, function(response) {console.log("urlget")});
});
//動画IDを引数にローカルストレージに保存
function saveStorage(movId) {
  var array=JSON.parse(localStorage.getItem("NICO_COUNTER+"));
  var _movId = movId[0];

  //動画をはじめてみるとき
  if(array==null){
    array={}
    array[movId] = 1;
  }
  //動画をはじめてみるとき
  else if(array[movId]==null){
    array[movId]=1;
  }
  //動画が存在する場合
  else {  
    ++array[movId];
  }
  localStorage.setItem("NICO_COUNTER+",JSON.stringify(array));
}