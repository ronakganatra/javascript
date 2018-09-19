import { defineMessages } from "react-intl";

const messages = defineMessages( {
	passwordsDoNotMatch: {
		id: "reset.error.passwordsDoNotMatch",
		defaultMessage: "^Passwords do not match.",
	},
	validationFormatEmail: {
		id: "validation.format.email",
		defaultMessage: "^{field} must be a valid email address.",
	},
} );

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
