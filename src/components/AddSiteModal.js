import React from "react";
import Modal from "react-modal";
import { LargeButton } from "../components/Button";

/*
 * Makes the `aria-hidden="true"` attribute being applied on the root element
 * instead of the body.
 */
Modal.setAppElement( "#root" );

class AddSiteModal extends React.Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: false,
		};

		this.openModal = this.openModal.bind( this );
		this.afterOpenModal = this.afterOpenModal.bind( this );
		this.closeModal = this.closeModal.bind( this );
	}

	openModal() {
		this.setState( { modalIsOpen: true } );
	}

	afterOpenModal() {
		// References are now sync'd and can be accessed.
		this.refs.subtitle.style.color = "#dc3232";
	}

	closeModal() {
		this.setState( { modalIsOpen: false } );
	}

	render() {
		return (
			<div>
				<Modal
					isOpen={ this.state.modalIsOpen }
					onAfterOpen={ this.afterOpenModal }
					onRequestClose={ this.closeModal }
					// style={ customStyles }
					role="dialog"
					contentLabel="Add a new site"
					overlayClassName="my-yoast-modal__overlay"
					className="my-yoast-modal__content"
				>
					<h1 ref="subtitle">Hello</h1>
					<button type="button" onClick={ this.closeModal }>Close</button>
					<form>
						<label htmlFor="addinput">Please enter the URL of the site you would like to link with your account</label>
						<input id="addinput" />
						<button type="button">tab navigation</button>
						<button type="button">stays</button>
						<button type="button">inside</button>
						<button type="button">the modal</button>
						<div className="my-yoast-modal__actions">
							<LargeButton>Cancel</LargeButton>
							<LargeButton>Link</LargeButton>
						</div>
					</form>
				</Modal>
			</div>
		);
	}

	componentWillReceiveProps( nextProps ) {
		this.setState( {
			modalIsOpen: true,
		} );
	}
}

export default AddSiteModal;
