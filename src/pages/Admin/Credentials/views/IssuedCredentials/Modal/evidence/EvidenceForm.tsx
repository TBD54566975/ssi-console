import { Component, createSignal } from "solid-js";
import { EvidenceScheme } from './schemes';
import Icon, { ArrowUpDown } from "@/icons/Icon";
import RadioCardSet from "@/components/RadioCardSet/RadioCardSet";


const EvidenceForm: Component<{formValues, setFormValues, store, setIsError}> = (props) => {
    return (
        <>
            <RadioCardSet 
                handleEvent={(e) => {
                    props.setIsError(false);
                    props.setFormValues((prev) => {
                        return {
                            ...prev,
                            evidence: {
                                ...prev.evidence,
                                "verificationMethod": e.currentTarget.value
                            }
                        }
                    });
                }} 
                name="verificationMethod" 
                description="A verifiable credential can have an evidence property that informs a verifier of how subject data or claims were verified."
                legend="How were these claims verified?" 
                options={
                    [
                        {
                            value: "verificationMethod-none", 
                            label: "None",
                        }, 
                        {
                            value: "physical", 
                            label: "In-person",
                        }, 
                        {
                            value: "virtual", 
                            label: "Virtually",
                        }
                    ]
                }
                activeSelection={props.formValues().evidence.verificationMethod} 
            />
            { props.formValues().evidence.verificationMethod !== "verificationMethod-none" && (
                <>
                    <div class="field-container">
                        <label for="id">Where is the supporting documentation stored?</label>
                        <input type="text" 
                            id="id" 
                            name="id"
                            placeholder="URL of the resource" 
                            class="input-container"
                            oninput={(e) => {
                                props.setIsError(false);
                                props.setFormValues((prev) => {
                                    return {
                                        ...prev,
                                        evidence: {
                                            ...prev.evidence,
                                            id: e.currentTarget.value
                                        }
                                    }
                                });
                            }}
                            value={props.formValues().evidence.id} 
                            spellcheck={false}
                            required
                            autocomplete="off" />
                    </div>
                    <div class="field-container">
                        <label for="documentType">What is the type of document?</label>
                        <input type="text" 
                            id="documentType" 
                            name="documentType"
                            placeholder="Passport, Driver's License, ID Card..." 
                            class="input-container"
                            oninput={(e) => {
                                props.setIsError(false);
                                props.setFormValues((prev) => {
                                    return {
                                        ...prev,
                                        evidence: {
                                            ...prev.evidence,
                                            documentType: e.currentTarget.value
                                        }
                                    }
                                });
                            }}
                            value={props.formValues().evidence.documentType} 
                            spellcheck={false}
                            required
                            autocomplete="off" />
                    </div>
                    <div class="field-container">
                        <label for="documentNumber">Document Number</label>
                        <input type="text" 
                            id="documentNumber" 
                            name="documentNumber"
                            placeholder="0000-0000" 
                            class="input-container"
                            oninput={(e) => {
                                props.setIsError(false);
                                props.setFormValues((prev) => {
                                    return {
                                        ...prev,
                                        evidence: {
                                            ...prev.evidence,
                                            documentNumber: e.currentTarget.value
                                        }
                                    }
                                });
                            }}
                            value={props.formValues().evidence.documentNumber} 
                            spellcheck={false}
                            required
                            autocomplete="off" />
                    </div>
                    <div class="field-container">
                        <label for="verifier">Who verified the document?</label>
                        <div class="select-container">
                            <select 
                            id="verifier" 
                            name="verifier"
                                value={props.formValues().evidence.verifier} 
                                oninput={(e) => {
                                    props.setIsError(false);
                                    props.setFormValues((prev) => {
                                        return {
                                            ...prev,
                                            evidence: {
                                                ...prev.evidence,
                                                verifier: e.currentTarget.value
                                            }
                                        }
                                    });
                                }}
                                required
                            >
                                {Object.values(props.store.user) && Object.values(props.store.user).map(issuer => 
                                    <option value={issuer["did"]}>{issuer["did"]}</option>
                                )}
                            </select>
                            <Icon svg={ArrowUpDown} />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default EvidenceForm;
