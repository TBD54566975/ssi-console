import { Component } from "solid-js";
import "./Requests.scss";
import Icon, { Plus } from "../../../../icons/Icon";

const Requests: Component = () => {
    return (
        <section class="item-panel">
            <button class="item-panel-card card-create-new">
                <Icon svg={Plus} />
                <p>Create new</p>
            </button>
            {requests && requests.map(credential => 
                <div class="item-panel-card">
                    <div>
                        <div class="item-panel-card-header">
                            <div class="item-panel-card-header-icon" data-icon={credential.name[0]}></div>
                            <p class="item-panel-card-header-title">
                                {credential.name}
                            </p>
                        </div>
                        <p class="item-panel-card-body">
                            {credential.description}
                        </p>
                    </div>
                    <div>
                        <button class="item-panel-card-button secondary-button">
                            🔗 Submission URL
                        </button>
                        <button class="item-panel-card-button secondary-button">
                            Details
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Requests;

const requests = [
    {
        name: "Proof of KYC",
        description: "Request for a credential proving subject passed KYC",
    },
    {
        name: "Proof of Course 1",
        description: "Request for a credential proving subject passed Course 1",
    },
    {
        name: "Proof of Course 2",
        description: "Request of proof that subject passed Course 2",
    },
]