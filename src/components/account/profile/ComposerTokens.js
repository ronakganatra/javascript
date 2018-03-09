import PropTypes from "prop-types";
import React from "react";
import ComposerToken from "./ComposerToken";
import { ListTable } from "../../Tables";
import Paper from "../../PaperStyles";

/**
 * Returns the rendered Orders component.
 *
 * @param {object} props Properties for this element.
 * @returns {ReactElement} PageOrderList element.
 * @constructor
 */
export default function ComposerTokens( props ) {
	let activeComposerTokens = props.composerTokens.filter( ( composerToken ) => {
		return composerToken.enabled === true;
	} );
	let composerTokensTable = <ListTable { ...props }>
		{ activeComposerTokens
			.map( ( composerToken ) => {
				return <ComposerToken
					{ ...composerToken }
					key={ composerToken.id }
					onManageTokenClick={ props.onManageTokenClick }
				/>;
			} )
		}
	</ListTable>;

	if ( props.hasPaper ) {
		return <Paper>{ composerTokensTable }</Paper>;
	}

	return composerTokensTable;
}

ComposerTokens.propTypes = {
	onManageTokenClick: PropTypes.func.isRequired,
	composerTokens: PropTypes.array,
	hasPaper: PropTypes.bool,
};

ComposerTokens.defaultProps = {
	composerTokens: [],
	hasPaper: true,
};
