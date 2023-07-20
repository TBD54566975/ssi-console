export const manifestInput =  {
    "description": "",
    "format": {
      "jwt_vc": {
        "alg": [
          "EdDSA"
        ]
      },
    },
    "issuerDid": "",
    "verificationMethodId": "",
    "issuerName": "",
    "name": "",
    "outputDescriptors": [
      {
        "description": "",
        "display": {
          "description": {
            "fallback": "",
            "path": [
              ""
            ],
            "schema": {
              "format": "",
              "type": ""
            },
            "text": ""
          },
          "properties": [
            {
              "fallback": "",
              "label": "",
              "path": [
                ""
              ],
              "schema": {
                "format": "",
                "type": ""
              },
              "text": ""
            }
          ],
          "subtitle": {
            "fallback": "",
            "path": [
              ""
            ],
            "schema": {
              "format": "",
              "type": ""
            },
            "text": ""
          },
          "title": {
            "fallback": "",
            "path": [
              ""
            ],
            "schema": {
              "format": "",
              "type": ""
            },
            "text": ""
          }
        },
        "id": "",
        "name": "",
        "schema": "",
        "styles": {
          "background": {
            "color": ""
          },
          "hero": {
            "alt": "",
            "uri": ""
          },
          "text": {
            "color": ""
          },
          "thumbnail": {
            "alt": "",
            "uri": ""
          }
        }
      }
    ],
    "presentationDefinition": {
      "format": {
        "jwt": {
          "alg": [
            ""
          ]
        },
        "jwt_vc": {
          "alg": [
            ""
          ]
        },
        "jwt_vp": {
          "alg": [
            "EdDSA"
          ]
        },
        "ldp": {
          "proof_type": [
            ""
          ]
        },
        "ldp_vc": {
          "proof_type": [
            ""
          ]
        },
        "ldp_vp": {
          "proof_type": [
            ""
          ]
        }
      },
      "frame": null,
      "id": "",
      "input_descriptors": [
        {
          "constraints": {
            "fields": [
              {
                "filter": {
                  "additionalProperties": true,
                  "allOf": null,
                  "const": null,
                  "enum": [
                    null
                  ],
                  "exclusiveMaximum": null,
                  "exclusiveMinimum": null,
                  "format": "",
                  "maxLength": 0,
                  "maximum": null,
                  "minLength": 0,
                  "minimum": null,
                  "not": null,
                  "oneOf": null,
                  "pattern": "",
                  "properties": null,
                  "required": [
                    ""
                  ],
                  "type": ""
                },
                "id": "",
                "intent_to_retain": true,
                "name": "",
                "optional": true,
                "path": [
                  ""
                ],
                "predicate": "",
                "purpose": ""
              }
            ],
            "is_holder": [
              {
                "directive": "",
                "field_id": [
                  ""
                ]
              }
            ],
            "limit_disclosure": "",
            "same_subject": [
              {
                "directive": "",
                "field_id": [
                  ""
                ]
              }
            ],
            "statuses": {
              "active": {
                "directive": ""
              },
              "revoked": {
                "directive": ""
              },
              "suspended": {
                "directive": ""
              }
            },
            "subject_is_issuer": ""
          },
          "format": {
            "jwt": {
              "alg": [
                ""
              ]
            },
            "jwt_vc": {
              "alg": [
                ""
              ]
            },
            "jwt_vp": {
              "alg": [
                ""
              ]
            },
            "ldp": {
              "proof_type": [
                ""
              ]
            },
            "ldp_vc": {
              "proof_type": [
                ""
              ]
            },
            "ldp_vp": {
              "proof_type": [
                ""
              ]
            }
          },
          "group": [
            ""
          ],
          "id": "",
          "name": "",
          "purpose": ""
        }
      ],
      "name": "",
      "purpose": "",
      "submission_requirements": [
        {
          "count": 1,
          "from": "",
          "from_nested": [
            {}
          ],
          "max": 0,
          "min": 0,
          "name": "",
          "purpose": "",
          "rule": ""
        }
      ]
    }
}

export const issuanceInput = {
    "credentialManifest": "",
    "credentials": [
      {
        "credentialInputDescriptor": "",
        "data": {
          "property1": null,
          "property2": null
        },
        "expiry": {
          "duration": 0,
          "time": "string"
        },
        "id": "string",
        "revocable": true,
        "schema": "string"
      }
    ],
    "id": "string",
    "issuer": "string",
    "issuerKid": "string"
}

export const schemaInput = {
    "author": "string",
    "authorKid": "string",
    "name": "string",
    "schema": {
      "firstName": "string",
      "lastName": "string"
    },
    "sign": true
}

export const inputDescriptorsInput = [
    {
        "constraints": {
            "fields": [
                {
                    "path": [
                        "$.firstName", 
                        "$.vc.firstName"
                    ],
                },
                {
                    "path": [
                        "$.lastName", 
                        "$.vc.lastName"
                    ],
                }
            ]
        },
        "id": "0"
    }
]

export const stylesInput = {
    "background": {
      "color": "#FFEC19"
    },
    "hero": {
      "alt": "My hero image",
      "uri": "http://mysite.com/image"
    },
    "text": {
      "color": "#000000"
    },
    "thumbnail": {
      "alt": "My thumbnail",
      "uri": "http://mysite.com/image"
    }
  }