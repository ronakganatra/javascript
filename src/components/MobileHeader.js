import React from "react";
import { LogoutHeaderButton, BeaconHeaderButton } from "../components/Button";
import styled from "styled-components";
import logout from "../icons/logout.svg";
import colors from "yoast-components/style-guide/colors.json";
import { Logo } from "../components/Logo";
import { injectIntl, defineMessages, FormattedMessage } from "react-intl";

const messages = defineMessages( {
	signOut: {
		id: "mobileheader.signout",
		defaultMessage: "Sign out",
	},
} );

const FixedMobileHeader = styled.header`
	display:none;
	@media screen and ( max-width: 1024px ) {
		display: inline-block;
		position: fixed;
		z-index: 1;
		width: 100%;
		height: 48px;
		padding-left: 10px; 
		top: 0;
		background-color: ${ colors.$color_pink_dark };
	}
`;

/**
 * Renders the FixedMobileHeader component.
 *
 * @param {Object} props Component props.
 * @returns {ReactElement} A react component.
 */
function MobileHeader( props ) {
	return (
		<FixedMobileHeader role="banner">
			<BeaconHeaderButton />
			<Logo size="88px"/>
			<LogoutHeaderButton type="button" onClick={ props.onLogoutClick } iconSource={ logout } iconSize="24px">
				<FormattedMessage
					id={ messages.signOut.id }
					defaultMessage="Sign out"
				/>
			</LogoutHeaderButton>
		</FixedMobileHeader>
	);
}

export default injectIntl( MobileHeader );

MobileHeader.propTypes = {
	onLogoutClick: React.PropTypes.func.isRequired,
};

