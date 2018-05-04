import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, FormattedMessage, FormattedHTMLMessage, defineMessages } from "react-intl";
import styled from "styled-components";

// Custom components
import { Paper, Page } from "../../PaperStyles";
import { Button, LargeSecondaryButton } from "../../Button";

// Icons
import checkmark from "../../../icons/checkGreen.svg";

const NewsletterContainer = styled.div`
	margin-top: 24px;
`;

const NewsletterSection = styled.section`
	margin-bottom: 1em;
`;

const Paragraph = styled.p`
	margin-top: 0.0em;
	margin-bottom: 0.5em;
	font-size: 1.5em;
	font-weight: 300;
`;

const CheckboxList = styled.ul`
	list-style: none;
	padding-left: 0%;
`;

const CheckboxListItem = styled.li`
	padding-left: 2.0rem;
		
	background-image: url(${ checkmark });
	background-position: 0 0.25rem;
	background-size: 1.0rem 1.0rem;
	background-repeat: no-repeat;
`;

const subscribeReasons = [ "subscribeReason1", "subscribeReason2", "subscribeReason3" ];

const messages = defineMessages( {
	title: {
		id: "newsletter.title",
		defaultMessage: "Newsletter",
	},
	subscribeReason1: {
		id: "newsletter.subscribe.reasons.1",
		defaultMessage: "Get weekly tips on how to optimize your website's SEO, usability and conversion.",
	},
	subscribeReason2: {
		id: "newsletter.subscribe.reasons.2",
		defaultMessage: "Be the first to know about new features and other cool plugins.",
	},
	subscribeReason3: {
		id: "newsletter.subscribe.reasons.3",
		defaultMessage: "Get our online course <em>SEO For Beginners</em> <b>for free</b>!",
	},
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
					defaultMessage={ messages.unsubscribeParagraph.defaultMessage }/>
				</p>
			);
		}

		return <CheckboxList>
			{ subscribeReasons.map( key => {
				return (
					<CheckboxListItem key={ key }>
						<FormattedHTMLMessage
							id={ messages[ key ].id }
							defaultMessage={ messages[ key ].defaultMessage }/>
					</CheckboxListItem>
				);
			} ) }
		</CheckboxList>;
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
					<FormattedMessage id={ messages.unsubscribeButton.id } defaultMessage={ messages.unsubscribeButton.defaultMessage }/>
				</LargeSecondaryButton>
			);
		}

		return (
			<Button onClick={ this.onClick }>
				<FormattedMessage id={ messages.subscribeButton.id } defaultMessage={ messages.subscribeButton.defaultMessage }/>
			</Button>
		);
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
