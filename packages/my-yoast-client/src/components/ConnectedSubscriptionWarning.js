import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { defineMessages, FormattedMessage, injectIntl } from "react-intl";
import { MessageIcon, WarningMessage } from "./MessageBoxes";
import exclamationTriangle from "../icons/exclamation-triangle.svg";
import Link from "./Link";

const messages = defineMessages( {
	explanation: {
		id: "connectedSubscriptionWarning.explanation",
		defaultMessage: "This product is part of a subscription bundle. Cancelling this product will also cancel:",
	},
	contactSupport: {
		id: "connectedSubscriptionWarning.contactSupport",
		defaultMessage: "If you want to cancel just this product, {link}.",
	},
	contactSupportLink: {
		id: "connectedSubscriptionWarning.contactSupportLink",
		defaultMessage: "please contact support",
	},
} );

const MessageContainer = styled.div`
	display:block;
`;


class ConnectedSubscriptionWarning extends React.Component {
	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const subscriptionProductsListItems = this.props.subscriptions.map( subscription =>
			<li key={ subscription.id }>{ subscription.limit } &times; { subscription.name }</li>
		);
		const supportLink = <Link to={ "mailto:support@yoast.com" }>
			<FormattedMessage { ...messages.contactSupportLink } />
		</Link>;

		return (
			<WarningMessage>
				<MessageIcon iconSource={ exclamationTriangle } />
				<MessageContainer>
					<FormattedMessage { ...messages.explanation } />
					{ // eslint-disable-next-line jsx-a11y/no-redundant-roles
					}<ul role="list">
						{ subscriptionProductsListItems }
					</ul>
					<FormattedMessage { ...messages.contactSupport } values={ { link: supportLink } } />
				</MessageContainer>
			</WarningMessage>
		);
	}
}

ConnectedSubscriptionWarning.propTypes = {
	subscriptions: PropTypes.array,
};

ConnectedSubscriptionWarning.defaultProps = {
	subscriptions: [],
};

export default injectIntl( ConnectedSubscriptionWarning );