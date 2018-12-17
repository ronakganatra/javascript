import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import colors from "yoast-components/style-guide/colors.json";
import { Paper } from "./PaperStyles";
import Products from "./Products";
import Search from "./Search";
import { speak } from "@wordpress/a11y";
import util from "util";
import _debounce from "lodash/debounce";
import LandingPage from "./LandingPage";
import noDownloadsImage from "./../images/noDownloads.svg";
import noResultsImage from "./../images/SitesNoResults.svg";
import SuggestedAction from "./SuggestedAction";
import { GoToButtonLink } from "./Button";
import MyYoastModal from "./MyYoastModal";
import ComposerHelp from "./downloads/ComposerHelp";

const messages = defineMessages( {
	searchResults: {
		id: "downloadsPage.search.results",
		defaultMessage: "Number of downloads found: %d",
	},
	searchLabel: {
		id: "downloadsPage.search.label",
		defaultMessage: "Search downloads",
	},
	downloadsPageLoaded: {
		id: "downloadsPage.page.loaded",
		defaultMessage: "Downloads page loaded",
	},
	pluginsDownloads: {
		id: "downloadsPage.downloads.plugins",
		defaultMessage: "Plugins",
	},
	eBooksDownloads: {
		id: "downloadsPage.downloads.eBooks",
		defaultMessage: "eBooks",
	},
	installationGuides: {
		id: "downloadsPage.byLines.installationGuides",
		defaultMessage: "Read our installation guides",
	},
	eBooksLearnMore: {
		id: "downloadsPage.byLines.learnMore",
		defaultMessage: " - Want to learn more about SEO? { link }.",
	},
	coursesUpsell: {
		id: "downloadsPage.byLines.coursesUpsell",
		defaultMessage: "Check out our SEO training courses",
	},
	getProducts: {
		id: "downloadsPage.search.buttonShop",
		defaultMessage: "Get products",
	},
} );

const ProductOverviewContainer = styled.div`
	background-color: ${ colors.$color_white };
	display: flex;
	flex-wrap: wrap;
	padding-top: 24px;
	margin-top: 36px;
`;

const ByLine = styled.span`
	font-size: 18px;
	font-weight: 400;
`;

const debouncedSpeak = _debounce( speak, 1000 );

/**
 * Returns the rendered Downloads Page component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered downloads page.
 */
class DownloadsPage extends React.Component {
	/**
	 * Announces navigation to assistive technologies when the component mounts.
	 *
	 * @returns {void}
	 */
	componentDidMount() {
		const message = this.props.intl.formatMessage( messages.downloadsPageLoaded );
		speak( message );
	}

	/**
	 * Announces the search results to assistive technologies when the component receives new props.
	 *
	 * @param {Object} nextProps The new props the component will receive.
	 *
	 * @returns {void}
	 */
	componentWillReceiveProps( nextProps ) {
		/*
		 * While typing or pasting in the search field, `componentWillReceiveProps()`
		 * continously passes a new `query` props. We use this at our advantage
		 * to debounce the call to `speak()`.
		 * Note: remember for <input> and <textarea>, React `onChange` behaves
		 * like the DOM's built-in oninput event handler.
		 */
		this.speakSearchResultsMessage( nextProps );
	}

	/**
	 * Announces the search results to assistive technologies.
	 *
	 * @param {Object} nextProps The new props the component has received.
	 *
	 * @returns {void}
	 */
	speakSearchResultsMessage( nextProps ) {
		if ( nextProps.query.length > 0 && ( this.props.query !== nextProps.query ) ) {
			const foundDownloads = nextProps.plugins.length + nextProps.eBooks.length;
			const message = util.format( this.props.intl.formatMessage( messages.searchResults ), foundDownloads );
			debouncedSpeak( message, "assertive" );
		}
	}

	/**
	 * Return the search bar.
	 *
	 * @returns {ReactElement} The rendered Search component.
	 */
	getSearch() {
		return <Search
			id="search"
			searchLabel={ this.props.intl.formatMessage( messages.searchLabel ) }
			descriptionId="search-description"
			onChange={ this.props.onSearchChange }
			query={ this.props.query }
		/>;
	}

