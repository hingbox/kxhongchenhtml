eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('3 4="5://0.1.2/9/a/b/6/7.8?";',12,12,'www|miguvideo|com|var|vodurl|http|data|detailData|jsp|wap|resource|miguPC_client'.split('|'),0,{}))	
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('3 4="5://0.1.2/9/a/b/6/7.8?";',12,12,'www|miguvideo|com|var|vodurl2|http|data|relevantDateilData|jsp|wap|resource|miguPC_client'.split('|'),0,{}))

//var saveurl = "http://pc.miguvideo.com/MiguApi/statistics/save.ac";
var vodplayUrl = "http://pc.miguvideo.com/playurl/v1/play/playurl?";
//var vodplayUrl = "http://183.192.162.101:8084/playurl/v3/play/playurl?"
var historyUrl = "http://www.miguvideo.com/uic-service/playHistory/add?";
var reportUrl = "http://pc.miguvideo.com/MiguApi/statistics/report.ac?";

function getNewGuid() {
	function S4() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}
	return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
//时间转换
var sec_to_time = function(s) {
	try{
		var t;
		if (s > -1) {
			var hour = Math.floor(s / 3600);
			var min = Math.floor(s / 60) % 60;
			var sec = s % 60;
			if (hour < 10) {
				t = '0' + hour + ":"
			} else {
				t = hour + ":"
			} if (min < 10) {
				t += "0"
			}
			t += min + ":";
			if (sec < 10) {
				t += "0"
			}
			t += sec
		}
	}catch(e){
		//alert(e);
	}
    return t
	
}

function getXHR() {
    try {
        return new XMLHttpRequest();
    } catch (e) {
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }
    }
}

