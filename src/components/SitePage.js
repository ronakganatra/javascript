import React from "react";
import styled from "styled-components";
import a11ySpeak from "a11y-speak";
import { defineMessages, injectIntl, intlShape } from "react-intl";

import SiteHeader from "./SiteHeader";
import { RoundBackButton } from "./RoundButton";
// import SiteSubscriptionDetailList from "./SiteSubscriptionDetailList";

const messages = defineMessages( {
	sitePageLoaded: {
		id: "menu.site.loaded",
		defaultMessage: "Site page loaded",
	},
} );

const BackToSitesButton = styled( RoundBackButton )`
	margin: 0 0 36px -80px;
`;

/**
 * Returns the rendered Site Page component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Site component.
 */
class SitePage extends React.Component {
	componentDidMount() {
		let message = this.props.intl.formatMessage( messages.sitePageLoaded );
		a11ySpeak( message );
	}

	render() {
		let props = this.props;

		return (
			<div>
					<BackToSitesButton onClick={ () => {
						console.log( "clicked" );
					} }
					/>
					<SiteHeader name={ props.siteName } url={ props.siteUrl } imageUrl={ props.siteImage }/>
			</div>
		);
	}
}

export default injectIntl( SitePage );

SitePage.propTypes = {
	onToggleSubscription: React.PropTypes.func.isRequired,
	site: React.PropTypes.object.isRequired,
	subscriptions: React.PropTypes.arrayOf( React.PropTypes.object ),
	siteName: React.PropTypes.string.isRequired,
	siteUrl:React.PropTypes.string.isRequired,
	siteImage: React.PropTypes.string.isRequired,
	intl: intlShape.isRequired,
};

SitePage.defaultProps = {
	subscriptions: [],
};
