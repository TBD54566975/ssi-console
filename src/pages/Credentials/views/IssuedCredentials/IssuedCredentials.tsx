import { Component } from "solid-js";
import "./IssuedCredentials.scss";
import Panel from "../../../../components/Panel/Panel";
import Modal from "../../../DIDs/views/MyDIDs/Modal/Modal";
import Icon, { ExternalArrow, Plus } from "../../../../icons/Icon";

const IssuedCredentials: Component = () => {
    const content = {
        active: {
            id: "active",
            title: "Active",
            listItems: credentials,
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

const credentialSubject = {
    "firstName": "Test",
    "id": "did:key:z6MkfLvEXvtr4MXEicc7u8jyFo9nDuZ59cwj8hqf9r4oSrDk",
    "lastName": "Subject"
}

const formattedCred = Object.entries(credentialSubject).map(entry => {
    return (
        <div class="entry-row">
            <div class="key-entry">{entry[0]}</div>
            <div class="value-entry"><code>{JSON.stringify(entry[1], null, 2)}</code></div>
        </div>
    )
});

const credentials = [
    {
        name: "xxxx-0cce",
        id: "did:key:z6MkfLvEXvtr4MXEicc7u8jyFo9nDuZ59cwj8hqf9r4oSrDk",
        type: "2023-05-05",
        body: <pre>
                <code class="entry-container">
                    <div class="entry-row entry-row-header">
                        <div class="key-entry">Label</div>
                        <div class="value-entry"><code>Value</code></div>
                    </div>
                    {formattedCred}
                </code>
            </pre>
    },
    {
        name: "xxxx-mhjj",
        id: "did:key:z6MkfLvEXvtr4MXEicc7u8jyFo9nDuZ59cwj8hqf9r4oSrDk",
        type: "2023-05-05",
    }
]

