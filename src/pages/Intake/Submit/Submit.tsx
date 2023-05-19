import { Component } from "solid-js";
import "./Submit.scss";

const Submit: Component = () => {
    return (
        <div class="intake-page">
            <h1>Submit verifiable credentials</h1>
            <section class="intake-page-section">
                <h2>Submission details</h2>
                <p>Review the below JSON to ensure your submission meets requirements.</p>
                <div class="field-container">
                    <label for="json">JSON</label>
                    <textarea class="textarea-container">details here</textarea>
                </div>
            </section>
            <section class="intake-page-section">
                <h2>Submission instructions</h2>
                <p>Submit your VC as a JSON.</p>
                <div class="field-container">
                    <label for="json">JSON</label>
                    <textarea class="textarea-container"></textarea>
                </div>
                <button class="primary-button">Send</button>
            </section>
        </div>
    )
}

export default Submit;