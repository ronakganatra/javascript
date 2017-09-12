import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "./Button.js";
import addSiteImage from "../images/addsite.svg";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { addPlaceholderStyles } from "../styles/inputs";
import validate from "validate.js";
import defaults from "../config/defaults.json";
import { speak } from "@wordpress/a11y";
import _debounce from "lodash/debounce";
import ErrorDisplay from "../errors/ErrorDisplay";
import { ModalHeading } from "./Headings";

const messages = defineMessages( {
	validationFormatURL: {
		id: "validation.format.url",
		defaultMessage: "Please enter a valid URL. Remember to use http:// or https://.",
	},
} );

let debouncedSpeak = _debounce( speak, 1000 );

const AddSiteModal = styled.div`
	max-width: 640px;
	margin: auto;
	font-weight: 300;
	font-size: 1em;
	label {
		display: inline-block;
		font-weight: 300;
		font-size: 1em;
		margin: 16px 0 8px 0;
	}
`;

const AddSiteImage = styled.img`
	width: 100%;
	margin: 1em 0 0;
	vertical-align: bottom;
`;

const WebsiteURL = addPlaceholderStyles( styled.input`
	width: 100%;
	height: 48px;
	box-shadow: inset 0 2px 8px 0px rgba(0,0,0,0.3);
	background: ${ colors.$color_grey };
	padding: 0 0 0 10px;
	font-size: 1em;
	border: 0;
	// margin-top: 8px;
` );

const Buttons = styled.div`
	flex: 1 0 200px;
	padding: 8px 0;
	text-align: right;
	a,
	button {
		margin-left: 12px;
	}
	@media screen and (max-width: ${ defaults.css.breakpoint.mobile }px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		a,
		button {
			margin-left: 0px;
			margin-bottom: 8px;
		}
	}
`;

const ValidationText = styled.div`
	font-size: 1em;
	color: ${ colors.$color_red};
	margin: 1em 0;
	min-height: 1.8em;
`;

const WideLargeButton = makeButtonFullWidth( LargeButton );
const WideSecondaryButton = makeButtonFullWidth( LargeSecondaryButton );


class AddSite extends React.Component {
	/**
	 * Initializes the class with the specified props.
	 *
	 * @param {Object} props The props to be passed to the class that was extended from.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.constraints = {
			url: this.urlConstraints.bind( this ),
		};

		this.state = {
			validationError: null,
			showValidationError: false,
		};

		// Defines the debounced function for showing validation error.
		this.showValidationMessageDebounced = _debounce( this.showValidationMessage, 1000 );
	}

	/**
	 * Sets the constraints for validation to URL, and sets the message that should be returned if the constraints are not met.
	 *
	 * @returns {Object} Returns the constraints for the URL, and the message.
	 */
	urlConstraints() {
		return {
			url: {
				message: this.props.intl.formatMessage( messages.validationFormatURL ),
			},
		};
	}

	/**
	 * Calls onChange function when website url changes.
	 *
	 * @param {Object} event The event returned by the WebsiteURLChange.
	 *
	 * @returns {void}
	 */
	onWebsiteURLChange( event ) {
		const value = event.target.value;
		this.props.onChange( value );
	}

	/**
	 * Runs url validation and shows/hides error if validation returns error.
	 *
	 * @param {string} 	url The url to validate.
	 * @param {bool} 	debounced Show the error message debounced.
	 *
	 * @returns {void}
	 */
	runValidation( url, debounced = true ) {
		let validationError = this.validateUrl( url );
		if ( validationError ) {
			this.updateValidationMessage( validationError );
			if ( debounced ) {
				this.showValidationMessageDebounced();
			} else {
				this.showValidationMessage();
			}
		} else {
			this.updateValidationMessage( null );
			this.hideValidationError();
		}
	}

	/**
	 * Shows the validation error.
	 *
	 * @returns {void}
	 */
	showValidationMessage() {
		this.setState( { showValidationError: true } );
	}

	/**
	 * Updates the validation message.
	 *
	 * @param {string} message The validation message.
	 *
	 * @returns {void}
	 */
	updateValidationMessage( message ) {
		this.setState( {
			validationError: message,
		} );
	}

