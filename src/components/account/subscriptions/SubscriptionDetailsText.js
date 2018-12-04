import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Link from "../../Link";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors";

const RedBoldString = styled.div`
	color: ${ colors.$color_red };
	font-weight: ${ "bold" };
`;

export const SubscriptionDetailsText = ( props ) => (
	<Fragment>
		<RedBoldString>
			{ props.redMessage }
		</RedBoldString>
		<Link
			onClick={ props.onClickHandler }
			to={ props.linkTo }
		>
			{ props.linkText }
		</Link>
	</Fragment>
);

SubscriptionDetailsText.propTypes = {
	redMessage: PropTypes.oneOfType( [ PropTypes.string, PropTypes.object ] ).isRequired,
	onClickHandler: PropTypes.func,
	linkText: PropTypes.string.isRequired,
	linkTo: PropTypes.string.isRequired,
};

SubscriptionDetailsText.defaultProps = {
	onClickHandler: null,
};
