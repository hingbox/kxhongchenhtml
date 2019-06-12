/**
 * User: hingbox@163.com
 * Date: 2019/1/16
 * Time: 16:38
 * Version:${1.0}
 */
var forwardUrl = "http://pc.miguvideo.com/MiguApi";
function getNewGuid() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
var uuid = getNewGuid();
//console.log("uuid",uuid);
var version = migu_app.GetVersion();//获取客户端版本号
//var version ="3.3.0.105";//获取客户端版本号
$("#btn_submt").click(function () {
    var options = $('#selectType option:selected').val();//选中的值
    if("0" == options){
        $("#disappare").children("p").css("color","#999999");
        $("#disappare").children("div").css("color","#999999");
        $("#disappare").css("background","#333333");
        $("#disappare").children("p").text("请选择反馈类型!")
        $("#disappare").show().delay(1000).hide(300);
        return false;
    }
    var contents = $("#contents").val();
    if (isEmpty(contents)) {
        $("#disappare").children("p").css("color","#999999");
        $("#disappare").children("div").css("color","#999999");
        $("#disappare").css("background","#333333");
        $("#disappare").children("p").text("请输入反馈内容!")
        $("#disappare").show().delay(1000).hide(300);
        return false;
    }

    var mobile = document.getElementById("mobile").value;
    if (!isEmpty(mobile)){
        var p1=/^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\{8}|14[57]\d{8})$/;
        if(p1.test(mobile)==false) {
            $("#disappare").children("p").css("color","#999999");
            $("#disappare").children("div").css("color","#999999");
            $("#disappare").css("background","#333333");
            $("#disappare").children("p").text("请填写正确手机号!")
            $("#disappare").show().delay(1000).hide(300);
            return false;
        }
    }

    //feedBack()
    $.ajax({
        type: "get",
        url:forwardUrl+"/forwardapi/feedback.ac?type="+options+"&contents="+contents+"&uuid="+uuid+"&version="+version+"&mobile="+mobile,
        //url:"http://127.0.0.1:8088/forwardapi/feedback.ac?type=1&contents=1",
        contentType: "application/json;charset=utf-8",
        dataType:"jsonp",
        jsonp:"jsoncallback",
        jsonpCallback:"feedBack",
        success: function (data) {
        },error:function(error){
        }
    });
});

function feedBack(data){
    if ("200" == data.code){
        //提示成功
        $("#disappare").children("p").css("color","#FFFFFF");
        $("#disappare").children("div").css("color","#FFFFFF");
        $("#disappare").css("background","#007AFF");
        $("#disappare").children("p").text("反馈成功!");
        $("#disappare").show().delay(1000).hide(300);
        setTimeout("closeWindow()","500");
    }else {
        closeWindow()
    }

}
//关闭弹框
function closeWindow(){
    migu_app.SetConfig("close","mini");
}

function isEmpty(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}

function onlyNum(){
    if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39))
        if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
            event.returnValue=false;  //执行至该语句时，阻止输入；可类比阻止冒泡原理或者禁止右键功能；
}
