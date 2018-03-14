import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { defineMessages, FormattedMessage } from "react-intl";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "../../Button";
import YoastSelect from "../../general/YoastSelect";

const pluginOptions = [
	{ value: 0, label: "No plugin" },
	{ value: 1, label: "HeadSpace2" },
	{ value: 2, label: "All-in-One SEO" },
	{ value: 3, label: "JetPack SEO" },
	{ value: 4, label: "WooThemes SEO framework" },
];

let messages = defineMessages( {
	importDataRequired: {
		id: "requestConfiguration.importDataCheck",
		defaultMessage: "Should we import data from another SEO plugin? We'll do this at no extra cost!" +
		" If yes, please select one of the available plugins in the dropdown from which you would like" +
		" to import data.",
	},
	importDataExists: {
		id: "requestConfiguration.importDataLabel",
		defaultMessage: "Import from:",
	},
} );

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
			importData: props.importData,
		};

		this.handleInput = this.handleInput.bind( this );
		this.handleContinue = this.handleContinue.bind( this );
	}

	handleInput( event ) {
		this.setState( {
			importData: event.value,
		} );
	}

	handleContinue() {
		console.log( "handlecontinue:", this.state.importData );
		if ( this.state.importData === null ) {
			return;
		}

		this.props.onSubmit( this.state );

		this.props.completeStep();
	}

	render() {
		let value = this.state.importData;
		return (
			<div>
				<p>
					<FormattedMessage
						id={ messages.importDataRequired.id }
						defaultMessage={ messages.importDataRequired.defaultMessage } />
				</p>

				<label htmlFor="importDataExists">
					<FormattedMessage
						id={ messages.importDataExists.id }
						defaultMessage={ messages.importDataExists.defaultMessage } />
				</label>

				<YoastSelect
					name="form-field-name"
					value={ value }
					onChange={ this.handleInput }
					options={ pluginOptions }
				/>
				<ButtonsContainer>
					<WideSecondaryButton onClick={ this.props.goToPreviousStep } >
						<FormattedMessage id="requestConfiguration.close" defaultMessage="back"/>
					</WideSecondaryButton>
					<WideLargeButton
						onClick={ this.handleContinue }
						type="submit"
						enabledStyle={ this.state.createImportData !== null }
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
	importData: PropTypes.string,
	onSubmit: PropTypes.func.isRequired,
	goToPreviousStep: PropTypes.func,
	completeStep: PropTypes.func,
};

export default ImportDataStep;
