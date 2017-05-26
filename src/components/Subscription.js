import React from "react";
import { Row, ColumnPrimary, ColumnFixedWidth, ColumnMinWidth, ColumnIcon } from "./Tables";
import SiteIcon from "./SiteIcon";
import MediaQuery from "react-responsive";
import { LargeButton } from "../components/Button.js";
import { ChevronButton } from "../components/RoundButton.js";
import { injectIntl, intlShape, defineMessages, FormattedDate, FormattedNumber } from "react-intl";
import formatAmount from "../../../shared/currency";
import defaults from "../config/defaults.json";

const messages = defineMessages( {
	product: {
		id: "subscriptions.overview.product",
		defaultMessage: "Product",
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

	return (
		<Row key={ props.id } { ...rowProps }>
			<ColumnIcon separator={ true }><SiteIcon src={ props.iconSource } alt=""/></ColumnIcon>
			<ColumnPrimary ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.product ) }>
				{ props.name }
			</ColumnPrimary>
			<ColumnMinWidth ellipsis={ true } hideOnMobile={ true } hideOnTablet={ true } headerLabel={ props.intl.formatMessage( messages.level ) }>
				{ props.intl.formatMessage( messages.sites, { limit: props.limit } ) }
			</ColumnMinWidth>
			<ColumnMinWidth ellipsis={ true } hideOnMobile={ true } headerLabel={ props.intl.formatMessage( messages.used ) }>
				{ props.used }/{ props.limit }
			</ColumnMinWidth>
			<ColumnMinWidth ellipsis={ true } hideOnMobile={ true } headerLabel={ props.intl.formatMessage( messages.nextPaymentOn ) }>
				<FormattedDate value={ props.nextPayment } day="numeric" month="long" year="numeric"/>
			</ColumnMinWidth>
			<ColumnMinWidth ellipsis={ true } hideOnMobile={ true } hideOnTablet={ true } headerLabel={ props.intl.formatMessage( messages.billingAmount ) }>
				<FormattedNumber value={ formatAmount( props.billingAmount ) } currency={ props.billingCurrency } style="currency" />
			</ColumnMinWidth>
			<ColumnFixedWidth>
				<MediaQuery query={ `(min-width: ${ defaults.css.breakpoint.tablet + 1 }px)` }>
					<LargeButton onClick={ props.onManage } aria-label={ props.intl.formatMessage( messages.manage ) }
					>{ props.intl.formatMessage( messages.manage ) }</LargeButton>
				</MediaQuery>
				<MediaQuery query={ `(max-width: ${ defaults.css.breakpoint.tablet }px)` }>
					<ChevronButton onClick={ props.onManage } aria-label={ props.intl.formatMessage( messages.manage ) } />
				</MediaQuery>
			</ColumnFixedWidth>
		</Row>
	);
}

Subscription.propTypes = {
	id: React.PropTypes.string.isRequired,
	iconSource: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	used: React.PropTypes.number.isRequired,
	limit: React.PropTypes.number.isRequired,
	nextPayment: React.PropTypes.instanceOf( Date ).isRequired,
	billingAmount: React.PropTypes.number.isRequired,
	billingCurrency: React.PropTypes.string.isRequired,
	intl: intlShape.isRequired,
	background: React.PropTypes.string,
	onManage: React.PropTypes.func.isRequired,
	product: React.PropTypes.string,
};

export default injectIntl( Subscription );
