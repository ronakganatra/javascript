import React from "react";
import MediaQuery from "react-responsive";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { LargeButton } from "./Button";
import Toggle from "./Toggle";
import plusIcon from "../icons/blue-plus-circle.svg";

let responsiveWidthThreshold = 1355;

const SiteSubscription = styled.li`
	background: ${colors.$color_white};
	height: 100px;
	display: flex;
	padding: 26px 0;
	
	@media screen and ( max-width: ${ responsiveWidthThreshold }px ) {
		height: 150px;
		text-overflow: hidden;
		padding: 13px 0;
		padding-left: 26px;
	}	
`;

const SubscriptionLeftContainer = styled.span`
	margin: 0 40px;
	height: 66px;
	
	@media screen and ( min-width: ${ responsiveWidthThreshold }px ) {
		flex: 0 0 140px;
	}
	
	@media screen and ( max-width: ${ responsiveWidthThreshold }px ) {
		flex: 0 0 60px;
		margin: 0 10px;
	}	
`;

const SubscriptionLogo = styled.img`
	width: 66px;
	height: 66px;
		
	@media screen and ( min-width: ${ responsiveWidthThreshold }px ) {
		float: right;
		margin-top: -9px;
	}	
`;

const SubscriptionToggle = styled.span`
	margin-top: 15px;
	
	@media screen and ( min-width: ${ responsiveWidthThreshold }px ) {
		float: right;
		margin-right: 40px;
	}
	
	@media screen and ( max-width: ${ responsiveWidthThreshold }px ) {
		float: left;
		margin-top: 5px;
		margin-left: 20px;
	}
`;

const SubscriptionDetails = styled.div`
	color: ${colors.$color_black};
	margin: 0 40px 0 0;
	flex: 1 1;
	overflow: hidden;
	max-width: 100%;
	@media screen and ( max-width: ${ responsiveWidthThreshold }px ) {
		margin: 0 10px 0 10px;
		heigth: 150px;
	}
`;

const ProductName = styled.span`
	font-size: 16px;
	font-weight: 400;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: block;
	
	@media screen and ( max-width: ${ responsiveWidthThreshold }px ) {
		height: 60px;
		line-height: 60px;
	}
	@media screen and ( max-width: 350px ) {	
			font-size: 14px;
			text-overflow: hidden;
	}
`;

const SubscriptionUsage = styled.span`
	font-size: 14px;
	font-weight: 300;
	font-style: italic;
	clear: left;
	
	@media screen and ( max-width: ${ responsiveWidthThreshold }px ) {
		margin-top: 10px;
		float: left;
		height: 20px;
		overflow: hidden;
		max-width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

const AddOneSlot = styled.button`
	font-size: 14px;
	font-weight: 300;
	font-style: italic;
	border: none;
	background: transparent url( ${ plusIcon } ) no-repeat 0 0;
	background-size: 16px;
	color: ${ colors.$color_blue };
	cursor: pointer;
	padding: 0 0 0 20px;
	margin-left: 10px;
	text-align: left;
	
	@media screen and ( max-width: ${ responsiveWidthThreshold }px ) {
		width: 100%;
		margin-left: 0px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

const Buttons = styled.span`
	margin: 0 40px 6px 0;

	button:last-child {
		margin-left: 40px;
	}
`;

/**
 *
 * @param {Object} props The props to use
 *
 * @returns {ReactElement} The rendered component.
 */
export default function SiteSubscriptionDetail( props ) {
	return (
		<SiteSubscription>
			<SubscriptionLeftContainer>
				<SubscriptionLogo src={ props.productLogo } />
				<SubscriptionToggle>

					<Toggle
						onSetEnablement={ props.onToggleSubscription }
						isEnabled={ props.isEnabled }
						ariaLabel=""
						onClick={ props.onToggleSubscription } />
				</SubscriptionToggle>
			</SubscriptionLeftContainer>

			<SubscriptionDetails>
				<ProductName>{props.productName}</ProductName>
				<SubscriptionUsage>
					{ props.slots.amountAvailable - props.slots.amountUsed } / { props.slots.amountAvailable } remaining
				</SubscriptionUsage>
				{
					props.slots.addMoreSlots  !== "" &&
						<AddOneSlot onClick={ props.slots.onAddMoreSlotsClick }>{ props.slots.addMoreSlots }</AddOneSlot>
				}
			</SubscriptionDetails>

			<MediaQuery query={ "(min-width: " + ( responsiveWidthThreshold + 1 ) + "px)" }>
				<Buttons>
					<LargeButton onClick={ props.onMoreInfoClick } >More info</LargeButton>
					<LargeButton onClick={ props.onSettingsClick } >Settings</LargeButton>
				</Buttons>
			</MediaQuery>
		</SiteSubscription>
	);
}

SiteSubscriptionDetail.propTypes = {
	onToggleSubscription: React.PropTypes.func,
	onMoreInfoClick: React.PropTypes.func.isRequired,
	onSettingsClick: React.PropTypes.func.isRequired,
	isEnabled: React.PropTypes.bool,
	productName: React.PropTypes.string.isRequired,
	productLogo: React.PropTypes.string.isRequired,
	slots: React.PropTypes.shape( {
		amountAvailable: React.PropTypes.number.isRequired,
		amountUsed: React.PropTypes.number,
		onAddMoreSlotsClick: React.PropTypes.func,
		addMoreSlots: React.PropTypes.string,
	} ).isRequired,
};

SiteSubscriptionDetail.defaultProps = {
	onToggleSubscription: () => {},
	isEnabled: false,
	slots: {
		amountUsed: 0,
		onAddMoreSlotsClick: () => { },
		addMoreSlots: "",
	},
};
