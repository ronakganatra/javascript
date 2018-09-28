import React from "react";
import _isEmpty from "lodash/isEmpty";
import { getOrderUrl } from "../functions/helpers"

export default class TransferPreview extends React.Component {
	constructor( props ) {
		super( props );

		let orders        = { 1: {}, 2: {}, 7: {} };
		let subscriptions = { 1: {}, 2: {}, 7: {} };
		let others        = { 1: {}, 2: {}, 7: {} };

		props.orders.forEach( order => orders[ order.sourceShopId ][ order.sourceId ] = order );
		props.subscriptions.forEach( subscription => subscriptions[ subscription.sourceShopId ][ subscription.sourceId ] = subscription );

		[
			{ id: 1, data: props.usShopData },
			{ id: 2, data: props.euShopData },
			{ id: 7, data: props.ukShopData },
		].forEach( shop => {
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

	getWooObjectList(list, displayKey ) {
		return (
			<ul role="list">
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

	getCourseEnrollmentsList() {
		return (
			<ul role="list">
				{ this.props.courseEnrollments.map( courseEnrollment => {
					let isStudent = courseEnrollment.studentId === this.props.fromCustomer.id;
					let inAcademy = this.props.academyData.course_ids.indexOf( courseEnrollment.course.sourceId.toString() ) !== -1;
					return <li key={courseEnrollment.id} className={ isStudent && ! inAcademy ? "warning" : "" }>
						<span>{ courseEnrollment.course.name } ( {courseEnrollment.status} )&nbsp;</span>
						{ ( courseEnrollment.studentId === this.props.fromCustomer.id ) &&
							"User is buyer. "
						}
						{ ( isStudent ) &&
							"User is student. " +
							( inAcademy ?	"Access will be transferred." :	"( NOT FOUND IN ACADEMY! ACCESS WILL NOT BE TRANSFERRED! )" )
						}
					</li>;
				} ) }
			</ul>
		)
	}

	render() {
		return (
			<div className="Preview">
				<h2>Customers</h2>
				<div><strong>All data will be transferred from:</strong> { this.props.fromCustomer.userEmail } ( { this.props.fromCustomer.username } )</div>
				<div><strong>All data will be transferred to:</strong> { this.props.toCustomer.userEmail } ( { this.props.toCustomer.username } )</div>
				<h2>Data</h2>
				{ ( ! _isEmpty( this.state.orders[1] ) ) &&
					<div><strong>US Orders:</strong>{ this.getWooObjectList( this.state.orders[1], "invoiceNumber" ) }</div>
				}
				{ ( ! _isEmpty( this.state.orders[2] ) ) &&
					<div><strong>EU Orders:</strong>{ this.getWooObjectList( this.state.orders[2], "invoiceNumber" ) }</div>
				}
				{ ( ! _isEmpty( this.state.orders[7] ) ) &&
					<div><strong>UK Orders:</strong>{ this.getWooObjectList( this.state.orders[7], "invoiceNumber" ) }</div>
				}
				{ ( ! _isEmpty( this.state.subscriptions[1] ) ) &&
					<div><strong>US Subscriptions:</strong>{ this.getWooObjectList( this.state.subscriptions[1], "name" ) }</div>
				}
				{ ( ! _isEmpty( this.state.subscriptions[2] ) ) &&
					<div><strong>EU Subscriptions:</strong>{ this.getWooObjectList( this.state.subscriptions[2], "name" ) }</div>
				}
				{ ( ! _isEmpty( this.state.subscriptions[7] ) ) &&
					<div><strong>UK Subscriptions:</strong>{ this.getWooObjectList( this.state.subscriptions[7], "name" ) }</div>
				}
				{ ( ! _isEmpty( this.props.sites ) ) &&
					<div><strong>Sites:</strong>
						{ /* eslint-disable-next-line jsx-a11y/no-redundant-roles */ }
						<ul role="list">{ this.props.sites.map( site => <li key={ site.id }>{ site.url }</li> ) }</ul>
					</div>
				}
				{ ( ! _isEmpty( this.state.others[1] ) ) &&
					<div><strong>US Other:</strong>{ this.getWooObjectList( this.state.other[1], "sourceId" ) }</div>
				}
				{ ( ! _isEmpty( this.state.others[2] ) ) &&
					<div><strong>EU Other:</strong>{ this.getWooObjectList( this.state.other[2], "sourceId" ) }</div>
				}
				{ ( ! _isEmpty( this.state.others[7] ) ) &&
					<div><strong>UK Other:</strong>{ this.getWooObjectList( this.state.other[7], "sourceId" ) }</div>
				}
				{ ( ! _isEmpty( this.props.courseEnrollments ) ) &&
					<div><strong>Academy:</strong>{ this.getCourseEnrollmentsList() }</div>
				}
			</div>
		)
	}
}
