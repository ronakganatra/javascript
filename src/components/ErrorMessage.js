import PropTypes from "prop-types";
import React from "react";
import { injectIntl, defineMessages, FormattedMessage } from "react-intl";
import warningTriangle from "../icons/exclamation-triangle.svg";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import defaults from "../config/defaults.json";

let messages = defineMessages( {
	contactSupportLink: {
		id: "contact.support.link",
		defaultMessage: "please contact support",
	},
} );

const YellowWarning = styled.div`
	padding: 4px;
	background-color: ${ colors.$color_yellow };
	margin: 0.5em 0;
	overflow: auto;
	display: flex;
	align-items: center;
	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile } ) {
		flex-direction: column;
		text-align: left;
	}
`;

const NoActiveProductIcon = styled.img`
	width: 15%;
	height: 10%;
	padding: 20px;
	min-width: 75px;
	display: flex;
	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile } ) {
		padding: 10px;
	}
`;

const WarningText = styled.span`
	font-size: 1em;
`;

const PurpleLink = styled.a`
	color: ${ colors.$color_purple };
`;

class ErrorMessage extends React.Component {
	/**
	 * Sets the ErrorMessage object.
	 *
	 * @param {Object} props The props passed to the component.
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );
	}

	/**
	 * Sets the error message to be rendered, or null.
	 *
	 * @param {string} errorMessage The error message to render.
	 * @returns {ReactElement} The rendered JSX element.
	 */
	getErrorMessage( errorMessage ) {
		if ( errorMessage.length <= 0 ) {
			return null;
		}

		let contactLink = "";
		let defaultMessage = "{ errorMessage }";
		let values = { errorMessage };

		if ( errorMessage.indexOf( "[customer_support_link]" ) > -1 ) {
			errorMessage = errorMessage.replace( "[customer_support_link]", "" );
			contactLink = (
				<PurpleLink href="mailto:support@yoast.com">
					<FormattedMessage id={ messages.contactSupportLink.id } defaultMessage={ messages.contactSupportLink.defaultMessage } />
				</PurpleLink> );
			defaultMessage = "{ errorMessage }{ contactLink }.";
			values = Object.assign( values, values, { errorMessage, contactLink } );
		}

		return(
			<YellowWarning role="alert">
				<NoActiveProductIcon src={ warningTriangle } alt=""/>
				<WarningText>
					<FormattedMessage
						id="sites.add-site.error"
						defaultMessage={ defaultMessage }
						values={ values }
					/>
				</WarningText>
			</YellowWarning>
		);
	}

	/**
	 * Returns the rendered html.
	 *
	 * @returns {ReactElement} The rendered html.
	 */
	render() {
		return (
			<div>
				{ this.getErrorMessage( this.props.errorMessage ) }
			</div>
		);
	}
}

ErrorMessage.propTypes = {
	errorMessage: PropTypes.string,
};

ErrorMessage.defaultProps = {
	errorMessage: "",
};

export default injectIntl( ErrorMessage );
