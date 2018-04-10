import { connect } from "react-redux";
import { linkSiteModalClose, linkSiteModalOpen,
				 linkSite, updateSiteUrl, loadSites } from "../actions/sites";
import { onSearchQueryChange } from "../actions/search";
import SitesPage from "../components/SitesPage";
import { push } from "react-router-redux";
import _compact from "lodash/compact";
import { getPlugins, sortPluginsByPopularity } from "../functions/products";
import { configurationServiceRequestModalClose, configurationServiceRequestModalOpen, loadConfigurationServiceRequests } from "../actions/configurationServiceRequest";

export const mapStateToProps = ( state ) => {
	let sites = state.entities.sites.allIds.map( ( siteId ) => {
		let site = state.entities.sites.byId[ siteId ];

		let siteProps = {
			id: site.id,
			siteName: ( site.path === "/" ) ? site.hostname : ( site.hostname + site.path ),
			siteType: site.type,
			url: site.url,
		};

		if ( site.icon ) {
			siteProps.siteIcon = site.icon;
		}

		if ( state.entities.subscriptions.allIds.length === 0 ) {
			siteProps.activeSubscriptions = [];
			return siteProps;
		}

		let activeSubscriptions = site.subscriptions
			.map( ( subscriptionId ) => {
				return state.entities.subscriptions.byId[ subscriptionId ];
			} )
			.filter( ( subscription ) => {
				return subscription && ( subscription.status === "active" || subscription.status === "pending-cancel" );
			} );

		siteProps.activeSubscriptions = _compact( activeSubscriptions );
		return siteProps;
	} );

	let availableConfigurationServiceRequests = state.entities.configurationServiceRequests.allIds.map( ( id ) => {
		return state.entities.configurationServiceRequests.byId[ id ];
	} ).filter( ( configurationServiceRequest ) => configurationServiceRequest.status === "intake" );

	let query = state.ui.search.query;
	if ( query.length > 0 ) {
		sites = sites.filter( ( site ) => {
			return site.siteName.includes( query ) || site.url.includes( query );
		} );
	}

	let configurationServiceRequestModalSiteId = state.ui.configurationServiceRequests.configurationServiceRequestModalSiteId;

	let modalOpen = state.ui.sites.addSiteModalOpen;

	let errorFound = state.ui.sites.linkSiteFailed;

	let error = state.ui.sites.linkSiteError;

	let	plugins = sortPluginsByPopularity( getPlugins( state.entities.products.byId ) );

	return {
		sites,
		modalOpen,
		configurationServiceRequestModalOpen: state.ui.configurationServiceRequests.configurationServiceRequestModalOpen,
		configurationServiceRequestModalSiteId,
		availableConfigurationServiceRequests,
		errorFound,
		error,
		plugins,
		linkingSiteUrl: state.ui.sites.linkingSiteUrl,
		query,
		showLoader: ! state.ui.sites.sitesRetrieved,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
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
		onConfigurationRequestClick: ( siteId ) => {
			dispatch( configurationServiceRequestModalOpen( siteId ) );
		},
		onSubmitConfigurationServices: () => {
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

	let onConnect = ( type ) => {
		dispatchProps.onConnect( url, type );
	};

	let addSite = () => {
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
