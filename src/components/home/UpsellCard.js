import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl } from "react-intl";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors";
import Link from "../Link";
import NewTabMessage from "../NewTabMessage";

const Header = styled.h2`
	padding: 0;
	margin: 16px 0;
	color: ${ colors.$color_pink_dark };
	font-weight: 50;
	font-size: 1.5em;
`;

const ListItem = styled.div`
	padding-left: 72px;
	margin-bottom: 1.5em;
	min-height: 68px;

	:last-child {
		margin-bottom: 0;
	}
`;

const Icon = styled.img`
	position: absolute;
	width: 64px;
	height: 64px;
	left: 16px;
`;

const Description = styled.p`
	margin: 0;
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
			<BoldLink to={ props.link.url } linkTarget="_blank">
				<Icon src={ props.icon } alt="" />
				{ props.link.name }
				<NewTabMessage />
			</BoldLink>
			<Description>
				<FormattedMessage
					id={ props.description.id }
					defaultMessage={ props.description.defaultMessage }
				/>
			</Description>
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
			{
				props.listPropsArray.map( ( listProps, index ) => {
					return (
						<UpsellListItem { ...listProps } key={ `${ props.id }-key-${ index }` } />
					);
				} )
			}
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
