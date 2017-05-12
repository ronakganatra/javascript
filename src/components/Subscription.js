import React from "react";
import styled from "styled-components";
import { Row, ColumnText, Column, ColumnIcon } from "./Tables";
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
		defaultMessage: "{ limit } sites",
	},
} );

const CustomRow = styled( Row )`
	.column--subscription-name {
		flex: 1 1 250px;
	}

	.column--subscription-level,
	.column--subscription-usage,
	.column--subscription-amount {
		flex: 0 1 100px;
	}

	.column--subscription-next-billing {
		flex: 0 1 150px;
	}
`;

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
		<CustomRow key={ props.id } { ...rowProps }>
			<ColumnIcon separator={ true }><SiteIcon src={ props.iconSource } alt=""/></ColumnIcon>
			<ColumnText className="column--subscription-name" headerLabel={ props.intl.formatMessage( messages.product ) }>{ props.name }</ColumnText>
			<ColumnText className="column--subscription-level" hideOnMobile={ true } hideOnTablet={ true } headerLabel={ props.intl.formatMessage( messages.level ) }>
				{ props.intl.formatMessage( messages.sites, { limit: props.limit } ) }
			</ColumnText>
			<ColumnText className="column--subscription-usage" hideOnMobile={ true } headerLabel={ props.intl.formatMessage( messages.usage ) }>
				{ props.used }/{ props.limit }
			</ColumnText>
			<ColumnText className="column--subscription-next-billing" hideOnMobile={ true } headerLabel={ props.intl.formatMessage( messages.nextPaymentOn ) }>
				<FormattedDate value={ props.nextPayment } day="numeric" month="long" year="numeric"/>
			</ColumnText>
			<ColumnText className="column--subscription-amount" hideOnMobile={ true } hideOnTablet={ true } headerLabel={ props.intl.formatMessage( messages.billingAmount ) }>
				<FormattedNumber value={ formatAmount( props.billingAmount ) } currency={ props.billingCurrency } style="currency" />
			</ColumnText>
			<Column>
				<MediaQuery query={ `(min-width: ${ defaults.css.breakpoint.medium + 1 }px)` }>
					<LargeButton onClick={ props.onManage } aria-label={ props.intl.formatMessage( messages.manage ) }
					>{ props.intl.formatMessage( messages.manage ) }</LargeButton>
				</MediaQuery>
				<MediaQuery query={ `(max-width: ${ defaults.css.breakpoint.medium }px)` }>
					<ChevronButton onClick={ props.onManage } aria-label={ props.intl.formatMessage( messages.manage ) } />
				</MediaQuery>

			</Column>
		</CustomRow>
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
