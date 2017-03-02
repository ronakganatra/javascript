import React from "react";

import styled from "styled-components";

import { LogoutButton } from "../components/Button";

const UserImage = styled.img`
	border-radius: 100px;
	float: left;
	margin-right: 35px;
`;

const UserInfo = styled.span`
	float: left;
`;

const UserName = styled.span`
	color: #FFF;
	width: 100%;
	float: left;
	margin-bottom: 10px;
	font-size: 14px;
`;

/**
 * @param {Object} props Component props.
 * @param {boolean} props.loggedIn Whether or not we are currently logged in.
 * @returns {ReactElement} A react component.
 * @constructor
 */
export default function UserProfile( props ) {
	return <div>
		<UserImage src={props.displayImage} />

		<UserInfo>
			<UserName>{ props.displayName }</UserName>

			<LogoutButton type="button" onClick={props.onLogoutClick}>Sign out</LogoutButton>
		</UserInfo>
	</div>;
}

UserProfile.propTypes = {
	displayName: React.PropTypes.string.isRequired,
	displayImage: React.PropTypes.string,
	onLogoutClick: React.PropTypes.func.isRequired,
	loggedIn: React.PropTypes.bool,
};

UserProfile.defaultProps = {
	displayName: "",
	displayImage: "",
	loggedIn: false,
};
