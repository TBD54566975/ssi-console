import { Component, JSX, createSignal, onCleanup } from "solid-js";
import "./IssueModal.scss";
import Icon, { ArrowUpDown, Beaker, DangerAlert, XCross } from "../../../../../../icons/Icon";
import { formatTextAreaOnKeyDown, insertSampleInput, renderFormFromJSON, submitForm, updateFormOnInput } from "../../../../../../utils/helpers";
import { credentialInput } from "./samples/mock";

const IssueModal: Component<{ content }> = (props) => {
    //pass in these props
    let endpoint = '/v1/credentials';
    let method = 'POST';

    let initialFormValues = { 
        "@context": '',
        data: '',
        issuer: 'did:key:123',
        expiry: '',
        revocable: null,
        subject: '',
        suspendable: null,
        expires: null,
        useDefaultContext: true
    }

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


    // this is transforming our stuff to something the service will accept
    const transformValues = () => {
        const { expires, useDefaultContext, data, ...values } = formValues();
        return {
            ...values,
            data: JSON.parse(data),
            issuerKid: formValues().issuer.slice(8),
            schemaId: "schemaId passed here from GET call to cred",
        }
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
        const request = { endpoint, method, body: JSON.stringify(formValues()) };
        const setters = { setIsLoading, setIsSuccess, setIsError };
        submitForm(event, setters, request);
    };

    const handleInput = (event) => {
        updateFormOnInput(event, { setIsError, setFormValues })
    };

    const handleKeyDown = (event) => {
        formatTextAreaOnKeyDown(event, { setFormValues });
    }

    const isFormValid = () => {
        if (isError()) return false;
        if (!formValues().data.trim()) return false;
        if (!formValues().subject.trim()) return false;
        if (formValues().expires && !formValues().expiry.trim()) return false;
        return true;
    }

    //populate textarea field with sample input
    const populateSampleInput = (event) => {
        const setters = { setIsError, setFormValues };
        insertSampleInput(event, setters, 'json', credentialInput);
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
                                    <label for="subject">Subject DID</label>
                                    <input id="subject" 
                                        type="text" 
                                        placeholder="did:xxx:xxxx" 
                                        class="input-container" />
                                </div>
                                <div class="field-container">
                                    <label for="data">Subject data</label>
                                    <div class="textarea-container">
                                        <textarea 
                                            id="data" 
                                            name="data" 
                                            value={formValues().data} 
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
                                    <input id="revocable" 
                                        checked={formValues().revocable}
                                        type="checkbox"
                                        class="checkbox-container" />
                                    <label for="revocable">Revocable?</label>
                                </div>
                                <div class="field-container checkbox-container">
                                    <input id="suspendable" 
                                        checked={formValues().suspendable}
                                        type="checkbox"
                                        class="checkbox-container" />
                                    <label for="suspendable">Suspendable?</label>
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
                                        type="datetime-local"
                                        class="input-container" />
                                </div>}
                                <div class="field-container checkbox-container">
                                    <input id="useDefaultContext"
                                        name="useDefaultContext"
                                        checked={formValues().useDefaultContext}
                                        onInput={handleInput}
                                        type="checkbox"
                                        class="checkbox-container" />
                                    <label for="useDefaultContext">Use default context?</label>
                                </div>
                                {!formValues().useDefaultContext && <div class="field-container">
                                    <label for="context">@context</label>
                                    <input id="context" 
                                        type="text" 
                                        placeholder="@context" 
                                        class="input-container" />
                                </div>}
                                <div class="field-container">
                                    <label for="issuer">Issuer</label>
                                    <div class="select-container">
                                        <select 
                                            id="issuer" 
                                            name="issuer" 
                                            value={formValues().issuer} 
                                            onInput={handleInput}
                                            required
                                        >
                                            {['did:key:123','did:key:234'].map(option => 
                                                <option value={option.toLowerCase()}>{option}</option>
                                            )}
                                        </select>
                                        <Icon svg={ArrowUpDown} />
                                    </div>
                                </div>
                                {/* {renderFormFromJSON(manifestInput.outputDescriptors[0], { setFormValues })} */}
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
                                    🎉 Success - Verifiable Credential ID is 45627913-131231-13213-132
                                </div>
                                <div class="button-row"> 
                                    <button class="secondary-button" type="button" onClick={closeModal}>
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