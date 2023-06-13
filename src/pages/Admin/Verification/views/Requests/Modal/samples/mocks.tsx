export const requestInput = {
    "author": "",
    "authorKid": "",
    "format": {
      "jwt_vp": {
        "alg": [
            "EdDSA"
        ]
      },
    },
    "inputDescriptors": [
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
    "submissionRequirements": [
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