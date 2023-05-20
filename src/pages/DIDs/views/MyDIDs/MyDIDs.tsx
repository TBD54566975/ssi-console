import { Component } from "solid-js";
import Icon, { ExternalArrow, Plus, XCross } from "../../../../icons/Icon";
import "./MyDIDs.scss";
import Panel from "../../../../components/Panel/Panel";
import Modal from "./Modal/Modal";
import { store } from "../../../../utils/store";

const MyDIDs: Component = () => {
    console.log(getDIDMethodFromID("did:key:123456"))
    const content = {
        all: {
            id: "all",
            title: "All DIDs",
            listItems: transformDIDs(store.user),
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

const transformDIDs = (userDIDs) => {
    return Object.values(userDIDs).map((userDID: { did, kid, metadata }) => {
        return {
            name: `****-${userDID.did.slice(-4)}`,
            id: userDID.did,
            type: getDIDMethodFromID(userDID.did)
        }
    })
}

const getDIDMethodFromID = (did) => {
    const regex = /:(\w+):/;
    const match = regex.exec(did);
    if (match && match.length >= 2) {
      return match[1];
    }
    return null;
}

