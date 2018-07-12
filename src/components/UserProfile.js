import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { LogoutButton } from "../components/Button";
import UserImage from "../components/UserImage";
import colors from "yoast-components/style-guide/colors.json";

const UserInfoContainer = styled.aside`
	display: flex;
	margin-left: 24px;
	padding-right: 16px;
	padding-bottom: 3em;
`;

const UserInfo = styled.div`
	// Firefox needs this for user-email break word to work.
	min-width: 0;
`;

const UserEmail = styled.p`
	color: ${colors.$color_white};
	margin: 0 12px 10px 0;
	font-size: 14px;
	word-wrap: break-word;
	overflow-wrap: break-word;
	-ms-word-break: break-all;
	word-break: break-word;
`;

/**
 * Renders the user profile component.
 *
 * @param {Object} props Component props.
 * @param {boolean} props.loggedIn Whether or not we are currently logged in.
 * @returns {ReactElement} A react component.
 */
export default function UserProfile( props ) {
	return <UserInfoContainer className="user-info">
		<UserImage {...props.displayImage} />
		<UserInfo>
			<UserEmail>{ props.displayEmail }</UserEmail>

			<LogoutButton type="button" onClick={props.onLogoutClick}>Sign out</LogoutButton>
		</UserInfo>
	</UserInfoContainer>;
}

UserProfile.propTypes = {
	displayEmail: PropTypes.string.isRequired,
	displayImage: PropTypes.shape( {
		src: PropTypes.string,
		alt: PropTypes.string,
		size: PropTypes.string,
	} ),
	onLogoutClick: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool,
	className: PropTypes.string,
};

UserProfile.defaultProps = {
	displayImage: {
		src: "",
		alt: "",
		size: "64px",
	},
	displayEmail: "",
	loggedIn: false,
	className: "",
};
