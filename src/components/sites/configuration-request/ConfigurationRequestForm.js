import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import styled from "styled-components";
import Stepper from "../../general/Stepper";
import AdministratorLoginStep from "./AdministratorLoginStep";

const ConfigurationRequestModal = styled.div`
	width: 640px;
	min-width: 90%;
	margin: auto;
	font-weight: 300;
	font-size: 1em;
`;

class ConfigurationRequest extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			administratorLoginConfirmed: false,
		};

		this.setAdministratorLoginConfirmation = this.setAdministratorLoginConfirmation.bind( this );
	}

	setAdministratorLoginConfirmation( data ) {
		this.setState( {
			administratorLoginConfirmed: data.confirmed,
		} );
	}

	/**
	 * Returns the rendered html.
	 *
	 * @returns {ReactElement} The rendered html.
	 */
	render() {
		return (
			<ConfigurationRequestModal>
				<Stepper steps={ [
					{
						label: <FormattedMessage id="requestConfiguration.administratorLogin" defaultMessage="Administrator login"/>,
						component: <AdministratorLoginStep onClose={ this.props.onClose }
														   confirmed={ this.state.administratorLoginConfirmed }
														   onSubmit={ this.setAdministratorLoginConfirmation } />,
					},
					{
						label: "Step 2",
						component: <div>Test</div>,
					},
					{
						label: "Step 3",
						component: <div>Test</div>,
					},
				] } />
			</ConfigurationRequestModal>
		);
	}
}

ConfigurationRequest.propTypes = {
	onClose: PropTypes.func,
};

export default injectIntl( ConfigurationRequest );
