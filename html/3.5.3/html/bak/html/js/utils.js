/**url参数解析 函数**/
(function($) {
    var re = /([^&=]+)=?([^&]*)/g,
        decodeRE = /\+/g,
        decode = function (str) { return decodeURIComponent( str.replace(decodeRE, " ") ); };

    $.parseParams = function(query) {
        var params = {}, e;
        while ( e = re.exec(query) ) params[ decode(e[1]) ] = decode( e[2] );
        return params;
    };
})(jQuery);

/**HTMLDecode 函数**/
(function($){
	$.HTMLDecode = function(text) { 
		var temp = document.createElement("div"); 
		temp.innerHTML = text; 
		var output = temp.innerText || temp.textContent; 
		temp = null; 
		return output; 
	} 
})(jQuery);

/**使用cookie校验登陆状态 函数**/
function isLogin(){
	var UserInfo = migu_app.GetCookies("https://passport.migu.cn/login","LTToken");
	if(UserInfo){
		if(UserInfo.trim().length > 0){
			return true;
		}
	}
	return false;
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
function pad2(n) { return n < 10 ? '0' + n : n }

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

function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
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
            return 6; //IE版本<=7
        }
    } else if (isEdge) {
        return 'edge'; //edge
    } else if (isIE11) {
        return 11; //IE11  
    } else {
        return - 1; //不是ie浏览器
    }
}
