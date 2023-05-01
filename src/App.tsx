import { Component, createEffect } from 'solid-js';
import './App.scss';
import ExternalArrow from './icons/external-arrow.svg';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';


const App: Component = () => {
    createEffect(() => {
        document.querySelectorAll('a[target="_blank"]').forEach(async (a) => {
            a.innerHTML += await (await fetch(ExternalArrow)).text();
        });
    }, []);

    return (
        <>
            <Header username="kirahsapong" />
            <Main />
            <Footer />
        </>
    );
};

export default App;
