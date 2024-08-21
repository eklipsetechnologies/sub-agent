export const receive_post = post => {
    return {
        type: "EXPAND_STUDENT",
        data: post
    };
};


export const expand_students = bool => {
    return function(dispatch, getState) {
        return dispatch(receive_post(bool))
    };
};