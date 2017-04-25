import React from "react";
import { ColumnIcon } from "./ColumnIcon";
import { Row, ColumnText, Column } from "./Tables";
import SiteIcon from "./SiteIcon";
import MediaQuery from "react-responsive";
import { LargeButton } from "../components/Button.js";
import { ChevronButton } from "../components/RoundButton.js";
import { injectIntl, intlShape, defineMessages, FormattedDate, FormattedNumber } from "react-intl";
import { formatAmount } from "../functions/currency";

const messages = defineMessages( {
	product: {
		id: "subscriptions.overview.product",
		defaultMessage: "Product",
	},
	level: {
		id: "subscriptions.overview.level",
		defaultMessage: "Level",
	},
	usage: {
		id: "subscriptions.overview.usage",
		defaultMessage: "Usage",
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
		defaultMessage: "{limit} sites",
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
			<ColumnIcon separator={ true }><SiteIcon src={ props.icon } alt=""/></ColumnIcon>
			<ColumnText fillSpace={ true } ColumnWidth="250px" label={ props.intl.formatMessage( messages.product ) }>{ props.name }</ColumnText>
			<ColumnText hideOnMobile={ true } hideOnTablet={ true } label={ props.intl.formatMessage( messages.level ) }
			            ColumnWidth="100px">{ props.intl.formatMessage( messages.sites, { limit: props.limit } ) }</ColumnText>
			<ColumnText hideOnMobile={ true } label={ props.intl.formatMessage( messages.usage ) } ColumnWidth="100px">{ props.used }/{ props.limit }</ColumnText>
			<ColumnText hideOnMobile={ true } label={ props.intl.formatMessage( messages.nextPaymentOn ) } ColumnWidth="150px">
				<FormattedDate value={ props.nextPayment } day="numeric" month="long" year="numeric"/>
			</ColumnText>
			<ColumnText hideOnMobile={ true } hideOnTablet={ true } headerLabel={ props.intl.formatMessage( messages.billingAmount ) }
			            ColumnWidth="100px">
				<FormattedNumber value={ formatAmount( props.billingAmount ) } currency={ props.billingCurrency } style="currency" /></ColumnText>
			<Column textAlign="right">
				<MediaQuery query="(min-width: 1356px)">
					<LargeButton onClick={ props.onManage } aria-label={ props.intl.formatMessage( messages.manage ) }
					>{ props.intl.formatMessage( messages.manage ) }</LargeButton>
				</MediaQuery>
				<MediaQuery query="(max-width: 1355px)">
					<ChevronButton onClick={ props.onManage } aria-label={ props.intl.formatMessage( messages.manage ) } />
				</MediaQuery>

			</Column>
		</Row>
	);
}

Subscription.propTypes = {
	id: React.PropTypes.string.isRequired,
	icon: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	used: React.PropTypes.number.isRequired,
	limit: React.PropTypes.number.isRequired,
	nextPayment: React.PropTypes.instanceOf( Date ).isRequired,
	billingAmount: React.PropTypes.number.isRequired,
	billingCurrency: React.PropTypes.string.isRequired,
	intl: intlShape.isRequired,
	background: React.PropTypes.string,
	onManage: React.PropTypes.func.isRequired,
};

export default injectIntl( Subscription );
