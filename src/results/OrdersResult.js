import React, {Component} from "react";
import BaseResult from "./BaseResult";

export default class OrdersResult extends Component {
	/**
	 * Renders this component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		let url = `https://yoast.com/wp/wp-admin/post.php?post=${ this.props.result.sourceId }&action=edit`;
		if ( this.props.result.sourceShopId === 2 ) {
			url = `https://yoast.com/eu/wp-admin/post.php?post=${ this.props.result.sourceId }&action=edit`;
		}

		let urlKey = this.props.result.id + '-url';
		let urlRow = (
			<tr key={ urlKey }>
				<th>Url</th>
				<td><a href={ url } target="_blank">{ url }</a></td>
			</tr>
		);

		return <BaseResult { ...this.props } additionalRows={ [ urlRow ] }/>
	}
}
