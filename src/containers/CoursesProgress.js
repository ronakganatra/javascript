import { connect } from "react-redux";
import { retrieveCoursesEnrollments, retrieveCourses } from "../actions/courses";
import CoursesProgress from "../components/CoursesProgress";
import { getUserId } from "../functions/auth";

export const mapStateToProps = ( state ) => {
	const currentUserId = getUserId();

	let allIds = state.entities.coursesEnrollments.allIds;
	let coursesEnrollments = allIds.map( ( courseId ) => {
		let course = state.entities.coursesEnrollments.byId[ courseId ];

		// We don't want to display refunded course enrollments.
		if ( course.status === "refunded" ) {
			return false;
		}

		return {
			id: course.id,
			name: course.course.name,
			status: course.status,
			progress: course.progress,
			courseId: course.courseId,
			buyerId: course.buyerId,
			studentId: course.studentId,
			orderId: course.orderId,
		};
	} ).filter( ( enrollment ) => !! enrollment );

	// Only show enrollments where you are actually a student:
	coursesEnrollments = coursesEnrollments.filter( enrollment => {
		return enrollment.studentId === currentUserId;
	} );

	allIds = state.entities.courses.allIds;
	let courses = allIds.map( ( courseId ) => {
		let course = state.entities.courses.byId[ courseId ];
		let icon = course.iconUrl;

		if ( ! icon ) {
			icon = course.product ? course.product.icon : "";
		}

		return {
			id: course.id,
			name: course.name,
			description: course.description,
			courseUrl: course.courseUrl,
			certificateUrl: course.certificateUrl,
			icon: icon,
		};
	} );

	return {
		courses,
		coursesEnrollments,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		loadCourses: () => dispatch( retrieveCourses() ),
		loadCoursesEnrollments: () => dispatch( retrieveCoursesEnrollments() ),
	};
};

const CoursesProgressContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( CoursesProgress );

export default CoursesProgressContainer;
