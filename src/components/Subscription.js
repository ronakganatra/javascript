import React from "react";
import { ColumnIcon } from "./ColumnIcon";
import { Row, ColumnText, Column } from "./Tables";
import SiteIcon from "./SiteIcon";
import MediaQuery from "react-responsive";
import { LargeButton } from "../components/Button.js";
import { ChevronButton } from "../components/RoundButton.js";
import { injectIntl, intlShape, defineMessages, FormattedDate } from "react-intl";
import { Link } from "react-router-dom";

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
	nextBillingOn: {
		id: "subscriptions.overview.nextBillingOn",
		defaultMessage: "Next billing on",
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
		defaultMessage: "{max} sites",
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
	let rowProps = Object.assign( {}, props );

	// Possibly prettify this.
	delete rowProps.id;
	delete rowProps.name;
	delete rowProps.icon;
	delete rowProps.used;
	delete rowProps.max;
	delete rowProps.nextBilling;
	delete rowProps.billingCurrency;
	delete rowProps.billingAmount;
	delete rowProps.onManage;

	return (
		<Row key={ props.id } { ...rowProps }>
			<ColumnIcon separator={ true }><SiteIcon src={ props.icon } alt=""/></ColumnIcon>
			<ColumnText label={ props.intl.formatMessage( messages.product ) }>{ props.name }</ColumnText>
			<ColumnText hideOnMobile={ true } hideOnTablet={ true } label={ props.intl.formatMessage( messages.level ) }
			            ColumnWidth="100px">{ props.intl.formatMessage( messages.sites, { max: props.max } ) }</ColumnText>
			<ColumnText hideOnMobile={ true } label={ props.intl.formatMessage( messages.usage ) } ColumnWidth="100px">{ props.used }/{ props.max }</ColumnText>
			<ColumnText hideOnMobile={ true } label={ props.intl.formatMessage( messages.nextBillingOn ) } ColumnWidth="200px"><FormattedDate value={ props.nextBilling }/></ColumnText>
			<ColumnText hideOnMobile={ true } hideOnTablet={ true } label={ props.intl.formatMessage( messages.billingAmount ) }
			            ColumnWidth="100px">{ props.billingCurrency } { props.intl.formatNumber( props.billingAmount ) }</ColumnText>
			<Column textAlign="right">
				<Link to={ "/subscriptions/" + props.id }><MediaQuery query="(min-width: 1356px)">
					<LargeButton aria-label={ props.intl.formatMessage( messages.manage ) }
					             onClick={ props.onManage }>{ props.intl.formatMessage( messages.manage ) }</LargeButton>
				</MediaQuery>
				<MediaQuery query="(max-width: 1355px)">
					<ChevronButton aria-label={ props.intl.formatMessage( messages.manage ) }
					               onClick={ props.onManage } />
				</MediaQuery>
				</Link>
			</Column>
		</Row>
	);
}

Subscription.propTypes = {
	id: React.PropTypes.string.isRequired,
	icon: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	used: React.PropTypes.number.isRequired,
	max: React.PropTypes.number.isRequired,
	nextBilling: React.PropTypes.instanceOf( Date ).isRequired,
	billingAmount: React.PropTypes.number.isRequired,
	billingCurrency: React.PropTypes.string.isRequired,
	onManage: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
};

export default injectIntl( Subscription );
