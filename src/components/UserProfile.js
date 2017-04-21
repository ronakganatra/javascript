import React from "react";
import styled from "styled-components";
import { LogoutButton } from "../components/Button";
import UserImage from "../components/UserImage";
import colors from "yoast-components/style-guide/colors.json";

const UserInfoContainer = styled.aside`
	display: flex;
	margin-left: 50px;
	padding-bottom: 60px;
`;

const UserInfo = styled.div`
`;

const UserName = styled.p`
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
			<UserName>{ props.displayName }</UserName>

			<LogoutButton type="button" onClick={props.onLogoutClick}>Sign out</LogoutButton>
		</UserInfo>
	</UserInfoContainer>;
}

UserProfile.propTypes = {
	displayName: React.PropTypes.string.isRequired,
	displayImage: React.PropTypes.shape( {
		src: React.PropTypes.string,
		alt: React.PropTypes.string,
		size: React.PropTypes.string,
	} ),
	onLogoutClick: React.PropTypes.func.isRequired,
	loggedIn: React.PropTypes.bool,
	className: React.PropTypes.string,
};

UserProfile.defaultProps = {
	displayImage: {
		src: "",
		alt: "",
		size: "64px",
	},
	displayName: "",
	loggedIn: false,
	className: "",
};
