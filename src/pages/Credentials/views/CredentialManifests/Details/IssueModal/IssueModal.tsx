import { Component, JSX, createSignal, onCleanup } from "solid-js";
import "./IssueModal.scss";
import Icon, { ArrowUpDown, Beaker, DangerAlert, XCross } from "../../../../../../icons/Icon";
import { formatTextAreaOnKeyDown, handleRequest, insertSampleInput, updateFormOnInput } from "../../../../../../utils/helpers";
import { credentialInputJson } from "./samples/mock";
import SSI from "../../../../../../utils/service";
import { store } from "../../../../../../utils/store";
import { hydrateCredentialsStore } from "../../../../../../utils/setup";



const IssueModal: Component<{ content }> = (props) => {
    //pass in these props

    const schemaProperties = JSON.stringify(getSchemaForSubject(props.content.schemaId), null, 2);

    let initialFormValues = { 
        properties: schemaProperties,
        expires: null, 
        suspendable: null, 
        revocable: null,
        expiry: '',
        issuer: Object.keys(store.user)[0],
        subject: ''
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
            "@context": "https://www.w3.org/2018/credentials/v1",
            "data": JSON.parse(formValues().properties),
            "issuer": store.user[formValues().issuer]["did"],
            "issuerKid": store.user[formValues().issuer]["kid"],
            "schemaId": props.content.schemaId,
            "subject": formValues().subject,
            ...formValues().expiry && { "expiry": new Date(formValues().expiry).toISOString() },
            ...formValues().revocable && { "revocable": formValues().revocable },
            ...formValues().suspendable && { "suspendable": formValues().suspendable }
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
        const isExpiryValid = formValues().expires ? formValues().expiry !== '' : true;
        const isSubjectValid = formValues().subject !== '';
        const isSubjectDataValid = formValues().properties.trim() !== '' && formValues().properties.trim() !== schemaProperties
        return isExpiryValid && isSubjectValid && isSubjectDataValid && !isError();
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
                                    <input type="text" 
                                        id="subject" 
                                        name="subject"
                                        placeholder="did:xxx:xxxxxx" 
                                        class="input-container"
                                        value={formValues().subject} 
                                        onInput={handleInput}
                                        spellcheck={false}
                                        required
                                        autocomplete="off" />
                                </div>
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
                                            rows={8}
                                            required
                                        />
                                    </div>
                                </div>

                                <div class="field-container checkbox-container">
                                    <input id="revocable" 
                                        name="revocable"
                                        checked={formValues().revocable}
                                        onInput={handleInput}
                                        type="checkbox"
                                        class="checkbox-container"
                                        disabled={formValues().suspendable} />
                                    <label for="revocable">Revocable?</label>
                                </div>
                                <div class="field-container checkbox-container">
                                    <input id="suspendable" 
                                        name="suspendable"
                                        checked={formValues().suspendable}
                                        onInput={handleInput}
                                        type="checkbox"
                                        class="checkbox-container" 
                                        disabled={formValues().revocable} />
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
                                    <label for="expiry">Expiry date</label>
                                    <input id="expiry"
                                        name="expiry"
                                        value={formValues().expiry}
                                        onInput={handleInput} 
                                        type="datetime-local"
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
                                            {Object.values(store.user) && Object.values(store.user).map(issuer => 
                                                <option value={issuer["did"]}>{issuer["did"]}</option>
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
                                    🎉 Successfully issued credential
                                </div>
                                <div class="button-row"> 
                                    <button class="secondary-button" type="button" onClick={() => { closeModal(); hydrateCredentialsStore(formValues().issuer) }}>
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

const getSchemaForSubject = (schemaId) => {
    const { schema } = store.schemas.find(({schema}) => schema.id === schemaId);
    const { $id, $schema, description, ...properties } = schema.schema;
    return properties;
}