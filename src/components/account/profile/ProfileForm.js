import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import { IconButtonTransparent } from "../../Button";
import validate from "validate.js";
import colors from "yoast-components/style-guide/colors.json";
import styled from "styled-components";
import _isUndefined from "lodash/isUndefined";
import _every from "lodash/every";
import ErrorDisplay from "../../../errors/ErrorDisplay";
import { InputField } from "../../InputField";
import defaults from "../../../config/defaults.json";
import { StyledLabel } from "../../Labels";
import UploadUserImage from "./UploadUserImage";
import plusIcon from "../../../icons/blue-plus-circle.svg";
import NewTabMessage from "./../../NewTabMessage";
import { announceActions, getChangeButtons, FormGroup, TextInput } from "./FormElements";

const messages = defineMessages( {
	validationFormatEmail: {
		id: "validation.format.email",
		defaultMessage: "{field} must be a valid e-mail address.",
	},
	validationRequired: {
		id: "validation.required",
		defaultMessage: "{field} cannot be empty.",
	},
	addEmailLink: {
		id: "add.email.link",
		defaultMessage: "Add another email",
	},
	duplicateEmail: {
		id: "profile.error.duplicateEmail",
		defaultMessage: "The email address could not be changed, it is probably already in use.",
	},
	labelEmail: {
		id: "profile.label.email",
		defaultMessage: "Primary email address",
	},
	labelAlternativeEmail: {
		id: "profile.label.alternative.email",
		defaultMessage: "Alternative email address",
	},
	labelFirstName: {
		id: "profile.label.firstName",
		defaultMessage: "First name",
	},
	labelLastName: {
		id: "profile.label.lastName",
		defaultMessage: "Last name",
	},
} );

const AddEmailButton = styled( IconButtonTransparent )`
	margin-top: 8px;
`;

const LabelBlock = styled.div`
	width: 100%;
`;

const NameBlock = styled( LabelBlock )`
	width: 70%;
	margin-bottom: 8px;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		width: 100%;
	}

	div:last-of-type{
		margin-bottom: 0;
	}
`;

const AvatarBlock = styled.div`
	width: 30%;
	margin: auto;
	padding-top:20px;
	text-align: center;
`;

/**
 * Returns the rendered ProfileForm component, which is a form that .
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered ProfileForm component.
 */
class ProfileForm extends React.Component {
	/**
	 * Constructs the ProfileForm class.
	 *
	 * Sets (input) validation constraints, including email.
	 *
	 * @param {Object} props The props passed to the component.
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = {
			userFirstName: this.props.userFirstName,
			userLastName: this.props.userLastName,
			email: this.props.email,
			alternativeEmail: this.props.alternativeEmail,
			onDiscard: false,
		};

		this.isSaved = this.isSaved.bind( this );
		this.onUpdateEmail = this.onUpdateEmail.bind( this );
		this.addAnotherEmail = this.addAnotherEmail.bind( this );
		this.getAlternativeEmailComponents = this.getAlternativeEmailComponents.bind( this );
		this.onUpdateAlternativeEmail = this.onUpdateAlternativeEmail.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
		this.discardChanges = this.discardChanges.bind( this );
		this.onUpdateFirstName = this.onUpdateName.bind( this, "first" );
		this.onUpdateLastName = this.onUpdateName.bind( this, "last" );

		// Validation constraints.
		this.constraints = {
			email: this.emailConstraints.bind( this ),
		};
	}

	/**
	 * Runs the fields through the validator and returns the warnings.
	 *
	 * @returns {Array} All validation warnings.
	 */
	validateFields() {
		let warnings = validate( {
			email: this.state.email,
		}, this.constraints, { format: "detailed" } );

		if ( _isUndefined( warnings ) ) {
			warnings = [];
		}

		return warnings;
	}

