import React from "react";
import styled from "styled-components";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { speak } from "@wordpress/a11y";
import PluginUpsell from "./PluginUpsell";
import AcademyUpsell from "./AcademyUpsell";
import SitesCard from "./SitesCard";
import SupportCard from "./SupportCard";
import BlogFeed from "./BlogCard";
import Card from "../Card";

const messages = defineMessages( {
	homePageLoaded: {
		id: "home.page.loaded",
		defaultMessage: "Home page loaded",
	},
} );

const cards = [
	{
		id: "plugin-upsell-card",
		className: "UpsellCard",
		component: <PluginUpsell />,
	},
	{
		id: "blog-card",
		className: "BlogCard",
		component: <BlogFeed />,
	},
	{
		id: "academy-upsell-card",
		className: "UpsellCard",
		component: <AcademyUpsell />,
	},
	{
		id: "sites-card",
		className: "SitesCard",
		component: <SitesCard />,
	},
	{
		id: "support-card",
		className: "SupportCard",
		component: <SupportCard />,
	},
];

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
 * @returns {ReactElement} A small container that provides some extra breathing room for the Cards.
 */
const ShadowDiv = styled.div`
	display: inline-block;
	margin-bottom: 12px;
	width: 100%;
	padding: 4px 0;
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
	 * Wraps the inner card content components in a ShadowDiv and a FullHeightCard.
	 *
	 * @param {array} cardsArray An array of cards with id, className, and the inner card component.
	 *
	 * @returns {array} Returns an array of ReactElements.
	 */
	createCards( cardsArray ) {
		return cardsArray.map( ( card ) => {
			return(
				<ShadowDiv
					key={ card.id }
				>
					<Card
						header={ card.header || null }
						banner={ card.banner || null }
						className={ card.className }
						id={ card.id }
					>
						{ card.component }
					</Card>
				</ShadowDiv>
			);
		} );
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const cardList = this.createCards( cards );
		return (
			<CardColumns>
				{ cardList }
			</CardColumns>
		);
	}
}

export default injectIntl( HomePage );

HomePage.propTypes = {
	intl: intlShape.isRequired,
};
