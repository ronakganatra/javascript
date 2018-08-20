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
		defaultMessage: "Used",
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

const StyledSpace = styled.div`
	min-width: ${ props => props.tablet ? 48 : 150 }px;
`;

StyledSpace.propTypes = {
	tablet: PropTypes.bool,
};

const StyledRow = styled( Row )`
	color: ${ props => props.status === "cancelled" ? " #646464" : "inherit" };
`;

StyledRow.propTypes = {
	status: PropTypes.string.isRequired,
};

const StyledStatus = styled.span`
	color: ${ props => props.status === "suspended" ? "red" : "inherit" };
	font-weight: ${ props => props.status === "suspended" ? "bold" : "inherit" };
`;

StyledStatus.propTypes = {
	status: PropTypes.string.isRequired,
};

/**
 * Creates the manage buttons.
 *
 * @param {object} props Properties of the subscription component.
 *
 * @returns {ReactElement} the media query with the manage button.
 */
function getManageButtons( props ) {
	let cancelled = props.status === "cancelled";
	let tabletView = defaults.css.breakpoint.tablet;
	if ( cancelled ) {
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

	let nextPayment = "";
	let amount = "";
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
	}
	return (
		<StyledRow key={ props.id } status={ props.status } { ...rowProps } >
			<ColumnIcon separator={ true }><SiteIcon src={ props.iconSource } alt=""/></ColumnIcon>
			<ColumnPrimary ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.product ) }>
				{ props.name }
			</ColumnPrimary>
			<ColumnMinWidth
				ellipsis={ true }
				hideOnMobile={ true }
				hideOnTablet={ false }
				minWidth={ "116px" }
				headerLabel={ props.intl.formatMessage( messages.status ) }>
				<StyledStatus status={ props.status }>
					{ capitalizeFirstLetter( props.status ) }
				</StyledStatus>
			</ColumnMinWidth>
			<ColumnMinWidth
				ellipsis={ true }
				hideOnMobile={ true }
				hideOnTablet={ true }
				headerLabel={ props.intl.formatMessage( messages.level ) }>
				{ props.intl.formatMessage( messages.sites, { limit: props.limit } ) }
			</ColumnMinWidth>
			<ColumnMinWidth
				ellipsis={ true }
				hideOnMobile={ true }
				headerLabel={ props.intl.formatMessage( messages.used ) }>
				{ props.used }/{ props.limit }
			</ColumnMinWidth>
			<ColumnMinWidth
				ellipsis={ true }
				hideOnMobile={ true }
				headerLabel={ props.intl.formatMessage( messages.nextPaymentOn ) }>
				{ nextPayment }
			</ColumnMinWidth>
			<ColumnMinWidth
				ellipsis={ true }
				hideOnMobile={ true }
				hideOnTablet={ true }
				headerLabel={ props.intl.formatMessage( messages.billingAmount ) }>
				{ amount }
			</ColumnMinWidth>
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
