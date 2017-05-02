import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import Download from "./Download";

const DownloadsContainer = styled.div`
	display: flex;
	background-color:  ${ colors.$color_white };
	margin: 20px 0 0;
	padding: 6px;
	flex-wrap: wrap;
	align-items: flex-start;
`;

/**
 * Returns the rendered Downloads Page component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered download page.
 */
export default class Downloads extends React.Component {
	render() {
		let props = this.props;
		return (
				<DownloadsContainer>
					{ props.downloads.map( function( download ) {
						return <Download
							key={ download.product }
							product={ download.product }
							version={ download.version }
							iconSource={ download.iconSource }
							buttons={ download.buttons }
						/>;
					} ) }
				</DownloadsContainer>
		);
	}
}
