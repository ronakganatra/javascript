import React, { Fragment } from "react";
import styled from "styled-components";


const ReportContainer = styled.div`
	display:flex;
	flex-direction: column;
	align-items: center
`;

const ReportInput = styled.textarea`
	height: 200px;
	width: 600px;
`;

const CompleteButton = styled.button`
	height:30px;
	margin-top:10px;
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
			error: false
		};

		this.generateCells = this.generateCells.bind( this );
		this.loadConfigurationServiceRequests = this.loadConfigurationServiceRequests.bind( this );
		this.reportChanged = this.reportChanged.bind( this );
		this.submitReportClicked = this.submitReportClicked.bind( this );
		this.checkboxChanged = this.checkboxChanged.bind( this );
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
			include: [ "site", "customer", "assignee" ]
		} )
			.then( ( response ) => {
				this.setState( { configurationServiceRequests: response } );
			} )
			.catch( ( error ) => console.error( error ) );
	}

	reportChanged( event ) {
		this.setState( { reportContent: event.target.value } );
	}

	assignClicked( configurationServiceRequest ) {
		this.props.api.assignConfigurationServiceRequest( configurationServiceRequest.id )
			.then( this.loadConfigurationServiceRequests );
	}

	uploadReportClicked( configurationServiceRequest ) {
		this.setState( {
			writingReport: true,
			currentConfigurationServiceRequest: configurationServiceRequest
		} );
	}

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
					writingReport: false,
					reportContent: "",
				} );
			} )
			.catch( ( error ) => {
				this.setState( { error: true } );
			} );
	}

	checkboxChanged( event ) {
		let name = event.target.name;
		let currentRequest = this.state.currentConfigurationServiceRequest;
		currentRequest[ name ] = event.target.checked;
		this.setState( { currentConfigurationServiceRequest: currentRequest } );
	}

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

				<CompleteButton type="submit" onClick={this.submitReportClicked}>
					Save report and mark as Complete
				</CompleteButton>
			</ReportContainer>
		);
	}

	/**
	 * Generates table cells of a configuration service request.
	 *
	 * @returns {Array} An array of table cells.
	 */
	generateCells( configurationServiceRequests, showControls = true ) {
		return configurationServiceRequests.map( function( configurationServiceRequest ) {
			let assignee = configurationServiceRequest.assignee;
			return <tr key={configurationServiceRequest.id}>
				<td>{configurationServiceRequest.site.url}</td>
				<td>{configurationServiceRequest.status}</td>
				<td>{configurationServiceRequest.customer.userEmail}</td>
				<td>{configurationServiceRequest.backupRequired ? "yes" : "no"}</td>
				<td>{configurationServiceRequest.importFrom}</td>
				<td>{configurationServiceRequest.searchConsoleRequired ? "yes" : "no"}</td>
				<td>{configurationServiceRequest.submittedAt}</td>
				<td>{assignee ? assignee.userFirstName + ' ' + assignee.userLastName + ' (' + assignee.userEmail + ')' : "-"}</td>
				{showControls ? <td>{this.getButtons( configurationServiceRequest )}</td> : null}
			</tr>;
		}, this );
	}

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
				{this.getErrors()}
				{this.getReportEditor()}
				<Overview>
					{this.getTable( this.generateCells( this.state.configurationServiceRequests ) )}
				</Overview>
			</Fragment>
		);
	}

}

export default ConfigurationServiceRequests;