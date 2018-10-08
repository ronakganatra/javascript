import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import searchIcon from "../icons/search.svg";
import searchIconWhite from "../icons/searchWhite.svg";
import { InputField } from "./InputField";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import { LargeButton, Button } from "../components/Button.js";
import MediaQuery from "react-responsive";
import defaults from "../config/defaults.json";
import colors from "yoast-components/style-guide/colors.json";

const tabletSize = defaults.css.breakpoint.tablet + 1;
const mobileSize = defaults.css.breakpoint.mobile;

const messages = defineMessages( {
	searchLabel: {
		id: "search.label",
		defaultMessage: "Search",
	},
	description: {
		id: "search.description",
		defaultMessage: "The search results will be updated as you type.",
	},
	searchButton: {
		id: "search.button",
		defaultMessage: "Search",
	},
} );

const Searchbar = styled.div`
	text-align: left;
`;

const SearchLabel = styled.label`
	display: none;
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
	width: calc(100% - 200px);
	float: left;
	
	background-image: url( ${ searchIcon } );
	background-position: 18px 15px;
	background-size: 17px 17px;
	background-repeat: no-repeat;
	padding-left: 50px;
	margin-right: 24px;

	@media screen and ( max-width: ${ tabletSize }px ) {
		background-color: ${ colors.$color_green_dark }; 
		width: calc(100% - 86px);
		margin-right: 12px;
		padding-left: 10px;

	}

	@media screen and ( max-width: ${ mobileSize }px ) {
		width: calc(100% - 60px);
	}
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

const SearchButton = styled( LargeButton )`
	margin: 0;
`;

export const SearchiconButton = styled( Button )`
	background-color: ${ colors.$color_green_dark };
	background-repeat: no-repeat;
	background-image: url( ${ searchIconWhite } );
	background-position: center;
	background-size: 24px;
	width:  48px;
	height: 48px;
	cursor: pointer;
	box-shadow: none;
	border: 0;
	box-shadow: inset 0 -3px 0 rgba(0,0,0,0.3);
`;

/**
 * Renders the Search component.
 *
 * @param {Object} props The props to use.
 * @returns {ReactElement} The rendered html.
 */
function Search( props ) {
	/**
	 * Callback when the search request has been changed.
	 *
	 * @param {event} event The new search request.
	 *
	 * @returns {void}
	 */
	const changeSearchQuery = ( event ) => {
		props.onChange( event.target.value );
	};

	return <Searchbar>
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
		<MediaQuery query={ `(min-width: ${ tabletSize }px)` }>
			<SearchButton>
				{ props.intl.formatMessage( messages.searchButton ) }
			</SearchButton>
		</MediaQuery>
		<MediaQuery query={ `(max-width: ${ tabletSize }px)` }>
			<SearchiconButton
				aria-label={ props.intl.formatMessage( messages.searchButton ) }
			/>
		</MediaQuery>

	</Searchbar>;
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
