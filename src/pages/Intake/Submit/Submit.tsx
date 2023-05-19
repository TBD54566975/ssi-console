import { Component, createSignal } from "solid-js";
import "./Submit.scss";
import { submitForm, updateFormOnInput, formatTextAreaOnKeyDown } from "../../../utils/helpers";
import Icon, { DangerAlert } from "../../../icons/Icon";

const Submit: Component = () => {
    let endpoint = `/v1/presentations/submissions/`;
    let method = 'POST';
    let initialFormValues = { json: '' }

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
        return formValues().json.trim() !== "" && !isError();
    }

    return (
        <div class="intake-page">
            <section class="intake-page-section"> 
                <h1>Request for Proof of KYC</h1>
                <p>Review the details of the credentials submission request and ensure your submission meets requirements. When you're ready, submit your credentials as a JSON.</p> 
                <div class="details-container">
                    <details>
                        <summary>Credential Details</summary>
                        <h3>KYC VC</h3>
                        <pre>
                            details here
                        </pre>
                    </details>
                </div>
                <form onSubmit={handleSubmit}>
                    {!isLoading() && !isSuccess() && (
                        <>
                            {isError() && 
                                <div class="banner banner-danger">
                                    <Icon svg={DangerAlert} />
                                    Error submitting credentials. Try again
                                </div> 
                            }
                        
                            <div class="field-container">
                                <label for="json">JSON</label>
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
                                <p>🎉 Success - Your submission ID is 1234-12345-123456.</p>
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