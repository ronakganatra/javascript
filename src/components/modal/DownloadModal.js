import { defineMessages } from "react-intl";
import MyYoastModal from "../MyYoastModal";
import React from "react";
import PropTypes from "prop-types";
import SubscriptionDownloads from "../SubscriptionDownloads";
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
		<SubscriptionDownloads
			onDownloadModalClose={ props.onDownloadModalClose }
			intl={ props.intl }
			products={ props.products }
		/>
	</MyYoastModal>
);

DownloadModal.propTypes = {
	downloadModalOpen: PropTypes.bool,
	onDownloadModalClose: PropTypes.func,
	intl: intlShape.isRequired,
	products: PropTypes.arrayOf( PropTypes.object ),
};

DownloadModal.defaultProps = {
	modalOpen: false,
};

export default DownloadModal;
