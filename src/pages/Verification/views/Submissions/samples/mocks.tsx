export const submissions = [
    {
        "submissions": [
          {
            "status": "pending",
            "verifiablePresentation": {
              "holder": "did:key:1234567",
              "id": "12345-123456-123456",
              "presentation_submission": {
                "id":           "12345678",
                "definitionID": "12345-12345-12345",
                "descriptor_map": {
                        "id":     "test",
                        "path":   "$.vc[0]",
                    },
              }
            },
            "type": [
                "verifiablePresentation"
            ]
          },
          {
            "reason": "good reasons",
            "status": "approved",
            "verifiablePresentation": {
              "holder": "did:key:1234567",
              "id": "12345-123456-123456",
              "presentation_submission": {
                "id":           "12345678",
                "definitionID": "12345-12345-12345",
                "descriptor_map": {
                        "id":     "test",
                        "path":   "$.vc[0]",
                    },
              },
              "type":  [
                "verifiablePresentation"
            ],
            }
          }
        ]
      }
]