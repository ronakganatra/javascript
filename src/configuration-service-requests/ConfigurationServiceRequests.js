import React from "react";

class ConfigurationServiceRequests extends React.Component {
	/**
	 * Constructs the component and binds several functions.
	 */
	constructor( props ) {
		super( props );

		this.state = {
			configurationServiceRequests: [],
		};

		this.generateCells = this.generateCells.bind( this );
		this.loadConfigurationServiceRequests = this.loadConfigurationServiceRequests( this );
	}

	loadConfigurationServiceRequests(){
		this.props.api.search('ConfigurationServiceRequests', {where: { status: { inq:['submitted','completed'] } } } )
			.then( (response) => {
				this.setState( {
					configurationServiceRequests: response
					} );
			})
			.catch((error) => console.error(error));
	}

	/**
	 * Generates table cells of a configuration service request.
	 *
	 * @returns {Array} An array of table cells.
	 */
	generateCells( attributes ) {
		return this.state.configurationServiceRequests.map( function ( attribute ) {
			let key = attribute.id;
			console.log( "", attribute );
			return <tr key={ key }>
				<td>Url</td>
				<td>{ attribute.status }</td>
				<td>email</td>
				<td>{ attribute.backupRequired }</td>
				<td>{ attribute.importFrom }</td>
				<td>{ attribute.searchConsoleRequired }</td>
				<td>{ attribute.submittedAt }</td>
				<td>{ attribute.assigneeID }</td>
				<td>button</td>
			</tr>;
			}, this );
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		console.log( "test props" ,this.props );
		return (
			<table>
				<thead>
				<tr>
					<th>Url</th>
					<th>Status</th>
					<th>Email</th>
					<th>Backup</th>
					<th>Import</th>
					<th>GoogleSearchConsole</th>
					<th>Submit date</th>
					<th>Assignee</th>
					<th>Manage</th>
				</tr>
				</thead>
				<tbody>
					{ this.generateCells( [ "test1", "2", "3", "4", "5", "6", "7", "8", "button" ] ) }
				</tbody>
			</table>
		) ;
	}
}

export default ConfigurationServiceRequests;