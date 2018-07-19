import React from "react";
import { injectIntl, intlShape, FormattedMessage, defineMessages } from "react-intl";
import styled from "styled-components";

// Components.
import LoginColumnLayout from "./LoginColumnLayout";
import ProfileDetailsBlock from "../account/profile/ProfileDetailsBlock";
import { Button } from "../Button";

// Images;
import logo from "../../images/my-yoast-academy-logo.svg";

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
	message: {
		id: "profileDetails.message",
		defaultMessage: "Your MyYoast account has been activated! Fill out this last bit " +
		"of information and you can get started. Don't worry, you can always change these later!",
	},
	goToMyYoast: {
		id: "profileDetails.goToMyYoast",
		defaultMessage: "Continue to MyYoast",
	},
} );

/**
 * Component in first login flow, where the user is asked to
 * enter some personal details: first name, last name and profile image.
 */
class ProfileDetails extends React.Component {

	/**
	 * Submits the entered first name, last name and profile image
	 * to the server,
	 *
	 * @param {string} firstName the entered first name
	 * @param {string} lastName the entered last name
	 * @param {File} imageFile the uploaded image (see
	 * @returns {void}
	 */
	handleSubmit( firstName, lastName, imageFile ) {
		/*
			Code to submit the entered first name, last name and profile
		   	image to the server should be written here!
		*/
	}

	render() {
		return <LoginColumnLayout>
			<MainPaper>
				<Logos alt="MyYoast - Yoast Academy" src={ logo } />
				<Description>
					<FormattedMessage { ...messages.message } />
				</Description>
				<ProfileDetailsBlock onSubmit={ this.handleSubmit }>
					<SaveButtonArea>
						<SaveButton type="submit">
							<FormattedMessage { ...messages.goToMyYoast } />
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
};

ProfileDetails.defaultProps = {};