var firstPlay=0;
var SubSerial_IDS="";
var cids,isLogin;
var isOrd,isPingBi;//是否需要购买
var nextid=0;//下一集指定对象数
var nextF = 0;
var name="";
var mId,cmId,totalTime,currTime;
var imgHstr;
var prdInfoIds;
//点播数据
function getPlayInfo(cid){		
	try{migu_app.Stop();}catch(e){};
	try{
		var xhr = getXHR();
		xhr.open("POST", vodurl+"cid="+cid, true);
		xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
		xhr.setRequestHeader('If-Modified-Since', '0');
		//xhr.setRequestHeader("Cache-Control","no- cache");
		//xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');	
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4&&xhr.status==200) {
				var empInfo = JSON.parse(xhr.responseText);
				//剧集列表
				name = empInfo[0].name;
				mId = empInfo[0].mId;
				cmId = empInfo[0].cmId;
				prdInfoIds=empInfo[0].prdInfoIds;
				var desimg = empInfo[0].imgV;
				imgHstr=empInfo[0].imgH;
				if(desimg==""){
					desimg = empInfo[0].imgH;
					if(desimg==""){
						desimg="pic/default.png";
					}
				}			
				document.getElementById("tinfo101").innerHTML=subString(name,22,true);
				document.getElementById("tinfo102").innerHTML=empInfo[0].updatecycle;
				document.getElementById("desimg").src=desimg;
				document.getElementById("destag1").innerHTML=name;
				document.getElementById("shareimg").style.display = "block";
				document.getElementById("destag2").innerHTML="导演："+empInfo[0].director;
				document.getElementById("destag3").innerHTML="主演："+empInfo[0].star;
				document.getElementById("destag4").innerHTML="类型："+empInfo[0].mediaType;
				document.getElementById("destag5").innerHTML="地区："+empInfo[0].mediadiqu;
				
				//alert(migu_app.SetProperty);
				//if(typeof(migu_app.SetProperty)=="undefined")migu_app.SetProperty("abcd","1234");
				
				var detail = empInfo[0].Detail;
				cids=empInfo[0].contId;
				isLogin = empInfo[0].isLogin;
				isOrd = empInfo[0].isOrd;
				phone_number = empInfo[0].mobile;
				var contDisplayType=empInfo[0].contDisplayType;
				var mediaType=empInfo[0].mediaType;
				var mediaShape=empInfo[0].mediaShape;
				SubSerial_IDS=empInfo[0].SubSerial_IDS
				document.getElementById("destag6").innerHTML=detail;
				//var deEncrptJsFunc=empInfo[0].func;
				//var deEncrptFun = eval("(0||"+deEncrptJsFunc+")");
				isPingBi = empInfo[0].isPingBi;//版权			
				if(nextFlag()){
					nextF=1;
				}
				/**
				if(isOrd=='1'){
					play(name,isOrd,ispingbi,nextF,decodeURIComponent((deEncrptFun(empInfo[0].playList.play2))),decodeURIComponent((deEncrptFun(empInfo[0].playList.play1))),decodeURIComponent((deEncrptFun(empInfo[0].playList.play3))));
				}else {
					play(name,isOrd,ispingbi,nextF,decodeURIComponent((deEncrptFun(empInfo[0].pilotPlayList.play42))),decodeURIComponent((deEncrptFun(empInfo[0].pilotPlayList.play41))),decodeURIComponent((deEncrptFun(empInfo[0].pilotPlayList.play43))));
				}**/
				var playType = empInfo[0].DisplayName;
				getRecommendData(contDisplayType,mediaType,mediaShape,playType)			
				if(playType=="电视剧"||playType=="动漫"){
					initMenu(1,1);										
					if((playType=="电视剧"&&(mediaShape=="连载"||mediaShape=="正片"))||(playType=="动漫"&&SubSerial_IDS!="")){
						iszhuiju(1);
					}
					var curNumber = empInfo[0].playId;
					var tvlen = empInfo[0].Variety.length;
					var tvint = parseInt(tvlen/5);
					var tvmore = tvlen%5;
					//alert(migu_app.UpdateVideoInfo);
					var tmpCidlist="";
					var tmpCurrentSeries=1;
					for(var m=0;m<tvlen;m++){
						tmpCidlist += empInfo[0].Variety[m].contId+",";
						if(curNumber==empInfo[0].Variety[m].contId)tmpCurrentSeries = m+1;
					}		
					if(typeof(migu_app.UpdateVideoInfo)!="undefined")migu_app.UpdateVideoInfo(""+user_id,""+cids,""+mId,1,parseInt(tvlen),tmpCurrentSeries,tmpCidlist);
					
					var divStr = "<table border=0 cellSpacing=1 cellPadding=0 style=' margin-top:8px' >";
					for(var i=0;i<tvint;i++){
						var id0 = empInfo[0].Variety[5*i+0].contId;
						if(curNumber==id0){
							divStr+="<tr><td background='pic/btn_pre2x.png' width='47px' height='47px' id='title4' align='center' >"+(5*i+1)+"</td>";
						}else{
							divStr+="<tr><td background='pic/btn_jj2x.png' width='47px' height='47px' id='title3' align='center' onmouseover=\"this.style.backgroundImage='url(pic/btn_hover2x.png)'\" onmouseout=\"this.style.backgroundImage='url(pic/btn_jj2x.png)'\" onclick='clicktv("+id0+");' >"+(5*i+1)+"</td>";
						}
						var id1 = empInfo[0].Variety[5*i+1].contId;
						if(curNumber==id1){
							divStr+="<td background='pic/btn_pre2x.png' width='47px' height='47px' id='title4' align='center' >"+(5*i+2)+"</td>";
						}else{
							divStr+="<td background='pic/btn_jj2x.png' width='47px' height='47px' id='title3' align='center' onmouseover=\"this.style.backgroundImage='url(pic/btn_hover2x.png)'\" onmouseout=\"this.style.backgroundImage='url(pic/btn_jj2x.png)'\" onclick='clicktv("+empInfo[0].Variety[5*i+1].contId+");' >"+(5*i+2)+"</td>";
						}
						var id2 = empInfo[0].Variety[5*i+2].contId;
						if(curNumber==id2){
							divStr+="<td background='pic/btn_pre2x.png' width='47px' height='47px' id='title4' align='center' >"+(5*i+3)+"</td>";
						}else{
							divStr+="<td background='pic/btn_jj2x.png' width='47px' height='47px' id='title3' align='center' onmouseover=\"this.style.backgroundImage='url(pic/btn_hover2x.png)'\" onmouseout=\"this.style.backgroundImage='url(pic/btn_jj2x.png)'\" onclick='clicktv("+empInfo[0].Variety[5*i+2].contId+");' >"+(5*i+3)+"</td>";
						}
						var id3 = empInfo[0].Variety[5*i+3].contId;
						if(curNumber==id3){
							divStr+="<td background='pic/btn_pre2x.png' width='47px' height='47px' id='title4' align='center' >"+(5*i+4)+"</td>";
						}else{
							divStr+="<td background='pic/btn_jj2x.png' width='47px' height='47px' id='title3' align='center' onmouseover=\"this.style.backgroundImage='url(pic/btn_hover2x.png)'\" onmouseout=\"this.style.backgroundImage='url(pic/btn_jj2x.png)'\" onclick='clicktv("+empInfo[0].Variety[5*i+3].contId+");' >"+(5*i+4)+"</td>";
						}
						var id4 = empInfo[0].Variety[5*i+4].contId;
						if(curNumber==id4){
							divStr+="<td background='pic/btn_pre2x.png' width='47px' height='47px' id='title4' align='center' >"+(5*i+5)+"</td></tr>";
						}else{
							divStr+="<td background='pic/btn_jj2x.png' width='47px' height='47px' id='title3' align='center' onmouseover=\"this.style.backgroundImage='url(pic/btn_hover2x.png)'\" onmouseout=\"this.style.backgroundImage='url(pic/btn_jj2x.png)'\" onclick='clicktv("+empInfo[0].Variety[5*i+4].contId+");' >"+(5*i+5)+"</td></tr>";
						}
						
					}
					if(tvmore>0){
						divStr+="<tr>";
						for(var j=0;j<tvmore;j++){
							var id0 = empInfo[0].Variety[5*tvint+j].contId;
							if(curNumber==id0){
								divStr+="<td background='pic/btn_pre2x.png' width='47px' height='47px' id='title4' align='center' >"+(5*tvint+j+1)+"</td>";
							}else{
								divStr+="<td background='pic/btn_jj2x.png' width='47px' height='47px' id='title3' align='center' onmouseover=\"this.style.backgroundImage='url(pic/btn_hover2x.png)'\" onmouseout=\"this.style.backgroundImage='url(pic/btn_jj2x.png)'\" onclick='clicktv("+empInfo[0].Variety[5*tvint+j].contId+");' >"+(5*tvint+j+1)+"</td>";
							}					
						}
						divStr+="</tr>";
					}			
					divStr=divStr+"</table>";
					document.getElementById("tinfo103").innerHTML=divStr;
				}else if(playType=="综艺"){
					initMenu(1,3);
					iszhuiju(2);
					var updateTime = empInfo[0].Update;
					if(updateTime==""){
						updateTime=name;
					}
					var divStr="<table border=0 cellSpacing=0 cellPadding=0 style='margin-top:19px;table-layout:fixed;' width='230px'><tr height='20px' ><td id='title'>"+updateTime+"</td><td style='text-align: left;cursor:pointer;width:22px' ><img id='scimg' style='vertical-align:middle;display:none;' src='pic/collect_n.png' width='20' height='20' onclick='zhuiju()' title='收藏'/></td><td style='width:8px' ></td><td style='text-align: right;cursor:pointer;width:22px' ><img id='shareimg1' style='vertical-align:middle;' src='pic/share_n2x.png' width='22' height='22' onclick='share()' title='分享'/></td></tr></table>";
					divStr+="<table border=0 cellSpacing=0 cellPadding=0 style=' margin-top:3px' >";
					var varietySize = empInfo[0].Variety.length;			
					var tmpCidlist="";
					for(var m=0;m<varietySize;m++){
						tmpCidlist += empInfo[0].Variety[m].contId+",";
					}		
					if(typeof(migu_app.UpdateVideoInfo)!="undefined")migu_app.UpdateVideoInfo(""+user_id,""+cids,""+mId,1,parseInt(varietySize),1,tmpCidlist);
					for(var m=0;m<varietySize;m++){
						var contid = empInfo[0].Variety[m].contId;
						var newName = empInfo[0].Variety[m].newName;
						var isit = empInfo[0].Variety[m].newIsit;
						//var works = newName.substring(0,8);
						var imgH = empInfo[0].Variety[m].imgH;
						if(imgH==""){
								imgH = empInfo[0].Variety[m].imgV;
								if(imgH==""){
									imgH="pic/default2.png";
								}
							}
						if(varietySize==1){
							contid = cids;
							newName = name;
							isit=empInfo[0].isit;
							imgH= empInfo[0].imgH;
							if(imgH==""){
								imgH = empInfo[0].imgV;
								if(imgH==""){
									imgH="pic/default2.png";
								}
							}
						}
						
						if(cids==contid){
							divStr+="<tr><td onselectstart='return false' >";						
						}else{
							divStr+="<tr><td style='cursor:pointer;' onselectstart='return false' onmouseover='changeOverStyle("+m+");' onmouseout='changeOutStyle("+m+");' onclick='clicktv("+contid+");'> ";
						}
						divStr+="<table border=0 cellSpacing=0 cellPadding=0 style='margin-top:6px' ><tr><td rowspan='2' height='60px' width='106px' id='movietitle2'><div style=\"position: relative; width: 106px; height: 60px;\"><img src='"+imgH+"' height=\"60px\" width=\"106px\" />";
						//if(empInfo[0].isPrice!=0){divStr+="<div style='float:right; text-align:center'><img src='pic/vip2x.png' width='44px' height='14px' border='0'/></div>";}
						//divStr+="<div style=\"background-color:#000000; filter:alpha(opacity=70);opacity:0.7;text-align:center; margin-top:48px; \">"+works.substring(0,4)+"-"+works.substring(4,6)+"-"+works.substring(6,8)+"期</div>";
						divStr+="</div></td><td width='10px'></td>";
						if(cids==contid){
							divStr+="<td width='118px' height='51px' id='zyover"+m+"'  class='movietitle' valign='top'>"+subString(newName,50,true)+"</td>";
						}else{
							divStr+="<td width='118px' height='51px' id='zyover0"+m+"' class='movietitleover' valign='top'>"+subString(newName,50,true)+"</td>";
						}
						//divStr+="</tr><tr><td width='10px'></td>";
						/**
						if(cids==contid){
							divStr+="<td class='movietitle1'><img src='pic/play-02.png' width='12px' height='9px' border='0' style='margin-right:5px' />"+isit+"</td></tr></table>";
							//divStr+="<td class='movietitle1'></td></tr></table>";
						}else{
							divStr+="<td id='zyover1"+m+"' class='movietitle1over'><img src='pic/play-01.png' width='12px' height='9px' border='0' style='margin-right:5px' id='imgover"+m+"' />"+isit+"</td></tr></table>";
							//divStr+="<td id='zyover1"+m+"' class='movietitle1over'></td></tr></table>";
						}			
						**/
						divStr+="</tr></table>";
						divStr+="</td></tr>";
					}
					divStr+="</table>";
					document.getElementById("area-variety").innerHTML=divStr;
				}else{
					initMenu(1,2);
					iszhuiju(2);
					var imgH = empInfo[0].imgH;
					if(imgH==""){
						imgH=empInfo[0].imgV;
						if(imgH==""){
							imgH="pic/default2.png";
						}
					}
					if(typeof(migu_app.UpdateVideoInfo)!="undefined")migu_app.UpdateVideoInfo(""+user_id,""+cids,""+mId,1,1,1,"");
					
					var divStr = "<table border=0 cellSpacing=0 cellPadding=0 style='margin-top:19px;table-layout:fixed;' width='230px'><tr height='20px' ><td id='title'>"+name+"</td><td style='text-align: left;cursor:pointer;width:22px' ><img id='scimg' style='vertical-align:middle;display:none;' src='pic/collect_n.png' width='20' height='20' onclick='zhuiju()' title='收藏'/></td><td style='width:8px' ></td><td style='text-align: right;cursor:pointer;width:22px' ><img id='shareimg1' style='vertical-align:middle;' src='pic/share_n2x.png' width='22' height='22' onclick='share()' title='分享'/></td></tr></table>";
					divStr+="<table border=0 cellSpacing=0 cellPadding=0 style='margin-top:9px' ><tr><td rowspan='2' height='60px' width='106px' id='movietitle2'><div style=\"position: relative; width: 106px; height: 60px;\"><img src='"+imgH+"' height=\"60px\" width=\"106px\" />";
					//if(empInfo[0].isPrice!=0){divStr+="<div style='float:right; text-align:center'><img src='pic/vip2x.png' width='44px' height='14px' border='0'/></div>";}
					//divStr+="<div style=\"background-color:#000000; filter:alpha(opacity=70);opacity:0.7;text-align:right; margin-top:48px; \">"+sec_to_time(empInfo[0].timeLong)+"</div>";
					divStr+="</div></td><td width='10px'></td><td width='118px' height='51px' valign='top' class='movietitle' >"+subString(name,40,true)+"<br />"+empInfo[0].mediadiqu+"&nbsp;"+empInfo[0].mediaDate+"</td>";
					//divStr+="</tr><tr><td width='10px'></td><td class='movietitle1'><img src='pic/play-02.png' width='12px' height='9px' border='0' style='margin-right:5px' />"+empInfo[0].isit+"</td></tr></table>";
					divStr+="</tr></table>";
					document.getElementById("area-movie").innerHTML=divStr;		
				}
				
				//猜你喜欢
				var xhsize = empInfo[0].guessList.length;
				var xhtvint = parseInt(xhsize/3)>1?2:parseInt(xhsize/3);
				var xhtvmore = xhsize%3;		
				var divXH = "<table border=0 cellSpacing=0 cellPadding=0 style='margin-top:17px'><tr height='20px' id='title'><td>猜你喜欢</td></tr></table><table border=0 cellSpacing=0 cellPadding=0 style=' margin-top:9px'>";			
				for(var i=0;i<xhtvint;i++){
					var img0 = empInfo[0].guessList[3*i+0].imageSrcV;
					if(img0==""){
						img0=empInfo[0].guessList[3*i+0].imageSrcH;
						if(img0==""){
							img0="pic/default.png";
						}
					}
					divXH+="<tr><td style='cursor:pointer;' onmouseover='changeOverStylexh("+i+",0);' onmouseout='changeOutStylexh("+i+",0);' onclick='clicktv("+empInfo[0].guessList[3*i+0].srcContID+");' title='"+empInfo[0].guessList[3*i+0].name+"'><div style=\"position: relative; width: 76px; height: 108px;\"><img src='"+img0+"' width=\"76px\" height=\"108px\" border=\"0\" />";
					if(empInfo[0].guessList[3*i+0].guessPrice!=0){
						divXH+="<span style=\"position: absolute; top: 0; left: 0;width: 76px;text-align:right;\"><img src=\"pic/vip2x.png\" width=\"44px\" height=\"14px\" border=\"0\"/></span>";
					}	
					var img1 = empInfo[0].guessList[3*i+1].imageSrcV;
					if(img1==""){
						img1=empInfo[0].guessList[3*i+1].imageSrcH;
						if(img1==""){
							img1="pic/default.png";
						}
					}
					divXH+="</div></td><td style='cursor:pointer;' onmouseover='changeOverStylexh("+i+",1);' onmouseout='changeOutStylexh("+i+",1);' onclick='clicktv("+empInfo[0].guessList[3*i+1].srcContID+");' title='"+empInfo[0].guessList[3*i+1].name+"'><div style=\"position: relative;  margin-left:6px;width: 76px; height: 108px;\"><img src='"+img1+"' width=\"76px\" height=\"108px\" border=\"0\" />";
					if(empInfo[0].guessList[3*i+1].guessPrice!=0){
						divXH+="<span style=\"position: absolute; top: 0; left: 0;width: 76px;text-align:right;\"><img src=\"pic/vip2x.png\" width=\"44px\" height=\"14px\" border=\"0\"/></span>";
					}		
					var img2 = empInfo[0].guessList[3*i+2].imageSrcV;
					if(img2==""){
						img2=empInfo[0].guessList[3*i+2].imageSrcH;
						if(img2==""){
							img2="pic/default.png";
						}
					}
					divXH+="</div></td><td style='cursor:pointer;' onmouseover='changeOverStylexh("+i+",2);' onmouseout='changeOutStylexh("+i+",2);' onclick='clicktv("+empInfo[0].guessList[3*i+2].srcContID+");' title='"+empInfo[0].guessList[3*i+2].name+"'><div style=\"position: relative;  margin-left:6px;width: 76px; height: 108px;\"><img src='"+img2+"' width=\"76px\" height=\"108px\" border=\"0\" />";
					if(empInfo[0].guessList[3*i+2].guessPrice!=0){
						divXH+="<span style=\"position: absolute; top: 0; left: 0;width: 76px;text-align:right;\"><img src=\"pic/vip2x.png\" width=\"44px\" height=\"14px\" border=\"0\"/></span>";
					}
					divXH+="</div></td></tr>";				
					
					divXH+="<tr height='17px' ><td width='76px' height='25px' align='center' class='title1' id='tvxhtxt"+i+"0'><div style='width:76px;overflow: hidden; white-space: nowrap; text-overflow: hidden;'>"+empInfo[0].guessList[3*i+0].name+"</div></td>";
					divXH+="<td width='76px' align='center' class='title1' id='tvxhtxt"+i+"1'><div style='width:76px;overflow: hidden; white-space: nowrap; text-overflow: hidden;margin-left:6px;'>"+empInfo[0].guessList[3*i+1].name+"</div></td>";
					divXH+="<td width='76px' align='center' class='title1' id='tvxhtxt"+i+"2'><div style='width:76px;overflow: hidden; white-space: nowrap; text-overflow: hidden;margin-left:6px;'>"+empInfo[0].guessList[3*i+2].name+"</div></td></tr>";
				}
				if(xhtvint<2&&xhtvmore>0){
					divXH+="<tr>";
					for(var j=0;j<tvmore;j++){		
						var img0 = empInfo[0].guessList[3*tvint+j].imageSrcV;
						if(img0==""){
							img0=empInfo[0].guessList[3*tvint+j].imageSrcH;
							if(img0==""){
								img0="pic/default.png";
							}
						}
						if(j==0){
							divXH+="<td style='cursor:pointer;' onmouseover='changeOverStylexh(1,"+j+");' onmouseout='changeOutStylexh(1,"+j+");' onclick='clicktv("+empInfo[0].guessList[3*tvint+j].srcContID+");' title='"+empInfo[0].guessList[3*tvint+j].name+"'><div style=\"position: relative; width: 76px; height: 108px;\"><img src='"+img0+"' width=\"76px\" height=\"108px\" border=\"0\" />";
							if(empInfo[0].guessList[3*tvint+j].guessPrice!=0){
								divXH+="<span style=\"position: absolute; top: 0; left: 0;width: 76px;text-align:right;\"><img src=\"pic/vip2x.png\" width=\"44px\" height=\"14px\" border=\"0\"/></span>";
							}
							divXH+="</div></td>";
						}else{
							divXH+="<td style='cursor:pointer;' onmouseover='changeOverStylexh(1,"+j+");' onmouseout='changeOutStylexh(1,"+j+");' onclick='clicktv("+empInfo[0].guessList[3*tvint+j].srcContID+");' title='"+empInfo[0].guessList[3*tvint+j].name+"'><div style=\"position: relative;  margin-left:6px;width: 76px; height: 108px;\"><img src='"+img0+"' width=\"76px\" height=\"108px\" border=\"0\" />";
							if(empInfo[0].guessList[3*tvint+j].guessPrice!=0){
								divXH+="<span style=\"position: absolute; top: 0; left: 0;width: 76px;text-align:right;\"><img src=\"pic/vip2x.png\" width=\"44px\" height=\"14px\" border=\"0\"/></span>";
							}
							divXH+="</div></td>";
						}															
					}
					divXH+="</tr>";
				}
				if(xhtvint<2&&xhtvmore>0){
					divXH+="<tr>";
					for(var j=0;j<tvmore;j++){
						if(j==0){
							divXH+="<td width='76px' height='25px' align='center' id='tvxhtxt1"+j+"' class='title1'><div style='width:76px;overflow: hidden; white-space: nowrap; text-overflow: hidden;'>"+empInfo[0].guessList[3*tvint+j].name+"</div></td>";
						}else{
							divXH+="<td width='76px' height='25px' align='center' id='tvxhtxt1"+j+"' class='title1'><div style='width:76px;overflow: hidden; white-space: nowrap; text-overflow: hidden;margin-left:6px;'>"+empInfo[0].guessList[3*tvint+j].name+"</div></td>";
						}										
					}
					divXH+="</tr>";
				}
				divXH=divXH+"</table>";
				document.getElementById("tinfo105").innerHTML=divXH;				
				play();
				firstPlay=1;
				document.getElementById("frame1").src="http://www.miguvideo.com/wap/resource/miguPC_client/comment.jsp?cid="+cids+"&mId="+mId+"&pageIndex=1";
			}else{
				if(xhr.readyState == 4&&xhr.status!=200){
					networkOut();				
				}
			}
		}		
		xhr.send();
	}catch(e){
		//alert(e);
	}
	
	
}

