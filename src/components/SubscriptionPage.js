import PropTypes from "prop-types";
import React from "react";
import AnimatedLoader from "./Loader";
import Header from "./SubscriptionHeader";
import SubscriptionDetails, { ColumnFixedWidthResponsive, RowMobileCollapseNoMinHeight } from "./SubscriptionDetails";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { ListHeading } from "./Headings";
import Orders from "./Orders";
import { Paper } from "./PaperStyles";
import styled from "styled-components";
import defaults from "../config/defaults.json";
import SubscriptionCancelModal from "./SubscriptionCancelModal";
import { ColumnMinWidth } from "./Tables";
import { ListTable } from "./Tables";
import Link from "./Link";

const messages = defineMessages( {
	paymentDetailsTitle: {
		id: "subscriptionPage.paymentDetails.title",
		defaultMessage: "Payment details",
	},
	invoicesTitle: {
		id: "subscriptionPage.invoices.title",
		defaultMessage: "Invoices",
	},
	downloadTitle: {
		id: "subscriptionPage.download.title",
		defaultMessage: "Included products",
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

	getModal() {
		const subscription = this.props.subscription;
		const otherSites = this.props.connectedSubscriptionsSites.filter( connectedSubscriptionsSite =>
			this.props.sites.every( site =>
				site.id !== connectedSubscriptionsSite.id
			)
		);
		return (
			<SubscriptionCancelModal
				isOpen={ this.props.cancelModalOpen }
				onClose={ this.props.closeCancelModal }
				cancelSubscription={ this.props.cancelSubscription.bind( this, subscription.id, subscription.sourceShopId ) }
				loading={ this.props.cancelLoading }
				error={ this.props.cancelError }
				amountOfActiveSites={ this.props.sites.length + otherSites.length }
				connectedSubscriptions={ this.props.connectedSubscriptions }
			/>
		);
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

		const subscription = this.props.subscription;
		// It seems that there are subscriptions that give access to multiple products, this code should be changed
		// To adept for that.
		const downloads = [ {
			id: this.props.subscription.name,
			link: this.props.subscription.product.downloads[ 0 ].file,
		} ];

		const downloadList =
			<ListTable>
				{ downloads.map( download => {
					return (
						<RowMobileCollapseNoMinHeight hasHeaderLabels={ false } key="download">
							<ColumnMinWidth ellipsis={ true }>
								{ download.id }
							</ColumnMinWidth>
							<ColumnFixedWidthResponsive ellipsis={ true }>
								<Link
									to={ download.link }
									aria-label={ "Download" }
									linkTarget={ "_blank" }
								>
									Download
								</Link>
							</ColumnFixedWidthResponsive>
						</RowMobileCollapseNoMinHeight>
					);
				} ) }
			</ListTable>;

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
					canCancel={ subscription.requiresManualRenewal === false }
					status={ subscription.status }
					connectedSubscriptions={ this.props.connectedSubscriptions }
				/>
				<ListHeading>
					{ this.props.intl.formatMessage( messages.invoicesTitle ) }
				</ListHeading>
				<SubscriptionOrders hasPaper={ false } { ...this.props } />
				<ListHeading>
					{ this.props.intl.formatMessage( messages.downloadTitle ) }
					<Link
						// This link should be styled to the right.
						to={ "https://yoa.st/myyoast-installation" }
						linkTarget={ "_blank" }
					>
						Read our installation guides
					</Link>
				</ListHeading>
				{ downloadList }
			</Paper>
			{ this.getModal() }
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
	sites: PropTypes.array,
	connectedSubscriptions: PropTypes.array,
	connectedSubscriptionsSites: PropTypes.array,
	intl: intlShape.isRequired,
	cancelSubscription: PropTypes.func.isRequired,
	openCancelModal: PropTypes.func.isRequired,
	closeCancelModal: PropTypes.func.isRequired,
	cancelModalOpen: PropTypes.bool.isRequired,
	cancelLoading: PropTypes.bool.isRequired,
	cancelSuccess: PropTypes.bool.isRequired,
	cancelError: PropTypes.object,
	loadData: PropTypes.func.isRequired,
};

SubscriptionPage.defaultProps = {
	isLoading: false,
	orders: [],
	sites: [],
	connectedSubscriptions: [],
	connectedSubscriptionsSites: [],
	cancelModalOpen: false,
	cancelLoading: false,
	cancelSuccess: false,
	cancelError: null,
};

export default injectIntl( SubscriptionPage );
