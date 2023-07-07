export enum EvidenceScheme {
    DocumentVerification = "Document Verification",
    ClaimsVerification = "Claims Verification"
}

const evidenceSchemes = {
    [EvidenceScheme.DocumentVerification]: {
        "id": "https://example.com/evidence/1234-1234-1234",
        "type": "DocumentVerification",
        "verifier": "did:web:example.com",
        "evidenceDocument": "DriversLicense",
        "subjectPresence": "Physical",
        "documentPresence": "Physical",
        "licenseNumber": "123AB4567"
    },
    [EvidenceScheme.ClaimsVerification]: {
        "id": "https://example.com/evidence/1234-1234-1234",
        "type": "ClaimsVerification",
        "verifier": "did:web:example.com",
        "evidenceDocument": "DriversLicense",
        "subjectPresence": "Physical",
        "documentPresence": "Physical",
        "licenseNumber": "123AB4567"
    }
}

// ID - URL of where the document is stored (empty text area?)
// Type - Document vs Claims || empty text value? 
// SubjectPresence - Physical vs. Virtual
// DocumentPresence - Physical vs. Virtual | AttestationPresence - Physical vs. Virtual
// Verifier - enter a DID
// if document - DocumentNumber - ID/Number of the document | Claim - key? of the credentialSubject?

