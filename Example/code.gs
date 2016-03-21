// Open the projects Developer console
//      Enable Drive API
//      Create a new set of OAuth2 credentials. Use:  
//              Authorized JavaScript origins: https://script.google.com   
//              Authorized Redirect URI :  https://script.google.com/macros/d/{Your Project Key}/usercallback 
//      Save the client secret as gasClient_Secret and client id as gasClient_Id in your scripts properties
//      Run function runToAuthThisScript to authorize the script
//      Publish the script as a webapp. Launch the webapp and click the button to start the Oauth flow to give access
//        to your appdata folder.
//      Run the AppfolderExample function. to see the library in action. 

function doGet(){
  return ClickToAuthGasWindow();
  
}


function AppfolderExample(){
  
  // Init the service
  Appfolder.Init(appFolderService);
  
  // List all files in the Appfolder for this Application
  Logger.log(Appfolder.getAllFiles());
  
  
  
  // Write a new file
  var dataForFile = [{name:"bob",id:1},{name:"Sally",id:2},{name:"Steve",id:3}];
  var newFile = Appfolder.writeFile("TestFile", dataForFile); // last paramter omitted for a new file.
  var newFileId = newFile.id;   
  
  // Read the files content
  var fileData = Appfolder.getFileContent(newFileId); // [{"name":"bob","id":1},{"name":"Sally","id":2},{"name":"Steve","id":3}]
  fileData = JSON.parse(fileData);
  
  // Add a value and rewite it to the same file
  fileData.push({id:3,name:"Topher"});
  newFile = Appfolder.writeFile("TestFile", fileData, newFileId); // last paramter added to update the file;

  // Read the updated files content
  fileData = Appfolder.getFileContent(newFileId); // [{"name":"bob","id":1},{"name":"Sally","id":2},{"name":"Steve","id":3},{"id":3,"name":"Topher"}]
  
  // Delete the file;
  Logger.log(Appfolder.deleteFile(newFileId));
  
}

function runToAuthThisScript(){};
