import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import MyYoastModal from "../MyYoastModal";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { ModalHeading } from "../Headings";
import Link from "../Link";
import styled from "styled-components";
import { ButtonLink, Button } from "../Button";

const modalAriaLabel = defineMessages( {
	id: "modal.arialabel.paymentFailed",
	defaultMessage: "Payment failed",
} );

const ButtonArea = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const Modal = styled( MyYoastModal )`
	 padding: 24px 16px 24px 16px !important;
`;

const ButtonMarginRight = styled( Button )`
	margin: 0 ${ props => props.marginRight}px 0 0;
`;

const messages = defineMessages( {
	paymentSuspended: {
		id: "subscriptionDetail.modal.paymentSuspended",
		defaultMessage: "Unfortunately we were not able to bill your payment method for the next billing cycle. " +
			"This means we have suspended the subscription until the problem is resolved. Sorry for the inconvenience!",
	},
	paymentFailed: {
		id: "subscriptionDetail.header",
		defaultMessage: "Payment Failed",
	},
	manualFix: {
		id: "subscriptionDetail.modal.manualFix",
		defaultMessage: "Whatever the reason may be for the failed payment, you will have to renew your " +
			"subscription manually to fix this. After doing so, the new payment info you provide will be used to " +
			"reactivate your subscription.",
	},
	cancel: {
		id: "subscriptionDetail.modal.cancelButton",
		defaultMessage: "Cancel",
	},
	renew: {
		id: "subscriptionDetail.modal.renewLink",
		defaultMessage: "Renew",
	},
} );

/**
 * Returns the SubscriptionDetailModal.
 *
 * @param {Object} props The props required.
 * @returns { ReactElement } The SubscriptionDetailModal.
 */
const SubscriptionDetailModal = ( props ) => (
	<Modal
		isOpen={ props.modalOpen }
		onClose={ props.onClose }
		modalAriaLabel={ modalAriaLabel }
	>
		<Fragment>
			<ModalHeading>
				{ props.intl.formatMessage( messages.paymentFailed ) }
			</ModalHeading>
			<p>
				{ props.intl.formatMessage( messages.paymentSuspended ) }
			</p>
			<p>
				{ props.intl.formatMessage( messages.manualFix ) }
			</p>
			<p>
				<FormattedMessage
					id="subscriptionDetail.modal.help"
					defaultMessage="Let us know if you need any help, { supportLink }!"
					values={ {
						supportLink: <Link to="mailto:support@yoast.com">{
							props.intl.formatMessage( {
								id: "subscriptionDetail.support-link",
								defaultMessage: "our support team is available 24/7",
							} )
						}</Link>,
					} }
				/>
			</p>
			<ButtonArea>
				<ButtonMarginRight
					marginRight={ 15 }
					enabledStyle={ false }
					onClick={ props.onClose }
				>
					{ props.intl.formatMessage( messages.cancel ) }
				</ButtonMarginRight>
				<ButtonLink
					to={ props.renewalUrl }
				>
					{ props.intl.formatMessage( messages.renew ) }
				</ButtonLink>
			</ButtonArea>
		</Fragment>
	</Modal>
);


SubscriptionDetailModal.propTypes = {
	onClose: PropTypes.func.isRequired,
	renewalUrl: PropTypes.string.isRequired,
	modalOpen: PropTypes.bool,
	intl: intlShape.isRequired,
};

SubscriptionDetailModal.defaultProps = {
	modalOpen: false,
};

export default injectIntl( SubscriptionDetailModal );
