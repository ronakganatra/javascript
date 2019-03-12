import React, { Fragment } from "react";
import styled from "styled-components";
import moment from "moment-timezone";

const ReportContainer = styled.div`
	display:flex;
	flex-direction: column;
	align-items: center
`;

const ReportInput = styled.textarea`
	height: 200px;
	width: 600px;
`;

const ActionButton = styled.button`
	height:30px;
	margin-top:10px;
	display: inline;
`;

const RequirementLabel = styled.label`
	display:block;
`;

const ErrorMessage = styled.p`
	color:red;
	font-weight:bold;
`;

const Overview = styled.div`
	margin-top:50px;
`;

const CONFIGURATION_TIME_LIMIT_IN_DAYS = 3;

class ConfigurationServiceRequests extends React.Component {

	/**
	 * Constructs the component and binds several functions.
	 */
	constructor( props ) {
		super( props );

		this.state = {
			configurationServiceRequests: [],
			writingReport: false,
			currentConfigurationServiceRequest: null,
			reportContent: '',
			error: false,
			completed: false,
		};

		this.generateCells = this.generateCells.bind( this );
		this.loadConfigurationServiceRequests = this.loadConfigurationServiceRequests.bind( this );
		this.reportChanged = this.reportChanged.bind( this );
		this.submitReportClicked = this.submitReportClicked.bind( this );
		this.checkboxChanged = this.checkboxChanged.bind( this );
		this.cancelReportClicked = this.cancelReportClicked.bind( this );
		this.loadConfigurationServiceRequests();
	}

	/**
	 * Loads the configuration services requests (including site and customer)
	 * that are submitted and completed.
	 *
	 * @returns {void}
	 */
	loadConfigurationServiceRequests() {
		this.props.api.search( 'ConfigurationServiceRequests', {
			where: { status: { inq: [ 'submitted', 'in progress' ] } },
			include: [ "site", "customer", "assignee" ],
			order: "submittedAt ASC",
		} )
			.then( ( response ) => {
				this.setState( { configurationServiceRequests: response } );
			} )
			.catch( ( error ) => console.error( error ) );
	}
	/**
	 * Saves the value of the content of the report in the state.
	 *
	 * @returns {void}
	 */
	reportChanged( event ) {
		this.setState( { reportContent: event.target.value } );
	}

	/**
	 * Assigns a configuration service request and reloads all configuration service requests.
	 *
	 * @returns {void}
	 */
	assignClicked( configurationServiceRequest ) {
		this.setState( { completed: false } );

		this.props.api.assignConfigurationServiceRequest( configurationServiceRequest.id )
			.then( this.loadConfigurationServiceRequests );
	}

	/**
	 * Opens the editor to upload (and to write) a report and links this to the corresponding request.
	 *
	 * @returns {void}
	 */
	uploadReportClicked( configurationServiceRequest ) {
		this.setState( {
			completed: false,
			writingReport: true,
			currentConfigurationServiceRequest: configurationServiceRequest
		} );
	}

	/**
	 * Cancels uploading the report, closes the writing report field and clears its content.
	 *
	 * @returns {void}
	 */
	cancelReportClicked() {
		this.setState( {
			error: false,
			writingReport: false,
			reportContent: "",
			completed: false,
		} );
	}

	/**
	 * Submits the report, closes the writing report editor and clears its content.
	 *
	 * @returns {void}
	 */
	submitReportClicked() {
		this.setState( { error: false } );
		let ConfigurationServiceRequest = this.state.currentConfigurationServiceRequest;

		let report = this.state.reportContent;
		let backupCreated = ConfigurationServiceRequest.backupCreated ? new Date() : null;
		let importDone = ConfigurationServiceRequest.importDone ? new Date() : null;
		let searchConsoleConnected = ConfigurationServiceRequest.searchConsoleConnected ? new Date() : null;

		this.props.api.completeConfigurationServiceRequest( ConfigurationServiceRequest.id, report, backupCreated, importDone, searchConsoleConnected )
			.then( () => {
				this.loadConfigurationServiceRequests();
				this.setState( {
					completed: true,
					writingReport: false,
					reportContent: "",
				} );
			} )
			.catch( ( error ) => {
				this.setState( { error: true } );
			} );
	}

	/**
	 * Handles the checkboxes of the performed optional steps.
	 *
	 * @returns {void}
	 */
	checkboxChanged( event ) {
		let name = event.target.name;
		let currentRequest = this.state.currentConfigurationServiceRequest;
		currentRequest[ name ] = event.target.checked;
		this.setState( { currentConfigurationServiceRequest: currentRequest } );
	}

	/**
	 * Generates a the configuration service request overview presented in a table.
	 *
	 * @returns {void}
	 */
	getTable( content, showManage = true ) {
		return ( <table>
			<thead>
			<tr>
				<th>Url</th>
				<th>Status</th>
				<th>Email</th>
				<th>Backup</th>
				<th>Import from</th>
				<th>Google Search Console</th>
				<th>Submit date</th>
				<th>Assignee</th>
				{showManage ? <th>Manage</th> : null}
			</tr>
			</thead>
			<tbody>
			{content}
			</tbody>
		</table> );
	}

