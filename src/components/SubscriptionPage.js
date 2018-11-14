import PropTypes from "prop-types";
import React from "react";
import AnimatedLoader from "./Loader";
import Header from "./SubscriptionHeader";
import SubscriptionDetails from "./SubscriptionDetails";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { ListHeading } from "./Headings";
import Orders from "./Orders";
import { Paper } from "./PaperStyles";
import styled from "styled-components";
import defaults from "../config/defaults.json";
import SubscriptionEditModal from "../containers/SubscriptionEditModal";

const messages = defineMessages( {
	paymentDetailsTitle: {
		id: "subscriptionPage.paymentDetails.title",
		defaultMessage: "Payment details",
	},
	invoicesTitle: {
		id: "subscriptionPage.invoices.title",
		defaultMessage: "Invoices",
	},
} );

/**
 * Changes the default styling of the Orders ListTable.
 *
 * @param {ReactElement} orders The original Orders component.
 * @returns {ReactElement} The Orders component with changed styling.
 */
export function styledOrders( orders ) {
	return styled( orders )`
		li:first-child {
			margin-top: 40px;
		}

		li > span::before {
			top: -20px;
			font-size: 1em;
		}

		@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
			li:first-child {
				margin-top: 0;
			}
		}
	`;
}

const SubscriptionOrders = styledOrders( Orders );

/**
 * Returns the rendered SubscriptionPage component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered SubscriptionPage component.
 */
class SubscriptionPage extends React.Component {
	constructor( props ) {
		super( props );
		// Fetch subscriptions, orders and sites.
		this.props.loadData();
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		if ( this.props.isLoading ) {
			return <AnimatedLoader />;
		}

		const { subscription } = this.props;

		return <section>
			<Header
				name={ subscription.name }
				byline={ subscription.limit + " site subscription" }
				image={ subscription.product.icon }
			/>
			<Paper>
				<ListHeading>
					{ this.props.intl.formatMessage( messages.paymentDetailsTitle ) }
				</ListHeading>
				<SubscriptionDetails
					startDate={ new Date( subscription.startDate ) }
					hasNextBilling={ subscription.nextPayment !== null }
					nextBilling={ new Date( subscription.nextPayment ) }
					hasEndDate={ subscription.endDate !== null }
					endDate={ new Date( subscription.endDate ) }
					max={ subscription.limit }
					current={ 1 }
					orders={ this.props.orders }
					onCancelClick={ ( e ) => {
						e.preventDefault();
						this.props.openCancelModal();
					} }
					canCancel={ subscription.requiresManualRenewal === true }
					status={ subscription.status }
				/>
				<ListHeading>
					{ this.props.intl.formatMessage( messages.invoicesTitle ) }
				</ListHeading>
				<SubscriptionOrders hasPaper={ false } { ...this.props } />
			</Paper>
			<SubscriptionEditModal subscriptionId={ subscription.id } />
		</section>;
	}
}

SubscriptionPage.propTypes = {
	isLoading: PropTypes.bool,
	subscription: PropTypes.shape( {
		name: PropTypes.string.isRequired,
		limit: PropTypes.number.isRequired,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string,
		nextPayment: PropTypes.string,
		product: PropTypes.shape( {
			icon: PropTypes.string.isRequired,
		} ),
		status: PropTypes.string.isRequired,
	} ),
	orders: PropTypes.array,
	intl: intlShape.isRequired,
	openCancelModal: PropTypes.func.isRequired,
	loadData: PropTypes.func.isRequired,
};

SubscriptionPage.defaultProps = {
	isLoading: false,
	orders: [],
};

export default injectIntl( SubscriptionPage );
