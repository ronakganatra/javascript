/**
 * Function to get the modalOpen from the BeaconModal.
 *
 * @function
 *
 * @param {Object} state Application state.
 * @returns {boolean} Whether or not the helpBeaconModal is open.
 */
export const getModalOpen = ( state ) => state.ui.helpBeaconModal.modalOpen;