import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { LargeButtonLink } from "./Button";
import Toggle from "./Toggle";
import plusIcon from "../icons/blue-plus-circle.svg";
import { FormattedMessage } from "react-intl";
import { Row } from "./Tables";
import _partial from "lodash/partial";
import { injectIntl, intlShape } from "react-intl";

let responsiveWidthThreshold = 1355;

const SubscriptionLeftContainer = styled.span`
	margin-right: 40px;

	@media screen and ( max-width: ${ responsiveWidthThreshold }px ) {
		margin-right: 20px;
	}

	@media screen and ( max-width: 800px ) {
		align-self: flex-start;
		margin: 0;
		padding-top: 14px;
	}
`;

const SubscriptionLogo = styled.img`
	display: inline-block;
	width: 66px;
	height: 66px;
	vertical-align: middle;

	@media screen and ( max-width: 800px ) {
		display: none;
	}
`;

const SubscriptionToggle = styled.span`
	display: inline-block;
	vertical-align: middle;
	margin: 10px 40px 0 2px;

	@media screen and ( max-width: ${ responsiveWidthThreshold }px ) {
		margin-right: 20px;
	}
`;

const SubscriptionDetails = styled.div`
	color: ${ colors.$color_black };
	margin: 0 40px 0 0;
	flex: 1 1;
	overflow: hidden;
	max-width: 100%;

	@media screen and ( max-width: ${ responsiveWidthThreshold }px ) {
		margin: 0 10px 0 0;
	}

	@media screen and ( max-width: 800px ) {
		margin: 0;
		padding-top: 20px;
		align-self: flex-start;
	}
`;

const ProductName = styled.span`
	font-size: 16px;
	font-weight: 400;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: block;

	@media screen and ( max-width: 800px ) {
		font-size: 14px;
	}
`;

const SubscriptionUsage = styled.span`
	display: inline-block;
	font-size: 14px;
	font-weight: 300;
	margin-right: 10px;
`;

const AddOneLicense = styled.button`
	font-size: 14px;
	font-weight: 300;
	font-style: italic;
	border: none;
	background: transparent url( ${ plusIcon } ) no-repeat 0 0;
	background-size: 16px;
	color: ${ colors.$color_blue };
	cursor: pointer;
	padding: 0 0 0 20px;
	text-align: left;
`;

const SubscriptionRightContainer = styled.span`
	@media screen and ( max-width: 800px ) {
		width: 100%;
		padding: 18px 0 24px;

		a {
			width: 100%;
		}
	}
`;

/**
 *
 * @param {Object} props The props to use
 *
 * @returns {ReactElement} The rendered component.
 */
function SiteSubscriptionDetail( props ) {
	let rowProps = [];
	if ( props.background ) {
		rowProps.background = props.background;
	}

	let licensesRemaining = props.limit - props.used;

	let anotherLicense = null;
	if ( licensesRemaining === 0 ) {
		anotherLicense = <AddOneLicense><FormattedMessage
			id="site.subscriptions.licenses.add"
			defaultMessage="Get additional subscriptions"/>
			</AddOneLicense>;
	}

	let disable = true;
	if ( props.subscriptionId !== "" ) {
		disable = false;
	}

	return (
		<Row { ...rowProps } flexWrap="wrap" justifyContent="space-between">
			<SubscriptionLeftContainer>
				<SubscriptionToggle>
					<Toggle
						onSetEnablement={ _partial( props.onToggleSubscription, props.subscriptionId ) }
						isEnabled={ props.isEnabled }
						disable={ disable }
						ariaLabel={ props.id } />
				</SubscriptionToggle>
				<SubscriptionLogo src={ props.icon } alt="" />
			</SubscriptionLeftContainer>

			<SubscriptionDetails>
				<ProductName>{ props.name }</ProductName>
				<SubscriptionUsage>
					<FormattedMessage id="subscriptions.remaining" defaultMessage={"{ howMany } remaining"}
						values={{ howMany: licensesRemaining + "/" + props.limit }} />
				</SubscriptionUsage>
				{ anotherLicense }
			</SubscriptionDetails>

			<SubscriptionRightContainer>
				<LargeButtonLink to={ `/account/subscriptions/${ props.subscriptionId }` }>
					<FormattedMessage id="subscriptions.buttons.details" defaultMessage="Details" />
				</LargeButtonLink>
			</SubscriptionRightContainer>
		</Row>
	);
}

SiteSubscriptionDetail.propTypes = {
	id: React.PropTypes.string.isRequired,
	subscriptionId: React.PropTypes.string,
	name: React.PropTypes.string.isRequired,
	onAddMoreLicensesClick: React.PropTypes.func,
	onToggleSubscription: React.PropTypes.func,
	onMoreInfoClick: React.PropTypes.func.isRequired,
	isEnabled: React.PropTypes.bool,
	icon: React.PropTypes.string.isRequired,
	limit: React.PropTypes.number.isRequired,
	used: React.PropTypes.number.isRequired,
	background: React.PropTypes.string,
	intl: intlShape.isRequired,
	currency: React.PropTypes.string,
};

SiteSubscriptionDetail.defaultProps = {
	onToggleSubscription: () => {},
	isEnabled: false,
};

export default injectIntl( SiteSubscriptionDetail );
