import React from "react";
import  { TextButton } from "./Button.js";
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
	
	@media screen and ( max-width: 720px ) {
		padding: 40px;
	}
`;

const AddSiteImage = styled.img`
	width: 100%;
		
	@media screen and ( min-width: 720px ) {
		padding: 40px;
		height: 200px;
	}
`;

const AddSiteHeading = styled.h1`
	font-weight: 300;
	font-size: 30pt;
	display: inline;
`;

const AddSiteText = styled.p`
	font-weight: 300;
	font-size: 18px;
`;


const WebsiteURL = addPlaceholderStyles( styled.input`
	width: 100%;
	height: 60px;
	box-shadow: inset 0px 2px 8px 0px rgba(0,0,0,0.3);
	background: ${ colors.$color_grey };
	text-indent: 5px;
	font-size: 14px;
` );

const Buttons = styled.div`
	float: right;
`;

const NoActiveProduct = styled.p`
	padding: 5px;
	width: 100%;
	background-color: ${colors.$color_yellow};
	overflow: auto;
	
	@media screen and ( min-width: 720px ) {
		margin: 40px 40px 10px 0px;
		padding: 40px;
		clear: both;
	}
`;

const PurpleLink = styled.a`
	color: ${colors.$color_purple};
`;

const NoActiveProductIcon = styled.img`
	width: 15%;
	height: 100%;
	padding: 20px;
	text-align: center;
	vertical-align: middle;
	float: left;
	min-width: 75px;
	margin: auto;
	
	@media screen and ( min-width: 720px ) {
		
	}
`;

const NoActiveProductText = styled.span`
	width: 85%;
	float: left;
	font-size: 18px;
`;

/**
 * @param {Object} props Component props.
 * @param {Function} props.onCancelClick The function to execute when the cancel button is clicked.
 * @param {Function} props.onLinkClick The function to execute when the link button is clicked.
 * @returns {ReactElement} A react component describing the AddSite modal.
 * @constructor
 */
export default function AddSite( props ) {
	return (
	<AddSiteModal>
		<AddSiteImage src={addSiteImage} alt="Add Site image" />
        <AddSiteHeading><FormattedMessage id="sites.add-site.header" defaultMessage="Add Site" /></AddSiteHeading>
        <AddSiteText>
			<label htmlFor="addSiteInputField">
				<FormattedMessage id="sites.add-site.enter-url" defaultMessage="Please enter the URL of the site you would like to link with your account:" />
			</label>
		</AddSiteText>
        <WebsiteURL type="url" id="addSiteInputField" placeholder="example-site.com" aria-describedby="addSiteInfo" />
        <NoActiveProduct>
			<NoActiveProductIcon src={ noActiveProductIcon } />
			<NoActiveProductText id="addSiteInfo">
				<FormattedMessage
					id="sites.add-site.no-active-product"
					defaultMessage={"It looks like you don't have an active Yoast product on " +
					"example-site.com yet. We cannot connect to your site until you do.Come back" +
					" here once at least one Yoast plugin is activated. If you need help, {link}"}
					values={{
						link: <PurpleLink href="/"><FormattedMessage
							id="sites.add-site-no-active-product.link"
							defaultMessage="read this page." /></PurpleLink>,
					}} />
			</NoActiveProductText>
		</NoActiveProduct>
		<Buttons>
			<TextButton type="button" onClick={ props.onCancelClick } buttonWidth={"100px"}> <FormattedMessage id="sites.add-site.cancel" defaultMessage="cancel" /> </TextButton>
			<TextButton type="button" onClick={ props.onLinkClick } buttonWidth={"100px"}> <FormattedMessage id="sites.add-site.link" defaultMessage="link" /> </TextButton>
		</Buttons>
    </AddSiteModal>
	);
}

AddSite.propTypes = {
	onCancelClick: React.PropTypes.func,
	onLinkClick: React.PropTypes.func,
};

