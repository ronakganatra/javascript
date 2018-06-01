import PropTypes from "prop-types";
import React from "react";
import { injectIntl } from "react-intl";
import styled from "styled-components";
import _isUndefined from "lodash/isUndefined";
import validate from "validate.js";

import colors from "yoast-components/style-guide/colors.json";

// Icons.
import exclamationTriangle from "../icons/exclamation-triangle.svg";

// Components.
import { InputField } from "./InputField";

// Styled components.
const TextInput = styled( InputField )`
	:not( :only-child ) {
		border: 2px solid ${ colors.$color_error };
	}
`;

const ErrorDisplay = styled.ul`
	color: ${ colors.$color_error };
	font-size: 12px;
	
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
			errors: this.props.errors,
		};

		this._onChange = this._onChange.bind( this );
	}

	validate( value ) {
		let errors = validate.single( value, this.props.constraint, { format: "detailed" } );

		if ( _isUndefined( errors ) ) {
			errors = [];
		}

		return errors;
	}

	getErrors( errors ) {
		return errors.map( ( error, index ) => {
			let key = `${ this.props.id }-${ index }`;
			return <Error key={ key }>{ error }</Error>;
		} );
	}

	displayErrors( errors ) {
		if ( errors.length > 0 ) {
			return <ErrorDisplay>
				{ this.getErrors( this.state.errors ) }
			</ErrorDisplay>;
		}
		return null;
	}

	_onChange( event ) {
		let errors = [];

		if ( this.props.constraint ) {
			errors = this.validate( event.target.value );
		}

		// Add given errors.
		errors = errors.concat( this.props.errors );

		this.setState( {
			errors: errors,
		} );

		// Call onChange function given in props.
		this.props.onChange( event );
	}

	render() {
		return (
			<div>
				<TextInput onChange={ this._onChange } />
				{ this.displayErrors( this.state.errors ) }
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
};

ValidationInputField.defaultProps = {
	errors: [],
};

export default injectIntl( ValidationInputField );
