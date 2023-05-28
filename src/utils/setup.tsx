import SSI, { DIDMethods } from "./service";
import { store, setStore, updateStore } from "./store";

// On first start of the application
const setupStore = async () => {
    // Attempt to get DIDs to add to the store
    const dids = await SSI.getDIDs();
    
    if (!dids.length) {
        // If no DIDs exist, create an ion DID and store it
        await SSI.putDIDIon();
    }

    // hydrate the store
    if (store.user && Object.values(store.user).length === 0) {
        await hydrateDIDStore();
    }
    if (store.manifests?.length === 0) {
        await hydrateManifestStore();
    }
    if (store.applications?.length === 0) {
        await hydrateApplicationStore();
    }
    if (store.definitions?.length === 0) {
        await hydrateDefinitionStore();
    }
    if (Object.values(store.submissions).length === 0) {
        await hydrateSubmissionStore("pending");
        await hydrateSubmissionStore("approved");
        await hydrateSubmissionStore("denied");
    }
    if (store.schemas?.length === 0) {
        await hydrateSchemaStore();
    }
    if (store.deletedDIDs?.length === 0) {
        await hydrateDeletedDIDsStore();
    }
    // we hydrate these because there may be objects not issued by a newly set did
    // after all dids were soft deleted
    // but we dont hydrate credentials outside of our did logic 
    // because we only ever access credentials by issuer did anyway

};

export default setupStore;

export const hydrateDIDStore = async () => {
    const dids = await SSI.getDIDs();
    if (dids.length) {
        updateStore("user", {});
        for (const did of dids) {
            const updateValue = {
                ...store.user,
                [did.id] : {
                    did: did.id,
                    kid: did.verificationMethod.find(method => method.controller === did.id).id,
                }
            }
            updateStore("user", updateValue);
    
            // make sure to hydrate the store with credentials we have access to
            if (Object.values(store.credentials).length === 0) {
                await hydrateCredentialsStore(did.id);
            }
        }
    } else {
        updateStore("user", {});
    }
}

export const hydrateCredentialsStore = async (issuerId) => {
    const credentials = await SSI.getCredentials("issuer", issuerId);
    const updateValue = {
        ...store.credentials,
        [issuerId] : [
            ...(credentials?.length ? credentials: [])
        ]
    }
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

export const hydrateSubmissionStore = async (status: "pending" | "approved" | "denied" | "cancelled") => {
    const submissions = await SSI.getSubmissions(status);
    const updateValue = {
        ...store.submissions,
        [status]: [
            ...(submissions?.length ? submissions : [])
        ]
    }
    updateStore("submissions", updateValue);
}

export const hydrateSchemaStore = async () => {
    updateStore("schemas", await SSI.getSchemas());
}

export const hydrateDeletedDIDsStore = async () => {
    updateStore("deletedDIDs", await SSI.getDeletedDIDs());
}

export const deleteDIDFromStore = async (method: DIDMethods, id: string) => {
    const response = await SSI.deleteDID(method, id); 
    await hydrateDIDStore();
    await hydrateDeletedDIDsStore();
    return response;
}

export const deleteManifestFromStore = async (id: string) => {
    const response = await SSI.deleteManifest(id); 
    await hydrateManifestStore();
    return response;
}