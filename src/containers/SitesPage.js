import { connect } from "react-redux";
import { linkSitePopupClose, linkSitePopupOpen, linkSite, linkSiteRequest } from "../actions/sites";
import SitesPage from "../components/SitesPage";

const mapStateToProps = ( state ) => {
	console.log( state );

	console.log( state.ui.sites );

//	let sites = [
//		{ id: "7e54b616-59a7-4389-af3e-c2e0c093b955",
//			siteName: "www.yoast.com",
//			activeSubscriptions: [ "woo", "video" ],
//			siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
//		},
//		{ id: "7e54b616-59a7-4389-af3e-c2e0c093b954",
//			siteName: "www.google.com",
//			activeSubscriptions: [ "woo", "video", "local" ],
//			siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
//		},
//		{ id: "7e54b616-59a7-4389-af3e-c2e0c093b956",
//			siteName: "www.facebook.com",
//			activeSubscriptions: [ "woo", "video", "news" ],
//			siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
//		},
//	];

	let allIds = state.entities.sites.allIds;

	let sites = allIds.map( ( siteId ) => {
		let site = state.entities.sites.byId[ siteId ];

		return {
			id: site.id,
			siteName: site.url,
		};
	} );

	let popupOpen = state.ui.sites.addSitePopupOpen;

	return {
		sites,
		popupOpen,
		linkingSiteUrl: state.ui.sites.linkingSiteUrl,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		onClick: () => {
			dispatch( linkSitePopupOpen() );
		},
		addSite: () => {
			dispatch( linkSitePopupOpen() );
		},
		changeSearchQuery: () => {},
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

const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
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
