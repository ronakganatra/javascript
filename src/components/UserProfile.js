import React from "react";

import styled from "styled-components";

import { LogoutButton } from "../components/Button";

const UserImage = styled.img`
	border-radius: 100px;
	float: left;
	margin-right: 15px;
`;

const UserInfo = styled.span`
	float: left;
`;

const UserName = styled.span`
	color: #FFF;
	width: 100%;
	float: left;
	margin-bottom: 10px;
`;


export default function UserProfile( props ) {
	let loggedIn = null;
	if ( props.loggedIn ) {
		loggedIn = "You are logged in!";
	}

	return <div>
		<UserImage src={props.displayImage} />

		<UserInfo>
			<UserName>{ props.displayName }</UserName>

			<LogoutButton type="button" onClick={props.onLogoutClick}>Sign out</LogoutButton>
		</UserInfo>
	</div>
}

UserProfile.propTypes = {
	displayName: React.PropTypes.string.isRequired,
	displayImage: React.PropTypes.string,
	onLogoutClick: React.PropTypes.func.isRequired,
	loggedIn: React.PropTypes.bool,
};

UserProfile.defaultProps = {
	displayName: "",
	displayImage: "https://gravatar.com/avatar/f08c3c3253bf14b5616b4db53cea6b78?s=80",
	loggedIn: false
};
