import PropTypes from "prop-types";
import React from "react";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import { RowMobileCollapse, ColumnPrimary, ColumnFixedWidth, ColumnMinWidth, makeFullWidth, responsiveHeaders } from "../../Tables";
import { makeButtonFullWidth, makeResponsiveIconButton } from "../../Button";
import { LargeButton } from "../../Button";

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

/**
 * A page order list using table abstraction.
 *
 * @param {Object} props Properties to be passed to the table.
 * @returns {ReactElement} A row of order stuff.
 */
function ComposerToken( props ) {
	let ResponsiveManageButton = makeButtonFullWidth( makeResponsiveIconButton( LargeButton ) );

	let manageMessage = props.intl.formatMessage( messages.manage );
	let manageLabel = props.intl.formatMessage( messages.manageLabel );

	return (
		<RowMobileCollapse background={ props.background }>
			<ColumnMinWidthResponsive ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.name ) }>
				{ props.name }
			</ColumnMinWidthResponsive>
			<ColumnPrimaryResponsive headerLabel={ props.intl.formatMessage( messages.token ) }>
				{ props.id }
			</ColumnPrimaryResponsive>
			<ColumnFixedWidthResponsive>
				<ResponsiveManageButton
					aria-label={ manageLabel }
					onClick={ () => {
						props.onManageTokenClick( {
							name: props.name,
							id: props.id,
						} );
					} }
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

ComposerToken.defaultProps = {
	background: "",
};

export default injectIntl( ComposerToken );
