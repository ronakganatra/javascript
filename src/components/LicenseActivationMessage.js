import React from "react";
import styled from "styled-components";
import Link from "./Link";
import colors from "yoast-components/style-guide/colors.json";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { CloseButtonTopRight } from "./Button";
import Cookies from "js-cookie";

const messages = defineMessages( {
	description: {
		id: "licenseactivation.description",
		defaultMessage: "With the introduction of MyYoast, you no longer need a license key to activate your Yoast plugins on your website.",
	},
	cta: {
		id: "licenseactivation.CTA",
		defaultMessage: "Learn how to activate a plugin on your website »",
	},
} );

const MessageContainer = styled.div`
	background-color: ${ colors.$color_ok };
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
	padding: 8px 32px;
	margin-bottom: 32px;
	text-align: center;
	position: relative;

	button {
		position: absolute;
		right: 4px;
		top: 4px;
	}
`;

const MessageLink = styled( Link )`
	color: ${ colors.$color_black };
	font-weight: 600;
	text-decoration: underline;
	&:hover, &:focus {
		color: ${ colors.$color_white };
	}
`;

/**
 * License Activation Message
 *
 * To help the customer understand what happened to licenses.
 *
 * @param {object} props Properties of the component.
 * @returns {ReactElement} Subscription component.
 * @constructor
 */
class LicenseActivationMessage extends React.Component {
	constructor()  {
		super();
		this.state = { hideMessage: ( Cookies.get( "hideLicenseActivationMessage" ) === "true" ) };
		this.onCrossClick = this.onCrossClick.bind( this );
	}

	/**
	 * Called on cross click and sets a cookie.
	 *
	 * @returns {void}
	 */
	onCrossClick() {
		Cookies.set( "hideLicenseActivationMessage", "true", { expires: 90 } );
		this.setState( { hideMessage: true } );
	}

	/**
	 * Renders the message.
	 *
	 * @returns {*} Returns an empty div if the cookie is set or returns the message.
	 */
	render() {
		if ( this.state.hideMessage ) {
			return <div></div>;
		}
		return (
			<MessageContainer>
				<div>
					<CloseButtonTopRight onClick={ this.onCrossClick }/>
				</div>
				<p>
					{ this.props.intl.formatMessage( messages.description ) }
					<br/>
					<MessageLink to="https://yoa.st/kb-activate-plugin"
					             linkTarget="_blank">{ this.props.intl.formatMessage( messages.cta ) }</MessageLink>
				</p>
			</MessageContainer>
		);
	}
}

LicenseActivationMessage.propTypes = {
	intl: intlShape.isRequired,
};

export default injectIntl( LicenseActivationMessage );
