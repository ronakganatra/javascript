import { connect } from "react-redux";
import { updateSiteUrl } from "../actions/sites";
import { siteAddSubscription, siteRemoveSubscription } from "../actions/site";
import SitePage from "../components/SitePage";
import { addLicensesPopupOpen, addLicensesPopupClose } from "../actions/subscriptions";
import { push } from "react-router-redux";

export const mapStateToProps = ( state, ownProps ) => {
	let id = ownProps.match.params.id;

	let sites = state.entities.sites;

	if ( ! sites.byId.hasOwnProperty( id ) ) {
		return {
			loadingSite: true,
		};
	}
	let popupOpen = state.ui.subscriptions.addLicensesPopupOpen;

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
					addMoreSlots: "Add another license for ",
				},
				productLogo: subscription.product.icon,
			},
			subscription,
			{
				isEnabled: ! ! site.subscriptions && site.subscriptions.includes( subscription.id ),
			}
		);
	} );

	return {
		popupOpen,
		site,
		subscriptions,
		loadingSubscriptions: state.ui.subscriptions.requesting,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	let siteId = ownProps.match.params.id;

	let amountAvailable = 0;
	return {
		onMoreInfoClick: () => {},
		onSettingsClick: () => {},
		onAddMoreSlotsClick: () => {
			dispatch( addLicensesPopupOpen() );
		},
		onClose: () => {
			dispatch( addLicensesPopupClose() );
		},
		onUpgrade: ( productId ) => {
			dispatch( push( "/shop/" ) );
		},
		onToggleSubscription: ( subscriptionId, enabled ) => {
			if ( enabled && amountAvailable === 0 ) {
				dispatch( addLicensesPopupOpen() );
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
