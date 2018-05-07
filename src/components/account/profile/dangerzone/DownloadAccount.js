import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import styled from "styled-components";

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

const Section = styled.section`
	margin-bottom: 1em;
`;

class DownloadAccount extends React.Component {

	constructor( props ) {
		super( props );

		this.onDownloadProfile = this.onDownloadProfile.bind( this );
	}
	onDownloadProfile() {
		this.props.onDownloadProfile();
	}

	render() {
		return <Page>
			<Section>
				<Title>
					<FormattedMessage id={ messages.title.id } defaultMessage={ messages.title.defaultMessage }/>
				</Title>
				<Description>
					<FormattedMessage id={ messages.description.id } defaultMessage={ messages.description.defaultMessage }/>
				</Description>
				<p>
					<Button onClick={ this.onDownloadProfile }>
						<FormattedMessage id={ messages.button.id } defaultMessage={ messages.button.defaultMessage }/>
					</Button>
				</p>
			</Section>
		</Page>;
	}
}

DownloadAccount.propTypes = {
	intl: intlShape.isRequired,
	someProp: PropTypes.string,
	onDownloadProfile: PropTypes.func.isRequired,
};

DownloadAccount.defaultProps = {
	someProp: "[Some Text]",
};

export default injectIntl( DownloadAccount );
