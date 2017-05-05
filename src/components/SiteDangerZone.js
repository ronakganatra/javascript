import React from "react";
import styled from "styled-components";
import CollapsibleHeader from "./CollapsibleHeader";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { RedButton } from "./Button";
import Paper from "./Paper";

const messages = defineMessages( {
	heading: {
		id: "site_danger_zone.heading",
		defaultMessage: "Danger zone",
	},
	siteRemovalHeading: {
		id: "site_danger_zone.site_removal.heading",
		defaultMessage: "Disconnect this site",
	},
	siteRemovalExplanation: {
		id: "site_danger_zone.site_removal.explanation",
		defaultMessage:	"This will revoke the licenses of the active plugins listed" +
						" above and remove the site from your my.yoast account. This" +
						" will NOT delete your actual website or the plugins" +
						" themselves. You can always re-add the plugins later.",
	},
	siteRemovalButtonText: {
		id: "site_danger_zone.site_removal.button_text",
		defaultMessage: "Remove",
	},
	siteRemovalLoadingButtonText: {
		id: "site_danger_zone.site_removal.loading_button_text",
		defaultMessage: "Removing site...",
	},
} );

const SubHeading = styled.h2`
	font-weight: 600;
	font-size: 1em;
`;

const Container = styled.div`
	padding: 0 40px 16px 40px;

	@media screen and ( max-width: 600px ) {
		padding: 0 20px 16px 20px;
	}
`;

/**
 * Creates Site danger zone element
 *
 * @param {object} props Properties for this element.
 * @returns {ReactElement} SiteDangerZone element.
 * @constructor
 */
function SiteDangerZone( props ) {
	let buttonText = props.intl.formatMessage( messages.siteRemovalButtonText );
	let disabled = {};
	if ( props.removing ) {
		buttonText = props.intl.formatMessage( messages.siteRemovalLoadingButtonText );
		disabled = { disabled };
	}

	return (
		<Paper>
			<CollapsibleHeader title={ props.intl.formatMessage( messages.heading ) } isOpen={ true }>
				<Container>
					<SubHeading>{ props.intl.formatMessage( messages.siteRemovalHeading ) }</SubHeading>
					<p>{ props.intl.formatMessage( messages.siteRemovalExplanation ) }</p>
					<RedButton {...disabled} onClick={ props.onRemove }>{ buttonText }</RedButton>
				</Container>
			</CollapsibleHeader>
		</Paper>
	);
}

SiteDangerZone.propTypes = {
	onRemove: React.PropTypes.func.isRequired,
	removing: React.PropTypes.bool.isRequired,
	intl: intlShape.isRequired,
};

export default injectIntl( SiteDangerZone );
