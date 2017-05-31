import React from "react";
import { LogoutButton } from "../components/Button";
import MediaQuery from "react-responsive";
import defaults from "../config/defaults.json";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { Logo } from "../components/Logo";

const FixedMobileHeader = styled.div`
	@media screen and ( max-width: 1024px ) {
		flex: 1 1 auto;
		display: flex;
		justify-content: space-between;
		position: fixed;
		z-index: 1;
		width: 100%;
		height: 48px;
		top: 0;
		max-width: 100%;
		background-color: ${colors.$color_pink_dark};
	}
`;

const LogoutButtonFixedHeader = styled( LogoutButton )`
	margin: 5px;
`;

/**
 * Renders the user profile component.
 *
 * @param {Object} props Component props.
 * @returns {ReactElement} A react component.
 */
export default function MobileHeader( props ) {
	return (
	<MediaQuery query={ `(max-width: ${ defaults.css.breakpoint.tablet + 1 }px)` }>
		<FixedMobileHeader>
			<Logo size="88px"/>
			<LogoutButtonFixedHeader type="button" onClick={props.onLogoutClick} >Sign out</LogoutButtonFixedHeader>
		</FixedMobileHeader>
	</MediaQuery>
	);
}
MobileHeader.propTypes = {
	onLogoutClick: React.PropTypes.func.isRequired,
};
