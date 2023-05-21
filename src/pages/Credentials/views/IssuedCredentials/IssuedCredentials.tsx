import { Component } from "solid-js";
import "./IssuedCredentials.scss";
import Panel from "../../../../components/Panel/Panel";
import Modal from "../../../DIDs/views/MyDIDs/Modal/Modal";
import Icon, { ExternalArrow, Plus } from "../../../../icons/Icon";
import { store } from "../../../../utils/store";
import { hydrateCredentialsStore } from "../../../../utils/setup";
import { credentials } from "./samples/mocks";

const IssuedCredentials: Component = () => {
    const content = {
        active: {
            id: "active",
            title: "Active",
            listItems: transformCredentials(store.credentials),
            footer: <a href="" target="_blank">Learn about Credentials <Icon svg={ExternalArrow} /></a>,
            fallback: "You haven't issued any Credentials, so there's nothing here.",
            buttons: [
                {
                    label: "Suspend",
                    className: "secondary-button",
                    onClick: () => console.log('edited', "all")
                },
                {
                    label: "Revoke",
                    className: "danger-button",
                    onClick: (item) => console.log('archived', "all", item)
                }
            ]
        },
        suspended: {
            id: "suspended",
            title: "Suspended",
            listItems: [],
            fallback: "You haven't suspended any Credentials yet, so there's nothing here.",
            buttons: [
                {
                    label: "Reinstate",
                    className: "secondary-button",
                    onClick: () => console.log('reinstated ', "reinstate")
                },
            ]
        },
        revoked: {
            id: "revoked",
            title: "Revoked",
            listItems: [],
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
    const data = Object.entries(credentialSubject).map(entry => {
        return (
            <div class="entry-row">
                <div class="key-entry">{entry[0]}</div>
                <div class="value-entry"><code>{JSON.stringify(entry[1], null, 2)}</code></div>
            </div>
        )
    });
    return (
        <pre>
            <code class="entry-container">
                <div class="entry-row entry-row-header">
                    <div class="key-entry">Label</div>
                    <div class="value-entry"><code>Value</code></div>
                </div>
                {data}
            </code>
        </pre>
    )
}

const transformCredentials = (credentials) => {
    return Object.values(credentials).map((vc: { credential }) => {
        const { credential } = vc;
        return {
            name: `****-${credential.id.slice(-4)}`,
            id: credential.credentialSubject.id,
            type: credential.issuanceDate,
            body: formatCredentialData(credential.credentialSubject)
        }
    })
}