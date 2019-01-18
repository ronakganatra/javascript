import { createAllOfEntitySelector } from "./factories";
import { createSelector } from "reselect";
import _pickBy from "lodash/pickBy";
import { getCompletedOrders } from "./orders";
import _flatMap from "lodash/flatMap";
import { filterOutDuplicatesAsArray, getDownloadProps } from "../../functions/products";
import { getProductGroups } from "./productGroups";
import { getProductsByProductGroupIds } from "../../functions/productGroups";

/**
 * Returns all products in the state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All products.
 */
export const getProducts = createAllOfEntitySelector( "products" );

/**
 * Creates a product selector based on type.
 *
 * @param { string } type The type on which the selector should select.
 *
 * @returns { void }
 */
export const getProductsByType = ( type ) => createSelector(
	[ getProducts ],
	( products ) => _pickBy( products, product => product.type === type )
);

/**
 * Function to get an array of productIds that the customer has bought.
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All bought productIDs.
 */
export const getBoughtProductIds = createSelector(
	getCompletedOrders,
	( orders ) =>
		_flatMap( orders, order => order.items )
			.filter( lineItem => lineItem )
			.map( lineItem => lineItem.productId )
);

/**
 * Function to get an array of productIds that the customer has bought.
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All bought productIDs.
 */
export const getBoughtProducts = createSelector(
	getBoughtProductIds,
	getProducts,
	( Ids, products ) =>
		Ids.map( id => products.find( product => product.id === id ) || [] )
);


/**
 * Selector to get all the ebooks from state.
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All the ebooks.
 */
export const getEbooks = createSelector(
	[ getProductsByType( "ebook" ) ],
	( ebooks ) => filterOutDuplicatesAsArray( ebooks )
);

/**
 * Selector to get all the plugins from state.
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All the plugins.
 */
export const getPlugins = createSelector(
	[ getProductsByType( "plugin" ) ],
	( plugins ) => filterOutDuplicatesAsArray( plugins )
);

/**
 * Function to get a list of bought ebooks.
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} An array of ebooks that are purchased by the customer.
 */
export const getBoughtEbooks = createSelector(
	[ getEbooks, getBoughtProductIds ],
	( ebooks, boughtIds ) => ebooks.filter(
		ebook => ebook.ids.some( id => boughtIds.includes( id ) )
	)
);

/**
 * Function to get a list of plugins the customer has access to.
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} An array of plugins that the customer has access to.
 */
export const getOwnedPlugins = createSelector(
	[ getPlugins, getBoughtProducts, getProductGroups ],
	( plugins, boughtProducts, productGroups ) => {
		let ownedProductGroups = _flatMap( boughtProducts, product => product.productGroups || [] );

		// Add the children to the list of owned product groups.
		ownedProductGroups = ownedProductGroups.concat(
			_flatMap( ownedProductGroups, ownedProductGroup => productGroups.filter( productGroup => productGroup.parentId === ownedProductGroup.id ) )
		);
		return getProductsByProductGroupIds( ownedProductGroups.map( productGroup => productGroup.id ), plugins );
	}
);

/**
 * Gets an array of ebooks that can be downloaded.
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} An array of ebooks that can be downloaded.
 */
export const getEbooksForDownload = createSelector(
	getBoughtEbooks,
	ebooks => getDownloadProps( ebooks )
);

/**
 * Gets an array of plugins that can be downloaded.
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} An array of plugins that can be downloaded.
 */
export const getPluginsForDownload = createSelector(
	getOwnedPlugins,
	plugins => getDownloadProps( plugins )
);
