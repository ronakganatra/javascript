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
	display: flex;
	justify-content: space-around
	align-items: center;
`;

const SiteIcon = styled.img`
	background-image: url( ${ props => props.src } );
	width: 60px;
	height: 60px;
	background-repeat: no-repeat;
`;

SiteIcon.propTypes = {
	src: React.PropTypes.string.isRequired,
};

const Separator = styled.div`
	background-color: ${colors.$color_grey};
	width: 2px;
	height: 60px;
`;

const SiteName = styled.div`
	font-size: 14px;
	width: 25%;
	height: 60px;
	line-height: 60px;
`;

const SiteSubscriptionsContainer = styled.div`
	width: 40%;
	height: 60px;
	line-height: 60px;
	display: inline-flex;
	align-items: center;
	flex: 0 0 360px
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
			<SiteIcon src={ props.siteIcon } alt="" />
			<Separator />
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
