import { Component, createSignal, onMount } from "solid-js";
import "./Submit.scss";
import { updateFormOnInput, formatTextAreaOnKeyDown, handleRequest } from "../../../utils/helpers";
import Icon, { DangerAlert } from "../../../icons/Icon";
import SSI from "../../../utils/service";
import { useParams } from "@solidjs/router";

const Submit: Component = () => {
    const params = useParams<{ id }>();
    let initialFormValues = { json: '' }

    // the component
    const [formValues, setFormValues] = createSignal(initialFormValues);
    const [isLoading, setIsLoading] = createSignal(false);
    const [isSuccess, setIsSuccess] = createSignal(false);
    const [isError, setIsError] = createSignal(false);

    const [ definition, setDefinition ] = createSignal();

    onMount(async () => {
        const { presentation_definition } = await SSI.getDefinition(params.id);
        setDefinition(presentation_definition);
    })

    const resetForm = () => {
        setFormValues(initialFormValues);
        setIsLoading(false);
        setIsSuccess(false);
        setIsError(false);
    }

    const handleSubmit = async (event) => {
        const data = {
            "submissionJwt": formValues().json
        }
        const request = SSI.putSubmission(data);
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
                <h1>{definition() && definition()["name"]} Submission</h1>
                <p>Review the presentation definition details and ensure your submission meets requirements. When you're ready, submit your presentation as a JSON Web Token (JWT).</p> 
                <div class="details-container">
                    <details>
                        <summary>Presentation Definition Details</summary>
                        <h3>{definition() && definition()["name"]}</h3>
                        <pre>
                            {JSON.stringify(definition(), null, 2)}
                        </pre>
                    </details>
                </div>
                <form onSubmit={handleSubmit}>
                    {!isLoading() && !isSuccess() && (
                        <>
                            {isError() && 
                                <div class="banner banner-danger">
                                    <Icon svg={DangerAlert} />
                                    Error submitting presentation. Try again
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
                            <button class="primary-button" type="submit" disabled={!isFormValid()}>Submit</button>
                        </div>
                        </>
                    )}
                    {isLoading() && <div>Loading...</div>}
                        
                    {isSuccess() && (
                        <>
                            <div class="banner banner-success">
                                <p>🎉 Successfully submitted presentation.</p>
                                <p>You'll be contacted shortly with next steps. You can now exit this window.</p>
                            </div>
                        </>
                    )}
                </form>
            </section>
        </div>
    )
}

export default Submit;