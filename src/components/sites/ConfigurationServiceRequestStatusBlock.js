import PropTypes from "prop-types";
import React from "react";
import { defineMessages, FormattedMessage, FormattedHTMLMessage, injectIntl, intlShape } from "react-intl";
import { Paper, WhitePage } from "../PaperStyles";
import CollapsibleHeader from "../CollapsibleHeader";
import { LargeButtonLink } from "../Button";
import { getConfigurationServiceReportUrl } from "../../functions/api";

const messages = defineMessages( {
	downloadReportButton: {
		id: "report.buttons.download",
		defaultMessage: "View Report",
	},
	configurationPendingHeading: {
		id: "requestConfigurationStatus.configurationPendingHeading",
		defaultMessage: "Configuration service successfully requested",
	},
	configurationPendingMessage: {
		id: "requestConfigurationStatus.configurationPendingMessage",
		defaultMessage: "Thank you for submitting the intake form, we'll take it from here and complete the SEO" +
		" configuration for this website within <strong>three business days</strong>. If you have any questions" +
		" about this process, take a look at our <a href='{ knowledgeBaseLink }'>Knowledge Base</a>.",
	},
	configurationCompletedHeading: {
		id: "requestConfigurationStatus.configurationCompletedHeading",
		defaultMessage: "Configuration service completed",
	},
	configurationCompletedMessage: {
		id: "requestConfigurationStatus.configurationCompletedMessage",
		defaultMessage: "Your configuration service has been successfully completed!",
	},
	configurationStatus: {
		id: "requestConfigurationStatus.status",
		defaultMessage: "Current status: ",
	},
	configurationPending: {
		id: "requestConfigurationStatus.pending",
		defaultMessage: "pending",
	},
	configurationInProgress: {
		id: "requestConfigurationStatus.inProgress",
		defaultMessage: "in progress",
	},
	configurationCompleted: {
		id: "requestConfigurationStatus.completed",
		defaultMessage: "completed",
	},
} );

const STATUSES = {
	submitted: "configurationPending",
	"in progress": "configurationInProgress",
	completed: "configurationCompleted",
};

class ConfigurationServiceRequestStatusBlock extends React.Component {
	getCurrentStatus() {
		if ( this.props.status === "completed" ) {
			return null;
		}
		return (
			<p>
				<FormattedMessage
					id={ messages.configurationStatus.id }
					defaultMessage={ messages.configurationStatus.defaultMessage }
				/>
				{
					Object.keys( STATUSES ).map( ( status ) => {
						const formattedMessage = (
							<FormattedMessage
								key={ status }
								id={ messages[ STATUSES[ status ] ].id }
								defaultMessage={ messages[ STATUSES[ status ] ].defaultMessage }
							/>
						);

						if ( status === this.props.status ) {
							return <strong key={ status }>{ formattedMessage }</strong>;
						}

						return formattedMessage;
					} ).reduce( ( prev, curr, i ) => [ prev, <span key={ i }> / </span>, curr ] )
				}
			</p>
		);
	}

	render() {
		let headerMessage  = messages.configurationPendingHeading;
		let contentMessage = messages.configurationPendingMessage;
		if ( this.props.status === "completed" ) {
			headerMessage  = messages.configurationCompletedHeading;
			contentMessage = messages.configurationCompletedMessage;
		}

		return (
			<Paper>
				<CollapsibleHeader
					title={ this.props.intl.formatMessage( headerMessage ) }
					isOpen={ this.props.status !== "completed" }
				>
					<WhitePage>
						<div>
							<p>
								<FormattedHTMLMessage
									id={ contentMessage.id }
									defaultMessage={ contentMessage.defaultMessage }
									values={ {
										knowledgeBaseLink: "https://kb.yoast.com",
									} }
								/>
							</p>
							<LargeButtonLink
								to={ getConfigurationServiceReportUrl( this.props.id ) }
								linkTarget="_blank"
							>
								{ this.props.intl.formatMessage( messages.downloadReportButton ) }
							</LargeButtonLink>
							{ this.getCurrentStatus() }
						</div>
					</WhitePage>
				</CollapsibleHeader>
			</Paper>
		);
	}
}

ConfigurationServiceRequestStatusBlock.propTypes = {
	id: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
	intl: intlShape.isRequired,
};

export default injectIntl( ConfigurationServiceRequestStatusBlock );
