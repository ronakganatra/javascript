import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import { Button } from "../../Button";
import validate from "validate.js";
import { speak } from "@wordpress/a11y";
import colors from "yoast-components/style-guide/colors.json";
import styled from "styled-components";
import _isUndefined from "lodash/isUndefined";
import ErrorDisplay from "../../../errors/ErrorDisplay";
import { InputField } from "../../InputField";

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
		defaultMessage: "Email",
	},
	saving: {
		id: "profile.saving",
		defaultMessage: "Saving...",
	},
	saved: {
		id: "profile.saved",
		defaultMessage: "Email address saved",
	},
	saveEmail: {
		id: "profile.saveEmail",
		defaultMessage: "Save email address",
	},
} );

const SaveButton = styled( Button )`
	margin: 1em 0;
`;

const TextInput = styled( InputField )`
	background-color: ${ colors.$color_background_light };
`;

const Label = styled.label`
	display: block;
	margin-bottom: 0.5em;
	font-size: 1.1em;
`;

const FormMessage = styled.p`
	padding: 0.5em 0 0 ${ props => props.inline ? "1em" : "0" };
	margin: 0;
	${ props => props.inline ? "display: inline-block;" : "display: block;" }
`;

const FormGroup = styled.div`
	display: inline-flex;
	width: 100%;
`;

const LabelBlock = styled.div`
	display: inline-block;
	width: 100%;

	&#left{
		margin-right: 8px;
	};
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

		this.onUpdateEmail = this.onUpdateEmail.bind( this );
		this.onUpdateFirstName = this.onUpdateFirstName.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );

		// Validation constraints.
		this.constraints = {
			email: this.emailConstraints.bind( this ),
		};
	}

	/**
	 * Announce actions to assistive technologies.
	 *
	 * @returns {void}
	 */
	announceActions() {
		let message = "";

		if ( this.isSaving() ) {
			message = this.props.intl.formatMessage( messages.saving );
		}

		if ( this.isSaved() ) {
			message = this.props.intl.formatMessage( messages.saved );
		}

		speak( message, "assertive" );
	}

	/**
	 * Runs the fields through the validator and returns the warnings.
	 *
	 * @returns {Array} All validation warnings.
	 */
	validateFields() {
		let warnings = validate( {
			email: this.props.email,
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
		return fieldWarnings.map( ( warning ) => {
			return <ErrorDisplay error={ warning } type="warning"/>;
		} );
	}

	/**
	 * Returns the save email elements for the profile page.
	 *
	 * @returns {ReactElement} The elements for the save email.
	 */
	getSaveButton() {
		let emailSavingMessage;

		if ( this.isSaving() ) {
			let message = this.props.intl.formatMessage( messages.saving );

			emailSavingMessage = <FormMessage inline={ true }>{ message }</FormMessage>;
			speak( message, "assertive" );
		}

		return <div>
			<SaveButton type="submit">
				<FormattedMessage id={ messages.saveEmail.id } defaultMessage={ messages.saveEmail.defaultMessage } />
			</SaveButton>
			{ emailSavingMessage }
		</div>;
	}

	/**
	 * Whether we are currently saving.
	 *
	 * @returns {boolean} Whether we are currently saving.
	 */
	isSaving() {
		return this.props.isSaving;
	}

	/**
	 * Whether we have saved.
	 *
	 * @returns {boolean} Whether we are currently saving.
	 */
	isSaved() {
		return this.props.isSaved;
	}

	onUpdateEmail( event ) {
		this.props.onUpdateEmail( event.target.value );
	}

	onUpdateFirstName( event ) {
		this.props.onUpdateFirstName( event.target.value );
	}

	handleSubmit( event ) {
		event.preventDefault();

		/*
		 * While saving: prevent multiple submissions but don't disable the
		 * button for better accessibility (avoid keyboard focus loss).
		 */
		if ( this.isSaving() ) {
			return;
		}

		this.props.onSaveProfile();
	}

	componentDidUpdate() {
		this.announceActions();
	}

	/**
	 * Renders the element.
	 * @returns {JSXElement} The rendered JSX Element.
	 */
	render() {
		let warnings = this.validateFields();

		return (
			<form onSubmit={ this.handleSubmit }>
				<FormGroup>
					<LabelBlock id="left">
						<Label htmlFor="first-name">First name</Label>
						<TextInput
							width="100%"
							margin-right="5px"
							id="first-name"
							name="first name"
							type="text"
							value={ this.props.updatingFirstName }
							onChange={ this.onUpdateFirstName }
						/>
					</LabelBlock>
					<LabelBlock>
						<Label htmlFor="last-name">Last name</Label>
						<TextInput
							width="100%"
							id="last-name"
							name="last name"
							type="text"
							value={ this.props.updatingFirstName }
							onChange={ this.onUpdateFirstName }
						/>
					</LabelBlock>
				</FormGroup>
				<Label htmlFor="email-address"><FormattedMessage id={ messages.labelEmail.id } defaultMessage={ messages.labelEmail.defaultMessage }/></Label>
				<TextInput
					id="email-address"
					autocomplete="on"
					name="email"
					type="text"
					value={ this.props.email }
					onChange={ this.onUpdateEmail }
				/>
				{ this.displayWarnings( warnings, "email" ) }
				<ErrorDisplay error={ this.props.saveEmailError } />
				{ this.getSaveButton() }
			</form>
		);
	}
}

ProfileForm.propTypes = {
	intl: intlShape.isRequired,
	onUpdateEmail: PropTypes.func,
	onUpdateFirstName: PropTypes.func,
	onSaveProfile: PropTypes.func,
	email: PropTypes.string,
	userFirstName: PropTypes.string,
	updatingFirstName: PropTypes.string,
	isSaving: PropTypes.bool,
	isSaved: PropTypes.bool,
	isDeleting: PropTypes.bool,
	saveEmailError: PropTypes.object,
};

ProfileForm.defaultProps = {
	email: "",
	userFirstName: "",
	updatingFirstName: "",
	isSaving: false,
	isSaved: false,
	passwordResetError: null,
};

export default injectIntl( ProfileForm );
