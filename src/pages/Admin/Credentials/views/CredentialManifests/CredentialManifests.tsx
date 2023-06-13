import { Component, createEffect, createSignal } from "solid-js";
import "./CredentialManifests.scss";
import Icon, { ExternalArrow, Plus } from "@/icons/Icon";
import Modal from "./Modal/Modal";
import { useNavigate } from "@solidjs/router";
import IssueModal from "./Details/IssueModal/IssueModal";
import { store } from "@/utils/store";

const CredentialManifests: Component = () => {
    const navigate = useNavigate();
    const [ manifests, setManifests ] = createSignal(transformManifests(store.manifests));
    
    createEffect(() => {
        const storeManifests = store.manifests;
        setManifests(transformManifests(storeManifests));
    })
    
    return (
        <section class="item-panel">
            <Modal content={{
                button: {
                    className: "item-panel-card card-create-new",
                    label: <> <Icon svg={Plus} /> <p>Create new</p> </>
                }
            }} />
            {manifests() && manifests().map(manifest => 
                <div class="item-panel-card">
                    <div>
                        <div class="item-panel-card-header">
                            <div class="item-panel-card-header-icon" data-icon={manifest.name?.[0]}></div>
                            <p class="item-panel-card-header-title">
                                {manifest.name}
                            </p>
                        </div>
                        <p class="item-panel-card-body">
                            {manifest.description}
                        </p>
                    </div>
                    <div>
                        <a class="item-panel-card-link" href={`${location.origin}/apply/${manifest.id}`} target="_blank">
                            Application URL <Icon svg={ExternalArrow} />
                        </a>
                        <IssueModal content={{
                            button: {
                                className: "item-panel-card-button secondary-button",
                                label: "Issue"
                            },
                            manifestId: manifest.id,
                            schemaId: manifest.schemaId
                        }} />
                        <button onClick={() => navigate(`${manifest.id}?schema=${manifest.schemaId}`)}
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
    if (manifests) { 
        return Object.values(manifests).map((manifest: { credential_manifest }) => {
            const { credential_manifest } = manifest;
            return {
                name: credential_manifest.name,
                description: credential_manifest.description,
                id: credential_manifest.id,
                schemaId: credential_manifest.output_descriptors[0].schema,
                issuer: credential_manifest.issuer
            }
        })
    }
    return [];
}