import React from "react";

class NotesForm extends React.Component {
	constructor( props ) {
		super( props );

		console.log( props );

		this.state = {
			summary: "",
			nextDate: "",
		};

		this.handleSummaryChange  = this.handleSummaryChange.bind( this );
		this.handleNextDateChange = this.handleNextDateChange.bind( this );
		this.handleSave           = this.handleSave.bind( this );
	}

	handleSummaryChange( event ) {
		let summary = event.target.value;

		this.setState( { summary } );
	}

	handleNextDateChange( event ) {
		let nextDate = new Date( event.target.value );

		if ( isNaN( nextDate.getTime() ) ) {
			nextDate = null;
		}

		this.setState( { nextDate } );
	}

	handleSave( event ) {
		let note = Object.assign( {}, this.state, { customerId: this.props.query.filters[0][1], authorId: this.props.api.userId } );

		if ( note.nextDate === "" ) {
			note.nextDate = null;
		}

		this.props.api.saveNote( note ).then( () => window.location.reload() );

		event.preventDefault();
	}

	render() {
		if ( this.props.query.filters[0][0] !== "customerId" ) {
			return null;
		}

		return (
			<form className="NotesForm">
				<h3>Create new note</h3>
				<fieldset>
					<textarea id="summary" className="widest" value={ this.state.summary } onChange={ this.handleSummaryChange } />
				</fieldset>
				<fieldset>
					<input id="nextDate" className="wide" type="date" value={ this.state.nextDate } onChange={ this.handleNextDateChange } />
					<button type="submit" onClick={ this.handleSave }>Save</button>
				</fieldset>
			</form>
		)
	}
}

export default NotesForm;
