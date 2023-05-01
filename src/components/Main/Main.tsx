import { Component } from "solid-js";
import { useRoutes } from "@solidjs/router";
import routes from "../../routes/routes";


const Main: Component = () => {
    const Routes = useRoutes(routes);
    return (
        <main>
            <Routes></Routes>
        </main>
    )
}

export default Main;