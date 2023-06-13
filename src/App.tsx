import { Component } from 'solid-js';
import './App.scss';
import { Router, useLocation, useMatch } from '@solidjs/router';
import { intakeRoutes } from '@/routes/routes';
import Intake from '@/pages/Intake/Intake';
import Admin from '@/pages/Admin/Admin';

const App: Component = () => {
    const isIntakeRoute = () => {
        const { pathname } = useLocation();
        for (const route of intakeRoutes) {
            if (useMatch(() => route.path)() || route.path.includes(pathname) && pathname !== "/") return true;
        }
        return false;
    }

    return (
        <Router>
                { isIntakeRoute()
                    ? <Intake />
                    : <Admin />
                }
        </Router>
    );
};

export default App;