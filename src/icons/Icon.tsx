import { Component } from "solid-js";

const Icon: Component<{svg: string}> = (props) => {
    let iconContainer;
    fetch(props.svg)
        .then(res => res.text())
        .then(svg => iconContainer.innerHTML = svg);
    return <span ref={iconContainer}></span>;
} 

export default Icon;