import React from "react";
import styled from "styled-components";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { speak } from "@wordpress/a11y";
import PluginUpsell from "./PluginUpsell";
import AcademyUpsell from "./AcademyUpsell";
import { FullHeightCard } from "../Card";
import SitesCard from "./SitesCard";

const messages = defineMessages( {
	homePageLoaded: {
		id: "home.page.loaded",
		defaultMessage: "Home page loaded",
	},
} );

const CardColumns = styled.div`
	max-height: 1000px;
	max-width: 1400px;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	background-color: red;

	> div {
		max-width: 600px;
		margin-top: 16px;
	};
`;

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

	render() {
		return (
			<CardColumns>
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
			</CardColumns>
		);
	}
}

export default injectIntl( HomePage );

HomePage.propTypes = {
	intl: intlShape.isRequired,
};
