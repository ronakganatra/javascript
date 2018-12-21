export const getUserProfile = state => Object.assign( { userId: state.user.userId }, state.user.data.profile );
