import { Component } from "solid-js";
import "./Applications.scss";
import Panel from "../../../../../components/Panel/Panel";
import { store } from "../../../../../utils/store";
import { applications } from "./samples/mocks";

const Applications: Component = () => {
    const content = {
        incoming: {
            id: "incoming",
            title: "Incoming",
            listItems: transformApplications(store.applications),
            fallback: "You have no new Applications to review, so there's nothing here.",
            buttons: [
                {
                    label: "Approve",
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
            fallback: "You haven't declined any Applications yet, so there's nothing here.",
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

export default Applications;

const transformApplications = (applications) => {
    return Object.values(applications).map((vc_application: { application }) => {
        const { application } = vc_application;
        return {
            name: `****-${application.id.slice(-4)}`,
            id: Object.values(store.credentials).find((credential : { id, name})  => credential.id === application.manifest_id)?.["name"],
            tag: {
                type: "info",
                label: "Needs Review",
            }
        }
    })
}

