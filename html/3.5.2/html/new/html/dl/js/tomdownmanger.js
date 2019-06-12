var TabBlock = {
  s: {
    animLen: 200
  },
  
  init: function() {
    TabBlock.bindUIActions();
    TabBlock.hideInactive();
  },
  
  bindUIActions: function() {
    $('.tabBlock-tabs').on('click', '.tabBlock-tab', function(){
      TabBlock.switchTab($(this));
    });
  },
  
  hideInactive: function() {
    var $tabBlocks = $('.tabBlock');
    
    $tabBlocks.each(function(i) {
      var 
        $tabBlock = $($tabBlocks[i]),
        $panes = $tabBlock.find('.tabBlock-pane'),
        $activeTab = $tabBlock.find('.tabBlock-tab.is-active');
      
      $panes.hide();
      $($panes[$activeTab.index()]).show();
    });
  },
  
  switchTab: function($tab) {
    var $context = $tab.closest('.tabBlock');
    if (!$tab.hasClass('is-active')) {
      $tab.siblings().removeClass('is-active');
      $tab.addClass('is-active');
   
      TabBlock.showPane($tab.index(), $context);
    }
   },
  
  showPane: function(i, $context) {
    var $panes = $context.find('.tabBlock-pane');
    $panes.slideUp(TabBlock.s.animLen);
    $($panes[i]).slideDown(TabBlock.s.animLen);
  }
};

$(function() {
  TabBlock.init();
});
function getUserInfo(){return migu_app.getLoginInfo();}
function getdownloadurl(cid,uc,mycallback){
		var userId = "";
		var userToken = "";
		var infoString = getUserInfo();//��ȡ�û���Ϣ  userId,userName
		if(infoString){
			infoString = infoString.replace(/'/g, "\"");
			var info = JSON.parse(infoString);
			if(info){
				userId = info.userId;
				userToken = info.userToken;
			}
		}	
		
   //for test only
   	userId = "901785618";
   	userToken = "E7DCCC527ABB7D5DB2FD";
		var downNewUrl ="http://47.104.220.221:8081/api/getDownUrl";
		var visitUrl = "http://183.192.162.101:8084";//�����������û�ȡ���ŵ�ַ������ط���Ԥ����ַ������ֱ�Ӵ�������ַ����
		var getUrlParams={
                "uc":uc,
                "cid":cid,
                "userId":userId,
                "userToken":userToken,
                "visitUrl":visitUrl
		};
		$.ajax({
			type: "post",
			url: downNewUrl,
			contentType: "application/json;charset=utf-8",
			dataType:"json",
			data:JSON.stringify(getUrlParams),
			success: function (data) {
                    console.log("data"+JSON.stringify(data));
                    var download_data=[];//�洢 ��ȡ���ص�ַ������
                    if ("200" == data.code) {
                        var body =data.body;
                        for (var c in body){
                            if ("200" == body[c].code){
                                //�����ļ���С������ַ
                                download_data.push(body[c]);
                            }
                            else if ("403" == body[c].code){
                                //TODO ��ʾӵ��û��Ȩ�����أ���ʾ�û���Ҫ�շ�
                                console.log("û��Ȩ������")
                            } else if("401" == body[c].code){
                                console.log("��Ȩԭ���޷�����");
                                //TODO ���һ���ǷǴ�½��ip���Ż���ʾ
                            }else if("404" == body[c].code){
                                console.log("δ�ҵ�ý���ļ�");
                                //TODO ���Ľ�Ŀid�����⣬�����������ǵĽ�Ŀid���������������Ľ�Ŀid
                            }
                        }
                    }
          var tmpurl ="";
          if(download_data.length>0)tmpurl = download_data[0].url;
					mycallback(null,tmpurl);
      }
      ,error:function(error){
				console.log("����ʧ��"+JSON.stringify(error));
				mycallback(error,"");
      }
    });
}