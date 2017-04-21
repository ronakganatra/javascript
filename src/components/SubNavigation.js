import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { NavLink, Route } from "react-router-dom";

const activeStyle = "active-class-name";

const SubNavigationContainer = styled.ul`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin: auto;
	list-style-type: none;
	margin-bottom: 2em;
`;

const LinkItem = styled( NavLink )`
	text-decoration: none;
	padding: 0.5em 2.5em;
	color: ${colors.$color_grey_dark};

	&.${ activeStyle } {
		border-bottom: 3px solid ${colors.$color_pink_dark};
		color: ${colors.$color_pink_dark};
		font-weight: 400;
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
						let isActive = item.isActive || ( ( match ) => {
							return match;
						} );
						return <li key={ item.title }>
								<LinkItem activeClassName={ activeStyle } to={ item.path } isActive={ isActive }> { item.title } </LinkItem>
							</li>;
					}
					) }
		</SubNavigationContainer>
	);
}

SubNavigation.propTypes = {
	itemRoutes: React.PropTypes.array.isRequired,
};

/**
 * The SubNavigationItem routes.
 *
 * @param {Object} props The props to use.
 * @returns {ReactElement} The rendered route.
 */
export function SubNavigationItem( props ) {
	return (
		<div>
			{ props.itemRoutes.map( function( route, routeKey ) {
				return <Route exact={true} key={ routeKey } path={ route.path } component={ route.component }/>;
			}
			) }
		</div>
	);
}

SubNavigationItem.propTypes = {
	itemRoutes: React.PropTypes.array.isRequired,
};
