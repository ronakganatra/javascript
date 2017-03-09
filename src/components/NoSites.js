import React from "react";
import { RoundAddButton } from "../components/RoundButton";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import noSiteImage from "../../public/images/nosites.png";

const NoSitesContainer = styled.div`
	color: ${colors.$color_black};
	text-align: center;
`;

/**
 * The NoSites component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {XML} The rendered component
 * @constructor
 */
export default function NoSites( props ) {
	return (
		<NoSitesContainer>
			<img src={ noSiteImage } alt="" />
			{
				props.paragraphs.map( function( paragraph, key ) {
					return <p key={ key }>{ paragraph }</p>;
				} )
			}
			<RoundAddButton onClick={ props.onClick } />
		</NoSitesContainer>
	);
}

NoSites.propTypes = {
	onClick: React.PropTypes.func.isRequired,
	paragraphs: React.PropTypes.arrayOf( React.PropTypes.string ),
};

NoSites.defaultProps = {
	paragraphs: [],
};
