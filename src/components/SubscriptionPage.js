import React from "react";
import AnimatedLoader from "./Loader";
import Header from "./SubscriptionHeader";
import SubscriptionDetails from "./SubscriptionDetails";
import { BackButtonLink } from "./Button";

/**
 * Returns the rendered SubscriptionPage component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered SubscriptionPage component.
 */
class SubscriptionPage extends React.Component {
	render() {
		if ( this.props.isLoading ) {
			return <AnimatedLoader />;
		}

		let subscription = this.props.subscription;

		return <section>
			<BackButtonLink to={ "/account/subscriptions" } >Back</BackButtonLink>
			<Header
				name={ subscription.name }
				byline={ subscription.limit + " site subscription" }
				description={ subscription.product.description }
				image={ subscription.product.icon } />
			<SubscriptionDetails
				startDate={ new Date( subscription.startDate ) }
				nextBilling={ new Date( subscription.nextPayment ) }
				endDate={ new Date( subscription.endDate ) }
				max={ subscription.limit }
				current={ 1 }
				invoices={ this.props.invoices }
				onAddSite={ this.props.onAddSite }
				onShop={ subscription.product.storeUrl }
				onCancel={ this.props.onCancel }
				onInvoiceDownload={ this.props.onInvoiceDownload }
			/>
		</section>;
	}
}

SubscriptionPage.propTypes = {
	isLoading: React.PropTypes.bool,
	subscription: React.PropTypes.shape( {
		name: React.PropTypes.string.isRequired,
		limit: React.PropTypes.number.isRequired,
		startDate: React.PropTypes.string.isRequired,
		endDate: React.PropTypes.string,
		nextPayment: React.PropTypes.string,
		product: React.PropTypes.shape( {
			description: React.PropTypes.string.isRequired,
			icon: React.PropTypes.string.isRequired,
		} ),
	} ),
	invoices: React.PropTypes.array,
	onAddSite: React.PropTypes.func,
	onShop: React.PropTypes.string,
	onCancel: React.PropTypes.func,
	onInvoiceDownload: React.PropTypes.func,
};

SubscriptionPage.defaultProps = {
	isLoading: false,
	invoices: [],
	onAddSite: () => {},
	onShop: "",
	onCancel: () => {},
	onInvoiceDownload: () => {},
};

export default SubscriptionPage;
