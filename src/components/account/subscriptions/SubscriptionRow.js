import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { ColumnMinWidth, ColumnIcon, ColumnPrimary, ColumnFixedWidth, Row } from "../../Tables";
import MediaQuery from "react-responsive";
import { LargeButton, ChevronButton } from "../../Button.js";
import { injectIntl, intlShape, defineMessages, FormattedMessage, FormattedDate, FormattedNumber } from "react-intl";
import formatAmount from "../../../../../shared/currency";
import defaults from "../../../config/defaults.json";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { capitalizeFirstLetter } from "../../../functions/stringHelpers";
import SiteIcon from "../../SiteIcon";
import { UpDownButton } from "../../Button";
import { SubscriptionDetailsText } from "./SubscriptionDetailsText";

const messages = defineMessages( {
	individualSubscriptions: {
		id: "subscriptions.overview.individualSubscriptions",
		defaultMessage: "Individual subscriptions",
	},
	subscriptions: {
		id: "subscriptions.overview.subscriptions",
		defaultMessage: "Subscriptions",
	},
	status: {
		id: "subscriptions.overview.status",
		defaultMessage: "Status",
	},
	level: {
		id: "subscriptions.overview.level",
		defaultMessage: "Level",
	},
	used: {
		id: "subscriptions.overview.used",
		defaultMessage: "Used on",
	},
	billingType: {
		id: "subscriptions.overview.billingType",
		defaultMessage: "Billing type",
	},
	nextPaymentOn: {
		id: "subscriptions.overview.nextPaymentOn",
		defaultMessage: "Next billing",
	},
	endsDate: {
		id: "ends.date",
		defaultMessage: "Ends on { endDate }",
	},
	billingAmount: {
		id: "subscriptions.overview.billingAmount",
		defaultMessage: "Amount",
	},
	manage: {
		id: "subscriptions.overview.manage",
		defaultMessage: "Manage",
	},
	needsAttention: {
		id: "subscriptions.overview.needsAttention",
		defaultMessage: "Needs attention",
	},
	details: {
		id: "subscriptions.overview.details",
		defaultMessage: "Details",
	},
	renewMessage: {
		id: "subscriptions.overview.renewMessage",
		defaultMessage: "Renew now for 25% off!",
	},
	seeDetails: {
		id: "subscriptions.overview.seeDetails",
		defaultMessage: "See details",
	},
	paymentFailed: {
		id: "subscriptions.overview.paymentFailed",
		defaultMessage: "Payment failed",
	},
	amountOfAttentionNeeded: {
		id: "subscriptions.overview.amountOfAttentionNeeded",
		defaultMessage: "{amount} {amount, plural, one {action} other {actions}} needed",
	},
	active: {
		id: "subscriptions.overview.active",
		defaultMessage: "Active",
	},
	inactive: {
		id: "subscriptions.overview.inactive",
		defaultMessage: "Not active",
	},
	suspended: {
		id: "subscriptions.overview.suspended",
		defaultMessage: "Suspended",
	},
	expiresSoon: {
		id: "subscriptions.overview.expiresSoon",
		defaultMessage: "Expires soon",
	},
} );

const StyledRow = styled( Row )`
	color: ${ props => props.dimmed ? colors.$color_grey_text : "inherit" };
`;

StyledRow.propTypes = {
	dimmed: PropTypes.bool,
};

StyledRow.defaultProps = {
	dimmed: false,
};

const StyledSpace = styled.div`
	min-width: ${ props => props.tablet ? 48 : 150 }px;
`;

StyledSpace.propTypes = {
	tablet: PropTypes.bool,
};

const StyledColumnMinWidth = styled( ColumnMinWidth )`

	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		max-width: ${ props => props.maxWidth && props.maxWidth };
		min-width: ${ props => props.minWidth === "198px" && "158px" };
		padding-left: ${ props => props.paddingLeft ? props.paddingLeft : "0px" };
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		max-width: none;
	}
`;

StyledColumnMinWidth.propTypes = {
	maxWidth: PropTypes.string,
	minWidth: PropTypes.string,
	paddingLeft: PropTypes.string,
};

const StyledStatus = styled.span`
	color: ${ props => props.needsAttention ? colors.$color_red : "inherit" };
	font-weight: ${ props => props.needsAttention ? "bold" : "inherit" };
`;

