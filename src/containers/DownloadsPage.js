import { connect } from "react-redux";
import { onSearchQueryChange } from "../actions/search";
import DownloadsPage from "../components/DownloadsPage";
import { getAllProducts } from "../actions/products";
import { getAllSubscriptions } from "../actions/subscriptions";
import { getOrders } from "../actions/orders";

let ebookIds = [], pluginIds = [];

/**
 * Sorts products based on their category.
 *
 * @param {Object} state The current state.
 * @returns {void}
 */
const sortProducts = ( state ) => {
	let allProductIds = state.entities.products.allIds;
	allProductIds.map( ( productId ) => {
		console.log( "id", productId, "hiero", state.entities.products.byId[ productId ] );
		let product = state.entities.products.byId[ productId ];
		switch ( product.shopProductType ) {
			case "plugin":
				pluginIds.push( product.id );
				return pluginIds;
			case "ebook":
				ebookIds.push( product.id );
				return ebookIds;
		}
	} );
};

/**
 * Gets the user's eBooks.
 *
 * @param {Object} state The current state.
 * @returns {Array} The array of eBooks.
 */
const getEbooks = ( state ) => {
	let orderIds = state.entities.orders.allIds;
	let userEbooks = [];
	orderIds.map( ( orderId ) => {
		let order = state.entities.orders.byId[ orderId ];
		if ( order.status === "completed" ) {
			let items = order.items;
			items.map( ( item ) => {
				if ( ebookIds.indexOf( item.productId ) !== -1 ) {
					userEbooks.push( item );
				}
			} );
		}
	} );
	return userEbooks;
};

/**
 * Gets the user's plugins.
 *
 * @param {Object} state The current state.
 * @returns {Array} The array of plugins.
 */
const getPlugins = ( state ) => {
	let subscriptionIds = state.entities.subscriptions.allIds;
	let userPlugins = [];
	subscriptionIds.map( ( subscriptionId ) => {
		let subscription = state.entities.subscriptions.byId[ subscriptionId ];
		if ( subscription.status === "active" && pluginIds.indexOf( subscription.productId !== -1 ) )  {
			userPlugins.push( subscription );
		}
	} );
	return userPlugins;
};

const setDownloadProps = ( userProducts, state ) => {
	return userProducts.map( ( userProduct ) => {
		let product = state.entities.products.byId[ userProduct.productId ];
		let downloadProps = {
			id: product.id,
			name: product.name,
			currentVersion: product.currentVersion,
			icon: product.icon,
			category: product.shopProductType,
			buttons: [ {
				label: product.description,
				onButtonClick: ( () => window.open( product.storeUrl, "_blank" ) ),
			} ],
		};
		return downloadProps;
	} );
};

export const mapStateToProps = ( state ) => {
	sortProducts( state );
	let eBooks = setDownloadProps( getEbooks( state ), state );
	let plugins = setDownloadProps( getPlugins( state ), state );

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
