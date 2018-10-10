import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { FormattedMessage, FormattedDate, defineMessages, injectIntl, intlShape } from "react-intl";
import Cookies from "js-cookie";
import Link from "./Link";
import { CloseButtonTopRight, makeButtonFullWidth, makeResponsiveIconButton, YellowCaretLink } from "./Button";
import NewTabMessage from "../components/NewTabMessage";
import renewalNotification from "../images/renewalNotification.svg";
import { ColumnFixedWidth, ColumnPrimary, ListTable, CompactRow } from "./Tables";
import caretRight from "../icons/caret-right.svg";

const messages = defineMessages( {
	header: {
		id: "renewal.notification.header",
		defaultMessage: "One or more plugins are about to expire!",
	},
	description: {
		id: "renewal.notification.description",
		defaultMessage: "When they do, you will no longer receive (security) updates or support! The first one expires on {expiryDate}.",
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
		defaultMessage: "Renew now",
	},
} );

const MessageContainer = styled.div`
	background-color: ${ colors.$color_white };
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
	padding: 8px 0;
	margin-bottom: 32px;
	position: relative;
	display: block;

	> button {
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

const InlineBlock = styled.div`
	display: inline-block;
	margin-right: 32px;
	vertical-align: middle;
`;

const RenewalImage = styled.img`
	width: 150px;
	margin: 8px 0 0 24px;
`;

const RenewButton = makeResponsiveIconButton( makeButtonFullWidth( YellowCaretLink ) );

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
	/**
	 * Initializes the renewal notification.
	 */
	constructor()  {
		super();
		this.state = {
			hideNotification: false,
		};
		this.onCrossClick = this.onCrossClick.bind( this );
	}

	componentDidMount() {
		if ( Cookies.get( "hideRenewalNotification" ) ) {
			this.setState( { hideNotification: true } );
		}
		this.props.loadData();
	}

	/**
	 * Called on cross click.
	 *
	 * @returns {void}
	 */
	onCrossClick() {
		Cookies.set( "hideRenewalNotification", "true", { expires: 2 } );
		this.setState( { hideNotification: true } );
	}

	listUpcomingRenewals( upcomingRenewals ) {
		const upcomingRenewalList = upcomingRenewals.map( ( renewal ) => {
			return (
				<CompactRow key={ renewal.id }>
					<ColumnPrimary
						headerLabel={ "Product" }
					>
						{ renewal.name }
					</ColumnPrimary>
					<ColumnPrimary
						headerLabel={ "Expiry date:" }
					>
						<FormattedDate
							value={ renewal.nextPayment }
							year="numeric"
							month="long"
							day="2-digit"
						/>
					</ColumnPrimary>
					<ColumnFixedWidth>
						<RenewButton
							to={ renewal.renewalUrl }
							linkTarget={ "_blank" }
							iconSource={ caretRight }
						>
							<FormattedMessage { ...messages.linkMessage } />
						</RenewButton>
					</ColumnFixedWidth>
				</CompactRow>
			);
		} );

		return (
			<ListTable invertZebra={ true }>
				{ upcomingRenewalList }
			</ListTable>
		);
	}

	/**
	 * Renders the message.
	 *
	 * @returns { ReactElement|null} Returns a message container including the renewalNotification or null.
	 */
	render() {
		if ( this.props.upcomingRenewals.length < 1 ) {
			return null;
		}

		// The first item in the array is the first upcoming renewal (sorted in the container).
		const earliestRenewal = this.props.upcomingRenewals[ 0 ];

		if ( this.state.hideNotification || ! earliestRenewal ) {
			return null;
		}

		const expiryDate = <FormattedDate
			value={ earliestRenewal.nextPayment }
			year="numeric"
			month="long"
			day="2-digit"
		/>;

		return (
			<MessageContainer>
				<CloseButtonTopRight
					onClick={ this.onCrossClick }
					aria-label={ this.props.intl.formatMessage( messages.close ) }
				/>
				<InlineBlock>
					<RenewalImage src={ renewalNotification } />
				</InlineBlock>
				<InlineBlock>
					<h2>
						<FormattedMessage { ...messages.header } />
					</h2>
					<p>
						<FormattedMessage
							{ ...messages.description }
							values={ { expiryDate: expiryDate } }
						/>
						<br />
						<MessageLink
							to={ earliestRenewal.renewalUrl }
							linkTarget="_blank"
						>
							<FormattedMessage { ...messages.linkMessage } />
							<NewTabMessage />
						</MessageLink>
					</p>
				</InlineBlock>
				{ this.listUpcomingRenewals( this.props.upcomingRenewals ) }
			</MessageContainer>
		);
	}
}

RenewalNotification.propTypes = {
	intl: intlShape.isRequired,
	upcomingRenewals: PropTypes.array,
};

RenewalNotification.defaultProps = {
	upcomingRenewals: [],
};

export default injectIntl( RenewalNotification );
