import { Component } from "solid-js";
import ArrowRight from './arrow-right.svg';
import ArrowUpDown from './arrow-up-down.svg';
import Beaker from './beaker.svg';
import Bell from './bell.svg';
import ChevronDown from './chevron-down.svg';
import ExternalArrow from './external-arrow.svg';
import Plus from './plus.svg';
import XCross from './x-cross.svg';
import DangerAlert from './danger-alert.svg';


const Icon: Component<{ svg: string }> = (props) => {
    let iconContainer;
    fetch(props.svg)
        .then(res => res.text())
        .then(svg => iconContainer.innerHTML = svg);
    return <span ref={iconContainer} class="icon-container"></span>;
} 

export default Icon;

export {
    ArrowRight,
    ArrowUpDown,
    Beaker,
    Bell,
    ChevronDown,
    ExternalArrow,
    Plus,
    XCross,
    DangerAlert
}