function fbShare(){
	window.plugins.socialsharing.shareViaFacebook('Hi, Have you heard about Itende Styles ? The app helps you with Itende style Settings for any keyboard that features on Itende music Style and helps you find a nearest trusted store or supplier you can buy from.', 
                                                 null /* img */, 
                                                 null /* url */, 
                                                 null, 
                                                 function(errormsg){unableToShare()}
                                                 );
};
 
function whatsappShare(){

	window.plugins.socialsharing.shareViaWhatsApp('Hi, Have you heard about Itende Styles ? The app helps you with Itende style Settings for any keyboard that features on Itende music Style and helps you find a nearest trusted store or supplier you can buy from.',
                                                 null /* img */,
                                                 'https://Play.google.com/store/apps/details?id=com.ItendeStyle.Itende' /* url */, 
                                                 null, 
                                                 function(errormsg){unableToShare()}
                                                 );
};
 
function twitterShare(){
	 window.plugins.socialsharing.shareViaTwitter('Hi, Have you heard about Itende Styles ? The app helps you with Itende style Settings for any keyboard that features on Itende music Style and helps you find a nearest trusted store or supplier you can buy from.',
                                                 null /* img */, 
                                                 'https://Play.google.com/store/apps/details?id=com.ItendeStyle.Itende' , 
                                                 null, 
                                                 function(errormsg){unableToShare()}
                                                 );
  };
 
 function otherShare(){
   window.plugins.socialsharing.share('Hi, Have you heard about Itende Styles ? The app helps you with Itende style Settings for any keyboard that features on Itende music Style and helps you find a nearest trusted store or supplier you can buy from.',
    null,
    'https://Play.google.com/store/apps/details?id=com.ItendeStyle.Itende' , 
    null,
      null);
  };
function unableToShare()
{
  window.plugins.toast.showLongBottom('Unable to share!', function (a) { console.log('toast success: ' + a) }, function (b) { alert('toast error: ' + b) });
}
function comingSoon()
{
    location.href="DownloadBeats.html";

}
function notAvailable()
{
  window.plugins.toast.showLongBottom('Not Available!', function (a) { console.log('toast success: ' + a) }, function (b) { alert('toast error: ' + b) });
    
}

  $('#share').click(function(){
    $('.invite').slideToggle();
    $('#overlay-invite').show();
    $('#navbarCollapse').slideToggle();
 });

 $('#overlay-invite').click(function(){
    $('.invite').slideToggle();
    $('#overlay-invite').hide();
 });

function menu(){
    $('#navbarCollapse').slideToggle();
 };

 function goback()
 {
   window.history.back();

 }

 document.addEventListener("deviceready", onDeviceReady, false);
 function onDeviceReady() {
  StatusBar.overlaysWebView(false);
 }

 
