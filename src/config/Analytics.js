import { LOCATION_CHANGE } from "react-router-redux";
import { createMiddleware } from "redux-beacon";
import GoogleTagManager from "@redux-beacon/google-tag-manager";

import { LOGIN, LOGOUT_SUCCESS } from "../actions/user";
import { LINK_SITE_SUCCESS } from "../actions/sites";
import { SIGNUP_SUCCESS, ACTIVATE_SUCCESS } from "../actions/signup";
import { SEND_COURSE_INVITE_SUCCESS } from "../actions/courses";
import { SUBSCRIBE_NEWSLETTER_SUCCESS } from "../actions/newsletter";
import { RESET_PASSWORD_SUCCESS, SEND_RESET_PASSWORD_EMAIL_SUCCESS } from "../actions/resetPassword";
import { CANCEL_SUBSCRIPTION_SUCCESS } from "../actions/subscriptions";
import { SITE_ADD_SUBSCRIPTION_SUCCESS } from "../actions/site";

/**
 * Create an event object to send to GoogleTagManager.
 *
 * @param {string} type The name of the action.
 * @param {Object} data Optional. The data object to associate to the action.
 *
 * @returns {Object} The event object to send to GoogleTagManager.
 */
const createEvent = ( type, data ) => ( {
	event: "redux_event",
	// eslint-disable-next-line camelcase
	redux_event_params: { type, data },
} );

const eventsMap = {
	[ LOCATION_CHANGE ]:
		action => createEvent( "navigation", { page: action.payload.pathname } ),
	[ LOGIN ]:
		() => createEvent( "login" ),
	[ LOGOUT_SUCCESS ]:
		() => createEvent( "logout" ),
	[ SIGNUP_SUCCESS ]:
		() => createEvent( "signup" ),
	[ ACTIVATE_SUCCESS ]:
		() => createEvent( "activate" ),
	[ LINK_SITE_SUCCESS ]:
		action => createEvent( "add_site", { site: action.site.url, type: action.site.type } ),
	[ SEND_COURSE_INVITE_SUCCESS ]:
		( action, prevState, nextState ) => createEvent( "invite_student", {
			course: action.updatedCourseEnrollments.length > 1 ? "Training subscription" : nextState.entities.courses.byId[ action.updatedCourseEnrollments[ 0 ].courseId ].name,
		} ),
	[ SUBSCRIBE_NEWSLETTER_SUCCESS ]:
		() => createEvent( "newsletter_signup" ),
	[ RESET_PASSWORD_SUCCESS ]:
		() => createEvent( "password_reset" ),
	[ SEND_RESET_PASSWORD_EMAIL_SUCCESS ]:
		() => createEvent( "request_password_reset" ),
	[ SITE_ADD_SUBSCRIPTION_SUCCESS ]:
		( action, prevState, nextState ) => createEvent( "activate_subscription", {
			site: nextState.entities.sites.byId[ action.siteId ].url,
			type: nextState.entities.sites.byId[ action.siteId ].type,
			subscription: nextState.entities.subscriptions.byId[ action.subscriptionId ].name,
		} ),
	[ CANCEL_SUBSCRIPTION_SUCCESS ]:
		( action, prevState, nextState ) => createEvent( "cancel_subscription", {
			subscription: nextState.entities.subscriptions.byId[ action.subscriptionId ].name,
		} ),
};

// eslint-disable-next-line new-cap
export default createMiddleware( eventsMap, GoogleTagManager() );
