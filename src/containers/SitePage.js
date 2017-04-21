import { connect } from "react-redux";
import { updateSiteUrl } from "../actions/sites";
import { siteAddSubscription, siteRemoveSubscription } from "../actions/site";
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

	subscriptions = subscriptions.map( ( subscription ) => {
		return Object.assign(
			{},
			{
				slots: {
					amountAvailable: 1,
					amountUsed: 0,
					addMoreSlots: "hi",
				},
			},
			subscription,
			{
				isEnabled: ! ! site.subscriptions && site.subscriptions.includes( subscription.id ),
			}
		);
	} );

	return {
		site,
		subscriptions,
		loadingSubscriptions: state.ui.subscriptions.requesting,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	let siteId = ownProps.match.params.id;

	return {
		onMoreInfoClick: () => {},
		onSettingsClick: () => {},
		onAddMoreSlotsClick: () => {},
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
	};
};

const SitePageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SitePage );

export default SitePageContainer;
