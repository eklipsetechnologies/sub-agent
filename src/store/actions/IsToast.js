export const receive_post = post => {
    return {
        type: "TOAST",
        data: post
    };
};


export const launch_toaster = message => {

    return function(dispatch, getState) {
        return dispatch(receive_post(message))
    };
};