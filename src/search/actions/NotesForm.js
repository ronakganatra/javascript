import React from "react";
import moment from "moment-timezone";

class NotesForm extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			content: "",
			nextContactDate: null,
		};

		this.handleContentChange         = this.handleContentChange.bind( this );
		this.handleNextContactDateChange = this.handleNextContactDateChange.bind( this );
		this.handleSave                  = this.handleSave.bind( this );
	}

	handleContentChange( event ) {
		this.setState( { content: event.target.value } );
	}

	handleNextContactDateChange( event ) {
		let nextContactDate = new Date( event.target.value );

		console.log( nextContactDate );

		if ( isNaN( nextContactDate.getTime() ) ) {
			nextContactDate = null;
		}

		this.setState( { nextContactDate } );
	}

	handleSave( event ) {
		let note = Object.assign( {}, this.state, { customerId: this.props.query.filters[0][1], authorId: this.props.api.userId } );

		event.preventDefault();

		if ( ! note.content ) {
			return;
		}

		this.props.api.saveNote( note ).then( () => window.location.reload() );
	}

	render() {
		if ( this.props.query.filters[0][0] !== "customerId" ) {
			return null;
		}

		let nextContactDateString =  this.state.nextContactDate ?
			moment( this.state.nextContactDate ).format( "YYYY-MM-DDTHH:mm" ) :
			"";

		return (
			<form className="NotesForm">
				<h3>Create new note</h3>
				<fieldset>
					<textarea id="content" className="widest" value={ this.state.content } onChange={ this.handleContentChange } />
				</fieldset>
				<fieldset>
					<input id="nextContactDate" className="wide" type="datetime-local" value={ nextContactDateString } onChange={ this.handleNextContactDateChange } />
					<button type="submit" onClick={ this.handleSave }>Save</button>
				</fieldset>
			</form>
		)
	}
}

export default NotesForm;
