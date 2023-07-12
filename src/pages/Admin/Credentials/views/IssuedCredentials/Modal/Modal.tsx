import { Component, JSX, createSignal, onCleanup } from "solid-js";
import "./Modal.scss";
import Icon, { ArrowUpDown, Beaker, DangerAlert, XCross } from "@/icons/Icon";
import { formatTextAreaOnKeyDown, handleRequest, insertSampleInput, renderFormFromJSON, updateFormOnInput } from "@/utils/helpers";
import { credentialInputJson } from "./samples/mock";
import SSI from "@/utils/service";
import { store } from "@/utils/store";
import { hydrateCredentialsStore } from "@/utils/setup";
import { useNavigate } from "@solidjs/router";
import { parseIDFromUrl } from "@/utils/helpers";
import EvidenceForm from "./evidence/EvidenceForm";
import RadioCardSet from "@/components/RadioCardSet/RadioCardSet";
import Dialog from "@/components/Dialog/Dialog";

const IssueModal: Component<{ content }> = (props) => {
    //pass in these props

    const schemaProperties = JSON.stringify(getSchemaForSubject(props.content.schemaId)?.properties, null, 2);

    let initialFormValues = { 
        properties: schemaProperties,
        data: {},
        expires: null, 
        expiry: '',
        issuer: Object.keys(store.user)[0],
        subject: '',
        evidence: {
            "id": "",
            "type": ["DocumentVerification"],
            "verifier": Object.keys(store.user)[0],
            "verificationMethod": "verificationMethod-none",
            "documentType": "",
            "documentNumber": ""
        },
        credentialStatus: "credentialStatus-none",
        evidenceMethod: ''
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
        return document.getElementsByTagName('dialog')[0].close();
    }

    const navigate = useNavigate();
    const [credentialId, setCredentialId] = createSignal();

    //actual form calls
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            "@context": "https://www.w3.org/2018/credentials/v1",
            "data": formValues().data,
            "issuer": store.user[formValues().issuer]["did"],
            "issuerKid": store.user[formValues().issuer]["kid"],
            "schemaId": props.content.schemaId,
            "subject": formValues().subject,
            ...formValues().evidence.verificationMethod !== "verificationMethod-none" && { "evidence": [formValues().evidence] },
            ...formValues().expiry && { "expiry": new Date(formValues().expiry).toISOString() },
            ...formValues().credentialStatus !== "credentialStatus-none" && { [formValues().credentialStatus]: true }        }
        const request = SSI.putCredential(data);
        const setters = { setIsLoading, setIsSuccess, setIsError };
        const res = await handleRequest(event, request, setters);
        setCredentialId(parseIDFromUrl((await res.json()).id));
        hydrateCredentialsStore();
    };

    const handleInput = (event) => {
        updateFormOnInput(event, { setIsError, setFormValues })
    };

    const handleKeyDown = (event) => {
        formatTextAreaOnKeyDown(event, { setFormValues });
    }

    const isFormValid = () => {
        const isExpiryValid = formValues().expires ? formValues().expiry !== '' : true;
        const isSubjectValid = formValues().subject !== '';
        const isSubjectDataValid = formValues().properties?.trim() !== '' 
        try {
            JSON.parse(formValues().properties)
        } catch {
            return false;
        }
        const isSubjectEvidencePresent = formValues().evidence.verificationMethod !== "verificationMethod-none";
        const isSubjectEvidenceValid = isSubjectEvidencePresent ? Object.values(formValues().evidence).every(val => val !== "") : true;
        return isExpiryValid && isSubjectValid && isSubjectDataValid && isSubjectEvidenceValid && !isError();
    }

    return (
        <Dialog content={{
            ...props.content,
            heading: {
                h2: "New Verifiable Credential"
            }
        }} afterCloseModal={resetForm} handleSubmit={handleSubmit}>
                        {!isLoading() && !isSuccess() && (
                            <>
                                {isError() && 
                                    <div class="banner banner-danger">
                                        <Icon svg={DangerAlert} />
                                        Error issuing credential. Try again
                                    </div> 
                                }

                                <h3>Credential Subject</h3>
                                {Object.keys(getSchemaForSubject(props.content.schemaId)?.properties).map(key => {
                                    return getSchemaForSubject(props.content.schemaId)?.properties[key] === 'string'
                                         ?  <div class="field-container">
                                            <label for={key}>Subject {key}</label>
                                            <input type="text" 
                                                    id={key} 
                                                    name={key}
                                                    placeholder="Enter text here"
                                                    class="input-container"
                                                    value={formValues().data[key] || null} 
                                                    onInput={(e) => {
                                                        setIsError(false);
                                                        setFormValues((prev) => {
                                                            return {
                                                                ...prev,
                                                                "data": {
                                                                    ...formValues().data,
                                                                    [key]: e.currentTarget.value
                                                                }
                                                            }
                                                        });
                                                    }} 
                                                    spellcheck={false}
                                                    required
                                                    autocomplete="off" />
                                            </div>
                                        :   getSchemaForSubject(props.content.schemaId)?.properties[key] === 'string'
                                        ?   <div class="field-container checkbox-container">
                                                <input id={key}
                                                    name={key}
                                                    checked={formValues().data[key] || null}
                                                    onInput={(e) => {
                                                        setIsError(false);
                                                        setFormValues((prev) => {
                                                            return {
                                                                ...prev,
                                                                "data": {
                                                                    ...formValues().data,
                                                                    [key]: e.currentTarget.value
                                                                }
                                                            }
                                                        });
                                                    }} 
                                                    type="checkbox"
                                                    class="checkbox-container" />
                                                <label for={key}>{key}</label>
                                            </div>
                                        :   getSchemaForSubject(props.content.schemaId)?.properties[key] === 'number'
                                        ?   <div class="field-container">
                                            <label for={key}>{key}</label>
                                            <input type="number" 
                                                    id={key} 
                                                    name={key}
                                                    placeholder="Enter number here"
                                                    class="input-container"
                                                    value={formValues().data[key] || null} 
                                                    onInput={(e) => {
                                                        setIsError(false);
                                                        setFormValues((prev) => {
                                                            return {
                                                                ...prev,
                                                                "data": {
                                                                    ...formValues().data,
                                                                    [key]: e.currentTarget.value
                                                                }
                                                            }
                                                        });
                                                    }}
                                                    required
                                                    autocomplete="off" />
                                            </div>
                                        :   <div class="field-container">
                                                <label for={key}>{key}</label>
                                                <div class="textarea-container">
                                                    <textarea 
                                                        id={key} 
                                                        name={key}
                                                        value={formValues().data[key] || null} 
                                                        onInput={(e) => {
                                                            setIsError(false);
                                                            setFormValues((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    "data": {
                                                                        ...formValues().data,
                                                                        [key]: JSON.parse(e.currentTarget.value)
                                                                    }
                                                                }
                                                            });
                                                        }}
                                                        placeholder="Enter JSON here"
                                                        onkeydown={handleKeyDown}
                                                        spellcheck={false}
                                                        autocomplete="off"
                                                        rows={8}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                })}
                                <div class="field-container">
                                    <label for="subject">Subject DID</label>
                                    <input type="text" 
                                        id="subject" 
                                        name="subject"
                                        placeholder="did:xxx:xxxxxx" 
                                        class="input-container"
                                        value={formValues().subject} 
                                        onInput={handleInput}
                                        spellcheck={false}
                                        required
                                        autocomplete="off" />
                                </div>
                                <h3>Evidence</h3>
                                <EvidenceForm formValues={formValues} setFormValues={setFormValues} store={store} setIsError={setIsError}/>

                                <h3>Credential Status</h3>
                                <RadioCardSet 
                                    handleEvent={(e) => {
                                        setIsError(false);
                                        setFormValues((prev) => {
                                            return {
                                                ...prev,
                                                "credentialStatus": e.currentTarget.value
                                            }
                                        });
                                    }} 
                                    name="credentialStatus" 
                                    description="A verifiable credential's status can either be suspendable, revocable, or none. Choose none if this credential should never be suspended or revoked."
                                    legend="How should this credential be treated?" 
                                    options={
                                        [
                                            {
                                                value: "credentialStatus-none", 
                                                label: "None",
                                            }, 
                                            {
                                                value: "suspendable", 
                                                label: "Suspendable",
                                            }, 
                                            {
                                                value: "revocable", 
                                                label: "Revocable",
                                            }
                                        ]
                                    }
                                    activeSelection={formValues().credentialStatus} 
                                />
                                <h3>Expiry</h3>
                                <div class="field-container checkbox-container">
                                    <input id="expires"
                                        name="expires"
                                        checked={formValues().expires}
                                        onInput={handleInput}
                                        type="checkbox"
                                        class="checkbox-container" />
                                    <label for="expires">Set an expiry date for this credential</label>
                                </div>
                                {formValues().expires && <div class="field-container">
                                    <label for="expiry">Expiry date</label>
                                    <input id="expiry"
                                        name="expiry"
                                        value={formValues().expiry}
                                        onInput={handleInput} 
                                        type="datetime-local"
                                        class="input-container" />
                                </div>}

                                <h3>Issuer</h3>
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
                                    🎉 Successfully issued credential
                                </div>
                                <div class="button-row"> 
                                    <button class="secondary-button" type="button" onClick={() => { closeModal(); navigate(`/credentials/history/${credentialId()}`)}}>
                                        Done
                                    </button>
                                </div>
                            </>
                        )}
        </Dialog>
    )
}

export default IssueModal;

export const getSchemaForSubject = (schemaId) => {
    if (store.schemas?.length) {
        const schema = store.schemas.find(({schema}) => schema && (schema["$id"]?.endsWith(schemaId) || schema["id"]?.endsWith(schemaId)));
        if (schema) {
            const { $id, $schema, description, name, ...properties } = schema.schema;
            return {
                properties,
                meta: {
                    $id, 
                    $schema, 
                    description, 
                    name
                }
            }
        }
    }
    return null
}