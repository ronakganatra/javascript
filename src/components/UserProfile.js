import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { LogoutButton } from "../components/Button";
import UserImage from "../components/UserImage";
import colors from "yoast-components/style-guide/colors.json";
import { defineMessages, FormattedMessage, injectIntl } from "react-intl";
import ErrorDisplay from "../errors/ErrorDisplay";

const UserInfoContainer = styled.aside`
	display: flex;
	margin-left: 24px;
	padding-right: 16px;
	padding-bottom: 3em;
`;

const UserInfo = styled.div`
	// Firefox needs this for user-email break word to work.
	min-width: 0;
`;

const UserEmail = styled.p`
	color: ${colors.$color_white};
	margin: 0 12px 10px 0;
	font-size: 14px;
	word-wrap: break-word;
	overflow-wrap: break-word;
	-ms-word-break: break-all;
	word-break: break-word;
`;

const messages = defineMessages( {
	signout: {
		id: "signout",
		defaultMessage: "Sign out",
	},
	signingout: {
		id: "signout.pending",
		defaultMessage: "Signing out...",
	},
} );


/**
 * Renders the user profile component.
 *
 * @param {Object} props Component props.
 * @param {boolean} props.loggedIn Whether or not we are currently logged in.
 * @returns {ReactElement} A react component.
 */
class UserProfile extends React.Component {
	constructor( props ) {
		super( props );
		this.onLogoutClick = this.onLogoutClick.bind( this );
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const message = this.props.loggingOut ? messages.signingout : messages.signout;

		return <UserInfoContainer className="user-info">
			<UserImage { ...this.props.displayImage } />
			<UserInfo>
				<UserEmail>{ this.props.displayEmail }</UserEmail>

				<LogoutButton
					type="button" onClick={ this.onLogoutClick }
					enabledStyle={ this.props.loggingOut === false }
				>
					<FormattedMessage { ...message } />
				</LogoutButton>
				<ErrorDisplay error={ this.props.logoutError } showIcon={ false } />
			</UserInfo>
		</UserInfoContainer>;
	}


	onLogoutClick() {
		if ( this.props.loggingOut ) {
			return;
		}

		// Logout from the HelpScout beacon.
		// eslint-disable-next-line new-cap
		window.Beacon( "logout" );
		this.props.onLogoutClick();
	}
}

export default injectIntl( UserProfile );

UserProfile.propTypes = {
	displayEmail: PropTypes.string.isRequired,
	displayImage: PropTypes.shape( {
		src: PropTypes.string,
		alt: PropTypes.string,
		size: PropTypes.string,
	} ),
	onLogoutClick: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool,
	className: PropTypes.string,
	loggingOut: PropTypes.bool.isRequired,
	logoutError: PropTypes.object,
};

UserProfile.defaultProps = {
	displayImage: {
		src: "",
		alt: "",
		size: "64px",
	},
	displayEmail: "",
	loggedIn: false,
	className: "",
	loggingOut: false,
	logoutError: null,
};
