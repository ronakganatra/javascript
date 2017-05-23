import React from "react";
import styled from "styled-components";
import { LargeButton, LargeButtonLink } from "./Button.js";
import { FormattedMessage } from "react-intl";

const AddLicensesModal = styled.div`
	max-width: 640px;
	margin: auto;
`;

const AddLicensesHeading = styled.h1`
	font-weight: 300;
	font-size: 20px;
	margin: 0;
`;

const AddLicensesText = styled.p`
	font-weight: 300;
	font-size: 16px;
`;

const Buttons = styled.div`
	float: right;

	a,
	button {
		margin-left: 12px;
	}
`;

/**
 * Renders the AddLicenses component.
 *
 * @param {Object} props Component props.
 * @param {Function} props.onClose The function to execute when the cancel button is clicked.
 * @param {Function} props.onUpgrade   The function to execute when the link button is clicked.
 *
 * @returns {ReactElement} A react component describing the AddLicenses modal.
 */
export default function AddLicenses( props ) {
	return (
			<AddLicensesModal>
				<AddLicensesHeading>
					<FormattedMessage id="add-licenses.header" defaultMessage="You are out of licenses" />
				</AddLicensesHeading>
				<AddLicensesText>
					<label htmlFor="addLicensesInputField">
						<FormattedMessage id="add-licenses.text" defaultMessage="You've used up all the site
						licenses in your current subscription. If you want to add more sites, please buy another subscription." />
					</label>
				</AddLicensesText>
				<Buttons>
					<LargeButton type="button" onClick={ props.onClose } >
						<FormattedMessage id="add-licenses.buy-more.cancel" defaultMessage="Cancel" />
					</LargeButton>

					<LargeButtonLink to={ props.onShop }>
						<FormattedMessage id="add-licenses.buy-more.shop" defaultMessage="Shop" />
					</LargeButtonLink>
				</Buttons>
			</AddLicensesModal>
	);
}

AddLicenses.propTypes = {
	onClose: React.PropTypes.func.isRequired,
	onShop: React.PropTypes.string.isRequired,
};
