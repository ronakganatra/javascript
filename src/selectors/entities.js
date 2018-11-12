/**
 * Returns the state part for a given entity.
 *
 * @param {Object} state Application state.
 * @param {string} entityType The entity to retrieve the state for.
 *
 * @returns {Object} The state for the given entity.
 */
export function getEntityState( state, entityType ) {
	return state.entities[ entityType ];
}

/**
 * Returns all objects of a given entity.
 *
 * @param {Object} state Application state.
 * @param {string} entityType The entity to retrieve.
 *
 * @returns {Array} All entities of the given type.
 */
export function getAllOfEntity( state, entityType ) {
	const entityState = getEntityState( state, entityType );

	return entityState.allIds.map( ( entityId ) => {
		return entityState.byId[ entityId ];
	} );
}
