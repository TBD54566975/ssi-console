import { Component } from 'solid-js';
import TBDLogo from './assets/tbd-brackets.svg';
import './App.scss';
import Icon from './icons/Icon';
import Arrows from './icons/arrows-up-down.svg';
import { Link } from '@solidjs/router';

const App: Component = () => {
    const reader = new FileReader();
    return (
        <>
            <header>
                <div>
                    <Icon svg={Arrows} />
                    <div class="header-logo">
                        <img src={TBDLogo} alt="TBD logo" width="60"/>
                        <span class="header-username">kirahsapong</span> SSI Admin Console
                    </div>
                </div>
                <div>
                    <a target="_blank" href="https://developer.tbd.website/docs/apis/ssi-service/" class="button-anchor">Docs</a>
                </div>
            </header>
            <main></main> {/*router goes here, all pages share the same header footer*/}
            <footer>
                <a target="_blank" href="https://github.com/kirahsapong/ssi-console">Github</a>
                <a target="_blank" href="https://www.tbd.website/">tbd.website</a>
            </footer>
        </>
    );
};

export default App;
