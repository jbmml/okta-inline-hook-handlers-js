//const nodeFetch = import('node-fetch') as typeof fetch;
const dbg = true;
const https = require('https');
const mockDataUrl = "https://s3.amazonaws.com/mearthgov.com-web-2021-12-13/mock_data.json";

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

async function getSecretValue(url, oktaRequestBody) {

    if(dbg){console.log("***Running getSecretValue()")};

    try {
        var userData = await downloadUserData();
        sleep(1000);
        // you have your userData here
    } catch (error) {
        console.log(`***getSecretValue: ${error.message}`);
    }
    
    if(dbg){console.log("***Ending getSecretValue()")};
    return "secretResponseBody"
}

function downloadUserData(url) {
    https.get(url, (resp) => {
        let userData = '';
        if(dbg){console.log("***Inside https.get()")};

        // A chunk of data has been received.
        resp.on('userData', (chunk) => {
            userData += chunk;
        });

        // The whole response has been received. Process the result.
        resp.on('end', () => {
            try {
                if(dbg){console.log(`***userData: ${JSON.stringify(userData, null, 4)}`)};
                //const samlEmailAddress = oktaRequestBody.data.context.user.profile.login;
                const samlEmailAddress = "eru@mearthgov.com"
                //if(dbg){console.log(`***usersArray: ${JSON.stringify(usersArray, null, 4)}`)};
                if(dbg){console.log("***Calling getUserSecret callback")};
                callback("userdata", samlEmailAddress);
            } catch (error) {
                console.log(`***getSecretValue: ${error.message}`);
            }
        });

    }).on("error", (err) => {
        if(dbg){console.log(`***Error: ${err.message}`)};
    });
    return userData;
}

