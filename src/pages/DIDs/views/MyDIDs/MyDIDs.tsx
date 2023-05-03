import { Component } from "solid-js";
import Icon, { Plus } from "../../../../icons/Icon";
import "./MyDIDs.scss";
import Panel from "../../../../components/Panel/Panel";

const MyDIDs: Component = () => {
    return (
        <>
            {Object.keys(content).map(key => {
                content[key].action = <> <Icon svg={Plus} /> {content[key].action} </>   
                content[key].buttons = [
                    {
                        label: "Edit",
                        className: "secondary-button",
                        onclick: () => console.log('edited', key)
                    },
                    {
                        label: "Delete",
                        className: "danger-button",
                        onclick: (item) => console.log('deleted', key, item)
                    }
                ];
                return <Panel content={content[key]} />
            })}
        </>
    )
}

export default MyDIDs;

const didKeys = [
    {
        name: "Primary",
        id: "did:key:1234567890zxcvbnmlkjhgfdsqwertyuio1234567890",
    },
    {
        name: "Test",
        id: "did:key:lkjhgfdsdfghjiuytrtyu89876543ertyujjhgfghjlk",
    },
    {
        name: "Test1",
        id: "did:key:zxcvbn23456789xcvbnm987654xcvbnkjhgfdghjmhjj",
    }
]

const didWebs = [
    {
        name: "Example.com",
        id: "did:web:example.com",
        tag: "Unverified"
    },
    {
        name: "TBD",
        id: "did:web:tbd.website",
        tag: "Verified"
    },
    {
        name: "My Site",
        id: "did:web:mysite.com",
        tag: "Pending"
    }
]
const didIons = [
    {
        name: "Main",
        id: "did:ion:1234567890poiuytrewqlkjhgfdsa",
    },
    {
        name: "Test2",
        id: "did:ion:zaq123esdxcde34rfvgtr56ygbnhy",
    }
]

const content = {
    key: {
        id: "key",
        title: "Key DIDs",
        description: "Manage all of your Key-based DIDs.",
        action: `New Key DID`,
        listItems: didKeys,
        footer: <a href="" target="_blank">Learn about Key DIDs</a>
    },
    web: {
        id: "web",
        title: "Web DIDs",
        description: "Manage all of your Web-based DIDs.",
        action: "New Web DID",
        listItems: didWebs,
        footer: <a href="" target="_blank">Learn about Web DIDs</a>
    },
    ion: {
        id: "ion",
        title: "ION DIDs",
        description: "Manage all of your ION-based DIDs.",
        action: "New ION DID",
        listItems: didIons,
        footer: <a href="" target="_blank">Learn about ION DIDs</a>
    },
}

