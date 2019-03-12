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
import ErrorDisplay from "../errors/ErrorDisplay";

const messages = defineMessages( {
	signOut: {
		id: "mobileheader.signout",
		defaultMessage: "Sign out",
	},
	signingOut: {
		id: "mobileheader.signout.pending",
		defaultMessage: "Signing out...",
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

const FixedMobileHeader = styled.header`
	display: inline-block;
	position: fixed;
	z-index: 1;
	width: 100%;
	height: 48px;
	top: 0;
	background-color: ${ colors.$color_pink_dark };
`;

export const LogoutHeaderButton = styled( MobileHeaderButton )`
	top: 0;
	left: 0;

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
	let buttonMessage = props.loggingOut ? messages.signingOut : messages.signOut;
	/* eslint-disable require-jsdoc */
	let onButtonClick = () => {
		props.onLogoutClick();
	};
	/* eslint-enable require-jsdoc */
	let buttonIcon = logout;

	if ( props.detailPage ) {
		buttonMessage = messages.back;
		onButtonClick = props.onBackClick;
		buttonIcon = angleLeft;
	}

	return (
		<FixedMobileHeader>
			{ props.detailPage && <h1 hidden={ true }>{ props.pageTitle }</h1> }
			<MobileHeaderButton type="button" onClick={ onButtonClick } iconSource={ buttonIcon } iconSize="24px">
				<FormattedMessage { ...buttonMessage } />
			</MobileHeaderButton>
			<ErrorDisplay error={ props.logoutError } showIcon={ false } />
			<Logo context="header" size="88px" />
			<BeaconHeaderButton
				type="button" onClick={ props.onBeaconClick } iconSource={ questionCircle }
				iconSize="24px"
			>
				<FormattedMessage { ...messages.needHelp } />
			</BeaconHeaderButton>
		</FixedMobileHeader>
	);
}

export default injectIntl( MobileHeader );

MobileHeader.propTypes = {
	onLogoutClick: PropTypes.func.isRequired,
	onBeaconClick: PropTypes.func.isRequired,
	onBackClick: PropTypes.func,
	detailPage: PropTypes.bool,
	match: PropTypes.object,
	pageTitle: PropTypes.string,
	loggingOut: PropTypes.bool,
	logoutError: PropTypes.object,
};

MobileHeader.defaultProps = {
	onBackClick: null,
	detailPage: false,
	match: null,
	pageTitle: "",
	loggingOut: false,
	logoutError: null,
};
