import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import colors from "yoast-components/style-guide/colors.json";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { CloseButtonTopRight } from "../Button";
import Cookies from "js-cookie";
import IngeAvatar from "../../images/inge-avatar.png";
import UserImage from "../UserImage";

const messages = defineMessages( {
	intro: {
		id: "ingeBanner.intro",
		defaultMessage: "Psst, did you know...?",
	},
	message: {
		id: "ingeBanner.message",
		defaultMessage: "Inge is always ready to listen to her colleagues, she works really hard to get things done and" +
		" wants to make Yoast better, together. So you want something done? Inge is the one!",
	},
} );

const MessageContainer = styled.div`
	background-color: ${ colors.$color_white };
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

const AvatarImage = styled( UserImage )`
	float: left;
`;

const Message = styled.p`
	text-align: left;
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
		this.state = { hideMessage: ( Cookies.get( "hideIngeBanner" ) === "true" ) };
		this.onCrossClick = this.onCrossClick.bind( this );
	}

	/**
	 * Called on cross click and sets a cookie.
	 *
	 * @returns {void}
	 */
	onCrossClick() {
		Cookies.set( "hideIngeBanner", "true", { expires: 90 } );
		this.setState( { hideMessage: true } );
	}

	/**
	 * Renders the message.
	 *
	 * @returns {*} Returns an empty div if the cookie is set or returns the message.
	 */
	render() {
		if ( ! this.props.display || this.state.hideMessage ) {
			return <div></div>;
		}
		return (
			<MessageContainer>
				<div>
					<CloseButtonTopRight onClick={ this.onCrossClick }/>
				</div>
				<AvatarImage src={ IngeAvatar } size="100px" />
				<Message>
					<strong>{ this.props.intl.formatMessage( messages.intro ) }</strong>
					<br/>
					{ this.props.intl.formatMessage( messages.message ) }
				</Message>
			</MessageContainer>
		);
	}
}

LicenseActivationMessage.propTypes = {
	intl: intlShape.isRequired,
	display: PropTypes.boolean,
};

const mapStateToProps = ( state ) => {
	const display = state.user.data.profile.email.endsWith( "@yoast.com" );

	return { display };
};

export default connect( mapStateToProps )( injectIntl( LicenseActivationMessage ) );
