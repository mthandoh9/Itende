function onLoad() {
  
    document.addEventListener("deviceready", onDeviceReady, false);
}
function adSetter()
{
alert(navigator.userAgent);
var admobid ={};
if(/(android)/i.test(navigator.userAgent))
{
  admobid ={
    banner: 'ca-app-pub-9845513592050657/2935628640',
    interstitial: 'ca-app-pub-9845513592050657/6715338970'
  };
    
} else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent))
{
  admobid ={
    banner: 'ca-app-pub-9845513592050657/2935628640',
    interstitial: 'ca-app-pub-9845513592050657/6715338970'
  };

}else{

  admobid ={
    banner: 'ca-app-pub-9845513592050657/2935628640',
    interstitial: 'ca-app-pub-9845513592050657/6715338970'
  };
}
  if(window.AdMob) AdMob.createBanner({
    
    adId:admobid.banner,
   position:AdMob.AD_POSITION.BOTTOM_CENTER,
 autoShow:true
    }) ;
     if(window.AdMob) AdMob.prepareInterstitial({ adId:admobid.interstitial,autoShow:false});
}
function onDeviceReady() {
    
    document.addEventListener("backbutton", onBackKeyDown, false);
    adSetter();
  }