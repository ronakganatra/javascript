export const CONFIGURATION_REQUEST_MODAL_OPEN = "CONFIGURATION_REQUEST_MODAL_OPEN";
export const CONFIGURATION_REQUEST_MODAL_CLOSE = "CONFIGURATION_REQUEST_MODAL_CLOSE";

/**
 * An action creator for the configuration request modal open action.
 *
 * @param {string} siteId The id of the site that a request modal is opened for.
 *
 * @returns {Object} The configuration request modal open action.
 */
export function configurationRequestModalOpen( siteId ) {
	return {
		type: CONFIGURATION_REQUEST_MODAL_OPEN,
		siteId: siteId,
	};
}

/**
 * An action creator for the configuration request modal close action.
 *
 * @returns {Object} The configuration request modal close action.
 */
export function configurationRequestModalClose() {
	return {
		type: CONFIGURATION_REQUEST_MODAL_CLOSE,
	};
}
