import { connect } from "react-redux";
import _groupBy from "lodash/groupBy";
import _sortBy from "lodash/fp/sortBy";
import _reverse from "lodash/reverse";
import _flow from "lodash/flow";

import { retrieveCourseEnrollments, retrieveCourses } from "../actions/courses";
import CoursesProgress from "../components/CoursesProgress";
import { getUserId } from "../functions/auth";
import { getShopUrl } from "../functions/products";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	const currentUserId = getUserId();

	let courseEnrollments = state.entities.courseEnrollments.allIds
		.map( ( enrollmentId ) => {
			return state.entities.courseEnrollments.byId[ enrollmentId ];
		} )
		.filter( ( enrollment ) => enrollment.status !== "refunded" );

	courseEnrollments = _groupBy( courseEnrollments, "courseId" );

	let courses = state.entities.courses.allIds
		.map( ( courseId ) => {
			const course = state.entities.courses.byId[ courseId ];
			const enrollments = courseEnrollments[ courseId ] || [];
			const ownedEnrollments = enrollments.filter( ( enrollment ) => enrollment.buyerId === currentUserId );
			const studentEnrollment = enrollments
				.find( ( enrollment ) => enrollment.studentId === currentUserId );
			const usedEnrollments = ownedEnrollments.filter( ( enrollment ) => enrollment.studentId );
			const availableEnrollment =
				ownedEnrollments.find( ( enrollment ) => ! enrollment.studentId ) ||
				ownedEnrollments.find( ( enrollment ) => ! enrollment.outsideTrialProgress );
			const usProduct = course.products ? course.products.find( ( product ) => product.sourceShopId === 1 ) : null;
			const shopUrl = usProduct ? `${getShopUrl()}/?yst-add-to-cart=${usProduct.sourceId}` : "";

			return {
				image: course.iconUrl,
				title: course.name,
				description: course.description,

				progress: studentEnrollment ? studentEnrollment.progress : 0,
				isTrial: studentEnrollment ? studentEnrollment.isTrial : false,
				trialCompleted: studentEnrollment ? studentEnrollment.trialCompleted : false,

				totalEnrollments: ownedEnrollments.length,
				usedEnrollments: usedEnrollments.length,
				availableEnrollment,

				shopUrl,
				certificateUrl: course.certificateUrl,
				courseUrl: course.courseUrl,

				isFree: course.open,
				isEnrolled: ! ! studentEnrollment,
				isCompleted: studentEnrollment ? studentEnrollment.progress === 100 : false,
				deprecated: course.deprecated,

				isOnSale: course.sale,
				saleLabel: course.saleLabel,

				hasTrial: course.hasTrial,
			};
		} )
		// Only show courses in which you are enrolled, are free or have a shop url and aren't deprecated.
		.filter( ( course ) => course.isEnrolled || course.isFree || ( ! course.deprecated && course.shopUrl ) );

	// Sort to show sales first, then enrolled courses, then free courses and then the rest. Within groups sort on progress.
	// Reverse is needed because boolean sort weird.
	courses = _flow(
		_sortBy( [ "progress", "totalEnrollments" ] ),
		_sortBy( [ "isEnrolled", "isFree", "hasTrial" ] ),
		_reverse,
		_sortBy( "isCompleted" ),
		_reverse,
		_sortBy( "isOnSale" ),
		_reverse,
		_sortBy( "deprecated" )
	)( courses );

	return { courses };
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		loadData: () => {
			dispatch( retrieveCourses() );
			dispatch( retrieveCourseEnrollments() );
		},
	};
};

const CoursesProgressContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( CoursesProgress );

export default CoursesProgressContainer;
