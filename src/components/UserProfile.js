import React from "react";

import styled from "styled-components";
import { LogoutButton } from "../components/Button";
import colors from "yoast-components/style-guide/colors.json";

const UserInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
`;

const UserImage = styled.img`
	height: ${ props => props.size }
	width: ${ props => props.size }
	border-radius: 50%;
	margin-right: 10px;
`;

UserImage.propTypes = {
	size: React.PropTypes.string.isRequired,
	src: React.PropTypes.string.isRequired,
	alt: React.PropTypes.string,
};

UserImage.defaultProps = {
	alt: "",
};

const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: 10px;
`;

const UserName = styled.div`
	color: ${colors.$color_white};
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
	return <UserInfoContainer>
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
};

UserProfile.defaultProps = {
	displayImage: {
		src: "",
		alt: "",
		size: "64px",
	},
	displayName: "Joost de Valk",
	loggedIn: false,
};
