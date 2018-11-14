import PropTypes from "prop-types";
import React from "react";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import styled from "styled-components";
import MyYoastModal from "./MyYoastModal";
import ButtonsContainer from "./general/ButtonsContainer";
import { Button, LargeButton, LargeSecondaryButton } from "./Button";
import ErrorDisplay from "../errors/ErrorDisplay";
// Later import ConnectedSubscriptionWarning from "./ConnectedSubscriptionWarning";

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
} );

const ActionButtonsContainer = styled( ButtonsContainer )`
	margin: 1em 0;
`;


const CancelSubscriptionContainer = styled.div`
	width:800px;
`;

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

	incrementItemsToCancel() {
		this.setState( { amountToCancel: this.state.amountToCancel + 1 } );
		console.log( this.state.amountToCancel );
	}

	decrementItemsToCancel() {
		if ( this.state.amountToCancel > 1 ) {
			this.setState( { amountToCancel: this.state.amountToCancel - 1 } );
		}
	}

	displayNumberButtons() {
		if ( this.props.numberOfCurrentSubscriptions ) {
			return <div>
				<Button
					id="decrease"
					descriptionId="decrease-number-to-cancel"
					onClick={ this.decrementItemsToCancel }
				/>
				{ this.state.amountToCancel }
				<Button
					id="increase"
					descriptionId="increase-number-to-cancel"
					onClick={ this.incrementItemsToCancel }
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
					<ErrorDisplay error={ this.props.error } />
					<ActionButtonsContainer>
						{ this.displayNumberButtons() }
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
	className: PropTypes.string,
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
