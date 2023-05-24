import { Component, JSX, createSignal, onCleanup } from "solid-js";
import "./IssueModal.scss";
import Icon, { ArrowUpDown, Beaker, DangerAlert, XCross } from "../../../../../../icons/Icon";
import { formatTextAreaOnKeyDown, handleRequest, insertSampleInput, updateFormOnInput } from "../../../../../../utils/helpers";
import { credentialInputJson } from "./samples/mock";
import SSI from "../../../../../../utils/service";

const IssueModal: Component<{ content }> = (props) => {
    //pass in these props

    let initialFormValues = { properties: '', expires: null, status: null, expiry: '' }

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
        const data = {
            "@context": [
                "https://www.w3.org/2018/credentials/v1"
            ],
            "data": formValues().properties,
            "expiry": formValues().expiry,
            "issuer": "did:key:z6MkiTBz1ymuepAQ4HEHYSF1H8quG5GLVVQR3djdX3mDooWp",
            "issuerKid": "#z6MkiTBz1ymuepAQ4HEHYSF1H8quG5GLVVQR3djdX3mDooWp",
            "revocable": formValues().status,
            "schemaId": "string",
            "subject": "did:key:z6MkiTBz1ymuepAQ4HEHYSF1H8quG5GLVVQR3djdX3mDooWp",
            "suspendable": formValues().status
        }
        const request = SSI.putCredential(data);
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
        return formValues().properties.trim() !== '' && !isError();
    }

    //populate textarea field with sample input
    const populateSampleInput = (event) => {
        const setters = { setIsError, setFormValues };
        insertSampleInput(event, setters, 'json', credentialInputJson);
    }

    return (
        <>
            <button class={props.content.button.className} onclick={showModal}>
                {props.content.button.label}
            </button>
            <dialog class="dialog" ref={dialog}>
                <div class="dialog-header">
                    <button title="Close dialog" onClick={closeModal}>
                        <Icon svg={XCross} />
                    </button>
                </div>

                <div class="dialog-body">
                    <h2>Issue Verifiable Credential</h2>
                    <form onSubmit={handleSubmit}>
                        {!isLoading() && !isSuccess() && (
                            <>
                                {isError() && 
                                    <div class="banner banner-danger">
                                        <Icon svg={DangerAlert} />
                                        Error issuing credential. Try again
                                    </div> 
                                }
                                <div class="field-container">
                                    <label for="properties">Subject data</label>
                                    <div class="textarea-container">
                                        <textarea 
                                            id="properties" 
                                            name="properties" 
                                            value={formValues().properties} 
                                            onInput={handleInput}
                                            onkeydown={handleKeyDown}
                                            spellcheck={false}
                                            autocomplete="off"
                                            rows={3}
                                            required
                                        />
                                        <button class="tiny-ghost-button" onclick={populateSampleInput}>
                                            <Icon svg={Beaker} />
                                            Try sample input
                                        </button>
                                    </div>
                                </div>
                                <div class="field-container checkbox-container">
                                    <input id="status" 
                                        name="status"
                                        checked={formValues().status}
                                        onInput={handleInput}
                                        type="checkbox"
                                        class="checkbox-container" />
                                    <label for="revocable">Allow status changes?</label>
                                </div>
                                <div class="field-container checkbox-container">
                                    <input id="expires"
                                        name="expires"
                                        checked={formValues().expires}
                                        onInput={handleInput}
                                        type="checkbox"
                                        class="checkbox-container" />
                                    <label for="expires">Expires?</label>
                                </div>
                                {formValues().expires && <div class="field-container">
                                    <label for="expiry">Expiry</label>
                                    <input id="expiry"
                                        name="expiry"
                                        value={formValues().expiry}
                                        onInput={handleInput} 
                                        type="datetime-local"
                                        class="input-container" />
                                </div>}
                                {/* {renderFormFromJSON(manifestInput.outputDescriptors[0], { setFormValues })} */}
                                <div class="button-row">
                                    <button class="secondary-button" onClick={() => dialog.close()}>
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
                                    🎉 Success - Credential ID 12345-134546-1232456
                                </div>
                                <div class="button-row"> 
                                    <button class="secondary-button" onClick={closeModal}>
                                        Done
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default IssueModal;