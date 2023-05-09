import { Component } from "solid-js";
import "./Credentials.scss";
import * as baseRoutes from "../../routes/routes";
import { useRoutes } from "@solidjs/router";
import NavSidebar from "../../components/NavSidebar/NavSidebar";


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
                <p>Manage your Credentials and Credential Manifests in one place.</p>
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
    "": [
        {
            path: "#all",
            name: "All Issued"
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

//<div class="did-icon" data-icon={key.name[0]}></div>

// .did-icon {
//     width: 24px;
//     height: 24px;
//     background: var(--color-purple);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-shrink: 0;

//     &:before {
//         content: attr(data-icon);
//         font-weight: 700;
//         font-size: var(--font-md);
//     } 
// }