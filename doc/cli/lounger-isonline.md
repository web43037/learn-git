lounger-isonline(1) -- check if a Cloudant database is online
=============================================================

## SYNOPSIS
    lounger isonline <command line args>

## DESCRIPTION
Check whether the Cloudant database is online and make sure your credentials allow access. This assumes you have set up an online Couchdb database on the IBM platform. Details on setting that up are in the lounger-isonline(3) man page which explains the API function. See the 'Background on the Cloudant service from IBM' section.

    The <command line args> should be either a <url> or <none> and an optional flag [--json]

    If the URL is included it is checked to be a valid URL. If it is malformed a User Error is thrown. If it is valid the username and password are parsed out of the URL and a Cloudant object is created with them.
    
    If the URL is not included (<none>) the program attempts to read the username and password from the .env file which should be in the root directory (i.e. one directory up from lib). The .env file should included lines like these obtained when you created your Cloudant database. These are the credentials that IBM gave you:
    
        cloudant_username=d59bada6-35f3-30d7-920c-3c5a342f1ae6-bluemix
        cloudant_password=213943f4cbda4f4c6f738ad969ee340d2c5a42ab88c8fb906a8685b0a3fca64b

    If the '--json' flag is included the output is given in JSON format.

With this info a Cloudant object is created with the username and password provided on the command line or from the .env file. The isOnline() function is called with the Cloudant object. It returns a Promise. If it resolves successfully the DB is available. '.then' is called which returns a string that looks like this:

call to 'isonline' succeeded with message:
DATABASE IS ONLINE:
    {
    "couchdb": "Welcome",
    "version": "2.1.1",
    "vendor": {
        "name": "IBM Cloudant",
        "version": "8153",
        "variant": "paas"
    },
    "features": [
        "geo",
        "access-ready",
        "iam",
        "partitioned",
        "pluggable-storage-engines",
        "scheduler"
    ],
    "features_flags": [
        "partitioned"
    ]
}

If the database is NOT available, the promise is rejected and '.catch' is called with an Error object. The message is set and looks like this:

ERR!
DATABASE IS *NOT* ONLINE:
    Error:
==sent==>>
cloudant url:https://d59adba6-35f4-40d7-920c-3c5a573f1ae6-bluemix:BAD121422f4cbda4f4c9f73a7d969ee340d2c5a42ab88c8fb906a8685b0a3fca64b@d59adba6-35f4-40d7-920c-3c5a573f1ae6-bluemix.cloudant.com
cloudant account:d59adba6-35f4-40d7-920c-3c5a573f1ae6-bluemix
cloudant password:BAD121422f4cbda4f4c9f73a7d969ee340d2c5a42ab88c8fb906a8685b0a3fca64b

<<==response==
error code:undefined
error message:error happened in your connection
statusCode:401
statusMessage:Unauthorized
response body:[object Object]