function fbShare() {
  window.plugins.socialsharing.shareViaFacebook('Hi, Have you heard about Itende Styles ? The app helps you with Itende style Settings for any keyboard that features on Itende music Style and helps you find a nearest trusted store or supplier you can buy from.',
    null /* img */,
    null /* url */,
    null,
    function (errormsg) { unableToShare() }
  );
};

function whatsappShare() {

  window.plugins.socialsharing.shareViaWhatsApp('Hi, Have you heard about Itende Styles ? The app helps you with Itende style Settings for any keyboard that features on Itende music Style and helps you find a nearest trusted store or supplier you can buy from.',
    null /* img */,
    'https://Play.google.com/store/apps/details?id=com.ItendeStyle.Itende' /* url */,
    null,
    function (errormsg) { unableToShare() }
  );
};

function twitterShare() {
  window.plugins.socialsharing.shareViaTwitter('Hi, Have you heard about Itende Styles ? The app helps you with Itende style Settings for any keyboard that features on Itende music Style and helps you find a nearest trusted store or supplier you can buy from.',
    null /* img */,
    'https://Play.google.com/store/apps/details?id=com.ItendeStyle.Itende',
    null,
    function (errormsg) { unableToShare() }
  );
};

function otherShare() {
  window.plugins.socialsharing.share('Hi, Have you heard about Itende Styles ? The app helps you with Itende style Settings for any keyboard that features on Itende music Style and helps you find a nearest trusted store or supplier you can buy from.',
    null,
    'https://Play.google.com/store/apps/details?id=com.ItendeStyle.Itende',
    null,
    null);
};
function unableToShare() {
  window.plugins.toast.showLongBottom('Unable to share!', function (a) { console.log('toast success: ' + a) }, function (b) { alert('toast error: ' + b) });
}
function comingSoon() {
  location.href = "DownloadBeats.html";

}
function notAvailable() {
  //window.plugins.toast.show('Not Available!', function (a) { console.log('toast success: ' + a) }, function (b) { alert('toast error: ' + b) });
  window.plugins.toast.showLongBottom('Not Available!', function (a) { console.log('toast success: ' + a) }, function (b) { alert('toast error: ' + b) });

}

$('#share').click(function () {
  $('.invite').slideToggle();
  $('#overlay-invite').show();
  $('#navbarCollapse').slideToggle();
});

$('#overlay-invite').click(function () {
  $('.invite').slideToggle();
  $('#overlay-invite').hide();
});

function menu() {
  $('#navbarCollapse').slideToggle();
};

function goback() {
  window.history.go(-1);
}

function onDeviceReady() {
  StatusBar.overlaysWebView(false);
  window.onbeforeunload = function () {
    if (window.AdMob) AdMob.showInterstitial();
  };
}
function openBrowser2(x) {
  var url = x;
  var target = '_blank';
  var options = "location = yes"
  var ref = cordova.InAppBrowser.open(url, target, options);

  ref.addEventListener('loadstart', loadstartCallback);
  ref.addEventListener('loadstop', loadstopCallback);
  ref.addEventListener('loaderror', loaderrorCallback);
  ref.addEventListener('exit', exitCallback);

  function loadstartCallback(event) {
    console.log('Loading started: ' + event.url);
  }

  function loadstopCallback(event) {
    console.log('Loading finished: ' + event.url);
  }

  function loaderrorCallback(error) {
    console.log('Loading error: ' + error.message);
  }

  function exitCallback() {
    console.log('Browser is closed...');
  }
}
function openBrowser(x) {
  var url = "";
  switch (x) {
    case 1:
      url = "https://www.facebook.com/profile.php?id=100008545117911";
      break;
    case 2:
      url = "https://www.facebook.com/themba.talent.9";
    case 3:
      url = "https://www.facebook.com/lihle.dumisa";
      break;
    case 4:
      url = "https://www.facebook.com/mickealjohn.mitshel";

  }

  var target = '_blank';
  var options = "location = yes"
  var ref = cordova.InAppBrowser.open(url, target, options);

  ref.addEventListener('loadstart', loadstartCallback);
  ref.addEventListener('loadstop', loadstopCallback);
  ref.addEventListener('loaderror', loaderrorCallback);
  ref.addEventListener('exit', exitCallback);

  function loadstartCallback(event) {
    console.log('Loading started: ' + event.url);
  }

  function loadstopCallback(event) {
    console.log('Loading finished: ' + event.url);
  }

  function loaderrorCallback(error) {
    console.log('Loading error: ' + error.message);
  }

  function exitCallback() {
    console.log('Browser is closed...');
  }
}
document.addEventListener("deviceready", onDeviceReady, false);

