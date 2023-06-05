import { Component, JSX, Show, createSignal, onCleanup } from "solid-js";
import "./Modal.scss";
import Icon, { ArrowUpDown, Beaker, DangerAlert, XCross } from "../../../../../icons/Icon";
import { formatTextAreaOnKeyDown, handleRequest, insertSampleInput, renderFormFromJSON, updateFormOnInput, vcJWTFormat, vpJWTFormat } from "../../../../../utils/helpers";
import { inputDescriptorsInput, manifestInput, schemaInput, stylesInput } from "./samples/mock";
import SSI from "../../../../../utils/service";
import { store } from "../../../../../utils/store";
import { hydrateCredentialsStore, hydrateManifestStore, hydrateSchemaStore } from "../../../../../utils/setup";
import { getSchemaForSubject } from "../Details/IssueModal/IssueModal";

const Modal: Component<{ content }> = (props) => {
    let initialFormValues = { 
        inputDescriptors: '', 
        submissionRequirements: '',
        schema: '', 
        name: '', 
        description: '',
        issuerName: '',
        issuer: Object.keys(store.user)[0],
        schemaId: '',
        includeStyles: null,
        styles: '',
        includeDisplay: null,
        display: ''
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
        // if no existing schemaID, first get schemaID
        let schemaId = formValues().schemaId;
        if (schemaId === '') {
            const schemaPayload = {
                "name": formValues().name,
                "schema": {
                    ...JSON.parse(formValues().schema),
                    "$schema": "https://json-schema.org/draft/2020-12/schema"
                }
            }
            const schemaResponse = await SSI.putSchema(schemaPayload);
            const { id } = await schemaResponse.json();
            schemaId = id;
            hydrateSchemaStore();
        }

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
                    "schema": schemaId,
                    // ...formValues().styles !== '' && { "styles": formValues().styles },
                    // ...formValues().display !== '' && { "display": formValues().display }
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
        if (event.currentTarget.readOnly) return;
        formatTextAreaOnKeyDown(event, { setFormValues });
    }

    const isFormValid = () => {
        let isComplete;
        if (step() === 1) isComplete = formValues().name.trim() !== '' && formValues().description.trim() !== ''
        if (step() === 2) isComplete = formValues().schema.trim() !== '' || formValues().schemaId.trim() !== ''
        if (step() === 3) isComplete = true;
        // if (step() === 4) isComplete = true;
        if (step() === 4) isComplete = formValues().issuerName.trim() !== ''
        return isComplete && !isError();
    }

    //populate textarea field with sample input
    const populateSampleInput = (event) => {
        const setters = { setIsError, setFormValues };;
        let fieldToSet;
        let sampleInput: typeof schemaInput.schema | typeof inputDescriptorsInput | typeof stylesInput;
        if (step() === 2) {
            fieldToSet = 'schema';
            sampleInput = schemaInput.schema;
        }
        if (step() === 3) {
            fieldToSet = 'inputDescriptors';
            sampleInput = inputDescriptorsInput;
        }
        // if (step() === 4) {
        //     fieldToSet = 'styles';
        //     sampleInput = stylesInput;
        // }
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
                                            required
                                            autocomplete="off" />
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
                                            required
                                            autocomplete="off" />
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
                                        <label for="schemaId">Schema</label>
                                        <div class="select-container">
                                            <select 
                                                id="schemaId" 
                                                name="schemaId" 
                                                value={formValues().schemaId} 
                                                onInput={handleInput}
                                                required
                                            >
                                                <option value={''}>New data set</option>
                                                {store.schemas && Object.values(store.schemas).map(({schema}) => 
                                                    <option value={schema["id"]}>{schema["name"]}</option>
                                                )}
                                            </select>
                                            <Icon svg={ArrowUpDown} />
                                        </div>
                                    </div>
                                    <div class="field-container">
                                        <label for="schema">Data set</label>
                                        <div class="textarea-container">
                                            <textarea 
                                                id="schema" 
                                                name="schema" 
                                                value={
                                                    formValues().schemaId.trim() !== '' 
                                                    ? JSON.stringify(getSchemaForSubject(formValues().schemaId).properties, null, 2)
                                                    : formValues().schema
                                                    }
                                                onInput={handleInput}
                                                onkeydown={handleKeyDown}
                                                spellcheck={false}
                                                autocomplete="off"
                                                rows={8}
                                                required 
                                                readonly={formValues().schemaId.trim() !== ''}
                                                />
                                            <button class="tiny-ghost-button" type="button" onclick={populateSampleInput} disabled={formValues().schemaId.trim() !== ''}>
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
                                        <label for="inputDescriptors">Input Descriptors (optional)</label>
                                        <div class="textarea-container">
                                            <textarea 
                                                id="inputDescriptors" 
                                                name="inputDescriptors" 
                                                value={formValues().inputDescriptors} 
                                                onInput={handleInput}
                                                onkeydown={handleKeyDown}
                                                spellcheck={false}
                                                autocomplete="off"
                                                rows={8} />
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

                                {/* <Show when={step() === 4}>
                                    <div class="field-container">
                                        <label for="styles">Styles</label>
                                        <div class="textarea-container">
                                            <textarea 
                                                id="styles" 
                                                name="styles" 
                                                value={formValues().styles} 
                                                onInput={handleInput}
                                                onkeydown={handleKeyDown}
                                                spellcheck={false}
                                                autocomplete="off"
                                                rows={8}
                                                required />
                                            <button class="tiny-ghost-button" type="button" onclick={populateSampleInput}>
                                                <Icon svg={Beaker} />
                                                Try sample input
                                            </button>
                                        </div>
                                    </div>

                                    <div class="field-container checkbox-container">
                                        <input id="includeDisplay" 
                                            name="includeDisplay"
                                            checked={formValues().includeDisplay}
                                            onInput={handleInput}
                                            type="checkbox"
                                            class="checkbox-container" />
                                        <label for="includeDisplay">Include display properties?</label>
                                    </div>

                                    {formValues().includeDisplay && (
                                        <div class="field-container">
                                            <label for="submission_requirements">Display properties</label>
                                            <div class="textarea-container">
                                                <textarea 
                                                    id="submissionRequirements" 
                                                    name="submissionRequirements" 
                                                    value={formValues().submissionRequirements} 
                                                    onInput={handleInput}
                                                    onkeydown={handleKeyDown}
                                                    spellcheck={false}
                                                    autocomplete="off"
                                                    rows={8}
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
                                </Show> */}

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
                                            required
                                            autocomplete="off" />
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