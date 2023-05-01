import { Component } from 'solid-js';
import TBDBrackets from '../../assets/tbd-brackets.svg';
import './Header.scss';
import { A, Link } from '@solidjs/router';
import routes from '../../routes/routes';

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
			<div>
				<a
					target="_blank"
					href="https://developer.tbd.website/docs/apis/ssi-service/"
					class="button-anchor">
					Docs
				</a>
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