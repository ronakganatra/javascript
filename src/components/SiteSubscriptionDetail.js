import React from "react";
import MediaQuery from "react-responsive";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { LargeButton } from "./Button";
import Toggle from "./Toggle";
import plusIcon from "../icons/blue-plus-circle.svg";

const SiteSubscription = styled.li`
	background: ${colors.$color_white};
	height: 100px;
	display: flex;
	padding: 26px 40px;
	
	@media screen and ( max-width: 1355px ) {
		justify-content: space-between;
	}
`;

const SubscriptionToggle = styled.div`
	flex: 0 0 30px;
	margin: 10px 40px 0 0;
`;

const SubscriptionLogo = styled.span`
	flex: 0 0 60px;
	background: transparent url( ${ props => props.image } ) no-repeat 0 0;
	background-size: 60px;
	width: 60px;
	height: 60px;
`;

const SubscriptionDetails = styled.span`
	color: ${colors.$color_black};
	margin: 0 40px;
	flex: 1 0 300px;
`;

const ProductName = styled.span`
	font-size: 16px;
	font-weight: 400;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 100%;
	clear: both;
	float: left;
`;

const SubscriptionUsage = styled.span`
	font-size: 14px;
	font-weight: 300;
	font-style: italic;
	clear: left;
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
	
	@media screen and ( max-width: 1355px ) {
		width: 100%;
		margin-left: 0;
	}
`;

const Buttons = styled.span`
	
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

			<SubscriptionToggle>
				<Toggle
					onSetEnablement={ props.onToggleSubscription }
					isEnabled={ props.isEnabled }
					ariaLabel=""
					onClick={ props.onToggleSubscription } />
			</SubscriptionToggle>
			<SubscriptionLogo image={ props.productLogo } />

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

			<MediaQuery query="(min-width: 1356px)">
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
