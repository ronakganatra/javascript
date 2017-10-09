import React from "react";

class AccessTokenForm extends React.Component {
	/**
	 * Sets the initial state for this form.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = {
			accessToken: props.accessToken,
		};

		this.handleChange = this.handleChange.bind( this );
	}

	/**
	 * Callback used when the access token input changes.
	 *
	 * @param {Object} event The change event.
	 *
	 * @returns {void}
	 */
	handleChange( event ) {
		let accessToken = event.target.value;

		this.setState( { accessToken } );

		this.props.updateAccessToken( accessToken );
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return(
			<form>
				<input className="widest" type="text" onChange={ this.handleChange } value={ this.state.accessToken } />
			</form>
		)
	}
}

export default AccessTokenForm;
