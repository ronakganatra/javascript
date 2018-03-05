import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "../Button.js";
import styled from "styled-components";
import { ModalHeading } from "../Headings";

const ConfigurationRequestModal = styled.div`
	max-width: 640px;
	margin: auto;
	font-weight: 300;
	font-size: 1em;

	label {
		display: inline-block;
		font-weight: 300;
		font-size: 1em;
		margin: 16px 0 8px;
	}
`;

const WideLargeButton = makeButtonFullWidth( LargeButton );
const WideSecondaryButton = makeButtonFullWidth( LargeSecondaryButton );

class ConfigurationRequest extends React.Component {
	/**
	 * Initializes the class with the specified props.
	 *
	 * @param {Object} props The props to be passed to the class that was extended from.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = {
			configStep: 1,
		};
	}

	/**
	 * Returns the rendered html.
	 *
	 * @returns {ReactElement} The rendered html.
	 */
	render() {
		return (
			<ConfigurationRequestModal>
				<ModalHeading>
					<FormattedMessage
						id="configuration.modal.heading"
						defaultMessage="Configuration service ({configStep}/4)"
						values={ { configStep: this.state.configStep } }
					/>
				</ModalHeading>
				<div>
					<p>Stapje 1</p>
					<p>Stapje 2</p>
					<p>Stapje 3</p>
					<p>Stapje 4</p>
				</div>
				<WideSecondaryButton onClick={ this.props.onClose } >
					Secondary Butt
				</WideSecondaryButton>
				<WideLargeButton onClick={ () => console.log( "primary click" ) }>
					Primary butt
				</WideLargeButton>
			</ConfigurationRequestModal>
		);
	}
}

ConfigurationRequest.propTypes = {
	onClose: PropTypes.func,
};

export default injectIntl( ConfigurationRequest );
