import React from "react";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { speak } from "@wordpress/a11y";
import PluginUpsell from "./PluginUpsell";
import AcademyUpsell from "./AcademyUpsell";
import { FullHeightCard } from "../Card";
import SitesCard from "./SitesCard";
import BlogFeed from "./BlogCard";


const messages = defineMessages( {
	homePageLoaded: {
		id: "home.page.loaded",
		defaultMessage: "Home page loaded",
	},
} );

/**
 * Returns the rendered HomePage component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered home page.
 */
class HomePage extends React.Component {
	componentDidMount() {
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.homePageLoaded );
		speak( message );
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			<div>
				<h1>WORK IN PROGRESS</h1>
				<SitesCard />
				<FullHeightCard
					className={ "BlogCard" }
					id={ "blog-card" }
				>
					<BlogFeed />
				</FullHeightCard>
				<FullHeightCard
					className={ "SitesCard" }
					id={ "sites-card" }
				>
					<SitesCard />
				</FullHeightCard>
				<FullHeightCard
					className={ "UpsellCard" }
					id={ "plugin-upsell-card" }
				>
					<PluginUpsell />
				</FullHeightCard>
				<FullHeightCard
					className={ "UpsellCard" }
					id={ "academy-upsell-card" }
				>
					<AcademyUpsell />
				</FullHeightCard>
			</div>
		);
	}
}

export default injectIntl( HomePage );

HomePage.propTypes = {
	intl: intlShape.isRequired,
};
