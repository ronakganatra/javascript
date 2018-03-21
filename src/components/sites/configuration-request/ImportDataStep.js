import React from "react";
import PropTypes from "prop-types";
import { defineMessages, FormattedMessage } from "react-intl";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "../../Button";
import YoastSelect from "../../general/YoastSelect";
import ButtonsContainer from "../../general/ButtonsContainer";


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
	/**
	 * Handles selected option of the selector in the import data step, by holding the selected option in the state.
	 *
	 * @param {object} event The event handling the input from the backup step.
	 *
	 * @returns {void}
	 */
	handleInput( event ) {
		this.setState( {
			importData: event.value,
		} );
	}
	/**
	 * Handles the continue button, when an option in the plugin selector is selected, the corresponding step is completed,
	 * and holds the user input in the props.
	 *
	 * @returns {void}
	 */
	handleContinue() {
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
					placeholder="No plugin selected"
					value={ value }
					onChange={ this.handleInput }
					options={ pluginOptions }
				/>
				<ButtonsContainer>
					<WideSecondaryButton onClick={ this.props.onBack } >
						<FormattedMessage id="requestConfiguration.close" defaultMessage="back"/>
					</WideSecondaryButton>
					<WideLargeButton
						onClick={ this.handleContinue }
						type="submit"
						enabledStyle={ this.state.importData !== null }
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
	importData: PropTypes.number,
	onSubmit: PropTypes.func.isRequired,
	onBack: PropTypes.func,
	completeStep: PropTypes.func,
};

export default ImportDataStep;