//为你推荐
function getRecommendData(contDisplayType,mediaType,mediaShape,playType){
	try{
		var xhr = getXHR();
		xhr.open("POST", vodurl2+"contDisplayType="+encodeURIComponent(contDisplayType,'UTF-8')+"&mediaType="+encodeURIComponent(mediaType,'UTF-8')+"&mediaShape="+encodeURIComponent(mediaShape,'UTF-8'), true);
		xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
		xhr.setRequestHeader('If-Modified-Since', '0');
		//xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');	
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4&&xhr.status==200) {
				var divStr = "";
				var empInfo = JSON.parse(xhr.responseText);
				var tjsize = empInfo.length;
				if(playType=="体育"){
						divStr = "<table border=0 cellSpacing=0 cellPadding=0 style='margin-top:17px'><tr height='20px' id='title'><td>为你推荐</td></tr></table><table border=0 cellSpacing=0 cellPadding=0 style=' margin-top:9px'>";	
						for(var m=0;m<tjsize;m++){
							var contid = empInfo[m].contId;
							var newName = empInfo[m].name;
							var imgH = empInfo[m].imgH;
							if(imgH==""){
									imgH = empInfo[m].imgV;
									if(imgH==""){
										imgH="pic/default2.png";
									}
							}
							
							divStr+="<tr><td style='cursor:pointer;' onselectstart='return false' onmouseover='changeOverStyle("+m+");' onmouseout='changeOutStyle("+m+");' onclick='clicktv("+contid+");'> ";						
							divStr+="<table border=0 cellSpacing=0 cellPadding=0 style='margin-top:6px' ><tr><td rowspan='1' height='60px' width='106px' id='movietitle2'><div style=\"position: relative; width: 106px; height: 60px;\"><img src='"+imgH+"' width=\"106px\" height=\"60px\" border=\"0\" />";
							//if(empInfo[0].isFree!=0){divStr+="<div style='float:right; text-align:center'><img src='pic/vip2x.png' width='44px' height='14px' border='0'/></div>";}
							//divStr+="<div style=\"background-color:#000000; filter:alpha(opacity=70);opacity:0.7;text-align:center; margin-top:48px; \">"+works.substring(0,4)+"-"+works.substring(4,6)+"-"+works.substring(6,8)+"期</div>";
							divStr+="</div></td><td width='10px'></td>";
							divStr+="<td width='118px' height='51px' id='zyover0"+m+"' class='movietitleover' valign='top'>"+subString(newName,50,true)+"</td>";
							divStr+="</tr></table></td></tr>";
						}
						divStr+="</table>";
						document.getElementById("tinfo104").innerHTML=divStr;
				}else{					
						var tvint = parseInt(tjsize/3)>1?2:parseInt(tjsize/3);
						var tvmore = tjsize%3;
						divStr = "<table border=0 cellSpacing=0 cellPadding=0 style='margin-top:17px'><tr height='20px' id='title'><td>为你推荐</td></tr></table><table border=0 cellSpacing=0 cellPadding=0 style=' margin-top:9px'>";			
						for(var i=0;i<tvint;i++){
							var img0 = empInfo[3*i+0].imgV;
							if(img0==""){
								img0=empInfo[3*i+0].imgH;
								if(img0==""){
									img0="pic/default.png";
								}
							}
							divStr+="<tr><td style='cursor:pointer;' onmouseover='changeOverStyletj("+i+",0);' onmouseout='changeOutStyletj("+i+",0);' onclick='clicktv("+empInfo[3*i+0].contId+");' title='"+empInfo[3*i+0].name+"'><div style=\"position: relative; width: 76px; height: 108px;\"><img src='"+img0+"' width=\"76px\" height=\"108px\" border=\"0\" />";
							if(empInfo[3*i+0].isFree!=0){
								divStr+="<span style=\"position: absolute; top: 0; left: 0;width: 76px;text-align:right;\"><img src=\"pic/vip2x.png\" width=\"44px\" height=\"14px\" border=\"0\"/></span>";
							}					
							var img1 = empInfo[3*i+1].imgV;
							if(img1==""){
								img1=empInfo[3*i+1].imgH;
								if(img1==""){
									img1="pic/default.png";
								}
							}
							divStr+="</div></td><td style='cursor:pointer;' onmouseover='changeOverStyletj("+i+",1);' onmouseout='changeOutStyletj("+i+",1);' onclick='clicktv("+empInfo[3*i+1].contId+");' title='"+empInfo[3*i+1].name+"'><div style=\"position: relative;  margin-left:6px;width: 76px; height: 108px;\"><img src='"+img1+"' width=\"76px\" height=\"108px\" border=\"0\" />";
							if(empInfo[3*i+1].isFree!=0){
								divStr+="<span style=\"position: absolute; top: 0; left: 0;width: 76px;text-align:right;\"><img src=\"pic/vip2x.png\" width=\"44px\" height=\"14px\" border=\"0\"/></span>";
							}		
							var img2 = empInfo[3*i+2].imgV;
							if(img2==""){
								img2=empInfo[3*i+2].imgH;
								if(img2==""){
									img2="pic/default.png";
								}
							}
							divStr+="</div></td><td style='cursor:pointer;' onmouseover='changeOverStyletj("+i+",2);' onmouseout='changeOutStyletj("+i+",2);' onclick='clicktv("+empInfo[3*i+2].contId+");' title='"+empInfo[3*i+2].name+"'><div style=\"position: relative;  margin-left:6px;width: 76px; height: 108px;\"><img src='"+img2+"' width=\"76px\" height=\"108px\" border=\"0\" />";
							if(empInfo[3*i+2].isFree!=0){
								divStr+="<span style=\"position: absolute; top: 0; left: 0;width: 76px;text-align:right;\"><img src=\"pic/vip2x.png\" width=\"44px\" height=\"14px\" border=\"0\"/></span>";
							}
							divStr+="</div></td></tr>";				
							divStr+="<tr height='17px'><td width='76px' height='25px' align='center'  class='title1' id='tvdjtxt"+i+"0'><div style='width:76px;overflow: hidden; white-space: nowrap; text-overflow: hidden;'>"+empInfo[3*i+0].name+"</div></td>";
							divStr+="<td width='76px' align='center' id='tvdjtxt"+i+"1' class='title1'><div style='width:76px;overflow: hidden; white-space: nowrap; text-overflow: hidden;margin-left:6px;'>"+empInfo[3*i+1].name+"</div></td>";
							divStr+="<td width='76px' align='center' id='tvdjtxt"+i+"2' class='title1'><div style='width:76px;overflow: hidden; white-space: nowrap; text-overflow: hidden;margin-left:6px;'>"+empInfo[3*i+2].name+"</div></td></tr>";
						}
						if(tvint<2&&tvmore>0){				
							divStr+="<tr>";
							for(var j=0;j<tvmore;j++){	
								var img0 = empInfo[3*tvint+j].imgV
								if(img0==""){
									img0=empInfo[3*tvint+j].imgH;
									if(img0==""){
										img0="pic/default.png";
									}
								}
								if(j==0){
									divStr+="<td style='cursor:pointer;' onmouseover='changeOverStyletj(1,"+j+");' onmouseout='changeOutStyletj(1,"+j+");' onclick='clicktv("+empInfo[3*tvint+j].contId+");' title='"+empInfo[3*tvint+j].name+"'><div style=\"position: relative; width: 76px; height: 108px;\"><img src='"+img0+"' width=\"76px\" height=\"108px\" border=\"0\" />";
									if(empInfo[3*tvint+j].isFree!=0){
										divStr+="<span style=\"position: absolute; top: 0; left: 0;width: 76px;text-align:right;\"><img src=\"pic/vip2x.png\" width=\"44px\" height=\"14px\" border=\"0\"/></span>";
									}
									divStr+="</div></td>";
								}else{
									divStr+="<td style='cursor:pointer;' onmouseover='changeOverStyletj(1,"+j+");' onmouseout='changeOutStyletj(1,"+j+");' onclick='clicktv("+empInfo[3*tvint+j].contId.nodeId+");' title='"+empInfo[3*tvint+j].name+"'><div style=\"position: relative;  margin-left:6px;width: 76px; height: 108px;\"><img src='"+img0+"' width=\"76px\" height=\"108px\" border=\"0\" />";
									if(empInfo[3*tvint+j].isFree!=0){
										divStr+="<span style=\"position: absolute; top: 0; left: 0;width: 76px;text-align:right;\"><img src=\"pic/vip2x.png\" width=\"44px\" height=\"14px\" border=\"0\"/></span>";
									}
									divStr+="</div></td>";
								}															
							}
							divStr+="</tr>";
						}
						if(tvint<2&&tvmore>0){
							divStr+="<tr>";
							for(var j=0;j<tvmore;j++){
								if(j==0){
									divStr+="<td width='76px' height='25px' align='center' id='tvdjtxt1"+j+"' class='title1'><div style='width:76px;overflow: hidden; white-space: nowrap; text-overflow: hidden;'>"+empInfo[3*tvint+j].name+"</div></td>";	
								}else{
									divStr+="<td width='76px' height='25px' align='center' id='tvdjtxt1"+j+"' class='title1'><div style='width:76px;overflow: hidden; white-space: nowrap; text-overflow: hidden;margin-left:6px;'>"+empInfo[3*tvint+j].name+"</div></td>";	
								}	
							}
							divStr+="</tr>";
						}
						divStr=divStr+"</table>";
						document.getElementById("tinfo104").innerHTML=divStr;
				}
				
			}
		}
		xhr.send();
	}catch(e){
		//alert(e);
	}
}

