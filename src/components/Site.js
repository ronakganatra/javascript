import React from "react";

import styled from "styled-components";

import colors from "yoast-components/style-guide/colors.json";
import { LargeButton } from "../components/Button.js";
import Subscriptions from "../components/Subscriptions.js";

const SiteContainer = styled.div`
	background-color: ${colors.$color_white};
	width: 100%;
	height: 80px;
	padding: 10px;
	box-sizing: border-box;
	float: left;
`;

const SiteIcon = styled.img`
	background-image: url( ${ props => props.icon } );
	width: 60px;
	height: 60px;
	background-repeat: no-repeat;
	display: inline-block;
	float: left;
`;

SiteIcon.propTypes = {
	icon: React.PropTypes.string.isRequired,
};

const Separator = styled.div`
	background-color: ${colors.$color_grey};
	width: 2px;
	height: 60px;
	margin: 0px 15px;
	display: inline-block;
	float: left;
`;

const SiteName = styled.div`
	font-size: 14px;
	width: 25%;
	height: 60px;
	vertical-align: middle;
	display: inline-block;
	float: left;
	line-height: 60px;
`;

const SiteSubscriptionsContainer = styled.div`
	width: 40%;
	height: 60px;
	float: left;
	line-height: 60px;
`;

/**
 * Returns the rendered Site component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {XML} The rendered Site component.
 * @constructor
 */
export default function Site( props ) {
	return (
		<SiteContainer>
			<SiteIcon icon={ props.siteIcon } />
			<Separator />
			<SiteName>{ props.siteName }</SiteName>
			<SiteSubscriptionsContainer>
				<Subscriptions activeSubscriptions={ props.activeSubscriptions } />
			</SiteSubscriptionsContainer>
			<LargeButton onClick={ props.onClickManage }>Manage</LargeButton>
		</SiteContainer>
	);
}

Site.propTypes = {
	siteName: React.PropTypes.string.isRequired,
	activeSubscriptions: React.PropTypes.arrayOf( React.PropTypes.string ),
	siteIcon: React.PropTypes.string,
	onClickManage: React.PropTypes.func,
};

Site.defaultProps = {
	activeSubscriptions: [],
	siteIcon: "",
};
