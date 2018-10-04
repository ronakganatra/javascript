import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl } from "react-intl";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors";
import Link from "../Link";

const Header = styled.h2`
	padding: 0;
	margin: 16px 0;
	color: ${ colors.$color_pink_dark };
	font-weight: 50;
	font-size: 1.5em;
	text-decoration: none;
`;

const ListContainer = styled.div`
	margin: 0;
	flex-grow: 1;
`;

const ListItem = styled.div`
	white-space: nowrap;
	display: flex;
	box-sizing: border-box;
	:not(:last-child) {
		margin-bottom: 1.5em;
	}
`;

const Block = styled.div`
	display: inline-block;
`;

const TextBlock = styled( Block )`
	margin-left: 8px;
	vertical-align: top;
`;

const Icon = styled.img`
	width: 64px;
	height: 64px;
	display: block;
`;

const Description = styled.p`
	margin: 0;
	white-space: normal;
	max-width: 100%;
	line-height: 1.4;
`;

const BoldLink = styled( Link )`
	font-weight: bold;
`;

/**
 * A function that returns the UpsellListItem, which is a collection of icon, link, and description.
 *
 * @param {Object} props The props for the UpsellListItem component.
 *
 * @returns {ReactElement} The UpsellListItem.
 */
const UpsellListItem = ( props ) => {
	return (
		<ListItem>
			<Block>
				<Icon src={ props.icon } />
			</Block>
			<TextBlock>
				<BoldLink to={ props.link.url } linkTarget="_blank">{ props.link.name }</BoldLink>
				<Description>
					<FormattedMessage
						id={ props.description.id }
						defaultMessage={ props.description.defaultMessage }
					/>
				</Description>
			</TextBlock>
		</ListItem>
	);
};

UpsellListItem.propTypes = {
	icon: PropTypes.string.isRequired,
	link: PropTypes.shape(
		{
			name: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		}
	),
	description: PropTypes.shape(
		{
			id: PropTypes.string.isRequired,
			defaultMessage: PropTypes.string.isRequired,
		}
	),
};

/**
 * A function that returns the UpsellCard component.
 *
 * @param {Object} props The props required for the UpsellCard component.
 *
 * @returns {ReactElement} The UpsellCard component.
 */
const UpsellCard = ( props ) => {
	return (
		<Fragment>
			<Header>
				<FormattedMessage id={ `${ props.id }.${ props.header.id }` } defaultMessage={ props.header.defaultMessage } />
			</Header>
			<ListContainer>
				{
					props.listPropsArray.map( ( listProps, index ) => {
						return (
							<UpsellListItem { ...listProps } key={ `${ props.id }-key-${ index }` } />
						);
					} )
				}
			</ListContainer>
		</Fragment>
	);
};

UpsellCard.propTypes = {
	id: PropTypes.string,
	header: PropTypes.object.isRequired,
	listPropsArray: PropTypes.array.isRequired,
};

UpsellCard.defaultProps = {
	id: null,
};

export default injectIntl( UpsellCard );
