import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import validate from "validate.js";
import styled from "styled-components";
import _isUndefined from "lodash/isUndefined";
import _every from "lodash/every";
import ErrorDisplay from "../../../errors/ErrorDisplay";
import defaults from "../../../config/defaults.json";
import { StyledLabel } from "../../Labels";
import UploadUserImage from "./UploadUserImage";
import { getChangeButtons, FormGroup, TextInput } from "./FormElements";
import isShallowEqual from "@wordpress/is-shallow-equal";

const messages = defineMessages( {
	validationFormatEmail: {
		id: "validation.format.email",
		defaultMessage: "{field} must be a valid e-mail address.",
	},
	validationRequired: {
		id: "validation.required",
		defaultMessage: "{field} cannot be empty.",
	},
	duplicateEmail: {
		id: "profile.error.duplicateEmail",
		defaultMessage: "The email address could not be changed, it is probably already in use.",
	},
	labelEmail: {
		id: "profile.label.email",
		defaultMessage: "Primary email address",
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

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		width: 100%;
	}
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
			onDiscard: false,
		};

		this.isSaved = this.isSaved.bind( this );
		this.onUpdateEmail = this.onUpdateEmail.bind( this );
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
	 * @param {Array}  warnings The warnings that could be displayed.
	 * @param {string} field    The field to display warnings for.
	 * @returns {ReactElement[]} List of JSXElements if warnings are found. Otherwise null.
	 */
	displayWarnings( warnings, field ) {
		// Find warnings for the specified field.
		const fieldWarnings = warnings.filter( warning => {
			return warning.attribute === field;
		} );

		// Return nothing if we don't have any warnings.
		if ( fieldWarnings.length === 0 ) {
			return null;
		}

		// Display all remaining warnings.
		return fieldWarnings.map( ( warning, index ) => {
			const warningKey = warning.attribute + index;
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
			_every( [ "userFirstName", "userLastName", "email" ], key => this.props[ key ] === this.state[ key ] );
	}

	/**
	 * Handles the change event on the email input field and sets the email state.
	 *
	 * @param {object} event The input field change event.
	 *
	 * @returns {void}
	 */
	onUpdateEmail( event ) {
		this.setState( { email: event.target.value } );
	}

	/**
	 * Handles the change event on the first and last name input fields and sets the related state.
	 *
	 * @param {string} type  Whether the input field is the first or last name.
	 * @param {object} event The input fields change event.
	 *
	 * @returns {void}
	 */
	onUpdateName( type, event ) {
		if ( type === "first" ) {
			this.setState( { userFirstName: event.target.value } );
			return;
		}

		this.setState( { userLastName: event.target.value } );
	}

	/**
	 * Handles the submit event on the form.
	 *
	 * @param {object} event The form submit event.
	 *
	 * @returns {void}
	 */
	handleSubmit( event ) {
		event.preventDefault();
		/*
		 * While saving: prevent multiple submissions but don't disable the
		 * button for better accessibility (avoid keyboard focus loss).
		 */
		if ( this.props.isSaving ) {
			return;
		}
		const profile = {
			/* eslint-disable camelcase */
			first_name: this.state.userFirstName,
			last_name: this.state.userLastName,
			/* eslint-enable camelcase */
			email: this.state.email,
		};

		this.setState( { onDiscard: false } );
		this.props.onSaveProfile( profile );
	}

	/**
	 * Tries to reduce rerenderings when props and state don't change.
	 *
	 * Useful when other child components trigger parent component updates.
	 *
	 * @param {object} nextProps The next props.
	 * @param {object} nextState The next state.
	 *
	 * @returns {void}
	 */
	shouldComponentUpdate( nextProps, nextState ) {
		return ! isShallowEqual( nextProps, this.props ) || ! isShallowEqual( nextState, this.state );
	}

	/**
	 * Resets the profile saved message when the component unmounts.
	 *
	 * @returns {void}
	 */
	componentWillUnmount() {
		this.props.resetSaveMessage();
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const warnings = this.validateFields();

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
					<ErrorDisplay error={ this.props.saveEmailError } />
					{ getChangeButtons( "profile", this.props.intl, this.props.isSaving, this.isSaved(), this.discardChanges ) }
				</LabelBlock>
			</FormGroup>
		);
	}
}

ProfileForm.propTypes = {
	intl: intlShape.isRequired,
	onSaveProfile: PropTypes.func.isRequired,
	onUploadAvatar: PropTypes.func.isRequired,
	email: PropTypes.string,
	userFirstName: PropTypes.string,
	userLastName: PropTypes.string,
	image: PropTypes.string,
	isSaving: PropTypes.bool,
	isSaved: PropTypes.bool,
	saveEmailError: PropTypes.object,
	resetSaveMessage: PropTypes.func.isRequired,
};

ProfileForm.defaultProps = {
	email: "",
	userFirstName: "",
	userLastName: "",
	image: "",
	isSaving: false,
	isSaved: false,
	saveEmailError: {},
};

export default injectIntl( ProfileForm );
