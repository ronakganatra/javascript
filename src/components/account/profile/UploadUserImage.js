import { injectIntl, intlShape } from "react-intl";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

// Components.
import UserImage from "../../UserImage";

const UploadElement = styled.div`
	position: relative;
	width: 120px;
	height: 120px;
`;

const translucentBlack = "rgba(0, 0, 0, 0.5)";
const transparent = "rgba(0, 0, 0, 0)";

const Overlay = styled.span`
	position: absolute;
	
	bottom: 0;
	left: 0;
	
	width: 100%;
	height: 100%;
	
	border-radius: 50%;
	
	/* Paint the bottom 25% translucent black. */
	background: linear-gradient(${transparent} 75%, ${translucentBlack} 75%);
`;

const ChangeLink = styled.a`
	position: absolute;
	
	bottom: 0;
	left: 0;
	
	width: 100%;
	padding: 8px;
	
   	color: white;
   	font-size: 12px;
   	text-decoration: underline;
   	
   	&:hover,
	&:focus {
		color: white;
	}
   	
   	text-align: center;	
`;

class UploadUserImage extends React.Component {

	constructor( props ) {
		super( props );
	}

	render() {
		return <UploadElement>
			<UserImage src={this.props.image} size="120px"/>
			<Overlay>
				<ChangeLink>
					Change
				</ChangeLink>
			</Overlay>
		</UploadElement>;
	}
}

UploadUserImage.propTypes = {
	intl: intlShape.isRequired,
	image: PropTypes.string.isRequired,
};

export default injectIntl( UploadUserImage );
