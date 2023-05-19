import { Component, Show, onMount } from "solid-js";
import "./Intake.scss";
import { Navigate, useLocation, useMatch, useRoutes } from "@solidjs/router";
import { intakeRoutes } from "../../routes/routes";
import TBDBrackets from '../../assets/tbd-brackets.svg';
import Footer from "../../components/Footer/Footer";


const Intake: Component = () => {
    const Routes = useRoutes(intakeRoutes);

    // const { pathname } = useLocation();

    const isValidRoute = () => {
        for (let route of intakeRoutes) {
            if (useMatch(() => route.path)()) return true;
        }
        return false;
    }

    return (
        <div class="intake-app">
            <header>
                <div class="header">
                    <div>
                        <div class="header-logo">
                            <img src={TBDBrackets} alt="TBD logo" width="60"/>
                            <span class="header-logo-title">
                                <span class="header-logo-title-username">TBD</span>
                                <span>Self Sovereign Identity Portal</span>
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <Show when={isValidRoute()} 
                    fallback={
                        <div class="restricted-page">
                            <h1>Looks like that's the wrong link.</h1>
                        </div>
                    }>
                    <Routes></Routes>
                </Show>
            </main>
            <Footer></Footer>
        </div>  
    )
}

export default Intake;