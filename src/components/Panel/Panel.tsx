import { Component, createSignal } from "solid-js";
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
    fallback?
}

const Panel: Component<{ content: PanelContent }> = (props) => {
    const [ query, setQuery ] = createSignal('');
    return (
        <section class="panel" id={props.content.id}>
            <div class="panel-header">
                <div>
                    <h2>{props.content.title}</h2>
                    {props.content.description && 
                        <p>{props.content.description}</p>
                    }
                </div>
                <div class="field-container">
                    <label for="search">Search</label>
                    <input type="search"
                        id="search" 
                        value={query()}
                        onInput={(e) => setQuery(e.currentTarget.value)}
                        />
                </div>
                {props.content.action && 
                    <div class="panel-header-action">
                        {props.content.action}
                    </div>
                }
            </div>
            {props.content.listItems.length ?
                <ul>
                    {props.content.listItems.map(listItem => 
                        <li class="panel-row">
                            <details>
                                <summary class="panel-row-header">
                                    <div class="panel-row-header-data">
                                        {Object.keys(listItem).map(key => {
                                            if (key === "body") return;
                                            if (key === "tag") {
                                                return <p class={`chip chip-${listItem[key].type}`}>{listItem[key].label}</p>
                                            } else if (key === "type") {
                                                return <p class="data-label">{listItem[key]}</p>
                                            } else {
                                                return <p>{listItem[key]}</p>
                                            }
                                        })}
                                    </div>
                                    <div class="panel-row-header-action">
                                        <Icon svg={ChevronDown} />
                                    </div>
                                </summary>
                                <div class="panel-row-body">
                                    {listItem.body}
                                    {props.content.buttons &&
                                        <div class="button-row">
                                            {props.content.buttons.map(button => 
                                                <button 
                                                    class={button.className}
                                                    onClick={() => button.onClick(listItem)}> 
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
                :
                <div class="panel-default">
                    <p>{props.content.fallback}</p>
                </div>
            }
            <div class="panel-footer">
                <div>
                    {props.content.footer}
                </div>
                {props.content.listItems.length > 6 && 
                    <div class="panel-footer-buttons">
                        <button class="secondary-button" disabled={true}>Prev</button>
                        Page 1
                        <button class="secondary-button">Next</button>
                    </div>
                }
            </div>
        </section>
    )
}

export default Panel;