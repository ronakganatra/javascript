import React from "react";
import styled from "styled-components";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { speak } from "@wordpress/a11y";
import PluginUpsell from "./PluginUpsell";
import AcademyUpsell from "./AcademyUpsell";
import SitesCard from "./SitesCard";
import BlogFeed from "./BlogCard";
import { FullHeightCard } from "../Card";

const messages = defineMessages( {
	homePageLoaded: {
		id: "home.page.loaded",
		defaultMessage: "Home page loaded",
	},
} );

// These media screen limits were visually pleasing, and the defaults didn't suffice.
const CardColumns = styled.div`
	column-count: 2;
	column-width: 50%;

	@media screen and ( min-width: 1025px ) and ( max-width: 1200px ),
	( max-width: 900px ) {
		display: flex;
		flex-direction: column;
	} 
`;

/**
 * The ShadowDiv is necessary to give the cards some space to have a drop shadow.
 * There is a bug/lacking-feature in Chrome that does not take into account 'drop-shadow'
 * when breaking boxes into the next column.
 *
 * Note, you could pass an order prop, but this will only affect the visual order, so it probably needs a JS solution.
 *
 * @param {Object} props The props for the ShadowDiv.
 *
 * @returns {ReactElement} A small container that provides some extra breathing room for the Cards.
 */
const ShadowDiv = styled.div`
	display: inline-block;
	margin-bottom: 12px;
	width: 100%;
	padding: 4px 0;
	order: ${ props => props.order && props.order };
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

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			<CardColumns>
				<ShadowDiv
					order={ 3 }
					tabIndex={ 3 }
				>
					<FullHeightCard
						className={ "UpsellCard" }
						id={ "academy-upsell-card" }
					>
						<div>
							<h2>Academy sexytimes</h2>
							<p>HIHIIHIHIHIH</p>
							<p>HIHIIHIHIHIH</p>
							<p>HIHIIHIHIHIH</p>
							<p>HIHIIHIHIHIH</p>
						</div>
					</FullHeightCard>
				</ShadowDiv>
				<ShadowDiv
					order={ 2 }
					tabIndex={ 2 }
				>
					<FullHeightCard
						className={ "UpsellCard" }
						id={ "plugin-upsell-card" }
					>
						<PluginUpsell />
					</FullHeightCard>
				</ShadowDiv>
				<ShadowDiv
					order={ -1 }
					tabIndex={ -1 }
				>
					<FullHeightCard
						className={ "BlogCard" }
						id={ "blog-card" }
					>
						<BlogFeed />
					</FullHeightCard>
				</ShadowDiv>
				<ShadowDiv
					order={ -1 }
					tabIndex={ -1 }
				>
					<FullHeightCard
						className={ "UpsellCard" }
						id={ "academy-upsell-card" }
					>
						<AcademyUpsell />
					</FullHeightCard>
				</ShadowDiv>
				<ShadowDiv
					order={ -1 }
					tabIndex={ -1 }
				>
					<FullHeightCard
						className={ "SitesCard" }
						id={ "sites-card" }
					>
						<SitesCard />
					</FullHeightCard>
				</ShadowDiv>
				<ShadowDiv
					order={ -1 }
					tabIndex={ -1 }
				>
					<FullHeightCard
						className={ "UpsellCard" }
						id={ "academy-upsell-card" }
					>
						<div>
							<h2>Support Kaartje</h2>
							<p> TACO BEN </p>
							<p> TACO BEN </p>
							<p> TACO BEN </p>
							<p> TACO BEN </p>
						</div>
					</FullHeightCard>
				</ShadowDiv>
			</CardColumns>
		);
	}
}

export default injectIntl( HomePage );

HomePage.propTypes = {
	intl: intlShape.isRequired,
};
