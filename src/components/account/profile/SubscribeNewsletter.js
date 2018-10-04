import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, FormattedMessage, defineMessages } from "react-intl";
import styled from "styled-components";

// Custom components
import { Button, LargeSecondaryButton } from "../../Button";
import ErrorDisplay from "../../../errors/ErrorDisplay";


const NewsletterSection = styled.section`
	margin-bottom: 1em;
`;

const messages = defineMessages( {
	subscribeReasons: {
		id: "newsletter.subscribe.reasons",
		defaultMessage: "Subscribe to get weekly tips on optimizing your website's SEO, usability and conversion. " +
		"You'll also be the first to know about new features and other cool (free) plugins!",
	},
	subscribeButton: {
		id: "newsletter.subscribeButton",
		defaultMessage: "Subscribe",
	},
	unsubscribeParagraph: {
		id: "newsletter.unsubscribeParagraph",
		defaultMessage: "You are subscribed to the Yoast newsletter. If you want to unsubscribe, click the button below.",
	},
	pendingParagraph: {
		id: "newsletter.pendingParagraph",
		defaultMessage: "Your subscription to the Yoast newsletter is pending. Please check your inbox for a confirmation email.",
	},
	unsubscribeButton: {
		id: "newsletter.unSubscribeButton",
		defaultMessage: "Unsubscribe",
	},
	privacyPolicy: {
		id: "newsletter.privacyPolicy",
		defaultMessage: "Yoast respects your privacy. Read our {link} on how we handle your personal information.",
	},
} );

class SubscribeNewsletter extends React.Component {
	/**
	 * Constructor
	 *
	 * @param {Object} props The props.
	 */
	constructor( props ) {
		super( props );

		this.onClick = this.onClick.bind( this );
	}

	/**
	 * Handles clicks on the button.
	 * Nothing will happen when loading.
	 * A user will be unsubscribed when subscribed.
	 * Otherwise a user will be subscribed.
	 *
	 * @returns {void}
	 */
	onClick() {
		if ( this.props.loading ) {
			return;
		}

		if ( this.props.subscribed === "subscribed" ) {
			this.props.onUnsubscribe();
			return;
		}

		this.props.onSubscribe();
	}

	/**
	 * Generates and returns the (un)subscribe paragraph,
	 * based on the current subscription status of the customer.
	 *
	 * E.g. invites customer to subscribe when not yet subscribed,
	 * and explains how to unsubscribe when subscribed.
	 *
	 * @returns {Element} an element containing the content
	 */
	getContent() {
		if ( this.props.subscribed === "subscribed" ) {
			return (
				<p>
					<FormattedMessage
						id={ messages.unsubscribeParagraph.id }
						defaultMessage={ messages.unsubscribeParagraph.defaultMessage }
					/>
				</p>
			);
		}

		if ( this.props.subscribed === "pending" ) {
			return (
				<p>
					<FormattedMessage
						id={ messages.pendingParagraph.id }
						defaultMessage={ messages.pendingParagraph.defaultMessage }
					/>
				</p>
			);
		}

		return (
			<p>
				<FormattedMessage
					id={ messages.subscribeReasons.id }
					defaultMessage={ messages.subscribeReasons.defaultMessage }
				/>
			</p>
		);
	}

	/**
	 * Generates and returns the (un)subscribe button,
	 * based on the current subscription status of the customer.
	 *
	 * @returns {Button} a button to subscribe or unsubscribe
	 */
	getButton() {
		if ( this.props.subscribed === "subscribed" ) {
			return (
				<LargeSecondaryButton onClick={ this.onClick }>
					<FormattedMessage id={ messages.unsubscribeButton.id } defaultMessage={ messages.unsubscribeButton.defaultMessage } />
				</LargeSecondaryButton>
			);
		}

		if ( this.props.subscribed === "pending" ) {
			return null;
		}

		return (
			<Button onClick={ this.onClick }>
				<FormattedMessage id={ messages.subscribeButton.id } defaultMessage={ messages.subscribeButton.defaultMessage } />
			</Button>
		);
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		if ( this.props.subscribed === "unknown" ) {
			return null;
		}

		const privacyPolicyLink = <a href="https://yoast.com/privacy-policy/">privacy policy</a>;

		return (
			<NewsletterSection>
				{ this.getContent() }
				<p>
					<FormattedMessage
						id={ messages.privacyPolicy.id }
						defaultMessage={ messages.privacyPolicy.defaultMessage }
						values={ { link: privacyPolicyLink } }
					/>
				</p>
				{ this.getButton() }
				{ this.props.error &&
				<ErrorDisplay error={ { code: "MAILCHIMP_ERROR", message: this.props.error } } />
				}
			</NewsletterSection>
		);
	}
}

SubscribeNewsletter.propTypes = {
	intl: intlShape.isRequired,
	onSubscribe: PropTypes.func.isRequired,
	onUnsubscribe: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	subscribed: PropTypes.string,
	error: PropTypes.string,
};


export default injectIntl( SubscribeNewsletter );
