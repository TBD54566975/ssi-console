export const credentialOutput = {
    "credential_manifest": {
      "description": "string",
      "format": {
        "jwt": {
          "alg": [
            "string"
          ]
        },
        "jwt_vc": {
          "alg": [
            "string"
          ]
        },
        "jwt_vp": {
          "alg": [
            "string"
          ]
        },
        "ldp": {
          "proof_type": [
            "string"
          ]
        },
        "ldp_vc": {
          "proof_type": [
            "string"
          ]
        },
        "ldp_vp": {
          "proof_type": [
            "string"
          ]
        }
      },
      "id": "string",
      "issuer": {
        "id": "string",
        "name": "string",
        "styles": {
          "background": {
            "color": "string"
          },
          "hero": {
            "alt": "string",
            "uri": "string"
          },
          "text": {
            "color": "string"
          },
          "thumbnail": {
            "alt": "string",
            "uri": "string"
          }
        }
      },
      "name": "string",
      "output_descriptors": [
        {
          "description": "string",
          "display": {
            "description": {
              "fallback": "string",
              "path": [
                "string"
              ],
              "schema": {
                "format": "string",
                "type": "string"
              },
              "text": "string"
            },
            "properties": [
              {
                "fallback": "string",
                "label": "string",
                "path": [
                  "string"
                ],
                "schema": {
                  "format": "string",
                  "type": "string"
                },
                "text": "string"
              }
            ],
            "subtitle": {
              "fallback": "string",
              "path": [
                "string"
              ],
              "schema": {
                "format": "string",
                "type": "string"
              },
              "text": "string"
            },
            "title": {
              "fallback": "string",
              "path": [
                "string"
              ],
              "schema": {
                "format": "string",
                "type": "string"
              },
              "text": "string"
            }
          },
          "id": "string",
          "name": "string",
          "schema": "string",
          "styles": {
            "background": {
              "color": "string"
            },
            "hero": {
              "alt": "string",
              "uri": "string"
            },
            "text": {
              "color": "string"
            },
            "thumbnail": {
              "alt": "string",
              "uri": "string"
            }
          }
        }
      ],
      "presentation_definition": {
        "format": {
          "jwt": {
            "alg": [
              "string"
            ]
          },
          "jwt_vc": {
            "alg": [
              "string"
            ]
          },
          "jwt_vp": {
            "alg": [
              "string"
            ]
          },
          "ldp": {
            "proof_type": [
              "string"
            ]
          },
          "ldp_vc": {
            "proof_type": [
              "string"
            ]
          },
          "ldp_vp": {
            "proof_type": [
              "string"
            ]
          }
        },
        "frame": null,
        "id": "string",
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
                    "format": "string",
                    "maxLength": 0,
                    "maximum": null,
                    "minLength": 0,
                    "minimum": null,
                    "not": null,
                    "oneOf": null,
                    "pattern": "string",
                    "properties": null,
                    "required": [
                      null
                    ],
                    "type": "string"
                  },
                  "id": "string",
                  "intent_to_retain": true,
                  "name": "string",
                  "optional": true,
                  "path": [
                    "string"
                  ],
                  "predicate": "string",
                  "purpose": "string"
                }
              ],
              "is_holder": [
                {
                  "directive": "string",
                  "field_id": [
                    "string"
                  ]
                }
              ],
              "limit_disclosure": "string",
              "same_subject": [
                {
                  "directive": "string",
                  "field_id": [
                    "string"
                  ]
                }
              ],
              "statuses": {
                "active": {
                  "directive": "string"
                },
                "revoked": {
                  "directive": "string"
                },
                "suspended": {
                  "directive": "string"
                }
              },
              "subject_is_issuer": "string"
            },
            "format": {
              "jwt": {
                "alg": [
                  "string"
                ]
              },
              "jwt_vc": {
                "alg": [
                  "string"
                ]
              },
              "jwt_vp": {
                "alg": [
                  "string"
                ]
              },
              "ldp": {
                "proof_type": [
                  "string"
                ]
              },
              "ldp_vc": {
                "proof_type": [
                  "string"
                ]
              },
              "ldp_vp": {
                "proof_type": [
                  "string"
                ]
              }
            },
            "group": [
              "string"
            ],
            "id": "string",
            "name": "string",
            "purpose": "string"
          }
        ],
        "name": "string",
        "purpose": "string",
        "submission_requirements": [
          {
            "count": 1,
            "from": "string",
            "from_nested": [
              {}
            ],
            "max": 0,
            "min": 0,
            "name": "string",
            "purpose": "string",
            "rule": "string"
          }
        ]
      },
      "spec_version": "string"
    },
    "id": "string",
    "manifestJwt": "string"
}