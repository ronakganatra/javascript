import React from "react";
import PropTypes from "prop-types";
import { defineMessages, injectIntl } from "react-intl";
import styled from "styled-components";

// Components.
import LoginMessagePaper from "./LoginMessagePaper";

const messages = defineMessages( {
	header: {
		id: "login.header",
		defaultMessage: "Welcome back!",
	},
	message: {
		id: "login.message",
		defaultMessage: "Log in with your email address and password. If you don't remember your password, just reset it!",
	},
} );

const ColumnLayout = styled.div`

`;

const ColumnLeft = styled.div`
	float: left;
	width: 480px;
`;

const ColumnRight = styled.div`
	/* 480 + 48px */
	margin-left: 528px;
`;

/**
 * A function that returns the Courses Page component.
 *
 * @returns {ReactElement} The component that contains the courses page.
 */
class LoginPage extends React.Component {
	/**
	 * Sets the CoursesPage object.
	 *
	 * @returns {void}
	 */
	constructor() {
		super();
	}

	getRightColumn() {
		return <ColumnRight>
			<LoginMessagePaper header={ messages.header } message={ messages.message }/>
		</ColumnRight>;
	}

	render() {
		let twoColumns = this.props.children > 1;

		return (
			<ColumnLayout>
				<ColumnLeft>
					<LoginMessagePaper header={ messages.header } message={ messages.message }/>
				</ColumnLeft>
				{ twoColumns ? this.getRightColumn() : null }
			</ColumnLayout>
		);
	}
}

LoginPage.propTypes = {
	children: PropTypes.array,
};

export default injectIntl( LoginPage );

