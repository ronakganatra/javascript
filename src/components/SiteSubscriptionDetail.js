import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { LargeButtonLink } from "./Button";
import Toggle from "./Toggle";
import plusIcon from "../icons/blue-plus-circle.svg";
import { FormattedMessage } from "react-intl";
import { Row, Column } from "./Tables";
import _partial from "lodash/partial";
import AddLicensesModal from "./AddLicensesModal";
import { injectIntl, intlShape } from "react-intl";

let responsiveWidthThreshold = 1355;

const CustomRow = styled( Row )`
	flex-wrap: wrap;

	.column--site-subscription-detail-toggle-logo {
		@media screen and ( max-width: 800px ) {
			align-self: flex-start;
		}
	}

	.column--site-subscription-detail-details {
		color: ${ colors.$color_black };
		padding-left: 40px;
		flex: 1 1;
		overflow: hidden;
		max-width: 100%;

		@media screen and ( max-width: ${ responsiveWidthThreshold }px ) {
			padding-left: 24px;
		}

		@media screen and ( max-width: 800px ) {
			padding: 6px 0 0 18px;
			align-self: flex-start;
		}
	}

	.column--site-subscription-detail-button {
		padding-left: 40px;

		@media screen and ( max-width: ${ responsiveWidthThreshold }px ) {
			padding-left: 24px;
		}

		@media screen and ( max-width: 800px ) {
			width: 100%;
			padding: 18px 0 6px;

			a {
				width: 100%;
				margin: 0;
			}
		}
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
	margin: 6px 40px 0 2px;

	@media screen and ( max-width: ${ responsiveWidthThreshold }px ) {
		margin-right: 24px;
	}

	@media screen and ( max-width: 800px ) {
		margin-right: 0;
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

const AddOneLicense = styled.a`
	font-size: 14px;
	font-weight: 300;
	font-style: italic;
	text-decoration: none;
	border: none;
	background: transparent url( ${ plusIcon } ) no-repeat 0 0;
	background-size: 16px;
	color: ${ colors.$color_blue };
	cursor: pointer;
	padding: 0 0 0 20px;
	text-align: left;
`;

/**
 * Creates Site Subscriptions component
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
	let modal = (
		<AddLicensesModal isOpen={ props.popupOpen } onUpgrade={ props.onUpgrade } onClose={ props.onClose }/>
	);

	let licensesRemaining = props.limit - props.used;

	let anotherLicense = null;
	if ( licensesRemaining === 0 ) {
		anotherLicense = <AddOneLicense href={ props.storeUrl }><FormattedMessage
			id="site.subscriptions.licenses.add"
			defaultMessage="Get additional subscriptions"/>
			</AddOneLicense>;
	}

	let disable = true;
	if ( props.subscriptionId !== "" ) {
		disable = false;
	}
	return (
		<CustomRow { ...rowProps }>
			<Column className="column--site-subscription-detail-toggle-logo">
				<SubscriptionToggle>
					<Toggle
						onSetEnablement={ _partial( props.onToggleSubscription, props.subscriptionId ) }
						onToggleDisabled={ props.onToggleDisabled }
						isEnabled={ props.isEnabled }
						disable={ disable }
						ariaLabel={ props.id } />
				</SubscriptionToggle>
				<SubscriptionLogo src={ props.icon } alt="" />
			</Column>

			<Column className="column--site-subscription-detail-details">
				<ProductName>{ props.name }</ProductName>
				<SubscriptionUsage>
					<FormattedMessage id="subscriptions.remaining" defaultMessage={"{ howMany } remaining"}
						values={{ howMany: licensesRemaining + "/" + props.limit }} />
				</SubscriptionUsage>
				{ anotherLicense }
			</Column>
			{ modal }
			<Column className="column--site-subscription-detail-button">
				<LargeButtonLink to={ `/account/subscriptions/${ props.subscriptionId }` }>
					<FormattedMessage id="subscriptions.buttons.details" defaultMessage="Details" />
				</LargeButtonLink>
			</Column>
		</CustomRow>
	);
}

SiteSubscriptionDetail.propTypes = {
	id: React.PropTypes.string.isRequired,
	subscriptionId: React.PropTypes.string,
	name: React.PropTypes.string.isRequired,
	onAddMoreLicensesClick: React.PropTypes.func,
	onClickToggle: React.PropTypes.func,
	onToggleSubscription: React.PropTypes.func,
	onToggleDisabled: React.PropTypes.func,
	onMoreInfoClick: React.PropTypes.func.isRequired,
	onSettingsClick: React.PropTypes.func.isRequired,
	onUpgrade: React.PropTypes.string.isRequired,
	isEnabled: React.PropTypes.bool,
	icon: React.PropTypes.string.isRequired,
	limit: React.PropTypes.number.isRequired,
	used: React.PropTypes.number.isRequired,
	background: React.PropTypes.string,
	intl: intlShape.isRequired,
	currency: React.PropTypes.string,
	popupOpen: React.PropTypes.bool,
	onClose: React.PropTypes.func.isRequired,
	storeUrl: React.PropTypes.string.isRequired,
};

SiteSubscriptionDetail.defaultProps = {
	onToggleSubscription: () => {},
	isEnabled: false,
};

export default injectIntl( SiteSubscriptionDetail );
