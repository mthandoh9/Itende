
window.onload = function () {

  if (localStorage.getItem("showOnload") != "false") {
    if (window.AdMob) AdMob.showInterstitial();
    event.preventDefault();
    localStorage.setItem("showOnload", "false");
  } else {
    localStorage.setItem("showOnload", "true");
  }
}
