import { Component } from "solid-js";
import "./Panel.scss";
import Icon, { ChevronDown } from "../../icons/Icon";

export interface PanelContent {
    id?,
    title,
    description?,
    action?,
    listItems,
    body?,
    buttons?,
    footer?,
}

const Panel: Component<{ content: PanelContent }> = (props) => {
    return (
        <section class="panel" id={props.content.id}>
            <div class="panel-header">
                <div>
                    <h2>{props.content.title}</h2>
                    {props.content.description && 
                        <p>{props.content.description}</p>
                    }
                </div>
                {props.content.action && 
                    <div class="panel-header-action">
                        <button class="primary-button">
                            {props.content.action}
                        </button>
                    </div>
                }
            </div>
            <ul>
                {props.content.listItems && props.content.listItems.map(listItem => 
                    <li class="panel-row">
                        <details>
                            <summary class="panel-row-header">
                                <div class="panel-row-header-data">
                                    {Object.keys(listItem).map(key => 
                                        <p classList={{
                                            "chip": key === 'tag',
                                            "chip-danger": key === 'tag' && listItem[key].toLowerCase() === 'unverified',
                                            "chip-success": key === 'tag' && listItem[key].toLowerCase() === 'verified',
                                            "chip-warn": key === 'tag' && listItem[key].toLowerCase() === 'pending',
                                        }}>{listItem[key]}</p>
                                    )}
                                </div>
                                <div class="panel-row-header-action">
                                    <Icon svg={ChevronDown} />
                                </div>
                            </summary>
                            <div class="panel-row-body">
                                {props.content.body}

                                {props.content.buttons &&
                                    <div class="panel-row-body-button-row">
                                        {props.content.buttons.map(button => 
                                            <button 
                                                class={button.className}
                                                onclick={() => button.onclick(listItem)}> 
                                                {button.label} 
                                            </button>
                                        )}
                                    </div>
                                }
                            </div>
                        </details>
                    </li>
                )}
            </ul>
            <div class="panel-footer">
                {props.content.footer}
            </div>
        </section>
    )
}

export default Panel;