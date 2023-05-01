import { Component } from "solid-js";
import AvatarPerson from "../../assets/avatar-person.svg";
import SearchCheckmark from "../../assets/search-checkmark.svg";
import GroupPeople from "../../assets/group-people.svg";
import InputHeart from "../../assets/input-heart.svg";
import Card, { CardContent } from "../../components/Card/Card";
import NotifyBlock, { NotifyBlockContent } from "../../components/NotifyBlock/NotifyBlock";

const AdminOverview: Component = () => {
    return (
        <div>
            <div class="info-panel">
                <h1>SSI Admin Console</h1>
                <div class="info-panel-inbox">
                    {notifications && notifications.map(notification => 
                        <NotifyBlock content={notification} />
                    )}
                </div>
            </div>
            {links && links.map(link => <Card content={link} />)}
        </div>
    )
}

export default AdminOverview;

const notifications: NotifyBlockContent[] = [
    {
        title: "View applications",
        href: "/credentials",
        hasNotify: true,
        message: "You have pending applications to resolve"
    },
    {
        title: "View submissions",
        href: "/verify"
    }
]

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
        href: "/verify"
    },
    {
        title: "Create new credential",
        img: {
            src: GroupPeople,
            alt: "Pixelated avatar of a group of cartoon people",
        },
        size: "small",
        color: "yellow",
        href: "/credentials"
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