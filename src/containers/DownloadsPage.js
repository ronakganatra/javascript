import { connect } from "react-redux";
import { onSearchQueryChange } from "../actions/search";
import DownloadsPage from "../components/DownloadsPage";
import { getAllProducts } from "../actions/products";
import { getAllSubscriptions } from "../actions/subscriptions";
import { getOrders } from "../actions/orders";
import { getEbooks, getPlugins } from "../functions/products";
import _filter from "lodash/filter";
import _includes from "lodash/includes";
import _flatMap from "lodash/flatMap";

const getEbookProducts = ( state ) =>  {
	let eBooks =  getEbooks( state.entities.products.byId );
	let completedOrders = _filter( state.entities.orders.byId, { status: "completed" } );
	let lineItems = _flatMap( completedOrders, ( order ) => {
		return order.items;
	} );
	let boughtProductIds = lineItems.map( ( lineItem ) => {
		return lineItem.productId;
	} );
	return _filter( eBooks, ( eBook ) => {
		return _includes( boughtProductIds,  eBook.id );
	} );
};

const getPluginProducts = ( state ) =>  {
	let plugins = getPlugins( state.entities.products.byId );
	let activeSubscriptions = _filter( state.entities.subscriptions.byId, { status: "active" } );
	let activeSubscriptionIds = activeSubscriptions.map( ( subscription ) => {
		return subscription.productId;
	} );
	return _filter( plugins, ( plugin ) => {
		return _includes( activeSubscriptionIds,  plugin.id );
	} );
};

const setDownloadProps = ( products, state ) => {
	return products.map( ( product ) => {
		return {
			id: product.id,
			name: product.name,
			currentVersion: product.currentVersion,
			icon: product.icon,
			category: product.type,
			buttons: [ {
				label: product.description,
				onButtonClick: ( () => window.open( product.storeUrl, "_blank" ) ),
			} ],
		};
	} );
};

export const mapStateToProps = ( state ) => {
	let eBooks = setDownloadProps( getEbookProducts( state ), state );
	let plugins = setDownloadProps( getPluginProducts( state ), state );

	let query = state.ui.search.query;
	if ( query.length > 0 ) {
		eBooks = eBooks.filter( ( eBook ) => {
			return eBook.name.toUpperCase().includes( query.toUpperCase() );
		} );
		plugins = plugins.filter( ( plugin ) => {
			return plugin.name.toUpperCase().includes( query.toUpperCase() );
		} );
	}

	return {
		query,
		eBooks,
		plugins,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	dispatch( getAllProducts() );
	dispatch( getAllSubscriptions() );
	dispatch( getOrders() );
	return {
		onSearchChange: ( query ) => {
			dispatch( onSearchQueryChange( query ) );
		},
	};
};

const DownloadsPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( DownloadsPage );

export default DownloadsPageContainer;
