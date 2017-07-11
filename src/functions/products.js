import _partial from "lodash/partial";
import _omit from "lodash/omit";
import _uniq from "lodash/uniq";
import _pickBy from "lodash/pickBy";
import _map from "lodash/map";
import _forEach from "lodash/forEach";

/** Product helpers */

/**
 * Filters out duplicate products based on the GL number.
 *
 * @param {Object} products The products to filter through.
 *
 * @returns {Object} The filtered products.
 */
function filterOutDuplicates( products ) {
	let filteredProducts = {};

	// Filter products that have the GL number.
	let uniqueGlNumbers = _uniq( _map( products, "glNumber" ) );

	// Get products where GL number is exact same.
	let filtered = _pickBy( products, ( product ) => {
		return uniqueGlNumbers.includes( product.glNumber ) === true;
	} );

	// Loop through the filtered products and merge duplicate products.
	_forEach( filtered, ( product, key ) => {
		// Determine whether the product is already present
		if ( filteredProducts.hasOwnProperty( product.glNumber ) ) {
			filteredProducts[ product.glNumber ].ids.push( product.id );

			return true;
		}

		let filteredProduct = Object.assign( {}, product, { ids: [ product.id ] } );

		filteredProducts[ product.glNumber ] = _omit( filteredProduct, "id" );
	} );

	return filteredProducts;
}

/**
 * A function to filter products by type
 *
 * @param {string} type The type by which you want to filter the collection.
 * @param {Object[]} products a collection of products.
 * @returns {Object[]} The filtered collection of products.
 */
function filterProductsByType( type, products ) {
	// Only get products with the passed type.
	products = _pickBy( products, product => product.type === type );
	let filteredProducts = filterOutDuplicates( products );

	return Object.keys( filteredProducts ).map( ( key, index ) => {
		return filteredProducts[ key ];
	} );
}

export const getEbooks = _partial( filterProductsByType, "ebook" );
export const getCares = _partial( filterProductsByType, "care" );
export const getCourses = _partial( filterProductsByType, "course" );
export const getPlugins = _partial( filterProductsByType, "plugin" );
