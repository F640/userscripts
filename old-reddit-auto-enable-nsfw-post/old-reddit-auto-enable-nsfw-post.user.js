// ==UserScript==
// @name        Old Reddit auto enable NFSW posts
// @match       https://old.reddit.com/*
// @version     1.0
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @author      -
// @description Userscript for gooner Reddit lurkers (just kidding lol, for any lurkers who needs NSFW posts shown by default)
// ==/UserScript==

"use strict";

// easy way to get cookie https://stackoverflow.com/a/15724300
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// directly modify cookie technique
function setOver18Cookie() {
  document.cookie = "over18=1; Secure; domain=.reddit.com; path=/";
}

// generate and send XHR request that sets over 18 cookie
function runOver18Xhr() {
  GM_xmlhttpRequest({
    method: "POST",
    url: "https://old.reddit.com/over18",
    data: "over18=yes",
    redirect: "manual",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    onerror: function(response) {
      console.error("Something went wrong while executing over 18 request. See below for details");
      console.error(reponse);
    }
  });
}

// auto click yes button in 18+ confirmation page
if (location.pathname == "/over18" && document.querySelector("button[name='over18'][value='yes']") != null) {
  // create text that shows it is working on it
  let container = document.createElement("p");
  container.classList.add("md");
  container.innerText = "Automating confirmation...";
  document.querySelector("div.interstitial-message.md-container").after(container);
  //start bypassing age gate
  document.querySelector("button[name='over18'][value='yes']").click();
}

// setup configuration defaults
if (GM_getValue("set_cookie_mode") == null) {
  GM_setValue("set_cookie_mode", "direct");
}

// set cookie config
function setCookieConfigToXhr() {
  GM_setValue("set_cookie_mode", "xhr");
  switchSetCookieSettings();
}
function setCookieConfigToDirect() {
  GM_setValue("set_cookie_mode", "direct");
  switchSetCookieSettings();
}
// menu controller
function switchSetCookieSettings() {
  const currentSetCookieSettings = GM_getValue("set_cookie_mode", "direct");
  if (currentSetCookieSettings == "xhr") {
    runOver18Xhr();
    GM_unregisterMenuCommand('cookiexhrmode');
    GM_unregisterMenuCommand('indirectmode');

    GM_registerMenuCommand('Site set cookie is in xhr mode', function(){return undefined;}, {id: 'indirectmode', autoClose: 'false'});
    GM_registerMenuCommand('Switch set cookie to direct mode', setCookieConfigToDirect, {id: 'cookiedirectmode', autoClose: 'false'});
  } else {
    setOver18Cookie();
    GM_unregisterMenuCommand('cookiedirectmode');
    GM_unregisterMenuCommand('inxhrmode');

    GM_registerMenuCommand('Site set cookie is in direct mode', function(){return undefined;}, {id: 'indirectmode', autoClose: 'false'});
    GM_registerMenuCommand('Switch set cookie to xhr mode', setCookieConfigToXhr, {id: 'cookiexhrmode', autoClose: 'false'});
  }
}
switchSetCookieSettings();