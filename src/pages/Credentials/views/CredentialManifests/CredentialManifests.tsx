import { Component } from "solid-js";
import "./CredentialManifests.scss";
import Icon, { Plus } from "../../../../icons/Icon";

const CredentialManifests: Component = () => {
    return (
        <section class="item-panel">
            <button class="item-panel-card card-create-new">
                <Icon svg={Plus} />
                <p>Create new</p>
            </button>
            {credentials && credentials.map(credential => 
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
                            Issue
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

export default CredentialManifests;

const credentials = [
    {
        name: "KYC Credential",
        description: "Credential proving the subject has passed KYC with our organization",
    },
    {
        name: "LLC Credential",
        description: "Credential proving the subject is a registered LLC in good standing within our organization",
    },
    {
        name: "Learning Degree",
        description: "Credential proving the subject is a graduate of our organization's learning curriculum",
    },
    {
        name: "Course 1 Graduate",
        description: "Credential proving the subject passed Course 1 of our organization's learning curriculum",
    },
]