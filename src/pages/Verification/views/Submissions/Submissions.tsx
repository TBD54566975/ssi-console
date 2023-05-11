import { Component } from "solid-js";
import Panel from "../../../../components/Panel/Panel";

const Submissions: Component = () => {
    const content = {
        "for-review": {
            id: "for-review",
            title: "For Review",
            listItems: submissions,
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

const submissions = [
    {
        name: "xxxx-mhjj",
        id: "did:key:z6MkfLvEXvtr4MXEicc7u8jyFo9nDuZ59cwj8hqf9r4oSrDk",
        type: "2023-05-05",
    }
]