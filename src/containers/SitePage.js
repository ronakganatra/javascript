import { connect } from "react-redux";
import { updateSiteUrl, loadSites } from "../actions/sites";
import { siteAddSubscription, siteRemoveSubscription, siteRemove, siteChangePlatform } from "../actions/site";
import SitePage from "../components/SitePage";
import { addLicensesModalOpen, addLicensesModalClose } from "../actions/subscriptions";
import {
	sortPluginsByPopularity,
} from "../functions/products";
import {
	configurationServiceRequestModalClose,
	configurationServiceRequestModalOpen,
	configureConfigurationServiceRequest,
	loadConfigurationServiceRequests,
} from "../actions/configurationServiceRequest";
import {
	addSubscriptionInfoToProductGroup,
	getProductGroupsByParentSlug,
	SITE_TYPE_PLUGIN_SLUG_MAPPING,
} from "../functions/productGroups";

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

	const allProductGroups = state.entities.productGroups.allIds.map( ( id ) => {
		return state.entities.productGroups.byId[ id ];
	} );

	let plugins = getProductGroupsByParentSlug( SITE_TYPE_PLUGIN_SLUG_MAPPING[ site.type ], allProductGroups )
		.map( ( productGroup ) => {
			return addSubscriptionInfoToProductGroup( productGroup, activeSubscriptions );
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
