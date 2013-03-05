$(document).ready(function () {
  
  var ccSetQuestion = function(){
    $.get('cc-modal-text.txt', function(data) {
      $('#cc-modal p').html(data);
    });
  }
  
  var ccShowModal = function(){
    ccSetQuestion();
    
    $('#cc-modal').modal({
      keyboard: false
    });        
  };
  
  var ccCloseModal = function(){
      $('#cc-modal').modal('hide');
  };
    
  var ccSetCookie = function(ccName,value,exdays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=ccName + "=" + c_value;
  }

  var ccGetCookie = function(ccName){
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==ccName)
        {
        return unescape(y);
        }
      }
    };
   
  var ccPlaceAnalytics = function(){
    $.get('cc-js/analytics.js', function(data) {
      $('#scripts').html(data);
      data._gaq.push(['_trackPageview']);
    });    
  };
    
  var ccCheckCookie = function(){
    var ccSChoice=ccGetCookie("ccSChoice");
      
    if (ccSChoice!=null && ccSChoice!=""){
      
      if (ccSChoice == "yes"){       
        ccPlaceAnalytics();
      } 
  
    } else {
      ccShowModal();
    }
  }
  
  $('#cc-modal .btn').click(function(){
    ccSChoice = $(this).data('close');
    ccSetCookie('ccSChoice', ccSChoice, 365);
    ccCheckCookie();
    ccCloseModal();
  });
  
  ccCheckCookie();

});