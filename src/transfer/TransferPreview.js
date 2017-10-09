import React from "react";
import _isEmpty from "lodash/isEmpty";
import { getOrderUrl } from "../functions/helpers"

export default class TransferPreview extends React.Component {
	constructor( props ) {
		super( props );

		let orders        = { 1: {}, 2: {} };
		let subscriptions = { 1: {}, 2: {} };
		let others        = { 1: {}, 2: {} };

		props.orders.forEach( order => orders[ order.sourceShopId ][ order.sourceId ] = order );
		props.subscriptions.forEach( subscription => subscriptions[ subscription.sourceShopId ][ subscription.sourceId ] = subscription );

		[ { id: 1, data: props.usShopData }, { id: 2, data: props.euShopData } ].forEach( shop => {
			if ( shop.data ) {
				orders        = TransferPreview.fillOrderData( orders, shop.data.order_ids, shop.id );
				subscriptions = TransferPreview.fillOrderData( subscriptions, shop.data.subscription_ids, shop.id );
				others        = TransferPreview.fillOrderData( others, shop.data.other_ids, shop.id );
			}
		} );

		this.state = { orders, subscriptions, others };
	}

	static fillOrderData( destination, source, shopId ) {
		source.forEach( id => {
			if ( destination[ shopId ][ id ] ) {
				destination[ shopId ][ id ].inWoo = true;
				return;
			}
			destination[ shopId ][ id ] = { sourceShopId: shopId, sourceId: id, inWoo: true }
		} );

		return destination;
	}

	getObjectList( list, displayKey ) {
		return (
			<ul>
				{ Object.keys( list ).map( sourceId => {
					let obj = list[ sourceId ];
					return (
						<li key={sourceId} className={ [ obj[ displayKey ] ? "" : "warning", obj.inWoo ? "" : "error" ].join(" ") }>
							<span>{ obj[ displayKey ] || "NOT SYNCED TO MY-YOAST!" }&nbsp;</span>
							{ obj.inWoo ? <a href={ getOrderUrl( obj.sourceId, obj.sourceShopId ) } target="_blank">WooCommerce link</a> : <strong>( NOT FOUND IN WOOCOMMERCE! WILL NOT BE TRANSFERRED! )</strong> }
						</li>
					);
				} ) }
			</ul>
		);
	}

	render() {
		return (
			<div className="Preview">
				<h2>Customers</h2>
				<div><strong>All data will be transferred from:</strong> { this.props.fromCustomer.userEmail } ( { this.props.fromCustomer.username } )</div>
				<div><strong>All data will be transferred to:</strong> { this.props.toCustomer.userEmail } ( { this.props.toCustomer.username } )</div>
				<h2>Data</h2>
				{ ( ! _isEmpty( this.state.orders[1] ) ) &&
					<div><strong>US Orders:</strong>{ this.getObjectList( this.state.orders[1], "invoiceNumber" ) }</div>
				}
				{ ( ! _isEmpty( this.state.orders[2] ) ) &&
				  <div><strong>EU Orders:</strong>{ this.getObjectList( this.state.orders[2], "invoiceNumber" ) }</div>
				}
				{ ( ! _isEmpty( this.state.subscriptions[1] ) ) &&
				  <div><strong>US Subscriptions:</strong>{ this.getObjectList( this.state.subscriptions[1], "name" ) }</div>
				}
				{ ( ! _isEmpty( this.state.subscriptions[2] ) ) &&
				  <div><strong>EU Subscriptions:</strong>{ this.getObjectList( this.state.subscriptions[2], "name" ) }</div>
				}
				{ ( ! _isEmpty( this.props.sites ) ) &&
				  <div><strong>Sites:</strong><ul>{ this.props.sites.map( site => <li key={ site.id }>{ site.url }</li> ) }</ul></div>
				}
				{ ( ! _isEmpty( this.state.others[1] ) ) &&
				  <div><strong>US Other:</strong>{ this.getObjectList( this.state.other[1], "sourceId" ) }</div>
				}
				{ ( ! _isEmpty( this.state.others[2] ) ) &&
				  <div><strong>EU Other:</strong>{ this.getObjectList( this.state.other[2], "sourceId" ) }</div>
				}
			</div>
		)
	}
}
