export const receive_post = post => {
    return {
        type: "USER_DETAILS",
        data: post
    };
};


export const user_details = data => {
    return function(dispatch, getState) {
        return dispatch(receive_post(data))
    };
};