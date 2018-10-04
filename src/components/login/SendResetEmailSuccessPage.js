import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";

// Images
import logo from "../../images/my-yoast-academy-logo.svg";
import icon from "../../images/greeting.png";

// Components.
import LoginColumnLayout from "./LoginColumnLayout";

const messages = defineMessages( {
	successMessageTitle: {
		id: "reset.message.title",
		defaultMessage: "Check your email!",
	},
	successMessage: {
		id: "reset.message",
		defaultMessage: "We've sent you an email with a link to reset your password, so check your inbox to continue.",
	},
} );

// Styled components.
const Header = styled.div`
	text-align: center;
	margin-bottom: 40px;
`;

const StyledHeader = styled.h2`
	text-align: center;
`;

const StyledParagraph = styled.p`
	text-align: center;
`;

const Icon = styled.img`
	margin-top: 20px;
	width: 200px;
`;

const Column = styled.div`
	margin: 20px;
`;

const Logos = styled.img`
	width: 360px;
`;

/**
 * Page to show the password change was succeeded.
 */
class ResetPasswordSuccessPage extends React.Component {
	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			<LoginColumnLayout>
				<Column>
					<Header>
						<Logos src={ logo } />
						<Icon src={ this.props.image } alt={ "MyYoast" } />
					</Header>
					<StyledHeader>
						<FormattedMessage { ...messages.successMessageTitle } />
					</StyledHeader>
					<StyledParagraph>
						<FormattedMessage { ...messages.successMessage } />
					</StyledParagraph>
				</Column>
			</LoginColumnLayout>
		);
	}
}

ResetPasswordSuccessPage.propTypes = {
	intl: intlShape.isRequired,
	children: PropTypes.array,
	image: PropTypes.string,
};

ResetPasswordSuccessPage.defaultProps = {
	image: icon,
};

export default injectIntl( ResetPasswordSuccessPage );
