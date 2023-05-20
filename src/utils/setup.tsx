import SSI from "./service";
import { store } from "./store";

// On first start of the application
const setupStore = async () => {
    // Attempt to get DIDs to add to the store
    const dids = await SSI.getDIDs();
    
    if (!dids) {
        // If no DIDs exist, create an ion DID and store it
        const newDID = await SSI.putDIDIon();

        const metadata = {
            "type": "didMetadata",
            "label": "Primary",
            "styles": {
                "background": {
                    "color": '#000000'
                },
                "text": {
                    "color": '#FFFFFF'
                }
            }
        }

        store.user[newDID.id] = {
            did: newDID.id,
            kid: newDID.verificationMethod.find(method => method.controller === newDID.id).id,
            metadata
        }; 

        localStorage.setItem(newDID.id, JSON.stringify(metadata))
        // no need to attempt to hydrate the store
    } else {
        // there are store dids, so lets store our metadata with them
        for (const { id } of dids) {
            if (localStorage.getItem(id)) {
                store.user[id] = {
                    did: id,
                    kid: id.verificationMethod.find(method => method.controller === id.id).id,
                    metadata: JSON.parse(localStorage.getItem(id))
                };
            } else {
                store.user[id] = {
                    did: id,
                    kid: id.verificationMethod.find(method => method.controller === id.id).id,
                }
            }
            // make sure to hydrate the store with credentials we have access to
            if (store.credentials.length === 0) {
                const credentials = await SSI.getCredentials("issuer", id);
                store.credentials = [
                    ...store.credentials,
                    ...credentials
                ]
            }
        }
    }
    // hydrate the rest of the store
    if (store.manifests.length === 0) {
        store.manifests = await SSI.getManifests();
    }
    if (store.applications.length === 0) {
        store.applications = await SSI.getApplications();
    }
    if (store.definitions.length === 0) {
        store.definitions = await SSI.getDefinitions();
    }
    if (store.submissions.length === 0) {
        store.submissions = await SSI.getSubmissions();
    }
};

export default setupStore;