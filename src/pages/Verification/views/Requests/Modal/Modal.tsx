import { Component, createSignal, onCleanup } from "solid-js";
import "./Modal.scss";
import Icon, { ArrowUpDown, Beaker, DangerAlert, XCross } from "../../../../../icons/Icon";
import { formatTextAreaOnKeyDown, insertSampleInput, submitForm, updateFormOnInput } from "../../../../../utils/helpers";

const Modal: Component<{ content }> = (props) => {
    //pass in these props
    let endpoint = '/v1/presentation/definition';
    let method = 'POST';

    const requestInput = {
        "author": "",
        "authorKid": "",
        "format": {
          "jwt_vp": {
            "alg": [
                "EdDSA"
            ]
          },
        },
        "inputDescriptors": [
          {
            "constraints": {
              "fields": [
                {
                  "filter": {
                    "additionalProperties": true,
                    "allOf": null,
                    "const": null,
                    "enum": [
                      null
                    ],
                    "exclusiveMaximum": null,
                    "exclusiveMinimum": null,
                    "format": "",
                    "maxLength": 0,
                    "maximum": null,
                    "minLength": 0,
                    "minimum": null,
                    "not": null,
                    "oneOf": null,
                    "pattern": "",
                    "properties": null,
                    "required": [
                      ""
                    ],
                    "type": ""
                  },
                  "id": "",
                  "intent_to_retain": true,
                  "name": "",
                  "optional": true,
                  "path": [
                    ""
                  ],
                  "predicate": "",
                  "purpose": ""
                }
              ],
              "is_holder": [
                {
                  "directive": "",
                  "field_id": [
                    ""
                  ]
                }
              ],
              "limit_disclosure": "",
              "same_subject": [
                {
                  "directive": "",
                  "field_id": [
                    ""
                  ]
                }
              ],
              "statuses": {
                "active": {
                  "directive": ""
                },
                "revoked": {
                  "directive": ""
                },
                "suspended": {
                  "directive": ""
                }
              },
              "subject_is_issuer": ""
            },
            "format": {
              "jwt": {
                "alg": [
                  ""
                ]
              },
              "jwt_vc": {
                "alg": [
                  ""
                ]
              },
              "jwt_vp": {
                "alg": [
                  ""
                ]
              },
              "ldp": {
                "proof_type": [
                  ""
                ]
              },
              "ldp_vc": {
                "proof_type": [
                  ""
                ]
              },
              "ldp_vp": {
                "proof_type": [
                  ""
                ]
              }
            },
            "group": [
              ""
            ],
            "id": "",
            "name": "",
            "purpose": ""
          }
        ],
        "name": "",
        "purpose": "",
        "submissionRequirements": [
          {
            "count": 1,
            "from": "",
            "from_nested": [
              {}
            ],
            "max": 0,
            "min": 0,
            "name": "",
            "purpose": "",
            "rule": ""
          }
        ]
    }

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
        return formValues().json.trim() !== '' && !isError();
    }

    //populate textarea field with sample input
    const populateSampleInput = (event) => {
        const setters = { setIsError, setFormValues };
        insertSampleInput(event, setters, 'json', requestInput);
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
                    <form onSubmit={handleSubmit}>
                        {!isLoading() && !isSuccess() && (
                            <>
                                {isError() && 
                                    <div class="banner banner-danger">
                                        <Icon svg={DangerAlert} />
                                        Error creating DID. Try again
                                    </div> 
                                }
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
                                        <button class="tiny-ghost-button" onclick={populateSampleInput}>
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