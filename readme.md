Installation Steps:

1. git clone https://github.com/rupeshpawar93/machine-assignment.git.
2. run command: cd folder
3. run command: npm install ---- to install all the dependencies
4. run command: npm test (nodemon) or npm start (pm2) start the server

To see upload file in browser URL: http://site_url/file_path for eg http://localhost:3000/uploads/uploader-15858951273822075944_20200318.pdf

Here mongodb is used as database and hosted at https://mlab.com/.
jsonwebtoken is used to create token for user authentication.
mutler and fs package used for uploading and removing file and validation added to allow images(png,jpg,gif) and pdf for uploading.
Field name: uploader ( for uploading files)

Use token for other api (upload,remove and listing) received from signin api in header:
Authorization: Bearer token

api list:
1. post : api/register  - register api
2. post: api/signin - login api
3. post: api/upload-file - upload file api
4. post: api/remove-file - remove file api
5. get: api/show-list - show files list api
