import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { LargeButtonLink, LargeSecondaryButton } from "./Button.js";
import { FormattedMessage } from "react-intl";
import NewTabMessage from "../components/NewTabMessage";
import { ModalHeading } from "./Headings";

const AddLicensesModal = styled.div`
	max-width: 640px;
	margin: auto;
`;

const AddLicensesText = styled.p`
	font-size: 16px;
`;

const Buttons = styled.div`
	text-align: right;
	flex: 200px 1 0;
	margin-bottom: 1.5em;

	a,
	button {
		margin-left: 12px;
	}

	@media screen and ( max-width: 455px ) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		a,
		button {
			margin-left: 0px;
			margin-top: 12px;
		}
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
		<AddLicensesModal role="document">
			<ModalHeading>
				<FormattedMessage id="add-licenses.header" defaultMessage="You are out of licenses" />
			</ModalHeading>
			<AddLicensesText>
				<FormattedMessage
					id="add-licenses.text"
					defaultMessage="You've used up all the site licenses in your current subscription.
						If you want to add more sites, please buy another subscription."
				/>
			</AddLicensesText>
			<Buttons>
				<LargeSecondaryButton type="button" onClick={ props.onClose }>
					<FormattedMessage id="add-licenses.buy-more.cancel" defaultMessage="Cancel" />
				</LargeSecondaryButton>

				<LargeButtonLink to={ props.onShop } linkTarget="_blank">
					<FormattedMessage id="add-licenses.buy-more.shop" defaultMessage="Shop" />
					<NewTabMessage />
				</LargeButtonLink>
			</Buttons>
		</AddLicensesModal>
	);
}

AddLicenses.propTypes = {
	onClose: PropTypes.func.isRequired,
	onShop: PropTypes.string.isRequired,
};
