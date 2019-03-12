import { defineMessages, injectIntl } from "react-intl";
import MyYoastModal from "../MyYoastModal";
import React from "react";
import PropTypes from "prop-types";
import DownloadsList from "../DownloadsList";
import { intlShape } from "react-intl";
import { getProductsFromSubscription, hasDownload } from "../../functions/productGroups";
import { sortPluginsByPopularity } from "../../functions/products";
import { downloadModalClose } from "../../actions/site";
import { connect } from "react-redux";

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
		isOpen={ props.isOpen }
		onClose={ props.onClose }
		modalAriaLabel={ modalAriaLabel }
	>
		<DownloadsList
			onDownloadModalClose={ props.onClose }
			intl={ props.intl }
			downloads={ props.downloads }
		/>
	</MyYoastModal>
);

DownloadModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	downloads: PropTypes.arrayOf( PropTypes.object ),
};

DownloadModal.defaultProps = {
	downloads: [],
};

const mapStateToProps = ( state ) => {
	const downloadModalIsOpen = state.ui.site.downloadModalOpen;
	const downloadModalSubscriptionId = state.ui.site.downloadModalSubscriptionId;

	let downloads = [];
	if ( downloadModalIsOpen ) {
		const downloadModalSubscription = state.entities.subscriptions.byId[ downloadModalSubscriptionId ];
		const products = getProductsFromSubscription( state, downloadModalSubscription );

		const usProducts = sortPluginsByPopularity( products.filter( product => product.sourceShopId === 1 ) )
			.filter( product => hasDownload( product ) );

		downloads = usProducts.map( product => {
			return { name: product.name, file: product.downloads[ 0 ].file };
		} );
	}

	return ( {
		isOpen: downloadModalIsOpen,
		downloads,
	} );
};

const mapDispatchToProps = ( dispatch ) => {
	return (
		{
			onClose: () => {
				dispatch( downloadModalClose() );
			},
		}
	);
};

const DownloadsModalContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)( injectIntl( DownloadModal ) );

export default DownloadsModalContainer;
