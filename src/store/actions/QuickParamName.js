export const receive_post = post => {
    return {
        type: "QUICK_PARAMS_NAME",
        data: post
    };
};


export const quick_param_name = name => {

    return function(dispatch, getState) {
        return dispatch(receive_post(name))
    };
};