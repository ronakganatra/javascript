import React, { Fragment } from "react";
import styled from "styled-components";


const ReportContainer = styled.div`
	display:flex;
	flex-direction: column;
	align-items: center
`;

const ReportInput = styled.textarea`
	height: 400px;
	width: 600px;
`;

const CompleteButton = styled.button`
	height:30px;
	margin:10px;
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
		};

		this.generateCells = this.generateCells.bind( this );
		this.loadConfigurationServiceRequests = this.loadConfigurationServiceRequests.bind( this );
		this.reportChanged = this.reportChanged.bind( this );
		this.submitReportClicked = this.submitReportClicked.bind(this);
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

	/**
	 * Generates table cells of a configuration service request.
	 *
	 * @returns {Array} An array of table cells.
	 */
	generateCells() {
		return this.state.configurationServiceRequests.map( function( configurationServiceRequest ) {
			console.log( configurationServiceRequest );
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
				<td>{this.getButtons( configurationServiceRequest )}</td>
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

	getReportEditor() {
		if ( ! this.state.writingReport ) {
			return null;
		}
		return (
			<ReportContainer>
				<h2>
					Report for {this.state.currentConfigurationServiceRequest.site.url}
				</h2>
				<ReportInput onChange={this.reportChanged}></ReportInput>
				<div><CompleteButton type="submit"onClick={this.submitReportClicked}>Save report and mark as Complete</CompleteButton></div>
			</ReportContainer>
		);

	}

	reportChanged( event ) {
		this.setState( { reportContent: event.target.value } );
	}

	assignClicked( configurationServiceRequest ) {
		console.log( configurationServiceRequest );
		this.props.api.assignConfigurationServiceRequest( configurationServiceRequest.id )
			.then( this.loadConfigurationServiceRequests );
	}

	uploadReportClicked( configurationServiceRequest ) {
		this.setState( {
			writingReport: true,
			currentConfigurationServiceRequest: configurationServiceRequest
		} );
	}

	submitReportClicked( event){
		// submit report
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			<Fragment>
				{this.getReportEditor()}

				<table>
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
						<th>Manage</th>
					</tr>
					</thead>
					<tbody>
					{this.generateCells()}
					</tbody>
				</table>
			</Fragment>
		);
	}
}

export default ConfigurationServiceRequests;