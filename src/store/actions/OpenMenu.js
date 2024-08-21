export const receive_post = post => {
    return {
        type: "MENU",
        data: post
    };
};


export const open_menu = name => {

    return function(dispatch, getState) {
        return dispatch(receive_post(name))
    };
};