import React, { Fragment } from "react";
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
			summary: props.result.summary || "",
			nextDate: props.result.nextDate || "",
		};

		this.toggleEditing        = this.toggleEditing.bind( this );
		this.handleSummaryChange  = this.handleSummaryChange.bind( this );
		this.handleNextDateChange = this.handleNextDateChange.bind( this );
		this.handleSave           = this.handleSave.bind( this );
		this.summaryPresenter     = this.summaryPresenter.bind( this );
		this.nextDatePresenter    = this.nextDatePresenter.bind( this );
		this.actionsPresenter     = this.actionsPresenter.bind( this );
		this.authorIdPresenter    = this.authorIdPresenter.bind( this );
	}

	toggleEditing() {
		this.setState( { editing: ! this.state.editing } );
	}

	summaryPresenter() {
		if ( this.state.editing ) {
			return <textarea value={ this.state.summary } onChange={ this.handleSummaryChange } />;
		}
		return this.state.summary;
	}

	nextDatePresenter() {
		if ( this.state.editing ) {
			return <input type="date" value={ this.state.nextDate } onChange={ this.handleNextDateChange } />;
		}
		if ( this.state.nextDate === "" ) {
			return "";
		}
		return datePresenter( this.state.nextDate );
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

	handleSave() {
		let note = Object.assign( {}, this.state, { id: this.props.result.id } );

		if ( note.nextDate === "" ) {
			note.nextDate = null;
		}

		this.props.api.saveNote( note ).then( this.toggleEditing );
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		console.log( "Editing = ", this.state.editing );

		return <BaseResult
			{ ...this.props }
			summaryPresenter={ this.summaryPresenter }
			nextDatePresenter={ this.nextDatePresenter }
			authorIdPresenter={ this.authorIdPresenter }
			createdAtPresenter={ datePresenter }
			actionsPresenter={ this.actionsPresenter }/>;
	}
}
