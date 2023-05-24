export class SSIService {
    constructor () {
    }

    private async sendRequest(endpoint: string, method = 'GET', body?): Promise<any> {
        const response = await fetch(endpoint, { 
            headers: { 
                'Content-Type': 'application/json' 
            },
            method,
            ...body && { body: JSON.stringify(body) }
        });
        if (response.status == 200) {
            const data = response.json();
            return data;
        }
        return response;
    }

    // GET methods
    async getHealth(): Promise<any> {
        return this.sendRequest(GET_SSI.HEALTH);
    }

    async getReadiness(): Promise<any> {
        return this.sendRequest(GET_SSI.READINESS);
    }

    async getCredentials(filterBy: "issuer" | "subject" | "schema" = "issuer", filterId: string): Promise<any> {
        const { credentials } = await this.sendRequest(`${GET_SSI.CREDENTIALS}?${filterBy}=${filterId}`);
        return credentials
    }

    async getCredential(id: string): Promise<any> {
        const url = GET_SSI.CREDENTIAL.replace('{id}', id);
        const { credential } = await this.sendRequest(url);
        return credential;
    }

    async getCredentialStatus(id: string): Promise<any> {
        const url = GET_SSI.CREDENTIAL_STATUS.replace('{id}', id);
        return this.sendRequest(url);
    }

    async getDIDMethods(): Promise<any> {
        const { method } = await this.sendRequest(GET_SSI.DIDS_METHOD);
        return method;
    }

    async getDIDsByMethod(method?: DIDMethods): Promise<any> {
        const url = GET_SSI.DIDS.replace("{method}", method);
        const { dids } = await this.sendRequest(url);
        return dids;
    }

    async getDIDs(): Promise<any> {
        const { dids: dids_ion } = await this.sendRequest(GET_SSI.DIDS.replace("{method}", "ion"));
        const { dids: dids_web } = await this.sendRequest(GET_SSI.DIDS.replace("{method}", "web"));
        const { dids: dids_key } = await this.sendRequest(GET_SSI.DIDS.replace("{method}", "key"));
        return [
            ...(dids_ion?.length ? dids_ion : []),
            ...(dids_web?.length ? dids_web : []),
            ...(dids_key?.length ? dids_key : [])
        ];
    }

    async getDeletedDIDs(): Promise<any> {
        const { dids: dids_ion } = await this.sendRequest(`${GET_SSI.DIDS.replace("{method}", "ion")}?deleted=true`);
        const { dids: dids_web } = await this.sendRequest(`${GET_SSI.DIDS.replace("{method}", "web")}?deleted=true`);
        const { dids: dids_key } = await this.sendRequest(`${GET_SSI.DIDS.replace("{method}", "key")}?deleted=true`);
        return [
            ...(dids_ion?.length ? dids_ion : []),
            ...(dids_web?.length ? dids_web : []),
            ...(dids_key?.length ? dids_key : [])
        ];
    }

    async getDID(method: DIDMethods, id: string): Promise<any> {
        const url = GET_SSI.DID.replace("{method}", method).replace('{id}', id);
        return this.sendRequest(url);
    }

    async resolveDID(id: string): Promise<any> {
        const url = GET_SSI.RESOLVE_DID.replace('{id}', id);
        return this.sendRequest(url);
    }

    async getIssuanceTemplate(id: string): Promise<any> {
        const url = GET_SSI.ISSUANCE_TEMPLATE.replace('{id}', id);
        return this.sendRequest(url);
    }
    
    async getKey(id: string): Promise<any> {
        const url = GET_SSI.KEY.replace('{id}', id);
        return this.sendRequest(url);
    }
    
    async getManifests(): Promise<any> {
        const { manifests } = await this.sendRequest(GET_SSI.MANIFESTS);
        return manifests;
    }
    
    async getManifest(id: string): Promise<any> {
        const url = GET_SSI.MANIFEST.replace('{id}', id);
        return this.sendRequest(url);
    }
    
    async getApplications(): Promise<any> {
        const { applications } = await this.sendRequest(GET_SSI.APPLICATIONS);
        return applications;
    }
    
    async getApplication(id: string): Promise<any> {
        const url = GET_SSI.APPLICATION.replace('{id}', id);
        return this.sendRequest(url);
    }
    
    async getResponses(): Promise<any> {
        const { responses } = await this.sendRequest(GET_SSI.RESPONSES);
        return responses;
    }
    
    async getResponse(id: string): Promise<any> {
        const url = GET_SSI.RESPONSE.replace('{id}', id);
        return this.sendRequest(url);
    }
    
    async getOperations(): Promise<any> {
        const { operations } = await this.sendRequest(GET_SSI.OPERATIONS);
        return operations;
    }
    
    async getOperation(id: string): Promise<any> {
        const url = GET_SSI.OPERATION.replace('{id}', id);
        return this.sendRequest(url);
    }

    async getCancelOperation(id: string): Promise<any> {
        const url = GET_SSI.CANCEL_OPERATION.replace('{id}', id);
        return this.sendRequest(url);
    }
    
    async getDefinitions(): Promise<any> {
        const { definitions } = await this.sendRequest(GET_SSI.DEFINITIONS);
        return definitions;
    }
    
    async getDefinition(id: string): Promise<any> {
        const url = GET_SSI.DEFINITION.replace('{id}', id);
        return this.sendRequest(url);
    }

    async getSubmissions(status: "pending" | "approved" | "denied" | "cancelled"): Promise<any> {
        const data = {
            "filter": `status='${status}'`
        }
        const { submissions } = await this.sendRequest(`${GET_SSI.SUBMISSIONS}`);
        return submissions;
    }
    
    async getSubmission(id: string): Promise<any> {
        const url = GET_SSI.SUBMISSION.replace('{id}', id);
        return this.sendRequest(url);
    }
    
    async getSchemas(): Promise<any> {
        const { schemas } = await this.sendRequest(GET_SSI.SCHEMAS);
        return schemas;
    }
    
    async getSchema(id: string): Promise<any> {
        const url = GET_SSI.SCHEMA.replace('{id}', id);
        return this.sendRequest(url);
    }
    
    async getWebhooks(): Promise<any> {
        const { webhooks } = await this.sendRequest(GET_SSI.WEBHOOKS);
        return webhooks;
    }

    // PUT methods
    async putCredential(data): Promise<any> {
        return this.sendRequest(PUT_SSI.CREDENTIAL, 'PUT', data);
    }
    
    async putCredentialStatus(id: string, data): Promise<any> {
        const url = PUT_SSI.CREDENTIAL_STATUS.replace('{id}', id);
        return this.sendRequest(url, 'PUT', data);
    }

    async putVerifyCredential(data): Promise<any> {
        return this.sendRequest(PUT_SSI.VERIFY_CREDENTIAL, 'PUT', data);
    }
    
    async putDID(method: DIDMethods, data): Promise<any> {
        const url = PUT_SSI.DID.replace("{method}", method)
        return this.sendRequest(url, 'PUT', data);
    }

    async putDIDIon(serviceEndpoints: DIDIonServiceEndpoint[] = []): Promise<any> {
        const url = PUT_SSI.DID.replace("{method}", "ion")
        const data = {
            "keyType": "Ed25519",
            "options": {
                serviceEndpoints //empty array if none
            }
        }
        return this.sendRequest(url, 'PUT', data);
    }

    async putDIDWeb(didWebID: string): Promise<any> {
        const url = PUT_SSI.DID.replace("{method}", "web")
        const data = {
            "keyType": "Ed25519",
            "options": {
                didWebID // should be did:web:xxxx
            }
        }
        return this.sendRequest(url, 'PUT', data);
    }

    async putDIDKey(): Promise<any> {
        const url = PUT_SSI.DID.replace("{method}", "key")
        const data = {
            "keyType": "Ed25519"
        }
        return this.sendRequest(url, 'PUT', data);
    }
    
    async putIssuanceTemplate(data): Promise<any> {
        return this.sendRequest(PUT_SSI.ISSUANCE_TEMPLATE, 'PUT', data);
    }
    
    async putKey(data): Promise<any> {
        return this.sendRequest(PUT_SSI.KEY, 'PUT', data);
    }
    
    async putManifest(data): Promise<any> {
        return this.sendRequest(PUT_SSI.MANIFEST, 'PUT', data);
    }
    
    async putApplication(data): Promise<any> {
        return this.sendRequest(PUT_SSI.APPLICATION, 'PUT', data);
    }
    
    async putApplicationReview(id: string, data): Promise<any> {
        const url = PUT_SSI.APPLICATION_REVIEW.replace('{id}', id);
        return this.sendRequest(url, 'PUT', data);
    }
    
    async putDefinition(data): Promise<any> {
        return this.sendRequest(PUT_SSI.DEFINITION, 'PUT', data);
    }
    
    async putSubmission(data): Promise<any> {
        return this.sendRequest(PUT_SSI.SUBMISSION, 'PUT', data);
    }
    
    async putSubmissionReview(id: string, data): Promise<any> {
        const url = PUT_SSI.SUBMISSION_REVIEW.replace('{id}', id);
        return this.sendRequest(url, 'PUT', data);
    }
    
    async putSchema(data): Promise<any> {
        return this.sendRequest(PUT_SSI.SCHEMA, 'PUT', data);
    }
    
    async putWebhook(data): Promise<any> {
        return this.sendRequest(PUT_SSI.WEBHOOK, 'PUT', data);
    }

    // DELETE methods
    async deleteCredential(id: string, issuer: string): Promise<any> {
        const url = DELETE_SSI.CREDENTIAL.replace('{id}', id);
        return this.sendRequest(url, 'DELETE');
    }
    
    async deleteDID(method: DIDMethods, id: string): Promise<any> {
        const url = DELETE_SSI.DID.replace('{method}', method).replace('{id}', id);
        this.sendRequest(url, 'DELETE');
    }
    
    async deleteIssuanceTemplate(id: string): Promise<any> {
        const url = DELETE_SSI.ISSUANCE_TEMPLATE.replace('{id}', id);
        return this.sendRequest(url, 'DELETE');
    }
    
    async deleteKey(id: string): Promise<any> {
        const url = DELETE_SSI.KEY.replace('{id}', id);
        return this.sendRequest(url, 'DELETE');
    }
    
    async deleteManifest(id: string): Promise<any> {
        const url = DELETE_SSI.MANIFEST.replace('{id}', id);
        return this.sendRequest(url, 'DELETE');
    }
    
    async deleteApplication(id: string): Promise<any> {
        const url = DELETE_SSI.APPLICATION.replace('{id}', id);
        return this.sendRequest(url, 'DELETE');
    }
    
    async deleteResponse(id: string): Promise<any> {
        const url = DELETE_SSI.RESPONSE.replace('{id}', id);
        return this.sendRequest(url, 'DELETE');
    }
    
    async deleteDefinition(id: string): Promise<any> {
        const url = DELETE_SSI.DEFINITION.replace('{id}', id);
        return this.sendRequest(url, 'DELETE');
    }
    
    async deleteSchema(id: string): Promise<any> {
        const url = DELETE_SSI.SCHEMA.replace('{id}', id);
        return this.sendRequest(url, 'DELETE');
    }
}

