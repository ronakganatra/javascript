import React from "react";
import styled from "styled-components";
import { TextButton, ButtonLink } from "./Button.js";
import { FormattedMessage } from "react-intl";

const AddLicensesModal = styled.div`
	max-width: 640px;
	margin: auto;
	font-weight: 300;
	font-size: 18px;
`;

const AddLicensesHeading = styled.h1`
	font-weight: 300;
	font-size: 1.5em;
	margin: 0;
`;

const AddLicensesText = styled.p`
	font-weight: 300;
	font-size: 1em;
`;

const Buttons = styled.div`
	float: right;
`;

/**
 * Renders the AddLicenses component.
 *
 * @param {Object} props                 Component props.
 * @param {Function} props.onCancelClick The function to execute when the cancel button is clicked.
 * @param {Function} props.onUpgradeClick   The function to execute when the link button is clicked.
 *
 * @returns {ReactElement} A react component describing the AddLicenses modal.
 */
export default function AddLicenses( props ) {
	return (
			<AddLicensesModal>
				<AddLicensesHeading>
					<FormattedMessage id="subscriptions.upgrade-subscription.header" defaultMessage="Upgrade subscription" />
				</AddLicensesHeading>
				<AddLicensesText>
					<label htmlFor="addLicensesInputField">
						<FormattedMessage id="subscriptions.upgrade-subscription.text" defaultMessage="You've used up all the site
						licenses on your current subscription. Do you want to upgade you subscription? (Description of how this change will be billed)" />
					</label>
				</AddLicensesText>
				<Buttons>
					<TextButton type="button" onClick={ props.onClose } buttonWidth={"100px"}>
						<FormattedMessage id="subscriptions.upgrade-subscription.cancel" defaultMessage="cancel" />
					</TextButton>

					<ButtonLink to={ props.onUpgrade }>
						<FormattedMessage id="subscriptions.upgrade-subscription.link" defaultMessage="upgrade" />
					</ButtonLink>
				</Buttons>
			</AddLicensesModal>
	);
}

AddLicenses.propTypes = {
	onClose: React.PropTypes.func.isRequired,
	onUpgrade: React.PropTypes.string.isRequired,
	subscription: React.PropTypes.string,
	history: React.PropTypes.any,
};

