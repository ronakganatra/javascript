import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { FormattedMessage, FormattedDate, defineMessages, injectIntl, intlShape } from "react-intl";
import Cookies from "js-cookie";
import { CloseButtonTopRight, makeButtonFullWidth, YellowCaretLink } from "./Button";
import renewalNotification from "../images/renewalNotification.svg";
import { ColumnFixedWidth, ColumnPrimary, ListTable, CompactRow, makeFullWidth, responsiveHeaders } from "./Tables";
import caretRight from "../icons/caret-right.svg";
import defaults from "../config/defaults.json";

const messages = defineMessages( {
	header: {
		id: "renewal.notification.header",
		defaultMessage: "One or more plugins are about to expire!",
	},
	description: {
		id: "renewal.notification.description",
		defaultMessage: "When they do, you will no longer receive (security) updates or support!",
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
	productHeader: {
		id: "headers.product",
		defaultMessage: "Product",
	},
	expiryHeader: {
		id: "headers.expiry",
		defaultMessage: "Expires on",
	},
} );

const MessageContainer = styled.div`
	background-color: ${ colors.$color_white };
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
	position: relative;
	display: block;

	> button {
		position: absolute;
		right: 16px;
		top: 16px;
	}
`;

const Header = styled.h2`
	margin-right: 32px;
`;

const ImageTextContainer = styled.div`
	display: flex;
	padding: 16px;
	vertical-align: middle;

`;

const InlineBlock = styled.div`
	display: inline-block;
	vertical-align: middle;
`;

const RenewalImage = styled.img`
	flex: 0 1 auto;
	max-height: 100px;
	margin-right: 24px;

	@media screen and ( max-width: 500px ) {
		display: none;
	}
`;

// The labels for the column need sightly more room in the notification.
const ColumnPrimaryResponsive = styled( makeFullWidth( responsiveHeaders( ColumnPrimary ) ) )`
	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		&::before {
			min-width: 88px;
		}
	}
`;

const ColumnFixedWidthResponsive = makeFullWidth( responsiveHeaders( ColumnFixedWidth ) );

const RenewButton = makeButtonFullWidth( YellowCaretLink );

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
		Cookies.set( "hideRenewalNotification", "true", { expires: 7 } );
		this.setState( { hideNotification: true } );
	}

	listUpcomingRenewals( upcomingRenewals ) {
		const upcomingRenewalList = upcomingRenewals.map( ( renewal ) => {
			return (
				<CompactRow key={ renewal.id }>
					<ColumnPrimaryResponsive
						headerLabel={ this.props.intl.formatMessage( messages.productHeader ) }
						ellipsis={ true }
					>
						{ renewal.name }
					</ColumnPrimaryResponsive>
					<ColumnPrimaryResponsive
						headerLabel={ this.props.intl.formatMessage( messages.expiryHeader ) }
					>
						<FormattedDate
							value={ renewal.nextPayment }
							year="numeric"
							month="long"
							day="2-digit"
						/>
					</ColumnPrimaryResponsive>
					<ColumnFixedWidthResponsive>
						<RenewButton
							to={ renewal.renewalUrl }
							linkTarget={ "_blank" }
							iconSource={ caretRight }
						>
							<FormattedMessage { ...messages.linkMessage } />
						</RenewButton>
					</ColumnFixedWidthResponsive>
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

		return (
			<MessageContainer>
				<CloseButtonTopRight
					onClick={ this.onCrossClick }
					aria-label={ this.props.intl.formatMessage( messages.close ) }
				/>
				<ImageTextContainer>
					<RenewalImage src={ renewalNotification } />
					<InlineBlock>
						<Header>
							<FormattedMessage { ...messages.header } />
						</Header>
						<FormattedMessage
							{ ...messages.description }
						/>
					</InlineBlock>
				</ImageTextContainer>
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
