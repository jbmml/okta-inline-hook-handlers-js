//const nodeFetch = import('node-fetch') as typeof fetch;
const dbg = true;
const https = require('https');

function getMockData(url, login, callback) {
    if(dbg){console.log("***Running getMockData()")};

    const usersArray = https.get(url, (resp) => {
        let userData = '';
        if(dbg){console.log("***Inside https.get()")};

        // A chunk of data has been received.
        resp.on('userData', (chunk) => {
            userData += chunk;
        });
        console.log("resp: " + resp);

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            if(dbg){console.log(`***userData: ${JSON.stringify(userStr, null, 4)}`)};
            userStr = JSON.stringify(usersArray, null, 4); // (Optional) beautiful indented output.
            if(dbg){console.log("***Calling getUserSecret callback")};
            callback(JSON.parse(userData), login);
        });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    
    if(dbg){console.log(`***usersArray: ${JSON.stringify(usersArray, null, 4)}`)};

    if(dbg){console.log("***Ending getMockData()")};
}


exports.handler = (event, context, callback) => {
    const oktaRequestBody = event.body;

    let url = "https://s3.amazonaws.com/mearthgov.com-web-2021-12-13/mock_data.json";
    if(dbg){console.log("Calling getMockData()")};
    let users = getMockData(url, function(mockData, loginString){

        // Find User secret attribute
        if(dbg){console.log("******Running getUserSecret callback")};
        if(dbg){console.log(`******usersArray: ${mockData}`)};
        if(dbg){console.log(`******loginString: ${loginString}`)};
        //const samlEmailAddress = oktaRequestBody.data.context.user.profile.login;
        //var mockDirUser = mockData.users.filter(u => u.email === samlEmailAddress);
        //var userSecretData = mockDirUser[0].secret
        //var secretValue = (userSecretData != "" ? userSecretData : "GENERIC_SECRET_VALUE");

        if(dbg){console.log("******Leaving getUserSecret callback")};
    });

    if(dbg){console.log("Called getMockData()")};
    if(dbg){console.log("users: " + users)};

    // Get mock data
    //let url = "https://s3.amazonaws.com/mearthgov.com-web-2021-12-13/mock_data.json"
    //let users = fetch(url, settings).then(res => res.json());
    //let rawUserData = getMockData();
    //let users = JSON.parse(rawUserData);

    // Find User secret attribute
    const samlEmailAddress = oktaRequestBody.data.context.user.profile.login;
    var mockDirUser = users.users.filter(u => u.email === samlEmailAddress);
    var userSecretData = mockDirUser[0].secret
    var secretValue = (userSecretData != "" ? userSecretData : "GENERIC_SECRET_VALUE");

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