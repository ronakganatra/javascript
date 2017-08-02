import React from "react";
import { injectIntl, defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { PurpleLink, ErrorMessage, WarningMessage, MessageIcon } from "../components/MessageBoxes";
import exclamationTriangle from "../icons/exclamation-triangle.svg";
import exclamationCircle from "../icons/exclamation-circle.svg";

let messages = defineMessages( {
	contactSupportLink: {
		id: "contact.support.link",
		defaultMessage: "please contact support",
	},
} );

/**
 * This class can render error messages in our custom style. It outputs the styled error message if its errorMessage prop is not empty.
 * Else, it renders null.
 * The parameter showIcon is set to true by default, and will render a warning triangle with adjusted padding-left.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered ErrorMessage component.
 */
class ErrorHandler extends React.Component {
	/**
	 * Sets the ErrorMessage object. This includes setting iconPadding to true, because by default the icon is shown. This requires altered padding-left.
	 *
	 * @param {Object} props The props passed to the component.
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );
		this.iconPadding = true;
	}

	/**
	 * Checks the errormessage for placeholders, replaces them with desired content. Outputs an object that can be used by formatMessage().
	 *
	 * @param {string} errorMessage The string to check for placeholders.
	 * @returns {Object} An object with a defaultMessage and values, which can be used by FormattedMessage.
	 */
	handlePlaceholders( errorMessage ) {
		let defaultMessage = "{ errorMessage }";
		let values = { errorMessage };

		// In the case of a [customer_support_link] placeholder, replace with an e-mail link to support. Will eventually link to Knowledge base.
		if ( errorMessage.indexOf( "[customer_support_link]" ) > -1 ) {
			errorMessage = errorMessage.replace( "[customer_support_link]", "" );
			let contactLink = (
				<PurpleLink href="mailto:support@yoast.com">
					<FormattedMessage id={ messages.contactSupportLink.id } defaultMessage={ messages.contactSupportLink.defaultMessage } />
				</PurpleLink> );
			defaultMessage = "{ errorMessage }{ contactLink }.";
			values = Object.assign( values, values, { errorMessage, contactLink } );
		}

		return(
		{
			defaultMessage,
			values,
		}
		);
	}

	/**
	 * Formats an object containing a defaultMessage and values into a FormattedMessage component.
	 *
	 * @param {Object} messageFormatObject An object containing a defaultMessage and values that replace defaultMessage sections.
	 * @returns {ReactElement} A FormattedMessage component that contains the formatted error message.
	 */
	toFormattedMessage( messageFormatObject ) {
		return(
			<FormattedMessage
				id="sites.add-site.error"
				defaultMessage={ messageFormatObject.defaultMessage }
				values={ messageFormatObject.values }
			/>
		);
	}

	/**
	 * Returns the exclamationTriangle Icon in case of a warning and an exclamationCircle in case of an error.
	 *
	 * @param {Boolean} showIcon Whether to show the warning triangle icon (true) or not (false). Default = true.
	 * @returns {ReactElement} Returns null in case the input is set to false, and the warning triangle icon if true.
	 */
	renderIcon( showIcon ) {
		if ( showIcon !== true ) {
			this.iconPadding = false;

			return null;
		}

		let icon = this.props.type === "warning" ? exclamationTriangle : exclamationCircle;
		return(
			<MessageIcon iconSource={ icon } alt=""/>
		);
	}

	/**
	 * Sets the error message to be rendered, or null.
	 *
	 * @param {string} message The message to render.
	 * @returns {ReactElement} The rendered JSX element.
	 */
	getMessage( message ) {
		if ( message === "" ) {
			return null;
		}

		let messageFormatObject = this.handlePlaceholders( message );
		let finalMessage = this.toFormattedMessage( messageFormatObject );
		let errorIcon = this.renderIcon( this.props.showIcon );

		let MessageType = this.props.type === "warning" ? WarningMessage : ErrorMessage;
		let MessageBox = ( MessageType );

		return(
			<MessageBox role="alert" iconPadding={ this.iconPadding }>
				{ errorIcon }
				{ finalMessage }
			</MessageBox>
		);
	}

	/**
	 * Returns the rendered html.
	 *
	 * @returns {ReactElement} The rendered html.
	 */
	render() {
		return (
			this.getMessage( this.props.message )
		);
	}
}

ErrorHandler.propTypes = {
	message: PropTypes.string,
	type: PropTypes.string,
	showIcon: PropTypes.bool,
};

ErrorHandler.defaultProps = {
	message: "",
	showIcon: true,
};

export default injectIntl( ErrorHandler );
