import { Component } from "solid-js";
import "./Requests.scss";
import Icon, { ExternalArrow, Plus } from "../../../../icons/Icon";
import Modal from "./Modal/Modal";
import { useNavigate } from "@solidjs/router";
import { store } from "../../../../utils/store";

const Requests: Component = () => {
    const navigate = useNavigate();
    return (
        <section class="item-panel">
            <Modal content={{
                button: {
                    className: "item-panel-card card-create-new",
                    label: <> <Icon svg={Plus} /> <p>Create new</p> </>
                }
            }} />
            {store.definitions && transformDefinitions(store.definitions).map(definition => 
                <div class="item-panel-card">
                    <div>
                        <div class="item-panel-card-header">
                            <div class="item-panel-card-header-icon" data-icon={definition.name[0]}></div>
                            <p class="item-panel-card-header-title">
                                {definition.name}
                            </p>
                        </div>
                        <p class="item-panel-card-body">
                            {definition.purpose}
                        </p>
                    </div>
                    <div>
                        <a class="item-panel-card-link" href={`${location.origin}/submit/${definition.id}`} target="_blank">
                            Submission URL <Icon svg={ExternalArrow} />
                        </a>
                        <button onClick={() => navigate(definition.id)}
                            class="item-panel-card-button secondary-button">
                            Details
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Requests;

const transformDefinitions = (definitions) => {
    return Object.values(definitions).map((definition: { name, purpose, id }) => {
        return {
            name: definition.name,
            purpose: definition.purpose,
            id: definition.id
        }
    })
}