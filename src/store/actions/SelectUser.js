export const receive_post = post => {
    return {
        type: "SELECT_USER",
        data: post
    };
};


export const select_user = data => {
    return function(dispatch, getState) {
        return dispatch(receive_post(data))
    };
};