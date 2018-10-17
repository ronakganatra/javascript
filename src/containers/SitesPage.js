import { connect } from "react-redux";
import { linkSiteModalClose, linkSiteModalOpen,
				 linkSite, updateSiteUrl, loadSites } from "../actions/sites";
import { onSearchQueryChange } from "../actions/search";
import SitesPage from "../components/SitesPage";
import { push } from "react-router-redux";
import _compact from "lodash/compact";
import { getPlugins, sortPluginsByPopularity } from "../functions/products";
import { configurationServiceRequestModalClose, configurationServiceRequestModalOpen,
	loadConfigurationServiceRequests, configureConfigurationServiceRequest } from "../actions/configurationServiceRequest";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	let sites = state.entities.sites.allIds.map( ( siteId ) => {
		const site = state.entities.sites.byId[ siteId ];

		const siteProps = {
			id: site.id,
			siteName: ( site.path === "/" ) ? site.hostname : ( site.hostname + site.path ),
			siteType: site.type,
			url: site.url,
			configurationServiceRequest: site.configurationServiceRequest,
		};

		if ( site.icon ) {
			siteProps.siteIcon = site.icon;
		}

		if ( state.entities.subscriptions.allIds.length === 0 ) {
			siteProps.activeSubscriptions = [];
			return siteProps;
		}

		const activeSubscriptions = site.subscriptions
			.map( ( subscriptionId ) => {
				return state.entities.subscriptions.byId[ subscriptionId ];
			} )
			.filter( ( subscription ) => {
				return subscription && ( subscription.status === "active" || subscription.status === "pending-cancel" );
			} );

		siteProps.activeSubscriptions = _compact( activeSubscriptions );
		return siteProps;
	} );

	const allConfigurationServices = state.entities.configurationServiceRequests.allIds.map( ( id ) => {
		return state.entities.configurationServiceRequests.byId[ id ];
	} );

	const siteIdsWithConfigurationServiceRequest = allConfigurationServices.map( ( RequestedSite ) => {
		return RequestedSite.siteId;
	} );

	const availableSites = sites.filter( ( site ) => ! siteIdsWithConfigurationServiceRequest.includes( site.id ) );

	const availableConfigurationServiceRequests = allConfigurationServices.filter( ( configurationServiceRequest ) => configurationServiceRequest.status === "intake" );

	const query = state.ui.search.query;
	if ( query.length > 0 ) {
		sites = sites.filter( ( site ) => {
			return site.siteName.includes( query ) || site.url.includes( query );
		} );
	}

	const configurationServiceRequestModalOpen = state.ui.configurationServiceRequests.configurationServiceRequestModalOpen;

	const configurationServiceRequestModalSiteId = state.ui.configurationServiceRequests.configurationServiceRequestModalSiteId;

	const modalOpen = state.ui.sites.addSiteModalOpen;

	const errorFound = state.ui.sites.linkSiteFailed;

	const error = state.ui.sites.linkSiteError;

	const plugins = sortPluginsByPopularity( getPlugins( state.entities.products.byId ) );

	const linkingSiteUrl = state.ui.sites.linkingSiteUrl;

	const showLoader = ! state.ui.sites.sitesRetrieved;

	return {
		sites,
		modalOpen,
		configurationServiceRequestModalOpen,
		configurationServiceRequestModalSiteId,
		availableSites,
		availableConfigurationServiceRequests,
		errorFound,
		error,
		plugins,
		linkingSiteUrl,
		query,
		showLoader,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	dispatch( loadSites() );
	dispatch( loadConfigurationServiceRequests() );

	return {
		onClick: () => {
			dispatch( linkSiteModalOpen() );
		},
		addSite: ( url ) => {
			dispatch( linkSiteModalOpen() );
			dispatch( updateSiteUrl( url ) );
		},
		onSearchChange: ( query ) => {
			dispatch( onSearchQueryChange( query ) );
		},
		onClose: () => {
			dispatch( linkSiteModalClose() );
		},
		onConnect: ( url, type ) => {
			dispatch( linkSite( url, type ) );
		},
		onChange: ( url ) => {
			dispatch( updateSiteUrl( url ) );
		},
		onManage: ( siteId ) => {
			dispatch( push( "/sites/" + siteId ) );
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

export const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	let url = stateProps.linkingSiteUrl;

	if ( stateProps.linkingSiteUrl.length === 0 ) {
		url = stateProps.query;
	}

	const onConnect = ( type ) => {
		dispatchProps.onConnect( url, type );
	};

	const addSite = () => {
		dispatchProps.addSite( url );
	};

	return Object.assign( {}, ownProps, stateProps, dispatchProps, { onConnect, addSite } );
};

const SitesPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)( SitesPage );

export default SitesPageContainer;
