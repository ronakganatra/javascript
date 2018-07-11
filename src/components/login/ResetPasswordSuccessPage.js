import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";

// Images
import logo from "../../images/my-yoast-academy-logo.svg";
import icon from "../../images/greeting.png";

// Components.
import LoginColumnLayout from "./LoginColumnLayout";
import { ButtonLink } from "../Button";

const messages = defineMessages( {
	successMessage: {
		id: "reset.message",
		defaultMessage: "Password changed successfully!",
	},
	continueButton: {
		id: "continue.button",
		defaultMessage: "Continue to MyYoast",
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

const SaveButtonArea = styled.div`
	position: relative;
	bottom: 0;
	margin-top: 40px;
	width: 100%;
`;

const SaveButton = styled( ButtonLink )`
	margin: 1em 0;
	width: 100%;
`;

/**
 * Page to show the password change was succeeded.
 */
class ResetPasswordSuccessPage extends React.Component {

	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<LoginColumnLayout>
				<Column>
					<Header>
						<Logos src={ logo } />
						<Icon src={ this.props.image } />
					</Header>
					<StyledHeader>
						<FormattedMessage { ...messages.successMessage } />
					</StyledHeader>
					<SaveButtonArea>
							<SaveButton to={ "/login" } >
								<FormattedMessage { ...messages.continueButton } />
							</SaveButton>
						</SaveButtonArea>
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
