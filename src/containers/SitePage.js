import { connect } from "react-redux";
import { updateSiteUrl, loadSites } from "../actions/sites";
import {
	siteAddSubscription,
	siteRemoveSubscription,
	siteRemove,
	siteChangePlatform,
	downloadModalOpen,
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
import { getAddSubscriptionModal, isRequestingSubscriptions } from "../selectors/ui/subscriptions";
import { getAvailableConfigurationServiceRequests } from "../selectors/entities/configurationService";
import { getSites } from "../selectors/entities/sites";
import { getActiveSubscriptionsWithProductInformation } from "../selectors/entities/subscriptions";
import { getProducts } from "../selectors/entities/products";
import { getProductGroups } from "../selectors/entities/productGroups";
import {
	getConfigurationServiceRequestModalSiteId,
	isConfigurationServiceRequestModalOpen,
} from "../selectors/ui/configurationService";
import { getSite } from "../selectors/ui/site";

/* eslint-disable require-jsdoc */
/* eslint-disable-next-line max-statements */
export const mapStateToProps = ( state, ownProps ) => {
	const id = ownProps.match.params.id;
	const sites = getSites( state );
	const addSubscriptionModal = getAddSubscriptionModal( state );
	if ( ! sites.byId.hasOwnProperty( id ) ) {
		return {
			loadingSite: true,
		};
	}
	const site = sites.byId[ id ];

	const availableConfigurationServiceRequests = getAvailableConfigurationServiceRequests( state );
	const activeSubscriptions = getActiveSubscriptionsWithProductInformation( state );

	// Set in the subscription whether it is enabled on the site.
	activeSubscriptions.map( subscription =>
		Object.assign( subscription, { isEnabled: ! ! site.subscriptions && site.subscriptions.includes( subscription.id ) } )
	);

	const allProducts = getProducts( state );
	const allProductGroups = getProductGroups( state );

	// Get the productGroups that contain our plugin product variations.
	const pluginProductGroups = getProductGroupsByParentSlug(
		SITE_TYPE_PLUGIN_SLUG_MAPPING[ site.type ],
		allProductGroups,
		true
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

	const configurationServiceRequestModalIsOpen = isConfigurationServiceRequestModalOpen( state );
	const configurationServiceRequestModalSiteId = getConfigurationServiceRequestModalSiteId( state );
	const loadingSubscriptions = isRequestingSubscriptions( state );
	const uiSite = getSite( state );

	return {
		availableConfigurationServiceRequests,
		configurationServiceRequestModalOpen: configurationServiceRequestModalIsOpen,
		configurationServiceRequestModalSiteId,
		addSubscriptionModal,
		site,
		plugins,
		loadingSubscriptions,
		uiSite,
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
