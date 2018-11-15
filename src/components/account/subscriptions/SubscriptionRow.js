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
`;

StyledStatus.propTypes = {
	status: PropTypes.string.isRequired,
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
function getNextBilling( status, endDate, nextPayment, amount ) {
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

getNextBilling.propTypes = {
	status: PropTypes.string.isRequired,
	endDate: PropTypes.string,
};

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
			status: isActive ? "active" : "Not active",
			used: totalUsed,
			limit: totalLimit,
		};
	}

	makeCollapsibleRow() {
		const subscription = this.retrieveOverallSubscriptionData( this.props.subscriptionsArray );
		const status = subscription.status;
		let previousBackgroundColor = this.props.background;
		const determineNextBackgroundColor = ( previousBackgroundColor ) => {
			return previousBackgroundColor === colors.$color_white
				? colors.$color_background_light
				: colors.$color_white;
		};

		return (
			<Fragment>
				<StyledRow key={ subscription.id } dimmed={ status === "Not active" } background={ this.props.background }>
					<Icon><SiteIcon src={ subscription.icon } alt="" /></Icon>
					<ColumnPrimary
						ellipsis={ true }
						headerLabel={ this.props.intl.formatMessage(
							this.props.isGrouped ? messages.subscriptions : messages.individualSubscriptions
						) }
					>
						{ subscription.name }
						<Detail>
							<StyledStatus status={ status }>
								{ capitalizeFirstLetter( status ) }
							</StyledStatus>
						</Detail>
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
						{ ". . ." }
					</StyledColumnMinWidth>
					<StyledColumnMinWidth
						ellipsis={ true }
						hideOnMobile={ true }
						headerLabel={ this.props.intl.formatMessage( messages.billingType ) }
						maxWidth="140px"
						minWidth="120px"
					>
						{ ". . ." }
					</StyledColumnMinWidth>
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
					this.state.isOpen &&
						this.props.subscriptionsArray.map( ( subscription ) => {
							const nextBackgroundColor = determineNextBackgroundColor( previousBackgroundColor );
							previousBackgroundColor = nextBackgroundColor;
							return this.makeSingleRow( subscription, nextBackgroundColor );
						} )
				}
			</Fragment>
		);
	}

	makeSingleRow( subscription, background = this.props.background ) {
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

		return (
			<StyledRow key={ subscription.id } dimmed={ cancelledOrExpired } background={ background }>
				<Icon><SiteIcon src={ subscription.icon } alt="" /></Icon>
				<ColumnPrimary
					ellipsis={ true }
					headerLabel={ this.props.intl.formatMessage(
						this.props.isGrouped ? messages.subscriptions : messages.individualSubscriptions
					) }
				>
					{ subscription.name }
					<Detail>
						<StyledStatus status={ status }>
							{ capitalizeFirstLetter( status ) }
						</StyledStatus>
						{ " - " }{ subscription.subscriptionNumber }
					</Detail>
				</ColumnPrimary>
				<StyledColumnMinWidth
					ellipsis={ true }
					hideOnMobile={ true }
					headerLabel={ this.props.intl.formatMessage( messages.used ) }
					maxWidth="120px"
					minWidth="102px"
					paddingLeft="inherit"
				>
					{ subscription.used }/{ subscription.limit + " sites" }
				</StyledColumnMinWidth>
				<StyledColumnMinWidth
					ellipsis={ true }
					hideOnMobile={ true }
					headerLabel={ this.props.intl.formatMessage( messages.nextPaymentOn ) }
					minWidth="198px"
				>
					{ getNextBilling( status, endDate, nextPayment, amount ) }
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
				<ColumnFixedWidth
					paddingLeft="0px"
				>
					{ this.getManageButtons( status, onManage ) }
				</ColumnFixedWidth>
			</StyledRow>
		);
	}

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
