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

const Columns = styled.div`
	display: block;
	background-color: green;
	align-items: top;
	width: 1264px;
`;

const CardColumn = styled.div`
	display: inline-block;
	max-width: 600px;
	
	> div {
		margin-top: 8px;
	}

	&#left-column-cards {
		background-color: red;
	}
	&#right-column-cards {
		background-color: blue;
	}
`;

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
];

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

	sortCardsInColumns( cardsArray ) {
		const leftColumn = [];
		const rightColumn = [];
		cardsArray.forEach( ( cardData, index ) => {
			// If the index is even, add to left column.
			const Card = <FullHeightCard
				id={ cardData.id }
				key={ cardData.id }
				className={ cardData.className }
			>
				{ cardData.component }
			</FullHeightCard>;

			index % 2 === 0 ? leftColumn.push( Card ) : rightColumn.push( Card );
		} );

		return( [ leftColumn, rightColumn ] );
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const [ leftColumn, rightColumn ] = ( this.sortCardsInColumns( cards ) );
		return (
			<Columns>
				<CardColumn
					id="left-column-cards"
				>
					{
						leftColumn.map( ( Card ) => {
							return Card;
						} )
					}
				</CardColumn>
				<CardColumn
					id="right-column-cards"
				>
					{
						rightColumn.map( ( Card ) => {
							return Card;
						} )
					}
				</CardColumn>
			</Columns>
		);
	}
}

export default injectIntl( HomePage );

HomePage.propTypes = {
	intl: intlShape.isRequired,
};
