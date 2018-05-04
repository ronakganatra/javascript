import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, FormattedMessage, FormattedHTMLMessage, defineMessages } from "react-intl";
import styled from "styled-components";
import _noop from "lodash/noop";

import { Paper, Page } from "../../PaperStyles";
import { Button, LargeSecondaryButton } from "../../Button";

const NewsletterContainer = styled.div`
	margin-top: 24px;
`;

const NewsletterSection = styled.section`
	margin-bottom: 1em;
`;

const Paragraph = styled.p`
	margin-bottom: 0.5em;
	font-size: 1.1em;
`;

const CheckboxList = styled.ul`
	list-style: square inside;
	padding-left: 0px; 
`;

const messages = defineMessages( {
	title: {
		id: "newsletter.title",
		defaultMessage: "Newsletter",
	},
	subscribeReasons: [
		{
			id: "newsletter.subscribe.reasons.1",
			defaultMessage: "Get weekly tips on how to optimize your website's SEO, usability and conversion.",
		},
		{
			id: "newsletter.subscribe.reasons.2",
			defaultMessage: "Be the first to know about new features and other cool plugins.",
		},
		{
			id: "newsletter.subscribe.reasons.3",
			defaultMessage: "Get our online course <em>SEO For Beginners</em> <b>for free</b>!",
		},
	],
	subscribeButton: {
		id: "newsletter.subscribeButton",
		defaultMessage: "Subscribe",
	},
	unsubscribeParagraph: {
		id: "newsletter.unsubscribeParagraph",
		defaultMessage: "You are subscribed to the Yoast newsletter. If you want to unsubscribe, click the button below.",
	},
	unsubscribeButton: {
		id: "newsletter.unSubscribeButton",
		defaultMessage: "Unsubscribe",
	},
} );

class SubscribeNewsletter extends React.Component {

    /**
	 * Generates and returns the (un)subscribe paragraph,
	 * based on the given current subscription status of the customer.
	 *
	 * E.g. invites customer to subscribe when not yet subscribed,
	 * and explains how to unsubscribe when subscribed.
	 * @returns {p} an element containing the content
     */
	getContent() {
		let content = <CheckboxList>
			{ messages.subscribeReasons.map( reason => {
				return <li key={ reason.id }>
					<FormattedHTMLMessage
						id={ reason.id }
						defaultMessage={ reason.defaultMessage }/>
				</li>;
			} ) }
		</CheckboxList>;

		if ( this.props.subscribed === "subscribed" ) {
			content = <p>
				<FormattedMessage
                id={ messages.unsubscribeParagraph.id }
                defaultMessage={ messages.unsubscribeParagraph.defaultMessage }/>
			</p>;
		}

		return content;
	}

    /**
	 * Generates and returns the (un)subscribe button,
	 * based on the given current subscription status of the customer.
	 * @returns {Button} a button to subscribe or unsubscribe
     */
	getButton() {
		let subscribed = this.props.subscribed === "subscribed";

		// Set the function when the button is clicked.
		let onClickAction = subscribed ? this.props.onUnsubscribe : this.props.onSubscribe;
		if ( this.props.loading ) {
			onClickAction = _noop;
		}

		// Either return a subscribe or return an unsubscribe button.
		let button = <Button onClick={ onClickAction }>
			<FormattedMessage id={ messages.subscribeButton.id } defaultMessage={ messages.subscribeButton.defaultMessage }/>
		</Button>;

		if ( this.props.subscribed === "subscribed" ) {
			button = <LargeSecondaryButton onClick={ onClickAction }>
				<FormattedMessage id={ messages.unsubscribeButton.id } defaultMessage={ messages.unsubscribeButton.defaultMessage }/>
			</LargeSecondaryButton>;
		}

		return button;
	}

	render() {
		return (
			<NewsletterContainer>
				<Paper>
					<Page>
						<NewsletterSection>
							<Paragraph>
								<FormattedMessage id={ messages.title.id } defaultMessage={ messages.title.defaultMessage }/>
							</Paragraph>
							{ this.getContent() }
							{ this.getButton() }
						</NewsletterSection>
					</Page>
				</Paper>
			</NewsletterContainer>
		);
	}
}

SubscribeNewsletter.propTypes = {
	intl: intlShape.isRequired,
	onSubscribe: PropTypes.func.isRequired,
	onUnsubscribe: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	subscribed: PropTypes.string,
};


export default injectIntl( SubscribeNewsletter );
