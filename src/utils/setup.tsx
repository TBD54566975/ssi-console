import SSI from "./service";
import { store, setStore, updateStore } from "./store";

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

        const updateValue = {
            [newDID.id]: {
                did: newDID.id,
                kid: newDID.verificationMethod.find(method => method.controller === newDID.id).id,
                metadata
            }
        }; 
        updateStore("user", updateValue);

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

    for (const did of dids) {
        const updateValue = {
            [did.id] : {
                did: did.id,
                kid: did.verificationMethod.find(method => method.controller === did.id).id,
            }
        }
        // include metadata if available in localstorage
        if (localStorage.getItem(did.id)) {
            updateValue[did.id]["metadata"] = JSON.parse(localStorage.getItem(did.id));
        }
        updateStore("user", updateValue);

        // make sure to hydrate the store with credentials we have access to
        if (store.credentials.length === 0) {
            await hydrateCredentialsStore(did.id);
        }
    }
}

export const hydrateCredentialsStore = async (issuerId) => {
    const credentials = await SSI.getCredentials("issuer", issuerId);
    const updateValue = [
        ...store.credentials,
        ...credentials
    ]
    updateStore("credentials", updateValue);
}

export const hydrateManifestStore = async () => {
    updateStore("manifests", await SSI.getManifests());
}

export const hydrateApplicationStore = async () => {
    updateStore("applications", await SSI.getApplications());
}

export const hydrateDefinitionStore = async () => {
    updateStore("definitions", await SSI.getDefinitions());
}

export const hydrateSubmissionStore = async () => {
    updateStore("submissions", await SSI.getSubmissions());
}