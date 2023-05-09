import { Component } from "solid-js";
import "./IssuedCredentials.scss";
import Panel from "../../../../components/Panel/Panel";
import Modal from "../../../../components/Modal/Modal";
import Icon, { ExternalArrow, Plus } from "../../../../icons/Icon";

const IssuedCredentials: Component = () => {
    const content = {
        all: {
            id: "all",
            title: "All Issued",
            listItems: credentials,
            footer: <a href="" target="_blank">Learn about Credentials <Icon svg={ExternalArrow} /></a>,
            fallback: "You haven't issued any Credentials, so there's nothing here.",
            action: <Modal content={{
                    button: { 
                        label: <> <Icon svg={Plus} /> Add New </>,
                        className: "primary-button" 
                    },
                }}/>,
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
                // {
                //     label: "Unarchive",
                //     className: "secondary-button",
                //     onClick: () => console.log('unarchived ', "archived")
                // },
            ]
        },
        revoked: {
            id: "revoked",
            title: "Revoked",
            listItems: [],
            fallback: "You haven't revoked any Credentials yet, so there's nothing here.",
            buttons: [
                // {
                //     label: "Unarchive",
                //     className: "secondary-button",
                //     onClick: () => console.log('unarchived ', "archived")
                // },
            ]
        },
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

const credentials = [
    {
        name: "xxxx-0cce",
        id: "did:key:z6MkfLvEXvtr4MXEicc7u8jyFo9nDuZ59cwj8hqf9r4oSrDk",
        type: "2023-05-05",
        body: <pre><code>{`"credentialSubject": {
            "firstName": "Test",
            "id": "did:key:z6MkfLvEXvtr4MXEicc7u8jyFo9nDuZ59cwj8hqf9r4oSrDk",
            "lastName": "Subject"
        }`}</code></pre>
    },
    {
        name: "xxxx-mhjj",
        id: "did:key:z6MkfLvEXvtr4MXEicc7u8jyFo9nDuZ59cwj8hqf9r4oSrDk",
        type: "2023-05-05",
    }
]