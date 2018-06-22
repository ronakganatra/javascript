import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors";

const Card = styled.li`
	position: relative;
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

const Banner = styled.span`
	position: absolute;
	
	top: 8px;
	left: -8px;
	
	color: ${ props => props.textColor };
	line-height: 16px;
	
	background-color: ${ props => props.backgroundColor };
	padding: 4px 16px;		
`;

const BannerTriangle = styled.span`
	position: absolute;
	
	top: 32px;
	left: -8px;
	
	/* This code makes the triangle. */
	border-top: 8px solid ${ colors.$color_purple_dark };
    border-left: 8px solid transparent;
`;

class CourseCardContainer extends React.Component {

	/**
	 * Gets the banner if a banner text is provided.
	 *
	 * @returns {React.Component} the banner or null.
	 */
	getBanner() {
		if ( this.props.bannerText ) {
			return <Fragment>
				<Banner backgroundColor={ this.props.bannerBackgroundColor }
						textColor={ this.props.bannerTextColor }>{ this.props.bannerText }</Banner>
				<BannerTriangle />
			</Fragment>;
		}
		return null;
	}

	render() {
		return <Card>
			<Image src={ this.props.image } alt="" />
			{ this.getBanner() }
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

	bannerText: PropTypes.string,
	bannerBackgroundColor: PropTypes.string,
	bannerTextColor: PropTypes.string,
};

CourseCardContainer.defaultProps = {};
