import { Component, Match, Switch, createEffect, createSignal, onMount } from 'solid-js';
import './App.scss';
import ExternalArrow from './icons/external-arrow.svg';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Intake from './pages/Intake/Intake';
import { useLocation, useMatch } from '@solidjs/router';
import { intakeRoutes } from './routes/routes';
import setupStore from './utils/setup';


const App: Component = () => {
    let username = "tbd";
    const { pathname } = useLocation();
    const [ isLoading, setIsLoading ] = createSignal(true);

    onMount( async () => {
        setTimeout( async () => {
            await setupStore();
            setIsLoading(false);
        }, 500);
    });

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
                { isLoading()
                    ? <div class="loading">Loading</div>
                    : <Main /> 
                }
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
