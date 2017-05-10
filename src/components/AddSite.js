import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import { TextButton } from "./Button.js";
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
	font-size: 18px;
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
`;

const WebsiteURL = addPlaceholderStyles( styled.input`
	width: 100%;
	height: 60px;
	box-shadow: inset 0 2px 8px 0px rgba(0,0,0,0.3);
	background: ${ colors.$color_grey };
	text-indent: 10px;
	font-size: 0.8em;
` );

const Buttons = styled.div`
	float: right;
`;

const YellowWarning = styled.p`
	padding: 5px;
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
	font-size: 0.8em;
`;

const ValidationText = styled.span`
	font-size: 0.8em;
	color: red;
`;

const PurpleLink = styled.a`
	color: ${ colors.$color_purple };
`;


/**
 * Renders the AddSite component.
 *
 * @param {Object} props                 Component props.
 * @param {Function} props.onCancelClick The function to execute when the cancel button is clicked.
 * @param {Function} props.onLinkClick   The function to execute when the link button is clicked.
 *
 * @returns {ReactElement} A react component describing the AddSite modal.
 */
class AddSite extends React.Component {
	constructor( props ) {
		super( props );

		this.linkEnabled = true;

		this.constraints = {
			url: this.urlConstraints.bind( this ),
		};
	}

	urlConstraints() {
		let output = {
			url: {
				message: this.props.intl.formatMessage( messages.validationFormatURL ),
			},
		};

		return output;
	}

	onWebsiteURLChange( event ) {
		this.props.onChange( event.target.value );
	}

	/**
	 * Checks whether an URL was entered.
	 *
	 * @param {string} inputStr Thestring in the inputfield.
	 * @returns {null} null
	 */
	urlValidityMessage( inputStr = "" ) {
		this.linkEnabled = true;

		if ( "" === inputStr ) {
			this.linkEnabled = false;
			return;
		}

		let result = validate( { website: inputStr }, { website: this.urlConstraints() }, { format: "detailed" } );

		if ( result && result[ 0 ] !== null ) {
			this.linkEnabled = false;

			return (
				<span>
					<ValidationText id="url_reminder">
						<FormattedMessage
							id="sites.add-site.url-validation-message"
							defaultMessage={ "{validationMessage}" }
							values={
							{
								validationMessage: result[ 0 ].options.message,
							}
							} />
					</ValidationText>
				</span>
			);
		}
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
						defaultMessage={"Oops! It look's like something went wrong... When we tried to link your site, we received this message: {errorMessage} If you need help, {link}"}
						values={{
							link: <PurpleLink href="/"><FormattedMessage
								id="sites.add-site-no-active-product.link"
								defaultMessage="read this page."/></PurpleLink>,
							errorMessage: <i>"{ errorMessage }."</i>,
						}}
					/>
				</WarningText>
			</YellowWarning>
		);
	}

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
										  defaultMessage="Please enter the URL of the site you would like to link with your account:"/>
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
				{ this.urlValidityMessage( this.props.linkingSiteUrl ) }
				<Buttons>
					<TextButton type="button" onClick={ this.props.onCancelClick } buttonWidth={"100px"}>
						<FormattedMessage id="sites.add-site.cancel" defaultMessage="cancel"/>
					</TextButton>
					<TextButton type="button" onClick={ this.props.onLinkClick } buttonWidth={"100px"} enabledStyle={ this.linkEnabled } >
						<FormattedMessage id="sites.add-site.link" defaultMessage="link"/>
					</TextButton>
				</Buttons>
				<AddSiteImage src={ addSiteImage } alt=""/>
			</AddSiteModal>
		);
	}
}

AddSite.propTypes = {
	intl: intlShape.isRequired,
	linkingSiteUrl: React.PropTypes.string.isRequired,
	onCancelClick: React.PropTypes.func.isRequired,
	onLinkClick: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
	errorFound: React.PropTypes.bool.isRequired,
	query: React.PropTypes.string.isRequired,
	errorMessage: React.PropTypes.string,
};

export default injectIntl( AddSite );
