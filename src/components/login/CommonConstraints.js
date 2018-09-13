import { defineMessages } from "react-intl";

const PASSWORD_MINIMUM_LENGTH = 8;

const messages = defineMessages( {
	passwordsDoNotMatch: {
		id: "reset.error.passwordsDoNotMatch",
		defaultMessage: "^Passwords do not match.",
	},
	validationMinimumLength: {
		id: "validation.minimumLength",
		defaultMessage: "^{field} must have a minimum length of {minLength} characters.",
	},
	validationFormatEmail: {
		id: "validation.format.email",
		defaultMessage: "^{field} must be a valid email address.",
	},
} );

/**
 * The default password constraint, to be used with the validate.js library.
 * (https://validatejs.org/ / `import{ validate } from "validate.js"`)
 *
 * @param {Object} intl the react internationalization library object.
 * @returns {{length: {minimum: number, message: *}}} the constraint
 */
export function passwordConstraints( intl ) {
	return {
		length: {
			minimum: PASSWORD_MINIMUM_LENGTH,
			message: intl.formatMessage( messages.validationMinimumLength, {
				field: "Password",
				minLength: PASSWORD_MINIMUM_LENGTH,
			} ),
		},
	};
}

/**
 * The default repeat password constraint, to be used with the validate.js library.
 * (https://validatejs.org/ / `import{ validate } from "validate.js"`)
 *
 * @param {Object} intl the react internationalization library object.
 * @returns {{equality: {attribute: "password", message: string}}} the constraint
 */
export function passwordRepeatConstraint( intl ) {
	return {
		equality: {
			attribute: "password",
			message: intl.formatMessage( messages.passwordsDoNotMatch ),
		},
	};
}

/**
 * The default email constraint, to be used with the validate.js library.
 * (https://validatejs.org/ / `import{ validate } from "validate.js"`)
 *
 * @param {Object} intl the react internationalization library object.
 * @returns {{email: {message: *}}} the constraint
 */
export function emailConstraints( intl ) {
	return {
		email: {
			message: intl.formatMessage( messages.validationFormatEmail, {
				field: "Email",
			} ),
		},
	};
}
