import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { defineMessages, FormattedMessage } from "react-intl";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "../../Button";


let messages = defineMessages( {
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

const ButtonsContainer = styled.p`
	> button:not(:first-child) {
		margin-left: 12px;
	}
`;

const WideLargeButton = makeButtonFullWidth( LargeButton );
const WideSecondaryButton = makeButtonFullWidth( LargeSecondaryButton );

class BackupStep extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			createBackup: props.createBackup,
		};

		this.handleInput = this.handleInput.bind( this );
		this.handleContinue = this.handleContinue.bind( this );
	}

	handleInput( event ) {
		this.setState( {
			createBackup: event.target.value === "true",
		} );
	}

	handleContinue() {
		if ( this.state.createBackup === null ) {
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
						defaultMessage={ messages.backupRequired.defaultMessage } />
				</p>
				<p>
					<input
						id="backupExists"
						type="radio"
						onChange={ this.handleInput }
						checked={ this.state.createBackup === false }
						value="false" />
					<StyledLabel htmlFor="backupExists">
						<FormattedMessage
							id={ messages.backupExists.id }
							defaultMessage={ messages.backupExists.defaultMessage } />
					</StyledLabel>
				</p>
				<p>
					<input
						id="backupMissing"
						type="radio"
						onChange={ this.handleInput }
						checked={ this.state.createBackup === true }
						value="true" />
					<StyledLabel htmlFor="backupMissing">
						<FormattedMessage
							id={ messages.backupMissing.id }
							defaultMessage={ messages.backupMissing.defaultMessage } />
					</StyledLabel>
				</p>
				<ButtonsContainer>
					<WideSecondaryButton onClick={ this.props.onBack } >
						<FormattedMessage id="requestConfiguration.close" defaultMessage="back"/>
					</WideSecondaryButton>
					<WideLargeButton
						onClick={ this.handleContinue }
						type="submit"
						enabledStyle={ this.state.createBackup !== null }
						aria-label="continue"
					>
						<FormattedMessage id="requestConfiguration.continue" defaultMessage="continue"/>
					</WideLargeButton>
				</ButtonsContainer>
			</div>
		);
	}
}

BackupStep.propTypes = {
	createBackup: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
	onBack: PropTypes.func,
	completeStep: PropTypes.func,
};

export default BackupStep;
