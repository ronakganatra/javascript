import PropTypes from "prop-types";
import styled from "styled-components";

const UserImage = styled.img`
	flex: 0 0 ${ props => props.size };
	height: ${ props => props.size };
	width: ${ props => props.size };
	border-radius: 50%;
	margin-right: 12px;
	object-fit: cover;
`;

UserImage.propTypes = {
	size: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
};

UserImage.defaultProps = {
	alt: "",
};

export default UserImage;