//中英截取
function subString(str, len, hasDot) {
	try{
		var newLength = 0;
		var newStr = "";
		var chineseRegex = /[^\x00-\xff]/g;
		var singleChar = "";
		var strLength = str.replace(chineseRegex, "**").length;
		for (var i = 0; i < strLength; i++) {
			singleChar = str.charAt(i).toString();
			if (singleChar.match(chineseRegex) != null) {
				newLength += 2;
			} else {
				newLength++;
			}
			if (newLength > len) {
				break;
			}
			newStr += singleChar;
		}

		if (hasDot && strLength > len) {
			newStr += " ...";
		}
	}catch(e){
		//alert(e);
	}
    return newStr;
}
		
//获取操作系统版本
function getWinVer() {
    var sUserAgent = navigator.userAgent;
    var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
    if (isWin2K) return "Win2000";
    var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
    if (isWinXP) return "WinXP";
    var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
    if (isWin2003) return "Win2003";
    var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
    if (isWinVista) return "WinVista";
    var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
    if (isWin7) return "Win7";
    var isWin8 = sUserAgent.indexOf("Windows NT 6.2") > -1 || sUserAgent.indexOf("Windows NT 6.3") > -1;
    if (isWin8) return "Win8";
    var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1;
    if (isWin10) return "Win10";
    return "other";
}

