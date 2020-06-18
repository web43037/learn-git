lounger-isonline(3) -- check if a Cloudant database is online
=============================================================

## SYNOPSIS
    lounger.commands.isOnline(Cloudant object)

## DESCRIPTION
Check whether the Cloudant database is online and make sure your credentials allow access.

Input to the function is a new Cloudant object containing a username and password. It returns a Promise. The isOnline() API function calls the cloudant.ping() method which returns a Promise. If resolved successfully the response from ping() is returned. If rejected a User Error is returned. The error message contains the sent parameters and the returned information from ping().

    SUCCESS response from ping() looks like this:
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

FAILURE from the call to ping(). An Error is created and returned. The error.type is 'EUSAGE'.
    
    The error.message looks like this:

    ==sent==>>
    cloudant url:https://c48daab9-26e5-40d7-920c-3c5a573f1ae6-bluemix:121422f4cbda4f4c9f73a7d969ee340d2c5a42ab88c8fb906a8685b0a3fca64b@c48daab9-26e5-40d7-920c-3c5a573f1ae6-bluemix.cloudant.com
    cloudant account:c48daab9-26e5-40d7-920c-3c5a573f1ae6-bluemix
    cloudant password:121380f4cbda4f4c9f73a9a696bb930d2c5a42ab88c7ed906a8685b0a3fca64b

    <<==response==
    error code:undefined
    error message:error happened in your connection
    statusCode:401
    statusMessage:Unauthorized
    response body:[object Object]

## Background on the Cloudant service from IBM

Rather than host the DB locally I opted to use the IBM Cloudant platform-as-a-service offering. You have to create an account and then create the couchdb. In this process IBM gives you your connection and credential info.

### Cloudant Resources

- Start here to set up a Cloudant couchdb online: https://www.ibm.com/cloud/cloudant

- Learning center: https://developer.ibm.com/clouddataservices/docs/compose/cloudant/

- The Cloudant Node.js Client: https://github.com/cloudant/nodejs-cloudant

- IBM Cloudant Documentation: https://developer.ibm.com/clouddataservices/docs/cloudant/

- Cloudant class: https://courses.cognitiveclass.ai/dashboard
    NoSQL and DBaaS 101
    Gift: 57514662e855b4b80c47af93a99588cd
    1. sign up for IBM Cloud
    2. Apply the promo code (Gift above)
