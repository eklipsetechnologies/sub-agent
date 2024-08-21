export const receive_post = post => {
    return {
        type: "REFRESH",
        data: post
    };
};


export const refresh = data => {
    return function(dispatch, getState) {
        return dispatch(receive_post(data))
    };
};