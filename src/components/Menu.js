import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { NavLink, Route } from "react-router-dom";

const activeStyle = "active-class-name";

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

/**
 * The main menu.
 *
 * @param {Object} props The props to use.
 * @returns {XML} The rendered component.
 */
export function MainMenu( props ) {
	return (
		<Menu>
			<nav>
				{ props.menuRoutes.map( function( page ) {
					return <MenuItem activeClassName={ activeStyle } to={ page.path } key={ page.title }>{ page.title }</MenuItem>;
				}
				) }
			</nav>
		</Menu>
	);
}

MainMenu.propTypes = {
	menuRoutes: React.PropTypes.array.isRequired,
};


/**
 * The main menu routes.
 *
 * @param {Object} props The props to use.
 * @returns {XML} The rendered component.
 */
export function MainMenuRoutes( props ) {
	return (
		<div>
			{ props.menuRoutes.map( function( route, routeKey ) {
				return <Route key={ routeKey } path={ route.path } component={ route.component }/>;
			}
			) }
		</div>
	);
}

MainMenuRoutes.propTypes = {
	menuRoutes: React.PropTypes.array.isRequired,
};
