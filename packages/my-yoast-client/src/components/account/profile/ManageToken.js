import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "../../Button.js";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { addPlaceholderStyles } from "../../../styles/inputs";
import defaults from "../../../config/defaults.json";
import { ModalHeading } from "../../Headings";
import { RedButton } from "../../Button";
import ErrorDisplay from "../../../errors/ErrorDisplay";
import { StyledLabel } from "../../Labels";

const ManageTokenModal = styled.div`
	margin: auto;
	font-weight: 300;
	font-size: 1em;
`;

const TokenDescription = addPlaceholderStyles( styled.input`
	width: 100%;
	height: 48px;
	box-shadow: inset 0 2px 8px 0px rgba(0,0,0,0.3);
	background: ${ colors.$color_grey };
	padding: 0 0 0 10px;
	font-size: 1em;
	border: 0;
	margin-bottom: 8px;
` );

const Buttons = styled.div`
	flex: 1 0 200px;
	text-align: right;
	margin: 32px 0 16px;

	a,
	button {
		margin-left: 12px;
	}

	@media screen and (max-width: ${ defaults.css.breakpoint.mobile }px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		a,
		button {
			margin-left: 0;
			margin-bottom: 8px;
		}
	}
`;

const WideLargeButton = makeButtonFullWidth( LargeButton );
const WideRedButton = makeButtonFullWidth( RedButton );
const WideSecondaryButton = makeButtonFullWidth( LargeSecondaryButton );


class ManageToken extends React.Component {
	/**
	 * Initializes the class with the specified props.
	 *
	 * @param {Object} props The props to be passed to the class that was extended from.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );
		this.state = {
			tokenDescriptionInput: props.manageTokenData.name,
			tokenId: props.manageTokenData.id,
		};
	}

	/**
	 * Calls onChange function when website url changes.
	 *
	 * @param {Object} event The event returned by the WebsiteURLChange.
	 *
	 * @returns {void}
	 */
	onTokenDescriptionChange( event ) {
		const value = event.target.value;
		this.setState( {
			tokenDescriptionInput: value,
		} );
	}

	/**
	 * Handles the submit event.
	 *
	 * @param {object} event The submit event.
	 *
	 * @returns {void}
	 */
	handleSubmit( event ) {
		event.preventDefault();
		if ( this.state.tokenDescriptionInput !== "" ) {
			const data = {
				id: this.props.manageTokenData.id,
				name: this.state.tokenDescriptionInput,
			};
			this.props.onSaveTokenClick( data );
		}
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const enabledStyle = this.state.tokenDescriptionInput !== "";
		return (
			<ManageTokenModal>
				<ModalHeading>
					<FormattedMessage id="profile.manageToken.header" defaultMessage="Manage token" />
				</ModalHeading>
				<FormattedMessage
					id="profile.manage-token.modal-description"
					defaultMessage="Here you can edit this token's description, or disable the token."
				/>
				<form onSubmit={ this.handleSubmit.bind( this ) } noValidate={ true }>
					<StyledLabel htmlFor="change-token-description-input">
						<FormattedMessage
							id="profile.manage-token.token-description"
							defaultMessage="You can type a new description for the token here, in case you want to change it:"
						/>
					</StyledLabel>

					<TokenDescription
						type="text"
						id="change-token-description-input"
						placeholder={ this.state.tokenDescriptionInput }
						value={ this.state.tokenDescriptionInput }
						onChange={ this.onTokenDescriptionChange.bind( this ) }
					/>

					<ErrorDisplay error={ this.props.error } />

					<Buttons>
						<WideSecondaryButton onClick={ this.props.onClose }>
							<FormattedMessage id="profile.manage-token.cancel" defaultMessage="Cancel" />
						</WideSecondaryButton>
						<WideRedButton
							onClick={ () => {
								this.props.onDeleteTokenClick( this.state.tokenId );
							} }
						>
							<FormattedMessage id="profile.manage-token.delete" defaultMessage="Delete" />
						</WideRedButton>
						<WideLargeButton
							type="submit"
							enabledStyle={ enabledStyle }
						>
							<FormattedMessage id="profile.manage-token.save" defaultMessage="Save" />
						</WideLargeButton>
					</Buttons>
				</form>
			</ManageTokenModal>
		);
	}
}

ManageToken.propTypes = {
	intl: intlShape.isRequired,
	onSaveTokenClick: PropTypes.func.isRequired,
	onDeleteTokenClick: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	manageTokenData: PropTypes.object.isRequired,
	error: PropTypes.object,
};

export default injectIntl( ManageToken );
