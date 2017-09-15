import React from "react";
import config from "../config.json";
import { capitalize } from "../functions/helpers"

const Searchable     = config.searchable;
const SearchableKeys = Object.keys( Searchable );
const Headers        = config.headers;

export default class SearchForm extends React.Component {
	/**
	 * Sets the initial state for this form.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = {
			resource:    SearchableKeys[0],
			attribute:   Searchable[ SearchableKeys[0] ][0],
			searchValue: "",
		};

		this.handleResourceChange    = this.handleResourceChange.bind( this );
		this.handleAttributeChange   = this.handleAttributeChange.bind( this );
		this.handleSearchValueChange = this.handleSearchValueChange.bind( this );
		this.submit                  = this.submit.bind( this );
	}

	/**
	 * Callback used when the resource select changes.
	 *
	 * @param {Object} event The change event.
	 *
	 * @returns {void}
	 */
	handleResourceChange( event ) {
		let resource = event.target.value;

		this.setState( {
			resource:  resource,
			attribute: Searchable[ resource ][0]
		} );
	}

	/**
	 * Callback used when the attribute select changes.
	 *
	 * @param {Object} event The change event.
	 *
	 * @returns {void}
	 */
	handleAttributeChange( event ) {
		this.setState( {
			attribute: event.target.value,
		} );
	}

	/**
	 * Callback used when the search value input changes.
	 *
	 * @param {Object} event The change event.
	 *
	 * @returns {void}
	 */
	handleSearchValueChange( event ) {
		this.setState( {
			searchValue: event.target.value,
		} );
	}

	/**
	 * Generates options for an array of option values.
	 *
	 * @param {Object} options      An object of options to generate option element for.
	 * @param {Object} translations An object with
	 *
	 * @returns {ReactElement} The options.
	 */
	static generateOptions( options, translations = {} ) {
		return options.map( function ( option ) {
			let display = translations[ option ] || capitalize( option );

			return <option key={ option } value={ option }>{ display }</option>;
		} );
	}

	/**
	 * Callback used when this form is submitted.
	 *
	 * @param {Object} event The submit event.
	 *
	 * @returns {void}
	 */
	submit( event ) {
		this.props.searchCallback( this.state );

		event.preventDefault();
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return(
			<form onSubmit={ this.submit }>
				<select onChange={ this.handleResourceChange } value={ this.state.resource }>
					{ SearchForm.generateOptions( SearchableKeys ) }
				</select>
				<select onChange={ this.handleAttributeChange } value={ this.state.attribute }>
					{ SearchForm.generateOptions( Searchable[ this.state.resource ], Headers[ this.state.resource ] ) }
				</select>
				<input type="text" onChange={ this.handleSearchValueChange } value={ this.state.searchValue } />
				<button type="submit">Search</button>
			</form>
		)
	}
}
