import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import styled from "styled-components";

// Custom components.
import { Page } from "../../../PaperStyles";
import { RedButton } from "../../../Button";


const messages = defineMessages( {
	dangerZone: {
		id: "profile.label.dangerZone",
		defaultMessage: "Danger zone",
	},
	labelDelete: {
		id: "profile.label.delete",
		defaultMessage: "Delete account",
	},
	deletingAccount: {
		id: "profile.deleting",
		defaultMessage: "Deleting your account...",
	},
	deleteAccount: {
		id: "profile.delete",
		defaultMessage: "Delete your account",
	},
	warningMessage: {
		id: "profile.delete.message",
		defaultMessage: "Warning! If you delete your account you lose access to" +
		" your downloads and you will no longer receive updates for any Premium" +
		" plugins you've bought from us.",
	},
} );


const Paragraph = styled.p`
	margin-top: 0.0em;
	margin-bottom: 0.5em;
	font-size: 1.5em;
	font-weight: 300;
`;

const DeleteButton = styled( RedButton )`
	margin: 1em 0;
`;

class DeleteAccount extends React.Component {

	constructor( props ) {
		super( props );
		this.handleDelete = this.handleDelete.bind( this );
	}

	handleDelete( event ) {
		event.preventDefault();
		this.props.onDeleteProfile();
	}

	/**
	 * Creates the text to be displayed on the save button.
	 *
	 * @returns {string} Text to be used on the submit button.
	 */
	deleteButtonText() {
		return this.props.isDeleting
			? <FormattedMessage id={ messages.deletingAccount.id } defaultMessage={ messages.deletingAccount.defaultMessage}/>
			: <FormattedMessage id={ messages.deleteAccount.id } defaultMessage={ messages.deleteAccount.defaultMessage }/>;
	}

	render() {
		return <Page>
					<form onSubmit={ this.handleDelete }>
						<Paragraph>
							<FormattedMessage id={ messages.labelDelete.id } defaultMessage={ messages.labelDelete.defaultMessage }/>
						</Paragraph>
						<p>
							<FormattedMessage id={ messages.warningMessage.id } defaultMessage={ messages.warningMessage.defaultMessage }/>
						</p>
						<DeleteButton type="submit" disabled={ this.isDeleting }>{ this.deleteButtonText() }</DeleteButton>
					</form>
				</Page>;
	}
}

DeleteAccount.propTypes = {
	intl: intlShape.isRequired,
	onDeleteProfile: PropTypes.func.isRequired,
	isDeleting: PropTypes.bool,
};

DeleteAccount.defaultProps = {
	someProp: "[Some Text]",
	isDeleting: false,
};

export default injectIntl( DeleteAccount );
