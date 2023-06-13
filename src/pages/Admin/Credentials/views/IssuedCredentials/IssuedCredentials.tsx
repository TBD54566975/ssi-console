import { Component, createEffect, createSignal } from "solid-js";
import "./IssuedCredentials.scss";
import Panel from "@/components/Panel/Panel";
import Icon, { ExternalArrow } from "@/icons/Icon";
import { store } from "@/utils/store";
import { updateCredentialStatusInStore } from "@/utils/setup";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";

const IssuedCredentials: Component = () => {
    const [ activeCredentials, setActiveCredentials ] = createSignal(transformCredentials(store.credentials, "active"))
    const [ suspendedCredentials, setSuspendedCredentials ] = createSignal(transformCredentials(store.credentials, "suspended"))
    const [ revokedCredentials, setRevokedCredentials ] = createSignal(transformCredentials(store.credentials, "revoked"))
    const [ item, setItem ] = createSignal();
    const [ statusUpdate, setStatusUpdate ] = createSignal();

    let confirmDialog;
    const confirmStatusUpdate = async (item) => {
        await updateCredentialStatusInStore(item.metadata.id, statusUpdate(), item.metadata.issuerId);
        confirmDialog.close();
    }
    
    createEffect(() => {
        const storeCredentials = store.credentials;
        setActiveCredentials(transformCredentials(storeCredentials, "active"));
        setSuspendedCredentials(transformCredentials(storeCredentials, "suspended"));
        setRevokedCredentials(transformCredentials(storeCredentials, "revoked"));
    })

    const content = () => {
        return {
            active: {
                id: "active",
                title: "Active",
                listItems: activeCredentials(),
                footer: <a href="" target="_blank">Learn about Credentials <Icon svg={ExternalArrow} /></a>,
                fallback: "You haven't issued any Credentials, so there's nothing here.",
                buttons: [
                    {
                        label: "Suspend",
                        className: "warn-button",
                        onClick: (item) => { setItem(item); setStatusUpdate({ "suspended": true }); confirmDialog.showModal()}
                    },
                    {
                        label: "Revoke",
                        className: "danger-button",
                        onClick: (item) => { setItem(item); setStatusUpdate({ "revoked": true }); confirmDialog.showModal()}
                    }
                ]
            },
            suspended: {
                id: "suspended",
                title: "Suspended",
                listItems: suspendedCredentials(),
                fallback: "You haven't suspended any Credentials yet, so there's nothing here.",
                buttons: [
                    {
                        label: "Reinstate",
                        className: "warn-button",
                        onClick: (item) => { setItem(item); setStatusUpdate({ "suspended": false }); confirmDialog.showModal()}
                    },
                ]
            },
            revoked: {
                id: "revoked",
                title: "Revoked",
                listItems: revokedCredentials(),
                fallback: "You haven't revoked any Credentials yet, so there's nothing here.",
            }
        }}
    
    return (
        <>
            {Object.keys(content()).map(key => 
                <Panel content={content()[key]} />
            )}
            <ConfirmationModal 
                ref={confirmDialog}
                onCancel={() => confirmDialog.close()}
                onConfirm={() => confirmStatusUpdate(item())}
                message={
                    statusUpdate()?.["revoked"]
                    ? "Are you sure you want to revoke this credential? This action is irreversible."
                    : statusUpdate()?.["suspended"] === true
                    ? "Are you sure you want to suspend this credential?"
                    :"Are you sure you want to reinstate this credential?"
                }
                cancelMessage={"No, cancel"}
                confirmMessage={
                    statusUpdate()?.["revoked"]
                    ? "Yes, revoke"
                    : statusUpdate()?.["suspended"] === true
                    ? "Yes, suspend"
                    : "Yes, reinstate"
                }
                />
        </>
    )
}

export default IssuedCredentials;

const formatCredentialData = (credentialSubject) => {
    const { id, ...subject } = credentialSubject;
    const data = Object.entries(subject).map(entry => {
        return (
            <div class="entry-row">
                <div class="key-entry">{entry[0]}</div>
                <div class="value-entry">
                    <p>{JSON.stringify(entry[1], null, 2)}</p>
                </div>
            </div>
        )
    });
    return (
        <div class="entry-container">
            <div class="entry-row">
                <div class="key-entry">Subject DID</div>
                <div class="value-entry">
                    <p>{id}</p>
                </div>
            </div>
            {data}
        </div>
    )
}

const transformCredentials = (credentials, status: "active" | "suspended" | "revoked") => {
    return Object.values(credentials).flatMap((credentialSet: []) => {
        return [
            ...credentialSet.filter(credential => {
                if (status === "active" && (!credential["suspended"] && !credential["revoked"])) return true;
                if (status === "suspended" && (credential["suspended"])) return true;
                if (status === "revoked" && (credential["revoked"])) return true;
                return false;
            }).map((cred : { credential })  => {
            const { credential } = cred;
                const manifestName = store.manifests.find(manifest => { 
                if (credential.credentialSchema) {
                    return manifest.credential_manifest.output_descriptors.find(output => output.schema === credential.credentialSchema.id);
                }
                })?.credential_manifest?.name || "Verifiable Credential";
                return {
                    name: `****-${credential.id.slice(-4)}`,
                    credentialName: manifestName,
                    type: credential.issuanceDate,
                    body: formatCredentialData(credential.credentialSubject), 
                    metadata: {
                        id: credential.id,
                        issuerId: credential.issuer,
                        buttonState: {
                            "Suspend": {
                                disabled: credential.credentialStatus?.statusPurpose !== "suspension"
                            },
                            "Revoke": {
                                disabled: credential.credentialStatus?.statusPurpose !== "revocation"
                            }  
                        }
                    }
                }
            })
        ];
    });
}