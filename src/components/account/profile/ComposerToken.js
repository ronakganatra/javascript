import PropTypes from "prop-types";
import React from "react";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import { RowMobileCollapse, ColumnPrimary, ColumnFixedWidth, ColumnMinWidth, makeFullWidth, responsiveHeaders } from "../../Tables";
import { makeButtonFullWidth, makeResponsiveIconButton } from "../../Button";
import { LargeIconButton } from "../../Button";
import editPencil from "../../../icons/edit-pencil.svg";
import styled from "styled-components";
import defaults from "../../../config/defaults.json";

const messages = defineMessages( {
	token: {
		id: "composerTokens.overview.token",
		defaultMessage: "Token",
	},
	name: {
		id: "composerTokens.overview.name",
		defaultMessage: "Name",
	},
	manage: {
		id: "composerTokens.overview.manage",
		defaultMessage: "Manage",
	},
	manageLabel: {
		id: "composerTokens.overview.manageLabel",
		defaultMessage: "Manage this token",
	},
} );

const ColumnMinWidthResponsive = makeFullWidth( responsiveHeaders( ColumnMinWidth ) );
const ColumnPrimaryResponsive = makeFullWidth( responsiveHeaders( ColumnPrimary ) );
const ColumnFixedWidthResponsive = makeFullWidth( responsiveHeaders( ColumnFixedWidth ) );
const ResponsiveIconButton = makeButtonFullWidth( makeResponsiveIconButton( LargeIconButton ) );

const TokenRow = styled( RowMobileCollapse )`
	padding: 16px 32px;
`;

const NameColumn = styled( ColumnMinWidthResponsive )`
	max-width: 200px;
`;
const TokenColumn = styled( ColumnPrimaryResponsive )`
	word-break: break-all;
`;
const ResponsiveManageButton = styled( ResponsiveIconButton )`
		@media screen and (min-width: ${ defaults.css.breakpoint.mobile + 1 }px) and (max-width: ${ defaults.css.breakpoint.tablet }px) {
			padding-left: 56px;
		}
`;

/**
 * A page order list using table abstraction.
 *
 * @param {Object} props Properties to be passed to the table.
 * @returns {ReactElement} A row of order stuff.
 */
function ComposerToken( props ) {
	const manageMessage = props.intl.formatMessage( messages.manage );
	const manageLabel = props.intl.formatMessage( messages.manageLabel );

	return (
		<TokenRow background={ props.background }>
			<NameColumn ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.name ) }>
				{ props.name }
			</NameColumn>
			<TokenColumn headerLabel={ props.intl.formatMessage( messages.token ) }>
				{ props.id }
			</TokenColumn>
			<ColumnFixedWidthResponsive>
				<ResponsiveManageButton
					aria-label={ manageLabel }
					onClick={ () => {
						props.onManageTokenClick( {
							name: props.name,
							id: props.id,
						} );
					} }
					iconSource={ editPencil }
				>
					<span className="screen-reader-text">{ manageMessage }</span>
				</ResponsiveManageButton>
			</ColumnFixedWidthResponsive>
		</TokenRow>
	);
}

ComposerToken.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onManageTokenClick: PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	background: PropTypes.string,
};

export default injectIntl( ComposerToken );
