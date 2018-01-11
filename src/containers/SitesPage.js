import { connect } from "react-redux";
import { linkSitePopupClose, linkSitePopupOpen,
				 linkSite, updateSiteUrl, loadSites } from "../actions/sites";
import { onSearchQueryChange } from "../actions/search";
import SitesPage from "../components/SitesPage";
import { push } from "react-router-redux";
import _compact from "lodash/compact";
import { getPlugins, sortPluginsByPopularity } from "../functions/products";

export const mapStateToProps = ( state ) => {
	let allIds = state.entities.sites.allIds;

	let sites = allIds.map( ( siteId ) => {
		let site = state.entities.sites.byId[ siteId ];

		let siteProps = {
			id: site.id,
			siteName: ( site.path === "/" ) ? site.hostname : ( site.hostname + site.path ),
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
				return subscription && subscription.status === "active";
			} );

		siteProps.activeSubscriptions = _compact( activeSubscriptions );
		return siteProps;
	} );

	let query = state.ui.search.query;
	if ( query.length > 0 ) {
		sites = sites.filter( ( site ) => {
			return site.siteName.includes( query ) || site.url.includes( query );
		} );
	}

	let popupOpen = state.ui.sites.addSitePopupOpen;

	let errorFound = state.ui.sites.linkSiteFailed;

	let error = state.ui.sites.linkSiteError;

	let	plugins = sortPluginsByPopularity( getPlugins( state.entities.products.byId ) );

	return {
		sites,
		popupOpen,
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

	return {
		onClick: () => {
			dispatch( linkSitePopupOpen() );
		},
		addSite: ( url ) => {
			dispatch( linkSitePopupOpen() );
			dispatch( updateSiteUrl( url ) );
		},
		onSearchChange: ( query ) => {
			dispatch( onSearchQueryChange( query ) );
		},
		onClose: () => {
			dispatch( linkSitePopupClose() );
		},
		onConnect: ( url ) => {
			dispatch( linkSite( url ) );
		},
		onChange: ( url ) => {
			dispatch( updateSiteUrl( url ) );
		},
		onManage: ( siteId ) => {
			dispatch( push( "/sites/" + siteId ) );
		},
	};
};

export const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	let url = stateProps.linkingSiteUrl;

	if ( stateProps.linkingSiteUrl.length === 0 ) {
		url = stateProps.query;
	}

	let onConnect = () => {
		dispatchProps.onConnect( url );
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
