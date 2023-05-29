import { Component, createSignal, onMount } from "solid-js";
import "./Apply.scss";
import { updateFormOnInput, formatTextAreaOnKeyDown, handleRequest } from "../../../utils/helpers";
import Icon, { DangerAlert } from "../../../icons/Icon";
import SSI from "../../../utils/service";
import { useLocation, useParams } from "@solidjs/router";
import { store } from "../../../utils/store";

const Apply: Component = () => {
    let initialFormValues = { json: '' }

    // the component
    const [formValues, setFormValues] = createSignal(initialFormValues);
    const [isLoading, setIsLoading] = createSignal(false);
    const [isSuccess, setIsSuccess] = createSignal(false);
    const [isError, setIsError] = createSignal(false);

    const params = useParams<{ id }>();

    const [ manifest, setManifest ] = createSignal();

    onMount(async () => {
        const { credential_manifest } = await SSI.getManifest(params.id);
        setManifest(credential_manifest);
    })

    const resetForm = () => {
        setFormValues(initialFormValues);
        setIsLoading(false);
        setIsSuccess(false);
        setIsError(false);
    }

    const handleSubmit = async (event) => {
        const data = {
            "applicationJwt": formValues().json
        }
        const request = SSI.putApplication(data);
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
        return formValues().json.trim() !== "" && !isError();
    }
    
    return (
        <div class="intake-page">
            <section class="intake-page-section"> 
                <h1>{manifest() && manifest()["name"]} Application</h1>
                <p>Review the credential details and ensure your application meets requirements. When you're ready, submit your application as a JSON Web Token (JWT).</p> 
                <div class="details-container">
                    <details>
                        <summary>Credential Application Details</summary>
                        <h3>{manifest() && manifest()["name"]}</h3>
                        <pre>
                            {JSON.stringify(manifest(), null, 2)}
                        </pre>
                    </details>
                </div>
                <form onSubmit={handleSubmit}>
                    {!isLoading() && !isSuccess() && (
                        <>
                            {isError() && 
                                <div class="banner banner-danger">
                                    <Icon svg={DangerAlert} />
                                    Error submitting application. Try again
                                </div> 
                            }
                        
                        <div class="field-container">
                            <label for="json">JWT</label>
                            <textarea 
                                id="json" 
                                name="json" 
                                value={formValues().json} 
                                onInput={handleInput}
                                onkeydown={handleKeyDown}
                                spellcheck={false}
                                autocomplete="off"
                                rows={8}
                                required
                                class="textarea-container"></textarea>
                        </div>
                        <div class="button-row">
                            <button class="primary-button" type="submit" disabled={!isFormValid()}>Apply</button>
                        </div>
                        </>
                    )}
                    {isLoading() && <div>Loading...</div>}
                        
                    {isSuccess() && (
                        <>
                            <div class="banner banner-success">
                                <p>🎉 Successfully submitted application.</p>
                                <p>You'll be contacted shortly with next steps. You can now exit this window.</p>
                            </div>
                        </>
                    )}
                </form>
            </section>
        </div>
    )
}

export default Apply;