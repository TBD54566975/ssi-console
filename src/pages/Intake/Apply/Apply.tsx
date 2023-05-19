import { Component } from "solid-js";
import "./Apply.scss";

const Apply: Component = () => {
    return (
        <div class="intake-page">
        <h1>Apply for verifiable credentials</h1>
        <section class="intake-page-section">
            <h2>Application details</h2>
            <p>Review the below JSON to ensure your application meets requirements.</p>
            <div class="field-container">
                <label for="json">JSON</label>
                <textarea class="textarea-container">details here</textarea>
            </div>
        </section>
        <section class="intake-page-section">
            <h2>Application instructions</h2>
            <p>Submit your application as a JSON.</p>
            <div class="field-container">
                <label for="json">JSON</label>
                <textarea class="textarea-container"></textarea>
            </div>
            <button class="primary-button">Send</button>
        </section>
    </div>
    )
}

export default Apply;