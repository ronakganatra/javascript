/*
 * Action types
 */

export const HELP_BEACON_POPUP_OPEN = "HELP_BEACON_POPUP_OPEN";
export const HELP_BEACON_POPUP_CLOSE = "HELP_BEACON_POPUP_CLOSE";

/*
 * Action creators
 */

/**
 * An action creator for the opening help beacon pop-up action.
 *
 * @returns {Object} An open add licenses pop-up action.
 */
export function helpBeaconPopupOpen() {
	return {
		type: HELP_BEACON_POPUP_OPEN,
	};
}

/**
 * An action creator for the closing help beacon pop-up action.
 *
 * @returns {Object} An closing add licenses pop-up action.
 */
export function helpBeaconPopupClose() {
	return {
		type: HELP_BEACON_POPUP_CLOSE,
	};
}
