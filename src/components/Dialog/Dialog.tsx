import Icon, { XCross } from "@/icons/Icon";
import { Component, createEffect } from "solid-js";
import "./Dialog.scss";

const Dialog: Component<{content, afterCloseModal, handleSubmit, children}> = (props) => {
    let dialog;

    const showModal = () => {
        dialog.showModal();
        document.body.classList.add('no-scroll');
        dialog.addEventListener('close', () => {
            document.body.classList.remove('no-scroll');
            props.afterCloseModal();
        });
    }

    const closeModal = () => {
        return dialog.close();
    }

    return (
        <div class="dialog-component">
            <button class={props.content.button.className} disabled={props.content.button.disabled} onclick={showModal}>
                {props.content.button.label}
            </button>
            <dialog class="dialog" ref={dialog}>
                <div class="dialog-header">
                    <button title="Close dialog" onClick={closeModal}>
                        <Icon svg={XCross} />
                    </button>
                </div>
                <div class="dialog-body">
                    <form onSubmit={props.handleSubmit}>
                        <div class="dialog-heading">
                            <h2>{props.content.heading.h2}</h2>
                            {props.content.heading.p && <p>{props.content.heading.p}</p>}
                        </div>
                        {props.children}
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default Dialog;