export const receive_post = post => {
    return {
        type: "SELECT_STUDENT",
        data: post
    };
};


export const select_student = data => {
    return function(dispatch, getState) {
        return dispatch(receive_post(data))
    };
};