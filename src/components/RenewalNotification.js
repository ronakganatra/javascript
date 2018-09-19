import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { FormattedMessage, defineMessages, injectIntl, intlShape } from "react-intl";
import Link from "./Link";
import { CloseButtonTopRight } from "./Button";
import NewTabMessage from "../components/NewTabMessage";
import notificationAvatar from "../images/notificationAvatar.svg";

const messages = defineMessages( {
	header: {
		id: "renewal.notification.header",
		defaultMessage: "One or more plugins are about to expire!",
	},
	description: {
		id: "renewal.notification.description",
		defaultMessage: "When they do, you will no longer receive (security) updates or support! The first one expires on {expireDate}",
	},
	close: {
		id: "renewal.notification.close",
		defaultMessage: "close",
	},
	linkPlaceholder: {
		id: "renewal.notification.link.placeholder",
		defaultMessage: "{renewalLink}",
	},
	linkMessage: {
		id: "renewal.notification.link.message",
		defaultMessage: "Renew your subscription(s) on this page.",
	},
} );

const MessageContainer = styled.div`
	background-color: ${ colors.$color_white };
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
	padding: 8px 32px;
	margin-bottom: 32px;
	position: relative;

	button {
		position: absolute;
		right: 16px;
		top: 16px;
	}
`;

const MessageLink = styled( Link )`
	color: ${ colors.$color_black };
	text-decoration: underline;
	&:hover, &:focus {
		color: ${ colors.$color_blue };
	}
`;

const Block = styled.div`
	display: inline-block;
	margin-right: 8px;
`;

const RenewalImage = styled.img`
	width: 150px;
`;

/**
 * Renewal notification message
 *
 * To help the customer understand what happened to licenses.
 *
 * @param {object} props Properties of the component.
 * @returns {ReactElement} Subscription component.
 * @constructor
 */
class RenewalNotification extends React.Component {
	constructor()  {
		super();
		this.state = {
			hide: false,
		};
		this.onCrossClick = this.onCrossClick.bind( this );
	}

	/**
	 * Called on cross click and sets a cookie.
	 *
	 * @param {event} event The event clicking the close cross.
	 *
	 * @returns {void}
	 */
	onCrossClick( event ) {
		event.preventDefault();
		this.setState( { hide: true } );
	}

	/**
	 * Sorting by date
	 *
	 * @param {a} a The date.
	 * @param {b} b The other date.
	 *
	 * @returns {array} The sorted dates array.
	 */
	sortDate( a, b ) {
		return b - a;
	}

	/**
	 * Renders the message.
	 *
	 * @returns {*} Returns an empty div if the cookie is set or returns the message.
	 */
	render() {
		if ( this.state.hide ) {
			return null;
		}
		let currentDate = new Date();
		console.log( "currentDate: ", currentDate );
		let subscriptionsNew = null;
		let subscriptions = this.props.subscriptions.filter(
			( subscription ) => {
				subscriptionsNew = subscription.endDate > currentDate && subscription.endDate;
				console.log( subscriptionsNew );
			}
		);

		console.log( "subscriptions: ", subscriptions );
		/*
		 * 		subscriptions.endDate.sort( ( a, b ) => {
		 return b - a;
		 } );
		 console.log( "after:", subscriptions.reverse() );
		  * */

		return (
			<MessageContainer>
					<CloseButtonTopRight
						onClick={ this.onCrossClick }
						aria-label={ this.props.intl.formatMessage( messages.close ) }
					/>
				<Block>
					<RenewalImage src={ notificationAvatar }/>
				</Block>
				<Block>
					<h2><FormattedMessage { ...messages.header }/></h2>
					<p>
						<FormattedMessage { ...messages.description } values={ { expireDate: "endDate" } }/>
						<br/>
						<MessageLink
							to="/account/subscriptions"
							linkTarget="_blank"
						>
							<FormattedMessage { ...messages.linkMessage } />
							<NewTabMessage />
						</MessageLink>
					</p>
				</Block>
			</MessageContainer>
		);
	}
}

RenewalNotification.propTypes = {
	intl: intlShape.isRequired,
	subscriptions: PropTypes.array,
};

export default injectIntl( RenewalNotification );
