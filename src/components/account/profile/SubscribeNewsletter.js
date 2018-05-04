import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, FormattedMessage, defineMessages } from "react-intl";
import styled from "styled-components";
import _noop from "lodash/noop";

import { Paper, Page } from "../../PaperStyles";
import { Button } from "../../Button";

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

const messages = defineMessages( {
	title: {
		id: "newsletter.title",
		defaultMessage: "Newsletter",
	},
	subscribeParagraph: {
		id: "newsletter.subscribeParagraph",
		defaultMessage: "Subscribe to the awesome newsletter!!!111!!!",
	},
	subscribeButton: {
		id: "newsletter.subscribeButton",
		defaultMessage: "Subscribe",
	},
} );

class SubscribeNewsletter extends React.Component {

	getContent( subscriptionStatus ) {

	}

	render() {

		// Toggle content based on whether the customer has subscribed or not.
		let onClickAction = this.props.onSubscribe;
		let content = this.getContent( this.props.subscribed )

		if ( this.props.subscribed === "subscribed" ) {
			onClickAction = this.props.onUnsubscribe;

		}


		// Disable button when subscription is being retrieved.
		if ( this.props.loading ) {
			onClickAction = _noop;
		}

		return (
			<NewsletterContainer>
				<Paper>
					<Page>
						<NewsletterSection>
							<Paragraph>
								<FormattedMessage id={ messages.title.id } defaultMessage={ messages.title.defaultMessage }/>
							</Paragraph>

							<p><FormattedMessage
								id={ messages.subscribeParagraph.id }
								defaultMessage={ messages.subscribeParagraph.defaultMessage }
							/></p>
							<Button onClick={ onClickAction }><FormattedMessage id={ messages.subscribeButton.id } defaultMessage={ messages.subscribeButton.defaultMessage }/></Button>
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
};


export default injectIntl( SubscribeNewsletter );
