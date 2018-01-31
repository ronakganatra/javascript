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

let ColumnMinWidthResponsive = makeFullWidth( responsiveHeaders( ColumnMinWidth ) );
let ColumnPrimaryResponsive = makeFullWidth( responsiveHeaders( ColumnPrimary ) );
let ColumnFixedWidthResponsive = makeFullWidth( responsiveHeaders( ColumnFixedWidth ) );
let ResponsiveIconButton = makeButtonFullWidth( makeResponsiveIconButton( LargeIconButton ) );

let NameColumn = styled( ColumnMinWidthResponsive )`
	max-width: 200px;
`;
let TokenColumn = styled( ColumnPrimaryResponsive )`
	word-break: break-all;
`;
let ResponsiveManageButton = styled( ResponsiveIconButton )`
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
	let manageMessage = props.intl.formatMessage( messages.manage );
	let manageLabel = props.intl.formatMessage( messages.manageLabel );

	return (
		<RowMobileCollapse background={ props.background }>
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
		</RowMobileCollapse>
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
