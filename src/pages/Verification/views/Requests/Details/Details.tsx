import { Component } from "solid-js";
import "./Details.scss";
import "../../../../../components/Panel/Panel.scss";
import { credentialOutput } from "./samples/mock";
import { useParams, useSearchParams, useNavigate } from "@solidjs/router";
import ConfirmationModal from "../../../../../components/ConfirmationModal/ConfirmationModal";
import Icon, { ExternalArrow } from "../../../../../icons/Icon";
import { deleteDefinitionFromStore, deleteManifestFromStore, hydrateDefinitionStore, hydrateManifestStore } from "../../../../../utils/setup";
import { store } from "../../../../../utils/store";
import IssueModal from "../../../../Credentials/views/CredentialManifests/Details/IssueModal/IssueModal";

const Details: Component<{ request }> = (props) => {
    const params = useParams<{ id }>();
    const navigate = useNavigate();

    const presentation_definition = store.definitions.find(definition =>  definition.id === params.id);

    let confirmDialog;
    const confirmDelete = async (item) => {
        await deleteDefinitionFromStore(item.id);
        await hydrateDefinitionStore();
        confirmDialog.close();
        navigate('/credentials', { replace: true });
    }

    return (
        <div class="details-page">
            <div class="details-container">
                <section class="details-page-hero panel">
                    <div class="details-page-hero-content">
                        <h1>{presentation_definition.name}</h1>
                        <p class="details-description">{presentation_definition.purpose}</p>
                        <p>
                            <a class="item-panel-card-link" href={`${location.origin}/submit/${presentation_definition.id}`} target="_blank">
                                Submission URL <Icon svg={ExternalArrow} />
                            </a>
                        </p>
                        <div class="details-page-hero-content-actions button-row">
                            <button class="danger-button" onClick={() => confirmDialog.showModal()}>Delete</button>
                        </div>
                        <ConfirmationModal 
                            ref={confirmDialog}
                            onCancel={() => confirmDialog.close()}
                            onConfirm={() => confirmDelete(presentation_definition)}
                            message={"Are you sure you want to delete this credential? This action is irreversible."}
                            cancelMessage={"No, cancel"}
                            confirmMessage={"Yes, delete"}
                            />
                    </div>
                </section>
                <div></div>
                <section class="panel">
                    <div class="panel-header">
                        <h2>Details</h2>
                    </div>
                    <div class="entry-container panel-body">
                        {presentation_definition && Object.entries(presentation_definition).map(entry => {
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