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
  
  // Add a value and rewite it to the same folder
  fileData.push({id:3,name:"Topher"});
  newFile = Appfolder.writeFile("TestFile", fileData, newFileId); // last paramter added to update the file;

  // Read the updated files content
  fileData = Appfolder.getFileContent(newFileId); // [{"name":"bob","id":1},{"name":"Sally","id":2},{"name":"Steve","id":3},{"id":3,"name":"Topher"}]
  
  // Delete the file;
  Logger.log(Appfolder.deleteFile(newFileId));
  
}

function runToAuthThisScript(){};
