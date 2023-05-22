const applications = [
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
          "id": "test_application",
          "manifest_id": "test_manifest",
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
            "id": "test-12345"
          },
          "spec_version": "spec_v1"
        },
        "id": "1234-123451-234567"
    }
]