import { Component, For, createEffect, createSignal } from "solid-js";
import Icon, { ExternalArrow, Plus, XCross } from "../../../../icons/Icon";
import "./MyDIDs.scss";
import Panel from "../../../../components/Panel/Panel";
import Modal from "./Modal/Modal";
import { store } from "../../../../utils/store";
import { dids } from "./samples/mocks";
import { deleteDIDFromStore } from "../../../../utils/setup";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";

const MyDIDs: Component = () => {
    let confirmDialog;
    const [ item, setItem ] = createSignal();
    const [ content, setContent ] = createSignal([]);
    
    const confirmDelete = async (item) => {
        await deleteDIDFromStore(item.type, item.id);
        confirmDialog.close();
    }

    createEffect(() => {
        const storeDIDs = store.user;
        setContent(Object.values({
            all: {
                id: "all",
                title: "All DIDs",
                listItems: transformDIDs(storeDIDs),
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
                        label: "Archive",
                        className: "danger-button",
                        disabled: Object.values(storeDIDs).length < 2,
                        onClick: (item) => { setItem(item); confirmDialog.showModal()}
                    }
                ]
            },
            archived: {
                id: "archived",
                title: "Archived",
                listItems: [],
                fallback: "You haven't archived any DIDs yet, so there's nothing here.",
            },
        }))
    })

    
    return (
        <>
            {Object.values(content()).map(content => 
                <Panel content={content} />
            )}
            <ConfirmationModal 
                ref={confirmDialog}
                onCancel={() => confirmDialog.close()}
                onConfirm={() => confirmDelete(item())}
                message={"Are you sure you want to delete this DID? This action is irreversible."}
                cancelMessage={"No, cancel"}
                confirmMessage={"Yes, delete"}
                />
        </>
    )
}

export default MyDIDs;

const transformDIDs = (userDIDs) => {
    return Object.values(userDIDs).map((userDID: { did, kid }) => {
        return {
            name: `****-${userDID.did.slice(-4)}`,
            id: userDID.did,
            type: getDIDMethodFromID(userDID.did),
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

