export const manifests = [
    {
        "id": "71806dee-0841-4184-9a2e-915d06b1b157",
        "credential_manifest": {
            "id": "71806dee-0841-4184-9a2e-915d06b1b157",
            "spec_version": "https://identity.foundation/credential-manifest/spec/v1.0.0/",
            "name": "Test Manifest",
            "description": "Test manifest for demonstration purposes",
            "issuer": {
                "id": "did:key:z6MkiyrQHpiXc76NccL2NBrCKDs5fyUZNTHtHmbcGzmF99Ha"
            },
            "output_descriptors": [
                {
                    "id": "TestManifest1",
                    "schema": "013a12f8-36ca-4749-8639-4fd599c92caf"
                }
            ],
            "format": {
                "jwt": {
                    "alg": [
                        "EdDSA"
                    ]
                }
            }
        },
        "manifestJwt": "eyJhbGciOiJFZERTQSIsImtpZCI6IiN6Nk1raXlyUUhwaVhjNzZOY2NMMk5CckNLRHM1ZnlVWk5USHRIbWJjR3ptRjk5SGEiLCJ0eXAiOiJKV1QifQ.eyJjcmVkZW50aWFsX21hbmlmZXN0Ijp7ImRlc2NyaXB0aW9uIjoiVGVzdCBtYW5pZmVzdCBmb3IgZGVtb25zdHJhdGlvbiBwdXJwb3NlcyIsImZvcm1hdCI6eyJqd3QiOnsiYWxnIjpbIkVkRFNBIl19fSwiaWQiOiI3MTgwNmRlZS0wODQxLTQxODQtOWEyZS05MTVkMDZiMWIxNTciLCJpc3N1ZXIiOnsiaWQiOiJkaWQ6a2V5Ono2TWtpeXJRSHBpWGM3Nk5jY0wyTkJyQ0tEczVmeVVaTlRIdEhtYmNHem1GOTlIYSJ9LCJuYW1lIjoiVGVzdCBNYW5pZmVzdCIsIm91dHB1dF9kZXNjcmlwdG9ycyI6W3siaWQiOiJUZXN0TWFuaWZlc3QxIiwic2NoZW1hIjoiMDEzYTEyZjgtMzZjYS00NzQ5LTg2MzktNGZkNTk5YzkyY2FmIn1dLCJzcGVjX3ZlcnNpb24iOiJodHRwczovL2lkZW50aXR5LmZvdW5kYXRpb24vY3JlZGVudGlhbC1tYW5pZmVzdC9zcGVjL3YxLjAuMC8ifSwiaWF0IjoxNjg0Mzc2MDgxLCJpc3MiOiJkaWQ6a2V5Ono2TWtpeXJRSHBpWGM3Nk5jY0wyTkJyQ0tEczVmeVVaTlRIdEhtYmNHem1GOTlIYSJ9.KJMIgAPY4NQTFl5LZSI2nxrTp1PwQqs-v7I__ySKY7Kbd5M0_y969UwvOQv80N1ST2V-xJLGgcjlVzvuqFs-Aw"
    },
    {
        "id": "dc978b18-8728-4a66-86ab-c0230a13f835",
        "credential_manifest": {
            "id": "dc978b18-8728-4a66-86ab-c0230a13f835",
            "spec_version": "https://identity.foundation/credential-manifest/spec/v1.0.0/",
            "name": "Test Manifest",
            "description": "Test manifest for demonstration purposes",
            "issuer": {
                "id": "did:key:z6MkjqweA2cGy25AtLQUQTdjxg8KMBxAbCBqVU3cW6vKgomB"
            },
            "output_descriptors": [
                {
                    "id": "TestManifest1",
                    "schema": "0eb8fef6-824c-4108-9921-4fd9098450ee"
                }
            ],
            "format": {
                "jwt": {
                    "alg": [
                        "EdDSA"
                    ]
                }
            }
        },
        "manifestJwt": "eyJhbGciOiJFZERTQSIsImtpZCI6IiN6Nk1ranF3ZUEyY0d5MjVBdExRVVFUZGp4ZzhLTUJ4QWJDQnFWVTNjVzZ2S2dvbUIiLCJ0eXAiOiJKV1QifQ.eyJjcmVkZW50aWFsX21hbmlmZXN0Ijp7ImRlc2NyaXB0aW9uIjoiVGVzdCBtYW5pZmVzdCBmb3IgZGVtb25zdHJhdGlvbiBwdXJwb3NlcyIsImZvcm1hdCI6eyJqd3QiOnsiYWxnIjpbIkVkRFNBIl19fSwiaWQiOiJkYzk3OGIxOC04NzI4LTRhNjYtODZhYi1jMDIzMGExM2Y4MzUiLCJpc3N1ZXIiOnsiaWQiOiJkaWQ6a2V5Ono2TWtqcXdlQTJjR3kyNUF0TFFVUVRkanhnOEtNQnhBYkNCcVZVM2NXNnZLZ29tQiJ9LCJuYW1lIjoiVGVzdCBNYW5pZmVzdCIsIm91dHB1dF9kZXNjcmlwdG9ycyI6W3siaWQiOiJUZXN0TWFuaWZlc3QxIiwic2NoZW1hIjoiMGViOGZlZjYtODI0Yy00MTA4LTk5MjEtNGZkOTA5ODQ1MGVlIn1dLCJzcGVjX3ZlcnNpb24iOiJodHRwczovL2lkZW50aXR5LmZvdW5kYXRpb24vY3JlZGVudGlhbC1tYW5pZmVzdC9zcGVjL3YxLjAuMC8ifSwiaWF0IjoxNjg0NzIwOTE4LCJpc3MiOiJkaWQ6a2V5Ono2TWtqcXdlQTJjR3kyNUF0TFFVUVRkanhnOEtNQnhBYkNCcVZVM2NXNnZLZ29tQiJ9.XVWDg_9NPVNclTI8ms1aqwjqxZed5mA8c6qocGzb7M-42hHBv-5-sOeAhYcYOkfOTF-UYSoKFOPGDWmw4zXsBg"
    }
]