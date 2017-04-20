import { connect } from "react-redux";
import { updateSiteUrl } from "../actions/sites";
import SitePage from "../components/SitePage";

export const mapStateToProps = ( state, ownProps ) => {
	let id = ownProps.match.params.id;

	let sites = state.entities.sites;

	if ( ! sites.byId.hasOwnProperty( id ) ) {
		return {
			loadingSite: true,
		};
	}

	let site = sites.byId[ id ];

	let subscriptions = state.entities.subscriptions.allIds.map( ( subscriptionId ) => {
		return state.entities.subscriptions.byId[ subscriptionId ];
	} );

	return {
		site,
		subscriptions,
		loadingSubscriptions: state.ui.site.subscriptions.retrievingSiteSubscriptions,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		onMoreInfoClick: () => {},
		onSettingsClick: () => {},
		onAddMoreSlotsClick: () => {},
		onToggleSubscription: () => {},
		onChange: ( url ) => {
			dispatch( updateSiteUrl( url ) );
		},
	};
};

const SitePageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SitePage );

export default SitePageContainer;
