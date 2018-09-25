import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { defineMessages, FormattedMessage } from "react-intl";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "../../Button";
import YoastSelect from "../../general/YoastSelect";
import ButtonsContainer from "../../general/ButtonsContainer";
import { StyledLabel } from "../../Labels";

const messages = defineMessages( {
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
	noPluginSelected: {
		id: "requestConfiguration.noPluginSelected",
		defaultMessage: "No plugin selected",
	},
} );

const pluginOptions = [
	{ value: "none", label: messages.noPluginSelected.defaultMessage },
	{ value: "headspace2", label: "HeadSpace2" },
	{ value: "all-in-one_seo", label: "All-in-One SEO" },
	{ value: "jetpack_seo", label: "JetPack SEO" },
	{ value: "woothemes_seo_framework", label: "WooThemes SEO framework" },
];

const WideLargeButton = makeButtonFullWidth( LargeButton );
const WideSecondaryButton = makeButtonFullWidth( LargeSecondaryButton );

const TopSpaceButtonContainer = styled( ButtonsContainer )`
	padding-top: 16px;
`;

class ImportDataStep extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			importFrom: props.importFrom || pluginOptions[ 0 ].value,
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
			importFrom: event.value,
		} );
	}
	/**
	 * Handles the continue button, when an option in the plugin selector is selected, the corresponding step is completed,
	 * and holds the user input in the props.
	 *
	 * @returns {void}
	 */
	handleContinue() {
		if ( this.state.importFrom === null ) {
			return;
		}

		this.props.onSubmit( this.state );
		this.props.completeStep();
	}

	render() {
		const value = this.state.importFrom;
		return (
			<div>
				<p>
					<FormattedMessage
						id={ messages.importDataRequired.id }
						defaultMessage={ messages.importDataRequired.defaultMessage }
					/>
				</p>

				<StyledLabel htmlFor="import-data-exists">
					<FormattedMessage
						id={ messages.importDataExists.id }
						defaultMessage={ messages.importDataExists.defaultMessage }
					/>
				</StyledLabel>

				<YoastSelect
					name="form-field-name"
					id="import-data-exists"
					value={ value }
					onChange={ this.handleInput }
					options={ pluginOptions }
					clearable={ false }
				/>
				<TopSpaceButtonContainer>
					<WideSecondaryButton onClick={ this.props.onBack }>
						<FormattedMessage id="requestConfiguration.close" defaultMessage="back" />
					</WideSecondaryButton>
					<WideLargeButton
						onClick={ this.handleContinue }
						type="submit"
						enabledStyle={ this.state.importFrom !== null }
					>
						<FormattedMessage id="requestConfiguration.continue" defaultMessage="continue" />
					</WideLargeButton>
				</TopSpaceButtonContainer>
			</div>
		);
	}
}

ImportDataStep.propTypes = {
	importFrom: PropTypes.string,
	onSubmit: PropTypes.func.isRequired,
	onBack: PropTypes.func,
	completeStep: PropTypes.func,
};

export default ImportDataStep;
