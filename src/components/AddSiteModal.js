import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import AddSite from "../components/AddSite";

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

	constructor( props ) {
		super( props );
	}

	/**
	 * Returns the rendered html.
	 *
	 * @returns {ReactElement} The rendered html.
	 */
	render() {
		return (
			<div>
				<Modal
					isOpen={ this.props.isOpen }
					onRequestClose={ this.props.onClose }
					role="dialog"
					contentLabel={ this.props.intl.formatMessage( messages.modalAriaLabel ) }
					overlayClassName={ `${ this.props.className } my-yoast-modal__overlay` }
					className={ `${ this.props.className } my-yoast-modal__content` }
				>
					<AddSite
						onLinkClick={ this.props.onLink }
						onCancelClick={ this.props.onClose }
					/>
				</Modal>
			</div>
		);
	}
}

BaseAddSiteModal.propTypes = {
	className: React.PropTypes.string,
	intl: intlShape.isRequired,
	addSitePopupOpen: React.PropTypes.bool,
	isOpen: React.PropTypes.bool,
	onClose: React.PropTypes.func.isRequired,
	onLink: React.PropTypes.func.isRequired,
};

BaseAddSiteModal.defaultProps = {
	addSitePopupOpen: false,
	isOpen: false,
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
