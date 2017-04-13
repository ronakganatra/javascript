import { connect } from "react-redux";
import { linkSitePopupClose, linkSitePopupOpen, updateSiteUrl } from "../actions/sites";
import SitePage from "../components/SitePage";

/*
The props that we need to connect.

 site: React.PropTypes.object.isRequired,

 subscriptions: React.PropTypes.arrayOf( React.PropTypes.object ),

 subscriptions={ [
	{
		id: "bla",
		productId: "Yoast SEO",
		startDate: "2017-04-11T00:00:00.000Z",
		endDate: "2017-04-11T00:00:00.000Z",
		reoccurring: true,
		myYoastUserId: 2,
		productSlots: {
			amountAvailable: 10,
		 	amountUsed: 5,
		 	addMoreSlots: "Add more slots",
		},
		productLogo: SeoIcon,
	},
	{
		id: "bla2",
		productId: "Local SEO",
		startDate: "2017-04-11T00:00:00.000Z",
		endDate: "2017-04-11T00:00:00.000Z",
		reoccurring: true,
		myYoastUserId: 2,
		productSlots: {
			amountAvailable: 10,
		 	amountUsed: 7,
		 	addMoreSlots: "Add more slots",
		},
		productLogo: LocalIcon,
	},
 ] }
 siteImage: React.PropTypes.string.isRequired, // this one I have defaulted to placeholder image in sitepage. Should change later.


 onAddMoreSlotsClick: React.PropTypes.func.isRequired,
 onMoreInfoClick: React.PropTypes.func.isRequired,
 onSettingsClick: React.PropTypes.func.isRequired,
 onToggleSubscription: React.PropTypes.func.isRequired,
 intl: intlShape.isRequired,

 */

export const mapStateToProps = ( state, ownProps ) => {
	let id = ownProps.match.params.id;

	console.log( "id is:, ", id );

	let sites = state.entities.sites;

	if ( ! sites.byId.hasOwnProperty( id ) ) {
		return {
			loadingSite: true,
		};
	}

	let site = sites.byId[ id ];

	console.log( "Site is: ", site );

	return {
		site,
		loadingSubscriptions: state.ui.site.retrievingSiteSubscriptions,
		subscriptions: state.ui.site.active,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		onMoreInfoClick: () => {
			dispatch( linkSitePopupOpen() );
		},
		onSettingsClick: () => {
			dispatch( linkSitePopupOpen() );
		},
		onAddMoreSlotsClick: () => {
			dispatch( linkSitePopupClose() );
		},
		onToggleSubscription: () => {
			dispatch( linkSitePopupClose() );
		},
		onChange: ( url ) => {
			dispatch( updateSiteUrl( url ) );
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

const SitePageContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)( SitePage );

export default SitePageContainer;
