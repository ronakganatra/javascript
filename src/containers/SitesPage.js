import { connect } from "react-redux";
import { linkSitePopupClose, linkSitePopupOpen, linkSite, linkSiteRequest } from "../actions/sites";
import { onSearchQueryChange } from "../actions/search";
import SitesPage from "../components/SitesPage";

export const mapStateToProps = ( state ) => {
	let allIds = state.entities.sites.allIds;

	let sites = allIds.map( ( siteId ) => {
		let site = state.entities.sites.byId[ siteId ];

		return {
			id: site.id,
			siteName: site.url,
		};
	} );

	let query = state.entities.search.query;
	if ( query.length > 0 ) {
		sites = sites.filter( ( sites ) => {
			return sites.siteName.includes( query );
		} );
	}

	let popupOpen = state.ui.sites.addSitePopupOpen;

	let errorFound = state.ui.sites.linkSiteFailed;

	let errorMessage = state.ui.sites.linkSiteError;

	return {
		sites,
		popupOpen,
		errorFound,
		errorMessage,
		linkingSiteUrl: state.ui.sites.linkingSiteUrl,
		query: state.entities.search.query,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		onClick: () => {
			dispatch( linkSitePopupOpen() );
		},
		addSite: () => {
			dispatch( linkSitePopupOpen() );
		},
		changeSearchQuery: ( query ) => {
			dispatch( onSearchQueryChange( query ) );
		},
		onClose: () => {
			dispatch( linkSitePopupClose() );
		},
		onLink: ( url ) => {
			dispatch( linkSite( url ) );
		},
		onChange: ( url ) => {
			dispatch( linkSiteRequest( url ) );
		},
	};
};

export const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	let url = stateProps.linkingSiteUrl;
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
