import { defineMessages } from "react-intl";
import MyYoastModal from "../MyYoastModal";
import AddSite from "../AddSite";
import React from "react";
import PropTypes from "prop-types";

let modalAriaLabel = defineMessages( {
	id: "modal.arialabel.add",
	defaultMessage: "Add a new site",
} );

/**
 * Returns the AddSite modal.
 *
 * @param {Object} props The props required.
 * @returns { ReactElement } The AddSite Modal.
 */
const AddSiteModal = ( props ) => (
	<MyYoastModal
		isOpen={ props.modalOpen }
		onClose={ props.onClose }
		modalAriaLabel={ modalAriaLabel }
	>
		<AddSite
			onConnectClick={ props.onConnect }
			onCancelClick={ props.onClose }
			onChange={ props.onChange }
			errorFound={ props.errorFound }
			error={ props.error }
			query={ props.query }
			linkingSiteUrl={ props.linkingSiteUrl }
		/>
	</MyYoastModal>
);


AddSiteModal.propTypes = {
	onConnect: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	errorFound: PropTypes.bool.isRequired,
	error: PropTypes.object,
	linkingSiteUrl: PropTypes.string.isRequired,
	query: PropTypes.string,
	modalOpen: PropTypes.bool,
};

AddSiteModal.defaultProps = {
	query: "",
	linkingSiteUrl: "",
	modalOpen: false,
	error: null,
};

export default AddSiteModal;
