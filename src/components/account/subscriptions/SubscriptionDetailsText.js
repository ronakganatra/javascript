import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Link from "../../Link";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors";
import { LinkButton } from "../../Button";

const RedBoldString = styled.div`
	color: ${ colors.$color_red };
	font-weight: ${ "bold" };
`;

const showLinkButton = ( onClickHandler, linkText ) => {
	if ( onClickHandler ) {
		return ( <LinkButton
			onClick={ onClickHandler }
		>
			{ linkText }
		</LinkButton> );
	}
	return null;
};

const showLink = ( onClickHandler, linkText, linkTo ) => {
	if ( ! onClickHandler ) {
		return (
			<Link
				to={ linkTo }
			>
				{ linkText }
			</Link>
		);
	}
};

export const SubscriptionDetailsText = ( props ) => (
	<Fragment>
		<RedBoldString>
			{ props.redMessage }
		</RedBoldString>
		{ showLinkButton( props.onClickHandler, props.linkText ) }
		{ showLink( props.onClickHandler, props.linkText, props.linkTo ) }
	</Fragment>
);

SubscriptionDetailsText.propTypes = {
	redMessage: PropTypes.oneOfType( [ PropTypes.string, PropTypes.object ] ).isRequired,
	onClickHandler: PropTypes.func,
	linkText: PropTypes.string.isRequired,
	linkTo: PropTypes.string,
};

SubscriptionDetailsText.defaultProps = {
	linkTo: null,
	onClickHandler: null,
};
