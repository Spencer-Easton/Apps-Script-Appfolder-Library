# Apps-Script-Appfolder-Library
This is a Google Apps Script library to access the Appfolder in google drive

######Note: This was written by an amature. I would say I'm mediocre at best. I wrote this for my own uses at work. There is no error checking. Things may be unintuitive or misspelled. Want to fix something let me know or fork it.

####Initalize the library 
Init(function() Oauth2ServiceFunction) 

####Make calls to the Appfolder
Get all files meta-data in the Appfolder associated with this application.  
getAllFiles() 

Write to a new file.   
writeFile(string fileName, string|object fileData) 
 
Write to an existing file.  
writeFile(string fileName, string|object fileData, string fileId)

Get the meta-data for a file  
getFile(string fileId)

Get the content from a file.  
getFileContent(string fileId)

Delete a file.  
deleteFile(string fileId)