	/**
	 * Creates the email constraints for validation.
	 *
	 * @param {string} value Current email value.
	 * @returns {Object} The constraint.
	 */
	emailConstraints( value ) {
		let output = {
			email: {
				message: this.props.intl.formatMessage( messages.validationFormatEmail, {
					field: "Email",
				} ),
			},
		};

		if ( ! value || value.length === 0 ) {
			output = {
				presence: {
					message: this.props.intl.formatMessage( messages.validationRequired, {
						field: "Email",
					} ),
				},
			};
		}
		return output;
	}

	/**
	 * Displays the warnings for the provided field.
	 *
	 * @param {Array} warnings The warnings that could be displayed.
	 * @param {string} field Field to display warnings for.
	 * @returns {ReactElement[]} List of JSXElements if warnings are found. Otherwise null.
	 */
	displayWarnings( warnings, field ) {
		// Find warnings for the specified field.
		let fieldWarnings = warnings.filter( warning => {
			return warning.attribute === field;
		} );

		// Return nothing if we don't have any warnings.
		if ( fieldWarnings.length === 0 ) {
			return null;
		}

		// Display all remaining warnings.
		return fieldWarnings.map( ( warning, index ) => {
			let warningKey = warning.attribute + index;
			return <ErrorDisplay key={ warningKey } error={ warning } type="warning" />;
		} );
	}

	/**
	 * Discards the changes of personal info and resets it to initial state.
	 *
	 * @returns {void}
	 */
	discardChanges() {
		this.setState( {
			userFirstName: this.props.userFirstName,
			userLastName: this.props.userLastName,
			email: this.props.email,
			alternativeEmail: this.props.alternativeEmail,
			onDiscard: true,
		} );
	}

	/**
	 * Whether we have saved.
	 *
	 * @returns {boolean} Whether we are currently saving.
	 */
	isSaved() {
		return this.props.isSaved && ! this.state.onDiscard &&
			_every( [ "userFirstName", "userLastName", "email", "alternativeEmail" ], key => this.props[ key ] === this.state[ key ] );
	}

	onUpdateEmail( event ) {
		this.setState( { email: event.target.value } );
	}

	onUpdateAlternativeEmail( event, index ) {
		let newArray = this.state.alternativeEmail.slice();
		newArray[ index ] = event.target.value;
		this.setState( { alternativeEmail: newArray } );
	}

	onUpdateName( type, event ) {
		type === "first"
			? this.setState( { userFirstName: event.target.value } )
			: this.setState( { userLastName: event.target.value } );
	}

	handleSubmit( event ) {
		event.preventDefault();
		/*
		 * While saving: prevent multiple submissions but don't disable the
		 * button for better accessibility (avoid keyboard focus loss).
		 */
		if ( this.props.isSaving ) {
			return;
		}
		let profile = {
			/* eslint-disable camelcase */
			first_name: this.state.userFirstName,
			last_name: this.state.userLastName,
			/* eslint-enable camelcase */
			email: this.state.email,
			alternativeEmail: this.state.alternativeEmail,
		};

		this.setState( { onDiscard: false } );
		this.props.onSaveProfile( profile );
	}

	/**
	 * Adds another email address to the alternative email array.
	 *
	 * @returns {void}
	 */
	addAnotherEmail() {
		let newMails = this.state.alternativeEmail.slice();
		newMails.push( "" );
		this.setState( {
			alternativeEmail: newMails,
		} );
	}

	componentDidUpdate() {
		announceActions( this.props.isSaving, this.isSaved(), "profile", this.props.intl );
	}

	componentWillUnmount() {
		this.props.resetSaveMessage();
	}

