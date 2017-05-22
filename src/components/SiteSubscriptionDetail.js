import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { LargeButtonLink, makeButtonFullWidth } from "./Button";
import Toggle from "./Toggle";
import plusIcon from "../icons/blue-plus-circle.svg";
import { FormattedMessage } from "react-intl";
import { RowMobileCollapse, ColumnPrimary, ColumnFixedWidth, makeFullWidth } from "./Tables";
import _partial from "lodash/partial";
import AddLicensesModal from "./AddLicensesModal";
import { injectIntl, intlShape } from "react-intl";
import defaults from "../config/defaults.json";

const SubscriptionLogo = styled.img`
	display: inline-block;
	width: 66px;
	height: 66px;
	vertical-align: middle;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: none;
	}
`;

const SubscriptionToggle = styled.span`
	display: inline-block;
	vertical-align: middle;
	margin: 6px 40px 0 2px;

	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		margin-right: 24px;
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		margin-right: 0;
	}
`;

const ProductName = styled.span`
	font-size: 16px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: block;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		white-space: normal;
	}
`;

const SubscriptionUsage = styled.span`
	display: inline-block;
	font-weight: 300;
	margin-right: 10px;
`;

const AddOneLicense = styled.a`
	font-size: 14px;
	font-weight: 300;
	font-style: italic;
	text-decoration: none;
	border: none;
	background: transparent url( ${ plusIcon } ) no-repeat 2px 2px;
	background-size: 16px;
	color: ${ colors.$color_blue };
	cursor: pointer;
	padding: 0 0 0 22px;
	text-align: left;
`;

let ColumnFixedWidthResponsive = makeFullWidth( ColumnFixedWidth );
let ResponsiveLargeButtonLink = makeButtonFullWidth( LargeButtonLink );

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
		<RowMobileCollapse { ...rowProps } hasHeaderLabels={ false }>
			<ColumnFixedWidth>
				<SubscriptionToggle>
					<Toggle
						onSetEnablement={ _partial( props.onToggleSubscription, props.subscriptionId ) }
						onToggleDisabled={ props.onToggleDisabled }
						isEnabled={ props.isEnabled }
						disable={ disable }
						ariaLabel={ props.id } />
				</SubscriptionToggle>
				<SubscriptionLogo src={ props.icon } alt="" />
			</ColumnFixedWidth>

			<ColumnPrimary>
				<ProductName>{ props.name }</ProductName>
				<SubscriptionUsage>
					<FormattedMessage id="subscriptions.remaining" defaultMessage={"{ howMany } remaining"}
						values={{ howMany: licensesRemaining + "/" + props.limit }} />
				</SubscriptionUsage>
				{ anotherLicense }
			</ColumnPrimary>
			{ modal }
			<ColumnFixedWidthResponsive>
				<ResponsiveLargeButtonLink to={ `/account/subscriptions/${ props.subscriptionId }` }>
					<FormattedMessage id="subscriptions.buttons.details" defaultMessage="Details" />
				</ResponsiveLargeButtonLink>
			</ColumnFixedWidthResponsive>
		</RowMobileCollapse>
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
