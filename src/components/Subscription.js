import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Row, ColumnPrimary, ColumnFixedWidth, ColumnMinWidth, ColumnIcon } from "./Tables";
import SiteIcon from "./SiteIcon";
import MediaQuery from "react-responsive";
import { LargeButton, ChevronButton } from "../components/Button.js";
import { injectIntl, intlShape, defineMessages, FormattedDate, FormattedNumber, FormattedMessage } from "react-intl";
import formatAmount from "../../../shared/currency";
import defaults from "../config/defaults.json";
import styled from "styled-components";
import { capitalizeFirstLetter } from "../functions/stringHelpers";
import colors from "yoast-components/style-guide/colors.json";

const messages = defineMessages( {
	individualSubscriptions: {
		id: "subscriptions.overview.individualSubscriptions",
		defaultMessage: "Individual subscriptions",
	},
	subscriptions: {
		id: "subscriptions.overview.subscriptions",
		defaultMessage: "Subscriptions",
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
	endsDate: {
		id: "ends.date",
		defaultMessage: "Ends on { endDate }",
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

	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		max-width: ${ props => props.maxWidth && props.maxWidth };
		min-width: ${ props => props.minWidth === "198px" && "158px" };
		padding-left: ${ props => props.paddingLeft ? props.paddingLeft : "0px" };
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		max-width: none;
	}	
`;

StyledColumnMinWidth.propTypes = {
	maxWidth: PropTypes.string,
	minWidth: PropTypes.string,
	paddingLeft: PropTypes.string,
};

const StyledStatus = styled.span`
	color: ${ props => props.status === "suspended" ? colors.$color_red : "inherit" };
	font-weight: ${ props => props.status === "cancelled" ? "inherit" : "bold" };
`;

StyledStatus.propTypes = {
	status: PropTypes.string.isRequired,
};

const Detail = styled.div`
	font-size: 14px;
`;

const Icon = styled( ColumnIcon )`
	height: 32px;
	width: 32px;
`;


/**
 * Creates the manage buttons.
 *
 * @param {object} props Properties of the subscription component.
 *
 * @returns {ReactElement} the media query with the manage button.
 */
function getManageButtons( props ) {
	const tabletView = defaults.css.breakpoint.tablet;
	if ( props.status === "cancelled" ) {
		return <Fragment>
			<MediaQuery query={ `(min-width: ${ tabletView + 1 }px)` }>
				<StyledSpace tablet={ false } />
			</MediaQuery>
			<MediaQuery query={ `(max-width: ${ tabletView }px)` }>
				<StyledSpace tablet={ true } />
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
 * Organizes the billing and endDate information under Next Payment.
 *
 * @param {string} status The status of the subscription.
 * @param {ReactElement} endDate The end date of the subscription.
 * @param {string} nextPayment The next billing.
 * @param {string} amount The amount of the next billing.
 *
 * @returns {ReactElement} A Fragment with the next billing information or the endDate of the subscription.
 */
function getNextBilling( status, endDate, nextPayment, amount ) {
	if ( status === "pending-cancel" ) {
		return <Fragment>
			<FormattedMessage { ...messages.endsDate } values={ { endDate: endDate } } />
		</Fragment>;
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
	const rowProps = [];

	if ( props.background ) {
		rowProps.background = props.background;
	}

	const cancelledOrExpired = props.status === "cancelled" || props.status === "expired";
	let nextPayment = null;
	let endDate = null;
	let amount = null;
	let billingType = null;

	if ( props.status === "pending-cancel" ) {
		endDate = <FormattedDate
			value={ props.hasEndDate && props.endDate }
			year="numeric"
			month="long"
			day="numeric"
		/>;
	}

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
		billingType = props.requiresManualRenewal ? "Manual renewal" : "Automatic renewal";
	}

	return (
		<StyledRow key={ props.id } dimmed={ cancelledOrExpired } { ...rowProps }>
			<Icon><SiteIcon src={ props.iconSource } alt="" /></Icon>
			<ColumnPrimary
				ellipsis={ true }
				headerLabel={ props.intl.formatMessage(
					props.isGrouped ? messages.subscriptions : messages.individualSubscriptions
				) }
			>
				{ props.name }
				<Detail>
					<StyledStatus status={ props.status }>
						{ capitalizeFirstLetter( props.status ) }
					</StyledStatus>
					{ " - " }{ props.subscriptionNumber }
				</Detail>
			</ColumnPrimary>
			<StyledColumnMinWidth
				ellipsis={ true }
				hideOnMobile={ true }
				headerLabel={ props.intl.formatMessage( messages.used ) }
				maxWidth="120px"
				minWidth="102px"
				paddingLeft="inherit"
			>
				{ props.hasSites
					? props.used + "/" + props.limit + " sites"
					: ""
				}
			</StyledColumnMinWidth>
			<StyledColumnMinWidth
				ellipsis={ true }
				hideOnMobile={ true }
				headerLabel={ props.intl.formatMessage( messages.nextPaymentOn ) }
				minWidth="198px"
			>
				{ getNextBilling( props.status, endDate, nextPayment, amount ) }
			</StyledColumnMinWidth>
			<StyledColumnMinWidth
				ellipsis={ true }
				hideOnMobile={ true }
				headerLabel={ props.intl.formatMessage( messages.billingType ) }
				maxWidth="140px"
				minWidth="120px"
			>
				{ billingType }
			</StyledColumnMinWidth>
			<ColumnFixedWidth
				paddingLeft="0px"
			>
				{ getManageButtons( props ) }
			</ColumnFixedWidth>
		</StyledRow>
	);
}

Subscription.propTypes = {
	id: PropTypes.string.isRequired,
	iconSource: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	subscriptionNumber: PropTypes.string,
	used: PropTypes.number.isRequired,
	status: PropTypes.string.isRequired,
	limit: PropTypes.number.isRequired,
	hasNextPayment: PropTypes.bool.isRequired,
	requiresManualRenewal: PropTypes.bool,
	nextPayment: PropTypes.instanceOf( Date ).isRequired,
	hasEndDate: PropTypes.bool.isRequired,
	endDate: PropTypes.instanceOf( Date ).isRequired,
	billingAmount: PropTypes.number.isRequired,
	billingCurrency: PropTypes.string.isRequired,
	intl: intlShape.isRequired,
	background: PropTypes.string,
	onManage: PropTypes.func.isRequired,
	product: PropTypes.string,
	isGrouped: PropTypes.bool.isRequired,
	hasSites: PropTypes.bool.isRequired,
};

Subscription.defaultProps = {
	hasEndDate: false,
};

export default injectIntl( Subscription );
