import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { defineMessages, FormattedMessage } from "react-intl";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "../../Button";
import ButtonsContainer from "../../general/ButtonsContainer";

const messages = defineMessages( {
	administratorLoginRequired: {
		id: "requestConfiguration.administratorLoginRequired",
		defaultMessage: "We will, of course, need an administrator login to your site. Please create a new admin user on your site with the email address install@yoast.com.",
	},
	administratorLoginConfirmation: {
		id: "requestConfiguration.administratorLoginConfirmation",
		defaultMessage: "I've created a new admin user with the email address install@yoast.com.",
	},
} );

const StyledLabel = styled.label`
	margin-left: 12px;
`;

const WideLargeButton = makeButtonFullWidth( LargeButton );
const WideSecondaryButton = makeButtonFullWidth( LargeSecondaryButton );

class AdministratorLoginStep extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			confirmed: props.confirmed,
		};

		this.toggleConfirmed = this.toggleConfirmed.bind( this );
		this.handleContinue = this.handleContinue.bind( this );
	}
	/**
	* Toggles the checkbox to the administrator login information was sent.
	*
	* @param {object} event The event of toggeling the administrator login information checkbox.
	*
	* @returns {void}
	*/
	toggleConfirmed( event ) {
		if ( this.state.confirmed ) {
			this.props.resetStep();
		}

		this.setState( {
			confirmed: event.target.checked,
		} );
	}
	/**
	 * Handles the continue button, when the administrator login information is confirmed the corresponding step is completed,
	 * and holds the user input in the props.
	 *
	 * @returns {void}
	 */
	handleContinue() {
		if ( ! this.state.confirmed ) {
			return;
		}

		this.props.onSubmit( this.state );
		this.props.completeStep();
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			<div>
				<p>
					<FormattedMessage
						id={ messages.administratorLoginRequired.id }
						defaultMessage={ messages.administratorLoginRequired.defaultMessage }
					/>
				</p>
				<p>
					<input
						id="administratorLoginConfirmation"
						type="checkbox"
						onChange={ this.toggleConfirmed }
						checked={ this.state.confirmed }
					/>
					<StyledLabel htmlFor="administratorLoginConfirmation">
						<FormattedMessage
							id={ messages.administratorLoginConfirmation.id }
							defaultMessage={ messages.administratorLoginConfirmation.defaultMessage }
						/>
					</StyledLabel>
				</p>
				<ButtonsContainer>
					<WideSecondaryButton onClick={ this.props.onClose }>
						<FormattedMessage id="requestConfiguration.close" defaultMessage="close" />
					</WideSecondaryButton>
					<WideLargeButton
						onClick={ this.handleContinue }
						type="submit"
						enabledStyle={ this.state.confirmed }
					>
						<FormattedMessage id="requestConfiguration.continue" defaultMessage="continue" />
					</WideLargeButton>
				</ButtonsContainer>
			</div>
		);
	}
}

AdministratorLoginStep.propTypes = {
	confirmed: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	completeStep: PropTypes.func,
	resetStep: PropTypes.func,
};

export default AdministratorLoginStep;