var visitor_type=0;
var user_id="";
var account_name="";
var phone_number="";
//获取用户信息
function getUserInfos(){
	try{
		$.ajax({
				url:"http://www.miguvideo.com/uic-service/userInfo/queryByUserId",			
				async:true,
				cache:false,
				success: function(data, textStatus, jqXHR ){
					if(data.resultCode == "1014"){//未登陆
						visitor_type=0;
						user_id="";
						account_name="";
						//phone_number="";
					}else if(data.resultCode == "0000"){//已登陆
						visitor_type=1;
						user_id=data.data.userId;
						account_name=data.data.name;
						//phone_number=data.data.mobile;
					}
				},
				error:function(qXHR, textStatus, errorThrown){
					user_id="";
					account_name="";
					//phone_number="";
				},
				complete:function(){
					
				}
		});
	}catch(e){
		//alert(e);
	}
}

//上报播放记录 
function saveHistory(){
	try{
		var xhr = getXHR();
		currTime =  migu_app.getCurrentPlayTime();	
		totalTime = migu_app.getDuration();
		var  hurl =  historyUrl+"userId="+user_id+"&contId="+cids+"&mId="+mId+"&cmId="+mId+"&platform=0005&mobile="+phone_number+"&source=PC&currTime="+currTime+"&totalTime="+totalTime;
		xhr.open("GET",hurl, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4&&xhr.status==200) {
				//alert(xhr.responseText);
				//var empInfo = JSON.parse(xhr.responseText);	
				//if(empInfo.code==200){
				//	alert("-==11");
				//}
			}
		}
		xhr.send();
	}catch(e){
		//alert(e);
	}
}

//上报数据.暂不报
function saveTeminal(playurl){
	try{
		var mac_address = migu_app.GetMac();	
		var visit_time=getCurTime();
		var ip_address=migu_app.getLocalAddr();
		var app_version=migu_app.GetVersion();
		var channel_id="";
		var visit_page="";
		var src_position="";
		var visit_session_id= guid();
		var visit_url=playurl;
		var xhr = getXHR();
		var data = "{\"visit_time\":\""+visit_time+"\",\"visitor_type\":\""+visitor_type+"\",\"user_id\":\""+user_id+"\",\"account_name\":\""+account_name+"\",\"phone_number\":\""+phone_number+"\",\"mac_address\":\""+mac_address+"\",\"ip_address\":\""+ip_address+"\",\"app_version\":\""+app_version+"\",\"channel_id\":\""+channel_id+"\",\"visit_page\":\""+visit_page+"\",\"src_position\":\""+src_position+"\",\"visit_session_id\":\""+visit_session_id+"\",\"visit_url\":\""+visit_url+"\"}";	
		xhr.open("POST", saveurl, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4&&xhr.status==200) {
				
			}
		}
		xhr.send(data);
	}catch(e){
		//alert(e);
	}
}
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
    return (S4()+S4()+S4()+S4());
}
function getCurTime() {
    var date = new Date();
    return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
}
function pad2(n) { 
	return n < 10 ? '0' + n : n 
}

//触发退出
function exitApp(){
	reportData(2,"",0);
}

//上报数据行为.  report_type:1、程序启动  2 、程序退出  3 、访问页面  4、菜单操作 、99 崩溃、5 播放时长
function reportData(report_type,playurl,flag){
	try{
		var duration=migu_app.getConfig("playTime");//播放时间
		if(duration>0){
			reportTypeData(report_type,playurl,flag,duration);
			reportTypeData(5,playurl,flag,duration);
		}else{
			reportTypeData(report_type,playurl,flag,0);
		}		
	}catch(e){
		//alert(e);
	}
}

function reportTypeData(report_type,playurl,flag,duration){
	try{
		var xhr = getXHR();
		var mac_address = migu_app.GetMac();
		var app_version=migu_app.GetVersion();
		var visit_url=playurl;
		var detail="";
		var browser = migu_app.getIEVersion();
		var visit_time=getCurTime();	
		var os = migu_app.getWinVersion();	
		var visit_session_id= guid();
		var runtime=migu_app.getConfig("runTime");//程序运行时间，正常退出．	
		var hurl =  reportUrl+"report_type="+report_type +"&visit_time="+visit_time +"&visitor_type="+visitor_type+"&user_id="+user_id+"&account_name="+account_name+"&phone_number="+phone_number+"&os="+os+"&browser="+browser+"&mac_address="+mac_address+"&app_version="+app_version+"&video_id="+cids+"&visit_session_id="+visit_session_id+"&detail="+detail+"&runtime="+runtime;		
		if(report_type==5&&duration>0){
			hurl=hurl+"&duration="+duration;
		}
		hurl=hurl+"&visit_url="+visit_url;
		//reportUrl+"current_system="+getWinVer() +"&ie="+IEVersion() +"&occurtime="+occurtime+"&crashdesc="+crashdesc;		
		if(flag==0){
			xhr.open("POST",hurl, false);
		}else{
			xhr.open("POST",hurl, true);
		}	
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4&&xhr.status==200) {
				//alert(xhr.responseText);
			}
		}
		xhr.send();
	}catch(e){
		//alert(e);
	}
}

//崩溃信息上报
function ReportCrash(str){
	try{
		//str="{\"current_system\":\"win 7\",\"ie\":\"11\",\"occurtime\":\"2018020203\",\"crashdesc\":\"exception\"}";		
		var crachStr = JSON.parse(str);	
		var xhr = getXHR();		
		var hurl =  reportUrl+"current_system="+crachStr.current_system +"&ie="+crachStr.ie +"&occurtime="+crachStr.occurtime+"&crashdesc="+crachStr.crashdesc;
		xhr.open("POST",hurl, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4&&xhr.status==200) {
				//alert(xhr.responseText);
			}
		}
		xhr.send();	
	}catch(e){
		//alert(e);
	}
}

//获取IE版本号，有问题。
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6; 
        }
    }else if (isIE11) {
        return 11; //IE11  
    } else {
        return - 1; //不是ie浏览器
    }
}

//更新用户图像
function updateUserData(){
	try{
		//alert("updateUserData");
		$.ajax({
				url:"http://www.miguvideo.com/uic-service/userInfo/queryByUserId",			
				async:true,
				cache:false,
				success: function(data, textStatus, jqXHR ){
					if(data.resultCode == "1014"){//未登陆
						visitor_type=0;
						user_id="";
						account_name="";
						//phone_number="";
						migu_app.updateUserInfo("");
					}else if(data.resultCode == "0000"){//已登陆
						visitor_type=1;
						user_id=data.data.userId;
						account_name=data.data.name;
						//phone_number=data.data.mobile;
						if(data.data.picture){
							migu_app.updateUserInfo("http://www.miguvideo.com/uic-service/publish/clt"+data.data.picture);
						}else{
							migu_app.updateUserInfo("1");//设置默认图片
						}

					}				
				},
				error:function(qXHR, textStatus, errorThrown){
					
				},
				complete:function(){
					
				}
		});
	}catch(e){
		//alert(e);
	}

}

