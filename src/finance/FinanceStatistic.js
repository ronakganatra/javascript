import moment      from "moment-timezone";
import _sumBy      from "lodash/sumBy";
import _isArray    from "lodash/isArray";
import _isNumber   from "lodash/isNumber";
import _isFunction from "lodash/isFunction";

export default class FinanceStatistic {
	/**
	 * Returns a groupBy function for grouping by a specified date format.
	 *
	 * @param {string} format The date format to group by.
	 *
	 * @returns {function(*)} The groupBy function.
	 */
	static groupByDate( format ) {
		return ( item => moment( item.date).tz( "Europe/Amsterdam" ).format( format ) )
	}

	/**
	 * A groupBy function for grouping in a single total group.
	 *
	 * @returns {string} The total group.
	 */
	static totalGroup() {
		return 'total';
	}

	/**
	 * A collector for counting transactions.
	 *
	 * @returns {number} The amount of transactions, always 1.
	 */
	static transactionsCount() {
		return 1;
	}

	/**
	 * A collector for counting revenue of orders.
	 *
	 * @param {Object} order The order to count revenue for.
	 *
	 * @returns {number} The revenue of the given order.
	 */
	static getOrderRevenue( order ) {
		return order.subtotalAmount - order.discountTotal;
	}

	/**
	 * A collector for counting revenue of refunds.
	 *
	 * @param {Object} refund The refund to count revenue for.
	 *
	 * @returns {number} The revenue of the given refund.
	 */
	static getRefundRevenue( refund ) {
		if ( refund.refundLineItems.length === 0 && refund.order && refund.amount === refund.order.totalAmount ) {
			return ( refund.order.subtotalAmount - refund.order.discountTotal ) * -1;
		}
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

	/**
	 * Collect data for this statistics from the given orders and refunds.
	 *
	 * @param {array} [orders=[]]  A list of orders to collect statistics from.
	 * @param {array} [refunds=[]] A list of refunds to collect statistics from.
	 *
	 * @returns {Object} The gathered statistics.
	 */
	collect( orders = [], refunds = [] ) {
		let statistics = {};

		statistics = FinanceStatistic.collectFromCollection( statistics, orders, this.orderGroupBy, this.orderCollectors, this.orderCondition );
		statistics = FinanceStatistic.collectFromCollection( statistics, refunds, this.refundGroupBy, this.refundCollectors, this.refundCondition );

		return statistics;
	}

	/**
	 * Gathers statistics from a collection using the specified parameters.
	 *
	 * @param {Object}                    statistics  Existing statistics to add results to.
	 * @param {array}                     collection  An array of items to gather statistics for.
	 * @param {function}                  groupBy     A function that when supplied an item from the collection returns it's group.
	 * @param {Object.<string, function>} collectors  An object that contains keys to collect and values that supply functions to collect these from a single item.
	 * @param {function}                  [condition] A function that when supplied an item from the collection returns whether or not it should be collected.
	 *
	 * @returns {Object} The gathered statistics added to the supplied statistics.
	 */
	static collectFromCollection( statistics, collection, groupBy, collectors, condition ) {
		for ( let i = 0; i < collection.length; i++ ) {
			let item  = collection[ i ];

			if ( _isFunction( condition ) && ! condition( item ) ) {
				continue;
			}

			let group = groupBy( item );

			statistics[ group ] = statistics[ group ] || { group };
			statistics[ group ] = FinanceStatistic.collectFromItem( statistics[ group ], item, collectors );
		}

		return statistics;
	}

	/**
	 * Collects statistics from a single item using the specified parameters.
	 *
	 * @param {Object}                    itemStatistics Existing statistics to add results to.
	 * @param {*}                         item           A single item to collect statistics for.
	 * @param {Object.<string, function>} collectors     An object that contains keys to collect and values that supply functions to collect these from a single item.
	 * @returns {*}
	 */
	static collectFromItem( itemStatistics, item, collectors ) {
		for ( let statistic in collectors ) {
			if ( ! collectors.hasOwnProperty( statistic ) ) {
				continue;
			}

			let collector = collectors[ statistic ];
			let gathered  = collector( item );

			itemStatistics[ statistic ] = FinanceStatistic.addStatistic( itemStatistics[ statistic ], gathered );
		}

		return itemStatistics;
	}

	/**
	 * Adds a newly gathered statistic to already gathered statistics.
	 *
	 * @param {Object}       currentlyGathered Already gathered statistics.
	 * @param {array|number} newlyGathered     The newly gathered statistic.
	 *
	 * @returns {Object} The statistics including the newly gathered statistic.
	 */
	static addStatistic( currentlyGathered, newlyGathered ) {
		switch( true ) {
			case _isArray( newlyGathered ):
				currentlyGathered = currentlyGathered || [];
				currentlyGathered.push( newlyGathered );
				break;
			case _isNumber( newlyGathered ):
				currentlyGathered = currentlyGathered || 0;
				currentlyGathered += newlyGathered;
				break;
			default:
				// Do not add.
		}

		return currentlyGathered;
	}
}
