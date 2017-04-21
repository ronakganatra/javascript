import React from "react";
import styled from "styled-components";

const UserImage = styled.img`
	flex: 0 0 ${ props => props.size };
	height: ${ props => props.size };
	border-radius: 50%;
	margin-right: 12px;
`;

UserImage.propTypes = {
	size: React.PropTypes.string.isRequired,
	src: React.PropTypes.string.isRequired,
	alt: React.PropTypes.string,
};

UserImage.defaultProps = {
	alt: "",
};

export default UserImage;
