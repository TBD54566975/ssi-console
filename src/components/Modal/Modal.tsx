import { Component, createSignal, onCleanup } from "solid-js";
import "./Modal.scss";
import Icon, { ArrowUpDown, Beaker, DangerAlert, XCross } from "../../icons/Icon";

const Modal: Component<{ content }> = (props) => {
    //pass in these props
    let endpoint = '/v1/did';
    let method = 'POST';
    let options = [
        "Key",
        "Web",
        "Ion"
    ];
    let initialFormValues = { json: '', didType: options[0].toLowerCase() }

    
    const [formValues, setFormValues] = createSignal(initialFormValues);
    const [isLoading, setIsLoading] = createSignal(false);
    const [isSuccess, setIsSuccess] = createSignal(false);
    const [isError, setIsError] = createSignal(false);

    //dialog magic
    let dialog;
    const showModal = () => {
        dialog.showModal();
        document.body.classList.add('no-scroll');
        dialog.addEventListener('close', () => {
            document.body.classList.remove('no-scroll');
            setFormValues(initialFormValues);
            setIsLoading(false);
            setIsSuccess(false);
            setIsError(false);
        });
    }
    
    const closeModal = () => {
        return dialog.close();
    }

    //form magic
    let form: HTMLFormElement;

    //actual form calls
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setIsSuccess(false);
        setIsError(false);
    
        // form vars
        let body = JSON.stringify(formValues());
        let errorHandler = setIsError;
        let successHandler = setIsSuccess;
        let loadingHandler = setIsLoading;


        // pure form
        try {
            const response = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body
            });
    
            if (!response.ok) {
                errorHandler(true)
                throw new Error('Unable to create a DID.');
            }

            successHandler(true);
        } catch (e) {
            errorHandler(true)
            throw new Error(e);
        } finally {
            loadingHandler(false);
        }
    };

    // for any input fields but rn only select
    const handleInput = (event) => {
        setIsError(false);
        const { name, value } = event.target;
        setFormValues((prev) => ({ 
            ...prev, 
            [name]: value 
        }));
    };

    // only for text area
    function handleKeyDown(event) {
        if (event.key === "Tab" && !event.altKey && !event.shiftKey) {
            const start = event.target.selectionStart;
            const end = event.target.selectionEnd;
            const value = formValues().json;
            event.preventDefault();
            setFormValues((prev) => ({      
                ...prev, 
                json: `${value.substring(0, start)}\t${value.substring(end)}`
            }));
            event.target.selectionStart = event.target.selectionEnd = start + 1;
        }
        if (event.key === "Enter") {
            const start = event.target.selectionStart;
            const end = event.target.selectionEnd;
            const value = formValues().json;
            event.preventDefault();
            setFormValues((prev) => ({      
                ...prev, 
                json: `${value.substring(0, start)}\n\t${value.substring(end)}`
            }));
            event.target.selectionEnd = end + 2; 
        }
    }

    const populateJSON = (event) => {
        setIsError(false);
        const didInput = {
            keyType: "Ed25519"
        }
        if (formValues().didType === "web") {
            didInput["web"]  = "example.com"
        }
        event.preventDefault();
        setFormValues((prev) => ({      
            ...prev, 
            json: JSON.stringify(didInput, null, 2)
        }));
    }

    const isFormValid = () => {
        return formValues().json.trim() !== '' && !isError();
    }

    return (
        <div>
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
                    <h2>Create a DID</h2>
                    <form onSubmit={handleSubmit} ref={form}>
                        {!isLoading() && !isSuccess() && (
                            <>
                                {isError() && 
                                    <div class="banner banner-danger">
                                        <Icon svg={DangerAlert} />
                                        Error creating DID. Try again
                                    </div> 
                                }
                                <div class="field-container">
                                    <label for="didType">DID Type</label>
                                    <div class="select-container">
                                        <select 
                                            id="didType" 
                                            name="didType" 
                                            value={formValues().didType} 
                                            onInput={handleInput}
                                            required
                                        >
                                            {options && options.map(option => 
                                                <option value={option.toLowerCase()}>{option}</option>
                                            )}
                                        </select>
                                        <Icon svg={ArrowUpDown} />
                                    </div>
                                </div>
                                <div class="field-container">
                                    <label for="json">JSON</label>
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
                                        <button class="tiny-ghost-button" onclick={populateJSON}>
                                            <Icon svg={Beaker} />
                                            Try sample input
                                        </button>
                                    </div>
                                </div>
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
                                    🎉 Success - did is: 34567
                                </div>
                                <div class="button-row"> 
                                    <button class="secondary-button" type="button" onClick={closeModal}>
                                        Done
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default Modal;