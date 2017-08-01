import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import colors from "yoast-components/style-guide/colors.json";
import Paper from "./Paper";
import Products from "./Products";
import Search from "./Search";
import a11ySpeak from "a11y-speak";
import LandingPage from "./LandingPage";
import noDownloadsImage from "./../images/noDownloads.svg";
import noResultsImage from "./../images/SitesNoResults.svg";
import NoResults from "./NoResults";

const messages = defineMessages( {
	searchResults: {
		id: "downloads-page.search.results",
		defaultMessage: "Number of downloads found: %d",
	},
	searchLabel: {
		id: "downloads-page.search.label",
		defaultMessage: "Search downloads",
	},
	downloadsPageLoaded: {
		id: "downloads-page.page.loaded",
		defaultMessage: "Downloads page loaded",
	},
	pluginsDownloads: {
		id: "downloads-page.downloads.plugins",
		defaultMessage: "Plugins",
	},
	eBooksDownloads: {
		id: "downloads-page.downloads.eBooks",
		defaultMessage: "eBooks",
	},
	installationGuides: {
		id: "downloads-page.by-lines.installation-guides",
		defaultMessage: "Read our installation guides",
	},
	otherBooks: {
		id: "downloads-page.by-lines.books-upsell",
		defaultMessage: "Check out our other eBooks",
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

/**
 * Returns the rendered Downloads Page component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered downloads page.
 */
class DownloadsPage extends React.Component {
	componentDidMount() {
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.downloadsPageLoaded );
		a11ySpeak( message );
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


	render() {
		let pluginsByLine = <ByLine>
			<FormattedMessage
				id="downloads-page.by-line.plugins"
				defaultMessage=" - Need help installing these? { link }."
				values={ { link: <a target="_blank" href="https://yoa.st/myyoast-installation" rel="noopener noreferrer">{ this.props.intl.formatMessage( messages.installationGuides ) }</a> } }
			/>
		</ByLine>;

		let eBooksByLine = <ByLine>
			<FormattedMessage
				id="downloads-page.by-line.ebooks"
				defaultMessage=" - Want to read more about SEO? { link }."
				values={ { link: <a target="_blank" href="https://yoa.st/ebooks" rel="noopener noreferrer">{ this.props.intl.formatMessage( messages.otherBooks ) }</a> } }
			/>
		</ByLine>;

		let noDownloadsParagraphs = [
			<FormattedMessage id="downloads-page.no-downloads.welcome" defaultMessage="Welcome to the downloads page." />,
			<FormattedMessage id="downloads-page.no-downloads.explanation" defaultMessage="It looks like you haven’t bought any products with downloadable files yet." />,
			<FormattedMessage id="downloads-page.no-downloads.press-button" defaultMessage="Press the button below to visit our shop and get your first product."/> ];

		let noResultsParagraphs = [ <FormattedMessage id="downloads.search.no-results"
															   defaultMessage={ "We could not find any downloads matching { query }." }
															   values={ { query: <strong>{ this.props.query }</strong> } } /> ];

		let pluginDownloads = <Products
									products={ this.props.plugins }
									byLine={ pluginsByLine }
									heading={ this.props.intl.formatMessage( messages.pluginsDownloads ) }
									noResults={ this.props.plugins.length > 0 ? "" : "No results" }
		/>;

		let eBookDownloads = <Products
									products={ this.props.eBooks }
									byLine={ eBooksByLine }
									heading={ this.props.intl.formatMessage( messages.eBooksDownloads ) }
									noResults={ this.props.eBooks.length > 0 ? "" : "No results" }
		/>;

		if ( this.props.query.length > 0 && ( this.props.plugins.length === 0 && this.props.eBooks.length === 0 ) ) {
			return (
				<div>
					{ this.getSearch() }
					<LandingPage imageSource={ noResultsImage }
								 paragraphs={ noResultsParagraphs }
					/>
				</div>
			);
		} else if ( this.props.eBooks.length === 0 && this.props.plugins.length === 0 ) {
			return (
				<NoResults paragraphs={ noDownloadsParagraphs }
					url="https://yoast.com/shop/"
					imageSource={ noDownloadsImage }
					pageContext="noDownloads"
				/>
			);
		}

		return (
			<div>
				{ this.getSearch() }
				<Paper>
					<ProductOverviewContainer>
						{ pluginDownloads }
						{ eBookDownloads }
					</ProductOverviewContainer>
				</Paper>
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
};

DownloadsPage.defaultProps = {
	query: "",
	eBooks: [],
	plugins: [],
};
