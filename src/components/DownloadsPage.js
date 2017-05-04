import React from "react";
import styled from "styled-components";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import colors from "yoast-components/style-guide/colors.json";
import Paper from "./Paper";
import Products from "./Products";
import Search from "./Search";
import a11ySpeak from "a11y-speak";

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
	downloadsPagePluginsByLine: {
		id: "downloads-page.by-line.plugins",
		defaultMessage: " - Need help installing these? { link }.",
	},
	pluginsDownloads: {
		id: "downloads-page.downloads.plugins",
		defaultMessage: "Plugins",
	},
	eBooksDownloads: {
		id: "downloads-page.downloads.eBooks",
		defaultMessage: "eBooks",
	},
} );

const ProductOverviewContainer = styled.div`
	background-color:  ${ colors.$color_white };
	display: flex;
	flex-wrap: wrap;
	padding: 24px 0 0 0;
	margin: 36px 0 0 0;
`;

const ByLine = styled.span`
	font-size: 18px;
	font-weight: 400;
`;

/**
 * Returns the rendered Products Page component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered download page.
 */
class DownloadsPage extends React.Component {
	componentDidMount() {
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.downloadsPageLoaded );
		a11ySpeak( message );
	}

	render() {
		let pluginsByLine = <ByLine>
			<FormattedMessage
				id="downloads-page.by-line.plugins"
				defaultMessage=" - Need help installing these? { link }."
				values={ { link: <a href="https://kb.yoast.com/?s=installation+guide">Read our installation guides</a> } }
			/>
		</ByLine>;

		return (
			<div>
				<Search
					id="search"
					searchLabel={ this.props.intl.formatMessage( messages.searchLabel ) }
					descriptionId="search-description"
					onChange={ this.props.onSearchChange }
					query={ this.props.query }
				/>
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
