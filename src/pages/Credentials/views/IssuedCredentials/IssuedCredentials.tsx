import { Component, createEffect, createSignal } from "solid-js";
import "./IssuedCredentials.scss";
import Panel from "../../../../components/Panel/Panel";
import Modal from "../../../DIDs/views/MyDIDs/Modal/Modal";
import Icon, { ExternalArrow, Plus } from "../../../../icons/Icon";
import { store } from "../../../../utils/store";
import { hydrateCredentialsStore } from "../../../../utils/setup";
import { credentials } from "./samples/mocks";
import SSI from "../../../../utils/service";

const IssuedCredentials: Component = () => {
    const [ activeCredentials, setActiveCredentials ] = createSignal(transformCredentials(store.credentials, "active"))
    const [ suspendedCredentials, setSuspendedCredentials ] = createSignal(transformCredentials(store.credentials, "suspended"))
    const [ revokedCredentials, setRevokedCredentials ] = createSignal(transformCredentials(store.credentials, "revoked"))

    
    createEffect(() => {
        const storeCredentials = store.credentials;
        setActiveCredentials(transformCredentials(storeCredentials, "active"));
        setSuspendedCredentials(transformCredentials(storeCredentials, "suspended"));
        setRevokedCredentials(transformCredentials(storeCredentials, "revoked"));
    })

    const suspendCredential = async (credential) => {
        await SSI.putCredentialStatus(credential.metadata.id, { "suspended": true });
        await hydrateCredentialsStore(credential.metadata.issuerId);
    }

    const revokeCredential = async (credential) => {
        await SSI.putCredentialStatus(credential.itemId, { "revoked": true });
    }

    const reinstateCredential = async (credential) => {
        await SSI.putCredentialStatus(credential.itemId, { "suspended": false });
    }

    const content = {
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
                    onClick: (item) => suspendCredential(item)
                },
                {
                    label: "Revoke",
                    className: "danger-button",
                    onClick: (item) => revokeCredential(item)
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
                    className: "secondary-button",
                    onClick: (item) => reinstateCredential(item)
                },
            ]
        },
        revoked: {
            id: "revoked",
            title: "Revoked",
            listItems: revokedCredentials(),
            fallback: "You haven't revoked any Credentials yet, so there's nothing here.",
        }
    }
    return (
        <>
            {Object.keys(content).map(key => 
                <Panel content={content[key]} />
            )}
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
                <div class="value-entry">{JSON.stringify(entry[1], null, 2)}</div>
            </div>
        )
    });
    return (
        <pre>
            <code class="entry-container">
                {data}
            </code>
        </pre>
    )
}

const transformCredentials = (credentials, status: "active" | "suspended" | "revoked") => {
    return Object.values(credentials).flatMap((credentialSet: []) => {
        return [
            ...credentialSet.filter(credential => {
                if (status === "active" && (!credential["Suspended"] && !credential["Revoked"])) return true;
                if (status === "suspended" && (credential["Suspended"])) return true;
                if (status === "revoked" && (credential["Revoked"])) return true;
                return false;
            }).map((credential : { Credential })  => {
                return {
                    name: `****-${credential.Credential.id.slice(-4)}`,
                    subjectId: credential.Credential.credentialSubject.id,
                    type: credential.Credential.issuanceDate,
                    body: formatCredentialData(credential.Credential.credentialSubject),
                    metadata: {
                        id: credential.Credential.id,
                        issuerId: credential.Credential.issuer,
                        buttonState: {
                            "Suspend": {
                                disabled: credential.Credential.credentialStatus?.statusPurpose !== "suspension"
                            },
                            "Revoke": {
                                disabled: credential.Credential.credentialStatus?.statusPurpose !== "revocation"
                            }  
                        }
                    }
                }
            })
        ];
    });
}