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
    } else {
        // there are store dids, so lets store our metadata with them
        await hydrateDIDStore(dids);
    }
    // hydrate the rest of the store
    if (store.manifests.length === 0) {
        await hydrateManifestStore();
    }
    if (store.applications.length === 0) {
        await hydrateApplicationStore();
    }
    if (store.definitions.length === 0) {
        await hydrateDefinitionStore();
    }
    if (store.submissions.length === 0) {
        await hydrateSubmissionStore();
    }
    // we hydrate these because there may be objects not issued by a newly set did
    // after all dids were soft deleted
    // but we dont hydrate credentials outside of our did logic 
    // because we only ever access credentials by issuer did anyway

};

export default setupStore;

export const hydrateDIDStore = async (dids?) => {
    if (!dids) {
        dids = await SSI.getDIDs();
    }

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
            await hydrateCredentialsStore(id);
        }
    }
}

export const hydrateCredentialsStore = async (issuerId) => {
    const credentials = await SSI.getCredentials("issuer", issuerId);
    store.credentials = [
        ...store.credentials,
        ...credentials
    ]
}

export const hydrateManifestStore = async () => {
    store.manifests = await SSI.getManifests();
}

export const hydrateApplicationStore = async () => {
    store.applications = await SSI.getApplications();
}

export const hydrateDefinitionStore = async () => {
    store.definitions = await SSI.getDefinitions();
}

export const hydrateSubmissionStore = async () => {
    store.submissions = await SSI.getSubmissions();
}