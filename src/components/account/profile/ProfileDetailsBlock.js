import React from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape, FormattedMessage, defineMessages } from "react-intl";
import styled from "styled-components";

import defaults from "../../../config/defaults.json";

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
	text-align: center;
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

	onUpdateField( type, event ) {
		this.setState( {
			[ type ]: event.target.value,
		} );
	}

	handleSubmit() {
		this.props.onSubmit( this.state.userFirstName, this.state.userLastName, this.state.imageFile );
	}

	onFileUpload( file ) {
		this.setState( {
			imageFile: file,
		} );
	}

	render() {
		return <FormGroup onSubmit={ this.props.onSubmit }>
			<AvatarBlock>
				<UploadUserImage onFileUpload={ this.onFileUpload } />
			</AvatarBlock>

			<NameBlock id="left">
				<StyledLabel htmlFor="first-name">
					<FormattedMessage
						id={ messages.labelFirstName.id }
						defaultMessage={ messages.labelFirstName.defaultMessage }
					/>
				</StyledLabel>
				<InputField
					width="100%"
					margin-right="5px"
					id="first-name"
					name="first name"
					type="text"
					value={ this.state.userFirstName }
					onChange={ this.onUpdateFirstName }
				/>
				<StyledLabel htmlFor="last-name">
					<FormattedMessage
						id={ messages.labelLastName.id }
						defaultMessage={ messages.labelLastName.defaultMessage }
					/>
				</StyledLabel>
				<InputField
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
};

ProfileDetailsBlock.defaultProps = {
	userFirstName: "",
	userLastName: "",
};
