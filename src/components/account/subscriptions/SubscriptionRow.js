import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Row, ColumnMinWidth, ColumnIcon, ColumnPrimary, ColumnFixedWidth } from "../../Tables";
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
	sites: {
		id: "subscriptions.overview.sites",
		defaultMessage: "{ limit } sites",
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
	color: ${ props => props.status === "suspended" ? colors.$color_red : "inherit" };
	font-weight: ${ props => props.status === "cancelled" ? "inherit" : "bold" };
	padding-left: ${ props => props.isInExpanded ? "24px" : "none" };

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		padding-left: 0;
	}
`;

StyledStatus.propTypes = {
	status: PropTypes.string.isRequired,
	isInExpanded: PropTypes.bool,
};

const Detail = styled.div`
	font-size: 14px;
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
	border-bottom: 2px solid ${ colors.$color_grey_medium_dark };
`;

/**
 * Creates a subscription component
 *
 * @param {object} props Properties of the component.
 * @returns {ReactElement} Subscription component.
 * @constructor
 */
class SubscriptionRow extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			isOpen: false,
		};

		this.getManageButtons = this.getManageButtons.bind( this );
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
		const countTotals = ( inputArray, field ) => {
			return inputArray.reduce( ( total, current ) => {
				return total + current[ field ];
			}, 0 );
		};

		const isActive = subscriptionsArray
			.map( subscription => subscription.status )
			.includes( "active" );
		const totalLimit = countTotals( subscriptionsArray, "limit" );
		const totalUsed = countTotals( subscriptionsArray, "used" );
		return {
			name: donorSubscription.name,
			icon: donorSubscription.icon,
			hasSites: donorSubscription.hasSites,
			status: isActive ? "active" : "Not active",
			used: totalUsed,
			limit: totalLimit,
		};
	}

	/**
	 * The first column has different content depending on screen size, and whether it is in in the collapsible or not.
	 *
	 * @param   {boolean}      isInExpanded           Whether the row is in the expandable part of a collapsible.
	 * @param   {string}       nextPaymentInformation Information about the first upcoming payment.
	 * @param   {string}       name                   The name of the subscription.
	 * @param   {string}       status                 The status of the subscription.
	 * @returns {ReactElement}                        The contents of the first column (for this row).
	 */
	getPrimaryColumnContent( isInExpanded = false, nextPaymentInformation = "", name, status ) {
		return (
			<Fragment>
				{ isInExpanded &&
					<MediaQuery query={ `(max-width: ${ defaults.css.breakpoint.mobile }px)` }>
						{ nextPaymentInformation }
					</MediaQuery>
				}
				{ ! isInExpanded &&
					name
				}
				<Detail>
					<StyledStatus status={ status } isInExpanded={ isInExpanded }>
						{ capitalizeFirstLetter( status ) }
					</StyledStatus>
				</Detail>
			</Fragment>
		);
	}

	/**
	 * For the most part, the single and collapsible rows are not different. Here we set up the common parts.
	 * With some adjustments to the content based on context, that is.
	 *
	 * @param   {Object}       subscription           The subscription in this row.
	 * @param   {boolean}      isInExpanded           Whether the row is in the expanded part of the collapsible.
	 * @param   {string}       nextPaymentInformation Information about the next payment.
	 * @param   {string}       billingType            Whether renewal is automatic or manual.
	 * @returns {ReactElement}                        The common part of each row.
	 */
	commonRowTemplate( subscription, isInExpanded = false, nextPaymentInformation = ". . .", billingType = ". . ." ) {
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
						this.props.isGrouped ? messages.subscriptions : messages.individualSubscriptions
					) }
				>
					{ this.getPrimaryColumnContent( isInExpanded, nextPaymentInformation, subscription.name, subscription.status ) }
				</ColumnPrimary>
				<StyledColumnMinWidth
					ellipsis={ true }
					hideOnMobile={ true }
					headerLabel={ this.props.intl.formatMessage( messages.used ) }
					maxWidth="120px"
					minWidth="102px"
					paddingLeft="inherit"
				>
					{ subscription.hasSites
						? subscription.used + "/" + subscription.limit + " sites"
						: ""
					}
				</StyledColumnMinWidth>
				<StyledColumnMinWidth
					ellipsis={ true }
					hideOnMobile={ true }
					headerLabel={ this.props.intl.formatMessage( messages.nextPaymentOn ) }
					minWidth="198px"
				>
					{ nextPaymentInformation }
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
			const darkerLight = "#dedede";
			const darkerWhite = "#e5e5e5";

			const lighterColors = [ colors.$color_white, darkerWhite ];
			return lighterColors.includes( previousBackgroundColor ) ? darkerLight : darkerWhite;
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
				<StyledRow key={ subscription.id } dimmed={ status === "Not active" } background={ this.props.background }>
					{ this.commonRowTemplate( subscription ) }
					<ColumnFixedWidth
						paddingLeft="0px"
					>
						<CollapseButtonSpacer>
							<UpDownButton
								isOpen={ this.state.isOpen }
								onClick={ () => {
									this.setState( { isOpen: ! this.state.isOpen } );
								} }
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
	 * @return {ReactElement}              A single subscription row.
	 */
	makeSingleRow( subscription, background = this.props.background, isInExpanded = false ) {
		const onManage = () => this.props.onManage( subscription.id );
		const status = subscription.status;
		const cancelledOrExpired = [ "cancelled", "expired" ].includes( status );

		let nextPayment = null;
		let endDate = null;
		let amount = null;
		let billingType = null;

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

		const nextPaymentInformation = this.getNextBilling( status, endDate, nextPayment, amount );

		return (
			<StyledRow key={ subscription.id } dimmed={ cancelledOrExpired } background={ background }>
				{ this.commonRowTemplate( subscription, isInExpanded, nextPaymentInformation, billingType ) }
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
	intl: intlShape,
};

SubscriptionRow.defaultProps = {
};

export default injectIntl( SubscriptionRow );
