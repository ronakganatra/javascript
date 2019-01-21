import { createSelector } from "reselect";
import { createAllOfEntitySelector, createOrderByStatusSelector } from "./factories";
import _pickBy from "lodash/pickBy";
import _flatMap from "lodash/flatMap";
import { filterOutDuplicatesAsArray, getDownloadProps } from "../../functions/products";

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
	createOrderByStatusSelector( "completed" ),
	( orders ) =>
		_flatMap( orders, order => order.items )
			.filter( lineItem => lineItem )
			.map( lineItem => lineItem.productId )
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
	( ebooks, boughtIds ) => {
		return ebooks.filter(
			ebook => ebook.ids.some( id => boughtIds.includes( id ) )
		);
	}
);

/**
* Function to get a list of bought plugins.
*
* @param {Object} state Application state.
*
* @returns {Array} An array of plugins that are purchased by the customer.
*/
export const getBoughtPlugins = createSelector(
	[ getPlugins, getBoughtProductIds ],
	( plugins, boughtIds ) => plugins.filter(
		plugin => plugin.ids.some( id => boughtIds.includes( id ) )
	)
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
	getBoughtPlugins,
	plugins => getDownloadProps( plugins )
);
