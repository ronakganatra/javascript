import PropTypes from "prop-types";
import React from "react";
import { injectIntl } from "react-intl";
import styled from "styled-components";
import _isUndefined from "lodash/isUndefined";
import validate from "validate.js";

import colors from "yoast-components/style-guide/colors.json";

// Icons.
import exclamationTriangle from "../icons/exclamation-circle.svg";

// Components.
import { InputField } from "./InputField";

// Styled components.
const TextInput = styled( InputField )`
	background-color: ${ colors.$color_background_light };
	:not( :only-child ) {
		border: 2px solid ${ colors.$color_error };
	}
`;

const ErrorDisplay = styled.ul`
	color: ${ colors.$color_error };
	font-size: 12px;
	font-weight: 700;
	
	margin: 0;
	padding: 0;
	
	list-style-type: none;

`;

const Error = styled.li`
	background: url(${ exclamationTriangle }) no-repeat left center;
	background-size: 12px;
		
	height: 20px;
	
	margin-top: 4px;	
	padding-left: 24px;
`;

/**
 * Test page to test the login layout / styling.
 */
class ValidationInputField extends React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			errors: [],
			values: this.props.value,
		};

		this._onChange = this._onChange.bind( this );
	}

	/**
	 * Validates the given value according to
	 * the constraints as set in the properties.
	 * @param {any} value the value to check
	 * @returns {string[]} an array of error messages, will be empty if there are none
	 */
	validate( value ) {
		let errors = validate.single( value, this.props.constraint, { format: "detailed" } );

		if ( _isUndefined( errors ) ) {
			errors = [];
		}

		return errors;
	}

	/**
	 * Returns an array of Error components to be displayed
	 * below the input field.
	 * @param {string[]} errors the error messages to be displayed
	 * @returns {React.Component[]} an array of Error components
	 */
	getErrors( errors ) {
		return errors.map( ( error, index ) => {
			let key = `${ this.props.id }-${ index }`;
			return <Error key={ key }>{ error }</Error>;
		} );
	}

	/**
	 * Returns an component that displays the given list of errors,
	 * if there are any. Returns null if there are not errors to be displayed.
	 * @param {string[]} errors the error messages to be displayed.
	 * @returns {React.Component|null} the error display component, or null.
	 */
	displayErrors( errors ) {
		if ( errors && errors.length > 0 ) {
			return <ErrorDisplay>
				{ this.getErrors( errors ) }
			</ErrorDisplay>;
		}
		return null;
	}

	/**
	 * Fired whenever the onChange event of the input is fired.
	 * @param {*} event the event
	 * @returns {null} null
	 */
	_onChange( event ) {
		let errors = [];

		if ( this.props.constraint ) {
			errors = this.validate( event.target.value );
		}

		if ( this.props.onChange ) {
			this.props.onChange( event );
		}

		this.setState( {
			value: event.target.value,
			errors: errors,
		} );
	}

	render() {
		let errors = this.props.errors.concat( this.state.errors );
		return (
			<div>
				<TextInput onChange={ this._onChange } type={ this.props.type } />
				{ this.displayErrors( errors ) }
			</div>
		);
	}
}

ValidationInputField.propTypes = {
	onChange: PropTypes.func,
	children: PropTypes.array,
	constraint: PropTypes.object,
	errors: PropTypes.array,
	id: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string,
};

ValidationInputField.defaultProps = {
	errors: [],
	value: "",
};

export default injectIntl( ValidationInputField );
