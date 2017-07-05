import { connect } from "react-redux";
import { updateSiteUrl, loadSites } from "../actions/sites";
import { siteAddSubscription, siteRemoveSubscription, siteRemove } from "../actions/site";
import SitePage from "../components/SitePage";
import { addLicensesPopupOpen, addLicensesPopupClose } from "../actions/subscriptions";
import { getPlugins } from "../functions/products";
import _isEmpty from "lodash/isEmpty";

/**
 * Processes subscriptions.
 *
 * @param {Array} subscriptions The subscriptions.
 *
 * @returns {Object} object containing the processed subscriptions.
 */
function processSubscriptions( subscriptions ) {
	let processed = {};

	subscriptions.forEach( ( subscription ) => {
		// Lets just skip anything that isn't a plugin (for now).
		if ( subscription.product.type !== "plugin" ) {
			return true;
		}

		let product = subscription.product;

		if ( processed.hasOwnProperty( product.glNumber ) ) {
			processed[ product.glNumber ].used += subscription.used;
			processed[ product.glNumber ].limit += subscription.limit;

			return true;
		}

		processed[ product.glNumber ] = {
			used: subscription.used,
			limit: subscription.limit,
			product,
		};
	} );

	return processed;
}

/**
 * Maps the items in the state, to props.
 *
 * @param {Object} state Object containing the current state.
 * @param {Object} ownProps Object containing the props given to the container.
 *
 * @returns {*} The mapped state.
 */
export const mapStateToProps = ( state, ownProps ) => {
	let id = ownProps.match.params.id;
	let sites = state.entities.sites;

	if ( ! sites.byId.hasOwnProperty( id ) ) {
		return { loadingSite: true };
	}

	let addSubscriptionModal = state.ui.addSubscriptionModal;
	let site = sites.byId[ id ];

	let subscriptions = state.entities.subscriptions.allIds.map( ( subscriptionId ) => {
		return state.entities.subscriptions.byId[ subscriptionId ];
	} );

	let subs = processSubscriptions( subscriptions );
	console.log( subs );

	// Map logo to subscriptions and set its state.
	subscriptions = subscriptions.map( ( subscription ) => {
		return Object.assign(
			{},
			{
				productLogo: subscription.product.icon,
			},
			subscription,
			{
				isEnabled: ! ! site.subscriptions && site.subscriptions.includes( subscription.id ),
				price: subscription.product.price,
			}
		);
	} );

	// let activeSubscriptionInformationBlaat = {};
	let activeSubscriptions = subscriptions.filter( ( subscription ) => {
		return subscription.status === "active";
	} );

	let plugins = getPlugins( state.entities.products.byId ).map( ( plugin ) => {
		// Set defaults
		let defaults = {
			limit: 0,
			isEnabled: false,
			used: 0,
			subcriptionId: "",
			currency: "USD",
		};

		plugin = Object.assign( {}, plugin, defaults );

		// Get all subscriptions for this plugin
		let filteredActiveSubscriptions = activeSubscriptions.filter( ( subscription ) => {
			return plugin.ids.includes( subscription.productId );
		} );

		filteredActiveSubscriptions.forEach( ( subscription ) => {
			// Accumulate amount of slots for this plugin.
			plugin.limit += subscription.limit;
			// Accumulate amount of slots in use for this plugin.
			plugin.used += ( subscription.used || 0 );

			/*
			 * If the plugin subscription is enabled for this site, make sure it's
			 * subscriptionId is set on the plugin.
			 */
			if ( subscription.isEnabled === true ) {
				plugin.isEnabled = true;
				plugin.subscriptionId = subscription.id;
			/*
			 * If the plugin subscription Id has not been set and there are still slots
			 * available, set the first available product subscription for this plugin.
			 */
			} else if (
				_isEmpty( plugin.subscriptionId ) &&
				( subscription.limit > ( subscription.used || 0 ) )
			) {
				plugin.subscriptionId = subscription.id;
			}

			// Determine currency based on the subscription currency.
			// Eventually the currency should be made available on the products themselves.
			// This needs to be fixed in the shop.
			plugin.currency = subscription.currency;
		} );

		plugin.hasSubscriptions = plugin.limit > 0;
		plugin.isAvailable = plugin.limit > plugin.used || plugin.isEnabled;

		console.log( plugin );

		return plugin;
	} );

	plugins = plugins.sort( ( a, b ) => {
		if ( a.hasSubscriptions ) {
			if ( a.isAvailable === false && b.isAvailable === true ) {
				return 1;
			}
			return -1;
		}

		return 1;
	} );

	return {
		addSubscriptionModal,
		site,
		subscriptions,
		plugins,
		loadingSubscriptions: state.ui.subscriptions.requesting,
		uiSite: state.ui.site,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	dispatch( loadSites() );
	let siteId = ownProps.match.params.id;

	return {
		onMoreInfoClick: () => {},
		onAddMoreSubscriptionsClick: ( subscriptionId ) => {
			dispatch( addLicensesPopupOpen( subscriptionId ) );
		},
		onToggleDisabled: ( subscriptionId ) => {
			dispatch( addLicensesPopupOpen( subscriptionId ) );
		},
		onClose: () => {
			dispatch( addLicensesPopupClose() );
		},
		onToggleSubscription: ( subscriptionId, enabled ) => {
			if ( enabled ) {
				dispatch( siteAddSubscription( siteId, subscriptionId ) );
			} else {
				dispatch( siteRemoveSubscription( siteId, subscriptionId ) );
			}
		},
		onChange: ( url ) => {
			dispatch( updateSiteUrl( url ) );
		},
		onRemove: () => {
			// eslint-disable-next-line
			if ( window.confirm( "Are you sure you want to remove this site from my.yoast?" ) ) {
				dispatch( siteRemove( siteId ) );
			}
		},
	};
};

const SitePageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SitePage );

export default SitePageContainer;
