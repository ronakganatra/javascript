import { connect } from "react-redux";
import { updateSiteUrl } from "../actions/sites";
import { siteAddSubscription, siteRemoveSubscription, siteRemove } from "../actions/site";
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
				productLogo: subscription.product.icon,
			},
			subscription,
			{
				isEnabled: ! ! site.subscriptions && site.subscriptions.includes( subscription.id ),
				price: subscription.product.price,
			}
		);
	} );

	return {
		site,
		subscriptions,
		loadingSubscriptions: state.ui.subscriptions.requesting,
		uiSite: state.ui.site,
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
		onRemove: () => {
			// eslint-disable-next-line
			if ( window.confirm( "Are you sure you want to remove this site from my.yoast?" ) ) {
				dispatch( siteRemove( siteId ) );
			}
		},
	};
};

const SitePageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SitePage );

export default SitePageContainer;
