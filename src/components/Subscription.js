import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Row, ColumnPrimary, ColumnFixedWidth, ColumnMinWidth, ColumnIcon } from "./Tables";
import SiteIcon from "./SiteIcon";
import MediaQuery from "react-responsive";
import { LargeButton } from "../components/Button.js";
import { ChevronButton } from "../components/Button.js";
import { injectIntl, intlShape, defineMessages, FormattedDate, FormattedNumber } from "react-intl";
import formatAmount from "../../../shared/currency";
import defaults from "../config/defaults.json";
import styled from "styled-components";
import { capitalizeFirstLetter } from "../functions/stringHelpers";
import colors from "yoast-components/style-guide/colors.json";

const messages = defineMessages( {
	product: {
		id: "subscriptions.overview.product",
		defaultMessage: "Product",
	},
	status: {
		id: "subscriptions.overview.status",
		defaultMessage: "Status",
	},
	level: {
		id: "subscriptions.overview.level",
		defaultMessage: "Level",
	},
	used: {
		id: "subscriptions.overview.used",
		defaultMessage: "Used on",
	},
	billingType: {
		id: "subscriptions.overview.billingType",
		defaultMessage: "Billing type",
	},
	nextPaymentOn: {
		id: "subscriptions.overview.nextPaymentOn",
		defaultMessage: "Next billing",
	},
	billingAmount: {
		id: "subscriptions.overview.billingAmount",
		defaultMessage: "Amount",
	},
	manage: {
		id: "subscriptions.overview.manage",
		defaultMessage: "Manage",
	},
	sites: {
		id: "subscriptions.overview.sites",
		defaultMessage: "{ limit } sites",
	},
} );

const StyledRow = styled( Row )`
	color: ${ props => props.dimmed ? colors.$color_grey_text : "inherit" };
`;

StyledRow.propTypes = {
	dimmed: PropTypes.bool,
};

StyledRow.defaultProps = {
	dimmed: false,
};

const StyledSpace = styled.div`
	min-width: ${ props => props.tablet ? 48 : 150 }px;
`;

StyledSpace.propTypes = {
	tablet: PropTypes.bool,
};

const StyledColumnMinWidth = styled( ColumnMinWidth )`
	padding-left: 0px;
	min-width: 102px;
`;

const StyledStatus = styled.span`
	color: ${ props => props.status === "suspended" ? colors.$color_red : "inherit" };
	font-weight: ${ props => props.status === "cancelled" ? "inherit" : "bold" };
`;

StyledStatus.propTypes = {
	status: PropTypes.string.isRequired,
};

const Detail = styled.span`
	display: block;
	font-size: 14px;
`;

const Icon = styled( ColumnIcon )`
	height: 32px;
`;


/**
 * Creates the manage buttons.
 *
 * @param {object} props Properties of the subscription component.
 *
 * @returns {ReactElement} the media query with the manage button.
 */
function getManageButtons( props ) {
	let tabletView = defaults.css.breakpoint.tablet;
	if ( props.status === "cancelled" ) {
		return <Fragment>
			<MediaQuery query={ `(min-width: ${ tabletView + 1 }px)` }>
				<StyledSpace tablet={ false } />
			</MediaQuery>
			<MediaQuery query={ `(max-width: ${ tabletView }px)` }>
				<StyledSpace tablet={ true }/>
			</MediaQuery>
		</Fragment>;
	}
	return <Fragment>
		<MediaQuery query={ `(min-width: ${ tabletView + 1 }px)` }>
			<LargeButton onClick={ props.onManage }>{ props.intl.formatMessage( messages.manage ) }</LargeButton>
		</MediaQuery>
		<MediaQuery query={ `(max-width: ${ tabletView }px)` }>
			<ChevronButton onClick={ props.onManage } aria-label={ props.intl.formatMessage( messages.manage ) } />
		</MediaQuery>
	</Fragment>;
}

