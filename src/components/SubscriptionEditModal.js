import PropTypes from "prop-types";
import React from "react";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import styled from "styled-components";
import MyYoastModal from "./MyYoastModal";
import ButtonsContainer from "./general/ButtonsContainer";
import {
	LargeButton, IconButton, LargeSecondaryButton,
	makeResponsiveIconButton, makeButtonFullWidth,
} from "./Button";
import ErrorDisplay from "../errors/ErrorDisplay";
import plus from "../icons/black-plus-thin.svg";
import minus from "../icons/black-minus-thin.svg";
import colors from "yoast-components/style-guide/colors.json";
import { InputField } from "./InputField";
import toNumber from "lodash/toNumber";

const messages = defineMessages( {
	ariaLabel: {
		id: "subscriptionCancel.modal.arialabel",
		defaultMessage: "Cancel subscription",
	},
	header: {
		id: "subscriptionCancel.modal.header",
		defaultMessage: "Cancel subscription?",
	},
	body: {
		id: "subscriptionCancel.modal.body",
		defaultMessage: "Are you sure you want to cancel this subscription? If you cancel, you will no longer receive support or security and functionality updates.",
	},
	activeSites: {
		id: "subscriptionCancel.modal.activeSites",
		defaultMessage: "You have {amount} active {amount, plural, one {site} other {sites}} using this subscription.",
	},
	numberOfCurrentSubscriptions: {
		id: "subscriptionCancel.modal.numberSubscriptions",
		defaultMessage: "You have {amount} of this type of subscription.",
	},
	cancel: {
		id: "subscriptionCancel.modal.cancel",
		defaultMessage: "Go back",
	},
	confirm: {
		id: "subscriptionCancel.modal.confirm",
		defaultMessage: "Confirm cancellation",
	},
	loading: {
		id: "subscriptionCancel.modal.loading",
		defaultMessage: "Cancelling subscription...",
	},
	selectAmount: {
		id: "subscriptionCancel.modal.amount",
		defaultMessage: "Select amount",
	},
} );

const ActionButtonsContainer = styled( ButtonsContainer )`
	margin: 1em 0;
`;

const NumberButton = styled( IconButton )`
	background-color: ${ colors.$color_grey_light };
	background-size: 15px;
	border-color: ${ colors.$color_red };
	box-shadow: 0 3px 0 0 rgba(0, 0, 0, 0.1);
	color: ${ colors.$color_white };
	filter: drop-shadow(0 2px 2px rgb(0, 0, 0, 0.2) );
	margin-left: 10px;
	max-height: 30px;
	max-width: 35px;
	padding-left: 30px !important;
	padding-right: 0;
`;

const NumberField = styled( InputField )`
	width: 35px;
	height: 30px;
	background: ${ colors.$color_white };
	box-shadow: inset 0 0 3px 0px rgba(0,0,0,0.3);
	border: 1px;
	border-color: ${ colors.$color_grey_light };
	font-size: 1em;
	font-weight: bold;
	margin-left: 8px;
	vertical-align: top;
	padding: 0 0 0 12px;
	
	::-webkit-inner-spin-button, 
	::-webkit-outer-spin-button { 
		-webkit-appearance: none;
		-moz-appearance: textfield;
		appearance: none;
		margin: 0;
    } 
}
	
`;

const CancelSubscriptionContainer = styled.div`
	width: 600px;
`;

/**
 * Returns the rendered Subscription Edit Modal component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered SubscriptionEditModal component.
 */
class SubscriptionEditModal extends React.Component {
	/**
	 * Constructs a subscription edit modal.
	 *
	 * @param {Object} props Props to render.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.cancelSubscription = this.cancelSubscription.bind( this );
		this.changeItemsToCancel = this.changeItemsToCancel.bind( this );
		this.incrementItemsToCancel = this.incrementItemsToCancel.bind( this );
		this.decrementItemsToCancel = this.decrementItemsToCancel.bind( this );

		this.state = {
			amountToCancel: 1,
		};
	}

	/**
	 * Cancels the subscription given in the props.
	 *
	 * @returns {void}
	 */
	cancelSubscription() {
		const { subscription, cancelSubscription } = this.props;
		const { id } = subscription;
		const amount = this.state.amountToCancel;

		cancelSubscription( id, amount );
	}

