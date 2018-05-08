import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import styled from "styled-components";
import "whatwg-fetch";

import { prepareInternalRequest } from "../../../../functions/api";
import { getUserId } from "../../../../functions/auth";

// Custom components.
import { Page } from "../../../PaperStyles";
import { Button } from "../../../Button";


const messages = defineMessages( {
	title: {
		id: "download-account.title",
		defaultMessage: "Download account",
	},
	description: {
		id: "download-account.description",
		defaultMessage: "If you want to retrieve a copy of all the personal data" +
			" stored in your account, you can do so here.",
	},
	button: {
		id: "download-account.button",
		defaultMessage: "Download my data",
	},
} );


const Title = styled.p`
	margin-top: 0.0em;
	margin-bottom: 0.5em;
	font-weight: 300;
	font-size: 1.5em;
`;

const Description = styled.p`
	margin-bottom: 10px;
`;

const Form = styled.form`
	margin-bottom: 1em;
`;

class DownloadAccount extends React.Component {

	constructor( props ) {
		super( props );
		this.generateDownloadURL = this.generateDownloadURL.bind( this );
	}

	generateDownloadURL() {
		let userId = getUserId();
		let request = prepareInternalRequest( `Customers/${userId}/download/` );

		return request.url;
	}

	render() {
		return <Page>
			<Form action={ this.generateDownloadURL() }>
				<Title>
					<FormattedMessage id={ messages.title.id } defaultMessage={ messages.title.defaultMessage }/>
				</Title>
				<Description>
					<FormattedMessage id={ messages.description.id } defaultMessage={ messages.description.defaultMessage }/>
				</Description>
				<p>
					<Button type="submit">
						<FormattedMessage id={ messages.button.id } defaultMessage={ messages.button.defaultMessage }/>
					</Button>
				</p>
			</Form>
		</Page>;
	}
}

DownloadAccount.propTypes = {
	intl: intlShape.isRequired,
};


export default injectIntl( DownloadAccount );
