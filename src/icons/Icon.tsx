import { Component } from "solid-js";

const Icon: Component<{ svg: string }> = (props) => {
    let iconContainer;
    fetch(props.svg)
        .then(res => res.text())
        .then(svg => iconContainer.innerHTML = svg);
    return (
        <div ref={iconContainer}></div>
    )   
}

export default Icon;