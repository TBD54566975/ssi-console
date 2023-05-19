export function createDIDProfile() {
    // first create the did
    const did = '123456';

    // then create a VC with certain things about the did. first one is primary
    const vc = {
        did,
        name: "Primary",
        styles: {
            background: {
                color: "#000"
            },
            hero: {
                alt: "Hero image for issuer",
                uri: "some default image"
            },
            text: {
                color: "#fff"
            },
            thumbnail: {
                alt: "Thumbnail for issuer",
                uri: "some default image"
            }
        },
        createdAt: '12345'
    }
}

export function getDIDProfile() {
    // first get the did
    const did = '123456';

    // then get the VCs by subject, which is did
    const vc = [{
        did,
        name: "Primary",
        styles: {
            background: {
                color: "#000"
            },
            hero: {
                alt: "Hero image for issuer",
                uri: "some default image"
            },
            text: {
                color: "#fff"
            },
            thumbnail: {
                alt: "Thumbnail for issuer",
                uri: "some default image"
            }
        },
        createdAt: '12345'
    }]

    // if for some reason there are multiple, get the most recent one and delete any others.

    // then map the VC to the did by finding VCs where subject == did
}

export function updateDIDProfile() {
    // assumes you already have the DID profile to update

    // create a VC with the updated properties and existing properties
    const vc = {
        did: '12345',
        name: "Primary",
        styles: {
            background: {
                color: "#000"
            },
            hero: {
                alt: "Hero image for issuer",
                uri: "some default image"
            },
            text: {
                color: "#fff"
            },
            thumbnail: {
                alt: "Thumbnail for issuer",
                uri: "some default image"
            }
        }
    }

    //then delete the original VC by ID.
}

export function deleteDIDProfile() {
    // assumes you already have the DID profile to delete

    // first delete the VC
    const vc = {}

    // then delete the did
    const did = '123456'; //delete
}