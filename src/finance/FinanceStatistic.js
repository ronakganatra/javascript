import moment      from "moment-timezone";
import _sumBy      from "lodash/sumBy";
import _isArray    from "lodash/isArray";
import _isNumber   from "lodash/isNumber";
import _isFunction from "lodash/isFunction";

export default class FinanceStatistic {
	static groupByDate( format ) {
		return ( item => moment( item.date).tz( "Europe/Amsterdam" ).format( format ) )
	}

	static totalGroup() {
		return 'total';
	}

	static transactionsCount() {
		return 1;
	}

	static getOrderRevenue( order ) {
		return order.subtotalAmount - order.discountTotal;
	}

	static getRefundRevenue( refund ) {
		return _sumBy( refund.refundLineItems, "subtotalAmount" ) * -1;
	}

	/**
	 *
	 * @param {object}   options                   Options for this statistic.
	 * @param {function} options.orderGroupBy      A function to group orders by.
	 * @param {function} options.refundGroupBy     A function to group refunds by.
	 * @param {function} [options.orderCondition]  A conditional that must be met for collecting statistics on a given order.
	 * @param {function} [options.refundCondition] A conditional that must be met for collecting statistics on a given refund.
	 */
	constructor( options ) {
		this.orderGroupBy     = options.orderGroupBy;
		this.refundGroupBy    = options.refundGroupBy;
		this.orderCondition   = options.orderCondition;
		this.refundCondition  = options.refundCondition;
		this.orderCollectors  = options.orderCollectors;
		this.refundCollectors = options.refundCollectors;
	}

	collect( orders, refunds ) {
		let statistics = {};

		statistics = FinanceStatistic.collectFromCollection( statistics, orders, this.orderGroupBy, this.orderCollectors, this.orderCondition );
		statistics = FinanceStatistic.collectFromCollection( statistics, refunds, this.refundGroupBy, this.refundCollectors, this.refundCondition );

		return statistics;
	}

	static collectFromCollection( statistics, collection, groupBy, collectors, condition ) {
		for ( let i = 0; i < collection.length; i++ ) {
			let item  = collection[ i ];

			if ( _isFunction( condition ) ) {
				if ( ! condition( item ) ) {
					continue;
				}
			}

			let group = groupBy( item );

			statistics[ group ] = statistics[ group ] || {};

			for ( let statistic in collectors ) {
				if ( ! collectors.hasOwnProperty(statistic) ) {
					continue;
				}

				let collector = collectors[statistic];
				let gathered  = collector( item );

				switch( true ) {
					case _isArray( gathered ):
						statistics[ group ][ statistic ] = statistics[ group ][ statistic ] || [];
						statistics[ group ][ statistic ].push( gathered );
						break;
					case _isNumber( gathered ):
						statistics[ group ][ statistic ] = statistics[ group ][ statistic ] || 0;
						statistics[ group ][ statistic ] += gathered;
						break;
				}
			}
		}

		return statistics;
	}
}