StyledStatus.propTypes = {
	needsAttention: PropTypes.bool.isRequired,
};

const Detail = styled.div`
	font-size: 14px;
	padding-left: ${ props => props.isInExpanded ? "32px" : "none" };

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		padding-left: 0;
	}
`;

const Icon = styled( ColumnIcon )`
	height: 32px;
	width: 32px;
`;

const CollapseButtonSpacer = styled.div`
	@media screen and ( min-width: ${ defaults.css.breakpoint.tablet + 1 }px ) {
		width: 152px;
		display: flex;
		justify-content: flex-end;
	}
`;

const Separator = styled.div`
	border-bottom: 1px solid black;
`;

/**
 * Creates a subscription component
 *
 * @param {object} props Properties of the component.
 * @returns {ReactElement} Subscription component.
 * @constructor
 */
class SubscriptionRow extends React.Component {
	/* eslint-disable require-jsdoc */
	constructor( props ) {
		super( props );

		this.state = {
			isOpen: false,
		};

		this.getManageButtons = this.getManageButtons.bind( this );
	}

	/**
	 * Whether the subscription is active or not.
	 *
	 * @param   {string}  status         The status of the subscription.
	 * @param   {boolean} includePending Whether pending-cancel is to be considered active.
	 * @returns {boolean}                Whether the subscription is active.
	 */
	isActive( status, includePending = true ) {
		const activeStatus = [ "active" ];
		if ( includePending ) {
			activeStatus.push( "pending-cancel" );
		}
		return activeStatus.includes( status );
	}

	/**
	 * Set up manage button area depending on subscription status and screen width.
	 *
	 * @param {string}         status   The current status of the subscription.
	 * @param {function}       onManage The function that should be called on clicking the manage button.
	 * @returns {ReactElement} The appropriate manage buttons or empty area.
	 */
	getManageButtons( status, onManage ) {
		const tabletView = defaults.css.breakpoint.tablet;

		if ( status === "cancelled" ) {
			return <Fragment>
				<MediaQuery query={ `(min-width: ${ tabletView + 1 }px)` }>
					<StyledSpace tablet={ false } />
				</MediaQuery>
				<MediaQuery query={ `(max-width: ${ tabletView }px)` }>
					<StyledSpace tablet={ true } />
				</MediaQuery>
			</Fragment>;
		}

		return <Fragment>
			<MediaQuery query={ `(min-width: ${ tabletView + 1 }px)` }>
				<LargeButton onClick={ onManage }>{ this.props.intl.formatMessage( messages.manage ) }</LargeButton>
			</MediaQuery>
			<MediaQuery query={ `(max-width: ${ tabletView }px)` }>
				<ChevronButton onClick={ onManage } aria-label={ this.props.intl.formatMessage( messages.manage ) } />
			</MediaQuery>
		</Fragment>;
	}

	/**
	 * Organizes the billing and endDate information under Next Payment.
	 *
	 * @param {string} status The status of the subscription.
	 * @param {ReactElement} endDate The end date of the subscription.
	 * @param {string} nextPayment The next billing.
	 * @param {string} amount The amount of the next billing.
	 *
	 * @returns {ReactElement} A Fragment with the next billing information or the endDate of the subscription.
	 */
	getNextBilling( status, endDate, nextPayment, amount ) {
		if ( status === "pending-cancel" ) {
			return <Fragment>
				<FormattedMessage { ...messages.endsDate } values={ { endDate: endDate } } />
			</Fragment>;
		}
		return <Fragment>
			{ nextPayment }
			<Detail>{ amount }</Detail>
		</Fragment>;
	}

