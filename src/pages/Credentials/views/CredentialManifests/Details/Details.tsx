import { Component } from "solid-js";
import "./Details.scss";
import "../../../../../components/Panel/Panel.scss";
import { credentialOutput } from "./samples/mock";
import IssueModal from "./IssueModal/IssueModal";

const Details: Component<{ credential }> = (props) => {
    const { credential_manifest } = credentialOutput;
    return (
        <div class="details-page">
            <section class="details-page-hero panel">
                <div class="details-page-hero-content">
                    <h1>credname //{credential_manifest.name}</h1>
                    <p>cred link mysite.com/12345678 //</p>
                    <p>credid //{credential_manifest.id}</p>
                    <p>Issuing from issuername// {credential_manifest.issuer.name}</p>
                    <p>issuerdid // {credential_manifest.issuer.id}</p>
                    <div class="details-page-hero-content-actions button-row">
                        <IssueModal content={{
                            button: {
                                className: "secondary-button",
                                label: "Issue"
                            }
                        }} />
                        <button class="danger-button">Delete</button>
                    </div>
                </div>
                <div class="details-page-hero-card">
                    <div class="details-page-hero-card-content"
                        style={{
                            background: credential_manifest.issuer.styles.background.color,
                            color: credential_manifest.issuer.styles.text.color
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