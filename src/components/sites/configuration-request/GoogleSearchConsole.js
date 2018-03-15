import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "../../Button";


let messages = defineMessages( {
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

const ButtonsContainer = styled.p`
	> button:not(:first-child) {
		margin-left: 12px;
	}
`;

const WideLargeButton = makeButtonFullWidth( LargeButton );
const WideSecondaryButton = makeButtonFullWidth( LargeSecondaryButton );

class GoogleSearchConsole extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			googleSearchConsole: props.googleSearchConsole,
		};

		this.handleInput = this.handleInput.bind( this );
		this.handleContinue = this.handleContinue.bind( this );
	}

	handleInput( event ) {
		this.setState( {
			googleSearchConsole: event.target.value === "true",
		} );
	}

	handleContinue() {
		if ( this.state.googleSearchConsole === null ) {
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
						id={ messages.googleSearchConsoleRequired.id }
						defaultMessage={ messages.googleSearchConsoleRequired.defaultMessage } />
				</p>
				<p>
					<input
						id="googleSearchConsoleConnected"
						type="radio"
						onChange={ this.handleInput }
						checked={ this.state.googleSearchConsole === false }
						value="false" />
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
						checked={ this.state.googleSearchConsole === true }
						value="true" />
					<StyledLabel htmlFor="googleSearchConsoleMissing">
						<FormattedMessage
							id={ messages.googleSearchConsoleMissing.id }
							defaultMessage={ messages.googleSearchConsoleMissing.defaultMessage } />
					</StyledLabel>
				</p>
				<ButtonsContainer>
					<WideSecondaryButton onClick={ this.props.goToPreviousStep } >
						<FormattedMessage id="requestConfiguration.close" defaultMessage="back"/>
					</WideSecondaryButton>
					<WideLargeButton
						onClick={ this.handleContinue }
						type="submit"
						enabledStyle={ this.state.googleSearchConsole !== null }
						aria-label="continue"
					>
						<FormattedMessage id="requestConfiguration.continue" defaultMessage="continue"/>
					</WideLargeButton>
				</ButtonsContainer>
			</div>
		);
	}
}

GoogleSearchConsole.propTypes = {
	intl: intlShape,
	googleSearchConsole: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
	goToPreviousStep: PropTypes.func,
	completeStep: PropTypes.func,
};

export default injectIntl( GoogleSearchConsole );

