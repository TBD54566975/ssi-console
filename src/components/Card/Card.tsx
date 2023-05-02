import { Component } from "solid-js";
import './Card.scss';
import Icon, { ArrowRight } from "../../icons/Icon";

const Card: Component<{content: CardContent}> = (props) => {
    let cardLink;
    return (
        <div onclick={() => cardLink.click()} 
        class={`card card-${props.content.size} card-${props.content.color || "white"}`}>
            <div class="card-content">
                <div>
                    <a ref={cardLink} href={props.content.href}>
                        <h2>{props.content.title}</h2>
                    </a>
                    <p>{props.content.tagline}</p>
                </div>
                <div class="arrow-icon">
                    <Icon svg={ArrowRight} />
                </div>
            </div>
            <div class="card-image">
                <img 
                    src={props.content.img.src} 
                    alt={props.content.img.alt}
                />
            </div>
        </div>
    )
}

export default Card;

export interface CardContent {
    title,
    tagline?,
    img: CardImage,
    size: "large" | "small",
    color?: "yellow" | "purple" | "blue" | "white",
    href
}
interface CardImage {
    src,
    alt,
    width?
}