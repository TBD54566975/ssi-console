import { Component } from "solid-js";
import Icon, { ExternalArrow, Plus, XCross } from "../../../../icons/Icon";
import "./MyDIDs.scss";
import Panel from "../../../../components/Panel/Panel";
import Modal from "../../../../components/Modal/Modal";

const MyDIDs: Component = () => {
    const content = {
        all: {
            id: "all",
            title: "All DIDs",
            listItems: [
                ...didKeys, 
                ...didWebs, 
                ...didIons
            ],
            footer: <a href="" target="_blank">Learn about DIDs <Icon svg={ExternalArrow} /></a>,
            fallback: "You don't have any DIDs in use here. Try creating one.",
            action: <Modal content={{
                    button: { 
                        label: <> <Icon svg={Plus} /> Add New </>,
                        className: "primary-button" 
                    },
                }}/>,
            buttons: [
                {
                    label: "Edit",
                    className: "secondary-button",
                    onClick: () => console.log('edited', "all")
                },
                {
                    label: "Archive",
                    className: "danger-button",
                    onClick: (item) => console.log('archived', "all", item)
                }
            ]
        },
        archived: {
            id: "archived",
            title: "Archived",
            listItems: [],
            fallback: "You haven't archived any DIDs yet, so there's nothing here.",
            buttons: [
                {
                    label: "Unarchive",
                    className: "secondary-button",
                    onClick: () => console.log('unarchived ', "archived")
                },
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

export default MyDIDs;

const didKeys = [
    {
        name: "Primary",
        id: "did:key:1234567890zxcvbnmlkjhgfdsqwertyuio1234567890",
        type: "key"
    },
    {
        name: "Test",
        id: "did:key:lkjhgfdsdfghjiuytrtyu89876543ertyujjhgfghjlk",
        type: "key"
    },
    {
        name: "Test1",
        id: "did:key:zxcvbn23456789xcvbnm987654xcvbnkjhgfdghjmhjj",
        type: "key"
    }
]

const didWebs = [
    {
        name: "Example.com",
        id: "did:web:example.com",
        tag: {
            label: "Unverified",
            type: "danger"
        },
        type: "web"
    },
    {
        name: "TBD",
        id: "did:web:tbd.website",
        tag: {
            label: "Verified",
            type: "success"
        },
        type: "web"
    },
    {
        name: "My Site",
        id: "did:web:mysite.com",
        tag: {
            label: "Pending",
            type: "warn"
        },
        type: "web"
    }
]
const didIons = [
    {
        name: "Main",
        id: "did:ion:1234567890poiuytrewqlkjhgfdsa",
        type: "ion"
    },
    {
        name: "Test2",
        id: "did:ion:zaq123esdxcde34rfvgtr56ygbnhy",
        type: "ion"
    }
]

