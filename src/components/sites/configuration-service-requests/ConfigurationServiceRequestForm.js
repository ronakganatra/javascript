import React from "react";
import { FormattedMessage, injectIntl, defineMessages, intlShape } from "react-intl";
import PropTypes from "prop-types";
import styled from "styled-components";
import Stepper from "../../general/Stepper";
import AdministratorLoginStep from "./AdministratorLoginStep";
import BackupStep from "./BackupStep";
import ImportDataStep from "./ImportDataStep";
import GoogleSearchConsoleStep from "./GoogleSearchConsoleStep";
import { ModalHeading } from "../../Headings";
import { CloseButtonTopRight } from "../../Button";

const messages = defineMessages( {
	administratorLogin: {
		id: "requestConfiguration.administratorLogin",
		defaultMessage: "Administrator login",
	},
	administratorLoginStepLabel: {
		id: "requestConfiguration.administratorLogin",
		defaultMessage: "Step 1: Administrator login",
	},
	backup: {
		id: "requestConfiguration.backup",
		defaultMessage: "Backup",
	},
	backupStepLabel: {
		id: "requestConfiguration.backup",
		defaultMessage: "Step 2: Backup",
	},
	importData: {
		id: "requestConfiguration.importData",
		defaultMessage: "Import data from another SEO plugin",
	},
	importDataStepLabel: {
		id: "requestConfiguration.importData",
		defaultMessage: "Step 3: Import data from another SEO plugin",
	},
	googleSearchConsole: {
		id: "requestConfiguration.googleSearchConsole",
		defaultMessage: "Google search console",
	},
	googleSearchConsoleStepLabel: {
		id: "requestConfiguration.googleSearchConsole",
		defaultMessage: "Step 4: Google search console",
	},
	close: {
		id: "requestConfiguration.close",
		defaultMessage: "Close",
	},
} );

const ConfigurationRequestModal = styled.div`
	width: 640px;
	max-width: 100%;
	margin: auto;
	font-weight: 300;
	font-size: 1em;
`;

const StyledModalHeading = styled( ModalHeading )`
	float: left;
`;

const CloseIconButton = styled( CloseButtonTopRight )`
	float: right;
`;

const StyledContainer = styled.div`
	padding: 10px 0;
	clear: both;
`;

class ConfigurationServiceRequestForm extends React.Component {
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

	/**
	 * Holds the input from the administrator login confirmation step in the state
	 * and goes to the next step of the stepper.
	 *
	 * @param {bool} data The data to confirm the administrator login.
	 *
	 * @returns {void}
	 */
	setAdministratorLoginConfirmation( data ) {
		this.setState( {
			administratorLoginConfirmed: data.confirmed,
			activeStep: 1,
		} );
	}
	/**
	 * Holds the input from the backup step in the state
	 * and goes to the next step of the stepper.
	 *
	 * @param {bool} data The data whether a backup should be created.
	 *
	 * @returns {void}
	 */
	setBackupCreation( data ) {
		this.setState( {
			createBackup: data.createBackup,
			activeStep: 2,
		} );
	}
	/**
	 * Holds the input from the import data step in the state
	 * and goes to the next step of the stepper.
	 *
	 * @param {string} data The data to select the plugin to be imported form.
	 *
	 * @returns {void}
	 */
	setImportData( data ) {
		this.setState( {
			importData: data.importData,
			activeStep: 3,
		} );
	}
	/**
	 * Holds the input from the google search console step in the state.
	 *
	 * @param {bool} data The data whether the site should be connected to the google search console.
	 *
	 * @returns {void}
	 */
	setGoogleSearchConsole( data ) {
		console.log( "test_dataGSC", data.googleSearchConsole );
		this.setState( {
			googleSearchConsole: data.googleSearchConsole,
		} );
		console.log( "state GSC", this.state );
		this.createConfigurationRequest();
	}
	/**
	 * Goes one step back of the stepper using the back button.
	 *
	 * @returns {void}
	 */
	goStepBack() {
		this.setState( {
			activeStep: this.state.activeStep - 1,
		} );
	}
	/**
	 * Navigates to the step of the stepper that has been clicked.
	 *
	 * @param {number} num The number of the step that has been clicked.
	 *
	 * @returns {void}
	 */
	goToStep( num ) {
		let previousStepCompleted = [
			true,
			this.state.administratorLoginConfirmed,
			this.state.createBackup !== null,
			this.state.importData !== null,
		][ num ];

		if ( ! previousStepCompleted ) {
			return;
		}

		if ( num >= 0 && num < 4 ) {
			this.setState( {
				activeStep: num,
			} );
		}
	}

