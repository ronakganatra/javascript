import React from "react";
import { LogoutButtonResponsive } from "../components/Button";
import styled from "styled-components";
import logout from "../icons/logout.svg";
import colors from "yoast-components/style-guide/colors.json";
import { Logo } from "../components/Logo";

const FixedMobileHeader = styled.header`
	display:none;
	@media screen and ( max-width: 1024px ) {
		display: flex;
		justify-content: space-between;
		position: fixed;
		z-index: 1;
		width: 100%;
		height: 48px;
		padding-left:10px; 
		top: 0;
		background-color: ${ colors.$color_pink_dark };
	}
`;

/**
 * Renders the user profile component.
 *
 * @param {Object} props Component props.
 * @returns {ReactElement} A react component.
 */
export default function MobileHeader( props ) {
	return (
		<FixedMobileHeader role="banner">
			<Logo size="88px"/>
			<LogoutButtonResponsive type="button" onClick={ props.onLogoutClick } iconSource={ logout } iconSize="24px">
				Sign out</LogoutButtonResponsive>
		</FixedMobileHeader>
	);
}
MobileHeader.propTypes = {
	onLogoutClick: React.PropTypes.func.isRequired,
};

MobileHeader.defaultProps = {
	onLogoutClick: () => {},
};