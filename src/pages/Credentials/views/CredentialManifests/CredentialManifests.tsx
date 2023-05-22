import { Component } from "solid-js";
import "./CredentialManifests.scss";
import Icon, { ExternalArrow, Plus } from "../../../../icons/Icon";
import Modal from "./Modal/Modal";
import { useNavigate } from "@solidjs/router";
import IssueModal from "./Details/IssueModal/IssueModal";
import { manifests } from "./samples/mocks";
import { store } from "../../../../utils/store";

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
            {store.manifests && transformManifests(manifests).map(credential => 
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
                        <a class="item-panel-card-link" href={`${location.origin}/apply/${credentialId}`} target="blank">
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

const transformManifests = (manifests) => {
    return Object.values(manifests).map((manifest: { credential_manifest }) => {
        const { credential_manifest } = manifest;
        return {
            name: credential_manifest.name,
            description: credential_manifest.description

        }
    })
}