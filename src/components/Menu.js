import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { NavLink } from "react-router-dom";

const activeStyle = btoa( Math.random() );

const items = [
	{ item: "/subscriptions", title: "Subscriptions" },
	{ item: "/sites", title: "Sites" },
	{ item: "/courses", title: "Courses" },
	{ item: "/account", title: "Account" },
];

const Menu = styled.div`
`;

const MenuItem = styled( NavLink )`
	display: block;
	height: 100px;
	line-height: 100px;
	font: "Open Sans";
	font-size: 22px;
	font-weight: 300;
	padding-left: 25px;
	margin-left: 25px;
	margin-right: 25px;
	color: ${colors.$color_background_light};
	text-decoration: none;
	
	&.${ activeStyle } {
		color: #ccc;
		background-color: ${colors.$background};
		box-shadow: inset 0px 2px 8px 0px rgba(0, 0, 0, 0.3);
		font: "Open Sans";
		font-weight: 400;
		color: ${colors.$color_pink_dark};
	}
`;

export const MainMenu = () => {
	return (
		<Menu>
			<nav>
				{ items.map( ( page ) => {
					return <MenuItem activeClassName={ activeStyle } to={ page.item } key={ page.title }>{ page.title }</MenuItem>;
				}
				) }
			</nav>
		</Menu>
	);
};

// React components below can be removed in the future. Currently they serve as dummy content, necessary to show a functioning menu.

export const Home = React.createClass( {
	render: function() {
		return ( <h1>Welcome to the Home Page</h1> );
	},
} );

export const Subscriptions = React.createClass( {
	render: function() {
		return ( <h1>Your subscriptions</h1> );
	},
} );

export const Sites = React.createClass( {
	render: function() {
		return ( <h1>Your sites</h1> );
	},
} );

export const Courses = React.createClass( {
	render: function() {
		return ( <h1>Your courses</h1> );
	},
} );
export const Account = React.createClass( {
	render: function() {
		return ( <h1>Your account details</h1> );
	},
} );
