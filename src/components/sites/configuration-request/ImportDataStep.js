import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { defineMessages, FormattedMessage } from "react-intl";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "../../Button";


let messages = defineMessages( {
	backupRequired: {
		id: "requestConfiguration.importDataCheck",
		defaultMessage: "Should we import data from another SEO plugin? We'll do this at no extra cost!" +
		" If yes, please select one of the available pluginsi n the dropdown from which you would like" +
		" to import data.",
	},
	backupExists: {
		id: "requestConfiguration.importDataLabel",
		defaultMessage: "Import from:",
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

class ImportDataStep extends React.Component {
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
					<WideSecondaryButton onClick={ this.props.goToPreviousStep } >
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

ImportDataStep.propTypes = {
	createBackup: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
	goToPreviousStep: PropTypes.func,
	completeStep: PropTypes.func,
};

export default ImportDataStep;
