import React from "react";

export default class BaseResult extends React.Component {
	/**
	 * Finds the correct presenter for this value and presents it.
	 *
	 * @param {string} attribute The attribute to present.
	 * @param {*}      value     The value to present.
	 *
	 * @returns {ReactElement|string}
	 */
	presentValue( attribute, value ) {
		if ( this.props[ attribute + "Presenter" ] ) {
			return this.props[ attribute + "Presenter" ]( value );
		}

		if ( value instanceof Array || value instanceof Object ) {
			return JSON.stringify( value );
		}

		return value;
	}

	/**
	 * Generates table cells for each property of this component's result.
	 *
	 * @returns {Array} An array of table cells.
	 */
	generateResultCells() {
		return this.props.attributes.map( function ( attribute ) {
			let key   = this.props.result.id + '-' + attribute;
			let value = this.presentValue( attribute, this.props.result[ attribute ] );

			return <td key={ key }>{ value }</td>;
		}, this );
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return <tr>{ this.generateResultCells() }</tr>;
	}
}
