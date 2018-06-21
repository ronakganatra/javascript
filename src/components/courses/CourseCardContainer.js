import React from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors";

const Card = styled.li`
	background-color: ${ colors.$color_white };
	width: 288px;
	font-size: 1em;
	list-style-type: none;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
`;

const Image = styled.img`
	width: 100%;
`;

const Details = styled.div`
	margin: 0px;
	padding: 20px;
	padding-top: 10px;
	
	border-bottom: 1px ${ colors.$color_grey } solid;
`;

const Header = styled.h2`
	padding: 0;
	margin: 0;
	margin-bottom: 15px;
	
	color: ${ colors.$color_pink_dark };
	font-weight: 50;
`;

const Description = styled.p`
	margin: 0;
`;

class CourseCardContainer extends React.Component {

	render() {
		return <Card>
			<Image src={ this.props.image } alt="" />
			<Details>
				<Header>{ this.props.title }</Header>
				<Description>
					{ this.props.description }
				</Description>
			</Details>
			{ this.props.children }
		</Card>;
	}
}

export default injectIntl( CourseCardContainer );

CourseCardContainer.propTypes = {
	intl: intlShape.isRequired,
	description: PropTypes.string,
	title: PropTypes.string,
	image: PropTypes.string,
	children: PropTypes.any,
};

CourseCardContainer.defaultProps = {};
