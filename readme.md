Installation Steps:

1. git clone https://github.com/rupeshpawar93/machine-assignment.git.
2. run command: cd folder
3. run command: npm install ---- to install all the dependencies
4. run command: npm test (nodemon) or npm start (pm2) start the server

To see upload file in browser URL: http://site_url/file_path for eg http://localhost:3000/uploader-15858951273822075944_20200318.pdf

Here mongodb is used as database and hosted at https://mlab.com/.
jsonwebtoken is used to create token for user authentication.
mutler and fs package used for uploading and removing file and validation added to allow images(png,jpg,gif) and pdf for uploading.

Use token for other api (upload,remove and listing) received from signin api in header:
Authorization: Bearer token
