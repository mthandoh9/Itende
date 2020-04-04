document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    //window.plugins.AdMob.destroyBannerView();
    adSetter();
}
function adSetter() {

    var admobid = {};
    if (/(android)/i.test(navigator.userAgent)) {
        admobid = {
            banner: 'ca-app-pub-9845513592050657/2935628640',
            interstitial: 'ca-app-pub-9845513592050657/6715338970'
        };

    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = {
            banner: 'ca-app-pub-9845513592050657/2935628640',
            interstitial: 'ca-app-pub-9845513592050657/6715338970'
        };

    } else {

        admobid = {
            banner: 'ca-app-pub-9845513592050657/2935628640',
            interstitial: 'ca-app-pub-9845513592050657/6715338970'
        };
    }

    if (AdMob) AdMob.createBanner({
        adId: admobid.banner,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow: true,
    });

    if (window.AdMob) AdMob.prepareInterstitial({ adId: admobid.interstitial, autoShow: true });

}