import { Component, createEffect, createSignal } from "solid-js";
import "./IssuedCredentials.scss";
import Panel from "@/components/Panel/Panel";
import Icon, { ExternalArrow } from "@/icons/Icon";
import { store } from "@/utils/store";
import { updateCredentialStatusInStore } from "@/utils/setup";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import { useNavigate } from "@solidjs/router";
import { parseDateFromIssuanceDate, parseIDFromUrl } from "@/utils/helpers";

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

    const content = () => {
        return {
            active: {
                id: "active",
                title: "Active",
                listItems: activeCredentials(),
                footer: <a href="" target="_blank">Learn about Credentials <Icon svg={ExternalArrow} /></a>,
                fallback: "You haven't issued any Credentials, so there's nothing here.",
            },
            suspended: {
                id: "suspended",
                title: "Suspended",
                listItems: suspendedCredentials(),
                fallback: "You haven't suspended any Credentials yet, so there's nothing here.",
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
        </>
    )
}

export default IssuedCredentials;

const transformCredentials = (credentials, status: "active" | "suspended" | "revoked") => {
        return credentials.filter(credential => {
                if (status === "active" && (!credential["suspended"] && !credential["revoked"])) return true;
                if (credential[status]) return true;
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
                    type: parseDateFromIssuanceDate(credential.issuanceDate, "full"),
                    ...credential.credentialStatus?.statusPurpose === "suspension" && { tag: {
                        type: "warn",
                        label: "Suspendable"
                        }},
                    ...credential.credentialStatus?.statusPurpose === "revocation" && { tag: {
                        type: "danger",
                        label: "Revocable"
                        }},
                    navigation: parseIDFromUrl(credential.id),
                    body: JSON.stringify(credential.credentialSubject),
                    metadata: {
                        id: credential.id,
                        issuerId: credential.issuer,
                        
                    }
                }
            });
}