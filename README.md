node, npm & n
===

use n to manage node version if necessary. Originally built with node v6.11.1

$ n 6.11.1

$ mongod
$ mongo
$ npm run build
$ npm start

http://localhost:3000
http://localhost:3000/cms

deploy
======

Push to github then create a pull request
After travis CI completes (no tests) it will be available in heroku to create an app

mLab
====

dbUser: jonrowe
dbPassword: abcde12345

To connect using the mongo shell:
mongo ds151202.mlab.com:51202/heroku_pxj9qp18 -u jonrowe -p abcde12345
To connect using a driver via the standard MongoDB URI (what's this?):

mongodb://<dbuser>:<dbpassword>@ds151202.mlab.com:51202/heroku_pxj9qp18


heroku
======

misc commands

$ heroku logs --tail

$ heroku local web #run the local version of heroku (looks for Procfile. Default port is 5000)

$ heroku addons:create papertrail

$ export CLOUDINARY_URL=cloudinary://626785482432199:9xrQ_-iT0TUmYbvEnMEQWlbW8tc@hkgka4c5k

local development setup
=======================

I have configured pf firewall in murus.app to allow connections on ports 3000, 4200 and 4300

192.168.1.64:3000

bin/www - server.listen(3000, '0.0.0.0');

youtube thumbnail image
=======================

https://img.youtube.com/vi/t5Hf3sjI108/mqdefault.jpg