	/**
	 * Retrieve/compute data that applies to the top (summary) row for this group of subscriptions.
	 *
	 * @param {Array}    subscriptionsArray An array of subscriptions that were grouped.
	 * @returns {Object}                    The data for the top row of the subscriptions.
	 */
	retrieveOverallSubscriptionData( subscriptionsArray ) {
		const donorSubscription = subscriptionsArray[ 0 ];

		const activeSubscriptions = subscriptionsArray.filter( subscription => [ "active", "pending-cancel" ].includes( subscription.status ) );
		const needsAttentionArray = this.props.needsAttention ? subscriptionsArray : [];
		const needsAttention = needsAttentionArray.length > 0;

		/**
		 * Function to count the total number of a given field.
		 * @param {Array} inputArray An array containing all the sub-subscriptions.
		 * @param {string} field Which selector should be used.
		 * @returns {Int} The total number of a given field.
		 */
		const countTotals = ( inputArray, field ) => {
			return inputArray.reduce( ( total, current ) => {
				return total + current[ field ];
			}, 0 );
		};

		const isActive = activeSubscriptions.length > 0;
		const totalLimit = countTotals( activeSubscriptions, "limit" );
		const totalUsed = countTotals( activeSubscriptions, "used" );

		/**
		 * Maps a number of props to a status.
		 * @param {boolean} isActive Whether the subscription is active.
		 * @param {boolean} needsAttention Whether the subscription needs attention.
		 * @param {number} nrOfActions The number of subscriptions that need attention.
		 * @returns {FormattedMessage} The status to show.
		 */
		const donorSubscriptionstatus = ( isActive, needsAttention, nrOfActions ) => {
			if ( needsAttention ) {
				return <FormattedMessage { ...messages.amountOfAttentionNeeded } values={ { amount: nrOfActions } } />;
			}
			if ( isActive ) {
				return <FormattedMessage { ...messages.active } />;
			}
			return <FormattedMessage { ...messages.inactive } />;
		};

		return {
			name: donorSubscription.name,
			icon: donorSubscription.icon,
			hasSites: donorSubscription.hasSites,
			status: donorSubscriptionstatus( isActive, needsAttention, needsAttentionArray.length ),
			used: totalUsed,
			limit: totalLimit,
			needsAttention: needsAttention,
		};
	}

	/**
	 * Gets a status based on the subscription.status and props.
	 * @param {Object} subscription The subscription for which to get the status.
	 * @returns {(FormattedMessage|String)} The status for the subscription.
	 */
	getStatus( subscription ) {
		if ( ! this.props.needsAttention ) {
			return capitalizeFirstLetter( subscription.status );
		}
		if ( subscription.status === "on-hold" ) {
			return <FormattedMessage { ...messages.suspended } />;
		}
		return <FormattedMessage { ...messages.expiresSoon } />;
	}

	/**
	 * The first column has different content depending on screen size, and whether it is in in the collapsible or not.
	 *
	 * @param   {Object}         subscription           The subscription in this row.
	 * @param   {boolean}        isInExpanded           Whether the row is in the expandable part of a collapsible.
	 * @param   {string}         nextPaymentInformation Information about the first upcoming payment.
	 * @returns {ReactElement}                          The contents of the first column (for this row).
	 */
	getPrimaryColumnContent( subscription, isInExpanded = false, nextPaymentInformation = "" ) {
		const status = this.getStatus( subscription );
		return (
			<Fragment>
				{ isInExpanded && this.isActive( subscription.status, false ) &&
				<MediaQuery query={ `(max-width: ${ defaults.css.breakpoint.mobile }px)` }>
					<strong>
						<FormattedMessage
							id={ "mobile-expandable-next-billing" }
							defaultMessage={ "Next billing: " }
						/>
					</strong>
					{ nextPaymentInformation }
					{ subscription.billingType }
				</MediaQuery>
				}
				{ ! isInExpanded &&
				subscription.name
				}
				<Detail isInExpanded={ isInExpanded }>
					<StyledStatus status={ subscription.status } needsAttention={ this.props.needsAttention }>
						{ status }
					</StyledStatus>
					{ subscription.subscriptionNumber && " - " }{ subscription.subscriptionNumber }
				</Detail>
			</Fragment>
		);
	}

	/**
	 * Gets the details about what action is needed for the subscription.
	 * @param   {SubscriptionRow} subscription    The subscription for which this function gets the details.
	 * @returns {ReactElement} The details section.
	 */
	getDetails( subscription ) {
		// Declare variables used in both cases
		const options = { year: "numeric", month: "short", day: "numeric" };
		let linkText, linkTo, redMessage, onClickHandler;

		if ( subscription.status === "on-hold" ) {
			linkText = this.props.intl.formatMessage( messages.seeDetails );
			onClickHandler = () => this.props.showDetailsModal( subscription.renewalUrl );
			redMessage = this.props.intl.formatMessage( messages.paymentFailed );
		} else {
			const date = subscription.hasEndDate
				? subscription.endDate.toLocaleDateString( "en-US", options )
				: subscription.nextPayment.toLocaleDateString( "en-US", options );
			linkText = this.props.intl.formatMessage( messages.renewMessage );
			linkTo = subscription.renewalUrl;
			onClickHandler = null;
			redMessage = <FormattedMessage
				id="details.redMessageText"
				defaultMessage="Expires { date }"
				values={ { date: date } }
			/>;
		}
		return (
			<SubscriptionDetailsText
				linkText={ linkText }
				redMessage={ redMessage }
				linkTo={ linkTo }
				onClickHandler={ onClickHandler }
			/> );
	}

