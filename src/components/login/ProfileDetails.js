import React from "react";
import PropTypes from "prop-types";
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
		"of information and you can get started!",
	},
	goToMyYoast: {
		id: "profileDetails.goToMyYoast",
		defaultMessage: "Continue to MyYoast",
	},
} );

class ProfileDetails extends React.Component {

	handleSubmit( firstName, lastName, imageFile ) {
	}

	render() {
		return <LoginColumnLayout>
			<MainPaper>
				<Logos alt="My Yoast, Yoast Academy" src={ logo } />
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
	name: PropTypes.string,
};

ProfileDetails.defaultProps = {
	name: "World",
};
