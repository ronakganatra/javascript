import { defineMessages } from "react-intl";
import MyYoastModal from "../MyYoastModal";
import React from "react";
import PropTypes from "prop-types";
import DownloadsList from "../DownloadsList";
import { intlShape } from "react-intl";


const modalAriaLabel = defineMessages( {
	id: "modal.arialabel.download",
	defaultMessage: "Download plugins for the subscription",
} );

/**
 * Returns the Download modal.
 *
 * @param {Object} props The props required.
 * @returns { ReactElement } The Download modal.
 */
const DownloadModal = ( props ) => (
	<MyYoastModal
		isOpen={ props.downloadModalOpen }
		onClose={ props.onDownloadModalClose }
		modalAriaLabel={ modalAriaLabel }
	>
		<DownloadsList
			onDownloadModalClose={ props.onDownloadModalClose }
			intl={ props.intl }
			downloads={ props.downloads }
		/>
	</MyYoastModal>
);

DownloadModal.propTypes = {
	downloadModalOpen: PropTypes.bool,
	onDownloadModalClose: PropTypes.func,
	intl: intlShape.isRequired,
	downloads: PropTypes.arrayOf( PropTypes.object ),
};

DownloadModal.defaultProps = {
	modalOpen: false,
};

export default DownloadModal;
