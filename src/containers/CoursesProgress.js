import { connect } from "react-redux";
import _groupBy from "lodash/groupBy";

import { retrieveCoursesEnrollments, retrieveCourses } from "../actions/courses";
import CoursesProgress from "../components/CoursesProgress";
import { getUserId } from "../functions/auth";

export const mapStateToProps = ( state ) => {
	const currentUserId = getUserId();

	let coursesEnrollments = state.entities.coursesEnrollments.allIds
		.map( ( enrollmentId ) => {
			return state.entities.coursesEnrollments.byId[ enrollmentId ];
		} )
		.filter( ( enrollment ) => enrollment.status !== "refunded" );

	coursesEnrollments = _groupBy( coursesEnrollments, "courseId" );

	let courses = state.entities.courses.allIds
		.map( ( courseId ) => {
			let course = state.entities.courses.byId[ courseId ];
			let enrollments = coursesEnrollments[ courseId ] || [];
			let studentEnrollment = enrollments
				.find( ( enrollment ) => enrollment.studentId === currentUserId );
			let usedEnrollments = enrollments
				.filter( ( enrollment ) => enrollment.studentId );
			let availableEnrollment = enrollments
				.find( ( enrollment ) => {
					return enrollment.buyerId && ( ! enrollment.studentId || enrollment.progress === 0 );
				} );

			return {
				imageUrl: course.imageUrl,
				title: course.name,
				description: course.description,
				progress: studentEnrollment ? studentEnrollment.progress : 0,
				totalEnrollments: enrollments.length,
				usedEnrollments: usedEnrollments.length,
				availableEnrollment,
				shopUrl: course.product ? course.product.storeUrl : "",
				isEnrolled: !! studentEnrollment,
			};
		} );

	return { courses };
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		loadData: () => {
			dispatch( retrieveCourses() );
			dispatch( retrieveCoursesEnrollments() );
		},
	};
};

const CoursesProgressContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( CoursesProgress );

export default CoursesProgressContainer;
