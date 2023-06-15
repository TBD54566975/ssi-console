import { Component, createSignal } from "solid-js";
import "./Details.scss";
import "@/components/Panel/Panel.scss";
import { useNavigate, useParams, useSearchParams } from "@solidjs/router";
import { store } from "@/utils/store";
import Icon, { ExternalArrow } from "@/icons/Icon";
import { deleteManifestFromStore, hydrateManifestStore, updateCredentialStatusInStore } from "@/utils/setup";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import TBDLogoSquare from "@/assets/tbd-logo-square.svg";
import TBDWordmark from "@/assets/tbd-wordmark.svg";
import Editor from "@/utils/editor";
import { getSchemaForSubject } from "../../CredentialManifests/Details/IssueModal/IssueModal";

const Details: Component<{ credential }> = (props) => {
    const params = useParams<{ id }>();
    const navigate = useNavigate();

    const { credential, ...credentialMeta } = store.credentials.find(credential => credential.id.endsWith(params.id));
    const { id: subjectId, ...subjectData } = credential.credentialSubject;
    const schema = getSchemaForSubject(credential.credentialSchema.id);
    const issuanceDate = new Date(credential.issuanceDate);

    const [ statusUpdate, setStatusUpdate ] = createSignal();
    
    let confirmDialog;
    const confirmStatusUpdate = async () => {
        await updateCredentialStatusInStore(params.id, statusUpdate());
        confirmDialog.close();
        navigate('/credentials/history#revoked', { replace: true });
    }


    const editor = Editor({
        readOnly: true,
        doc: JSON.stringify(credential, null, 2)
    });

    return (
        <div class="details-page">
            <div class="details-container">
            <section class="render-panel">
                    <div class="details-page-hero-card">
                        <div class="details-page-hero-card-content">
                            <div class="details-page-hero-card-content-hero details-page-hero-card-full-width">
                                <img src={TBDWordmark} alt={"Generic abstract credential hero image"} />
                            </div>
                            <div class="details-page-hero-card-content-thumbnail">
                                <img src={TBDLogoSquare} alt={"Generic abstract credential thumbnail image"} />
                            </div>
                            <div class="details-page-hero-card-content-info">
                                {subjectData && Object.entries(subjectData).map((entry: [string, string | number]) => {
                                    if (typeof entry[1] === "string" || typeof entry[1] === "number") {
                                        return (
                                            <div class="info-entry">
                                                <div class="info-entry-label">{entry[0]}</div>
                                                <div class="info-entry-data">{entry[1]}</div>
                                            </div>
                                        )
                                    }
                                })}
                                <div class="info-entry">
                                    <div class="info-entry-label">Issued on</div>
                                    <div class="info-entry-data">{issuanceDate.toLocaleDateString('en-US', { dateStyle: "medium" })}</div>
                                </div>
                            </div>
                        </div>
                        <div class="details-page-hero-card-content">
                            <div class="details-page-hero-card-content-header">{schema.meta.name}</div>
                            <div class="details-page-hero-card-content-body">Verifiable Credential</div>
                        </div>
                    </div>
                </section>
                
                <section class="details-page-hero panel">
                    <div class="details-page-hero-content">
                        <p class="eyebrow-label">
                            Issued Credential
                            { credentialMeta["suspended"]
                                ?   <span class="chip chip-warn">Suspended</span>
                                :   credentialMeta["revoked"]
                                ?   <span class="chip chip-danger">Revoked</span>
                                :   <span class="chip chip-success">Active</span>
                            }
                        </p>
                        <h1>{schema.meta.name}</h1>
                        <p class="details-description">Verifiable Credential</p>
                        <div class="details-page-hero-content-actions button-row">
                            { credentialMeta["suspended"]
                                ?   <button class="warn-button" onClick={() => { setStatusUpdate({ "suspended": false }); confirmDialog.showModal()}}>Reinstate</button>
                                :   credentialMeta["revoked"]
                                ?   null
                                :   <>
                                        <button class="warn-button" disabled={credential.credentialStatus?.statusPurpose !== "suspension"} onClick={() => { setStatusUpdate({ "suspended": true }); confirmDialog.showModal()}}>Suspend</button>
                                        <button class="danger-button" disabled={credential.credentialStatus?.statusPurpose !== "revocation"} onClick={() => { setStatusUpdate({ "revoked": true }); confirmDialog.showModal()}}>Revoke</button>
                                    </>
                            }
                        </div>
                        <ConfirmationModal 
                            ref={confirmDialog}
                            onCancel={() => confirmDialog.close()}
                            onConfirm={() => confirmStatusUpdate()}
                            message={
                                statusUpdate()?.["revoked"]
                                ? "Are you sure you want to revoke this credential? This action is irreversible."
                                : statusUpdate()?.["suspended"] === true
                                ? "Are you sure you want to suspend this credential?"
                                :"Are you sure you want to reinstate this credential?"
                            }
                            cancelMessage={"No, cancel"}
                            confirmMessage={
                                statusUpdate()?.["revoked"]
                                ? "Yes, revoke"
                                : statusUpdate()?.["suspended"] === true
                                ? "Yes, suspend"
                                : "Yes, reinstate"
                            }
                            />
                    </div>
                    {editor.dom}
                </section>
            </div>
        </div>
    )
}

export default Details;