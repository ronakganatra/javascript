import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "../../Button";
import ButtonsContainer from "../../general/ButtonsContainer";
import NewTabMessage from "../../../components/NewTabMessage";

const messages = defineMessages( {
	googleSearchConsoleRequired: {
		id: "requestConfiguration.googleSearchConsoleRequired",
		defaultMessage: "If you want to connect your site to your Google Search Console account, please add us as a user.",
	},
	googleSearchConsoleConnected: {
		id: "requestConfiguration.googleSearchConsoleConnected",
		defaultMessage: "I've added yoastconfiguration@gmail.com as a full user to my Google Search Console account. (recommended) - { link } ",
	},
	googleSearchConsoleConnectedLink: {
		id: "requestConfiguration.googleSearchConsoleConnectedLink",
		defaultMessage: "Open instructions",
	},
	googleSearchConsoleMissing: {
		id: "requestConfiguration.googleSearchConsoleMissing",
		defaultMessage: "I don't want to connect my site to Google Search Console.",
	},
} );

const StyledLabel = styled.label`
	margin-left: 12px;
`;

const WideLargeButton = makeButtonFullWidth( LargeButton );
const WideSecondaryButton = makeButtonFullWidth( LargeSecondaryButton );

class GoogleSearchConsoleStep extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			searchConsoleRequired: props.searchConsoleRequired,
		};

		this.handleInput = this.handleInput.bind( this );
		this.handleContinue = this.handleContinue.bind( this );
	}
	/**
	 * Handles the input from the checkboxes of the google search console step, by holding the input in the state.
	 *
	 * @param {object} event The event handling the input from the google search console step.
	 *
	 * @returns {void}
	 */
	handleInput( event ) {
		this.setState( {
			searchConsoleRequired: event.target.value === "true",
		} );
	}
	/**
	 * Handles the continue button, when a checkbox of the google search console step is checked, the corresponding step is completed,
	 * and holds the user input in the props.
	 *
	 * @returns {void}
	 */
	handleContinue() {
		if ( this.state.searchConsoleRequired === null ) {
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
						id={ messages.googleSearchConsoleRequired.id }
						defaultMessage={ messages.googleSearchConsoleRequired.defaultMessage }
					/>
				</p>
				<p>
					<input
						id="googleSearchConsoleConnected"
						type="radio"
						onChange={ this.handleInput }
						checked={ this.state.searchConsoleRequired === true }
						value="true"
					/>
					<StyledLabel htmlFor="googleSearchConsoleConnected">
						<FormattedMessage
							id={ messages.googleSearchConsoleConnected.id }
							defaultMessage={ messages.googleSearchConsoleConnected.defaultMessage }
							values={ {
								link:
	<a
		target="_blank"
		href="https://kb.yoast.com/kb/how-to-connect-your-website-to-google-webmaster-tools/"
		rel="noopener noreferrer"
	>
		<i>{ this.props.intl.formatMessage( messages.googleSearchConsoleConnectedLink ) }</i>
		<NewTabMessage />
	</a>,
							} }
						/>
					</StyledLabel>
				</p>
				<p>
					<input
						id="googleSearchConsoleMissing"
						type="radio"
						onChange={ this.handleInput }
						checked={ this.state.searchConsoleRequired === false }
						value="false"
					/>
					<StyledLabel htmlFor="googleSearchConsoleMissing">
						<FormattedMessage
							id={ messages.googleSearchConsoleMissing.id }
							defaultMessage={ messages.googleSearchConsoleMissing.defaultMessage }
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
						enabledStyle={ this.state.searchConsoleRequired !== null }
					>
						<FormattedMessage id="requestConfiguration.submit" defaultMessage="submit" />
					</WideLargeButton>
				</ButtonsContainer>
			</div>
		);
	}
}

GoogleSearchConsoleStep.propTypes = {
	intl: intlShape,
	searchConsoleRequired: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
	onBack: PropTypes.func,
	completeStep: PropTypes.func,
};

export default injectIntl( GoogleSearchConsoleStep );
