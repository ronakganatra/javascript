import PropTypes from "prop-types";
import React from "react";
import AnimatedLoader from "./Loader";
import Header from "./SubscriptionHeader";
import SubscriptionDetails, { ColumnFixedWidthResponsive, RowMobileCollapseNoMinHeight } from "./SubscriptionDetails";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
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
	downloadLinkText: {
		id: "subscriptionPage.download.linkText",
		defaultMessage: "Download",
	},
	installationGuide: {
		id: "subscriptionPage.installationGuide",
		defaultMessage: "Read our installation guides",
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

const DownloadListHeading = styled( ListHeading )`
	display: flex;
	justify-content: space-between;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		flex-direction: column;
	}
`;

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
	 * Returns the modal for canceling the subscription.
	 *
	 * @returns {ReactElement} The modal for canceling the subscription.
	 */
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
	 * Creates a list based on the passed downloads.
	 *
	 * @param {array} downloads The downloads to show in the list.
	 * @returns {ReactElement} The list of downloads.
	 */
	getDownloadsList( downloads ) {
		return <ListTable>
			{ downloads.map( download => {
				return (
					<RowMobileCollapseNoMinHeight hasHeaderLabels={ false } key={ download.name }>
						<ColumnMinWidth ellipsis={ true }>
							{ download.name }
						</ColumnMinWidth>
						<ColumnFixedWidthResponsive ellipsis={ true }>
							<Link
								to={ download.file }
								linkTarget={ "_blank" }
							>
								<FormattedMessage { ...messages.downloadLinkText } />
							</Link>
						</ColumnFixedWidthResponsive>
					</RowMobileCollapseNoMinHeight>
				);
			} ) }
		</ListTable>;
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
				<DownloadListHeading>
					<FormattedMessage { ...messages.downloadTitle } />
					<Link
						to={ "https://yoa.st/myyoast-installation" }
						linkTarget={ "_blank" }
					>
						<FormattedMessage { ...messages.installationGuide } />
					</Link>
				</DownloadListHeading>
				{ this.getDownloadsList( this.props.downloads ) }
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
	downloads: PropTypes.arrayOf( PropTypes.object ),
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
	downloads: [],
};

export default injectIntl( SubscriptionPage );