	/**
	 * For the most part, the single and collapsible rows are not different. Here we set up the common parts.
	 * With some adjustments to the content based on context, that is.
	 *
	 * @param   {Object}       subscription           The subscription in this row.
	 * @param   {boolean}      isInExpanded           Whether the row is in the expanded part of the collapsible.
	 * @param   {ReactElement} nextPaymentInformation Information about the next payment.
	 * @param   {string}       billingType            Whether renewal is automatic or manual.
	 * @param   {ReactElement} details                The details concerning the subscription when action is needed.
	 * @returns {ReactElement}                        The common part of each row.
	 */
	commonRowTemplate( subscription, isInExpanded = false, nextPaymentInformation = null, billingType = "", details = null ) {
		/**
		 * Function to retrieve the right primary column header label based on two parameters
		 * @param {boolean} isGrouped Whether the subscription is grouped
		 * @param {boolean} needsAttention Whether the subscription needs attention
		 * @returns {string} The message that is used as the headerLabel for the primary Column
		 */
		const primaryColumnHeaderLabel = ( isGrouped, needsAttention ) => {
			if ( needsAttention ) {
				return messages.needsAttention;
			} else if ( isGrouped ) {
				return messages.subscriptions;
			}
			return messages.individualSubscriptions;
		};

		return (
			<Fragment>
				<Icon>
					{
						! isInExpanded &&
						<SiteIcon src={ subscription.icon } alt="" />
					}
				</Icon>
				<ColumnPrimary
					ellipsis={ true }
					headerLabel={ this.props.intl.formatMessage(
						primaryColumnHeaderLabel( this.props.isGrouped, this.props.needsAttention )
					) }
				>
					{ this.getPrimaryColumnContent( subscription, isInExpanded, nextPaymentInformation ) }
				</ColumnPrimary>
				<StyledColumnMinWidth
					ellipsis={ true }
					hideOnMobile={ true }
					headerLabel={ this.props.intl.formatMessage( messages.used ) }
					maxWidth="120px"
					minWidth="102px"
					paddingLeft="inherit"
				>
					{ subscription.hasSites && this.isActive( subscription.status )
						? subscription.used + "/" + subscription.limit + " sites"
						: ""
					}
				</StyledColumnMinWidth>
				<StyledColumnMinWidth
					ellipsis={ true }
					hideOnMobile={ true }
					headerLabel={ this.props.intl.formatMessage( messages.billingType ) }
					maxWidth="140px"
					minWidth="120px"
				>
					{ billingType }
				</StyledColumnMinWidth>
				<StyledColumnMinWidth
					ellipsis={ true }
					hideOnMobile={ true }
					headerLabel={ this.props.intl.formatMessage( this.props.needsAttention ? messages.details : messages.nextPaymentOn ) }
					minWidth="198px"
				>
					{ this.props.needsAttention ? details : nextPaymentInformation }
				</StyledColumnMinWidth>
			</Fragment>
		);
	}

