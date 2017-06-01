import React from "react";
import { LogoutButton } from "../components/Button";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { Logo } from "../components/Logo";

const FixedMobileHeader = styled.nav`
	display:none;
	@media screen and ( max-width: 1024px ) {
		display: flex;
		justify-content: space-between;
		position: fixed;
		z-index: 1;
		width: 100%;
		height: 48px;
		top: 0;
		background-color: ${ colors.$color_pink_dark };
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
		<FixedMobileHeader>
			<Logo size="88px"/>
			<LogoutButtonFixedHeader type="button" onClick={ props.onLogoutClick } >Sign out</LogoutButtonFixedHeader>
		</FixedMobileHeader>
	);
}
MobileHeader.propTypes = {
	onLogoutClick: React.PropTypes.func.isRequired,
};
