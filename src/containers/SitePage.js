import { connect } from "react-redux";
import { updateSiteUrl, loadSites } from "../actions/sites";
import {
	siteAddSubscription,
	siteRemoveSubscription,
	siteRemove,
	siteChangePlatform,
	downloadModalOpen,
	downloadModalClose,
} from "../actions/site";
import SitePage from "../components/SitePage";
import { addLicensesModalOpen, addLicensesModalClose } from "../actions/subscriptions";
import { sortPluginsByPopularity } from "../functions/products";
import {
	configurationServiceRequestModalClose,
	configurationServiceRequestModalOpen,
	configureConfigurationServiceRequest,
	loadConfigurationServiceRequests,
} from "../actions/configurationServiceRequest";
import {
	addSubscriptionInfoToProductGroup,
	getProductGroupsByParentSlug,
	getProductsByProductGroupId,
	SITE_TYPE_PLUGIN_SLUG_MAPPING,
} from "../functions/productGroups";
import { hasAccessToFeature, SUBSCRIPTIONS_FEATURE } from "../functions/features";
const _flatten = require( "lodash/flatten" );

/* eslint-disable require-jsdoc */
/* eslint-disable-next-line max-statements */
export const mapStateToProps = ( state, ownProps ) => {
	const id = ownProps.match.params.id;
	const sites = state.entities.sites;
	const addSubscriptionModal = state.ui.addSubscriptionModal;
	if ( ! sites.byId.hasOwnProperty( id ) ) {
		return {
			loadingSite: true,
		};
	}
	const site = sites.byId[ id ];

	const allConfigurationServices = state.entities.configurationServiceRequests.allIds.map( ( configurationServiceId ) => {
		return state.entities.configurationServiceRequests.byId[ configurationServiceId ];
	} );
	const availableConfigurationServiceRequests = allConfigurationServices.filter( ( request ) => request.status === "intake" );

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

	const allProducts = state.entities.products.allIds.map( ( productIds ) => {
		return state.entities.products.byId[ productIds ];
	} );

	const allProductGroups = state.entities.productGroups.allIds.map( ( productGroupIds ) => {
		return state.entities.productGroups.byId[ productGroupIds ];
	} );

	// Get the productGroups that contain our plugin product variations.
	const pluginProductGroups = getProductGroupsByParentSlug(
		SITE_TYPE_PLUGIN_SLUG_MAPPING[ site.type ],
		allProductGroups,
		hasAccessToFeature( SUBSCRIPTIONS_FEATURE )
	);
	// For each plugin productGroup, get the products that belong to it, and add subscription info. Then push the final result to the plugins array.
	let plugins = [];
	pluginProductGroups.forEach( ( pluginProductGroup ) => {
		pluginProductGroup.products = getProductsByProductGroupId( pluginProductGroup.id, allProducts );

		if ( pluginProductGroup.products.length > 0 ) {
			plugins.push( addSubscriptionInfoToProductGroup( pluginProductGroup, activeSubscriptions ) );
		}
	} );

	plugins = sortPluginsByPopularity( plugins );

	const disablePlatformSelect = plugins.some( ( plugin ) => plugin.isEnabled );

	const downloadModalIsOpen = state.ui.site.downloadModalOpen;
	const downloadModalSubscriptionId = state.ui.site.downloadModalSubscriptionId;

	let downloads = [];
	if ( downloadModalIsOpen ) {
		const pluginOpened = plugins.find( plugin => plugin.subscriptionId === downloadModalSubscriptionId );
		let OpenedPluginProducts = pluginOpened.products;

		if ( pluginOpened.parentId === null ) {
			const children = getProductGroupsByParentSlug( pluginOpened.slug, allProductGroups );
			OpenedPluginProducts = _flatten( children.map( child => child.products ) );
		}

		let differentProductsInSubscription = OpenedPluginProducts.filter( entry => entry.sourceShopId === 1 );
		differentProductsInSubscription = sortPluginsByPopularity( differentProductsInSubscription );
		downloads = differentProductsInSubscription.map( product => {
			return { name: product.name, file: product.downloads[ 0 ].file };
		} );
	}

	const configurationServiceRequestModalOpen = state.ui.configurationServiceRequests.configurationServiceRequestModalOpen;

	const configurationServiceRequestModalSiteId = state.ui.configurationServiceRequests.configurationServiceRequestModalSiteId;

	return {
		availableConfigurationServiceRequests,
		configurationServiceRequestModalOpen,
		configurationServiceRequestModalSiteId,
		addSubscriptionModal,
		downloadModalIsOpen,
		downloadModalSubscriptionId,
		downloads,
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
		onDownloadModalOpen: ( subscriptionId ) => {
			dispatch( downloadModalOpen( subscriptionId ) );
		},
		onDownloadModalClose: () => {
			dispatch( downloadModalClose() );
		},
		onConfirmPlatformChange: ( id, type ) => {
			dispatch( siteChangePlatform( id, type ) );
		},
		openConfigurationServiceRequestModal: ( modalSiteId ) => {
			dispatch( configurationServiceRequestModalOpen( modalSiteId ) );
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
