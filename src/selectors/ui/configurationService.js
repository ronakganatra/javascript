/**
 * Returns the configuration service request modal state.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} The configuration service request modal state.
 */
export function isConfigurationServiceRequestModalOpen( state ) {
	return state.ui.configurationServiceRequests.configurationServiceRequestModalOpen;
}

/**
 * Returns the selected composer token state.
 *
 * @param {Object} state Application state.
 *
 * @returns {string} The configuration service request modal site id state.
 */
export function getConfigurationServiceRequestModalSiteId( state ) {
	return state.ui.configurationServiceRequests.configurationServiceRequestModalSiteId;
}