	/**
	 * Returns the modal for help on using Composer.
	 *
	 * @returns {ReactElement} The modal for help on using Composer.
	 */
	getModal() {
		const modalAriaLabel = {
			id: "modal.arialabel.create",
			defaultMessage: "Help on using Composer",
		};
		return this.props.composerHelpModalIsOpen
			? <MyYoastModal
				isOpen={ this.props.composerHelpModalIsOpen }
				onClose={ this.props.onComposerHelpModalClose }
				modalAriaLabel={ modalAriaLabel }
			>
				<ComposerHelp
					onClose={ this.props.onComposerHelpModalClose }
					productName={ this.props.composerHelpProductName }
					productGlNumber={ this.props.composerHelpProductGlNumber }
					createComposerToken={ this.props.composerHelpCreateComposerToken }
					composerToken={ this.props.composerToken }
				/>
			</MyYoastModal>
			: null;
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const pluginsByLine = <ByLine>
			<FormattedMessage
				id="downloadsPage.byLine.plugins"
				defaultMessage=" - Need help installing these? { link }."
				values={ { link: <a target="_blank" href="https://yoa.st/myyoast-installation" rel="noopener noreferrer">{ this.props.intl.formatMessage( messages.installationGuides ) }</a> } }
			/>
		</ByLine>;

		const eBooksByLine = <ByLine>
			<FormattedMessage
				{ ...messages.eBooksLearnMore }
				values={ { link: <a target="_blank" href="https://yoa.st/academy" rel="noopener noreferrer">{ this.props.intl.formatMessage( messages.coursesUpsell ) }</a> } }
			/>
		</ByLine>;

		const noDownloadsParagraphs = [
			<FormattedMessage id="downloadsPage.noDownloads.welcome" defaultMessage="Welcome to the downloads overview." />,
			<FormattedMessage id="downloadsPage.noDownloads.explanation" defaultMessage="It looks like you haven’t bought any products with downloadable files yet." />,
			<FormattedMessage id="downloadsPage.noDownloads.pressButton" defaultMessage="To browse our products, please visit:" /> ];

		const noResultsParagraphs = [ <FormattedMessage
			id="downloads.search.noResults"
			defaultMessage={ "We could not find any downloads matching { query }." }
			values={ { query: <strong>{ this.props.query }</strong> } }
		/> ];

		const pluginDownloads = <Products
			products={ this.props.plugins }
			byLine={ pluginsByLine }
			heading={ this.props.intl.formatMessage( messages.pluginsDownloads ) }
			noResults={ this.props.plugins.length > 0 ? "" : "No results" }
			composerToken={ this.props.composerToken }
			onComposerHelpModalOpen={ this.props.onComposerHelpModalOpen }
			onComposerHelpModalClose={ this.props.onComposerHelpModalClose }
		/>;

		const eBookDownloads = <Products
			products={ this.props.eBooks }
			byLine={ eBooksByLine }
			heading={ this.props.intl.formatMessage( messages.eBooksDownloads ) }
		/>;

		if ( this.props.query.length > 0 && ( this.props.plugins.length === 0 && this.props.eBooks.length === 0 ) ) {
			return (
				<div>
					{ this.getSearch() }
					<LandingPage
						imageSource={ noResultsImage }
						urlText={ this.props.intl.formatMessage( messages.getProducts ) }
						paragraphs={ noResultsParagraphs }
						url="https://yoast.com/shop/"
					/>
				</div>
			);
		} else if ( this.props.eBooks.length === 0 && this.props.plugins.length === 0 ) {
			return (
				<SuggestedAction
					paragraphs={ noDownloadsParagraphs }
					imageSource={ noDownloadsImage }
				>
					<GoToButtonLink />
				</SuggestedAction>
			);
		}

		return (
			<div>
				{ this.getSearch() }
				<Paper>
					<ProductOverviewContainer>
						{ pluginDownloads }
						{ this.props.eBooks.length > 0 ? eBookDownloads : null }
					</ProductOverviewContainer>
				</Paper>
				{ this.getModal() }
			</div>
		);
	}
}

export default injectIntl( DownloadsPage );

DownloadsPage.propTypes = {
	intl: intlShape.isRequired,
	query: PropTypes.string,
	onSearchChange: PropTypes.func.isRequired,
	eBooks: PropTypes.array,
	plugins: PropTypes.array,
	composerToken: PropTypes.object,
	composerHelpModalIsOpen: PropTypes.bool,
	onComposerHelpModalOpen: PropTypes.func.isRequired,
	onComposerHelpModalClose: PropTypes.func.isRequired,
	composerHelpCreateComposerToken: PropTypes.func.isRequired,
	composerHelpProductName: PropTypes.string,
	composerHelpProductGlNumber: PropTypes.string,
	composerHelpComposerToken: PropTypes.object,
};

DownloadsPage.defaultProps = {
	query: "",
	eBooks: [],
	plugins: [],
	composerToken: null,
	composerHelpModalIsOpen: false,
	composerHelpProductName: "",
	composerHelpProductGlNumber: "0",
	composerHelpComposerToken: null,
};
