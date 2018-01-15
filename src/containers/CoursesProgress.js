import { connect } from "react-redux";
import { retrieveCoursesEnrollments, retrieveCourses } from "../actions/courses";
import CoursesProgress from "../components/CoursesProgress";
import _filter from "lodash/filter";
import { getUserId } from "../functions/auth";

export const mapStateToProps = ( state ) => {
	const currentUserId = getUserId();

	let allIds = state.entities.coursesEnrollments.allIds;
	let coursesEnrollments = allIds.map( ( courseId ) => {
		let course = state.entities.coursesEnrollments.byId[ courseId ];
		let courseName = course.course.name;

		let courseProps = {
			id: course.id,
			name: courseName,
			status: course.status,
			progress: course.progress,
			courseId: course.courseId,
			buyerId: course.buyerId,
			studentId: course.studentId,
			orderId: course.orderId,
		};

		return courseProps;
	} );

	// Only show enrollments where you are actually a student:
	coursesEnrollments = coursesEnrollments.filter( ( enrollment ) => {
		return enrollment.studentId === currentUserId;
	} );

	allIds = state.entities.courses.allIds;
	let courses = _filter( allIds.map( ( courseId ) => {
		let course = state.entities.courses.byId[ courseId ];

		if ( ! course.product ) {
			return false;
		}

		return {
			id: course.id,
			name: course.name,
			description: course.description,
			courseUrl: course.courseUrl,
			certificateUrl: course.certificateUrl,
			storeUrl: course.product.storeUrl,
			icon: course.product.icon,
		};
	} ), course => course !== false );

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
