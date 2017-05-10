import _partial from "lodash/partial";
import _filter from "lodash/filter";

/** Product helpers */

/**
 * A function to filter products by type
 *
 * @param {string} type The type by which you want to filter the collection.
 * @param {Object[]} products a collection of products.
 * @returns {Object[]} The filtered collection of products.
 */
function filterProductsByType( type, products ) {
	return _filter( products, product => product.type === type );
}

export const getEbooks = _partial( filterProductsByType, "eBook" );
export const getCares = _partial( filterProductsByType, "care" );
export const getCourses = _partial( filterProductsByType, "course" );
export const getPlugins = _partial( filterProductsByType, "plugin" );
