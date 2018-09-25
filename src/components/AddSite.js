import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "./Button.js";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { addPlaceholderStyles } from "../styles/inputs";
import validate from "validate.js";
import { speak } from "@wordpress/a11y";
import _debounce from "lodash/debounce";
import ErrorDisplay from "../errors/ErrorDisplay";
import { ModalHeading } from "./Headings";
import ButtonsContainer from "./general/ButtonsContainer";
import YoastSelect from "./general/YoastSelect";
import { StyledLabel, SpanStyledAsLabel } from "./Labels";

const messages = defineMessages( {
	validationFormatURL: {
		id: "validation.format.url",
		defaultMessage: "Please enter a valid URL. Remember to use http:// or https://.",
	},
} );

const AddSiteModal = styled.div`
	max-width: 640px;
	margin: auto;
	font-size: 1em;
`;

const WebsiteURL = addPlaceholderStyles( styled.input`
	width: 100%;
	height: 48px;
	box-shadow: inset 0 2px 8px 0px rgba(0,0,0,0.3);
	background: ${ colors.$color_grey };
	padding: 0 0 0 10px;
	font-size: 1em;
	border: 0;
	margin-bottom: 8px;
` );

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
			selectedOption: {
				value: "wordpress",
				label: "WordPress",
			},
		};

		// Defines the debounced function to show the validation error.
		this.showValidationMessageDebounced = _debounce( this.showValidationMessage, 1000 );
		// Defines the debounced function to announce the validation error.
		this.speakValidationMessageDebounced = _debounce( this.speakValidationMessage, 1000 );
	}

	/**
	 * Tests whether customer has access to composer token feature. If so, returns a drop-down selector for CMS type.
	 * If not, returns null.
	 *
	 * @returns {*} Either null or html for the CMS type drop-down.
	 */
	getPlatformSelect() {
		return (
			<div>
				<SpanStyledAsLabel
					id="add-site-select-platform-label"
					onClick={ () => this.selectRef && this.selectRef.focus() }
				>
					<FormattedMessage
						id="sites.addSite.enterUrl"
						defaultMessage="Please select the platform that your website is running on:"
					/>
				</SpanStyledAsLabel>
				<YoastSelect
					name="selectPlatform"
					value={ this.state.selectedOption.value }
					onChange={ this.handleChange.bind( this ) }
					searchable={ false }
					clearable={ false }
					innerRef={ ( ref ) => {
						this.selectRef = ref;
					} }
					options={ [
						{
							value: "wordpress",
							label: "WordPress",
						},
						{
							value: "typo3",
							label: "TYPO3",
						},
					] }
					aria-labelledby="add-site-select-platform-label"
				/>
			</div>
		);
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
	 * @param {string}  url       The url to validate.
	 * @param {boolean} debounced Whether to show the debounced error message.
	 *
	 * @returns {void}
	 */
	runValidation( url, debounced = true ) {
		const validationError = this.validateUrl( url );
		if ( validationError ) {
			this.updateValidationMessage( validationError );
			if ( debounced ) {
				this.showValidationMessageDebounced();
				this.speakValidationMessageDebounced();
			} else {
				this.showValidationMessage();
				this.speakValidationMessage();
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

		const result = validate( { website: input }, { website: this.urlConstraints() }, { format: "detailed" } );

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
			this.speakValidationMessageDebounced.cancel();
		} );
	}

	/**
	 * Renders the validation error message container.
	 *
	 * When there are no errors, this container is rendered empty and acts like
	 * a "placeholder" taking space in the page to avoid "jumps" in the layout.
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
	 * Handles the submit event.
	 *
	 * @param {object} event The submit event.
	 *
	 * @returns {void}
	 */
	handleSubmit( event ) {
		event.preventDefault();
		if ( ! this.state.validationError && !! this.props.linkingSiteUrl ) {
			this.props.onConnectClick( this.state.selectedOption.value );
		}
	}

	handleChange( selectedOption ) {
		this.setState( {
			selectedOption,
		} );
	}

	/**
	 * Sends a message to the ARIA live assertive region.
	 *
	 * @returns {void}
	 */
	speakValidationMessage() {
		const message = this.props.intl.formatMessage( messages.validationFormatURL );
		speak( message, "assertive" );
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

	componentWillUnmount() {
		this.showValidationMessageDebounced.cancel();
		this.speakValidationMessageDebounced.cancel();
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
					<FormattedMessage id="sites.addSite.header" defaultMessage="Add Site" />
				</ModalHeading>

				<form onSubmit={ this.handleSubmit.bind( this ) } noValidate={ true }>
					<StyledLabel htmlFor="add-site-input">
						<FormattedMessage
							id="sites.addSite.enterUrl"
							defaultMessage="Please enter the URL of the site you would like to add to your account:"
						/>
					</StyledLabel>

					<WebsiteURL
						type="url"
						id="add-site-input"
						placeholder={ "https://example-site.com" }
						value={ this.props.linkingSiteUrl }
						onChange={ this.onWebsiteURLChange.bind( this ) }
					/>

					<ErrorDisplay error={ this.props.error } />

					{ this.getPlatformSelect() }
					{ this.urlValidityMessage( this.props.linkingSiteUrl ) }
					<ButtonsContainer>
						<WideSecondaryButton onClick={ this.props.onCancelClick }>
							<FormattedMessage id="sites.addSite.cancel" defaultMessage="Cancel" />
						</WideSecondaryButton>
						<WideLargeButton
							type="submit"
							enabledStyle={ ! this.state.validationError && !! this.props.linkingSiteUrl }
						>
							<FormattedMessage id="sites.addSite.connect" defaultMessage="Add" />
						</WideLargeButton>
					</ButtonsContainer>
				</form>
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