exports.handler = (event, context, callback) => {
    const oktaRequestBody = event.body;

    if(dbg){console.log("Calling getMockData()")};
    let secretValue = getSecretValue(mockDataUrl, oktaRequestBody);
    if(dbg){console.log(`secretValue: ${secretValue}`)};
    if(dbg){console.log("Called getSecretValue()")};

    // Get mock data
    //let url = "https://s3.amazonaws.com/mearthgov.com-web-2021-12-13/mock_data.json"
    //let users = fetch(url, settings).then(res => res.json());
    //let rawUserData = getMockData();
    //let users = JSON.parse(rawUserData);

    // Find User secret attribute
    //const samlEmailAddress = oktaRequestBody.data.context.user.profile.login;
    //var mockDirUser = users.users.filter(u => u.email === samlEmailAddress);
    //var userSecretData = mockDirUser[0].secret
    //var secretValue = (userSecretData != "" ? userSecretData : "GENERIC_SECRET_VALUE");

    // Example oktaRequestBody:
    // {
    //     "source": "https://${yourOktaDomain}/app/saml20app_1/exkth8lMzFm0HZOTU0g3/sso/saml",
    //     "eventId": "XMFoHCM1S4Wi_SGWzL8T9A",
    //     "eventTime": "2019-03-28T19:15:23.000Z",
    //     "data": {
    //         "context": {
    //             "request": {
    //                 "id": "reqqXypjzYJRSu2j1G1imUovA",
    //                 "method": "GET",
    //                 "url": {
    //                     "value": "https://${yourOktaDomain}/app/saml20app_1/exkth8lMzFm0HZOTU0g3/sso/saml"
    //                 },
    //                 "ipAddress": "127.0.0.1"
    //             },
    //             "protocol": {
    //                 "type": "SAML2.0",
    //                 "issuer": {
    //                     "id": "0oath92zlO60urQOP0g3",
    //                     "name": "SAML 2.0 App",
    //                     "uri": "http://www.okta.com/exkth8lMzFm0HZOTU0g3"
    //                 }
    //             },
    //             "session": {
    //                 "id": "102LN9Bnuc4S_ewfc9BYwageA",
    //                 "userId": "00uq8tMo3zV0OfJON0g3",
    //                 "login": "administrator1@example.com",
    //                 "createdAt": "2019-03-28T16:45:55.000Z",
    //                 "expiresAt": "2019-03-28T21:15:23.000Z",
    //                 "status": "ACTIVE",
    //                 "lastPasswordVerification": "2019-03-28T16:45:55.000Z",
    //                 "amr": [
    //                     "PASSWORD"
    //                 ],
    //                 "idp": {
    //                     "id": "00oq6kcVwvrDY2YsS0g3",
    //                     "type": "OKTA"
    //                 },
    //                 "mfaActive": false
    //             },
    //             "user": {
    //                 "id": "00uq8tMo3zV0OfJON0g3",
    //                 "passwordChanged": "2018-09-11T23:19:12.000Z",
    //                 "profile": {
    //                     "login": "administrator1@example.com",
    //                     "firstName": "Admin",
    //                     "lastName": "Last",
    //                     "locale": "en",
    //                     "timeZone": "America/Los_Angeles"
    //                 },
    //                 "_links": {
    //                     "groups": {
    //                         "href": "https://${yourOktaDomain}/00uq8tMo3zV0OfJON0g3/groups"
    //                     },
    //                     "factors": {
    //                         "href": "https://${yourOktaDomain}/api/v1/users/00uq8tMo3zV0OfJON0g3/factors"
    //                     }
    //                 }
    //             }
    //         },
    //         "assertion": {
    //             "subject": {
    //                 "nameId": "administrator1@example.com",
    //                 "nameFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
    //                 "confirmation": {
    //                     "method": "urn:oasis:names:tc:SAML:2.0:cm:bearer",
    //                     "data": {
    //                         "recipient": "http://www.example.com:7070/saml/sso"
    //                     }
    //                 }
    //             },
    //             "authentication": {
    //                 "sessionIndex": "id1553800523546.312669168",
    //                 "authnContext": {
    //                     "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport"
    //                 }
    //             },
    //             "conditions": {
    //                 "audienceRestriction": [
    //                     "urn:example:sp"
    //                 ]
    //             },
    //             "claims": {
    //                 "extPatientId": {
    //                     "attributes": {
    //                         "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
    //                     },
    //                     "attributeValues": [
    //                         {
    //                             "attributes": {
    //                                 "xsi:type": "xs:integer"
    //                             },
    //                             "value": "4321"
    //                         }
    //                     ]
    //                 },
    //                 "array": {
    //                     "attributes": {
    //                         "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
    //                     },
    //                     "attributeValues": [
    //                         {
    //                             "attributes": {
    //                                 "xsi:type": "xs:string"
    //                             },
    //                             "value": "Array 1"
    //                         },
    //                         {
    //                             "attributes": {
    //                                 "xsi:type": "xs:string"
    //                             },
    //                             "value": "Array2"
    //                         },
    //                         {
    //                             "attributes": {
    //                                 "xsi:type": "xs:string"
    //                             },
    //                             "value": "Array3"
    //                         }
    //                     ]
    //                 },
    //                 "middle": {
    //                     "attributes": {
    //                         "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
    //                     },
    //                     "attributeValues": [
    //                         {
    //                             "attributes": {
    //                                 "xsi:type": "xs:string"
    //                             },
    //                             "value": "admin"
    //                         }
    //                     ]
    //                 },
    //                 "firstAndLast": {
    //                     "attributes": {
    //                         "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
    //                     },
    //                     "attributeValues": [
    //                         {
    //                             "attributes": {
    //                                 "xsi:type": "xs:string"
    //                             },
    //                             "value": "7d6a50c8-4d7e-4058-9c5b-2cc98cecd294"
    //                         }
    //                     ]
    //                 }
    //             },
    //             "lifetime": {
    //                 "expiration": 300
    //             }
    //         }
    //     },
    //     "eventTypeVersion": "1.0",
    //     "cloudEventVersion": "0.1",
    //     "eventType": "com.okta.saml.tokens.transform",
    //     "contentType": "application/json"
    // }

    let responseBody = {
        // It is possible to return an error object to Okta.
        // error.errorSummary is logged in the System Log.
        // 
        // Example:
        // 
        // "error": {
        //     "errorSummary": "Something went wrong"
        // }
        //
        // See https://developer.okta.com/docs/reference/saml-hook/#commands
        // for information on acceptable commands in the response
        //"commands": [
        //    {
        //        "type": "com.okta.assertion.patch",
        //        "value": [
        //            {
        //                "op": "replace",
        //                "path": "/claims/http:~1~1schemas.xmlsoap.org~1ws~12005~105~1identity~1claims~1foo/attributeValues/0/value",
        //                "value": "replacementValue"
        //            },
        //            {
        //                "op": "replace",
        //                "path": "/claims/http:~1~1schemas.xmlsoap.org~1ws~12005~105~1identity~1claims~1foo/attributes",
        //                "value": {
        //                    "attributes": {
        //                        "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
        //                    }
        //                }
        //            },
        //            {
        //                "op": "add",
        //                "path": "/claims/http:~1~1schemas.xmlsoap.org~1ws~12005~105~1identity~1claims~1bar",
        //                "value": {
        //                    "attributes": {
        //                        "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
        //                    },
        //                    "attributeValues": [
        //                        {
        //                            "attributes": {
        //                                "xsi:type": "xs:string"
        //                            },
        //                            "value": "bearer"
        //                        }
        //                    ]
        //                }
        //            }
        //        ]
        //    }
        //]
        "commands": [
            {
                "type": "com.okta.assertion.patch",
                "value": [
                    {
                        "op": "add",
                        "path": "/claims/secretClaim",
                        "value": {
                            "attributes": {
                                "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
                            },
                            "attributeValues": [
                                {
                                    "attributes": {
                                        "xsi:type": "xs:string"
                                    },
                                    "value": secretValue
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    }

    let response = {
        "statusCode": 200,
        "body": JSON.stringify(responseBody),
        "isBase64Encoded": false
    };

    callback(null, response);
}