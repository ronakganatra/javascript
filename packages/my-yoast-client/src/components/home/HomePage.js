import React, { Fragment } from "react";
import styled from "styled-components";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { speak } from "@wordpress/a11y";
import PluginUpsell from "./PluginUpsell";
import AcademyUpsell from "./AcademyUpsell";
import SitesCard from "./SitesCard";
import SupportCard from "./SupportCard";
import BlogFeed from "./BlogCard";
import Card from "../Card";
import MediaQuery from "react-responsive";

const messages = defineMessages( {
	homePageLoaded: {
		id: "home.page.loaded",
		defaultMessage: "Home page loaded",
	},
} );

const LEFT_COLUMN = "left";
const RIGHT_COLUMN = "right";
const SINGLE_COLUMN_BREAKPOINTS = "( min-width: 1025px ) and ( max-width: 1200px ), ( max-width: 900px )";
const DOUBLE_COLUMN_BREAKPOINTS = "( min-width: 901px ) and ( max-width: 1024px ), ( min-width: 1201px )";

const cards = [
	{
		priority: 1,
		column: LEFT_COLUMN,
		id: "academy-upsell-card",
		className: "UpsellCard",
		component: <AcademyUpsell />,
	},
	{
		priority: 2,
		column: LEFT_COLUMN,
		id: "support-card",
		className: "SupportCard",
		component: <SupportCard />,
	},
	{
		priority: 3,
		column: LEFT_COLUMN,
		id: "plugin-upsell-card",
		className: "UpsellCard",
		component: <PluginUpsell />,
	},
	{
		priority: 1,
		column: RIGHT_COLUMN,
		id: "sites-card",
		className: "SitesCard",
		component: <SitesCard />,
	},
	{
		priority: 2,
		column: RIGHT_COLUMN,
		id: "blog-card",
		className: "BlogCard",
		component: <BlogFeed />,
	},
];

const DoubleColumn = styled.div`
	display:flex;
	
	> : first-child {
		margin-right: 1em;
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
		const message = this.props.intl.formatMessage( messages.homePageLoaded );
		speak( message );
	}

	/**
	 * Wraps the inner card content components in a ShadowDiv and a FullHeightCard.
	 *
	 * @param {array}  cardsArray An array of cards with id, className, and the inner card component.
	 * @param {string} column     A string that defines whether this card should be in the left or right column.
	 *
	 * @returns {array} Returns an array of ReactElements.
	 */
	createCards( cardsArray, column = "single" ) {
		// Sorting by priority.
		cardsArray.sort( ( a, b ) => {
			return a.priority - b.priority;
		} );

		return cardsArray.map( ( card ) => {
			if ( column !== "single" && card.column !== column ) {
				return;
			}
			return (
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
		return (
			<Fragment>
				{
					window.navigator.userAgent.indexOf( "MSIE " ) > 0 || ! ! window.navigator.userAgent.match( /Trident.*rv:11\./ )
						? (
							<div>
								{ this.createCards( cards ) }
							</div>
						)
						: ( [
							<MediaQuery key={ "single_column_layout" } query={ SINGLE_COLUMN_BREAKPOINTS }>
								<div>
									{ this.createCards( cards ) }
								</div>
							</MediaQuery>,
							<MediaQuery key={ "double_column_layout" } query={ DOUBLE_COLUMN_BREAKPOINTS }>
								<DoubleColumn>
									<div>
										{ this.createCards( cards, LEFT_COLUMN ) }
									</div>
									<div>
										{ this.createCards( cards, RIGHT_COLUMN ) }
									</div>
								</DoubleColumn>
							</MediaQuery>,
						] )
				}

			</Fragment>
		);
	}
}

export default injectIntl( HomePage );

HomePage.propTypes = {
	intl: intlShape.isRequired,
};
