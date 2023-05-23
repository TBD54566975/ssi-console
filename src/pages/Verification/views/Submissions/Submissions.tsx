import { Component } from "solid-js";
import Panel from "../../../../components/Panel/Panel";
import { store } from "../../../../utils/store";
import { submissions } from "./samples/mocks";

const Submissions: Component = () => {
    const content = {
        "for-review": {
            id: "for-review",
            title: "For Review",
            listItems: transformSubmissions(store.submissions),
            fallback: "You have no new Submissions to review, so there's nothing here.",
            buttons: [
                {
                    label: "Accept",
                    className: "secondary-button",
                    onClick: () => console.log('edited', "all")
                },
                {
                    label: "Decline",
                    className: "danger-button",
                    onClick: (item) => console.log('archived', "all", item)
                }
            ]
        },
        declined: {
            id: "declined",
            title: "Declined",
            listItems: [],
            fallback: "You haven't declined any Submissions yet, so there's nothing here.",
            buttons: [
                {
                    label: "Delete forever",
                    className: "danger-button",
                    onClick: () => console.log('reinstated ', "reinstate")
                },
            ]
        }
    }
    return (
        <>
            {Object.keys(content).map(key => 
                <Panel content={content[key]} />
            )}
        </>
    )
}

export default Submissions;

const transformSubmissions = (submissions) => {
    return Object.values(submissions).map((submission: { verifiablePresentation, status, }) => {
        return {
            name: `****-${submission.verifiablePresentation.id.slice(-4)}`,
            id: store.definitions.find(definition => definition.id === submission.verifiablePresentation.presentation_submission.definitionID)?.name,
            type: submission.status
        }
    })
}