	createConfigurationRequest() {
		let data = {
			administratorLoginConfirmed: this.state.administratorLoginConfirmed,
			createBackup: this.state.createBackup,
			importData: this.state.importData,
			googleSearchConsole: this.state.googleSearchConsole,
			configurationServiceRequestModalSiteId: this.props.configurationServiceRequestModalSiteId,
			configurationServiceRequestId: this.props.configurationServiceRequest.id,
			configurationServiceRequestStatus: this.props.configurationServiceRequest.status,
		};
		console.log( "createConfigurationRequest:", data, this.props.configurationServiceRequest );
	}

	/**
	 * Returns the rendered html.
	 *
	 * @returns {ReactElement} The rendered html.
	 */
	render() {
		return (
			<ConfigurationRequestModal>
				<StyledModalHeading>
					<FormattedMessage
						id="sites.configurationRequest.header"
						defaultMessage={ "Configuration service { step }/4"}
						values={ { step: this.state.activeStep + 1 } }
					/>
				</StyledModalHeading>
				<CloseIconButton
					onClick={ this.props.onClose }
					aria-label={ this.props.intl.formatMessage( messages.close ) }
				/>
				<StyledContainer>
					<Stepper
						activeStep={ this.state.activeStep }
						goToStep={ this.goToStep }
						steps={ [
							{
								stepAriaLabel: this.props.intl.formatMessage( messages.administratorLoginStepLabel ),
								label: this.props.intl.formatMessage( messages.administratorLogin ),
								component: <AdministratorLoginStep onClose={ this.props.onClose }
															confirmed={ this.state.administratorLoginConfirmed }
															onSubmit={ this.setAdministratorLoginConfirmation }/>,
							},
							{
								stepAriaLabel: this.props.intl.formatMessage( messages.backupStepLabel ),
								label: this.props.intl.formatMessage( messages.backup ),
								component: <BackupStep createBackup={ this.state.createBackup }
												onSubmit={ this.setBackupCreation }
												onBack={ this.goStepBack }/>,
							},
							{
								stepAriaLabel: this.props.intl.formatMessage( messages.importDataStepLabel ),
								label: this.props.intl.formatMessage( messages.importData ),
								component: <ImportDataStep importData={ this.state.importData }
													onSubmit={ this.setImportData }
													onBack={ this.goStepBack }/>,
							},
							{
								stepAriaLabel: this.props.intl.formatMessage( messages.googleSearchConsoleStepLabel ),
								label: this.props.intl.formatMessage( messages.googleSearchConsole ),
								component: <GoogleSearchConsoleStep googleSearchConsole={ this.state.googleSearchConsole }
															onSubmit={ this.setGoogleSearchConsole }
															onBack={ this.goStepBack }/>,
							},
						] } />
				</StyledContainer>
			</ConfigurationRequestModal>
		);
	}
}

ConfigurationServiceRequestForm.propTypes = {
	onClose: PropTypes.func,
	onBack: PropTypes.func,
	goToStep: PropTypes.func,
	intl: intlShape.isRequired,
	configurationServiceRequestModalSiteId: PropTypes.string.isRequired,
	configurationServiceRequest: PropTypes.object.isRequired,
};

export default injectIntl( ConfigurationServiceRequestForm );