	/**
	 * Gets the report editor.
	 *
	 * @returns {void}
	 */
	getReportEditor() {
		if ( ! this.state.writingReport ) {
			return null;
		}
		return (
			<ReportContainer>
				<h2>
					Creating a report for {this.state.currentConfigurationServiceRequest.site.url}
				</h2>

				{this.getTable( this.generateCells( [ this.state.currentConfigurationServiceRequest ], false ), false )}

				<h3>Performed optional steps</h3>
				<RequirementLabel>
					<input type="checkbox" name="backupCreated" onChange={this.checkboxChanged}/>
					Backup created
				</RequirementLabel>

				<RequirementLabel>
					<input type="checkbox" name="importDone" onChange={this.checkboxChanged}/>
					Import performed
				</RequirementLabel>

				<RequirementLabel>
					<input type="checkbox" name="searchConsoleConnected" onChange={this.checkboxChanged}/>
					Google Search Console connected
				</RequirementLabel>

				<h3>Report</h3>
				<ReportInput onChange={this.reportChanged}></ReportInput>
				<div>
					<ActionButton type="submit" onClick={this.submitReportClicked}>
						Save report and mark as Complete
					</ActionButton>
					<ActionButton type="submit" onClick={this.cancelReportClicked}>
						Cancel
					</ActionButton>
				</div>
				{this.getErrors()}

			</ReportContainer>
		);
	}

	/**
	 * Returns a style to add when the date the configuration service request
	 * is submitted is on or after the day of the deadline.
	 * @param {Date} submittedAt the date the service request has been submitted.
	 * @returns {Object} the style to add.
	 */
	getTimeLimitWarnStyle( submittedAt ) {

		let dayBeforeDeadline = moment( submittedAt, moment.ISO_8601 );
		dayBeforeDeadline.add( CONFIGURATION_TIME_LIMIT_IN_DAYS, "days" );

		if ( moment().isSame( dayBeforeDeadline, "day" ) ) {
			return { "background-color" : "orange" };
		} else if ( moment().isAfter( dayBeforeDeadline, "day" )) {
			return { "background-color" : "red" };
		}

		return { };
	}

	/**
	 * Generates table cells of a configuration service request.
	 *
	 * @returns {Array} An array of table cells.
	 */
	generateCells( configurationServiceRequests, showControls = true ) {

		return configurationServiceRequests.map( function( configurationServiceRequest ) {
			let assignee = configurationServiceRequest.assignee;
			let warnStyle = this.getTimeLimitWarnStyle( configurationServiceRequest.submittedAt );
			let submittedAt = moment( configurationServiceRequest.submittedAt ).format("YYYY-MM-DD HH:mm");
			return <tr key={configurationServiceRequest.id} style={ warnStyle }>
				<td>{configurationServiceRequest.site.url}</td>
				<td>{configurationServiceRequest.status}</td>
				<td>{configurationServiceRequest.customer.userEmail}</td>
				<td>{configurationServiceRequest.backupRequired ? "yes" : "no"}</td>
				<td>{configurationServiceRequest.importFrom}</td>
				<td>{configurationServiceRequest.searchConsoleRequired ? "yes" : "no"}</td>
				<td>{submittedAt}</td>
				<td>{assignee ? assignee.userFirstName + ' ' + assignee.userLastName + ' (' + assignee.userEmail + ')' : "-"}</td>
				{showControls ? <td>{this.getButtons( configurationServiceRequest )}</td> : null}
			</tr>;
		}, this );
	}

	/**
	 * Generates the buttons assign me and upload report.
	 *
	 * @returns {void}
	 */
	getButtons( configurationServiceRequest ) {
		if ( ! configurationServiceRequest.assigneeId ) {
			return (
				<button type="submit" onClick={this.assignClicked.bind( this, configurationServiceRequest )}>
					Assign me
				</button>
			);
		}
		if ( configurationServiceRequest.status === 'in progress' ) {
			return (
				<button type="button" onClick={this.uploadReportClicked.bind( this, configurationServiceRequest )}>
					Upload report
				</button>
			);
		}

		return null;
	}

	/**
	 * Generates error messages on top of the report editor.
	 *
	 * @returns {void}
	 */
	getErrors() {
		if ( this.state.error ) {
			return (
				<ErrorMessage>
					An error occurred. This could mean that the "Performed optional steps" are not in line with what the customer requested or no report was given.
				</ErrorMessage>
			);
		}
		return null;
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			<Fragment>
				{ this.state.completed &&
					<h2>The configuration service request has been successfully completed.</h2>
				}
				{this.getReportEditor()}
				<Overview>
					{this.getTable( this.generateCells( this.state.configurationServiceRequests ) )}
				</Overview>
			</Fragment>
		);
	}

}

export default ConfigurationServiceRequests;