	/**
	 * Renders alternative email address input fields and label.
	 *
	 * @param {Array} warnings The warnings that could be displayed.
	 * @returns {ReactElement} The input fields and label.
	 */
	getAlternativeEmailComponents( warnings ) {
		return this.state.alternativeEmail.map(
			( email, index ) => {
				return (
					<Fragment key={ `${email}-${index}` }>
						<StyledLabel htmlFor="alternative-email-address">
							<FormattedMessage
								id={ messages.labelAlternativeEmail.id }
								defaultMessage={ messages.labelAlternativeEmail.defaultMessage }
							/>
						</StyledLabel>
						<TextInput
							id="alternative-email-address"
							autocomplete="on"
							name="email"
							type="text"
							placeholder="Enter another email address..."
							value={ this.state.alternativeEmail[ index ] }
							onChange={ event => this.onUpdateAlternativeEmail( event, index ) }
						/>
						{ this.displayWarnings( warnings, "email" ) }
					</Fragment> );
			}
		);
	}

	/**
	 * Renders the element.
	 * @returns {JSXElement} The rendered JSX Element.
	 */
	render() {
		let warnings = this.validateFields();

		return (
			<FormGroup onSubmit={ this.handleSubmit }>
				<AvatarBlock>
					<UploadUserImage image={ this.props.image } onFileUpload={ this.props.onUploadAvatar } />
				</AvatarBlock>
				<NameBlock id="left">
					<StyledLabel htmlFor="first-name">
						<FormattedMessage
							id={ messages.labelFirstName.id }
							defaultMessage={ messages.labelFirstName.defaultMessage }
						/>
					</StyledLabel>
					<TextInput
						width="100%"
						margin-right="5px"
						id="first-name"
						name="first name"
						type="text"
						value={ this.state.userFirstName }
						onChange={ this.onUpdateFirstName }
					/>
					<StyledLabel htmlFor="last-name">
						<FormattedMessage
							id={ messages.labelLastName.id }
							defaultMessage={ messages.labelLastName.defaultMessage }
						/>
					</StyledLabel>
					<TextInput
						width="100%"
						id="last-name"
						name="last name"
						type="text"
						value={ this.state.userLastName }
						onChange={ this.onUpdateLastName }
					/>
				</NameBlock>
				<LabelBlock>
					<StyledLabel htmlFor="email-address">
						<FormattedMessage
							id={ messages.labelEmail.id }
							defaultMessage={ messages.labelEmail.defaultMessage }
						/>
					</StyledLabel>
					<TextInput
						id="email-address"
						autocomplete="on"
						name="email"
						type="text"
						value={ this.state.email }
						onChange={ this.onUpdateEmail }
					/>
					{ this.displayWarnings( warnings, "email" ) }
					{ this.getAlternativeEmailComponents( warnings ) }
					<ErrorDisplay error={ this.props.saveEmailError } />
					<AddEmailButton iconSource={ plusIcon } onClick={ this.addAnotherEmail } iconSize={ "1em" }>
						<FormattedMessage
							id={ messages.addEmailLink.id }
							defaultMessage={ messages.addEmailLink.defaultMessage }
						/>
						<NewTabMessage />
					</AddEmailButton>
					{ getChangeButtons( "profile", this.props.intl, this.props.isSaving, this.isSaved(), this.discardChanges ) }
				</LabelBlock>
			</FormGroup>
		);
	}
}

ProfileForm.propTypes = {
	intl: intlShape.isRequired,
	onUpdateEmail: PropTypes.func.isRequired,
	onSaveProfile: PropTypes.func,
	onUploadAvatar: PropTypes.func.isRequired,
	email: PropTypes.string,
	alternativeEmail: PropTypes.array,
	userFirstName: PropTypes.string,
	userLastName: PropTypes.string,
	image: PropTypes.string,
	isSaving: PropTypes.bool,
	isSaved: PropTypes.bool,
	isDeleting: PropTypes.bool,
	saveEmailError: PropTypes.object,
	resetSaveMessage: PropTypes.func,
};

ProfileForm.defaultProps = {
	email: "",
	alternativeEmail: [ "" ],
	userFirstName: "",
	userLastName: "",
	isSaving: false,
	isSaved: false,
	isDeleting: false,
};

export default injectIntl( ProfileForm );
