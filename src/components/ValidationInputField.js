import PropTypes from "prop-types";
import React from "react";
import { injectIntl } from "react-intl";
import styled from "styled-components";
import _isUndefined from "lodash/isUndefined";
import _debounce from "lodash/debounce";
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
 * Text input field with functionality to validate on input
 * and show errors if validation fails.
 */
class ValidationInputField extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			errors: [],
			values: this.props.value,
		};

		this.showErrorsDebounced = _debounce( this.showValidationError, this.props.delay );
		this.onInputChange = this.onInputChange.bind( this );
		this.validate = this.validate.bind( this );
		this.getErrors = this.getErrors.bind( this );
	}

	/**
	 * Validates the given value according to
	 * the constraints as set in the properties.
	 *
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
	 *
	 * @param {string[]} errors the error messages to be displayed
	 * @returns {React.Component[]} an array of Error components
	 */
	getErrors( errors ) {
		return errors.map( ( error, index ) => {
			const key = `${ this.props.id }-${ index }`;
			return <Error key={ key }>{ error }</Error>;
		} );
	}

	/**
	 * Returns a component that displays the given list of errors,
	 * if there are any. Returns null if there are no errors to be displayed.
	 *
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
	 * Called whenever the text in the input field changes.
	 *
	 * @param {*} event the event
	 * @returns {void}
	 */
	onInputChange( event ) {
		let errors = [];

		if ( this.props.constraint ) {
			errors = this.validate( event.target.value );
		}

		if ( this.props.onChange ) {
			this.props.onChange( event, errors );
		}

		this.setState( {
			value: event.target.value,
			errors: errors,
		}, this.toggleErrorDisplay );
	}

	toggleErrorDisplay() {
		if ( this.state.errors.length > 0 ) {
			this.showErrorsDebounced();
		} else {
			this.hideValidationError();
		}
	}

	/**
	 * Sets a flag to show the validation error or not.
	 *
	 * @returns {void}
	 */
	showValidationError() {
		this.setState( { showValidationError: true } );
	}

	/**
	 * Sets a flag to hide the validation error and cancels a potential debounced error.
	 *
	 * @returns {void}
	 */
	hideValidationError() {
		this.setState( { showValidationError: false }, () => {
			this.showErrorsDebounced.cancel();
		} );
	}

	componentWillUnmount() {
		this.showErrorsDebounced.cancel();
	}

	render() {
		const errors = this.props.errors.concat( this.state.errors );
		const hasErrors = this.props.errors.length > 0;

		return (
			<div>
				<TextInput id={ this.props.id } onChange={ this.onInputChange } type={ this.props.type } />
				{ this.state.showValidationError || hasErrors ? this.displayErrors( errors ) : null }
			</div>
		);
	}
}

ValidationInputField.propTypes = {
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	type: PropTypes.string,
	value: PropTypes.string,
	delay: PropTypes.number,
	constraint: PropTypes.object,
	errors: PropTypes.array,
};

ValidationInputField.defaultProps = {
	errors: [],
	value: "",
	delay: 1000,
	type: "text",
};

export default injectIntl( ValidationInputField );