//下一集
function NextFile() {
	try{
		if(nextid!=0){
			migu_app.ShowMiniEPG("loading.html",0);
			if(firstPlay==1){
				saveHistory();
			}
			setTimeout(function(){
				window.location.href = "vodpage.html?playcid=" + SubSerial_IDS.split(",")[nextid];
			},100);
			
		}	
	}catch(e){
		//alert(e);
	}
}
function nextFlag(){
	try{
		if(SubSerial_IDS.split(",").length==1){
			return false;
		}else{
			for (var i = 0; i < SubSerial_IDS.split(",").length; i++) {
				if (cids == SubSerial_IDS.split(",")[i]) {
					if(i==(SubSerial_IDS.split(",").length-1)){
						return false;
					}else{
						nextid=i+1;
						return true;
					}
				}
			}
		}
	}catch(e){
		//alert(e);
	}
}
//初始化菜单
function initMenu(topnum, vodtype) {
	try{
		var divStr = "<table border=0 cellSpacing=0 cellPadding=0 style='margin-left:20px;'>";
		if (topnum == 1) {
			divStr += "<tr><td background='pic/btn_playlist_pre2x.png' width='80px' height='26px' id='topmenu2' align='center'>播放列表</td><td width='18px'></td>";
			divStr += "<td background='pic/btn_interact2x.png' width='60px' height='26px' id='topmenu' align='center' onclick='initMenu(2," + vodtype + ");' onmouseover=\"this.style.backgroundImage='url(pic/btn_playlist_hover2x.png)'\" onmouseout=\"this.style.backgroundImage='url(pic/btn_playlist2x.png)'\" >互动</td><td width='18px'></td><td background='pic/btn_playlist2x.png' width='60px' height='26px' id='topmenu' align='center' onclick='initMenu(3," + vodtype + ");' onmouseover=\"this.style.backgroundImage='url(pic/btn_interact_hover2x.png)'\" onmouseout=\"this.style.backgroundImage='url(pic/btn_interact2x.png)'\" >详情</td></tr>";
			document.getElementById("scrollbox").style.display = "block";
			if (vodtype == 1) {
				document.getElementById("area-teleplay").style.display = "block";
				document.getElementById("area-movie").style.display = "none";
				document.getElementById("area-variety").style.display = "none"
			} else if (vodtype == 2) {
				document.getElementById("area-teleplay").style.display = "none";
				document.getElementById("area-movie").style.display = "block";
				document.getElementById("area-variety").style.display = "none"
			} else if (vodtype == 3) {
				document.getElementById("area-teleplay").style.display = "none";
				document.getElementById("area-movie").style.display = "none";
				document.getElementById("area-variety").style.display = "block"
			}
			document.getElementById("scrollbox1").style.display = "none";
			document.getElementById("scrollbox2").style.display = "none";
			setTimeout(function(){
				$("#scrollbox1").getNiceScroll().hide();
				$("#scrollbox2").getNiceScroll().hide();
				$("#scrollbox").getNiceScroll().show();
				$("#scrollbox").getNiceScroll().resize();
				$("#scrollbox").niceScroll({cursorcolor:"#3B3B3B",cursorwidth: "8px",cursorborder: "1px solid #3B3B3B",cursorborderradius: "8px", autohidemode: true, iframeautoresize: true});
			},200);
		} else if (topnum == 2) {
			divStr += "<tr><td background='pic/btn_playlist2x.png' width='80px' height='26px' id='topmenu' align='center' onclick='initMenu(1," + vodtype + ");' onmouseover=\"this.style.backgroundImage='url(pic/btn_playlist_hover2x.png)'\" onmouseout=\"this.style.backgroundImage='url(pic/btn_playlist2x.png)'\" >播放列表</td><td width='18px'></td>";
			divStr += "<td background='pic/btn_interact_pre2x.png' width='60px' height='26px' id='topmenu2' align='center' >互动</td>";
			divStr += "<td width='18px'></td><td background='pic/btn_playlist2x.png' width='60px' height='26px' id='topmenu' align='center' onclick='initMenu(3," + vodtype + ");' onmouseover=\"this.style.backgroundImage='url(pic/btn_interact_hover2x.png)'\" onmouseout=\"this.style.backgroundImage='url(pic/btn_interact2x.png)'\" >详情</td></tr>";
			document.getElementById("scrollbox").style.display = "none";
			document.getElementById("scrollbox1").style.display = "block";
			document.getElementById("scrollbox2").style.display = "none";
			$("#scrollbox").getNiceScroll().hide();
			$("#scrollbox2").getNiceScroll().hide();
			$("#scrollbox1").getNiceScroll().show();
			$("#scrollbox1").getNiceScroll().resize();
			$("#scrollbox1").niceScroll({cursorcolor:"#3B3B3B",cursorwidth: "8px",cursorborder: "1px solid #3B3B3B",cursorborderradius: "8px", autohidemode: true, iframeautoresize: true});
		} else if (topnum == 3) {
			divStr += "<tr><td background='pic/btn_playlist2x.png' width='80px' height='26px' id='topmenu' align='center' onclick='initMenu(1," + vodtype + ");' onmouseover=\"this.style.backgroundImage='url(pic/btn_playlist_hover2x.png)'\" onmouseout=\"this.style.backgroundImage='url(pic/btn_playlist2x.png)'\" >播放列表</td><td width='18px'></td><td background='pic/btn_interact2x.png' width='60px' height='26px' id='topmenu' align='center' onclick='initMenu(2," + vodtype + ");' onmouseover=\"this.style.backgroundImage='url(pic/btn_playlist_hover2x.png)'\" onmouseout=\"this.style.backgroundImage='url(pic/btn_playlist2x.png)'\" >互动</td>";
			divStr += "<td width='18px'></td><td background='pic/btn_interact_pre2x.png' width='60px' height='26px' id='topmenu2' align='center' >详情</td></tr>";
			document.getElementById("scrollbox").style.display = "none";
			document.getElementById("area-teleplay").style.display = "none";
			document.getElementById("scrollbox1").style.display = "none";
			document.getElementById("scrollbox2").style.display = "block";
			$("#scrollbox1").getNiceScroll().hide();
			$("#scrollbox").getNiceScroll().hide();
			$("#scrollbox2").getNiceScroll().show();
			$("#scrollbox2").getNiceScroll().resize();
			$("#scrollbox2").niceScroll({cursorcolor:"#3B3B3B",cursorwidth: "8px",cursorborder: "1px solid #3B3B3B",cursorborderradius: "8px", autohidemode: true, iframeautoresize: true});
		}
		divStr += "</table>";
		document.getElementById("tinfomenu").innerHTML = divStr;
	}catch(e){
		//alert(e);
	}
}

//综艺－onmouseover触发
function changeOverStyle(id) {
    document.getElementById("zyover0" + id).className = 'movietitle';
	document.getElementById("zyover1" + id).className = 'movietitle1';
	//document.getElementById("imgover" + id).src = 'pic/play-02.png';
}

function changeOutStyle(id) {
    document.getElementById("zyover0" + id).className = 'movietitleover';
	document.getElementById("zyover1" + id).className = 'movietitle1over';
	//document.getElementById("imgover" + id).src = 'pic/play-01.png';
}

function changeOverStyletj(id,i) {
    document.getElementById("tvdjtxt"+id+""+i+"").className = 'title1over';
}

function changeOutStyletj(id,i) {
    document.getElementById("tvdjtxt"+id+""+i+"").className = 'title1';
}

function changeOverStylexh(id,i) {
    document.getElementById("tvxhtxt"+id+""+i+"").className = 'title1over';
}

function changeOutStylexh(id,i) {
    document.getElementById("tvxhtxt"+id+""+i+"").className = 'title1';
}

//点击播放
function clicktv(cid){
	try{
		if(firstPlay==1){
				saveHistory();
		}
		setTimeout(function(){
			window.location.href="vodpage.html?playcid="+cid;
		},100);
	}catch(e){
		//alert(e);
	}
}

