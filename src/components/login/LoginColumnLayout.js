import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ColumnLayout = styled.div`
	
`;

const ColumnLeft = styled.div`
	float: left;
	width: 480px;
`;

const ColumnRight = styled.div`
	/* 480 + 48px left padding */
	margin-left: 528px;
`;

/**
 * A one or two column layout for a login / registration / reset password page.
 *
 * First child component is displayed in the left column, second is displayed on the right.
 *
 * Reverts to a one column layout when only one child is given.
 * When more then two child components are given, only the first two are shown.
 *
 * @returns {ReactElement} A two column layout containing the two children as columns.
 */
class LoginColumnLayout extends React.Component {

	constructor() {
		super();
	}

	getRightColumn() {
		return <ColumnRight>
			{ this.props.children[ 1 ] }
		</ColumnRight>;
	}

	render() {
		let twoColumns = this.props.children.length > 1;

		return (
			<ColumnLayout>
				<ColumnLeft>
					{ this.props.children[ 0 ] }
				</ColumnLeft>
				{ twoColumns ? this.getRightColumn() : null }
			</ColumnLayout>
		);
	}
}

LoginColumnLayout.propTypes = {
	children: PropTypes.any,
};

export default LoginColumnLayout;