	/**
	 * Validates the input against the maximum number of subscriptions that is possible to cancel
	 * and sets it in the state.
	 *
	 * @param {Object} event The change event
	 *
	 * @returns {void}
	 */
	changeItemsToCancel( event ) {
		let value = toNumber( event.target.value );
		if ( value > this.props.numberOfCurrentSubscriptions ) {
			value = this.props.numberOfCurrentSubscriptions;
		} else if ( value < 1 ) {
			value = 1;
		}
		this.setState( { amountToCancel: value } );
	}

	/**
	 * Increase the number of items to cancel unless it is already at the maximum possible.
	 *
	 * @returns {void}
	 */
	incrementItemsToCancel() {
		if ( this.state.amountToCancel < this.props.numberOfCurrentSubscriptions ) {
			this.setState( { amountToCancel: this.state.amountToCancel + 1 } );
		}
	}

	/**
	 * Decrease the number of items to cancel unless it is already at one.
	 *
	 * @returns {void}
	 */
	decrementItemsToCancel() {
		if ( this.state.amountToCancel > 1 ) {
			this.setState( { amountToCancel: this.state.amountToCancel - 1 } );
		}
	}

	/**
	 * Renders the plus and minus buttons, and the input field, if the numberOfCurrentSubscriptions is defined.
	 *
	 * @returns {Element} The div element containing the buttons and the input field
	 */
	displayNumberButtons() {
		if ( this.props.numberOfCurrentSubscriptions ) {
			const ResponsiveNumberButton = makeButtonFullWidth( makeResponsiveIconButton( NumberButton ) );
			return <div>
				<FormattedMessage id={ messages.selectAmount.id } defaultMessage={ messages.selectAmount.defaultMessage } />
				<ResponsiveNumberButton
					id="decrease"
					descriptionId="decrease-number-to-cancel"
					onClick={ this.decrementItemsToCancel }
					iconSource={ minus }
				/>
				<NumberField
					id="input-number"
					value={ this.state.amountToCancel }
					onChange={ this.changeItemsToCancel }
					type={ "number" }
				/>
				<ResponsiveNumberButton
					id="increase"
					descriptionId="increase-number-to-cancel"
					onClick={ this.incrementItemsToCancel }
					iconSource={ plus }
				/>
			</div>;
		}
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const confirmButtonText = this.props.loading ? messages.loading : messages.confirm;

		return (
			<MyYoastModal
				isOpen={ this.props.isOpen }
				onClose={ this.props.onClose }
				modalAriaLabel={ messages.ariaLabel }
			>
				<CancelSubscriptionContainer>
					<h1><FormattedMessage { ...messages.header } /></h1>
					<p>
						<FormattedMessage { ...messages.body } />
					</p>
					<p>
						<strong>
							<FormattedMessage
								{ ...messages.activeSites }
								values={ { amount: this.props.amountOfActiveSites } }
							/>
						</strong>
					</p>
					<p>
						<FormattedMessage
							{ ...messages.numberOfCurrentSubscriptions }
							values={ { amount: this.props.numberOfCurrentSubscriptions } }
						/>
					</p>
					{ this.displayNumberButtons() }
					<ErrorDisplay error={ this.props.error } />
					<ActionButtonsContainer>
						<LargeSecondaryButton onClick={ this.props.onClose }>
							<FormattedMessage { ...messages.cancel } />
						</LargeSecondaryButton>
						<LargeButton
							type="submit"
							onClick={ this.cancelSubscription }
							enabledStyle={ this.props.loading === false }
						>
							<FormattedMessage { ...confirmButtonText } />
						</LargeButton>
					</ActionButtonsContainer>
				</CancelSubscriptionContainer>
			</MyYoastModal>
		);
	}
}

SubscriptionEditModal.propTypes = {
	intl: intlShape.isRequired,
	isOpen: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	cancelSubscription: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.object,
	amountOfActiveSites: PropTypes.number.isRequired,
	numberOfCurrentSubscriptions: PropTypes.number.isRequired,
};

SubscriptionEditModal.defaultProps = {
	isOpen: false,
	loading: false,
	error: null,
};

export default injectIntl( SubscriptionEditModal );