enum GET_SSI {
    HEALTH = '/health',
    READINESS = '/readiness',
    CREDENTIALS = '/v1/credentials',
    CREDENTIAL = '/v1/credentials/{id}',
    CREDENTIAL_STATUS = '/v1/credentials/{id}/status',
    DIDS_METHOD = '/v1/dids',
    DIDS = '/v1/dids/{method}',
    DID = '/v1/dids/{method}/{id}',
    RESOLVE_DID = '/v1/dids/resolver/{id}',
    ISSUANCE_TEMPLATE = '/v1/issuancetemplates/{id}',
    KEY = '/v1/keys/{id}',
    MANIFESTS = '/v1/manifests',
    MANIFEST = '/v1/manifests/{id}',
    APPLICATIONS = '/v1/manifests/applications',
    APPLICATION = '/v1/manifests/applications/{id}',
    RESPONSES = '/v1/manifests/responses',
    RESPONSE = '/v1/manifests/responses/{id}',
    OPERATIONS = '/v1/operations',
    OPERATION = '/v1/operations/{id}',
    CANCEL_OPERATION = '/v1/operations/cancel/{id}',
    DEFINITIONS = '/v1/presentations/definitions',
    DEFINITION = '/v1/presentations/definitions/{id}',
    SUBMISSIONS = '/v1/presentations/submissions',
    SUBMISSION = '/v1/presentations/submissions/{id}',
    SCHEMAS = '/v1/schemas',
    SCHEMA = '/v1/schemas/{id}',
    WEBHOOKS = '/v1/webhooks'
}

