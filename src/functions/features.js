import { getUserId } from "./auth";
import getEnv from "./getEnv";

export const CONFIGURATION_SERVICE_FEATURE = "CONFIGURATION_SERVICE";
export const SUBSCRIPTIONS_FEATURE = "SUBSCRIPTIONS_FEATURE";

/*
 * Feature flags is the array of currently available feature flags.
 * To enable a certain feature for all users just remove the feature flag from this array.
 */
const featureFlags = [
	CONFIGURATION_SERVICE_FEATURE,
];

/**
 * Returns whether or not the current user has access to a feature.
 *
 * @param {string} feature The feature to have access to.
 * @returns {bool} Whether the current user has access to a feature.
 */
export function hasAccessToFeature( feature ) {
	if ( ! featureFlags.includes( feature ) ) {
		return true;
	}

	const userId = getUserId();

	const environmentVariable = "FEATURE_"  + feature;

	let usersWithAccess = getEnv( environmentVariable, "" ).split( "," );
	usersWithAccess = usersWithAccess.map( userWithAccessUserId => userWithAccessUserId.trim() );
	usersWithAccess = usersWithAccess.filter( userWithAccessUserId => userWithAccessUserId !== "" );

	return usersWithAccess.includes( userId );
}
