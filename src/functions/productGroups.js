import _isEmpty from "lodash/isEmpty";

/** Product helpers */

export const SITE_TYPE_PLUGIN_SLUG_MAPPING = {
	wordpress: "all-plugins",
	typo3: "all-typo3-extensions",
};

export function getProductGroupsByParentSlug( slug, productGroups ) {
	// Get the id of the parent productGroup.
	const parentGroup = productGroups.find( productGroup => productGroup.slug.indexOf( slug ) !== -1 );
	if ( parentGroup ) {
		return productGroups.filter( productGroup => productGroup.parentId === parentGroup.id );
	}
	return [];
}

export function addSubscriptionInfoToProductGroup( productGroup, activeSubscriptions ) {
	// Set defaults
	productGroup.limit = 0;
	productGroup.isEnabled = false;
	productGroup.used = 0;
	productGroup.subscriptionId = "";
	productGroup.currency = "USD";

	// Lift a couple of things from the US product variation to the product group. (Temporary fix, should be cleaned up at some point).
	const usProduct = productGroup.products.filter( ( product ) => {
		return product.sourceShopId === 1;
	} );
	productGroup.storeUrl = usProduct[ 0 ] && usProduct[ 0 ].storeUrl;
	productGroup.icon = usProduct[ 0 ] && usProduct[ 0 ].icon;

	// This is needed for the sortByPopularity function.
	productGroup.glNumber = usProduct[ 0 ] && usProduct[ 0 ].glNumber;

	// Get ids of all products in this product group.
	const productIds = productGroup.products.map( ( product ) => {
		return product.id;
	} );

	// Get all subscriptions for products in this product group.
	activeSubscriptions
		.filter( ( subscription ) => {
			return productIds.includes( subscription.productId );
		} )
		.forEach( ( subscription ) => {
			// Accumulate amount of slots for this productGroup.
			productGroup.limit += subscription.limit;
			// Accumulate amount of slots in use for this productGroup.
			productGroup.used += ( subscription.used || 0 );

			/*
			 * If the productGroup subscription is enabled for this site, make sure it's
			 * subscriptionId is set on the productGroup.
			 */
			if ( subscription.isEnabled === true ) {
				productGroup.isEnabled = true;
				productGroup.subscriptionId = subscription.id;
				/*
				 * If the productGroup subscription Id has not been set and there are still slots
				 * available, set the first available product subscription for this productGroup.
				 */
			} else if (
				_isEmpty( productGroup.subscriptionId ) &&
				( subscription.limit > ( subscription.used || 0 ) )
			) {
				productGroup.subscriptionId = subscription.id;
			}

			// Determine currency based on the subscription currency.
			// Eventually the currency should be made available on the products themselves.
			// This needs to be fixed in the shop.
			productGroup.currency = subscription.currency;
			productGroup.storeUrl = subscription.product.storeUrl || productGroup.storeUrl;
		} );

	productGroup.hasSubscriptions = productGroup.limit > 0;
	productGroup.isAvailable = productGroup.limit > productGroup.used || productGroup.isEnabled;

	return productGroup;
}
