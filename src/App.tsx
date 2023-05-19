import { Component, Match, Switch, createEffect } from 'solid-js';
import './App.scss';
import ExternalArrow from './icons/external-arrow.svg';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Intake from './pages/Intake/Intake';
import { useLocation, useMatch } from '@solidjs/router';
import { intakeRoutes } from './routes/routes';


const App: Component = () => {
    let username = "kirahsapong";
    const { pathname } = useLocation();

    const isIntakeRoute = () => {
        for (const route of intakeRoutes) {
            if (useMatch(() => route.path)() || route.path.includes(pathname) && pathname !== "/") return true;
        }
        return false;
    }

    return (
        <Switch fallback={
            <>
                <Header username={username} />
                <Main />
                <Footer />
            </>
        }>
            <Match when={isIntakeRoute()}>
                <Intake />
            </Match>
        </Switch>
    );
};

export default App;
