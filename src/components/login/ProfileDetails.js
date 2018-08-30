import React from "react";
import { injectIntl, intlShape, FormattedMessage, defineMessages } from "react-intl";
import styled from "styled-components";
import PropTypes from "prop-types";

// Components.
import LoginColumnLayout from "./LoginColumnLayout";
import ProfileDetailsBlock from "../account/profile/ProfileDetailsBlock";
import { Button } from "../Button";

// Images;
import logo from "../../images/my-yoast-academy-logo.svg";
import isEmpty from "lodash/isEmpty";
import { Redirect } from "react-router";
import ErrorDisplay from "../../errors/ErrorDisplay";

const MainPaper = styled.div`
	padding: 0 20px;
	width: 480px;
	min-height: 480px;

	position: relative;

    text-align: center;
`;

const Logos = styled.img`
	margin-top: 40px;
	width: 360px;
`;

const Description = styled.p`
	margin-top: 20px;

	text-align: left;
`;

const SaveButtonArea = styled.div`
	text-align: center;
	width: 100%;
`;

const SaveButton = styled( Button )`
	margin: 40px 0;
`;

const messages = defineMessages( {
	description: {
		id: "profileDetails.message",
		defaultMessage: "Your MyYoast account has been activated! Fill out this last bit " +
		"of information and you can get started. Don't worry, you can always change these later!",
	},
	goToMyYoast: {
		id: "profileDetails.goToMyYoast",
		defaultMessage: "Continue to MyYoast",
	},
	savingProfile: {
		id: "profileDetails.savingProfile",
		defaultMessage: "saving your profile...",
	},
} );

/**
 * Component in first login flow, where the user is asked to
 * enter some personal details: first name, last name and profile image.
 */
class ProfileDetails extends React.Component {
	constructor( props ) {
		super( props );

		this.handleSubmit = this.handleSubmit.bind( this );
	}

	/**
	 * Submits the entered first name, last name and profile image to the server.
	 *
	 * @param {string} firstName The entered first name.
	 * @param {string} lastName The entered last name.
	 * @param {File} userAvatarUrl The uploaded image.
	 * @returns {void}
	 */


	handleSubmit( firstName, lastName, userAvatarUrl ) {
		/* eslint-disable camelcase */
		this.props.attemptSubmitProfile( { first_name: firstName, last_name: lastName }, userAvatarUrl );
		/* eslint-enable camelcase */
	}

	render() {
		let saveMessage = messages.goToMyYoast;
		if ( this.props.savingProfile ) {
			saveMessage = messages.savingProfile;
		}

		if ( this.props.profileSaved && isEmpty( this.props.pendingRequests ) && isEmpty( this.props.profileSaveError ) ) {
			/*
			 * Because there are two asynchronous request modifying the user, we can't trust the resulting user state.
			 * Because of this, we have to fetch the user's Profile again and store it in the Redux state.
			 * We don't have to wait for this, so we redirect instantly.
			 */
			if ( this.props.fetchProfile ) {
				this.props.fetchProfile();
			}
			return <Redirect to={"/"}/>;
		}

		return <LoginColumnLayout>
			<MainPaper>
				<Logos alt="MyYoast - Yoast Academy" src={logo}/>
				<Description>
					<FormattedMessage {...messages.description} />
				</Description>
				<ErrorDisplay error={this.props.profileSaveError}/>
				<ProfileDetailsBlock onSubmit={this.handleSubmit} userFirstName={this.props.profile.userFirstName}
				                     userLastName={this.props.profile.userLastName}
				                     userAvatarUrl={this.props.profile.userAvatarUrl}>
					<SaveButtonArea>
						<SaveButton type="submit">
							<FormattedMessage {...saveMessage} />
						</SaveButton>
					</SaveButtonArea>
				</ProfileDetailsBlock>
			</MainPaper>
		</LoginColumnLayout>;
	}
}

export default injectIntl( ProfileDetails );

ProfileDetails.propTypes = {
	intl: intlShape.isRequired,
	attemptSubmitProfile: PropTypes.func,
	fetchProfile: PropTypes.func,
	savingProfile: PropTypes.bool,
	profileSaved: PropTypes.bool,
	profile: PropTypes.object,
	pendingRequests: PropTypes.array,
	profileSaveError: PropTypes.object,
};

ProfileDetails.defaultProps = {
	savingProfile: false,
	profileSaved: false,
	profile: {
		email: "",
		userFirstName: "",
		userLastName: "",
		userAvatarUrl: "",
	},
	pendingRequests: [],
	profileSaveError: null,
};
