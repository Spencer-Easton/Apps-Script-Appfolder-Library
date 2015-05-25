var super_ = this;

/**
* Initializes this libraray. Requires you to pass the Oauth Service function you are using.
*
* @param {function()} OauthService The call to the Oauth Service.
* @return {object} returns a reference to itself for chaining.
*/
function Init(OauthService){
  if(OauthService == null) {
    throw new Error("You must provide a valid Oauth2 Service")
  }
  
  if (typeof super_.settings == "undefined"){
    super_.settings = {};
  }
  
  super_.settings.service = OauthService();
  return super_;  
}



function testForToken_(){
  if (typeof super_.settings == "undefined"){
    throw new Error("Token test: " + typeof super_.settings);
  } 
}


/**
* Writes date to a file in the Appfolder. Last parameter is omited if writing to a new file.
*
* @param {string} fileName The name of the file to be written.
* @param {(string|object)} fileData A string or any object that can be stringified.
* @param {string} fileId The fileId of the file you are updating. Omit for a new file.
* @return {object} Returns the REST response of the file upload.
*/
function writeFile(fileName, fileData, fileId){
  testForToken_(); 
  var fileId = fileId || false;
  
  var newProject = {
    title: fileName,
    mimeType: 'application/json',
    parents:
    [
      {
        "kind": "drive#fileLink",
        "id": "appfolder"
      }
    ]
  };
  
  
  
  
  var url = "https://www.googleapis.com/upload/drive/v2/files"
  const boundary = '-------GITFORGAS';
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";
  
  
  if(!isString_(fileData)){
    fileData = JSON.stringify(fileData);
  }
  
  var base64Data = Utilities.base64Encode(fileData);
  
  var multipartRequestBody =
      delimiter +
        'Content-Type: application/json\r\n\r\n' +
          JSON.stringify(newProject) +
            delimiter +
              'Content-Type: application/json\r\n' +
                'Content-Transfer-Encoding: base64\r\n' +
                  '\r\n' +
                    base64Data +
                      close_delim;
  
  
  var parameters = {headers : {'Authorization': 'Bearer '+ super_.settings.service.getAccessToken()},                    
                    contentType:'multipart/mixed; boundary="' + boundary + '"',
                    payload: multipartRequestBody,
                    muteHttpExceptions:true};
  
  
  if(fileId){
    parameters["method"] = "PUT";
    url += "/"+fileId + "?uploadType=multipart";
    
  }else{
    parameters["method"] = "POST";
    url +="?uploadType=multipart"
  }
  
  var results = UrlFetchApp.fetch(url,parameters);
  
  return JSON.parse(results.getContentText());
}


/**
* Return's all files associated with your application from the Appfolder
*
* @return {object} Returns a lists of file's meta-data
*/
function getAllFiles(){
  testForToken_();
  var url = "https://www.googleapis.com/drive/v2/files?q="+encodeURIComponent("'appfolder' in parents");
  var parameters = { method : 'get',
                    headers : {'Authorization': 'Bearer '+ super_.settings.service.getAccessToken()},                    
                    contentType:'application/json', 
                    
                    muteHttpExceptions:true};
  var results = UrlFetchApp.fetch(url,parameters);
  return JSON.parse(results.getContentText());
  
  
}

/**
* Returns a file's meta-data from the Appfolder
*
* @param {string} fileId The fileId of the file you are requesting.
* @return {object} Returns the file's meta-data
*/
function getFile(fileId){
  testForToken_();
  var url = "https://www.googleapis.com/drive/v2/files/"+fileId
  var parameters = { method : 'get',
                    headers : {'Authorization': 'Bearer '+ super_.settings.service.getAccessToken()},                    
                    contentType:'application/json',                     
                    muteHttpExceptions:true};
  
  var results = UrlFetchApp.fetch(url,parameters);
  if(results.getResponseCode() == 404){
    throw new Error(JSON.stringify({"code":"404","message":"AppFolder file not found"}));
  }else{
    return JSON.parse(results.getContentText());
  }
  
  
  
  
}

/**
* Returns a file's contents from the Appfolder
*
* @param {string} fileId The fileId of the file you are requesting.
* @return {String} Returns the file's contents as a string
*/
function getFileContent(fileId){
  testForToken_();
  try{var fileData = getFile(fileId);}
  catch(e){return {"error":e}};
  
  var parameters = { method : 'get',
                    headers : {'Authorization': 'Bearer '+ super_.settings.service.getAccessToken()},                    
                    contentType:'application/json', 
                    
                    muteHttpExceptions:true};
  var results = UrlFetchApp.fetch(fileData.downloadUrl,parameters);  
  return results.getContentText();
}

/**
* Deletes a file from the Appfolder
*
* @param {string} fileId The fileId of the file you are requesting.
* @return {object} 
*/
function deleteFile(fileId){ 
  testForToken_();
  var url = "https://www.googleapis.com/drive/v2/files/"+fileId
  var parameters = { method : 'DELETE',
                    headers : {'Authorization': 'Bearer '+ super_.settings.service.getAccessToken()},                    
                    contentType:'application/json',                     
                    muteHttpExceptions:true};
  
  var results = UrlFetchApp.fetch(url,parameters);
  if(results.getResponseCode() == 404){
    throw new Error(JSON.stringify({"code":"404","message":"AppFolder file not found"}));
  }else{
    var status = (results.getContentText())? results.getContentText():"Deleted";
    return {fileId:fileId,status:status};
  }
  
  
}
