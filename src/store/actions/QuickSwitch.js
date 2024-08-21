export const receive_post = post => {
    return {
        type: "QUICK_SWITCH",
        data: post
    };
};


export const quick_switch = data => {
    return function(dispatch, getState) {
        return dispatch(receive_post(data))
    };
};