Installation Steps:

1. git clone url.
2. run command: cd FreeCharge
3. run command: npm install ---- to install all the dependencies
4. run command: npm test (nodemon) or npm start (pm2) start the server

To see upload file in browser URL: http://site_url/file/file_name for eg http://localhost:3000/file/uploader-1585844225890C006-SP-2453%5E201911.pdf

Here mongodb is used as database and hosted at https://mlab.com/.
jsonwebtoken is used to create token for user authentication.
mutler and fs package used for uploading and removing file.

Use token for other api (upload,remove and listing) received from signin api in header:
Authorization: Bearer token
