export const receive_post = post => {
    return {
        type: "OPEN_RIGHT",
        data: post
    };
};


export const open_right = data => {
    return function(dispatch, getState) {
        return dispatch(receive_post(data))
    };
};