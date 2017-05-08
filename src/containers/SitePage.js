import { connect } from "react-redux";
import { updateSiteUrl, loadSites } from "../actions/sites";
import { siteAddSubscription, siteRemoveSubscription, siteRemove } from "../actions/site";
import SitePage from "../components/SitePage";
import { getPlugins } from "../functions/products";
import _isEmpty from "lodash/isEmpty";

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

	let activeSubscriptions = subscriptions.filter( ( subscription ) => {
		return subscription.status === "active";
	} );

	let plugins = getPlugins( state.entities.products.byId ).map( ( plugin ) => {
		plugin.limit = 0;
		plugin.isEnabled = false;
		plugin.used = 0;
		plugin.subscriptionId = "";
		plugin.currency = "USD";

		activeSubscriptions.filter( ( subscription ) => {
			return subscription.productId === plugin.id;
		} ).forEach( ( subscription ) => {
			plugin.limit += subscription.limit;
			plugin.used += ( subscription.used || 0 );
			if ( subscription.isEnabled === true ) {
				plugin.isEnabled = true;
				plugin.subscriptionId = subscription.id;
			} else if (
				_isEmpty( plugin.subscriptionId ) &&
				( subscription.limit > ( subscription.used || 0 ) )
			) {
				plugin.subscriptionId = subscription.id;
			}
			plugin.currency = subscription.currency;
		} );

		return plugin;
	} );

	console.log( "PLUGINS", plugins );

	return {
		site,
		subscriptions,
		plugins,
		loadingSubscriptions: state.ui.subscriptions.requesting,
		uiSite: state.ui.site,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	dispatch( loadSites() );
	let siteId = ownProps.match.params.id;

	return {
		onMoreInfoClick: () => {},
		onSettingsClick: () => {},
		onAddMoreLicensesClick: () => {},
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
