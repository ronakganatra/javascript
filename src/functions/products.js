import _partial from "lodash/partial";
import _filter from "lodash/filter";
import _omit from "lodash/omit";
import _uniq from "lodash/uniq";

/** Product helpers */

/**
 * A function to filter products by type
 *
 * @param {string} type The type by which you want to filter the collection.
 * @param {Object[]} products a collection of products.
 * @returns {Object[]} The filtered collection of products.
 */
function filterProductsByType( type, products ) {
	products = _filter( products, product => product.type === type );

	let uniqueGlNumbers = _uniq( products.map( ( product ) => {
		return product.glNumber;
	} ) );

	let filteredProducts = {};

	uniqueGlNumbers.forEach( ( glNumber ) => {
		_filter( products, product => product.glNumber === glNumber ).forEach(
			( product ) => {
				if ( filteredProducts.hasOwnProperty( product.glNumber ) ) {
					filteredProducts[ product.glNumber ].ids.push( product.id );
				} else {
					let productCopy = Object.assign( {}, product, { ids: [ product.id ] } );
					filteredProducts[ product.glNumber ] = _omit( productCopy, "id" );
				}
			}
		);
	} );

	return Object.keys( filteredProducts ).map( ( key, index ) => {
		return filteredProducts[ key ];
	} );
}

export const getEbooks = _partial( filterProductsByType, "ebook" );
export const getCares = _partial( filterProductsByType, "care" );
export const getCourses = _partial( filterProductsByType, "course" );
export const getPlugins = _partial( filterProductsByType, "plugin" );
