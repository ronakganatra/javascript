import React from "react";
import { ColumnIcon } from "./ColumnIcon";
import { Row, ColumnText, Column } from "./Tables";
import SiteIcon from "./SiteIcon";
import MediaQuery from "react-responsive";
import { LargeButton } from "../components/Button.js";
import { ChevronButton } from "../components/RoundButton.js";
import { Link } from "react-router-dom";
import { injectIntl, intlShape, defineMessages } from "react-intl";

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
} );

/**
 * Creates a subscription element
 *
 * @param {object} props Properties of the element.
 * @returns {JSX.Element} Subscription element.
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

	return (
		<Row key={ props.id } { ...rowProps }>
			<ColumnIcon separator={ true } hideOnMobile={ true }><SiteIcon src={ props.icon } alt=""/></ColumnIcon>
			<ColumnText label={ props.intl.formatMessage( messages.product ) }>{ props.name }</ColumnText>
			<ColumnText hideOnMobile={ true } hideOnTablet={ true } label={ props.intl.formatMessage( messages.level ) } ColumnWidth="100px">{ props.max }</ColumnText>
			<ColumnText hideOnMobile={ true } label={ props.intl.formatMessage( messages.usage ) } ColumnWidth="100px">{ props.used } / { props.max }</ColumnText>
			<ColumnText label={ props.intl.formatMessage( messages.nextBillingOn ) } ColumnWidth="200px">{ props.nextBilling }</ColumnText>
			<ColumnText hideOnMobile={ true } hideOnTablet={ true } label={ props.intl.formatMessage( messages.billingAmount ) }
			            ColumnWidth="100px">{ props.billingCurrency } { props.intl.formatNumber( props.billingAmount ) }</ColumnText>
			<Column textAlign="right">
				<MediaQuery query="(min-width: 1356px)">
					<Link to="/subscriptions/[id]">
						<LargeButton aria-label={ props.intl.formatMessage( messages.manage ) }>{ props.intl.formatMessage( messages.manage ) }</LargeButton>
					</Link>
				</MediaQuery>
				<MediaQuery query="(max-width: 1355px)">
				<Link to="/subscriptions/[id]">
				<ChevronButton aria-label={ props.intl.formatMessage( messages.manage ) }/>
				</Link>
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
	max: React.PropTypes.number.isRequired,
	nextBilling: React.PropTypes.string.isRequired,
	billingAmount: React.PropTypes.number.isRequired,
	billingCurrency: React.PropTypes.string.isRequired,
	intl: intlShape.isRequired,
};

export default injectIntl( Subscription );
