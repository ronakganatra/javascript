import React from "react";
import styled from "styled-components";
import a11ySpeak from "a11y-speak";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import { Link } from "react-router-dom";

import SiteHeader from "./SiteHeader";
import { RoundBackButton } from "./RoundButton";
import SiteSubscriptionDetailList from "./SiteSubscriptionDetailList";

const messages = defineMessages( {
	sitePageLoaded: {
		id: "menu.site.loaded",
		defaultMessage: "Site page loaded",
	},
} );

const SitePageContainer = styled.div`
	display: inline;
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
			<SitePageContainer>
				<Link to={ "/sites" } >
					<RoundBackButton />
				</Link>
				<SiteHeader name={ props.site.url } url={ props.site.url } imageUrl={ props.siteImage }/>
				<SiteSubscriptionDetailList siteSubscriptions={ props.subscriptions }
											onToggleSubscription={ props.onToggleSubscription }
											onMoreInfoClick={ props.onMoreInfoClick }
											onSettingsClick={ props.onSettingsClick }
											slots={ {
												amountAvailable: props.slots.amountAvailable,
												amountUsed: props.slots.amountUsed,
												onAddMoreSlotsClick: props.slots.onAddMoreSlotsClick,
												addMoreSlots: props.slots.addMoreSlots,
											} }
				/>
			</SitePageContainer>
		);
	}
}

export default injectIntl( SitePage );

SitePage.propTypes = {
	onToggleSubscription: React.PropTypes.func.isRequired,
	site: React.PropTypes.object.isRequired,
	subscriptions: React.PropTypes.arrayOf( React.PropTypes.object ),
	siteImage: React.PropTypes.string.isRequired,
	onMoreInfoClick: React.PropTypes.func.isRequired,
	onSettingsClick: React.PropTypes.func.isRequired,
	slots: React.PropTypes.shape( {
		amountAvailable: React.PropTypes.number.isRequired,
		amountUsed: React.PropTypes.number,
		onAddMoreSlotsClick: React.PropTypes.func,
		addMoreSlots: React.PropTypes.string,
	} ).isRequired,
	intl: intlShape.isRequired,
};

SitePage.defaultProps = {
	subscriptions: [],
};
