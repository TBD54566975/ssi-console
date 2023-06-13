import { Component } from "solid-js";
import "./Details.scss";
import "@components/Panel/Panel.scss";
import IssueModal, { getSchemaForSubject } from "./IssueModal/IssueModal";
import { useNavigate, useParams, useSearchParams } from "@solidjs/router";
import { store } from "@/utils/store";
import Icon, { ExternalArrow } from "@/icons/Icon";
import { deleteManifestFromStore, hydrateManifestStore } from "@/utils/setup";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import TBDLogoSquare from "@assets/tbd-logo-square.svg";

const Details: Component<{ credential }> = (props) => {
    const params = useParams<{ id }>();
    const [searchParams] = useSearchParams<{ schema, issuer }>();
    const navigate = useNavigate();

    const { credential_manifest } = store.manifests.find(manifest =>  manifest.id === params.id);
    const schema = getSchemaForSubject(credential_manifest.output_descriptors[0].schema);
    const schemaData = schema?.properties;
    const schemaMeta = schema?.meta;

    let confirmDialog;
    const confirmDelete = async (item) => {
        await deleteManifestFromStore(item.id);
        await hydrateManifestStore();
        confirmDialog.close();
        navigate('/credentials', { replace: true });
    }

    return (
        <div class="details-page">
            <div class="details-container">
                <section class="render-panel">
                    <div class="details-page-hero-card"
                        style={{
                            background: credential_manifest.output_descriptors.styles?.background.color || credential_manifest.issuer.styles?.background.color,
                            color: credential_manifest.output_descriptors.styles?.text.color || credential_manifest.issuer.styles?.text.color
                        }}>
                        <div class="details-page-hero-card-content">
                            <div class="details-page-hero-card-content-thumbnail">
                                <img src={credential_manifest.output_descriptors.styles?.thumbnail.url || TBDLogoSquare} alt={credential_manifest.output_descriptors.styles?.thumbnail.alt || "Generic abstract credential thumbnail image"} />
                            </div>
                            <div class="details-page-hero-card-content-hero details-page-hero-card-full-width">
                                <img src={credential_manifest.output_descriptors.styles?.hero.url || TBDLogoSquare} alt={credential_manifest.output_descriptors.styles?.hero.alt || "Generic abstract credential hero image"} />
                            </div>
                        </div>
                        <div class="details-page-hero-card-content">
                            <div class="details-page-hero-card-content-header">{credential_manifest.name}</div>
                            <div class="details-page-hero-card-content-body">Verifiable Credential</div>
                        </div>
                    </div>
                </section>
                <section class="details-page-hero panel">
                    <div class="details-page-hero-content">
                        <h1>{credential_manifest.name}</h1>
                        <p class="details-description">{credential_manifest.description}</p>
                        <p>
                            <a class="item-panel-card-link" href={`${location.origin}/apply/${credential_manifest.id}`} target="_blank">
                                Application URL <Icon svg={ExternalArrow} />
                            </a>
                        </p>
                        <div class="entry-container">
                            <div class="entry-row">
                                <div class="key-entry">Template ID</div>
                                <div class="value-entry">
                                    <p>{credential_manifest.id}</p>
                                </div>
                            </div>
                            <div class="entry-row">
                                <div class="key-entry">Issuer</div>
                                <div class="value-entry">
                                    <p>{credential_manifest.issuer.name}</p>
                                    <p>{credential_manifest.issuer.id}</p>
                                </div>
                            </div>
                        </div>
                        <div class="details-page-hero-content-actions button-row">
                            <IssueModal content={{
                                button: {
                                    className: "secondary-button",
                                    label: "Issue"
                                },
                                manifestId: params.id,
                                schemaId: searchParams.schema
                            }} />
                            <button class="danger-button" onClick={() => confirmDialog.showModal()}>Delete</button>
                        </div>
                        <ConfirmationModal 
                            ref={confirmDialog}
                            onCancel={() => confirmDialog.close()}
                            onConfirm={() => confirmDelete(credential_manifest)}
                            message={"Are you sure you want to delete this credential? This action is irreversible."}
                            cancelMessage={"No, cancel"}
                            confirmMessage={"Yes, delete"}
                            />
                    </div>
                </section>
                <section class="panel">
                    <div class="panel-header">
                        <h2>Details</h2>
                    </div>
                    <div class="entry-container panel-body">
                        {schemaMeta && Object.entries(schemaMeta).map(entry => {
                            return (
                                <div class="entry-row">
                                    <div class="key-entry">{entry[0]}</div>
                                    <div class="value-entry">
                                        <p>{JSON.stringify(entry[1], null, 2)}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
                <section class="panel">
                    <div class="panel-header">
                        <h2>Data</h2>
                    </div>
                    <div class="entry-container panel-body">
                        {schemaData && Object.entries(schemaData).map(entry => {
                            return (
                                <div class="entry-row">
                                    <div class="key-entry">{entry[0]}</div>
                                    <div class="value-entry">
                                        <p>{JSON.stringify(entry[1], null, 2)}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
                <section class="panel">
                    <div class="panel-header">
                        <h2>Requirements</h2>
                    </div>
                    <div class="entry-container panel-body">
                        {credential_manifest.presentation_definition && Object.entries(credential_manifest.presentation_definition).map(entry => {
                            return (
                                <div class="entry-row">
                                    <div class="key-entry">{entry[0]}</div>
                                    <div class="value-entry">
                                        <p>{JSON.stringify(entry[1], null, 2)}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Details;