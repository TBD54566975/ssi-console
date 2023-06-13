import { Component, createSignal, onMount } from "solid-js";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import setupStore from "../../utils/setup";

const Admin: Component = () => {
    let username = "tbd";
    const [ isLoading, setIsLoading ] = createSignal(true);

    onMount( async () => {
        await setupStore();
        setIsLoading(false);
    });

    return (
        <>
            <Header username={username} />
                { isLoading()
                    ? <div class="loading">Loading</div>
                    : <Main /> 
                }
            <Footer />
        </>
    )
}

export default Admin;