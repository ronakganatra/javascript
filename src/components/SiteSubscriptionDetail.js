import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { LargeButton } from "./Button";
import Toggle from "./Toggle";

const SiteSubscription = styled.div`
	display: flex;
	padding: 26px 40px;
	background: ${colors.$color_white};
`;

const SubscriptionDetails = styled.div`
	color: ${colors.$color_black};
	padding: 0 40px;
`;

const ProductName = styled.div`
	font-size: 14px;
`;

const SubscriptionUsage = styled.div`
	font-size: 12px;
`;

const AvailableSlots = styled.span`
`;

const UsedSlots = styled.span`

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
			<Toggle ariaLabel="" onClick={ () => {
			} } />

			<SubscriptionDetails>
				<ProductName>{props.subscription.productName}</ProductName>
				<SubscriptionUsage>
					<AvailableSlots>{props.subscription.slots.available }</AvailableSlots> /
					<UsedSlots> { props.subscription.slots.limit }</UsedSlots> remaining
				</SubscriptionUsage>
			</SubscriptionDetails>

			<LargeButton onClick={ props.onMoreInfoClick } >More info</LargeButton>
			<LargeButton onClick={ props.onSettingsClick } >Settings</LargeButton>
		</SiteSubscription>
	);
}

SiteSubscriptionDetail.propTypes = {
	onMoreInfoClick: React.PropTypes.func.isRequired,
	onSettingsClick: React.PropTypes.func.isRequired,
	subscription : React.PropTypes.shape( {
		productName: React.PropTypes.string.isRequired,
		slots: React.PropTypes.shape( {
			available: React.PropTypes.number.isRequired,
			limit: React.PropTypes.number,
		} ).isRequired,
		exceeded : React.PropTypes.string.isRequired,
	} ),
};
