import { connect } from "react-redux";
import { onSearchQueryChange } from "../actions/search";
import DownloadsPage from "../components/DownloadsPage";
import { getAllProducts } from "../actions/products";
import { getProductGroups } from "../actions/productGroups";
import { getAllSubscriptions } from "../actions/subscriptions";
import { getOrders } from "../actions/orders";
import {
	composerHelpModalClosed, composerHelpModalOpen,
	createComposerToken, fetchComposerTokens,
} from "../actions/composerTokens";
import { getQueryEbooks, getQueryPlugins, getSearchQuery } from "../selectors/entities/search";
import { getFirstEnabledComposerToken } from "../selectors/entities/composerTokens";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	return {
		query: getSearchQuery( state ),
		eBooks: getQueryEbooks( state ),
		plugins: getQueryPlugins( state ),
		composerToken: getFirstEnabledComposerToken( state ),
		composerHelpModalIsOpen: state.ui.composerTokens.composerHelpModalIsOpen,
		composerHelpProductName: state.ui.composerTokens.composerHelpProductName,
		composerHelpProductGlNumber: state.ui.composerTokens.composerHelpProductGlNumber,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	dispatch( getAllProducts() );
	dispatch( getProductGroups() );
	dispatch( getAllSubscriptions() );
	dispatch( getOrders() );
	dispatch( fetchComposerTokens() );
	return {
		onSearchChange: ( query ) => {
			dispatch( onSearchQueryChange( query ) );
		},
		onComposerHelpModalClose: () => {
			dispatch( composerHelpModalClosed() );
		},
		onComposerHelpModalOpen: ( productName, glNumber, composerToken ) => {
			dispatch( composerHelpModalOpen( productName, glNumber, composerToken ) );
		},
		composerHelpCreateComposerToken: () => {
			dispatch( createComposerToken( { name: "Default Token" } ) );
		},
	};
};

const DownloadsPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( DownloadsPage );

export default DownloadsPageContainer;
