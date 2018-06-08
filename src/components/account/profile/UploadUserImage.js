import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

// Components.
import UserImage from "../../UserImage";

const UploadElement = styled.div`
	display: inline-block;
	position: relative;
	width: 150px;
	height: 150px;
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
		cursor: pointer;
		text-decoration: none;
	}
   	
   	text-align: center;	
`;

const MaxFileSizeText = styled.p`

	margin: 0;
	width: 100%;

	text-align: center;
	font-size: 12px;
	color: black;
`;

const messages = defineMessages( {
	change: {
		id: "userImageUpload.changeImage",
		defaultMessage: "Change",
	},
	maxFileSize: {
		id: "userImageUpload.maxFileSize",
		defaultMessage: "Max. file size {maxSize} mb",
	},
	defaultImage: {
		id: "userImageUpload.defaultImageDescription",
		defaultMessage: "default user image",
	},
} );

class UploadUserImage extends React.Component {

	constructor( props ) {
		super( props );

		this.onClickLink = this.onClickLink.bind( this );
		this.onFileUpload = this.onFileUpload.bind( this );
	}

	/**
	 * Triggers a file upload.
	 * @returns {Null} nothing
	 */
	onClickLink() {
		// Check whether the file input element has mounted first.
		if ( this.fileInput ) {
			this.fileInput.click();
		}
	}

	/**
	 * Validates the file (e.g. if it's below the
	 * max file size).
	 * @param {File} file the file that needs to be checked
	 * @returns {boolean} if the file is valid or not
	 */
	validateFile( file ) {
		return file.size <= this.props.maxFileSize;
	}

	/**
	 * Gets triggered when an image file has been selected in the
	 * file upload dialog.
	 * @param {File} file the file that has been selected
	 * @returns {Null} nothing
	 */
	onFileUpload( file ) {
		if ( file && this.validateFile( file ) ) {
			this.props.onFileUpload( file );
		}
	}

	render() {
		let maxFileSizeInMb = Math.floor( this.props.maxFileSize / 1000000 );

		let defaultImageDescription = this.props.intl.formatMessage( messages.defaultImage );

		return <UploadElement>
			<UserImage alt={ defaultImageDescription } src={ this.props.image } size="150px" />
			<Overlay>
				<ChangeLink onClick={ this.onClickLink }>
					Change
				</ChangeLink>
			</Overlay>
			<MaxFileSizeText>
				<FormattedMessage
					values={ { maxSize: maxFileSizeInMb } }
					id={ messages.maxFileSize.id }
					defaultMessage={ messages.maxFileSize.defaultMessage } />
			</MaxFileSizeText>
			<input ref={ fileInput => {
				this.fileInput = fileInput;
			} }
				   type={ "file" }
				   accept={ this.props.acceptedMIMETypes.join( ", " ) }
				   style={ { opacity: 0 } }
				   onChange={ e => this.onFileUpload( e.target.files[ 0 ] ) }
			/>
		</UploadElement>;
	}
}

UploadUserImage.propTypes = {
	intl: intlShape.isRequired,
	image: PropTypes.string.isRequired,
	onFileUpload: PropTypes.func,
	maxFileSize: PropTypes.number,
	acceptedMIMETypes: PropTypes.array,
};

UploadUserImage.defaultProps = {
	// 5 MB in binary bytes
	maxFileSize: 5242880,
	acceptedMIMETypes: [ "image/png", "image/jpeg", "image/gif" ],
};

export default injectIntl( UploadUserImage );
