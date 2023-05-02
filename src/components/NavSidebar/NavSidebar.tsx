import { A, useLocation } from "@solidjs/router";
import { Component } from "solid-js";
import "./NavSidebar.scss";

const NavSidebar: Component<{ routes }> = (props) => {
    return (
        <nav class="nav-sidebar">
            <ul class="nav-sidebar-menu">
                {props.routes.map(route => (
                    <li>
                        <A href={route.path} end={true} 
                        classList={{ "has-submenu": route.submenuItems }}>
                            <span>{route.name}</span>
                        </A>
                        {route.submenuItems && 
                            <ul class="nav-sidebar-menu-submenu">
                                {route.submenuItems.map((item, index) => 
                                    <li>
                                        <a href={item.path}
                                        data-active={!useLocation().hash && index === 0} 
                                        classList={{ "active": useLocation().hash === item.path }}>
                                            <span>{item.name}</span>
                                        </a>
                                    </li>
                                )}
                            </ul>
                        }
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default NavSidebar;