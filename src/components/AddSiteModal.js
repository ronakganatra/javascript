import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { LargeButton } from "../components/Button";
import { defineMessages, injectIntl, intlShape } from "react-intl";

const messages = defineMessages( {
	modalAriaLabel: {
		id: "modal.arialabel.add",
		defaultMessage: "Add a new site",
	},
} );

/*
 * Makes the `aria-hidden="true"` attribute being applied on the root element
 * instead of the body.
 */
Modal.setAppElement( "#root" );

class BaseAddSiteModal extends React.Component {
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
					role="dialog"
					contentLabel={ this.props.intl.formatMessage( messages.modalAriaLabel ) }
					overlayClassName={ `${ this.props.className } my-yoast-modal__overlay` }
					className={ `${ this.props.className } my-yoast-modal__content` }
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

BaseAddSiteModal.propTypes = {
	className: React.PropTypes.string,
	intl: intlShape.isRequired,
};

const AddSiteModal = styled( BaseAddSiteModal )`
	&.my-yoast-modal__overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
	}

	&.my-yoast-modal__content {
		position: absolute;
		top: 50%;
		left: 50%;
		right: auto;
		bottom: auto;
		width: 640px;
		border: 0;
		border-radius: 0;
		margin-right: -50%;
		padding: 40px;
		transform: translate(-50%, -50%);
		background-color: #fff;
		outline: none;
	}

	.my-yoast-modal__actions {
		padding-top: 1em;
		text-align: right;
	}

	.my-yoast-modal__actions button {
		margin-left: 1em;
	}
`;

export default injectIntl( AddSiteModal );
