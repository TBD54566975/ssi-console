import { Component, createSignal, onMount } from "solid-js";
import "./Modal.scss";
import Icon, { ArrowUpDown, Beaker, ChevronDown, DangerAlert, ExternalArrow, XCross } from "@/icons/Icon";
import { formatTextAreaOnKeyDown, handleRequest, insertSampleInput, updateFormOnInput } from "@/utils/helpers";
import SSI, { DIDMethod, KeyType, didMethods, keyTypes } from "@/utils/service";
import { hydrateDIDStore } from "@/utils/setup";
import Editor from "@/utils/editor";
import Dialog from "@/components/Dialog/Dialog";


const Modal: Component<{ content }> = (props) => {
    let initialFormValues: { json, didMethod: DIDMethod, keyType: KeyType, didWebId, serviceEndpoints, includeServiceEndpoints } = { 
        json: '', 
        didMethod: didMethods[0], 
        keyType: keyTypes[0], 
        didWebId: "",
        serviceEndpoints: [],
        includeServiceEndpoints: false 
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

    //actual form calls
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            "keyType": formValues().keyType
        }
        if (formValues().didMethod === "web") {
            data["options"] = {
                "didWebId": `did:web:${formValues().didWebId}`
            }
        }
        if (formValues().didMethod === "ion" && formValues().includeServiceEndpoints && formValues().serviceEndpoints) {
            data["options"] = {
                "serviceEndpoints": formValues().serviceEndpoints
            }
        }
        const request = SSI.putDID(formValues().didMethod, data);
        const setters = { setIsLoading, setIsSuccess, setIsError };
        handleRequest(event, request, setters);
    };

    const handleInput = (event) => {
        updateFormOnInput(event, { setIsError, setFormValues });
    };

    const isFormValid = () => {
        // check that ion is valid
        const serviceEndpointsisValid = formValues().serviceEndpoints?.length && formValues().serviceEndpoints?.every(obj =>
            {
                console.log(formValues().serviceEndpoints)
                return obj.hasOwnProperty("id") &&
                    obj.hasOwnProperty("type") &&
                    obj.hasOwnProperty("serviceEndpoint")
            }
        );
        if (formValues().didMethod === "ion" && (!formValues().includeServiceEndpoints || serviceEndpointsisValid)) return true;
        
        // check that web is valid
        const didWebIdPattern = /^did:web:(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
        if (formValues().didMethod === "web" && didWebIdPattern.test(formValues().didWebId)) return true;
        
        // check that key is valid
        if (formValues().didMethod === "key") return true;
        return false;
    }

    const serviceEndpointsExample = [{ 
        'id': 'example', 
        'type': 'example', 
        'serviceEndpoint': 'https://example.com' 
    }];

    const editor = Editor({
        id: "serviceEndpoints",
        onInput: (e) => handleInput(e),
        doc: JSON.stringify(serviceEndpointsExample, null, 2),
        placeholder: <div>// Example: <br />{JSON.stringify(serviceEndpointsExample, null, 2)}</div>
    });

    return (
        <Dialog content={{
            ...props.content,
            heading: {
                h2: "New Verifiable Credential Template",
                p: "Set a DID and start issuing, verifying, or testing out credentials."
            }
        }} afterCloseModal={resetForm} handleSubmit={handleSubmit}>
                        
                        {!isLoading() && !isSuccess() && (
                            <>
                                <div class="dialog-body-form">
                                    {isError() && 
                                        <div class="banner banner-danger">
                                            <Icon svg={DangerAlert} />
                                            Error creating DID. Try again
                                        </div> 
                                    }
                                    <div class="field-section">
                                        <div class="field-container">
                                            <label for="didMethod">DID Method</label>
                                            <div class="select-container">
                                                <select 
                                                    id="didMethod" 
                                                    name="didMethod" 
                                                    value={formValues().didMethod} 
                                                    onInput={handleInput}
                                                    required
                                                >
                                                    {didMethods && didMethods.map(option => 
                                                        <option value={option}>did:{option}</option>
                                                    )}
                                                </select>
                                                <Icon svg={ArrowUpDown} />
                                            </div>
                                        </div>

                                        { formValues().didMethod === 'web' && (
                                            <div class="field-container">
                                                <label for="didWebId">Website domain</label>
                                                <p>The website to be associated with your new DID</p>
                                                <input type="text" 
                                                    id="didWebId" 
                                                    name="didWebId" 
                                                    placeholder="www.example.com" 
                                                    class="input-container"
                                                    value={formValues().didWebId} 
                                                    onInput={handleInput}
                                                    spellcheck={false}
                                                    required
                                                    autocomplete="off" 
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <details class="field-section">
                                        <summary>Advanced (optional) <Icon svg={ChevronDown} /></summary>
                                        <div class="field-container">
                                            <label for="keyType">Key type</label>
                                            <div class="select-container">
                                                <select 
                                                    id="keyType" 
                                                    name="keyType" 
                                                    value={formValues().keyType} 
                                                    onInput={handleInput}
                                                    required
                                                >
                                                    {keyTypes && keyTypes.map(option => 
                                                        <option value={option}>{option}</option>
                                                    )}
                                                </select>
                                                <Icon svg={ArrowUpDown} />
                                            </div>
                                        </div>
                                        { formValues().didMethod === 'ion' && (
                                            <div class="field-container checkbox-container">
                                                    <input id="includeServiceEndpoints" 
                                                        name="includeServiceEndpoints"
                                                        checked={formValues().includeServiceEndpoints}
                                                        onInput={handleInput}
                                                        type="checkbox"
                                                        class="checkbox-container" />
                                                    <label for="includeServiceEndpoints">Add service endpoints</label>
                                                    <a href="https://www.w3.org/TR/did-spec-registries/#service-properties" target="_blank">
                                                        See examples <Icon svg={ExternalArrow} />
                                                    </a>
                                                
                                                { formValues().includeServiceEndpoints && (
                                                    <div class="textarea-container">
                                                        <div class="cm-label sr-only" id="serviceEndpoints">Service endpoints (optional)</div>
                                                        {editor.dom}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </details>
                                </div>
                                <div class="button-row">
                                    <button class="secondary-button" type="button" onClick={() => document.getElementsByTagName('dialog')[0].close()}>
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
                                    <button class="secondary-button" type="button" onClick={() => { document.getElementsByTagName('dialog')[0].close(); hydrateDIDStore() }}>
                                        Done
                                    </button>
                                </div>
                            </>
                        )}
        </Dialog>
    )
}

export default Modal;