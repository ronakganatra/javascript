import React from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";
import styled from "styled-components";

// Components.
import { Button } from "../Button";

// Images.
import icon  from "../../images/greeting.png";
import logo from "../../images/my-yoast-academy-logo.svg";

const MainPaper = styled.div`
	width: 480px;
	height: 480px;
	
    text-align: center;
`;

const Icon = styled.img`
	margin-top: 20px;
	width: 200px;
`;

const Logos = styled.img`
	margin-top: 40px;
	width: 360px;
`;

/**
 * A card representing a message in a login screen,
 * e.g. "Welcome back!", "Password changed".
 *
 * Contains the MyYoast and Yoast Academy logos,
 * an image (defaults to a standard 'greeting' image) and a header.
 *
 * If an onClick handler is given, a button is rendered with the given message,
 * if none is given, the message is rendered as a paragraph.
 *
 * @returns {ReactElement} The component that contains the message
 */
class LoginMessagePaper extends React.Component {

	constructor() {
		super();

		this.onClick = this.onClick.bind( this );
	}

	onClick() {
		this.props.onClick();
	}

	renderButton() {
		return(
			<Button onClick={ this.onClick }>
				<FormattedMessage id={ this.props.message.id } defaultMessage={ this.props.message.defaultMessage }/>
			</Button>
		);
	}

	renderParagraph() {
		return (
			<p>
				<FormattedMessage id={ this.props.message.id } defaultMessage={ this.props.message.defaultMessage }/>
			</p>
		);
	}

	render() {
		return (
			<MainPaper>
				<Logos src={ logo }/>
				<Icon src={ this.props.image }/>
				<div>
					<h2>
						<FormattedMessage id={ this.props.header.id } defaultMessage={ this.props.header.defaultMessage }/>
					</h2>
					{ this.props.onClick ? this.renderButton() : this.renderParagraph() }
				</div>
			</MainPaper>
		);
	}
}

LoginMessagePaper.propTypes = {
	image: PropTypes.string,
	header: PropTypes.object,
	message: PropTypes.object,
	onClick: PropTypes.func,
};

LoginMessagePaper.defaultProps = {
	image: icon,
};

export default injectIntl( LoginMessagePaper );
