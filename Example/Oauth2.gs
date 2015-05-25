// The library for this service is: 
// MswhXl8fVhTFUH_Q3UOJbXvxhMjh3Sh48

function appFolderService() {
  return OAuth2.createService('gaScript')
  .setAuthorizationBaseUrl('https://accounts.google.com/o/oauth2/auth')
  .setTokenUrl('https://accounts.google.com/o/oauth2/token')
  .setClientId(PropertiesService.getScriptProperties().getProperty('gasClient_Id'))
  .setClientSecret(PropertiesService.getScriptProperties().getProperty('gasClient_Secret')) 
  .setCallbackFunction('gasAuthCallback')
  .setPropertyStore(PropertiesService.getUserProperties())
  .setScope('https://www.googleapis.com/auth/drive.appfolder https://www.googleapis.com/auth/drive')
  .setParam('login_hint', Session.getActiveUser().getEmail())
  .setParam('access_type', 'offline');
}


function clearService(){
  OAuth2.createService('gaScript')
  .setPropertyStore(PropertiesService.getUserProperties())
  .reset();
}


function ClickToAuthGasWindow(){
  var gService = appFolderService();
  if(!gService.hasAccess()){
    var authUrl = gService.getAuthorizationUrl();
    var tamplate = HtmlService.createTemplateFromFile('AuthWindow');
    tamplate.authURL = authUrl;
    return tamplate.evaluate().setTitle("Request access to Apps Scripts");
  }else{
    return HtmlService.createHtmlOutput("<div>Access granted to your Apps Scripts.<br> You may close this window.</div>").setTitle("Access to Apps Scripts granted.");
  }
}



function gasAuthCallback(request) {
  var gService = appFolderService();
  var isAuthorized = gService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}

