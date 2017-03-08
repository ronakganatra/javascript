import React from "react";
import colors from "yoast-components/style-guide/colors.json";
import styled from "styled-components";
import searchIcon from "../icons/search.svg";

const SearchLabel = styled.label`
	background-image: url( ${searchIcon} );
	background-size: 25px;
	background-position: center;
	background-repeat: no-repeat;
	width: 30px;
	height: 60px;
	float: left;
	margin-right: 10px;
`;

SearchLabel.propTypes = {
	className: React.PropTypes.string,
	htmlFor: React.PropTypes.string,
};

SearchLabel.defaultProps = {
	className: "",
	htmlFor: "",
};

const SearchLabelText = styled.span`
`;

const SearchField = styled.input`
	width: 85%;
	height: 60px;
	box-shadow:inset 0 0 9px 1px ${colors.$color_grey};
	background: ${colors.$color_background_light};
	border: 0;
	padding: 0 0 0 10px;
	font-size: 18px;
	font-family: "Open Sans";
	width: calc(100% - 50px);
`;

SearchField.propTypes = {
	id: React.PropTypes.string.isRequired,
	type: React.PropTypes.string,
	placeholder: React.PropTypes.string,
	"aria-describedby": React.PropTypes.string,
};

SearchField.defaultProps = {
	type: "text",
	placeholder: "",
	"aria-describedby": "",
};

const SearchDescription = styled.p`
	
`;

SearchDescription.propTypes = {
	className: React.PropTypes.string,
	id: React.PropTypes.string,
};

SearchDescription.defaultProps = {
	className: "",
	id: "",
};

/**
 * Renders the Search component.
 *
 * @param {Object} props The props to use.
 * @returns {XML} The rendered html.
 */
export default function Search( props ) {
	return <div>
		<SearchLabel htmlFor={props.id}>
			<SearchLabelText className="screen-reader-text">{props.searchLabel}</SearchLabelText>
		</SearchLabel>
		<SearchField type="text" id={props.id} placeholder={props.placeholder} aria-describedby={props.descriptionId} />
		<SearchDescription className="screen-reader-text" id={props.descriptionId}>
			{props.description}
		</SearchDescription>
	</div>;
}

Search.propTypes = {
	searchLabel: React.PropTypes.string,
	id: React.PropTypes.string.isRequired,
	placeholder: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	descriptionId: React.PropTypes.string.isRequired,
};

Search.defaultProps = {
	searchLabel: "Search",
};
