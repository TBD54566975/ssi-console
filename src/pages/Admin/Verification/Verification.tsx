import { Component } from "solid-js";
import NavSidebar from "@/components/NavSidebar/NavSidebar";
import * as baseRoutes from "@/routes/routes";
import { useRoutes } from "@solidjs/router";

const Verification: Component = () => {
    const routes = baseRoutes.default.find(route => route.path === '/verification').children;
    const Routes = useRoutes(routes);
    for (let route of routes) {
        route['submenuItems'] = submenuItems[route.path];
    };
    return (
        <>
            <section class="page-hero">
                <h1>Verification</h1>
                <p>Accept and verify credentials. Set up submission links and review submissions in one place.</p>
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

export default Verification;

const submenuItems = {
    "submissions": [
        {
            path: "#for-review",
            name: "For Review"
        },
        {
            path: "#declined",
            name: "Declined"
        }
    ]
}