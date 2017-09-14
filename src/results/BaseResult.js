import React, {Component} from "react";

export default class BaseResult extends Component {
	/**
	 * Default presenter for arrays.
	 * Each value of the array can be presented with it's own presenter named {attribute}ValuePresenter.
	 *
	 * @param {string} attribute The attribute to present.
	 * @param {Array}  results   The array to present.
	 * @param {string} key       The key to assign to the component.
	 *
	 * @returns {Array} The presented array.
	 */
	defaultArrayPresenter( attribute, results, key ) {
		return results.map( function (result) {
			let resultKey = key + "-" + result.id;
			return this.presentValue( attribute + "Value", result, resultKey );
		}, this );
	}

	/**
	 * Default presenter for Objects.
	 * Uses this same class, can be override by creating a method named {attribute}Presenter.
	 *
	 * @param {string} attribute The attribute to present.
	 * @param {Object} result    The object to present.
	 * @param {string} key       The key to assign to the component.
	 *
	 * @returns {ReactElement} The presented component.
	 */
	defaultObjectPresenter( attribute, result, key ) {
		return <BaseResult key={ key } result={ result } api={ this.props.api } search={ this.props.search }/>;
	}

	/**
	 * Finds the correct presenter for this value and presents it.
	 *
	 * @param {string} attribute The attribute to present.
	 * @param {*}      value     The value to present.
	 * @param {string} key       The key to use for components that present this object.
	 *
	 * @returns {ReactElement|string}
	 */
	presentValue( attribute, value, key ) {
		if ( this.props[ attribute + "Presenter" ] ) {
			return this.props[ attribute + "Presenter" ]( attribute, value, key );
		}

		if ( value instanceof Array ) {
			return this.defaultArrayPresenter( attribute, value, key );
		}

		if ( value instanceof Object ) {
			return this.defaultObjectPresenter( attribute, value, key );
		}

		return value;
	}

	/**
	 * Generates table rows for each property of this component's result.
	 *
	 * @returns {Array} An array of table rows.
	 */
	getResultRows() {
		return Object.keys( this.props.result ).map( function ( attribute ) {
			let key   = this.props.result.id + '-' + attribute;
			let value = this.presentValue( attribute, this.props.result[ attribute ], key );

			return (
				<tr key={ key }>
					<th>{ attribute }</th>
					<td>{ value }</td>
				</tr>
			)
		}, this );
	}

	/**
	 * Renders this component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			<table>
				<tbody>
					{ this.getResultRows() }
					{ this.props.additionalRows && this.props.additionalRows.map( function ( row ) { return row } ) }
				</tbody>
			</table>
		)
	}
}
