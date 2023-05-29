import { Component, createSignal, onCleanup } from "solid-js";
import "./Modal.scss";
import Icon, { ArrowUpDown, Beaker, DangerAlert, XCross } from "../../../../../icons/Icon";
import { formatTextAreaOnKeyDown, handleRequest, insertSampleInput, updateFormOnInput } from "../../../../../utils/helpers";
import { requestInput } from "./samples/mocks";
import SSI from "../../../../../utils/service";
import { inputDescriptorsInput } from "../../../../Credentials/views/CredentialManifests/Modal/samples/mock";
import { store } from "../../../../../utils/store";

const Modal: Component<{ content }> = (props) => {
    //pass in these props

    let initialFormValues = { 
        inputDescriptors: '', 
        verifier: Object.keys(store.user)[0],
        name: '',
        purpose: ''
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
            "author": store.user[formValues().verifier]["did"],
            "authorKid": store.user[formValues().verifier]["kid"],
            "format": {
              "jwt_vp": {
                "alg": [
                    "EdDSA"
                ]
              },
            },
            "input_descriptors": formValues().inputDescriptors,
            "name": formValues().name,
            "purpose": formValues().purpose
        }
        const request = SSI.putDefinition(data);
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
        return formValues().inputDescriptors.trim() !== '' && !isError();
    }

    //populate textarea field with sample input
    const populateSampleInput = (event) => {
        const setters = { setIsError, setFormValues };
        insertSampleInput(event, setters, 'inputDescriptors', inputDescriptorsInput);
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
                    <h2>Create a Submission Link</h2>
                    <form onSubmit={handleSubmit}>
                        {!isLoading() && !isSuccess() && (
                            <>
                                {isError() && 
                                    <div class="banner banner-danger">
                                        <Icon svg={DangerAlert} />
                                        Error creating Submission Link. Try again
                                    </div> 
                                }
                                <div class="field-container">
                                    <label for="name">Name</label>
                                    <input type="text" 
                                        id="name" 
                                        name="name"
                                        placeholder="KYC Presentation Request" 
                                        class="input-container"
                                        value={formValues().name} 
                                        onInput={handleInput}
                                        spellcheck={false}
                                        required
                                        autocomplete="off" />
                                </div>
                                <div class="field-container">
                                    <label for="purpose">Purpose</label>
                                    <input type="text" 
                                        id="purpose" 
                                        name="purpose"
                                        placeholder="To help fulfill KYC requirements" 
                                        class="input-container"
                                        value={formValues().purpose} 
                                        onInput={handleInput}
                                        spellcheck={false}
                                        required
                                        autocomplete="off" />
                                </div>
                                <div class="field-container">
                                    <label for="inputDescriptors">Input constraints</label>
                                    <div class="textarea-container">
                                        <textarea 
                                            id="inputDescriptors" 
                                            name="inputDescriptors" 
                                            value={formValues().inputDescriptors} 
                                            onInput={handleInput}
                                            onkeydown={handleKeyDown}
                                            spellcheck={false}
                                            autocomplete="off"
                                            rows={8}
                                            required
                                        />
                                        <button class="tiny-ghost-button" onclick={populateSampleInput}>
                                            <Icon svg={Beaker} />
                                            Try sample input
                                        </button>
                                    </div>
                                </div>
                                <div class="field-container">
                                    <label for="verifier">Verifier</label>
                                    <div class="select-container">
                                        <select 
                                            id="verifier" 
                                            name="verifier" 
                                            value={formValues().verifier} 
                                            onInput={handleInput}
                                            required
                                        >
                                            {Object.values(store.user) && Object.values(store.user).map(verifier => 
                                                <option value={verifier["did"]}>{verifier["did"]}</option>
                                            )}
                                        </select>
                                        <Icon svg={ArrowUpDown} />
                                    </div>
                                </div>
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
                                    🎉 Successfully created Submission Link
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