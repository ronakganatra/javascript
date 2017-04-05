import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { NavLink, Route } from "react-router-dom";

const activeStyle = "active-class-name";

const Menu = styled.nav`
	clear: both;
	

	& ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	& li {
		display: inline;
	}

	@media screen and ( max-width: 1024px ) {
	margin: 0 4%;
	text-align: center;
	
	
	& ul {
		display: flex;
	}
		
	& li {
		flex: 1 1 0%; /* Has unit measure to ensure IE compatibility */
		min-width: 40px; /* Like the icons width. */
	}
	}
`;

const MenuItem = styled( NavLink )`
	display: block;
	height: 100px;
	line-height: 100px;
	font-size: 22px;
	font-weight: 300;
	padding-left: 25px;
	margin-left: 25px;
	padding-right: 25px;
	color: ${colors.$color_background_light};
	text-decoration: none;

	&.${ activeStyle } {
		color: ${colors.$color_border};
		background-color: ${colors.$color_grey_light};
		box-shadow: inset 12px 0px 6px -10px rgba(0, 0, 0, 0.3);
		font-weight: 400;
		color: ${colors.$color_pink_dark};
		position: relative;
		overflow-y: hidden;

		&:before,
		&:after {
			content: "";
			display: block;
			width: 100%;
			height: 5px;
			position: absolute;
			left: 0;
			background: transparent;
		}

		&:before {
			border-bottom-right-radius: 20px 10px;
			top: -5px;
			box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.3);
		}

		&:after {
			border-top-right-radius: 20px 10px;
			bottom: -5px;
			box-shadow: 0px -1px 8px 0px rgba(0, 0, 0, 0.3);
		}
	}

	@media screen and ( max-width: 1024px ) {
		display: inline-block;
		width: 100%; /* necessary for the text ellipsis */
		
		height: 74px;
		margin: 0;
		padding: 8px 0 0;
		border-bottom: 5px solid transparent;
		box-shadow: none;
		color: ${colors.$color_white};
		font-size: 12px;
		font-weight: 400;
		line-height: inherit;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

		&.${ activeStyle } {
			border-bottom: 5px solid ${colors.$color_white};
			color: ${colors.$color_white};
			background-color: transparent;
			box-shadow: none;

			&:before,
			&:after {
				content: none;
			}
		}
	}
`;

const MenuIcon = styled.img`
	display: none;

	@media screen and ( max-width: 1024px ) {
		display: block;
		width: 40px;
		height: 40px;
		margin: 0 auto -3px;
	}
`;

/**
 * The main menu.
 *
 * @param {Object} props The props to use.
 * @returns {ReactElement} The rendered component.
 */
export function MainMenu( props ) {
	return (
	<Menu>
		<ul role="list">
			{ props.menuRoutes.map( function( page ) {
				let isActive = page.isActive || ( ( match ) => {
					return match;
				} );

				return <li key={ page.title }>
					<MenuItem activeClassName={ activeStyle } to={ page.path } isActive={ isActive }>
						<MenuIcon src={ page.icon } alt="" />
						{ page.title }
					</MenuItem>
				</li>;
			}
			) }
		</ul>
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
 * @returns {ReactElement} The rendered component.
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
