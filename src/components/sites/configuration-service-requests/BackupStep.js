import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { defineMessages, FormattedMessage } from "react-intl";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "../../Button";
import ButtonsContainer from "../../general/ButtonsContainer";

const messages = defineMessages( {
	backupRequired: {
		id: "requestConfiguration.backupRequired",
		defaultMessage: "Do you have a recent backup? We'll make changes to your site. Normally," +
		" nothing goes wrong, but we want to make sure a recent backup is available. If you don't" +
		" have a recent backup, we will create one. The data will be deleted after you've confirmed" +
		" the configuration service is completed.",
	},
	backupExists: {
		id: "requestConfiguration.backupExists",
		defaultMessage: "Yes, I have a recent backup.",
	},
	backupMissing: {
		id: "requestConfiguration.backupMissing",
		defaultMessage: "No, I do not have a recent backup and you are allowed to make one.",
	},
} );

const StyledLabel = styled.label`
	margin-left: 12px;
`;

const WideLargeButton = makeButtonFullWidth( LargeButton );
const WideSecondaryButton = makeButtonFullWidth( LargeSecondaryButton );

class BackupStep extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			backupRequired: props.backupRequired,
		};

		this.handleInput = this.handleInput.bind( this );
		this.handleContinue = this.handleContinue.bind( this );
	}
	/**
	 * Handles the input from the checkboxes of the backup step, by holding the input in the state.
	 *
	 * @param {object} event The event handling the input from the backup step.
	 *
	 * @returns {void}
	 */
	handleInput( event ) {
		this.setState( {
			backupRequired: event.target.value === "true",
		} );
	}
	/**
	 * Handles the continue button, when a checkbox of the backup step is checked, the corresponding step is completed,
	 * and holds the user input in the props.
	 *
	 * @returns {void}
	 */
	handleContinue() {
		if ( this.state.backupRequired === null ) {
			return;
		}

		this.props.onSubmit( this.state );
		this.props.completeStep();
	}

	render() {
		return (
			<div>
				<p>
					<FormattedMessage
						id={ messages.backupRequired.id }
						defaultMessage={ messages.backupRequired.defaultMessage }
					/>
				</p>
				<p>
					<input
						id="backupExists"
						type="radio"
						onChange={ this.handleInput }
						checked={ this.state.backupRequired === false }
						value="false"
					/>
					<StyledLabel htmlFor="backupExists">
						<FormattedMessage
							id={ messages.backupExists.id }
							defaultMessage={ messages.backupExists.defaultMessage }
						/>
					</StyledLabel>
				</p>
				<p>
					<input
						id="backupMissing"
						type="radio"
						onChange={ this.handleInput }
						checked={ this.state.backupRequired === true }
						value="true"
					/>
					<StyledLabel htmlFor="backupMissing">
						<FormattedMessage
							id={ messages.backupMissing.id }
							defaultMessage={ messages.backupMissing.defaultMessage }
						/>
					</StyledLabel>
				</p>
				<ButtonsContainer>
					<WideSecondaryButton onClick={ this.props.onBack }>
						<FormattedMessage id="requestConfiguration.close" defaultMessage="back" />
					</WideSecondaryButton>
					<WideLargeButton
						onClick={ this.handleContinue }
						type="submit"
						enabledStyle={ this.state.backupRequired !== null }
					>
						<FormattedMessage id="requestConfiguration.continue" defaultMessage="continue" />
					</WideLargeButton>
				</ButtonsContainer>
			</div>
		);
	}
}

BackupStep.propTypes = {
	backupRequired: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
	onBack: PropTypes.func,
	completeStep: PropTypes.func,
};

export default BackupStep;
