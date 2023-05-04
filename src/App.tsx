import { Component, createEffect } from 'solid-js';
import './App.scss';
import ExternalArrow from './icons/external-arrow.svg';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';


const App: Component = () => {
    let username = "kirahsapong";
    return (
        <>
            <Header username={username} />
            <Main />
            <Footer />
        </>
    );
};

export default App;
