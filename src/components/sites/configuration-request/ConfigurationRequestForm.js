import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import styled from "styled-components";
import Stepper from "../../general/Stepper";
import AdministratorLoginStep from "./AdministratorLoginStep";
import BackupStep from "./BackupStep";
import ImportDataStep from "./ImportDataStep";
import GoogleSearchConsoleStep from "./GoogleSearchConsoleStep";
import { ModalHeading } from "../../Headings";

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
			activeStep: 0,
		};

		this.setAdministratorLoginConfirmation = this.setAdministratorLoginConfirmation.bind( this );
		this.setBackupCreation = this.setBackupCreation.bind( this );
		this.setImportData = this.setImportData.bind( this );
		this.setGoogleSearchConsole = this.setGoogleSearchConsole.bind( this );
		this.goStepBack = this.goStepBack.bind( this );
		this.goToStep = this.goToStep.bind( this );
		this.createConfigurationRequest = this.createConfigurationRequest.bind( this );
	}

	setAdministratorLoginConfirmation( data ) {
		this.setState( {
			administratorLoginConfirmed: data.confirmed,
			activeStep: 1,
		} );
	}

	setBackupCreation( data ) {
		this.setState( {
			createBackup: data.createBackup,
			activeStep: 2,
		} );
	}

	setImportData( data ) {
		this.setState( {
			importData: data.importData,
			activeStep: 3,
		} );
	}

	setGoogleSearchConsole( data ) {
		this.setState( {
			googleSearchConsole: data.googleSearchConsole,
		} );
	}

	goStepBack() {
		this.setState( {
			activeStep: this.state.activeStep - 1,
		} );
	}

	goToStep( num ) {
		if ( num >= 0 && num < 4  ) {
			this.setState( {
				activeStep: num,
			} );
		}
	}

	createConfigurationRequest() {

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
					<FormattedMessage id="sites.configurationRequest.header"
									defaultMessage={ "Configuration service { step }/4"}
									values={ { step: this.state.activeStep + 1 } }
									/>
				</ModalHeading>
				<Stepper goToStep={ this.goToStep }
					steps={ [
						{
							step: "step 1",
							label: <FormattedMessage id="requestConfiguration.administratorLogin" defaultMessage="Administrator login"/>,
							component: <AdministratorLoginStep onClose={ this.props.onClose }
														confirmed={ this.state.administratorLoginConfirmed }
														onSubmit={ this.setAdministratorLoginConfirmation }/>,
						},
						{
							step: "step 2",
							label: <FormattedMessage id="requestConfiguration.backup" defaultMessage="Backup"/>,
							component: <BackupStep createBackup={ this.state.createBackup }
											onSubmit={ this.setBackupCreation }
											onBack={ this.goStepBack }/>,
						},
						{
							step: "step 3",
							label: <FormattedMessage id="requestConfiguration.importData" defaultMessage="Import data from another SEO plugin"/>,
							component: <ImportDataStep importData={ this.state.importData }
												onSubmit={ this.setImportData }
												onBack={ this.goStepBack }/>,
						},
						{
							step: "step 4",
							label: <FormattedMessage id="requestConfiguration.googleSearchConsole" defaultMessage="Google search console"/>,
							component: <GoogleSearchConsoleStep googleSearchConsole={ this.state.googleSearchConsole }
														onSubmit={ this.setGoogleSearchConsole }
														onBack={ this.goStepBack }/>,
						},
					] } />
			</ConfigurationRequestModal>
		);
	}
}

ConfigurationRequest.propTypes = {
	onClose: PropTypes.func,
	onBack: PropTypes.func,
	goToStep: PropTypes.func,
};

export default injectIntl( ConfigurationRequest );
