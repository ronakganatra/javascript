/*
 * Action types
 */

export const HELP_BEACON_MODAL_OPEN = "HELP_BEACON_MODAL_OPEN";
export const HELP_BEACON_MODAL_CLOSE = "HELP_BEACON_MODAL_CLOSE";

/*
 * Action creators
 */

/**
 * An action creator for the opening help beacon modal action.
 *
 * @returns {Object} An open add licenses modal action.
 */
export function helpBeaconModalOpen() {
	return {
		type: HELP_BEACON_MODAL_OPEN,
	};
}

/**
 * An action creator for the closing help beacon modal action.
 *
 * @returns {Object} An closing add licenses modal action.
 */
export function helpBeaconModalClose() {
	return {
		type: HELP_BEACON_MODAL_CLOSE,
	};
}
