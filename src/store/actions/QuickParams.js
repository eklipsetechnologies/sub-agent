export const receive_post = post => {
    return {
        type: "QUICK_PARAMS",
        data: post
    };
};


export const quick_params = data => {
    return function(dispatch, getState) {
        return dispatch(receive_post(data))
    };
};