import React from "react";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { speak } from "@wordpress/a11y";
import SitesCard from "./SitesCard";
import SupportCard from "./SupportCard";
import { FullHeightCard } from "./../Card";

const messages = defineMessages( {
	homePageLoaded: {
		id: "home.page.loaded",
		defaultMessage: "Home page loaded",
	},
} );

/**
 * Returns the rendered Downloads Page component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered downloads page.
 */
class HomePage extends React.Component {
	componentDidMount() {
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.homePageLoaded );
		speak( message );
	}

	render() {
		return (
			<div>
				<h1>WORK IN PROGRESS</h1>
				<SitesCard />
				<FullHeightCard
					className={ "SupportCard" }
					id={ "support-card" }
				>
					<SupportCard id={ "support" } header={ "Support"} />
				</FullHeightCard>

			</div>
		);
	}
}

export default injectIntl( HomePage );

HomePage.propTypes = {
	intl: intlShape.isRequired,
};

