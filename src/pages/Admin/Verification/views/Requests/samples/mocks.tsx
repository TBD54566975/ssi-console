export const definitions =  [
    {
        "id": "dd71d4f2-7df8-42ab-a680-d794f01509f4",
        "name": "test",
        "purpose": "testing",
        "format": {
            "jwt_vp": {
                "alg": [
                    "EdDSA"
                ]
            }
        },
        "input_descriptors": [
            {
                "id": "test_pres",
                "constraints": {
                    "fields": [
                        {
                            "id": "test_pres",
                            "name": "test presentation",
                            "path": [
                                "$.vc.test, $.test"
                            ],
                            "purpose": "for testing",
                            "optional": true,
                            "intent_to_retain": true
                        }
                    ]
                }
            }
        ]
    }
]