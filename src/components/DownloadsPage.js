import React from "react";
import styled from "styled-components";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import colors from "yoast-components/style-guide/colors.json";
import Paper from "./Paper";
import Download from "./Download";
import Search from "./Search";
import a11ySpeak from "a11y-speak";

const messages = defineMessages( {
	downloadsPageLoaded: {
		id: "menu.downloads.loaded",
		defaultMessage: "Downloads page loaded",
	},
	pluginsDownloads: {
		id: "downloads-page.downloads.plugins",
		defaultMessage: "Plugins",
	},
	pluginsHelpText: {
		id: "downloads-page.help-texts.plugins",
		defaultMessage: "Need help installing these? <a href=\"{ link }\">Read our quickstart guide</a>.",
	},
	eBooksDownloads: {
		id: "downloads-page.downloads.eBooks",
		defaultMessage: "Plugins",
	},
	searchResults: {
		id: "downloads-page.search.results",
		defaultMessage: "Number of downloads found: %d",
	},
	searchLabel: {
		id: "downloads-page.search.label",
		defaultMessage: "Search downloads",
	},
} );

const DownloadsContainer = styled.div`
	display: flex;
	background-color:  ${ colors.$color_white };
	margin: 20px 0 0;
	padding: 6px;
`;

/**
 * Returns the rendered Downloads Page component.
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
		let props = this.props;

		return (
			<Paper>
				<DownloadsContainer>
					{ props.downloads.map( function( download ) {
						return <Download
							key={ download.buttons.label }
							product={ download.product }
							version={ download.version }
							iconSource={ download.iconSource }
							buttons={ download.buttons }
						/>;
					} ) }
				</DownloadsContainer>
			</Paper>
		);
	}

}

export default injectIntl( DownloadsPage );

DownloadsPage.propTypes = {
	intl: intlShape.isRequired,
	query: React.PropTypes.string,
	onSearchChange: React.PropTypes.func.isRequired,
};

DownloadsPage.defaultProps = {
	query: "",
};
