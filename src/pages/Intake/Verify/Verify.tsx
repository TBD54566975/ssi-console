import { Component, createSignal, onMount } from "solid-js";
import "./Verify.scss";
import { updateFormOnInput, formatTextAreaOnKeyDown, handleRequest } from "@/utils/helpers";
import Icon, { DangerAlert } from "@/icons/Icon";
import SSI from "@/utils/service";
import { useParams } from "@solidjs/router";

const Verify: Component = () => {
    const params = useParams<{ id }>();
    let initialFormValues = { jwt: '' }

    // the component
    const [formValues, setFormValues] = createSignal(initialFormValues);
    const [isLoading, setIsLoading] = createSignal(false);
    const [isSuccess, setIsSuccess] = createSignal(false);
    const [isError, setIsError] = createSignal(false);

    const [ res, setRes ] = createSignal(null);

    const resetForm = () => {
        setFormValues(initialFormValues);
        setIsLoading(false);
        setIsSuccess(false);
        setIsError(false);
    }

    const handleSubmit = async (event) => {
        const data = {
            "credentialJwt": formValues().jwt
        }
        const request = SSI.putVerifyCredential(data);
        const setters = { setIsLoading, setIsSuccess, setIsError };
        const res = await handleRequest(event, request, setters);
        setRes(res.verified);
    };

    const handleInput = (event) => {
        updateFormOnInput(event, { setIsError, setFormValues })
    };

    const isFormValid = () => {
        return formValues().jwt.trim() !== "" && !isError();
    }
    
    return (
        <div class="intake-page">
            <section class="intake-page-section"> 
                <h1>Verify a credential</h1>
                <p>Verify a credential by JWT</p> 
                <form onSubmit={handleSubmit}>
                    {!isLoading() && (
                        <>
                            {isError() && 
                                <div class="banner banner-danger">
                                    <Icon svg={DangerAlert} />
                                    Error verifying credential. Try again
                                </div> 
                            }

                            {isSuccess() && (
                                res() !== null && (
                                    res()
                                    ?   <div class="banner banner-success">
                                            Verified!
                                        </div>
                                    :   <div class="banner banner-alert">
                                            Credential is not verifiable.
                                        </div>
                                )
                            )}
                        
                        <div class="field-container">
                            <label for="jwt">Credential JWT</label>
                            <input type="text" 
                                id="jwt" 
                                name="jwt"
                                placeholder="xxxxxx.xxxxxxx.xxxxxx" 
                                class="input-container"
                                value={formValues().jwt} 
                                onInput={handleInput}
                                spellcheck={false}
                                required
                                autocomplete="off" />
                        </div>
                        <div class="button-row">
                            <button class="primary-button" type="submit" disabled={!isFormValid()}>Submit</button>
                        </div>
                        </>
                    )}
                    {isLoading() && <div>Loading...</div>}
                </form>
            </section>
        </div>
    )
}

export default Verify;