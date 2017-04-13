import React from "react";
import { TextButton } from "./Button.js";
import addSiteImage from "../images/addsite.svg";
import noActiveProductIcon from "../icons/exclamation-triangle.svg";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { FormattedMessage } from "react-intl";
import { addPlaceholderStyles } from "../styles/inputs";

const AddSiteModal = styled.div`
	max-width: 640px;
	margin: auto;
	min-width: 200px;
	overflow: auto;
	font-weight: 300;
	font-size: 18px;
	padding: 0 20px;
`;

const AddSiteImage = styled.img`
	width: 100%;
	padding: 20px;
`;

const AddSiteHeading = styled.h1`
	font-weight: 300;
	font-size: 1.5em;
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

const NoActiveProduct = styled.p`
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

const NoActiveProductText = styled.span`
	font-size: 1em;
`;

const PurpleLink = styled.a`
	color: ${ colors.$color_purple };
`;

/**
 * Renders an error message
 *
 * @param {boolean} errorFound Whether an error has been thrown.
 * @param {string} errorMessage The error message to render.
 * @returns {ReactElement} The rendered element.
 */
function getErrorMessage( errorFound, errorMessage ) {
	if ( ! errorFound ) {
		return null;
	}

	return (
		<NoActiveProduct>
			<NoActiveProductIcon src={ noActiveProductIcon } alt=""/>
			<NoActiveProductText id="addSiteInfo">
				<FormattedMessage
					id="sites.add-site.no-active-product"
					defaultMessage={"Oops! It look's like something went wrong... When we tried to link your site, we received this message: {errorMessage} If you need help, {link}"}
					values={{
						link: <PurpleLink href="/"><FormattedMessage
							id="sites.add-site-no-active-product.link"
							defaultMessage="read this page."/></PurpleLink>,
						errorMessage: <i>"{ errorMessage }."</i>,
					}}/>
			</NoActiveProductText>
		</NoActiveProduct>
	);
}

/**
 * Renders the AddSite component.
 *
 * @param {Object} props                 Component props.
 * @param {Function} props.onCancelClick The function to execute when the cancel button is clicked.
 * @param {Function} props.onLinkClick   The function to execute when the link button is clicked.
 *
 * @returns {ReactElement} A react component describing the AddSite modal.
 */
export default function AddSite( props ) {
	let onChange = ( event ) => {
		props.onChange( event.target.value );
	};

	let suggestedValue = "";

	if ( props.query.length > 0 ) {
		suggestedValue = props.query;
	}

	return (
			<AddSiteModal>
				<AddSiteImage src={ addSiteImage } alt="" />
				<AddSiteHeading>
					<FormattedMessage id="sites.add-site.header" defaultMessage="Add Site" />
				</AddSiteHeading>
				<AddSiteText>
					<label htmlFor="addSiteInputField">
						<FormattedMessage id="sites.add-site.enter-url" defaultMessage="Please enter the URL of the site you would like to link with your account:" />
					</label>
				</AddSiteText>
				<WebsiteURL type="url" id="addSiteInputField" placeholder={ "example-site.com" } defaultValue={ suggestedValue } aria-describedby="addSiteInfo" onChange={ onChange } />
				{ getErrorMessage( props.errorFound, props.errorMessage ) }
				<Buttons>
					<TextButton type="button" onClick={ props.onCancelClick } buttonWidth={"100px"}>
						<FormattedMessage id="sites.add-site.cancel" defaultMessage="cancel" />
					</TextButton>
					<TextButton type="button" onClick={ props.onLinkClick } buttonWidth={"100px"}>
						<FormattedMessage id="sites.add-site.link" defaultMessage="link" />
					</TextButton>
				</Buttons>
			</AddSiteModal>
	);
}

AddSite.propTypes = {
	onCancelClick: React.PropTypes.func.isRequired,
	onLinkClick: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
	errorFound: React.PropTypes.bool.isRequired,
	query: React.PropTypes.string.isRequired,
	errorMessage: React.PropTypes.string,
};

