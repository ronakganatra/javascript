import React from "react";
import  { Button } from "./Button.js";

// import siteLinkImage from "../images/logo.svg";

import styled from "styled-components";

import colors from "yoast-components/style-guide/colors.json";

const AddSiteModal = styled.div`
	padding: 10px;
	padding: 10px;
	border: 1px solid black;
	box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.1);
	width: 50%
`;

const WebsiteURL = styled.input`
	width: 95%
`;

const Buttons = styled.div`
	float: right;
`;

const NoActiveProduct = styled.div`
	margin: 5px 5px 5px 0px;
	padding: 5px;
	background-color: #FCE068;
`;

const PurpleLink = styled.a`
	color: ${colors.$color_purple};
`;

/**
 * Does stuff.
 *
 * @returns {XML} The greatest thing.
 * @constructor
 */
export default function AddSite() {
	return <AddSiteModal>
        <h2>Add site</h2>
        <p>Please enter the URL of the site you would like to link with your account:</p>
        <WebsiteURL type="url" placeholder="example-site.com" />
        <NoActiveProduct>
			<span>
				/\
			</span>
			<p>
				It looks like you don't have an active Yoast product on example-site.com yet.
				We cannot connect to your site until you do.
				Come back here once at least one Yoast plugin is activated. If you need help, <PurpleLink href="nu.nl">read this page</PurpleLink>.
			</p>
		</NoActiveProduct>
		<Buttons>
			<Button buttonWidth={"80px"}> cancel </Button>
			<Button buttonWidth={"80px"}> link </Button>
		</Buttons>
    </AddSiteModal>;
}
