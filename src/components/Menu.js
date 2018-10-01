import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { NavLink } from "react-router-dom";
import { defineMessages, injectIntl, intlShape } from "react-intl";

/* eslint-disable */

const titles = defineMessages( {
	sites: {
		id: "menu.title.sites",
		defaultMessage: "Sites",
	},
	courses: {
		id: "menu.title.courses",
		defaultMessage: "Courses",
	},
	subscriptions: {
		id: "menu.title.subscriptions",
		defaultMessage: "Subscriptions",
	},
	downloads: {
		id: "menu.title.downloads",
		defaultMessage: "Downloads",
	},
	account: {
		id: "menu.title.account",
		defaultMessage: "Account",
	},
} );

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
	line-height: 1.4;
	font-size: 22px;
	font-weight: 300;
	padding: 24px;
	margin-left: 24px;
	color: ${ colors.$color_background_light };
	text-decoration: none;

	transition: color 0.1s ease-out, background-color 0.1s ease-out, padding 50ms ease-out, transform 100ms ease-out;

	&:hover,
	&:focus {
		padding-left: 1.25rem;
		color: ${ colors.$color_background_light };
		transition: padding 100ms ease-out;
	}

	svg{
		height: 40px;
		width: 40px;
		margin: 0 10px -12px;
		fill: ${ colors.$color_white };
	}

	&.${ activeStyle } {
		color: ${ colors.$color_border };
		background-color: ${ colors.$color_grey_light };
		box-shadow: inset 12px 0 6px -10px rgba(0, 0, 0, 0.3);
		font-weight: 400;
		color: ${ colors.$color_pink_dark };
		position: relative;
		overflow-y: hidden;

		&:hover,
		&:focus {
			padding-left: 1rem;
		}

		&:before,
		&:after {
			content: "";
			display: block;
			width: 100%;
			height: 0.25rem;
			position: absolute;
			left: 0;
			background: transparent;
		}

		&:before {
			border-bottom-right-radius: 20px 10px;
			top: -0.25rem;
			box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
		}

		&:after {
			border-top-right-radius: 20px 10px;
			bottom: -0.25rem;
			box-shadow: 0 -1px 8px 0 rgba(0, 0, 0, 0.3);
		}

		svg{
			fill: ${ colors.$color_pink_dark };
		}
	}

	@media screen and ( max-width: 1024px ) {
		display: inline-block;
		width: 100%; /* necessary for the text ellipsis */
		height: 4.5rem;
		margin: 0;
		padding: 0.5rem 0 0;
		border-bottom: 0.25rem solid transparent;
		box-shadow: none;
		color: ${ colors.$color_white };
		font-size: 12px;
		font-weight: 400;
		line-height: inherit;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

		&:hover,
		&:focus {
			padding-left: 0;
			transform: scale( 1.08 );
		}

		svg{
			display: block;
			margin: 0 auto -3px;
		}

		&.${ activeStyle } {
			border-bottom: 0.25rem solid ${ colors.$color_white };
			color: ${ colors.$color_white };
			background-color: transparent;
			transform: scale( 1.08 );
			box-shadow: none;

			&:hover,
			&:focus {
				padding-left: 0;
				transform: scale( 1.08 );
			}

			&:before,
			&:after {
				content: none;
			}

			svg{
				fill: ${ colors.$color_white };
			}
		}
	}
`;

/**
 * The main menu.
 *
 * @param {Object} props The props to use.
 * @returns {ReactElement} The rendered component.
 */
function MainMenu( props ) {
	return (
		<Menu>
			{ // eslint-disable-next-line jsx-a11y/no-redundant-roles
			}<ul role="list">
				{ props.menuRoutes.filter( ( menuItem ) => {
					// Don't show items that are only defined as route.
					return menuItem.showInMenu;
				} )
					.map( function( page ) {
						const isActive = page.isActive || (
							( match ) => {
								return match;
							}
						);

						const title = props.intl.formatMessage( titles[ page.titleKey ] );

						return <li key={ page.titleKey }>
							<MenuItem
								activeClassName={ activeStyle }
								to={ page.path }
								isActive={ isActive }
								ariaCurrent="page"
							>
								{/*<svg src={ page.iconSource } alt="" />*/}
								<svg
									version="1.1"
									id="courses"
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									role="img"
									aria-hidden="true"
									focusable="false"
									viewBox="0 0 46 34"// activeClassName={ activeStyle }
								>
									<g>
										<path
											d="M45.1,7.9L23.2,1c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0L0.9,7.9C0.7,8,0.5,8.2,0.5,8.5S0.7,9,0.9,9.1l6.5,2
												c-1.2,1.7-1.5,4.2-1.6,6.4c-0.7,0.4-1.6,1.2-1.6,2.2c0,0.9,0.7,1.6,1.4,2.1l-1.4,8.5c0,0.2,0,0.4,0.2,0.5S4.7,31,4.9,31h3.8
												c0.2,0,0.4-0.1,0.5-0.2c0.1-0.1,0.2-0.3,0.2-0.5l-1.5-8.5c0.7-0.4,1.5-1.2,1.5-2.1c0-0.9-0.8-1.7-1.5-2.1C7.9,15,9,12.8,10.1,12
												l12.5,4c0.1,0,0.3,0,0.4,0c0.1,0,0.3,0,0.4,0l21.7-6.8c0.3-0.1,0.4-0.3,0.4-0.6S45.3,8,45.1,7.9z"
										/>
										<path
											d="M23,18.1c-0.1,0-0.1,0-0.2,0l-12-3.7l-0.4,7.1c-0.2,2.8,5.6,5,12.5,5c6.9,0,12.7-2.2,12.5-5l-0.4-7.1l-12,3.7
												C23.1,18.1,23.1,18.1,23,18.1z"
										/>
									</g>
								</svg>
								{ title }
							</MenuItem>
						</li>;
					} )
				}
			</ul>
		</Menu>
	);
}

export default injectIntl( MainMenu );

MainMenu.propTypes = {
	menuRoutes: PropTypes.array.isRequired,
	intl: intlShape.isRequired,
};
