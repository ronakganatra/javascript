import React from "react";
import { MobileHeaderButton } from "../components/Button";
import styled from "styled-components";
import logout from "../icons/logout.svg";
import questionCircle from "../icons/question-circle.svg";
import colors from "yoast-components/style-guide/colors.json";
import { Logo } from "../components/Logo";
import { injectIntl, defineMessages, FormattedMessage } from "react-intl";

const messages = defineMessages( {
	signOut: {
		id: "mobileheader.signout",
		defaultMessage: "Sign out",
	},
	needHelp: {
		id: "mobileheader.needhelp",
		defaultMessage: "Need help?",
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
		top: 0;
		background-color: ${ colors.$color_pink_dark };
	}
`;

const LogoutHeaderButton = styled( MobileHeaderButton )`
	top: 0;
	right: 0;
`;

const BeaconHeaderButton = styled( MobileHeaderButton )`
	top: 0;
	left: 0;
`;

/**
 * Renders the FixedMobileHeader component.
 *
 * @param {Object} props Component props.
 * @returns {ReactElement} A react component.
 */
function MobileHeader( props ) {
	console.log( props.onBeaconClick );
	return (
		<FixedMobileHeader role="banner">
			<BeaconHeaderButton type="button" onClick={ props.onBeaconClick } iconSource={ questionCircle } iconSize="24px">
				<FormattedMessage
					id={ messages.needHelp.id }
					defaultMessage={ messages.needHelp.defaultMessage }
				/>
			</BeaconHeaderButton>
			<Logo size="88px"/>
			<LogoutHeaderButton type="button" onClick={ props.onLogoutClick } iconSource={ logout } iconSize="24px">
				<FormattedMessage
					id={ messages.signOut.id }
					defaultMessage={ messages.signOut.defaultMessage }
				/>
			</LogoutHeaderButton>
		</FixedMobileHeader>
	);
}

export default injectIntl( MobileHeader );

MobileHeader.propTypes = {
	onLogoutClick: React.PropTypes.func.isRequired,
	onBeaconClick: React.PropTypes.func.isRequired,
};

