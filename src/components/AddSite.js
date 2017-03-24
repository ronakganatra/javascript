import React from "react";
import  { TextButton } from "./Button.js";
import addSiteImage from "../images/addsite.svg";
import noActiveProductIcon from "../icons/exclamation-triangle.svg";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { FormattedMessage } from "react-intl";

const AddSiteModal = styled.div`
	padding: 40px;
	width: 640px;
	margin: auto;
	min-width: 200px;
	overflow: auto;
	font-family: Open Sans;
	font-weight: 300;
	font-size: 18px;
`;

const AddSiteImage = styled.img`
	width: 100%;
	height: 200px;
	margin-bottom: 40px;
`;

const AddSiteHeading = styled.h1`
	font-family: Open Sans;
	font-weight: 300;
	font-size: 30pt;
	display: inline;
`;

const AddSiteText = styled.p`
	font-family: Open Sans;
	font-weight: 300;
	font-size: 18px;
`;


const WebsiteURL = styled.input`
	width: 100%;
	height: 60px;
	box-shadow: inset 0px 2px 8px 0px rgba(0,0,0,0.3);
	background: ${ colors.$color_grey };
	text-indent: 5px;
	font-size: 14px;
`;

const Buttons = styled.div`
	float: right;
`;

const NoActiveProduct = styled.p`
	width: 100%;
	margin: 40px 40px 10px 0px;
	padding: 40px;
	background-color: ${colors.$color_yellow};
	overflow: auto;
`;

const PurpleLink = styled.a`
	color: ${colors.$color_purple};
`;

const NoActiveProductIcon = styled.img`
	width: 15%;
	float: left;	
	height: 100%;
	padding: 20px;
	text-align: center;
	vertical-align: middle;
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
				<FormattedMessage id="sites.add-site.no-acitve-product" defaultMessage="
				It looks like you don't have an active Yoast product on example-site.com yet.
				We cannot connect to your site until you do.
				Come back here once at least one Yoast plugin is activated. If you need help," />
				<PurpleLink href="">read this page</PurpleLink>.
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