	/**
	 * Creates the collapsible row element.
	 *
	 * @returns {ReactElement} The collapsible row element.
	 */
	makeCollapsibleRow() {
		const subscription = this.retrieveOverallSubscriptionData( this.props.subscriptionsArray );
		const status = subscription.status;

		let previousBackgroundColor = this.props.background;

		// In the expandable part of the row, background colors should be slightly darker versions of the original zebra colors.
		const determineNextBackgroundColor = ( previousBackgroundColor ) => {
			const darkerGrey = "#E5E5E5";
			const darkerWhite = "#F0F0F0";

			return previousBackgroundColor === darkerGrey ? darkerWhite : darkerGrey;
		};

		/* eslint-disable require-jsdoc */
		const toggleOpen = () => {
			this.setState( { isOpen: ! this.state.isOpen } );
		};

		// Expanded table is simply using the makeSingleRow function, while changing the backgroundColor and passing isInExpanded as true.
		const expandedRows =
			<Fragment>
				{
					this.props.subscriptionsArray.map( ( subscription ) => {
						const nextBackgroundColor = determineNextBackgroundColor( previousBackgroundColor );
						previousBackgroundColor = nextBackgroundColor;
						return this.makeSingleRow( subscription, nextBackgroundColor, true );
					} )
				}
				<Separator />
			</Fragment>;

		return (
			<Fragment>
				<StyledRow
					key={ subscription.id }
					onClick={ toggleOpen }
					dimmed={ status === "Not active" }
					background={ this.props.background }
				>
					{ this.commonRowTemplate( subscription ) }
					<ColumnFixedWidth
						paddingLeft="0px"
					>
						<CollapseButtonSpacer>
							<UpDownButton
								isOpen={ this.state.isOpen }
								onClick={ toggleOpen }
							/>
						</CollapseButtonSpacer>
					</ColumnFixedWidth>
				</StyledRow>
				{
					this.state.isOpen && expandedRows
				}
			</Fragment>
		);
	}

	/**
	 * Creates a single, non-expandable row with subscription information and a manage button.
	 *
	 * @param {Object}        subscription The subscription for this row.
	 * @param {string}        background   The background color for this row.
	 * @param {boolean}       isInExpanded Whether this row is in the expandable part of a collapsible row.
	 *
	 * @returns {ReactElement}              A single subscription row.
	 */
	makeSingleRow( subscription, background = this.props.background, isInExpanded = false ) {
		const onManage = () => this.props.onManage( subscription.id );
		const status = subscription.status;
		const cancelledOrExpired = [ "cancelled", "expired" ].includes( status );

		let nextPayment = null;
		let endDate = null;
		let amount = null;
		let billingType = null;
		let details = null;

		if ( status === "pending-cancel" ) {
			endDate = <FormattedDate
				value={ subscription.hasEndDate && subscription.endDate }
				year="numeric"
				month="long"
				day="numeric"
			/>;
		}

		if ( subscription.status === "active" && ( subscription.hasNextPayment || subscription.hasEndDate ) ) {
			nextPayment = <FormattedDate
				value={ subscription.hasNextPayment ? subscription.nextPayment : subscription.endDate }
				year="numeric"
				month="long"
				day="numeric"
			/>;
			amount = <FormattedNumber
				value={ formatAmount( subscription.billingAmount ) }
				currency={ subscription.billingCurrency }
				style="currency"
			/>;
			billingType = subscription.requiresManualRenewal ? "Manual renewal" : "Automatic renewal";
		}

		if ( this.props.needsAttention ) {
			details = this.getDetails( subscription );
		}

		const nextPaymentInformation = this.getNextBilling( status, endDate, nextPayment, amount );

		return (
			<StyledRow key={ subscription.id } dimmed={ cancelledOrExpired } background={ background }>
				{ this.commonRowTemplate( subscription, isInExpanded, nextPaymentInformation, billingType, details ) }
				<ColumnFixedWidth
					paddingLeft="0px"
				>
					{ this.getManageButtons( status, onManage ) }
				</ColumnFixedWidth>
			</StyledRow>
		);
	}

	/**
	 * Renders either a collapsible row or a single row, depending on the subscriptionsArray length.
	 *
	 * @returns {ReactElement} The appropriate row.
	 */
	render() {
		return this.props.subscriptionsArray.length > 1
			? this.makeCollapsibleRow()
			: this.makeSingleRow( this.props.subscriptionsArray[ 0 ] );
	}
}

SubscriptionRow.propTypes = {
	onManage: PropTypes.func.isRequired,
	subscriptionsArray: PropTypes.array.isRequired,
	isGrouped: PropTypes.bool.isRequired,
	background: PropTypes.string,
	intl: intlShape.isRequired,
	needsAttention: PropTypes.bool.isRequired,
	showDetailsModal: PropTypes.func,
};

SubscriptionRow.defaultProps = {
	background: "#FFF",
	showDetailsModal: null,
	isGrouped: false,
	needsAttention: false,
};

export default injectIntl( SubscriptionRow );
