import PropTypes from "prop-types";
import React, { Fragment } from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { NavLink, Route } from "react-router-dom";

const activeStyle = "activeSubMenu";

const SubNavigationContainer = styled.ul`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin: auto;
	list-style-type: none;
	margin-bottom: 2em;
	padding: 0;
	border-bottom: 4px solid ${ colors.$color_grey_medium };
`;

const SubNavigationEntry = styled.li`
	min-width: 200px;
	font-size: 1.2em;

	@media screen and ( max-width: 600px ) {
		width: 150px;
		min-width: 0px;
	}
`;

const LinkItem = styled( NavLink )`
	display: block;
	text-decoration: none;
	padding: 0.5em 0;
	color: ${ colors.$color_grey_dark };

	margin-bottom: -4px;
	border-bottom: 4px solid transparent;

	transition: border 200ms ease-out;

	&:hover,
	&:focus,
	&.${ activeStyle } {
		border-bottom-color: ${ colors.$color_pink_dark };
		border-bottom-style: double;
	}

	&.${ activeStyle } {
		color: ${ colors.$color_pink_dark };
		border-bottom-style: solid;
	}
`;

/**
 * The SubNavigation component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered SubNavigation component.
 */
export default function SubNavigation( props ) {
	return (
		<SubNavigationContainer role="list">
			{ props.itemRoutes.map( function( item ) {
				const isActive = item.isActive || ( match => match );

				return <SubNavigationEntry key={ item.title }>
					<LinkItem
						activeClassName={ activeStyle }
						to={ item.path }
						isActive={ isActive }
						ariaCurrent="page"
					>
						{ item.title }
					</LinkItem>
				</SubNavigationEntry>;
			} ) }
		</SubNavigationContainer>
	);
}

SubNavigation.propTypes = {
	itemRoutes: PropTypes.array.isRequired,
};

/**
 * The SubNavigationItem routes.
 *
 * @param {Object} props The props to use.
 * @returns {ReactElement} The rendered route.
 */
export function SubNavigationItem( props ) {
	return (
		<Fragment>
			{ props.itemRoutes.map( function( route, routeKey ) {
				return <Route exact={ true } key={ routeKey } path={ route.path } component={ route.component } />;
			}
			) }
		</Fragment>
	);
}

SubNavigationItem.propTypes = {
	itemRoutes: PropTypes.array.isRequired,
};
