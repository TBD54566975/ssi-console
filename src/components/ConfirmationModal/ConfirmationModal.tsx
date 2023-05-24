import { Component } from "solid-js";
import "./ConfirmationModal.scss";

const ConfirmationModal: Component<{ ref, onCancel, onConfirm, message, cancelMessage, confirmMessage }> = (props) => {
    return (
        <dialog class="confirmation-modal" ref={props.ref}>
            <p>{props.message}</p>
            <div class="button-row">
                <button class="secondary-button" onclick={props.onCancel}>{props.cancelMessage}</button>
                <button class="danger-button" onclick={props.onConfirm}>{props.confirmMessage}</button>
            </div>
        </dialog>
    )
}

export default ConfirmationModal;