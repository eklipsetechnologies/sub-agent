export const receive_post = post => {
    return {
        type: "PROPS_PARAMS",
        data: post
    };
};


export const props_params = params => {
    return function(dispatch, getState) {
        return dispatch(receive_post(params));
    };
};