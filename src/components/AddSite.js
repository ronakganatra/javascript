import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import { LargeButton } from "./Button.js";
import addSiteImage from "../images/addsite.svg";
import noActiveProductIcon from "../icons/exclamation-triangle.svg";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { addPlaceholderStyles } from "../styles/inputs";
import validate from "validate.js";

const messages = defineMessages( {
	validationFormatURL: {
		id: "validation.format.url",
		defaultMessage: "Please enter a valid URL. Remember to use http:// or https://.",
	},
} );

const AddSiteModal = styled.div`
	max-width: 640px;
	margin: auto;
	font-weight: 300;
	font-size: 1em;
`;

const AddSiteImage = styled.img`
	width: 100%;
	margin: 1em 0 0;
	vertical-align: bottom;
`;

const AddSiteHeading = styled.h1`
	font-weight: 300;
	font-size: 1.5em;
	margin: 0;
`;

const AddSiteText = styled.p`
	font-weight: 300;
	font-size: 1em;
	margin: 16px 0 8px 0;
`;

const WebsiteURL = addPlaceholderStyles( styled.input`
	width: 100%;
	height: 48px;
	box-shadow: inset 0 2px 8px 0px rgba(0,0,0,0.3);
	background: ${ colors.$color_grey };
	padding: 0 0 0 10px;
	font-size: 1em;
	border: 0;
` );

const Buttons = styled.div`
	margin: 8px 0px 8px;
	text-align: right;
	flex: 200px 1 0;

	@media screen and ( max-width: 415px ) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
`;

const YellowWarning = styled.p`
	padding: 4px;
	background-color: ${ colors.$color_yellow };
	overflow: auto;
	display: flex;
	align-items: center;

	@media screen and ( max-width: 720px ) {
		flex-direction: column;
		text-align: left;
	}
`;

const NoActiveProductIcon = styled.img`
	width: 15%;
	height: 10%;
	padding: 20px;
	min-width: 75px;
	display: flex;

	@media screen and ( max-width: 720px ) {
		padding: 10px;
	}
`;

const WarningText = styled.span`
	font-size: 1em;
`;

const ValidationText = styled.div`
	font-size: 1em;
	color: ${ colors.$color_red};
	margin: 1em 0;
	min-height: 1.8em;
`;

const PurpleLink = styled.a`
	color: ${ colors.$color_purple };
`;

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

		this.urlValidity = false;

		this.constraints = {
			url: this.urlConstraints.bind( this ),
		};
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
		this.props.onChange( event.target.value );
	}

	validateUrl( input = "" ) {
		this.urlValidity = true;

		if ( input === "" ) {
			this.urlValidity = false;
		}

		let result = validate( { website: input }, { website: this.urlConstraints() }, { format: "detailed" } );

		if ( result && result[ 0 ] !== null ) {
			this.urlValidity = false;
		}
	}

	/**
	 * Checks whether an URL was entered.
	 *
	 * @param {string} input The string in the input field.
	 * @returns {ReactElement} Returns a div that is either empty or contains an error message.
	 */
	urlValidityMessage( input = "" ) {
		let result = validate( { website: input }, { website: this.urlConstraints() }, { format: "detailed" } );

		if ( ! this.urlValidity && input !== "" ) {
			return (
				<ValidationText>
					<FormattedMessage
						id="sites.add-site.url-validation-message"
						defaultMessage={ "{ validationMessage }" }
						values={ { validationMessage: result[ 0 ].options.message } }
					/>
				</ValidationText>
			);
		}

		return (
			<ValidationText />
		);
	}

	/**
	 * Renders an error message
	 *
	 * @param {boolean} errorFound Whether an error has been thrown.
	 * @param {string} errorMessage The error message to render.
	 * @returns {ReactElement} The rendered element.
	 */
	getErrorMessage( errorFound, errorMessage ) {
		if ( ! errorFound ) {
			return null;
		}

		return (
			<YellowWarning>
				<NoActiveProductIcon src={ noActiveProductIcon } alt=""/>
				<WarningText id="addSiteInfo">
					<FormattedMessage
						id="sites.add-site.no-active-product"
						defaultMessage={ "Oops! It looks like something went wrong... When we tried to link your site, we received this message: { errorMessage } If you need help, { link }" }
						values={ {
							link: <PurpleLink href="/"><FormattedMessage
								id="sites.add-site-no-active-product.link"
								defaultMessage="read this page."/></PurpleLink>,
							errorMessage: <i>"{ errorMessage }."</i>,
						} }
					/>
				</WarningText>
			</YellowWarning>
		);
	}

	/**
	 * Returns the rendered html.
	 *
	 * @returns {ReactElement} The rendered html.
	 */
	render() {
		let suggestedValue = "";

		if ( this.props.query.length > 0 ) {
			suggestedValue = this.props.query;
		}

		return (
			<AddSiteModal>
				<AddSiteHeading>
					<FormattedMessage id="sites.add-site.header" defaultMessage="Add Site"/>
				</AddSiteHeading>
				<AddSiteText>
					<label htmlFor="addSiteInputField">
						<FormattedMessage id="sites.add-site.enter-url"
										  defaultMessage="Please enter the URL of the site you would like to link with your account:"
						/>
					</label>
				</AddSiteText>
				<WebsiteURL
					type="url"
					id="addSiteInputField"
					placeholder={ "https://example-site.com" }
					defaultValue={ suggestedValue }
					aria-describedby="addSiteInfo"
					onChange={ this.onWebsiteURLChange.bind( this ) }
				/>
				{ this.getErrorMessage( this.props.errorFound, this.props.errorMessage ) }
				{ this.validateUrl( this.props.linkingSiteUrl ) }
				<Buttons>
					<LargeButton type="button" onClick={ this.props.onCancelClick } >
						<FormattedMessage id="sites.add-site.cancel" defaultMessage="cancel"/>
					</LargeButton>
					<LargeButton type="button" onClick={ this.urlValidity ? this.props.onConnectClick : () => {
					} } enabledStyle={ this.urlValidity }>
						<FormattedMessage id="sites.add-site.connect" defaultMessage="connect"/>
					</LargeButton>
				</Buttons>
				{ this.urlValidityMessage( this.props.linkingSiteUrl ) }
				<AddSiteImage src={ addSiteImage } alt=""/>
			</AddSiteModal>
		);
	}
}

AddSite.propTypes = {
	intl: intlShape.isRequired,
	linkingSiteUrl: React.PropTypes.string.isRequired,
	onCancelClick: React.PropTypes.func.isRequired,
	onConnectClick: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
	errorFound: React.PropTypes.bool.isRequired,
	query: React.PropTypes.string.isRequired,
	errorMessage: React.PropTypes.string,
};

export default injectIntl( AddSite );
