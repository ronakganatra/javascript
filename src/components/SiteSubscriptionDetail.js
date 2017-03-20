import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { LargeButton } from "./Button";
import Toggle from "./Toggle";
import plusIcon from "../icons/blue-plus-circle.svg";

const SiteSubscription = styled.div`
	display: flex;
	padding: 26px 40px;
	background: ${colors.$color_white};
`;

const SubscriptionToggle = styled.div` 
	margin: 10px 0 0;
`;

const SubscriptionDetails = styled.div`
	color: ${colors.$color_black};
	padding: 0 40px;
	flex: 1 0 300px;
`;

const ProductName = styled.div`
	font-size: 16px;
	font-weight: 400;
`;

const SubscriptionUsage = styled.span`
	font-size: 14px;
	font-weight: 300;
	font-style: italic;
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
				<Toggle isEnabled={ props.isEnabled } ariaLabel="" onClick={ props.onToggleSubscription } />
			</SubscriptionToggle>

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

			<Buttons>
				<LargeButton onClick={ props.onMoreInfoClick } >More info</LargeButton>
				<LargeButton onClick={ props.onSettingsClick } >Settings</LargeButton>
			</Buttons>
		</SiteSubscription>
	);
}

SiteSubscriptionDetail.propTypes = {
	onToggleSubscription: React.PropTypes.func,
	onMoreInfoClick: React.PropTypes.func.isRequired,
	onSettingsClick: React.PropTypes.func.isRequired,
	isEnabled: React.PropTypes.bool,
	productName: React.PropTypes.string.isRequired,
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
