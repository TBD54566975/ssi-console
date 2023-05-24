import { Component, JSX, Show, createSignal, onCleanup } from "solid-js";
import "./Modal.scss";
import Icon, { ArrowUpDown, Beaker, DangerAlert, XCross } from "../../../../../icons/Icon";
import { formatTextAreaOnKeyDown, handleRequest, insertSampleInput, renderFormFromJSON, updateFormOnInput, vcJWTFormat, vpJWTFormat } from "../../../../../utils/helpers";
import { inputDescriptorsInput, manifestInput, schemaInput } from "./samples/mock";
import SSI from "../../../../../utils/service";
import { store } from "../../../../../utils/store";
import { hydrateCredentialsStore, hydrateManifestStore } from "../../../../../utils/setup";

const Modal: Component<{ content }> = (props) => {
    let initialFormValues = { 
        inputDescriptors: '', 
        submissionRequirements: '',
        schema: '', 
        name: '', 
        description: '',
        issuerName: '',
        issuer: Object.keys(store.user)[0],
        includeSubmissionRequirements: null
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
        setStep(1);
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

    // Specific to verifiable credential modal
    const [ step, setStep ] = createSignal(1);

    const goToNextStep = () => {
        if (step() + 1 > 4) return;
        setStep(step() + 1);
    }

    const goToPrevStep = () => {
        if (step() - 1 < 1) return;
        setStep(step() - 1);
    }

    //actual form calls
    const handleSubmit = async (event) => {
        event.preventDefault();
        // first get schemaID
        const schemaPayload = {
            "author": store.user[formValues().issuer]["did"],
            "authorKid": store.user[formValues().issuer]["kid"],
            "name": formValues().name,
            "schema": JSON.parse(formValues().schema),
            "sign": true
        }
        const schemaResponse = await SSI.putSchema(schemaPayload);
        const { id: schemaId } = await schemaResponse.json();
        
        // then let's map the fields to the expected payload
        const credentialPayload = {
            "name": formValues().name,
            "description": formValues().description,
            "issuerDid": store.user[formValues().issuer]["did"],
            "issuerKid": store.user[formValues().issuer]["kid"],
            "issuerName": formValues().issuerName,
            "format": vcJWTFormat,
            "outputDescriptors": [
                {
                    "name": formValues().name,
                    "description": formValues().description,
                    "id": "0",
                    "schema": schemaId
                }
            ],
            ...formValues().inputDescriptors !== '' && {
                "presentationDefinition": {
                    "id": "0",
                    "name": `${formValues().name} Application Requirements`,
                    "purpose": `Some information is required in order to issue ${formValues().description}`,
                    "input_descriptors": JSON.parse(formValues().inputDescriptors),
                    ...formValues().submissionRequirements !== '' &&  { "submission_requirements": JSON.parse(formValues().submissionRequirements) }
                }
            }
        }

        // in future we prob also want a step for styles and issuance template, but backlog for now
        const request = SSI.putManifest(credentialPayload);
        const setters = { setIsLoading, setIsSuccess, setIsError };
        const res = handleRequest(event, request, setters);
    };

    const handleInput = (event) => {
        updateFormOnInput(event, { setIsError, setFormValues })
    };

    const handleKeyDown = (event) => {
        formatTextAreaOnKeyDown(event, { setFormValues });
    }

    const isFormValid = () => {
        let isComplete;
        if (step() === 1) isComplete = formValues().name.trim() !== '' && formValues().description.trim() !== ''
        if (step() === 2) isComplete = formValues().schema.trim() !== ''
        if (step() === 3) isComplete = true;
        if (step() === 4) isComplete = formValues().issuerName.trim() !== ''
        return isComplete && !isError();
    }

    //populate textarea field with sample input
    const populateSampleInput = (event) => {
        const setters = { setIsError, setFormValues };;
        let fieldToSet;
        let sampleInput: typeof schemaInput.schema | typeof inputDescriptorsInput;
        if (step() === 2) {
            fieldToSet = 'schema';
            sampleInput = schemaInput.schema;
        }
        if (step() === 3) {
            fieldToSet = 'inputDescriptors';
            sampleInput = inputDescriptorsInput;
        }
        insertSampleInput(event, setters, fieldToSet, sampleInput);
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
                    <h2>New Verifiable Credential Template</h2>
                    <form onSubmit={handleSubmit}>
                        {!isLoading() && !isSuccess() && (
                            <>
                                {isError() && 
                                    <div class="banner banner-danger">
                                        <Icon svg={DangerAlert} />
                                        Error creating credential. Try again
                                    </div> 
                                }

                                <Show when={step() === 1}>
                                    <div class="field-container">
                                        <label for="name">Name</label>
                                        <input type="text" 
                                            id="name" 
                                            name="name"
                                            placeholder="Employment Credential" 
                                            class="input-container"
                                            value={formValues().name} 
                                            onInput={handleInput}
                                            spellcheck={false}
                                            required />
                                    </div>
                                    <div class="field-container">
                                        <label for="description">Description</label>
                                        <input type="text" 
                                            id="description" 
                                            name="description"
                                            placeholder="Proof of employment" 
                                            class="input-container"
                                            value={formValues().description} 
                                            onInput={handleInput}
                                            spellcheck={false}
                                            required />
                                    </div>
                                    <div class="button-row">
                                        <button class="secondary-button" type="button" onClick={() => dialog.close()}>
                                            Cancel
                                        </button>
                                        <button class="primary-button" type="button" disabled={!isFormValid()} onClick={goToNextStep}>
                                            Next
                                        </button>
                                    </div>
                                </Show>

                                <Show when={step() === 2}>
                                    <div class="field-container">
                                        <label for="schema">Fields and types</label>
                                        <div class="textarea-container">
                                            <textarea 
                                                id="schema" 
                                                name="schema" 
                                                value={formValues().schema} 
                                                onInput={handleInput}
                                                onkeydown={handleKeyDown}
                                                spellcheck={false}
                                                autocomplete="off"
                                                rows={3}
                                                required />
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
                                        <button class="secondary-button" type="button" onClick={goToPrevStep}>
                                            Back
                                        </button>
                                        <button class="primary-button" type="button" disabled={!isFormValid()} onClick={goToNextStep}>
                                            Next
                                        </button>
                                    </div>
                                </Show>

                                <Show when={step() === 3}>
                                    <div class="field-container">
                                        <label for="inputDescriptors">Requirements</label>
                                        <div class="textarea-container">
                                            <textarea 
                                                id="inputDescriptors" 
                                                name="inputDescriptors" 
                                                value={formValues().inputDescriptors} 
                                                onInput={handleInput}
                                                onkeydown={handleKeyDown}
                                                spellcheck={false}
                                                autocomplete="off"
                                                rows={3}
                                                required />
                                            <button class="tiny-ghost-button" type="button" onclick={populateSampleInput}>
                                                <Icon svg={Beaker} />
                                                Try sample input
                                            </button>
                                        </div>
                                    </div>

                                    <div class="field-container checkbox-container">
                                        <input id="includeSubmissionRequirements" 
                                            name="includeSubmissionRequirements"
                                            checked={formValues().includeSubmissionRequirements}
                                            onInput={handleInput}
                                            type="checkbox"
                                            class="checkbox-container" />
                                        <label for="includeSubmissionRequirements">Include submission requirements?</label>
                                    </div>

                                    {formValues().includeSubmissionRequirements && (
                                        <div class="field-container">
                                            <label for="submission_requirements">Rules</label>
                                            <div class="textarea-container">
                                                <textarea 
                                                    id="submissionRequirements" 
                                                    name="submissionRequirements" 
                                                    value={formValues().submissionRequirements} 
                                                    onInput={handleInput}
                                                    onkeydown={handleKeyDown}
                                                    spellcheck={false}
                                                    autocomplete="off"
                                                    rows={3}
                                                    required />
                                            </div>
                                        </div>
                                    )}
                                
                                    <div class="button-row">
                                        <button class="secondary-button" type="button" onClick={() => dialog.close()}>
                                            Cancel
                                        </button>
                                        <button class="secondary-button" type="button" onClick={goToPrevStep}>
                                            Back
                                        </button>
                                        <button class="primary-button" type="button" disabled={!isFormValid()} onClick={goToNextStep}>
                                            Next
                                        </button>
                                    </div>
                                </Show>

                                <Show when={step() === 4} >
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
                                    <div class="field-container">
                                        <label for="issuerName">Issuer Name</label>
                                        <input type="text" 
                                            id="issuerName" 
                                            name="issuerName"
                                            placeholder="ACME Inc." 
                                            class="input-container"
                                            value={formValues().issuerName} 
                                            onInput={handleInput}
                                            spellcheck={false}
                                            required />
                                    </div>
                                    <div class="button-row">
                                        <button class="secondary-button" type="button" onClick={() => dialog.close()}>
                                            Cancel
                                        </button>
                                        <button class="secondary-button" type="button" onClick={goToPrevStep}>
                                            Back
                                        </button>
                                        <button class="primary-button" type="submit" disabled={!isFormValid()}>
                                            Submit
                                        </button>
                                    </div>
                                </Show>
                            </>
                        )}

                        {isLoading() && <div>Loading...</div>}
                        
                        {isSuccess() && (
                            <>
                                <div class="banner banner-success">
                                    🎉 Successfully created credential
                                </div>
                                <div class="button-row"> 
                                    <button class="secondary-button" type="button" onClick={() => { closeModal(); hydrateManifestStore()}}>
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

export default Modal;