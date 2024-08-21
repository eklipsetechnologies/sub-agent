export const receive_post = post => {
    return {
        type: "TOAST_TRIGGER",
        data: post
    };
};


export const toast_trigger = bool => {

    return function(dispatch, getState) {
        return dispatch(receive_post(bool))
    };
};