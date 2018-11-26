import { defineMessages, FormattedMessage } from "react-intl";
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
				<FormattedMessage id="subscriptionDetail.header" defaultMessage="Payment Failed" />
			</ModalHeading>
			<p>
				<FormattedMessage
					id="subscriptionDetail.paymentSuspended"
					defaultMessage="Unfortunately we were not able to bill your payment method for the next billing cycle.
					This means we have suspended the subscription until the problem is resolved. Sorry for the inconvenience!"
				/>
			</p>
			<p>
				<FormattedMessage
					id="subscriptionDetail.manualFix"
					defaultMessage="Whatever the reason may be for the failed payment, you will have to renew your
					subscription manually to fix this. After doing so, the new payment info you provide will be used to
					reactivate your subscription."
				/>
			</p>
			<p>
				<FormattedMessage
					id="subscriptionDetail.help"
					defaultMessage="Let us know if you need any help, "
				/>
				<Link to={ "mailto:support@yoast.com" }>
					<FormattedMessage
						id="subscriptionDetail.team"
						defaultMessage="our support team is available 24/7"
					/>
				</Link>
				!
			</p>
			<ButtonArea>
				<ButtonMarginRight
					marginRight={ 15 }
					enabledStyle={ false }
					onClick={ props.onClose }
				>
					Cancel
				</ButtonMarginRight>
				<ButtonLink
					to={ props.renewalUrl }
				>
					Renew
				</ButtonLink>
			</ButtonArea>
		</Fragment>
	</Modal>
);


SubscriptionDetailModal.propTypes = {
	onClose: PropTypes.func.isRequired,
	renewalUrl: PropTypes.string.isRequired,
	modalOpen: PropTypes.bool,
};

SubscriptionDetailModal.defaultProps = {
	modalOpen: false,
};

export default SubscriptionDetailModal;
