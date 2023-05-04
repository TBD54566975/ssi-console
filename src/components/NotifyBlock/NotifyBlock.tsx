import { Component } from "solid-js"
import "./NotifyBlock.scss";
import Icon, { ArrowRight } from "../../icons/Icon";

const NotifyBlock: Component<{content: NotifyBlockContent}> = (props) => {
    let cardLink;
    return (
        <div onClick={() => cardLink.click()} class="notify-block">
            <div class="notify-block-content">
                {props.content.hasNotify && <span class="notify-block-alert">New</span>}
                <a ref={cardLink} href={props.content.href}>
                    <h2>{props.content.title}</h2>
                </a>
                {props.content.message && 
                    <div class="notify-block-message">
                        <p class="notify-block-message-detail">{props.content.message}</p>
                        <p class="notify-block-message-action">Review them</p>
                    </div>
                }
            </div>
            <div class="arrow-icon">
                <Icon svg={ArrowRight} />
            </div>
        </div>
    )
}

export default NotifyBlock;

export interface NotifyBlockContent {
    title,
    message?,
    hasNotify?,
    href
}