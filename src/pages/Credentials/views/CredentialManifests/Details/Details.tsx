import { Component } from "solid-js";
import "./Details.scss";
import "../../../../../components/Panel/Panel.scss";
import { credentialOutput } from "./samples/mock";
import IssueModal from "./IssueModal/IssueModal";
import { useLocation, useParams, useSearchParams } from "@solidjs/router";
import { store } from "../../../../../utils/store";
import Icon, { ExternalArrow } from "../../../../../icons/Icon";

const Details: Component<{ credential }> = (props) => {
    const params = useParams<{ id }>();
    const [searchParams] = useSearchParams<{ schema, issuer }>();

    const { credential_manifest } = store.manifests.find(manifest =>  manifest.id === params.id);
    console.log(credential_manifest);

    return (
        <div class="details-page">
            <section class="details-page-hero panel">
                <div class="details-page-hero-content">
                    <h1>{credential_manifest.name}</h1>
                    <p>
                        <a class="item-panel-card-link" href={`${location.origin}/apply/${credential_manifest.id}`} target="_blank">
                            Application URL <Icon svg={ExternalArrow} />
                        </a>
                    </p>
                    <p>{credential_manifest.id}</p>
                    <p>{credential_manifest.issuer.name}</p>
                    <p>{credential_manifest.issuer.id}</p>
                    <div class="details-page-hero-content-actions button-row">
                        <IssueModal content={{
                            button: {
                                className: "secondary-button",
                                label: "Issue"
                            },
                            manifestId: params.id,
                            schemaId: searchParams.schema
                        }} />
                        <button class="danger-button">Delete</button>
                    </div>
                </div>
                <div class="details-page-hero-card">
                    <div class="details-page-hero-card-content"
                        style={{
                            background: credential_manifest.issuer.styles?.background.color,
                            color: credential_manifest.issuer.styles?.text.color
                        }}
                    >
                        <div class="details-page-hero-card-content-header">{credential_manifest.name}131231311231231</div>
                        <div class="details-page-hero-card-content-body">Verifiable Credential</div>
                    </div>
                </div>
            </section>
            <div class="details-container">
                <section class="panel">
                    <div class="panel-header">
                        <h2>Data</h2>
                    </div>
                    <ul>
                        <li class="panel-row">
                            <div class="panel-row-header">
                                schemaline 1
                            </div>
                        </li>
                        <li class="panel-row">
                            <div class="panel-row-header">
                                schemaline 2
                            </div>
                        </li>
                    </ul>
                </section>
                <section class="panel">
                    <div class="panel-header">
                        <h2>Requirements</h2>
                    </div>
                    <ul>
                        <li class="panel-row">
                            <div class="panel-row-header">
                                group # 1
                            </div>
                        </li>
                        <li class="panel-row">
                            <div class="panel-row-header">
                                group # 2
                            </div>
                        </li>
                    </ul>
                </section>
                <section class="panel">
                    <div class="panel-header">
                        <h2>Display</h2>
                    </div>
                    <ul>
                        <li class="panel-row">
                            <div class="panel-row-header">
                                description
                            </div>
                        </li>
                        <li class="panel-row">
                            <div class="panel-row-header">
                                properties
                            </div>
                        </li>
                        <li class="panel-row">
                            <div class="panel-row-header">
                                subtitle
                            </div>
                        </li>
                        <li class="panel-row">
                            <div class="panel-row-header">
                                title
                            </div>
                        </li>
                    </ul>
                </section>
                <section class="panel">
                    <div class="panel-header">
                        <h2>Styles</h2>
                    </div>
                    <ul>
                        <li class="panel-row">
                            <div class="panel-row-header">
                                background
                            </div>
                        </li>
                        <li class="panel-row">
                            <div class="panel-row-header">
                                hero
                            </div>
                        </li>
                        <li class="panel-row">
                            <div class="panel-row-header">
                                text
                            </div>
                        </li>
                        <li class="panel-row">
                            <div class="panel-row-header">
                                thumbnail
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default Details;