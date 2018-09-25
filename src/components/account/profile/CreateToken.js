import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, FormattedMessage, defineMessages } from "react-intl";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "../../Button.js";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { addPlaceholderStyles } from "../../../styles/inputs";
import defaults from "../../../config/defaults.json";
import { ModalHeading } from "../../Headings";
import ErrorDisplay from "../../../errors/ErrorDisplay";
import { StyledLabel } from "../../Labels";

const messages = defineMessages(
	{
		placeholderMessage: {
			id: "token-description.placeholder",
			defaultMessage: "What's this token for?",
		},
	}
);

const CreateTokenModal = styled.div`
	margin: auto;
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
const WideSecondaryButton = makeButtonFullWidth( LargeSecondaryButton );


class CreateToken extends React.Component {
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
			tokenDescriptionInput: "",
		};
	}

	/**
	 * Calls onChange function when token description changes.
	 *
	 * @param {Object} event The event returned by the change in the tokenDescription.
	 *
	 * @returns {void}
	 */
	onTokenDescriptionChange( event ) {
		this.setState( {
			tokenDescriptionInput: event.target.value,
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
			this.props.onCreateClick( {
				name: this.state.tokenDescriptionInput,
			} );
		}
	}

	/**
	 * Returns the rendered html.
	 *
	 * @returns {ReactElement} The rendered html.
	 */
	render() {
		const enabledStyle = this.state.tokenDescriptionInput !== "";
		return (
			<CreateTokenModal>
				<ModalHeading>
					<FormattedMessage id="profile.createToken.header" defaultMessage="Create token" />
				</ModalHeading>

				<form onSubmit={ this.handleSubmit.bind( this ) } noValidate={ true }>
					<StyledLabel htmlFor="create-token-description-input">
						<FormattedMessage
							id="profile.create-token.token-description"
							defaultMessage="Please enter a description for the token you want to create:"
						/>
					</StyledLabel>

					<TokenDescription
						type="text"
						id="create-token-description-input"
						placeholder={ this.props.intl.formatMessage( messages.placeholderMessage ) }
						value={ this.state.tokenDescriptionInput }
						onChange={ this.onTokenDescriptionChange.bind( this ) }
					/>

					<ErrorDisplay error={ this.props.error } />

					<Buttons>
						<WideSecondaryButton onClick={ this.props.onClose }>
							<FormattedMessage id="profile.createToken.cancel" defaultMessage="Cancel" />
						</WideSecondaryButton>
						<WideLargeButton
							type="submit"
							enabledStyle={ enabledStyle }
						>
							<FormattedMessage id="profile.create-sites.create" defaultMessage="Create token" />
						</WideLargeButton>
					</Buttons>
				</form>
			</CreateTokenModal>
		);
	}
}

CreateToken.propTypes = {
	intl: intlShape.isRequired,
	onCreateClick: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	error: PropTypes.object,
};

export default injectIntl( CreateToken );
