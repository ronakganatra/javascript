import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import styled from "styled-components";
import Stepper from "../../general/Stepper";
import AdministratorLoginStep from "./AdministratorLoginStep";
import BackupStep from "./BackupStep";
import ImportDataStep from "./ImportDataStep";
import GoogleSearchConsole from "./GoogleSearchConsole";

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
			createBackup: null,
			importData: null,
			googleSearchConsole: null,
		};
		this.setAdministratorLoginConfirmation = this.setAdministratorLoginConfirmation.bind( this );
		this.setBackupCreation = this.setBackupCreation.bind( this );
		this.setImportData = this.setImportData.bind( this );
		this.setGoogleSearchConsole = this.setGoogleSearchConsole.bind( this );
	}

	setAdministratorLoginConfirmation( data ) {
		this.setState( {
			administratorLoginConfirmed: data.confirmed,
		} );
	}

	setBackupCreation( data ) {
		this.setState( {
			createBackup: data.createBackup,
		} );
	}

	setImportData( data ) {
		this.setState( {
			importData: data.importData,
		} );
	}

	setGoogleSearchConsole( data ) {
		this.setState( {
			googleSearchConsole: data.googleSearchConsole,
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
						step: "step 0: ",
						label: <FormattedMessage id="requestConfiguration.administratorLogin" defaultMessage="Administrator login"/>,
						component: <AdministratorLoginStep onClose={ this.props.onClose }
														   confirmed={ this.state.administratorLoginConfirmed }
														   onSubmit={ this.setAdministratorLoginConfirmation } />,
					},
					{
						step: "step 1: ",
						label: <FormattedMessage id="requestConfiguration.backup" defaultMessage="Backup"/>,
						component: <BackupStep createBackup={ this.state.createBackup } onSubmit={ this.setBackupCreation } />,
					},
					{
						step: "step 2: ",
						label: <FormattedMessage id="requestConfiguration.importData" defaultMessage="Import data from another SEO plugin"/>,
						component: <ImportDataStep importData={ this.state.importData } onSubmit={ this.setImportData }/>,
					},
					{
						step: "step 3: ",
						label: <FormattedMessage id="requestConfiguration.googleSearchConsole" defaultMessage="Google search console"/>,
						component: <GoogleSearchConsole googleSearchConsole={ this.state.googleSearchConsole } onSubmit={ this.setGoogleSearchConsole }/>,
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