var rtype = "";
function changeRateEvent(rate){	
	try{
		migu_app.ShowMiniEPG("loading.html",0);	
		if(rate == 4){
			rate = 3;
		}else if(rate == 8){
			rate = 4;
		}else if(rate == 16){
			rate = 5;
		}else if(rate == 32){
			rate = 6;
		}
		rtype=rate;
		play();
	}catch(e){
		//alert(e);
	}
}
//播放视频资源
function play(){
	if(isPingBi==1){
		migu_app.ShowMiniEPG("networkout.html?id=2",0);
	}else{
		//migu_app.ShowMiniEPG("loading.html",0);
		if(isOrd!=1){
			isOrd=0;
		}
		var timestamp = new Date().getTime();	
		var rates = 0;	
		var getPlayUrl = vodplayUrl + "contId="+cids;		
		if(rtype!=""){
			getPlayUrl=getPlayUrl+"&rateType="+rtype;
		}else{			
			var rate = migu_app.getConfig("rateType");
			if(rate == 4){
				rate = 3;
			}else if(rate == 8){
				rate = 4;
			}else if(rate == 16){
				rate = 5;
			}else if(rate == 32){
				rate = 6;
			}
			getPlayUrl=getPlayUrl+"&rateType="+rate;
		}	
		var xhr = getXHR();
		xhr.open("GET", getPlayUrl, true);
		xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
		xhr.setRequestHeader('If-Modified-Since', '0');
		var infoString = getUserInfo();
		var info;
		if(infoString){
			infoString = infoString.replace(/'/g, "\"");
			info = JSON.parse(infoString);
			if(info){
				xhr.setRequestHeader("userId", info.userId);
				xhr.setRequestHeader("userToken", info.userToken);
				xhr.setRequestHeader("SDKCEId", "79acd784-cbbb-4cae-8778-8723e001164b");
				xhr.setRequestHeader("X-UP-CLIENT-CHANNEL-ID", "101700040000001");
				xhr.setRequestHeader("channel", "0125");
				xhr.setRequestHeader("clientId",guid())

			} 
		}	
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4&&xhr.status==200) {
				var empInfo = JSON.parse(xhr.responseText);
				if(empInfo.code==409){
					if(!isLogins()){
						migu_app.Login("miguplay://html/vodpage.html?playcid="+cids);
					}
				}else if(empInfo.code==400){
					migu_app.ShowMiniEPG("networkout.html?id=5",0);
				}else if(empInfo.code==410){
					migu_app.ShowMiniEPG("networkout.html?id=6",0);
				}else if(empInfo.code==401){
					migu_app.ShowMiniEPG("networkout.html?id=7",0);
				}else if(empInfo.code==404){
					migu_app.ShowMiniEPG("networkout.html?id=8",0);
				}else if(empInfo.code==411){
					migu_app.ShowMiniEPG("networkout.html?id=9",0);
				}else if(empInfo.code==200||empInfo.code==412){
					for(var i=0;i<empInfo.body.mediaFiles.length;i++){
						var rateT = parseInt(empInfo.body.mediaFiles[i].rateType);
						if(rateT == 1 || rateT == 2){
							rates += rateT;
						}else if(rateT == 3){
							rates += 4;
						}else if(rateT == 4){
							rates += 8;
						}else if(rateT == 5){
							rates += 16;
						}else if(rateT == 6){
							rates += 32;
						}												
					}		
					if(rates>0){
						var rateType1 = parseInt(empInfo.body.urlInfo.rateType);
						var urlinforate = empInfo.body.urlInfo.rateType;
						if(urlinforate == "3"){
							rateType1 = 4;
						}else if(urlinforate == "4"){
							rateType1 = 8;
						}else if(urlinforate == "5"){
							rateType1 = 16;
						}else if(urlinforate == "6"){
							rateType1 = 32;
						} 						
						if(empInfo.body.urlInfo.urlType=="normal"||empInfo.body.urlInfo.urlType=="tourist"){
							isOrd=1;
						}else{
							isOrd=0;
						}					
					}
					if(empInfo.code==412){
						isOrd=0;
					}
					/**
					setTimeout(function(){
						getUserInfos();
						saveTeminal(empInfo.body.urlInfo.url);
					},1000);
					**/
					reportData(3,encodeURIComponent(empInfo.body.urlInfo.url),1);
					if(isLogins()){
						if(migu_app.getConfig(name)==0){
							breakPlay();
							if(isRealNum(currPlayTime)){
								if(currPlayTime!=0){
									migu_app.playByTime(currPlayTime);
								}
							}
						}						
						migu_app.Play(name, parseInt(isOrd), rateType1 ,empInfo.body.urlInfo.url, rates,nextF);
					}else{

						migu_app.Play(name, parseInt(isOrd), rateType1 ,empInfo.body.urlInfo.url, rates,nextF);
					}
					
				}
				
			}
		}
		xhr.send();		
		//migu_app.Play(name, parseInt(isOrd), url2, url1, url3,nextF);

	}	
}

//判断是否为数据
function isRealNum(val){
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if(val === "" || val ==null){
        return false;
    }
    if(!isNaN(val)){
        return true;
    }else{
        return false;
    }
}

//登陆状态跳转
function LoginStatus(type){
	try{
		if(isLogins()){
			migu_app.LoadUrl(3,"http://www.miguvideo.com/wap/resource/miguPC_client/memberCenter/user_center.jsp");
		}else{
			if(type==0){
				migu_app.Login("miguplay://html/test.html");
			}else if(type==1){					
				migu_app.Login("miguplay://html/vodpage.html?playcid="+cids);
			}
		}
	}catch(e){
		//alert(e);
	}
}

//登陆状态
function isLogins(){
	try{
		var infoString = getUserInfo();
		if(infoString){
			infoString = infoString.replace(/'/g, "\"");
			var info = JSON.parse(infoString);
			if(info.userId && info.userToken){
				return true;
			}
		}	
	}catch(e){
		//alert(e);
	}
	return false;
} 
function getUserInfo(){
	try{
		return migu_app.getLoginInfo();
	}catch(e){
		//alert(e);
	}
}

//订购
function OrderVideo(){
	try{
		if(isLogins()){
			payorder();
		}else{
			migu_app.Login("miguplay://html/vodpage.html?playcid="+cids);
		}
	}catch(e){
		//alert(e);
	}
}

function payorder(){
	var callbackUrl = "miguplay://html/vodpage.html?playcid="+cids;
	migu_app.ShowMiniEPG("https://www.miguvideo.com/wap/resource/miguPC_client/payOrder.jsp",callbackUrl,760,450);
}

//全屏｜还原
window.onresize = function() {	
    var resizeTimer = null;
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
		autoHeight();
    }, 10);
}

function autoHeight(){
	var webH = $(window).height();	
    if (webH == 0) {
		return;
    }
    try{
		if((webH-55)!=$("#scrollbox").height()){
			$("#scrollbox").height((webH-55) + 'px');
			$("#scrollbox1").height((webH-55) + 'px');
			$("#scrollbox2").height((webH-55) + 'px');
			$("#frame1").height((webH-55) + 'px');
			//document.getElementsByTagName('body')[0].style.height = webH+'px'; 
		}	
	}catch(e){
		//alert(e);
	}
}

//禁止F5
document.onkeydown = function() {
    if (event.keyCode == 116) {
        event.keyCode = 0;
        event.cancelBubble = true;
        return false;
    }
}

//断网信息
function networkOut(){
	migu_app.ShowMiniEPG("networkout.html?id=3",0);
}

function RefreshPage(){
	location.reload();
}
function LocalMedia(){
	window.location.href = "localmedia.html";
}
//禁止右键
document.oncontextmenu=function(e){
	return true;
}

//播放完成
function playFinish(){
	migu_app.ShowMiniEPG("networkout.html?id=4",0);
}

