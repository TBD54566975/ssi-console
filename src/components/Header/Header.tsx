import { Component, createEffect, createRoot, createSignal } from 'solid-js';
import TBDBrackets from '../../assets/tbd-brackets.svg';
import './Header.scss';
import { A } from '@solidjs/router';
import routes from '../../routes/routes';
import Icon, { ArrowRight, Bell, ChevronDown, ExternalArrow, Plus } from '../../icons/Icon';
import NotifyBlock, { NotifyBlockContent } from '../NotifyBlock/NotifyBlock';
import { store, updateStore } from '../../utils/store';

const Header: Component<{ username: string }> = (props) => {
    const [ hasApplications, setHasApplications ] = createSignal(false);
    const [ hasSubmissions, setHasSubmissions ] = createSignal(false);
    
    createEffect(() => {
    setHasApplications(!!store.applications?.length);
    }, [store.applications]);
    
    createEffect(() => {
    setHasSubmissions(store.submissions && !!Object.values(store.submissions)?.length);
    }, [store.submissions]);

    return (
        <header>
            <div class="header">
                <div>
                    <div class="header-logo">
                        <img src={TBDBrackets} alt="TBD logo" width="60"/>
                        <span class="header-logo-title">
                            <span class="header-logo-title-username">{props.username}</span>
                            <span>SSI Admin Console</span>
                        </span>
                    </div>
                </div>
                <div class="secondary-nav">
                    <a
                        target="_blank"
                        href="https://developer.tbd.website/docs/apis/ssi-service/"
                        class="primary-button">
                        Docs <Icon svg={ExternalArrow} />
                    </a>
                    <div class="secondary-nav-menu">
                        <button title="Notifications menu" class="secondary-nav-menu-icon" classList={{"has-notification": hasApplications() || hasSubmissions()}}>
                            <Icon svg={Bell} />
                        </button>
                        <div class="secondary-nav-menu-submenu notifications-submenu">
                            <ul>
                                {notifications(hasApplications(), hasSubmissions())?.map(notification => 
                                    <li><NotifyBlock content={notification} /></li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div class="secondary-nav-menu">
                        <button title="Create menu" class="secondary-nav-menu-icon">
                            <Icon svg={Plus} /><Icon svg={ChevronDown} />
                        </button>
                        <div class="secondary-nav-menu-submenu create-submenu">
                            <ul>
                                {createMenu && createMenu.map(createItem => 
                                    <li>
                                        <A href={createItem.href}>
                                            <div>
                                                <Icon svg={Plus} /> {createItem.title}
                                            </div> 
                                            <Icon svg={ArrowRight} />
                                        </A>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="primary-nav">
                <nav>
                    <ul>
                        {routes.map(route => (
                            <li>
                                <A href={route.path} end={route.path === '/'}>
                                {route.name}
                                </A>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;

export const notifications = (hasApplications, hasSubmissions): NotifyBlockContent[] => [
    {
        title: "View applications",
        href: "/credentials/applications",
        hasNotify: hasApplications,
        ...hasApplications && { message: "You have pending applications to resolve" }
    },
    {
        title: "View submissions",
        href: "/verification/submissions",
        hasNotify: hasSubmissions,
        ...hasSubmissions && { message: "You have pending applications to resolve" }
    }
]

const createMenu = [
    {
        title: "New credential",
        href: "/credentials"
    },
    {
        title: "New submission link",
        href: "/verification"
    }
]