import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { LargeButton, LargeButtonLink, IconButtonTransparentLink, makeButtonFullWidth } from "./Button";
import Toggle from "./Toggle";
import plusIcon from "../icons/blue-plus-circle.svg";
import { FormattedMessage, injectIntl, intlShape, defineMessages } from "react-intl";
import { RowMobileCollapse, ColumnPrimary, ColumnFixedWidth, makeFullWidth } from "./Tables";
import _partial from "lodash/partial";
import defaults from "../config/defaults.json";
import util from "util";
import colors from "yoast-components/style-guide/colors";

/* eslint-disable no-unused-vars */


const messages = defineMessages( {
	toggleAriaLabel: {
		id: "site.subscriptionDetail.toggle",
		defaultMessage: "Enable subscription for: %s",
	},
} );

const SubscriptionLogo = styled.img`
	display: inline-block;
	width: 66px;
	height: 66px;
	vertical-align: middle;
	opacity: ${ props => props.hasSubscriptions ? "1" : "0.2" };

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: none;
	}
`;

const SubscriptionToggle = styled.span`
	display: inline-block;
 	visibility: ${ props => props.hasSubscriptions ? "initial" : "hidden" };
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
	display: ${ props => props.hasSubscriptions ? "inline-block" : "none" };
	font-weight: 300;
	margin-right: 8px;
	margin-top: 4px;
`;

const ColumnFixedWidthResponsive = makeFullWidth( ColumnFixedWidth );
const ResponsiveLargeButtonLink = makeButtonFullWidth( LargeButtonLink );
const ResponsiveLargeButton = makeButtonFullWidth( LargeButton );

const ColumnFixedWidthEnabled = styled( ColumnFixedWidthResponsive )`
	display: ${ props => props.isEnabled ? "inline-block" : "none" };
`;

/**
 * Creates Site Subscriptions component
 *
 * @param {Object} props The props to use
 *
 * @returns {ReactElement} The rendered component.
 */
function SiteSubscriptionDetail( props ) {
	const rowProps = [];
	if ( props.background ) {
		rowProps.background = props.background;
	}

	let anotherLicenseMessage = "Get a subscription";
	if ( props.limit > 0 ) {
		anotherLicenseMessage = "Get another subscription";
	}
	const anotherLicense = (
		<IconButtonTransparentLink to={ props.storeUrl } linkTarget="_blank" iconSource={ plusIcon } iconSize={ "1em" }>
			<FormattedMessage
				id="site.subscriptions.licenses.add"
				defaultMessage={ anotherLicenseMessage }
			/>
		</IconButtonTransparentLink>
	);

	let disable = true;
	if ( props.subscriptionId !== "" ) {
		disable = false;
	}
	return (
		<RowMobileCollapse { ...rowProps } hasHeaderLabels={ false }>
			<ColumnFixedWidth>
				<SubscriptionToggle hasSubscriptions={ props.hasSubscriptions }>
					<Toggle
						onSetEnablement={ _partial( props.onToggleSubscription, props.subscriptionId ) }
						onToggleDisabled={ props.onToggleDisabled }
						isEnabled={ props.isEnabled }
						disable={ disable }
						ariaLabel={ util.format( props.intl.formatMessage( messages.toggleAriaLabel ), props.name ) }
					/>
				</SubscriptionToggle>
				<SubscriptionLogo hasSubscriptions={ props.hasSubscriptions } src={ props.icon } alt="" />
			</ColumnFixedWidth>

			<ColumnPrimary>
				<ProductName>{ props.name }</ProductName>
				<SubscriptionUsage hasSubscriptions={ props.hasSubscriptions }>
					<FormattedMessage
						id="subscriptions.remaining" defaultMessage={ "{ howMany } used" }
						values={ { howMany: props.used + "/" + props.limit } }
					/>
				</SubscriptionUsage>
				{ anotherLicense }
			</ColumnPrimary>
			<ColumnFixedWidthEnabled isEnabled={ props.isEnabled }>
				<ResponsiveLargeButton onClick={ _partial( props.onDownloadModalOpen, props.subscriptionId ) }>
					<FormattedMessage id="subscriptions.buttons.download" defaultMessage="Download" />
				</ResponsiveLargeButton>
			</ColumnFixedWidthEnabled>
			<ColumnFixedWidthEnabled isEnabled={ props.isEnabled }>
				<ResponsiveLargeButtonLink to={ `/account/subscriptions/${ props.subscriptionId }` }>
					<FormattedMessage id="subscriptions.buttons.manage" defaultMessage="Manage" />
				</ResponsiveLargeButtonLink>
			</ColumnFixedWidthEnabled>
		</RowMobileCollapse>
	);
}

SiteSubscriptionDetail.propTypes = {
	name: PropTypes.string.isRequired,
	onMoreInfoClick: PropTypes.func.isRequired,
	onShop: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	limit: PropTypes.number.isRequired,
	used: PropTypes.number.isRequired,
	intl: intlShape.isRequired,
	onClose: PropTypes.func.isRequired,
	storeUrl: PropTypes.string.isRequired,
	onToggleSubscription: PropTypes.func.isRequired,
	onToggleDisabled: PropTypes.func.isRequired,
	hasSubscriptions: PropTypes.bool.isRequired,
	subscriptionId: PropTypes.string,
	isEnabled: PropTypes.bool,
	background: PropTypes.string,
	onDownloadModalOpen: PropTypes.func,
};

SiteSubscriptionDetail.defaultProps = {
	isEnabled: false,
	onDownloadModalOpen: () => {},
	subscriptionId: "",
	background: colors.$color_white,
};

export default injectIntl( SiteSubscriptionDetail );
