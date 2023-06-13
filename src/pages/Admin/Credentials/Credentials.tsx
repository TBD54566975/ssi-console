import { Component } from "solid-js";
import "./Credentials.scss";
import * as baseRoutes from "@/routes/routes";
import { useRoutes } from "@solidjs/router";
import NavSidebar from "@/components/NavSidebar/NavSidebar";


const Credentials: Component = () => {
    const routes = baseRoutes.default.find(route => route.path === '/credentials').children;
    const Routes = useRoutes(routes);

    for (let route of routes) {
        route['submenuItems'] = submenuItems[route.path];
    };
    return (
        <>
            <section class="page-hero">
                <h1>Credentials</h1>
                <p>Manage your Credentials and issuance processes in one place.</p>
            </section>
            <div class="page-layout">
                <NavSidebar routes={routes} />
                <div class="page-layout-content">
                    <Routes></Routes>
                </div>
            </div>
        </>
    )
}

export default Credentials;

const submenuItems = {
    "applications": [
        {
            path: "#incoming",
            name: "Incoming"
        },
        {
            path: "#declined",
            name: "Declined"
        }
    ],
    "history": [
        {
            path: "#active",
            name: "Active"
        },
        {
            path: "#suspended",
            name: "Suspended"
        },
        {
            path: "#revoked",
            name: "Revoked"
        }
    ]
}
