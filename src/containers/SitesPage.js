import { connect } from "react-redux";
import { linkSitePopupClose, linkSitePopupOpen,
				 linkSite, updateSiteUrl, loadSites } from "../actions/sites";
import { onSearchQueryChange } from "../actions/search";
import SitesPage from "../components/SitesPage";
import { push } from "react-router-redux";
import _isUndefined from "lodash/isUndefined";
import _compact from "lodash/compact";
import _isEmpty from "lodash/isEmpty";
import { getPlugins } from "../functions/products";

export const mapStateToProps = ( state ) => {
	let allIds = state.entities.sites.allIds;

	let sites = allIds.map( ( siteId ) => {
		let site = state.entities.sites.byId[ siteId ];

		let siteProps = {
			id: site.id,
			siteName: site.hostname ? site.hostname : site.url,
		};

		if ( site.icon ) {
			siteProps.siteIcon = site.icon;
		}

		let activeSubscriptions = site.subscriptions.map( ( subscriptionId ) => {
			let subscription = state.entities.subscriptions.byId[ subscriptionId ];
			if ( ! _isUndefined( subscription ) ) {
				return subscription;
			}
		} );

		siteProps.activeSubscriptions = _compact( activeSubscriptions );
		return siteProps;
	} );

	let query = state.ui.search.query;
	if ( query.length > 0 ) {
		sites = sites.filter( ( sites ) => {
			return sites.siteName.includes( query );
		} );
	}

	let popupOpen = state.ui.sites.addSitePopupOpen;

	let errorFound = state.ui.sites.linkSiteFailed;

	let errorMessage = state.ui.sites.linkSiteError;

	let products = state.entities.products.byId;

	let plugins = [];

	if ( ! _isEmpty( products ) ) {
		plugins = getPlugins( state.entities.products.byId ).map( ( plugin ) => {
			return {
				id: plugin.id,
				name: plugin.name,
				icon: plugin.icon,
			};
		} );
	}

	return {
		sites,
		popupOpen,
		errorFound,
		errorMessage,
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
		addSite: () => {
			dispatch( linkSitePopupOpen() );
		},
		onSearchChange: ( query ) => {
			dispatch( onSearchQueryChange( query ) );
		},
		onClose: () => {
			dispatch( linkSitePopupClose() );
		},
		onLink: ( url ) => {
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

	let onLink = () => {
		dispatchProps.onLink( url );
	};

	return Object.assign( {}, ownProps, stateProps, dispatchProps, { onLink } );
};

const SitesPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)( SitesPage );

export default SitesPageContainer;
