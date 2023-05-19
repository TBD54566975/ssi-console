import { Component, createEffect, onMount } from "solid-js";
import { useBeforeLeave, useLocation, useRoutes } from "@solidjs/router";
import routes, { dynamicRoutes } from "../../routes/routes";


const Main: Component = () => {
    const Routes = useRoutes([...routes, ...dynamicRoutes]);
    const { hash } = useLocation();

    onMount(() => {
        if (hash) {
            function scrollToAnchor() {
                document.getElementById(hash.substring(1))?.scrollIntoView();
                clearTimeout(timeout);
            }
            const timeout = setTimeout(scrollToAnchor, 50);
        }
    });

    return (
        <main>
            <Routes></Routes>
        </main>
    )
}

export default Main;