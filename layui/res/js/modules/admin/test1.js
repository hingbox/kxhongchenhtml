/**
  ��չһ��testģ��
**/      
 
layui.define(function(exports){ //��ʾ��ģ��Ҳ������������ģ�飬�磺layui.define('layer', callback);
  var obj = {
    hello: function(str){
      alert('Hello '+ (str||'test'));
    }
  };
  
  //���test�ӿ�
  exports('test1', obj);
});   