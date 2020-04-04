 window.onload = function(){
   if(window.AdMob) AdMob.showInterstitial();
   window.onbeforeunload =function(){
        if(window.AdMob) AdMob.showInterstitial();
   };
 }