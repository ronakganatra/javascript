import React from "react";
import Modal from "react-modal";

/*
 * Makes the `aria-hidden="true"` attribute being applied on the root element
 * instead of the body.
 */
Modal.setAppElement( "#root" );

const customStyles = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
	},
	content: {
		position: "absolute",
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		width: "640px",
		border: "0",
		borderRadius: "0",
		marginRight: "-50%",
		padding: "40px",
		transform: "translate(-50%, -50%)",
	},
};

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
					style={ customStyles }
					role="dialog"
					contentLabel="Add a new site"
				>

					<h1 ref="subtitle">Hello</h1>
					<button type="button" onClick={ this.closeModal }>Close</button>
					<p>I am a modal</p>
					<form>
						<input />
						<button type="button">tab navigation</button>
						<button type="button">stays</button>
						<button type="button">inside</button>
						<button type="button">the modal</button>
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
