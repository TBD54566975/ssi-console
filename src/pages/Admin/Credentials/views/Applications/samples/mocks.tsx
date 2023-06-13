export const applications = [
    {
        "application": {
          "applicant": "did:key:1234567",
          "format": {
            "jwt": {
              "alg": [
                "EdDSA"
              ]
            }
          },
          "id": "123456-12345678-12345678",
          "manifest_id": "1234-12345-123456",
          "presentation_submission": {
            "definition_id": "test_definition",
            "descriptor_map": [
              {
                "format":  {
                    "jwt": {
                      "alg": [
                        "EdDSA"
                      ]
                    }
                },
                "id": "test-1",
                "path": "$.vc.test"
              }
            ],
            "id": "12345678-12345"
          },
          "spec_version": "spec_v1"
        },
        "id": "1234-123451-234567"
    }
]