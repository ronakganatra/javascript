import React from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape, FormattedMessage, defineMessages } from "react-intl";
import styled from "styled-components";

import defaults from "../../../config/defaults.json";
import colors from "yoast-components/style-guide/colors.json";

// Components.
import UploadUserImage from "./UploadUserImage";
import { InputField } from "../../InputField";
import { StyledLabel } from "../../Labels";

const FormGroup = styled.form`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: space-between;
	text-align: left;
`;

const LabelBlock = styled.div`
	width: 100%;
`;

const NameBlock = styled( LabelBlock )`
	width: 70%;
	padding-left: 20px;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		width: 100%;
	}

	div:last-of-type{
		margin-bottom: 0;
	}
`;

const AvatarBlock = styled.div`
	width: 30%;
	margin: auto;
	margin-top: 25px;
	text-align: center;
`;

const TextInput = styled( InputField )`
	background-color: ${ colors.$color_grey_light };
`;

const messages = defineMessages( {
	labelFirstName: {
		id: "profile.label.firstName",
		defaultMessage: "First name",
	},
	labelLastName: {
		id: "profile.label.lastName",
		defaultMessage: "Last name",
	},
} );

/**
 * A component for entering the first- and last name and
 * uploading a profile image.
 */
class ProfileDetailsBlock extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			userFirstName: this.props.userFirstName,
			userLastName: this.props.userLastName,
			imageFile: null,
		};

		this.onUpdateFirstName = this.onUpdateField.bind( this, "userFirstName" );
		this.onUpdateLastName = this.onUpdateField.bind( this, "userLastName" );
		this.onFileUpload = this.onFileUpload.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
	}

	/**
	 * Updates the given field in the state with the target value in the
	 * given event.
	 *
	 * @param {string} field the field that needs to be updated.
	 * @param {object} event the event from which to get the new value.
	 * @returns {void}
	 */
	onUpdateField( field, event ) {
		this.setState( {
			[ field ]: event.target.value,
		} );
	}

	/**
	 * Calls the onSubmit function given in the props
	 * with the entered first name, last name and image file.
	 *
	 * @param {event} event The submit event.
	 * @returns {void}
	 */
	handleSubmit( event ) {
		event.preventDefault();
		this.props.onSubmit( this.state.userFirstName, this.state.userLastName, this.state.imageFile );
	}

	/**
	 * Updates the state with the uploaded image file.
	 *
	 * @param {File} file the uploaded file (see https://developer.mozilla.org/en-US/docs/Web/API/File).
	 * @returns {void}
	 */
	onFileUpload( file ) {
		this.setState( {
			imageFile: file,
		} );
	}

	render() {
		return <FormGroup onSubmit={ this.handleSubmit }>
			<AvatarBlock>
				<UploadUserImage image={ this.props.userAvatarUrl } onFileUpload={ this.onFileUpload } />
			</AvatarBlock>

			<NameBlock id="left">
				<StyledLabel htmlFor="first-name">
					<FormattedMessage { ...messages.labelFirstName } />
				</StyledLabel>
				<TextInput
					width="100%"
					margin-right="5px"
					id="first-name"
					name="first name"
					type="text"
					value={ this.state.userFirstName }
					onChange={ this.onUpdateFirstName }
				/>
				<StyledLabel htmlFor="last-name">
					<FormattedMessage { ...messages.labelLastName } />
				</StyledLabel>
				<TextInput
					width="100%"
					id="last-name"
					name="last name"
					type="text"
					value={ this.state.userLastName }
					onChange={ this.onUpdateLastName }
				/>
			</NameBlock>
			{ this.props.children }
		</FormGroup>;
	}
}

export default injectIntl( ProfileDetailsBlock );

ProfileDetailsBlock.propTypes = {
	intl: intlShape.isRequired,
	children: PropTypes.any,
	onSubmit: PropTypes.func,
	onUploadAvatar: PropTypes.func,
	userFirstName: PropTypes.string,
	userLastName: PropTypes.string,
	userAvatarUrl: PropTypes.string,
	profileSaving: PropTypes.bool,
};

ProfileDetailsBlock.defaultProps = {
	userFirstName: "",
	userLastName: "",
	userAvatarUrl: "",
};
