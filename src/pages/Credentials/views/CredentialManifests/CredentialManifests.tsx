import { Component } from "solid-js";
import "./CredentialManifests.scss";
import Icon, { ExternalArrow, Plus } from "../../../../icons/Icon";
import Modal from "./Modal/Modal";
import { useNavigate } from "@solidjs/router";
import IssueModal from "./Details/IssueModalJson/IssueModalJson";

const CredentialManifests: Component = () => {
    const navigate = useNavigate();
    const credentialId = '123';
    return (
        <section class="item-panel">
            <Modal content={{
                button: {
                    className: "item-panel-card card-create-new",
                    label: <> <Icon svg={Plus} /> <p>Create new</p> </>
                }
            }} />
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
                        <a class="item-panel-card-link" href={`${location.host}/apply/${credentialId}`}>
                            Application URL <Icon svg={ExternalArrow} />
                        </a>
                        <IssueModal content={{
                            button: {
                                className: "item-panel-card-button secondary-button",
                                label: "Issue"
                            }
                        }} />
                        <button onClick={() => navigate(credentialId)}
                            class="item-panel-card-button secondary-button">
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