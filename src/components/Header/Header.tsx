import { Component } from 'solid-js';
import TBDBrackets from '../../assets/tbd-brackets.svg';
import './Header.scss';
import { A } from '@solidjs/router';
import routes from '../../routes/routes';
import Icon, { Bell, ChevronDown, Plus } from '../../icons/Icon';

const Header: Component<{ username: string }> = (props) => {
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
					Docs
				</a>
				<button title="Notifications menu" class="secondary-nav-icon-button has-notification">
					<Icon svg={Bell} />
				</button>
				<button title="Create menu" class="secondary-nav-icon-button">
					<Icon svg={Plus} />
					<Icon svg={ChevronDown} />
				</button>
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