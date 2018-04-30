import { connect } from "react-redux";
import { retrieveCoursesEnrollments, retrieveCourses } from "../actions/courses";
import CoursesProgress from "../components/CoursesProgress";
import { getUserId } from "../functions/auth";

export const mapStateToProps = ( state ) => {
	const currentUserId = getUserId();

	let allIds = state.entities.coursesEnrollments.allIds;
	let coursesEnrollments = allIds.map( ( enrollmentId ) => {
		let enrollment = state.entities.coursesEnrollments.byId[ enrollmentId ];

		// We don't want to display refunded course enrollments.
		if ( enrollment.status === "refunded" ) {
			return false;
		}

		return {
			id: enrollment.id,
			name: enrollment.course.name,
			status: enrollment.status,
			progress: enrollment.progress,
			courseId: enrollment.courseId,
			buyerId: enrollment.buyerId,
			studentId: enrollment.studentId,
			orderId: enrollment.orderId,
		};
	} ).filter( ( enrollment ) => !! enrollment );

	let allCourseIds = state.entities.courses.allIds;
	let freeEnrollments = allCourseIds.map( ( courseId ) => {
		let course = state.entities.courses.byId[ courseId ];
		if ( ! course.open ) {
			return;
		}

		// Don't show a free enrollment is the user is already enrolled.
		let enrollmentsForCourse = coursesEnrollments.filter( enrollment => {
			return enrollment.course_id === courseId;
		} );
		if ( enrollmentsForCourse.length > 0 ) {
			return;
		}

		return {
			// The id is not unique across users.
			id: "free-course-" + courseId,
			name: course.name,
			status: "not started",
			progress: 0,
			courseId: courseId,
			buyerId: "",
			studentId: currentUserId,
			orderId: "",
		};
	} ).filter( ( enrollment ) => !! enrollment );

	coursesEnrollments = coursesEnrollments.concat( freeEnrollments );

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
			open: course.open,
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
