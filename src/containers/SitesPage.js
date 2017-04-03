import { connect } from "react-redux";
import { linkSitePopupOpen } from "../actions/sites";
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

	let sites = state.ui.sites;

	return {
		sites,
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
	};
};

const SitesPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SitesPage );

export default SitesPageContainer;
