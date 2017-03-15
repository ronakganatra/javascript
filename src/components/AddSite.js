import React from "react";
import  { TextButton } from "./Button.js";
import addSiteImage from "../images/addsite.svg";

import styled from "styled-components";

import colors from "yoast-components/style-guide/colors.json";

const AddSiteModal = styled.div`
	padding: 10px;
	border: 1px solid black;
	box-shadow: 1px 1px 3px 0.5px rgba(0, 0, 0, 1);
	width: 600px;
	overflow: auto;
`;

const AddSiteIMG = styled.img`
	width: 575px;
`;

const WebsiteURL = styled.input`
	width: 98%
	height: 25px;
	background-color: ${ colors.$color_grey };
	box-shadow: inset 0 0 4px ${colors.$color_grey_dark};
	text-indent: 5px;
	font-size: 14px;
`;

const Buttons = styled.div`
	float: right;
`;

const NoActiveProduct = styled.div`
	margin: 5px 5px 5px 0px;
	padding: 5px;
	background-color: #FCE068;
	overflow: auto;
`;

const PurpleLink = styled.a`
	color: ${colors.$color_purple};
`;

const NoActiveProductIcon = styled.span`
	width: 10%;
	float: left;	
	height: 100%
	text-align: center;
	vertical-align: middle;
`;

const NoActiveProductText = styled.span`
	width: 90%;
	float: left;
`;

/**
 * @param {Object} props Component props.
 * @param {Function} props.onCancelClick The function to execute when the canel button is clicked.
 * @returns {ReactElement} A react component describing the AddSite modal.
 * @constructor
 */
export default function AddSite( props ) {
	return (
	<AddSiteModal>
		<AddSiteIMG src={addSiteImage} alt="Add Site image" aria-describedby="addSiteInfo" />
        <h2>Add site</h2>
        <p>Please enter the URL of the site you would like to link with your account:</p>
        <WebsiteURL type="url" placeholder="example-site.com" />
        <NoActiveProduct>
			<NoActiveProductIcon>
				/\
			</NoActiveProductIcon>
			<NoActiveProductText id="addSiteInfo">
				It looks like you don't have an active Yoast product on example-site.com yet.
				We cannot connect to your site until you do.
				Come back here once at least one Yoast plugin is activated. If you need help, <PurpleLink href="nu.nl">read this page</PurpleLink>.
			</NoActiveProductText>
		</NoActiveProduct>
		<Buttons>
			<TextButton type="button" onClick={ props.onCancelClick } buttonWidth={"100px"}> cancel </TextButton>
			<TextButton type="button" onClick={ props.onLinkClick } buttonWidth={"100px"}> link </TextButton>
		</Buttons>
    </AddSiteModal>
	);
}

AddSite.propTypes = {
	onCancelClick: React.PropTypes.func,
	onLinkClick: React.PropTypes.func,
};

AddSite.defaultProps = {
	onCancelClick: function() {
		console.log( "clicked on cancel" );
	},
	onLinkClick: function() {
		console.log( "clicked on link" );
	},
};


