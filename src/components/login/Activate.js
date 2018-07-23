import React from "react";
import { injectIntl, intlShape, FormattedMessage, defineMessages } from "react-intl";
import styled from "styled-components";
import PropTypes from "prop-types";

// Components.
import LoginColumnLayout from "./LoginColumnLayout";

// Images;
import logo from "../../images/my-yoast-academy-logo.svg";
import { Redirect } from "react-router";

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

const messages = defineMessages( {
	activating: {
		id: "profileDetails.activating",
		defaultMessage: "Activating your MyYoast account. Please stay with us for a little while longer...",
	},
	loggingIn: {
		id: "profileDetails.loggingIn",
		defaultMessage: "Logging in...",
	},
} );

/**
 * Component in first login flow, where the user is asked to
 * enter some personal details: first name, last name and profile image.
 */
class Activate extends React.Component {

	constructor( props ) {
		super( props );
		this.activateUser();
	}

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
		if ( this.props.isLoggedIn ) {
			return ( <Redirect to={"/enter-details"}/> );
		}
		return (
			<LoginColumnLayout>
				<MainPaper>
					<Logos alt="MyYoast - Yoast Academy" src={logo}/>
					<Description>
						<FormattedMessage {...messages.activating} />
					</Description>
				</MainPaper>
			</LoginColumnLayout>
		);
	}
}

export default injectIntl( Activate );

Activate.propTypes = {
	intl: intlShape.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	activateUser: PropTypes.func.isRequired,
};

Activate.defaultProps = {
	isLoggedIn: false,
};
