export const receive_post = post => {
    return {
        type: "SUBMENU",
        data: post
    };
};


export const submenu = name => {
    return function(dispatch, getState) {
        return dispatch(receive_post(name))
    };
};