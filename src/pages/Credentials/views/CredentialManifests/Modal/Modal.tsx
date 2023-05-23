import { Component, JSX, Show, createSignal, onCleanup } from "solid-js";
import "./Modal.scss";
import Icon, { ArrowUpDown, Beaker, DangerAlert, XCross } from "../../../../../icons/Icon";
import { formatTextAreaOnKeyDown, handleRequest, insertSampleInput, renderFormFromJSON, updateFormOnInput } from "../../../../../utils/helpers";
import { manifestInput } from "./samples/mock";
import SSI from "../../../../../utils/service";

const Modal: Component<{ content }> = (props) => {
    let initialFormValues = { json: '', schema: '' }

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
        // once we have schema and potentially issuance template
        // prob need to break this down more - a lot more
        const request = SSI.putManifest(formValues().json);
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
        if (step() === 1) return true;
        if (step() === 2)  return true;
        if (step() === 3) return formValues().json.trim() !== '' && !isError();
        return false;
    }

    //populate textarea field with sample input
    const populateSampleInput = (event) => {
        const setters = { setIsError, setFormValues };
        insertSampleInput(event, setters, 'json', manifestInput);
    }

    const [ step, setStep ] = createSignal(1);

    const goToNextStep = () => {
        if (step() + 1 > 3) return;
        setStep(step() + 1);
    }

    const goToPrevStep = () => {
        if (step() - 1 < 1) return;
        setStep(step() - 1);
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
                    <h2>New Verifiable Credential</h2>
                    <form onSubmit={handleSubmit}>
                        {!isLoading() && !isSuccess() && (
                            <>
                                {isError() && 
                                    <div class="banner banner-danger">
                                        <Icon svg={DangerAlert} />
                                        Error creating DID. Try again
                                    </div> 
                                }

                                <Show when={step() === 1}>
                                    <div class="field-container">
                                        <label for="name">Name</label>
                                        <input type="text" 
                                            id="name" 
                                            name="name"
                                            placeholder="Employment Credential" 
                                            class="input-container" />
                                    </div>
                                    <div class="field-container">
                                        <label for="description">Description</label>
                                        <input type="text" 
                                            id="description" 
                                            name="description"
                                            placeholder="Proof of employment" 
                                            class="input-container" />
                                    </div>
                                    <div class="button-row">
                                        <button class="secondary-button" onClick={() => dialog.close()}>
                                            Cancel
                                        </button>
                                        <button class="primary-button" disabled={!isFormValid()} onClick={goToNextStep}>
                                            Next
                                        </button>
                                    </div>
                                </Show>

                                <Show when={step() === 2}>
                                    <div class="field-container">
                                        <label for="json">Schema</label>
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
                                                required
                                            />
                                            <button class="tiny-ghost-button" onclick={populateSampleInput}>
                                                <Icon svg={Beaker} />
                                                Try sample input
                                            </button>
                                        </div>
                                    </div>
                                    <div class="button-row">
                                        <button class="secondary-button" onClick={() => dialog.close()}>
                                            Cancel
                                        </button>
                                        <button class="secondary-button" onClick={goToPrevStep}>
                                            Back
                                        </button>
                                        <button class="primary-button" disabled={!isFormValid()} onClick={goToNextStep}>
                                            Next
                                        </button>
                                    </div>
                                </Show>

                                <Show when={step() === 3}>
                                    <div class="field-container">
                                        <label for="json">Output Descriptors</label>
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
                                            <button class="tiny-ghost-button" onclick={populateSampleInput}>
                                                <Icon svg={Beaker} />
                                                Try sample input
                                            </button>
                                        </div>
                                    </div>
                                
                                {/* {renderFormFromJSON(manifestInput.outputDescriptors[0], { setFormValues })} */}
                                <div class="button-row">
                                    <button class="secondary-button" onClick={() => dialog.close()}>
                                        Cancel
                                    </button>
                                    <button class="secondary-button" onClick={goToPrevStep}>
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
                                    🎉 Success - did is: 34567
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

export default Modal;