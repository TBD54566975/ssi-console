import { A, useRoutes } from "@solidjs/router";
import { Component } from "solid-js";
import * as baseRoutes from "../../routes/routes";
import { submenuItems } from "./views/MyDIDs/MyDIDs";
import NavSidebar from "../../components/NavSidebar/NavSidebar";
import "./DIDs.scss";


const DIDs: Component = () => {
    const routes = baseRoutes.default.find(route => route.path === '/dids').children;
    const Routes = useRoutes(routes);
    for (let route of routes) {
        route['submenuItems'] = submenuItems[route.path];
    };
    return (
        <>
            <section class="page-hero">
                <h1>DIDs</h1>
                <p>Manage your Decentralized Identities and Trust Registry of DIDs in one place.</p>
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

export default DIDs;

