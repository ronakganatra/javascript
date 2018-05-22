import PropTypes from "prop-types";
import React from "react";
import { MobileHeaderButton } from "../components/Button";
import styled from "styled-components";
import logout from "../icons/logout.svg";
import angleLeft from "../icons/angle-left.svg";
import questionCircle from "../icons/question-circle.svg";
import colors from "yoast-components/style-guide/colors.json";
import { Logo } from "../components/Logo";
import { injectIntl, defineMessages, FormattedMessage } from "react-intl";
import defaults from "../config/defaults.json";

const messages = defineMessages( {
	signOut: {
		id: "mobileheader.signout",
		defaultMessage: "Sign out",
	},
	needHelp: {
		id: "mobileheader.needhelp",
		defaultMessage: "Need help?",
	},
	back: {
		id: "mobileheader.back",
		defaultMessage: "Back",
	},
} );

const FixedMobileHeader = styled.div`
	display: inline-block;
	position: fixed;
	z-index: 1;
	width: 100%;
	height: 48px;
	top: 0;
	background-color: ${ colors.$color_pink_dark };
`;

export const BackHeaderButton = styled( MobileHeaderButton )`
	top: 0;
	left: 0;
	margin-left:200px;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		width: 56px;
		padding-right: 0px;
	}
`;

export const LogoutHeaderButton = styled( MobileHeaderButton )`
	top: 0;
	left: 0;
	margin-left:400px;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		width: 56px;
		padding-right: 0px;
	}
`;

export const BeaconHeaderButton = styled( MobileHeaderButton )`
	top: 0;
	right: 0;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		width: 36px;
	}
`;

/**
 * Renders the FixedMobileHeader component.
 *
 * @param {Object} props Component props.
 * @returns {ReactElement} A react component.
 */
function MobileHeader( props ) {

	let buttonName  = messages.signOut;
	let onClickLink = props.onLogoutClick;
	let iconButton = logout;

	if ( props.detailPage ) {
		buttonName  = messages.back;
		onClickLink = props.onBackClick;
		iconButton = angleLeft;
	}

	return (
		<FixedMobileHeader role="banner">
			<MobileHeaderButton type="button" onClick={ onClickLink } iconSource={ iconButton } iconSize="24px">
				<FormattedMessage
					id={ buttonName.id }
					defaultMessage={ buttonName.defaultMessage }
				/>
			</MobileHeaderButton>
			<Logo context="header" size="88px"/>
			<BeaconHeaderButton type="button" onClick={ props.onBeaconClick } iconSource={ questionCircle } iconSize="24px">
				<FormattedMessage
					id={ messages.needHelp.id }
					defaultMessage={ messages.needHelp.defaultMessage }
				/>
			</BeaconHeaderButton>
		</FixedMobileHeader>
	);
}

export default injectIntl( MobileHeader );

MobileHeader.propTypes = {
	onLogoutClick: PropTypes.func.isRequired,
	onBeaconClick: PropTypes.func.isRequired,
	onBackClick: PropTypes.func,
	detailPage:PropTypes.bool,
};
