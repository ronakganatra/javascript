import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import searchIcon from "../icons/search.svg";
import { InputField } from "./InputField";
import { defineMessages, injectIntl, intlShape } from "react-intl";

const messages = defineMessages( {
	searchLabel: {
		id: "search.label",
		defaultMessage: "Search",
	},
	description: {
		id: "search.description",
		defaultMessage: "The search results will be updated as you type.",
	},
} );

const SearchLabel = styled.label`
	background-image: url( ${ searchIcon } );
	background-size: 25px;
	background-position: left center;
	background-repeat: no-repeat;
	width: 40px;
	height: 50px;
	float: left;
`;

SearchLabel.propTypes = {
	className: PropTypes.string,
	htmlFor: PropTypes.string,
};

SearchLabel.defaultProps = {
	className: "",
	htmlFor: "",
};

const SearchLabelText = styled.span`
`;

const SearchField = styled( InputField )`
	width: calc(100% - 40px);
`;

SearchField.propTypes = {
	id: PropTypes.string.isRequired,
	type: PropTypes.string,
	value: PropTypes.string,
	"aria-describedby": PropTypes.string,
};

SearchField.defaultProps = {
	type: "text",
	"aria-describedby": "",
};

/**
 * Renders the Search component.
 *
 * @param {Object} props The props to use.
 * @returns {ReactElement} The rendered html.
 */
function Search( props ) {
	const changeSearchQuery = ( event ) => {
		props.onChange( event.target.value );
	};

	return <div>
		<SearchLabel htmlFor={ props.id }>
			<SearchLabelText className="screen-reader-text">
				{ props.searchLabel ? props.searchLabel : props.intl.formatMessage( messages.searchLabel ) }
			</SearchLabelText>
		</SearchLabel>
		<SearchField
			type="text"
			id={ props.id }
			value={ props.query }
			aria-describedby={ props.descriptionId }
			onChange={ changeSearchQuery }
			autoComplete="off"
			autoCorrect="off"
			autoCapitalize="off"
			spellCheck="false"
		/>
		<p className="screen-reader-text" id={ props.descriptionId }>
			{ props.description ? props.description : props.intl.formatMessage( messages.description ) }
		</p>
	</div>;
}

export default injectIntl( Search );

Search.propTypes = {
	searchLabel: PropTypes.string,
	id: PropTypes.string.isRequired,
	description: PropTypes.string,
	descriptionId: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	query: PropTypes.string,
	intl: intlShape.isRequired,
};