enum PUT_SSI {
    CREDENTIAL = '/v1/credentials',
    CREDENTIAL_STATUS = '/v1/credentials/{id}/status',
    VERIFY_CREDENTIAL = '/v1/credentials/verification',
    DID = '/v1/dids/{method}',
    ISSUANCE_TEMPLATE = '/v1/issuancetemplates',
    KEY = '/v1/keys',
    MANIFEST = '/v1/manifests',
    APPLICATION = '/v1/manifests/applications',
    APPLICATION_REVIEW = '/v1/manifests/applications/{id}/review',
    DEFINITION = '/v1/presentations/definitions',
    SUBMISSION = '/v1/presentations/submissions',
    SUBMISSION_REVIEW = '/v1/presentations/submissions/{id}/review',
    SCHEMA = '/v1/schemas',
    WEBHOOK = '/v1/webhooks'
}

enum DELETE_SSI {
    CREDENTIAL = '/v1/credentials/{id}',
    DID = '/v1/dids/{method}/{id}',
    ISSUANCE_TEMPLATE = '/v1/issuancetemplates/{id}',
    KEY = '/v1/keys/{id}',
    MANIFEST = '/v1/manifests/{id}',
    APPLICATION = '/v1/manifests/applications/{id}',
    RESPONSE = '/v1/manifests/responses/{id}',
    DEFINITION = '/v1/presentations/definitions/{id}',
    SCHEMA = '/v1/schemas/{id}'
}

export type DIDMethods = "ion" | "web" | "key";
export type DIDIonServiceEndpoint = {
    "id",
    "type",
    "serviceEndpoint",
}

const SSI = new SSIService();

export default SSI;