import React from "react";
import styled from "styled-components";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import colors from "yoast-components/style-guide/colors.json";
import Paper from "./Paper";
import Products from "./Products";
import Search from "./Search";
import a11ySpeak from "a11y-speak";
import NoResults from "./NoResults";
import noDownloads from "./../images/noSites.svg";

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
} );

const ProductOverviewContainer = styled.div`
	background-color: ${ colors.$color_white };
	display: flex;
	flex-wrap: wrap;
	padding-top: 24px;
	margin-top: 36px;
	
	a {
		color: ${ colors.$color_blue };
	}
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
				values={ { link: <a target="_blank" href="https://yoa.st/myyoast-installation">{ this.props.intl.formatMessage( messages.installationGuides ) }</a> } }
			/>
		</ByLine>;

		let noDownloadsParagraphs = [ <FormattedMessage id="downloads-page.no-downloads.welcome" defaultMessage="Welcome to the downloads page" />,
			<FormattedMessage id="downloads-page.no-downloads.explanation" defaultMessage="It looks like you haven’t bought any products with downloadable files yet." />,
			<FormattedMessage id="downloads-page.no-downloads.press-button" defaultMessage="Press the button below to visit yoast.com and look at our products."/> ];

		if ( this.props.eBooks.length > 0 || this.props.plugins.length > 0 ) {
			return (
				<div>
					{ this.getSearch() }
					<Paper>
						<ProductOverviewContainer>
							<Products
								products={ this.props.plugins }
								byLine={ pluginsByLine }
								heading={ this.props.intl.formatMessage( messages.pluginsDownloads ) }
							/>
							<Products
								products={ this.props.eBooks }
								heading={ this.props.intl.formatMessage( messages.eBooksDownloads ) }
							/>
						</ProductOverviewContainer>
					</Paper>
				</div>
			);
		} else if ( this.props.query.length > 0 ) {
			return (
				<div>
					{ this.getSearch() }
				</div>
			);
		}
		return <NoResults paragraphs={ noDownloadsParagraphs }
						  onClick={ () => window.open( "https://yoa.st/myyoast-download", "_blank" ) }
						  imageSource={ noDownloads }/>;
	}
}

export default injectIntl( DownloadsPage );

DownloadsPage.propTypes = {
	intl: intlShape.isRequired,
	query: React.PropTypes.string,
	onSearchChange: React.PropTypes.func.isRequired,
	eBooks: React.PropTypes.array,
	plugins: React.PropTypes.array,
};

DownloadsPage.defaultProps = {
	query: "",
	eBooks: [],
	plugins: [],
};
