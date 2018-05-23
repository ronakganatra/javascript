import React from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";
import styled from "styled-components";

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
 * e.g. "Welcome back!", "Almost there!".
 *
 * Contains the MyYoast and Yoast Academy logos,
 * an image (defaults to a standard 'greeting' image),
 * and a message with a header.
 *
 * @returns {ReactElement} The component that contains the courses page.
 */
class LoginMessagePaper extends React.Component {
	/**
	 * Sets the CoursesPage object.
	 *
	 * @returns {void}
	 */
	constructor() {
		super();
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
					<p>
						<FormattedMessage id={ this.props.message.id } defaultMessage={ this.props.message.defaultMessage }/>
					</p>
				</div>
			</MainPaper>
		);
	}
}

LoginMessagePaper.propTypes = {
	image: PropTypes.string,
	header: PropTypes.object,
	message: PropTypes.object,
};

LoginMessagePaper.defaultProps = {
	image: icon,
};

export default injectIntl( LoginMessagePaper );
