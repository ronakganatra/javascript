import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import Product from "./Product";
import { ListHeading } from "./Headings";

const ProductsContainer = styled.div`
	display: flex;
	background-color: ${ colors.$color_white };
	padding: 0 24px 24px 24px;
	margin: 0 0 0 8px;
	flex-wrap: wrap;
	width: 100%;
	align-items: stretch;
`;

const ProductsListHeading = styled( ListHeading )`
	width: calc( 100% - 16px );
	font-size: 22px;
	margin: 0 0 24px 0px;
	padding: 0 0 24px 0;
`;

/**
 * Returns the rendered Products component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered products page.
 */
export default class Products extends React.Component {
	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const props = this.props;
		return (
			<ProductsContainer>
				<ProductsListHeading>
					{ props.heading }
					{ props.byLine }
				</ProductsListHeading>
				{ props.noResults }
				{ props.products.map( function( product ) {
					return <Product
						key={ product.glNumber }
						name={ product.name }
						glNumber={ product.glNumber }
						currentVersion={ product.currentVersion }
						icon={ product.icon }
						buttons={ product.buttons }
						composerToken={ props.composerToken }
						onComposerHelpModalOpen={ props.onComposerHelpModalOpen }
						onComposerHelpModalClose={ props.onComposerHelpModalClose }
						type={ product.category }
					/>;
				} ) }
			</ProductsContainer>
		);
	}
}

Products.propTypes = {
	byLine: PropTypes.element,
	heading: PropTypes.string.isRequired,
	noResults: PropTypes.string,
	composerToken: PropTypes.object,
	onComposerHelpModalOpen: PropTypes.func,
	onComposerHelpModalClose: PropTypes.func,
	composerHelpProductName: PropTypes.string,
};

Products.defaultProps = {
	byLine: null,
	noResults: "",
	onComposerHelpModalClose: () => {},
	onComposerHelpModalOpen: () => {},
};