	/**
	 * Validates URL and shows validation error if URL is invalid.
	 *
	 * @param {string} input The URL to be validated.
	 * @returns {string} URL Validation error message.
	 */
	validateUrl( input = "" ) {
		if ( input === "" ) {
			return null;
		}

		let result = validate( { website: input }, { website: this.urlConstraints() }, { format: "detailed" } );

		if ( result && result[ 0 ] !== null ) {
			return result[ 0 ].options.message;
		}
		return null;
	}

	/**
	 * Hides the validation message and cancels a potential debounced error.
	 *
	 * @returns {void}
	 */
	hideValidationError() {
		this.setState( { showValidationError: false }, () => {
			this.showValidationMessageDebounced.cancel();
		} );
	}

	/**
	 * Checks whether an URL was entered.
	 *
	 * @param {string} input The string in the input field.
	 * @returns {ReactElement} Returns a div that is either empty or contains an error message.
	 */
	urlValidityMessage( input = "" ) {
		if ( this.state.showValidationError && input !== "" ) {
			return (
				<ValidationText>
					<FormattedMessage
						id="sites.addSite.urlValidationMessage"
						defaultMessage={ this.state.validationError }
					/>
				</ValidationText>
			);
		}
		return (
			<ValidationText />
		);
	}

	/**
	 * Handles the website submit event.
	 *
	 * @param {object} event The submit event.
	 *
	 * @returns {void}
	 */
	handleSubmit( event ) {
		event.preventDefault();
		if( ! this.state.validationError && this.props.linkingSiteUrl !== "" ) {
			this.props.onConnectClick();
		}
	}

	speakValidationMessage( prevProps ) {
		/* We need to use the lodash debounce.cancel() method to
		 * cancel the delayed call. This is particularly important when typing
		 * fast in the site URL field.
		 */
		debouncedSpeak.cancel();

		if ( this.props.linkingSiteUrl.length > 0 && ( this.props.linkingSiteUrl !== prevProps.linkingSiteUrl ) && this.state.validationError ) {
			let message = this.props.intl.formatMessage( messages.validationFormatURL );
			debouncedSpeak( message, "assertive" );
		}
	}

	componentDidMount() {
		if ( this.props.query ) {
			this.props.onChange( this.props.query );
			this.runValidation( this.props.query, false );
		}
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.props.linkingSiteUrl !== nextProps.linkingSiteUrl ) {
			this.runValidation( nextProps.linkingSiteUrl );
		}
	}

	componentDidUpdate( prevProps ) {
		this.speakValidationMessage( prevProps );
	}

	componentWillUnmount() {
		this.showValidationMessageDebounced.cancel();
	}

	/**
	 * Returns the rendered html.
	 *
	 * @returns {ReactElement} The rendered html.
	 */
	render() {
		return (
			<AddSiteModal>
				<ModalHeading>
					<FormattedMessage id="sites.addSite.header" defaultMessage="Add Site"/>
				</ModalHeading>

				<form onSubmit={ this.handleSubmit.bind( this ) } noValidate>
					<label htmlFor="add-site-input">
						<FormattedMessage id="sites.addSite.enterUrl"
										  defaultMessage="Please enter the URL of the site you would like to link with your account:"
						/>
					</label>

					<WebsiteURL
						type="url"
						id="add-site-input"
						placeholder={ "https://example-site.com" }
						value={ this.props.linkingSiteUrl }
						onChange={ this.onWebsiteURLChange.bind( this ) }
					/>

					<ErrorDisplay error={ this.props.error } />

					<Buttons>
						<WideSecondaryButton type="button" onClick={ this.props.onCancelClick } >
							<FormattedMessage id="sites.addSite.cancel" defaultMessage="cancel"/>
						</WideSecondaryButton>
						<WideLargeButton
							type="submit"
							enabledStyle={ this.props.linkingSiteUrl === "" ? this.state.validationError : ! this.state.validationError }>
							<FormattedMessage id="sites.addSite.connect" defaultMessage="connect"/>
						</WideLargeButton>
					</Buttons>
				</form>
				{ this.urlValidityMessage( this.props.linkingSiteUrl ) }
				<AddSiteImage src={ addSiteImage } alt=""/>
			</AddSiteModal>
		);
	}
}

AddSite.propTypes = {
	intl: intlShape.isRequired,
	linkingSiteUrl: PropTypes.string.isRequired,
	onCancelClick: PropTypes.func.isRequired,
	onConnectClick: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	query: PropTypes.string.isRequired,
	error: PropTypes.object,
};

export default injectIntl( AddSite );
