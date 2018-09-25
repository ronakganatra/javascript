import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { defineMessages, injectIntl, intlShape } from "react-intl";

// Components.
import LoginMessage from "./LoginMessage";

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

const Column = styled.div`
	margin: 20px;
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
			<Column>
				<LoginMessage  header={ messages.successMessage } message={ messages.continueButton } buttonLinkTo={ "/login" } />
			</Column>
		);
	}
}

ResetPasswordSuccessPage.propTypes = {
	intl: intlShape.isRequired,
	children: PropTypes.array,
};


export default injectIntl( ResetPasswordSuccessPage );
