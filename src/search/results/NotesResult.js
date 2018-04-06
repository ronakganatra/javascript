import React from "react";
import moment from "moment-timezone";
import BaseResult from "./BaseResult";
import { datePresenter } from "../../functions/presenters";

export default class NotesResult extends React.Component {
	/**
	 * Constructs the component and binds several functions.
	 */
	constructor( props ) {
		super( props );

		this.state = {
			editing: false,
			content: props.result.content,
			nextContactDate: props.result.nextContactDate,
		};

		this.toggleEditing               = this.toggleEditing.bind( this );
		this.handleSummaryChange         = this.handleSummaryChange.bind( this );
		this.handleNextContactDateChange = this.handleNextContactDateChange.bind( this );
		this.handleSave                  = this.handleSave.bind( this );
		this.contentPresenter            = this.contentPresenter.bind( this );
		this.nextContactDatePresenter    = this.nextContactDatePresenter.bind( this );
		this.actionsPresenter            = this.actionsPresenter.bind( this );
		this.authorIdPresenter           = this.authorIdPresenter.bind( this );
	}

	toggleEditing() {
		this.setState( { editing: ! this.state.editing } );
	}

	contentPresenter() {
		if ( this.state.editing ) {
			return <textarea value={ this.state.content } onChange={ this.handleSummaryChange } />;
		}
		return this.state.content;
	}

	nextContactDatePresenter() {
		if ( this.state.editing ) {
			let nextContactDateString =  this.state.nextContactDate ?
				moment( this.state.nextContactDate ).format( "YYYY-MM-DDTHH:mm" ) :
				"";

			return <input type="datetime-local" value={ nextContactDateString } onChange={ this.handleNextContactDateChange } />;
		}
		if ( this.state.nextContactDate === "" ) {
			return "";
		}
		return datePresenter( this.state.nextContactDate );
	}

	/**
	 * Presents a button to search for the customer of this order.
	 *
	 * @param {string} id The id of the customer.
	 *
	 * @returns {ReactElement} A button to search for the customer of this order.
	 */
	authorIdPresenter( id ) {
		return this.props.result.author.userFirstName + " " + this.props.result.author.userLastName;
	}

	actionsPresenter() {
		if ( this.props.result.authorId !== this.props.api.userId ) {
			return <span>You can only edit your own notes.</span>;
		}
		if ( this.state.editing ) {
			return <button type="submit" onClick={ this.handleSave }>Save</button>;
		}
		return <button type="button" onClick={ this.toggleEditing }>Edit</button>;
	}

	handleSummaryChange( event ) {
		this.setState( { content: event.target.value } );
	}

	handleNextContactDateChange( event ) {
		let nextContactDate = new Date( event.target.value );

		if ( isNaN( nextContactDate.getTime() ) ) {
			nextContactDate = null;
		}

		this.setState( { nextContactDate } );
	}

	handleSave() {
		let note = Object.assign( {}, this.state, { id: this.props.result.id } );

		if ( ! note.content ) {
			return;
		}

		this.props.api.saveNote( note ).then( this.toggleEditing );
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return <BaseResult
			{ ...this.props }
			contentPresenter={ this.contentPresenter }
			nextContactDatePresenter={ this.nextContactDatePresenter }
			authorIdPresenter={ this.authorIdPresenter }
			createdAtPresenter={ datePresenter }
			actionsPresenter={ this.actionsPresenter }/>;
	}
}
