import { Component, For, JSX } from "solid-js";

 const RadioCardSet: Component<{
    handleEvent?,
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
    optional?: boolean,
    activeSelection?
    }> = (props) => {
    return (
        <div class="field-container">
            <fieldset class="radio-card-set">
                <legend class="field-heading">
                    <label>{props.legend} {props.optional && "(Optional)"}</label>
                </legend>
                {props.description && <p class="modal-input-note">{props.description}</p>}
                <div class="radio-card-options">
                    <For each={props.options}>
                        {(option) => 
                            <div class="radio-container">
                                <input required={!props.optional} checked={option.value === props.activeSelection} oninput={props.handleEvent} type="radio" name={props.name} id={option.value} value={option.value} disabled={option.disabled}/>
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
                </div>
            </fieldset>
        </div>

    )
}

export default RadioCardSet;