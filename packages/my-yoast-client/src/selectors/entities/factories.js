import { createSelector } from "reselect";
import _filter from "lodash/filter";

/**
 * Creates a selector for the full entity state of a given entity type.
 *
 * @param {string} entityType The entity to create the selector for.
 *
 * @returns {function} The selector for the full state of the given entity.
 */
export function createEntityStateSelector( entityType ) {
	return state => state.entities[ entityType ];
}

/**
 * Creates a selector for all instances of a given entity type.
 *
 * @param {string} entityType The entity to create the selector for.
 *
 * @returns {function} The selector for all instances of the given entity.
 */
export function createAllOfEntitySelector( entityType ) {
	return createSelector(
		createEntityStateSelector( entityType ),
		entityState => {
			return entityState.allIds.map( entityId => entityState.byId[ entityId ] );
		}
	);
}

/**
 * Creates a selector for a map of all instances of a given entity type.
 *
 * @param {string} entityType The entity to create the selector for.
 *
 * @returns {function} The selector for a map of all instances of the given entity.
 */
export function createEntityByIdSelector( entityType ) {
	return createSelector(
		createEntityStateSelector( entityType ),
		entityState => entityState.byId
	);
}

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

/**
 * Filters the orders that have a certain status from the state.
 *
 * @function
 *
 * @param {String} status The status that the orders need to have.
 *
 * @returns {Function} An selector that selects orders with a certain status.
 */
export function createOrderByStatusSelector( status ) {
	return createSelector(
		createEntityByIdSelector( "orders" ),
		( orders ) => {
			return _filter( orders, { status: status } );
		}
	);
}
