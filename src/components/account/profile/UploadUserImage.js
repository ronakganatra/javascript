import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { speak } from "@wordpress/a11y";

import colors from "yoast-components/style-guide/colors.json";

// Components.
import UserImage from "../../UserImage";

const UploadElement = styled.div`
	display: inline-block;
	position: relative;
	width: 150px;
	height: 150px;
`;

const UserImageContainer = styled.div`
	display: flex;
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

const ChangeButton = styled.button`
	position: absolute;
	
	bottom: 0;
	left: 0;
	
	width: 100%;
	padding: 8px;
	
	/* Style as a link */
	background: none;
	border: none;
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
	changeAriaLabel: {
		id: "userImageUpload.changeAriaDescription",
		defaultMessage: "Change profile image",
	},
	maxFileSize: {
		id: "userImageUpload.maxFileSize",
		defaultMessage: "Maximum file size {maxSize} Megabytes",
	},
	maxFileSizeExceeded: {
		id: "userImageUpload.maxFileSizeExceeded",
		defaultMessage: "The selected file is bigger than the maximum file size of {maxSize}, please select a smaller file.",
	},
	defaultImage: {
		id: "userImageUpload.defaultImageDescription",
		defaultMessage: "Default profile image",
	},
	image: {
		id: "userImageUpload.imageDescription",
		defaultMessage: "Your current profile image",
	},
} );

const avatarPlaceholder = "https://s3.amazonaws.com/yoast-my-yoast/default-avatar.png";

class UploadUserImage extends React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			error: null,
		};

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
		return file.size && file.size <= this.props.maxFileSize;
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
		} else {
			// Show and speak an error message.
			let maxFileSizeInMb = Math.floor( this.props.maxFileSize / 1000000 );

			let maxSizeExceeded = this.props.intl.formatMessage( messages.maxFileSizeExceeded,
				{ maxSize: maxFileSizeInMb } );

			speak( maxSizeExceeded, "assertive" );

			this.setState( {
				error: maxSizeExceeded,
			} );
		}
	}

	/**
	 * Returns an error message component with the given error message.
	 * @param {string | Null} message the error message to be shown on screen.
	 * @returns {React.Component} the message component.
	 */
	getErrorMessage( message ) {
		return <MaxFileSizeText aria-hidden={ true } style={ { color: colors.$color_red } }>
			{ message }
		</MaxFileSizeText>;
	}

	/**
	 * Returns a component indicating the maximum file size that can be uploaded.
	 * @returns {React.component} the component with the message.
	 */
	getMaxFileSizeMessage() {
		let maxFileSizeInMb = Math.floor( this.props.maxFileSize / 1000000 );
		return <MaxFileSizeText>
			<FormattedMessage
				values={ { maxSize: maxFileSizeInMb } }
				id={ messages.maxFileSize.id }
				defaultMessage={ messages.maxFileSize.defaultMessage } />
		</MaxFileSizeText>;
	}

	render() {
		let changeAriaLabel = this.props.intl.formatMessage( messages.changeAriaLabel );

		// Change alternative text of user avatar, depending on whether an image has been provided.
		// E.g. "default profile image" vs. "your current profile image."
		let imageDescriptionMessage = this.props.image ? messages.image : messages.defaultImage;
		let imageDescription = this.props.intl.formatMessage( imageDescriptionMessage );

		let imageSrc = this.props.image || avatarPlaceholder;

		return <UploadElement>
			<UserImageContainer>
				<UserImage alt={ imageDescription } src={ imageSrc } size="150px" />
			</UserImageContainer>
			<Overlay>
				<ChangeButton type="button" aria-label={ changeAriaLabel } onClick={ this.onClickLink }>
					<FormattedMessage { ...messages.change } />
				</ChangeButton>
			</Overlay>

			{ this.state.error ? this.getErrorMessage( this.state.error ) : this.getMaxFileSizeMessage() }

			<input ref={ fileInput => {
				this.fileInput = fileInput;
			} }
				   type={ "file" }
				   accept={ this.props.acceptedMIMETypes.join( ", " ) }
				   style={ { display: "none" } }
				   aria-hidden={ true }
				   onChange={ e => this.onFileUpload( e.target.files[ 0 ] ) }
			/>
		</UploadElement>;
	}
}

UploadUserImage.propTypes = {
	intl: intlShape.isRequired,
	image: PropTypes.string,
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
