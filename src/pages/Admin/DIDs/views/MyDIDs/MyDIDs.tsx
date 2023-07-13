import { Component, createEffect, createSignal } from "solid-js";
import Icon, { ExternalArrow, Plus } from "@/icons/Icon";
import "./MyDIDs.scss";
import Panel from "@/components/Panel/Panel";
import Modal from "./Modal/Modal";
import { store } from "@/utils/store";
import { deleteDIDFromStore } from "@/utils/setup";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";

const MyDIDs: Component = () => {
    const [ item, setItem ] = createSignal();
    const [ dids, setDIDs ] = createSignal(transformDIDs(store.user));
    const [ deletedDids, setDeletedDIDs ] = createSignal(transformDIDs(store.deletedDIDs));
    
    let confirmDialog;
    const confirmDelete = async (item) => {
        await deleteDIDFromStore(item.type, item.id);
        confirmDialog.close();
    }

    createEffect(() => {
        const storeDIDs = store.user;
        setDIDs(transformDIDs(storeDIDs));
    })

    createEffect(() => {
        const storeDeletedDIDs = store.deletedDIDs;
        setDeletedDIDs(transformDIDs(storeDeletedDIDs));
    })

    const content = () => {
        return {
            all: {
                id: "all",
                title: "All DIDs",
                listItems: dids(),
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
                        label: "Download DID Document",
                        className: "secondary-button",
                        onClick: (item) => { 
                            const blob = new Blob([JSON.stringify(store.user[item.id].doc, null, 4)], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            
                            const anchor = document.createElement('a');
                            anchor.setAttribute('hidden', 'true');
                            anchor.setAttribute('download', 'did.json');
                            anchor.setAttribute('href', url);
                            anchor.click();
                        }
                    },
                    {
                        label: "Archive",
                        className: "danger-button",
                        disabled: dids().length < 2,
                        onClick: (item) => { setItem(item); confirmDialog.showModal()}
                    }
                ]
            },
            archived: {
                id: "archived",
                title: "Archived",
                listItems: deletedDids(),
                fallback: "You haven't archived any DIDs yet, so there's nothing here.",
            },
        }}

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
    if (typeof userDIDs === "object") {
        userDIDs = Object.values(userDIDs);
    }
    return userDIDs.map((userDID: { did, kid, id, doc }) => {
        const didId = userDID.did || userDID.id;
        return {
            type: getDIDMethodFromDID(didId),
            id: didId
        }
    })
}

const getDIDMethodFromDID = (did) => {
    const regex = /:(\w+):/;
    const match = regex.exec(did);
    if (match && match.length >= 2) {
      return match[1];
    }
    return null;
}