var iszj = 0;
var zjtype = 1;
//添加追剧
function zhuiju(){
	try{
		var xhr = getXHR();
		if(iszj==0){
			var videotime = migu_app.getConfig("duration");
			var hurl = "http://www.miguvideo.com/uic-service/favroites/add?&userId="+user_id+"&contentId="+cids+"&mId="+mId+"&type=1&platform=0005&mobile="+phone_number+"&totalTime="+videotime;
		}else if(iszj==1){			
			var hurl = "http://www.miguvideo.com/uic-service/favroites/remove?&userId="+user_id+"&platform=0005&mId="+mId+"&type=1";
		}
		xhr.open("POST",hurl, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4&&xhr.status==200) {
				var empInfo = JSON.parse(xhr.responseText);
				if(empInfo.resultCode=="0000"){
					if(iszj==0){
						if(zjtype==1){
							migu_app.ShowMiniEPG("msg.html?msg=追剧成功!","",140,50);
							document.getElementById("zjimg").src="pic/zj_y2x.png";
						}else{
							migu_app.ShowMiniEPG("msg.html?msg=收藏成功!","",140,50);
							document.getElementById("scimg").src="pic/collect_y.png";		
						}										
						iszj = 1;
					}else if(iszj==1){
						if(zjtype==1){
							infoStr="删除追剧成功!";
							migu_app.ShowMiniEPG("msg.html?msg=删除追剧成功!","",140,50);
							document.getElementById("zjimg").src="pic/zj_n2x.png";
						}else{
							infoStr="删除收藏成功!";
							migu_app.ShowMiniEPG("msg.html?msg=删除收藏成功!","",140,50);
							document.getElementById("scimg").src="pic/collect_n.png";
						}
						iszj = 0;
					}
				}else if(empInfo.resultCode=="1014"){
					migu_app.Login("miguplay://html/vodpage.html?playcid="+cids);
				}else if(empInfo.resultCode=="1062"){
					migu_app.ShowMiniEPG("msg.html?msg=重复信息!","",140,50);
				}else if(empInfo.resultCode=="0057"){
					migu_app.ShowMiniEPG("msg.html?msg=参数异常!","",140,50);
				}else if(empInfo.resultCode=="0402"){
					migu_app.ShowMiniEPG("msg.html?msg=数据查询失败!","",140,50);
				}else if(empInfo.resultCode=="0007"){
					migu_app.ShowMiniEPG("msg.html?msg=未知异常!","",140,50);
				}else if(empInfo.resultCode=="0004"){
					migu_app.ShowMiniEPG("msg.html?msg=数据库异常!","",140,50);
				}else if(empInfo.resultCode=="0012"){
					migu_app.ShowMiniEPG("msg.html?msg=当前时间超出预约时间!","",140,50);
				}else{
					migu_app.ShowMiniEPG("msg.html?msg=数据发生异常!","",140,50);
				}
			}
		}
		xhr.send();
	}catch(e){
		//alert(e);
	}
}


//是否为追剧.1追剧2收藏
function iszhuiju(type){
	try{
		zjtype = type;
		var xhr = getXHR();
		var hurl = "http://www.miguvideo.com/uic-service/favroites/isCollected?userId="+user_id+"&mIds="+mId+"&type=1&platform=0005";
		xhr.open("POST",hurl, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4&&xhr.status==200) {
				var empInfo = JSON.parse(xhr.responseText);	
				if(type==1){
					document.getElementById("zjimg").style.display = "block";
					if(empInfo.resultCode=="0000"){
						var strJson = JSON.stringify(empInfo.resultList);
						if(strJson.indexOf(",")==-1){						
							if(strJson.indexOf("true")>-1){
								iszj = 1;
								document.getElementById("zjimg").src="pic/zj_y2x.png";	
							}else{
								iszj = 0;
								document.getElementById("zjimg").src="pic/zj_n2x.png";
							}
						}else{
							for(var i=0;i<strJson.split(",").length;i++){
								if(strJson.split(",")[i].indexOf(mId)>-1){
									if(strJson.split(",")[i].indexOf("true")>-1){
										document.getElementById("zjimg").style.display = "block";
										if(strJson.indexOf("true")>-1){
											iszj = 1;
											document.getElementById("zjimg").src="pic/zj_y2x.png";						
										}else{
											iszj = 0;
											document.getElementById("zjimg").src="pic/zj_n2x.png";
										}
									}
								}
							}
						}
					}else{
						iszj = 0;
						document.getElementById("zjimg").src="pic/zj_n2x.png";
					}
				}else{
					document.getElementById("scimg").style.display = "block";
					if(empInfo.resultCode=="0000"){
						var strJson = JSON.stringify(empInfo.resultList);
						if(strJson.indexOf(",")==-1){						
							if(strJson.indexOf("true")>-1){
								iszj = 1;
								document.getElementById("scimg").src="pic/collect_y.png";	
							}else{
								iszj = 0;
								document.getElementById("scimg").src="pic/collect_n.png";
							}
						}else{
							for(var i=0;i<strJson.split(",").length;i++){
								if(strJson.split(",")[i].indexOf(mId)>-1){
									if(strJson.split(",")[i].indexOf("true")>-1){
										document.getElementById("scimg").style.display = "block";
										if(strJson.indexOf("true")>-1){
											iszj = 1;
											document.getElementById("scimg").src="pic/collect_y.png";						
										}else{
											iszj = 0;
											document.getElementById("scimg").src="pic/collect_n.png";
										}
									}
								}
							}
						}
					}else{
						iszj = 0;
						document.getElementById("scimg").src="pic/collect_n.png";
					}
				}
				
			}
		}
		xhr.send();
	}catch(e){
		//alert(e);
	}
}

//分享
function share(){	
	localStorage.setItem("shareimg","");
	refreshShareImg();
	if(zjtype==1){
		document.getElementById("shareimg").src="pic/share_y2x.png";	
	}else{
		document.getElementById("shareimg1").src="pic/share_y2x.png";	
	}
	migu_app.ShowMiniEPG("share.html?name="+name+"&cids="+cids+"&imgHstr="+imgHstr,"",335,250);
}
function closeWin(){
	localStorage.setItem("shareimg","refresh");
	migu_app.CloseMiniEPG();
	
}
function shareurl(type,concid,strimg,nameStr){	
	var backUrl = "http://www.miguvideo.com/wap/resource/pc/detail/miguplay.jsp?cid="+concid;
	if(type==1){
		migu_app.LoadUrl(4,"http://v.t.sina.com.cn/share/share.php?title="+ nameStr + "&url="+ encodeURIComponent(backUrl) + "&content=utf-8&sourceUrl="+ encodeURIComponent(backUrl) + "&pic="+encodeURIComponent(strimg));
	}else if(type==2){
		migu_app.LoadUrl(4,"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary="+ nameStr + "&url="+ encodeURIComponent(backUrl) + "&pics="+encodeURIComponent(strimg));
	}else if(type==3){
		migu_app.LoadUrl(4,"http://widget.renren.com/dialog/share?title="+ nameStr + "&link="+ encodeURIComponent(backUrl) + "&pic="+ encodeURIComponent(strimg));
	}else if(type==4){
		migu_app.LoadUrl(4,"http://tieba.baidu.com/f/commit/share/openShareApi?title="+ nameStr + "&url="+ encodeURIComponent(backUrl) + "&pic="+ encodeURIComponent(strimg));
	}
	closeWin();
}

//复制链接
function copyUrl(concid){
	var backUrl = "http://www.miguvideo.com/wap/resource/pc/detail/miguplay.jsp?cid="+concid;
	window.clipboardData.setData("Text",backUrl);
    alert("复制成功!"); 
}

//断点续播
var currPlayTime=0;
function breakPlay(){
	try{
		var xhr = getXHR();
		var hurl = "http://www.miguvideo.com/uic-service/playHistory/queryOne?userId="+user_id+"&mId="+mId+"&prdInfoIds="+prdInfoIds;
		xhr.open("POST",hurl, false);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4&&xhr.status==200) {				
				var empInfo = JSON.parse(xhr.responseText);
				if(empInfo.playhistory.contId==cids){
					currPlayTime = empInfo.playhistory.currTime;	
				}else{
					currPlayTime=0;
				}
			}
		}
		xhr.send();
	}catch(e){
		//alert(e);
	}
}

//更新分享图标
var intervalT1="";
function refreshShareImg(){
	intervalT1 = window.setInterval("setShareImg()",1000); 
	
}
function setShareImg(){
	var sharevalue = localStorage.getItem("shareimg");
	if(sharevalue=="refresh"){
		if(zjtype==1){
			document.getElementById("shareimg").src="pic/share_n2x.png";	
		}else{
			document.getElementById("shareimg1").src="pic/share_n2x.png";
		}
		localStorage.setItem("shareimg","");
		window.clearInterval(intervalT1); 
	}	
}



//用户播放记录
function toPlayHistory(){
	try{
		$.ajax({
				url:"http://www.miguvideo.com/uic-service/userInfo/queryByUserId",			
				async:true,
				cache:false,
				success: function(data, textStatus, jqXHR ){
					if(data.resultCode == "1014"){//未登陆
						visitor_type=0;
						user_id="";
						account_name="";
						//phone_number="";
						migu_app.updateUserInfo("");
						migu_app.Login("http://www.miguvideo.com/wap/resource/miguPC_client/memberCenter/my_record.jsp");
					}else if(data.resultCode == "0000"){//已登陆
						visitor_type=1;
						user_id=data.data.userId;
						account_name=data.data.name;
						//phone_number=data.data.mobile;
						if(data.data.picture){
							migu_app.updateUserInfo("http://www.miguvideo.com/uic-service/publish/clt"+data.data.picture);
						}else{
							migu_app.updateUserInfo("1");//设置默认图片
						}
						migu_app.SetConfig("goto","playhistory");
					}				
				},
				error:function(qXHR, textStatus, errorThrown){
					
				},
				complete:function(){
					
				}
		});
	}catch(e){
		//alert(e);
	}

}

