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