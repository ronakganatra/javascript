import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl } from "react-intl";
import { FullHeightCard } from "../Card";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors";
import LocalIcon from "../../icons/Yoast/Local_SEO_Icon_Small.svg";

const Header = styled.h2`
	padding: 0;
	margin: 0;
	margin-bottom: 15px;
	color: ${ colors.$color_pink_dark };
	font-weight: 50;
	font-size: 1.5em;
	text-decoration: none;
`;

const Details = styled.div`
	margin: 24px 0;
	flex-grow: 1;
`;

/**
 * A function that returns the Courses Progress Tab component.
 *
 * @param {Object} props The props required for the SitesCard.
 *
 * @returns {ReactElement} The component that contains the progress tab of the course page.
 */
const UpsellCard = ( props ) => {
	return (
		<FullHeightCard
			className={ "UpsellCard" }
		>
			<Details>
				<Header>
					<FormattedMessage id={ "home.upsellcard.header" } defaultMessage={ props.header } />
				</Header>
				<ul>
					<li>
						<img src={ LocalIcon } />
						<p>
							"stuff"
						</p>
					</li>
				</ul>
			</Details>
		</FullHeightCard>
	);
};

UpsellCard.propTypes = {
	header: PropTypes.string.isRequired,
};

export default injectIntl( UpsellCard );
