/* External dependencies */
import { createSelector } from "reselect";
import _groupBy from "lodash/groupBy";
import _maxBy from "lodash/maxBy";
import _sortBy from "lodash/sortBy";

/* Internal dependencies */
import { createAllOfEntitySelector } from "./factories";
import { getCoursesById, getCourses } from "./courses";
import { getUserProfile } from "./user";
import { getOrdersById } from "./orders";

/**
 * Returns all subscriptions in the state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All subscriptions.
 */
export const getCourseEnrollments = createAllOfEntitySelector( "courseEnrollments" );

export const getGroupedCourseEnrollments = createSelector(
	[ getCourseEnrollments, getCourses, getUserProfile, getCoursesById, getOrdersById ],
	( courseEnrollments, courses, profile, coursesById, ordersById ) => {
		courseEnrollments = courseEnrollments.filter( enrollment => enrollment.status !== "refunded" );
		const courseEnrollmentsByIdentifier = _groupBy( courseEnrollments, e => e.lineItemId ? `${e.lineItemId}:${e.lineItemNumber}` : e.id );

		let groupedCourseEnrollments = Object.keys( courseEnrollmentsByIdentifier ).map( ( identifier ) => {
			const enrollments = courseEnrollmentsByIdentifier[ identifier ];
			const firstEnrollment = enrollments[ 0 ];
			const grouped = enrollments.length > 1;
			const isAllTrainingSubscription = enrollments.length >= 5;

			identifier = grouped ? `bulk:${identifier}` : `individual:${firstEnrollment.id}`;

			let buyerEmail = "";
			let buyerName = "";
			let studentEmail = "";
			let studentName = "";

			const course = coursesById[ firstEnrollment.courseId ];
			const order = ordersById[ firstEnrollment.orderId ];
			if ( order ) {
				buyerName = [ order.customerFirstName, order.customerLastName ].join( " " );
				buyerEmail = order.customerEmail;
			}

			if ( firstEnrollment.student ) {
				studentName = [ firstEnrollment.student.userFirstName, firstEnrollment.student.userLastName ].join( " " );
				studentEmail = firstEnrollment.student.userEmail;
			}

			let icon = "";
			if ( grouped && isAllTrainingSubscription ) {
				icon = "https://yoast.com/app/uploads/2018/11/Training_subscription_MyYoast.png";
			} else {
				icon = ( course.products[ 0 ] ? course.products[ 0 ].icon : "" );
			}

			const outsideTrialProgress = enrollments.some( ( enrollment ) => enrollment.outsideTrialProgress );
			const isTrial = enrollments.some( ( enrollment ) => enrollment.isTrial );
			const progress = _maxBy( enrollments, "progress" ) || 0;
			const status = enrollments.some( ( enrollment ) => enrollment.status === "started" ) ? "started" : "not started";
			const courseName = grouped && isAllTrainingSubscription
				? "Training Subscription"
				: course.name.replace( /\s\((block|classic) editor\)/, "" );

			return {
				icon,
				id: identifier,
				progress,
				courseId: grouped ? " grouped" : course.id,
				courseName,
				buyerEmail,
				buyerName,
				buyerId: firstEnrollment.buyerId,
				status,
				studentEmail,
				studentName,
				isTrial,
				outsideTrialProgress,
			};
		} );

		const freeEnrollments = courses
			.filter( course => course.open && groupedCourseEnrollments.every( enrollment => enrollment.courseId !== course.id ) )
			.map( course => {
				let icon = course.iconUrl;
				if ( ! icon ) {
					icon = course.products[ 0 ] ? course.products[ 0 ].icon : "";
				}

				return {
					// EnrollmentId is not unique across users.
					id: "free-course:" + course.id,
					progress: 0,
					courseId: course.id,
					courseName: course.name,
					icon,
					buyerId: "",
					buyerEmail: "",
					buyerName: "",
					status: "not started",
					studentEmail: profile.email,
					studentId: profile.userId,
					studentName: [ profile.userFirstName, profile.userLastName ].join( " " ),
				};
			} );

		groupedCourseEnrollments = _sortBy( groupedCourseEnrollments, "courseId" );
		return groupedCourseEnrollments.concat( freeEnrollments );
	}
);
