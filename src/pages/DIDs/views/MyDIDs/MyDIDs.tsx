import { Component, For, createEffect, createSignal } from "solid-js";
import Icon, { ExternalArrow, Plus, XCross } from "../../../../icons/Icon";
import "./MyDIDs.scss";
import Panel from "../../../../components/Panel/Panel";
import Modal from "./Modal/Modal";
import { store } from "../../../../utils/store";
import { dids } from "./samples/mocks";
import { deleteDIDFromStore } from "../../../../utils/setup";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";
import SSI from "../../../../utils/service";

const MyDIDs: Component = () => {
    let confirmDialog;
    const [ item, setItem ] = createSignal();
    const [ dids, setDIDs ] = createSignal(transformDIDs(store.user));
    const [ deletedDids, setDeletedDIDs ] = createSignal(transformDIDs(store.deletedDIDs));
    
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
    return userDIDs.map((userDID: { did, kid, id }) => {
        const didId = userDID.did || userDID.id;
        return {
            name: `****-${didId?.slice(-4)}`,
            id: didId,
            type: getDIDMethodFromID(didId),
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

