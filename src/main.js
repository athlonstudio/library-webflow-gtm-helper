const cookieKey = document.currentScript.dataset.cookie;
const cookiesApproved = document.cookie.split('; ').map((cookie) => cookie.includes(cookieKey) || cookie.includes(cookieKey)).includes(true);
const GTMkey = document.currentScript.dataset.GTM;
const GAkey = document.currentScript.dataset.GA;

function enableGTM() {
  window['dataLayer'] = window['dataLayer']||[];
  window['dataLayer'].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
  const location = document.getElementsByTagName('script')[0],elem=document.createElement('script'),dl='dataLayer'!='dataLayer'?'&l='+'dataLayer':'';
  elem.async=true;elem.src='https://www.googletagmanager.com/gtm.js?id='+GTMkey+dl;
  location.parentNode.insertBefore(elem,location);
}

function enableGA(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());
  gtag('event', 'conversion_event_page_view_1', {});
  gtag('config', GAkey);
}


function initiateCookie() {
  const exipiryDate = new Date();
  const monthInMilliseconds = 30 * 86400000;
  
  exipiryDate.setTime(exipiryDate.getTime() + (monthInMilliseconds * 3));
  exipiryDate.toUTCString();
  document.cookie = `${cookieKey}; expires=${exipiryDate}`;
  document.querySelector('[fs-cc="banner"]').remove();
  
  enableGTM();
  enableGA();
}

document.addEventListener("DOMContentLoaded", () => {
  if(!cookiesApproved && cookieKey){
      document.querySelector('[fs-cc="banner"]').classList.toggle('hide');
      document.querySelector('[fs-cc="close"]').addEventListener('click', initiateCookie);
  } else {
      enableGTM();
      enableGA();
    if(cookieKey) {
      document.querySelector('[fs-cc="banner"]').remove();
     }
  }

});