getManageButtons.propTypes = {
	status: PropTypes.string.isRequired,
	intl: intlShape.isRequired,
	onManage: PropTypes.func.isRequired,
};

/**
 * Creates the manage buttons.
 *
 * @param {object} props The props of subscriptions.
 * @param {string} nextPayment The next billing.
 * @param {string} amount The amount of the next billing.
 *
 * @returns {ReactElement} the media query with the next billing information.
 */
function getNextBilling( props, nextPayment, amount ) {
	if ( props.status === "pending-cancel" ) {
		return "Ends on " + props.endDate;
	}
	return <Fragment>
		{ nextPayment }
		<Detail>{ amount }</Detail>
	</Fragment>;
}

getNextBilling.propTypes = {
	status: PropTypes.string.isRequired,
	endDate: PropTypes.string,
};
/**
 * Creates a subscription component
 *
 * @param {object} props Properties of the component.
 * @returns {ReactElement} Subscription component.
 * @constructor
 */
function Subscription( props ) {
	let rowProps = [];
	if ( props.background ) {
		rowProps.background = props.background;
	}

	let cancelledOrExpired = props.status === "cancelled" || props.status === "expired";
	let billingType = null;
	let nextPayment = null;
	let amount = null;
	if ( props.status === "active" && ( props.hasNextPayment || props.hasEndDate ) ) {
		nextPayment = <FormattedDate
			value={ props.hasNextPayment ? props.nextPayment : props.endDate }
			year="numeric"
			month="long"
			day="numeric"
		/>;
		amount = <FormattedNumber
			value={ formatAmount( props.billingAmount ) }
			currency={ props.billingCurrency }
			style="currency"
		/>;
		billingType = props.billingType ? "Manual renewal" : "Automatic renewal";
	}
	return (
		<StyledRow key={ props.id } dimmed={ cancelledOrExpired } { ...rowProps } >
			<Icon><SiteIcon src={ props.iconSource } alt=""/></Icon>
			<ColumnPrimary ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.product ) }>
				{ props.name }
				<Detail>
					<StyledStatus status={ props.status }>
						{ capitalizeFirstLetter( props.status ) }
					</StyledStatus>
					{ " - " }
					{ "Subscription number" }
				</Detail>
			</ColumnPrimary>
			<ColumnMinWidth
				ellipsis={ true }
				hideOnMobile={ true }
				headerLabel={ props.intl.formatMessage( messages.used ) }>
				{ props.used }/{ props.limit + " sites" }
			</ColumnMinWidth>
			<StyledColumnMinWidth
				ellipsis={ true }
				hideOnMobile={ true }
				headerLabel={ props.intl.formatMessage( messages.billingType ) }>
				{ billingType }
			</StyledColumnMinWidth>
			<StyledColumnMinWidth
				ellipsis={ true }
				hideOnMobile={ true }
				headerLabel={ props.intl.formatMessage( messages.nextPaymentOn ) }>
				{ getNextBilling( props, nextPayment, amount ) }
			</StyledColumnMinWidth>
			<ColumnFixedWidth>
				{ getManageButtons( props ) }
			</ColumnFixedWidth>
		</StyledRow>
	);
}

Subscription.propTypes = {
	id: PropTypes.string.isRequired,
	iconSource: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	used: PropTypes.number.isRequired,
	status: PropTypes.string.isRequired,
	limit: PropTypes.number.isRequired,
	hasNextPayment: PropTypes.bool.isRequired,
	billingType: PropTypes.bool,
	nextPayment: PropTypes.instanceOf( Date ).isRequired,
	hasEndDate: PropTypes.bool.isRequired,
	endDate: PropTypes.instanceOf( Date ).isRequired,
	billingAmount: PropTypes.number.isRequired,
	billingCurrency: PropTypes.string.isRequired,
	intl: intlShape.isRequired,
	background: PropTypes.string,
	onManage: PropTypes.func.isRequired,
	product: PropTypes.string,
};

Subscription.defaultProps = {
	hasEndDate: false,
};

export default injectIntl( Subscription );
