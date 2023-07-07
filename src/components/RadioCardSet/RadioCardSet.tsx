import { Component, For, JSX } from "solid-js";

 const RadioCardSet: Component<{
    handleEvent?: JSX.EventHandlerUnion<HTMLInputElement, InputEvent>,
    name: string, 
    legend: string,  
    options: {
        value: string, 
        label: string, 
        description?: string, 
        imageSrc?: string, 
        disabled?: boolean, 
        footerLabel?: string, 
        selected?: boolean
    }[], 
    description?: string, 
    optional?: boolean
    }> = (props) => {
    return (
        <fieldset class="radio-card-set field-container">
            <legend class="field-heading">
                <label>{props.legend} {props.optional && "(Optional)"}</label>
            </legend>
            {props.description && <p class="modal-input-note">{props.description}</p>}
            <For each={props.options}>
                {(option) => 
                    <div class="radio-container">
                        <input required={!props.optional} checked={option.selected} oninput={props.handleEvent} type="radio" name={props.name} id={option.value} value={option.value} disabled={option.disabled}/>
                        <label for={option.value} class="radio-control">
                            <div class="radio-control-content">
                                {option.imageSrc && <img class="radio-card-image" src={option.imageSrc} alt="" />}
                                <div class="radio-control-body">
                                    <p class="radio-control-heading">{option.label}</p>
                                    {option.description && <p class="radio-card-description">{option.description}</p>}
                                    {option.footerLabel && <p class="radio-control-footer-label">{option.footerLabel}</p>}
                                </div>
                            </div>
                        </label>
                    </div>
                }
            </For>
        </fieldset>

    )
}

export default RadioCardSet;