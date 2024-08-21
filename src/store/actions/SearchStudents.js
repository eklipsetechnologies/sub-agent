export const receive_post = post => {
    return {
        type: "SEARCH_STUDENT",
        data: post
    };
};


export const search_student = data => {
    return function(dispatch, getState) {
        return dispatch(receive_post(data))
    };
};