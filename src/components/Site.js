import React from "react";

import styled from "styled-components";

import colors from "yoast-components/style-guide/colors.json";
import { LargeButton } from "../components/Button.js";
import Subscriptions from "../components/Subscriptions.js";

const SiteContainer = styled.li`
	background-color: ${colors.$color_white};
	height: 100px;
	display: flex;
	box-sizing: border-box;
	padding-right: 40px;
	align-items: center;
	
	@media screen and ( max-width: 1355px ) {
		justify-content: space-between;
	}
`;

const SiteIcon = styled.img`
	height: 48px;
	padding-right: 40px;
	padding-left: 40px;
	border-right: 2px solid ${colors.$color_grey};
	flex: 0 0 128px;
	
	@media screen and ( max-width: 1355px ) {
	padding-right: 20px;
	padding-left: 20px;
	flex: 0 0 68px;
	}
`;

SiteIcon.propTypes = {
	src: React.PropTypes.string.isRequired,
};

const SiteName = styled.span`
	height: 60px;
	font-size: 14px;
	line-height: 60px;
	overflow: hidden;
	text-overflow: ellipsis;
	flex: 0 0 380px;
	padding-left: 40px;
	
	@media screen and ( max-width: 1355px ) {
	padding-left: 20px;
	flex: 1 0 380px;
	}
	
	@media screen and ( max-width: 660px ) {
	flex: 1 1 380px;
	}
`;

const SiteSubscriptionsContainer = styled.span`
	height: 60px;
	line-height: 60px;
	display: inline-flex;
	align-items: center;
	flex: 1 0 300px;
	
	@media screen and ( max-width: 1355px ) {
		display: none;
	}
`;

/**
 * Returns the rendered Site component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Site component.
 * @constructor
 */
export default function Site( props ) {
	return (
		<SiteContainer>
			<SiteIcon src={ props.siteIcon } alt="" />
			<SiteName>{ props.siteName }</SiteName>
			<SiteSubscriptionsContainer>
				<Subscriptions activeSubscriptions={ props.activeSubscriptions } />
			</SiteSubscriptionsContainer>
			<LargeButton onClick={ props.onClickManage } >Manage</LargeButton>
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
