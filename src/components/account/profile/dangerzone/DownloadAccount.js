import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import styled from "styled-components";
import defaults from "../../../../config/defaults.json";
import "whatwg-fetch";

import { getDownloadProfileUrl } from "../../../../functions/api";
import { getUserId } from "../../../../functions/auth";

// Custom components.
import { Button } from "../../../Button";
import { Form } from "../FormElements";


const messages = defineMessages( {
	title: {
		id: "download-account.title",
		defaultMessage: "Download personal data",
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
	font-weight: 700;
	font-size: 1em;
`;

const Description = styled.p`
	margin-bottom: 10px;
`;

const DownloadButton = styled( Button )`
	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		width: 100%;
	}
`;

class DownloadAccount extends React.Component {
	constructor( props ) {
		super( props );
		this.generateDownloadURL = this.generateDownloadURL.bind( this );
	}

	generateDownloadURL() {
		const userId = getUserId();
		return getDownloadProfileUrl( userId );
	}

	render() {
		return <Form action={ this.generateDownloadURL() }>
			<Title>
				<FormattedMessage id={ messages.title.id } defaultMessage={ messages.title.defaultMessage } />
			</Title>
			<Description>
				<FormattedMessage id={ messages.description.id } defaultMessage={ messages.description.defaultMessage } />
			</Description>
			<p>
				<DownloadButton type="submit">
					<FormattedMessage id={ messages.button.id } defaultMessage={ messages.button.defaultMessage } />
				</DownloadButton>
			</p>
		</Form>
		;
	}
}

DownloadAccount.propTypes = {
	intl: intlShape.isRequired,
};


export default injectIntl( DownloadAccount );
