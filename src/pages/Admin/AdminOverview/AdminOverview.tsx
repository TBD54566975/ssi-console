import { Component, createEffect, createSignal } from "solid-js";
import AvatarPerson from "../../../assets/avatar-person.svg";
import SearchCheckmark from "../../../assets/search-checkmark.svg";
import GroupPeople from "../../../assets/group-people.svg";
import InputHeart from "../../../assets/input-heart.svg";
import Card, { CardContent } from "../../../components/Card/Card";
import NotifyBlock from "../../../components/NotifyBlock/NotifyBlock";
import "./AdminOverview.scss";
import { notifications } from "../../../components/Header/Header";
import { store, updateStore } from "@/utils/store";

const AdminOverview: Component = () => {
    const [ hasApplications, setHasApplications ] = createSignal(false);
    const [ hasSubmissions, setHasSubmissions ] = createSignal(false);
    
    createEffect(() => {
    setHasApplications(!!store.applications?.length);
    }, [store.applications]);
    
    createEffect(() => {
    setHasSubmissions(store.submissions && !!Object.values(store.submissions)?.length);
    }, [store.submissions]);

    return (
        <div class="admin-overview">
            <div class="info-panel">
                <h1>SSI Admin Console</h1>
                <div class="info-panel-inbox">
                    {notifications(hasApplications(), hasSubmissions())?.map(notification => 
                        <NotifyBlock content={notification} />
                    )}
                </div>
            </div>
            {links && links.map(link => <Card content={link} />)}
        </div>
    )
}

export default AdminOverview;

const links: CardContent[] = [
    {
        title: "Issue new credential",
        tagline: "Super fast, super simple",
        img: {
            src: AvatarPerson,
            alt: "Pixelated avatar of cartoon person",
        },
        size: "large",
        color: "yellow",
        href: "/credentials"
    },
    {
        title: "Request credentials",
        tagline: "Start receiving and verifying credentials",
        img: {
            src: SearchCheckmark,
            alt: "Magnifying glass over a checkmark",
        },
        size: "large",
        color: "purple",
        href: "/verification"
    },
    {
        title: "View all credentials",
        img: {
            src: GroupPeople,
            alt: "Pixelated avatar of a group of cartoon people",
        },
        size: "small",
        color: "yellow",
        href: "/credentials/history"
    },
    {
        title: "Manage DID Registry",
        img: {
            src: InputHeart,
            alt: "Input field with a cursor hovering over an icon of a heart",
        },
        size: "small",
        color: "blue",
        href: "/dids"
    }
]