import { connect } from "react-redux";
import { updateSiteUrl, loadSites } from "../actions/sites";
import { siteAddSubscription, siteRemoveSubscription, siteRemove, siteChangePlatform } from "../actions/site";
import SitePage from "../components/SitePage";
import { addLicensesModalOpen, addLicensesModalClose } from "../actions/subscriptions";
import { getPluginsForSiteType, sortPluginsByPopularity } from "../functions/products";
import _isEmpty from "lodash/isEmpty";
import {
	configurationServiceRequestModalClose,
	configurationServiceRequestModalOpen,
	configureConfigurationServiceRequest,
	loadConfigurationServiceRequests,
} from "../actions/configurationServiceRequest";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state, ownProps ) => {
	const id = ownProps.match.params.id;

	const sites = state.entities.sites;

	const allConfigurationServices = state.entities.configurationServiceRequests.allIds.map( ( id ) => {
		return state.entities.configurationServiceRequests.byId[ id ];
	} );
	const availableConfigurationServiceRequests = allConfigurationServices.filter( ( configurationServiceRequest ) => configurationServiceRequest.status === "intake" );

	if ( ! sites.byId.hasOwnProperty( id ) ) {
		return {
			loadingSite: true,
		};
	}
	const addSubscriptionModal = state.ui.addSubscriptionModal;

	const site = sites.byId[ id ];

	let subscriptions = state.entities.subscriptions.allIds.map( ( subscriptionId ) => {
		return state.entities.subscriptions.byId[ subscriptionId ];
	} );

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

	const activeSubscriptions = subscriptions.filter( ( subscription ) => {
		return subscription.status === "active" || subscription.status === "pending-cancel";
	} );

	let plugins = getPluginsForSiteType( site.type, state.entities.products.byId ).map( ( plugin ) => {
		// Set defaults
		plugin.limit = 0;
		plugin.isEnabled = false;
		plugin.used = 0;
		plugin.subscriptionId = "";
		plugin.currency = "USD";

		// Get all subscriptions for this plugin
		activeSubscriptions.filter( ( subscription ) => {
			return plugin.ids.includes( subscription.productId );
		} ).forEach( ( subscription ) => {
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

		return plugin;
	} );

	plugins = sortPluginsByPopularity( plugins );

	const disablePlatformSelect = plugins.some( ( plugin ) => plugin.isEnabled );

	const configurationServiceRequestModalOpen = state.ui.configurationServiceRequests.configurationServiceRequestModalOpen;

	const configurationServiceRequestModalSiteId = state.ui.configurationServiceRequests.configurationServiceRequestModalSiteId;

	return {
		availableConfigurationServiceRequests,
		configurationServiceRequestModalOpen,
		configurationServiceRequestModalSiteId,
		addSubscriptionModal,
		site,
		subscriptions,
		plugins,
		loadingSubscriptions: state.ui.subscriptions.requesting,
		uiSite: state.ui.site,
		disablePlatformSelect,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	dispatch( loadSites() );
	dispatch( loadConfigurationServiceRequests() );
	const siteId = ownProps.match.params.id;

	return {
		onMoreInfoClick: () => {},
		onToggleDisabled: ( subscriptionId ) => {
			dispatch( addLicensesModalOpen( subscriptionId ) );
		},
		onClose: () => {
			dispatch( addLicensesModalClose() );
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
			if ( window.confirm( "Are you sure you want to remove this site from MyYoast?" ) ) {
				dispatch( siteRemove( siteId ) );
			}
		},
		onConfirmPlatformChange: ( id, type ) => {
			dispatch( siteChangePlatform( id, type ) );
		},
		openConfigurationServiceRequestModal: ( siteId ) => {
			dispatch( configurationServiceRequestModalOpen( siteId ) );
		},
		configureConfigurationServiceRequest: ( id, data ) => {
			dispatch( configureConfigurationServiceRequest( id, data ) );
		},
		onConfigurationModalClose: () => {
			dispatch( configurationServiceRequestModalClose() );
		},
	};
};

const SitePageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SitePage );

export default SitePageContainer;
