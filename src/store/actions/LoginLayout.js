export const receive_post = post => {
    return {
        type: "LOGIN_LAYOUT",
        data: post
    };
};


export const login_layout = name => {

    return function(dispatch, getState) {
        return dispatch(receive_post(name))
    };
};