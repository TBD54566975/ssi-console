import { Component, createSignal, onCleanup } from "solid-js";
import "./Modal.scss";
import Icon, { ArrowUpDown, Beaker, DangerAlert, XCross } from "../../../../../icons/Icon";
import { formatTextAreaOnKeyDown, handleRequest, insertSampleInput, updateFormOnInput } from "../../../../../utils/helpers";
import SSI, { DIDMethods } from "../../../../../utils/service";
import { hydrateDIDStore } from "../../../../../utils/setup";

const Modal: Component<{ content }> = (props) => {
    let options: DIDMethods[] = [
        "ion",
        "web",
        "key"
    ];
    const didInput = {
        "keyType": "Ed25519"
    }
    let initialFormValues: { json, didType: DIDMethods } = { json: '', didType: options[0] }

    // the component
    const [formValues, setFormValues] = createSignal(initialFormValues);
    const [isLoading, setIsLoading] = createSignal(false);
    const [isSuccess, setIsSuccess] = createSignal(false);
    const [isError, setIsError] = createSignal(false);

    const resetForm = () => {
        setFormValues(initialFormValues);
        setIsLoading(false);
        setIsSuccess(false);
        setIsError(false);
    }

    //dialog magic
    let dialog;
    const showModal = () => {
        dialog.showModal();
        document.body.classList.add('no-scroll');
        dialog.addEventListener('close', () => {
            document.body.classList.remove('no-scroll');
            resetForm();
        });
    }
    
    const closeModal = () => {
        return dialog.close();
    }

    //actual form calls
    const handleSubmit = async (event) => {
        const request = SSI.putDID(formValues().didType, JSON.parse(formValues().json));
        const setters = { setIsLoading, setIsSuccess, setIsError };
        handleRequest(event, request, setters);
    };

    const handleInput = (event) => {
        updateFormOnInput(event, { setIsError, setFormValues })
    };

    const handleKeyDown = (event) => {
        formatTextAreaOnKeyDown(event, { setFormValues });
    }

    const isFormValid = () => {
        // TODO - add better form validation
        return formValues().json.trim() !== "" && !isError();
    }

    //populate textarea field with sample input
    const populateSampleInput = (event) => {
        if (formValues().didType === "web") {
            didInput["options"]  = {
                "didWebID": "did:web:example.com"
            }
        } else if (formValues().didType === "ion") {
            didInput["options"]  = {
                "serviceEndpoints": []
            }
        } else {
            delete didInput["options"]
        }

        const setters = { setIsError, setFormValues };
        insertSampleInput(event, setters, 'json', didInput);
    }



    return (
        <div>
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
                    <h2>Create a DID</h2>
                    <form onSubmit={handleSubmit}>
                        {!isLoading() && !isSuccess() && (
                            <>
                                {isError() && 
                                    <div class="banner banner-danger">
                                        <Icon svg={DangerAlert} />
                                        Error creating DID. Try again
                                    </div> 
                                }
                                <div class="field-container">
                                    <label for="didType">DID Type</label>
                                    <div class="select-container">
                                        <select 
                                            id="didType" 
                                            name="didType" 
                                            value={formValues().didType} 
                                            onInput={handleInput}
                                            required
                                        >
                                            {options && options.map(option => 
                                                <option value={option}>{option[0].toUpperCase() + option.substring(1)}</option>
                                            )}
                                        </select>
                                        <Icon svg={ArrowUpDown} />
                                    </div>
                                </div>
                                <div class="field-container">
                                    <label for="json">JSON</label>
                                    <div class="textarea-container">
                                        <textarea 
                                            id="json" 
                                            name="json" 
                                            value={formValues().json} 
                                            onInput={handleInput}
                                            onkeydown={handleKeyDown}
                                            spellcheck={false}
                                            autocomplete="off"
                                            rows={3}
                                            required
                                        />
                                        <button class="tiny-ghost-button" type="button" onclick={populateSampleInput}>
                                            <Icon svg={Beaker} />
                                            Try sample input
                                        </button>
                                    </div>
                                </div>
                                <div class="button-row">
                                    <button class="secondary-button" type="button" onClick={() => dialog.close()}>
                                        Cancel
                                    </button>
                                    <button class="primary-button" type="submit" disabled={!isFormValid()}>
                                        Submit
                                    </button>
                                </div>
                            </>
                        )}

                        {isLoading() && <div>Loading...</div>}
                        
                        {isSuccess() && (
                            <>
                                <div class="banner banner-success">
                                    🎉 Successfully created
                                </div>
                                <div class="button-row"> 
                                    <button class="secondary-button" type="button" onClick={() => { closeModal(); hydrateDIDStore() }}>
                                        Done
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default Modal;