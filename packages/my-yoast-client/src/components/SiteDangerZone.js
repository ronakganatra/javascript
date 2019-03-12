import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import CollapsibleHeader from "./CollapsibleHeader";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { RedButton } from "./Button";
import { Paper } from "./PaperStyles";
import defaults from "../config/defaults.json";

const messages = defineMessages( {
	heading: {
		id: "siteDangerZone.heading",
		defaultMessage: "Disconnect this site",
	},
	siteRemovalExplanation: {
		id: "siteDangerZone.siteDisconnect.explanation",
		defaultMessage:	"This will revoke the licenses of the active plugins listed" +
						" above and remove the site from your MyYoast account. This" +
						" will NOT delete your actual website or the plugins" +
						" themselves. You can always re-add the plugins later.",
	},
	siteRemovalButtonText: {
		id: "siteDangerZone.siteDisconnect.buttonText",
		defaultMessage: "Disconnect",
	},
	siteRemovalLoadingButtonText: {
		id: "siteDangerZone.siteDisconnect.loadingButtonText",
		defaultMessage: "Disconnecting site...",
	},
} );

const Container = styled.div`
	padding: 0 24px 16px 24px;

	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		padding: 0 24px 16px 24px;
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		padding: 0 16px 16px;
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
			<CollapsibleHeader title={ props.intl.formatMessage( messages.heading ) } isOpen={ false }>
				<Container>
					<p>{ props.intl.formatMessage( messages.siteRemovalExplanation ) }</p>
					<RedButton { ...disabled } onClick={ props.onRemove }>{ buttonText }</RedButton>
				</Container>
			</CollapsibleHeader>
		</Paper>
	);
}

SiteDangerZone.propTypes = {
	onRemove: PropTypes.func.isRequired,
	removing: PropTypes.bool.isRequired,
	intl: intlShape.isRequired,
};

export default injectIntl( SiteDangerZone );
